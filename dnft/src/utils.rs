
use std::str::FromStr;

use crate::*;

pub fn nano_to_sec(nano: u64) -> u32 {
    (nano / 10u64.pow(9)) as u32
}

pub fn parse_name(title: &String) -> Name {
    let v: Vec<&str> = title.split("#").collect();
    if v.len() != 2 {
        env::panic_str(format!("ERROR_TITLE").as_str())
    }
    env::log_str(v[0]);
    Name::from_str(v[0]).unwrap()

}

pub(crate) fn create_metadata(
    title: String,
    media: String,
    starts_at: String,
    updated_at: String,
) -> TokenMetadata {
    TokenMetadata {
        title: Some(title), // ex. "Arch Nemesis: Mail Carrier" or "Parcel #5055"
        media: Some(media), // URL to associated media, preferably to decentralized, content-addressed storage
        issued_at: Some(starts_at.clone()), // when token was issued or minted
        reference: None,    // URL to an off-chain JSON file with more info.
        description: None,  // free-form description
        media_hash: None, // Base64-encoded sha256 hash of content referenced by the `media` field. Required if `media` is included.
        copies: None, // number of copies of this set of metadata in existence when token was minted.
        expires_at: None, // ISO 8601 datetime when token expires
        starts_at: Some(starts_at), // ISO 8601 datetime when token starts being valid
        updated_at: Some(updated_at), // when token was last updated
        extra: None,  // anything extra the NFT wants to store on-chain. Can be stringified JSON.
        reference_hash: None, // Base64-encoded sha256 hash of JSON from reference field. Required if `reference` is included.
    }
}
