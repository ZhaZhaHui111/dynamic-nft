mod get_price;
mod nft_receiver;
mod update;
mod utils;
mod view;


use near_contract_standards::non_fungible_token::metadata::{
    NFTContractMetadata, NonFungibleTokenMetadataProvider, TokenMetadata, NFT_METADATA_SPEC,
};
use near_contract_standards::non_fungible_token::NonFungibleToken;
use near_contract_standards::non_fungible_token::{Token, TokenId};
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::LazyOption;
use near_sdk::json_types::U128;
use near_sdk::{
    assert_one_yocto, env, ext_contract, near_bindgen, require, serde_json, AccountId,
    BorshStorageKey, PanicOnDefault, Promise, PromiseOrValue, PromiseResult, Timestamp,
};
use strum_macros::EnumString;
use utils::*;

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]
pub struct Contract {
    tokens: NonFungibleToken,
    metadata: LazyOption<NFTContractMetadata>,
    update_sec: u32,
    oracle: AccountId,
    total_supply: u16,
}

const DATA_IMAGE_SVG_NEAR_ICON: &str = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 288 288'%3E%3Cg id='l' data-name='l'%3E%3Cpath d='M187.58,79.81l-30.1,44.69a3.2,3.2,0,0,0,4.75,4.2L191.86,103a1.2,1.2,0,0,1,2,.91v80.46a1.2,1.2,0,0,1-2.12.77L102.18,77.93A15.35,15.35,0,0,0,90.47,72.5H87.34A15.34,15.34,0,0,0,72,87.84V201.16A15.34,15.34,0,0,0,87.34,216.5h0a15.35,15.35,0,0,0,13.08-7.31l30.1-44.69a3.2,3.2,0,0,0-4.75-4.2L96.14,186a1.2,1.2,0,0,1-2-.91V104.61a1.2,1.2,0,0,1,2.12-.77l89.55,107.23a15.35,15.35,0,0,0,11.71,5.43h3.13A15.34,15.34,0,0,0,216,201.16V87.84A15.34,15.34,0,0,0,200.66,72.5h0A15.35,15.35,0,0,0,187.58,79.81Z'/%3E%3C/g%3E%3C/svg%3E";
const EGG_MEDIA: &str = "ipfs://bafkreickn75lkr2eeovtcoxpbflmz4pgrbwyrpq6ioksamjbfv2jubd5yu";
const CHICK_MEDIA: &str = "ipfs://bafkreic4feusoekznv2d7qm3f5utsdqvuujx4jedigfysyiqsfdo5bvlx4";
const ROOSTER_MEDIA: &str = "ipfs://bafkreihthw2qx66xv34r34dpyexm4mtmlwaqxsioslpumyxp5rlnrn6i5u";
const PAIR: &str = "NEAR/USD";
const PROVIDER: &str = "opfilabs.testnet";
const ORACLE: &str = "fpo.opfilabs.testnet";

#[derive(BorshSerialize, BorshDeserialize, EnumString)]
pub enum Name {
    Egg,
    Chick,
    Rooster,
}

#[derive(BorshSerialize, BorshStorageKey)]
enum StorageKey {
    NonFungibleToken,
    Metadata,
    TokenMetadata,
    Enumeration,
    Approval,
}

#[near_bindgen]
impl Contract {
    /// Initializes the contract owned by `owner_id` with
    /// default metadata (for example purposes only).
    #[init]
    pub fn new_default_meta(owner_id: AccountId) -> Self {
        Self::new(
            owner_id,
            NFTContractMetadata {
                spec: NFT_METADATA_SPEC.to_string(),
                name: "Example dynamic non-fungible token".to_string(),
                symbol: "dNFT".to_string(),
                icon: Some(DATA_IMAGE_SVG_NEAR_ICON.to_string()),
                base_uri: None,
                reference: None,
                reference_hash: None,
            },
        )
    }

    #[init]
    pub fn new(owner_id: AccountId, metadata: NFTContractMetadata) -> Self {
        require!(!env::state_exists(), "Already initialized");
        metadata.assert_valid();
        Self {
            tokens: NonFungibleToken::new(
                StorageKey::NonFungibleToken,
                owner_id,
                Some(StorageKey::TokenMetadata),
                Some(StorageKey::Enumeration),
                Some(StorageKey::Approval),
            ),
            metadata: LazyOption::new(StorageKey::Metadata, Some(&metadata)),
            update_sec: 20,
            oracle: ORACLE.parse().unwrap(),
            total_supply: 0,
        }
    }

    /// Mint a new token with ID=`token_id` belonging to `receiver_id`.
    #[payable]
    pub fn nft_mint(&mut self, receiver_id: Option<AccountId>) -> Token {
        let token_id = self.total_supply.to_string();
        let receiver_id = receiver_id.unwrap_or(env::predecessor_account_id());
        let media = EGG_MEDIA.to_string();
        let title = format!("Egg#{}", token_id.to_string());
        let starts_at = nano_to_sec(env::block_timestamp()).to_string();
        let token_metadata = create_metadata(title, media, starts_at.clone(), starts_at);
        let nft = self
            .tokens
            .internal_mint(token_id, receiver_id, Some(token_metadata));
        self.total_supply += 1;
        return nft;
    }

    #[payable]
    pub fn withdraw(
        &mut self,
        token_id: TokenId,
        approval_id: Option<u64>,
        memo: Option<String>,
    ) -> bool {
        assert_one_yocto();
        let receiver_id = &env::predecessor_account_id();
        self.tokens.internal_transfer(
            &env::current_account_id(),
            receiver_id,
            &token_id,
            approval_id,
            memo,
        );
        true
    }
}
near_contract_standards::impl_non_fungible_token_core!(Contract, tokens);
near_contract_standards::impl_non_fungible_token_approval!(Contract, tokens);
near_contract_standards::impl_non_fungible_token_enumeration!(Contract, tokens);
