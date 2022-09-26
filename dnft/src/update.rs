use crate::*;

#[near_bindgen]
impl Contract {
    fn check_up(&self, update_time: u32) -> bool {
        nano_to_sec(env::block_timestamp()) - update_time > self.update_sec
    }

    pub(crate) fn set_metadata(&mut self, token_id: &TokenId, title: String, media: String)->TokenMetadata {
         let issued_at = self
             .tokens
             .token_metadata_by_id.as_ref().unwrap().get(token_id).unwrap().issued_at;

        let new_token_metadata = TokenMetadata {
            title: Some(title), // ex. "Arch Nemesis: Mail Carrier" or "Parcel #5055"
            media:Some(media), // URL to associated media, preferably to decentralized, content-addressed storage
            issued_at: issued_at, // when token was issued or minted
            reference: None,   // URL to an off-chain JSON file with more info.
            description: None, // free-form description
            media_hash: None, // Base64-encoded sha256 hash of content referenced by the `media` field. Required if `media` is included.
            copies: None, // number of copies of this set of metadata in existence when token was minted.
            expires_at: None, // ISO 8601 datetime when token expires
            starts_at: None, // ISO 8601 datetime when token starts being valid
            updated_at: Some(nano_to_sec(env::block_timestamp()).to_string()), // when token was last updated
            extra: None, // anything extra the NFT wants to store on-chain. Can be stringified JSON.
            reference_hash: None,
        };
        self.tokens.token_metadata_by_id.as_mut().unwrap().insert(token_id,&new_token_metadata);
        new_token_metadata
        //let mut last_title = token_metadata_map.get(token_id).unwrap().title;

        //token_metadata_map.get(token_id).unwrap().media = Some(media);
        //token_metadata_map.get(token_id).unwrap().updated_at = Some(nano_to_sec(env::block_timestamp()).to_string());
    }

    pub fn update_check(&mut self, token_id: &TokenId) {
        let metadata = self
            .tokens
            .token_metadata_by_id
            .as_mut()
            .and_then(|by_id| by_id.get(token_id))
            .unwrap();
        let last_update = metadata.updated_at.unwrap().parse::<u32>().unwrap();
        require!(
            self.check_up(last_update) == true,
            "current timestamp < interval"
        );
        //check_name
        let title = "Chick#".to_string();

        //check_media
        let media = CHICK_MEDIA.to_string();
        self.get_entry(
            PAIR.to_string(),
            PROVIDER.parse().unwrap(),
            token_id,
            title,
            media,
        );
        //metadata.updated_at.insert(nano_to_sec(env::block_timestamp()).to_string());
    }

    fn update_time_by_metadata(&mut self, metadata: TokenMetadata) -> u32 {
        let mut last_update = metadata.updated_at.unwrap().parse::<u32>().unwrap();
        require!(
            self.check_up(last_update) == true,
            "current timestamp < interval"
        );
        last_update = nano_to_sec(env::block_timestamp());
        last_update
    }
    // fn update_media(&mut self, metadata: &TokenMetadata) -> bool {}
    //pub fn update_name(&mut self, metadata: &TokenMetadata) -> String {}
}
