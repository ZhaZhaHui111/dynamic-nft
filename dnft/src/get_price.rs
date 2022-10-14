use crate::*;
use near_sdk::serde::{Deserialize, Serialize};
use utils::*;

#[ext_contract(fpo)]
trait FPO {
    fn get_entry(&self, pair: String, provider: AccountId) -> Promise;
}

#[derive(BorshDeserialize, BorshSerialize, Serialize, Deserialize)]
pub struct PriceEntry {
    price: U128,            // Last reported price
    decimals: u16,          // Amount of decimals (e.g. if 2, 100 = 1.00)
    last_update: Timestamp, // Time or report
}

impl Contract {
    pub fn get_entry(
        &mut self,
        pair: String,
        provider: AccountId,
        token_id: &TokenId,
        title: &String,
        media: &String,
    ) -> Promise {
        fpo::ext(self.oracle.clone())
            .get_entry(pair.clone(), provider)
            .then(Self::ext(env::current_account_id()).set_entry(pair, token_id, title, media))
    }
}
#[near_bindgen]
impl Contract {
    #[private]
    pub fn set_entry(
        &mut self,
        pair: String,
        token_id: &TokenId,
        title: &String,
        media: &String,
    ) -> TokenId {
        let entry = match env::promise_result(0) {
            PromiseResult::NotReady => unreachable!(),
            PromiseResult::Successful(value) => {
                match serde_json::from_slice::<PriceEntry>(&value) {
                    Ok(value) => value,
                    Err(_e) => panic!("ERR_INVALID_ENTRY"),
                }
            }
            PromiseResult::Failed => panic!("ERR_FAILED_ENTRY_FETCH"),
        };
        let price = &entry.price.0.to_string();
        let title = format!(
            "{} {} {}.{}",
            title,
            pair[..4].to_string(),
            price[..1].to_string(),
            price[1..7].to_string()
        );
        let issued_at = self.view_metadata(token_id.clone()).issued_at.unwrap();
        let new_token_metadata = create_metadata(
            title,
            media.to_string(),
            issued_at,
            nano_to_sec(env::block_timestamp()).to_string(),
        );
        self.tokens
            .token_metadata_by_id
            .as_mut()
            .unwrap()
            .insert(token_id, &new_token_metadata);
        token_id.to_string()
    }
}
