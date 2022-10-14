use crate::*;
use near_contract_standards::non_fungible_token::core::NonFungibleTokenReceiver;

// Receiving dNFT

#[near_bindgen]
#[allow(unused)]
impl NonFungibleTokenReceiver for Contract {
    fn nft_on_transfer(
        &mut self,
        sender_id: AccountId,
        previous_owner_id: AccountId,
        token_id: TokenId,
        msg: String,
    ) -> PromiseOrValue<bool> {
        let metadata = self
            .tokens
            .token_metadata_by_id
            .as_ref()
            .and_then(|by_id| by_id.get(&token_id))
            .unwrap();
        let last_update = metadata.updated_at.unwrap().parse::<u32>().unwrap();
        let (title, media) = match parse_name(metadata.title.as_ref().unwrap()) {
            Name::Egg => (metadata.title.unwrap(), metadata.media.unwrap()),
            Name::Chick => {
                let owner_id = self
                    .tokens
                    .owner_by_id
                    .get(&token_id)
                    .unwrap_or_else(|| env::panic_str("Token not found"));
                if owner_id == env::current_account_id() {
                    let title = format!("Rooster#{}", token_id);
                    let media = ROOSTER_MEDIA.to_string();
                    (title, media)
                } else {
                    (metadata.title.unwrap(), metadata.media.unwrap())
                }
            }
            Name::Rooster => (metadata.title.unwrap(), metadata.media.unwrap()),
        };
        env::log_str((&title, &media).0.as_str());
        self.get_entry(
            PAIR.to_string(),
            PROVIDER.parse().unwrap(),
            &token_id,
            &title,
            &media,
        );

        PromiseOrValue::Value(false)
    }
}
