use crate::*;

#[near_bindgen]
impl NonFungibleTokenMetadataProvider for Contract {
    fn nft_metadata(&self) -> NFTContractMetadata {
        self.metadata.get().unwrap()
    }
}
#[near_bindgen]
impl Contract {
    pub fn view_metadata(&self, token_id: TokenId) -> TokenMetadata {
        self.tokens
            .token_metadata_by_id
            .as_ref()
            .and_then(|by_id| by_id.get(&token_id))
            .unwrap()
    }
}
