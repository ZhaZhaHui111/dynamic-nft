
use near_sdk::serde::{Deserialize, Serialize};

use crate::*;

//base

#[ext_contract(fpo)]
trait FPO {
    fn get_entry(&self, pair: String, provider: AccountId) -> Promise;
}

#[ext_contract(ext_self)]
trait RequestResolver {
    fn set_entry(
        &self,
        pair: String,
        provider: AccountId,
        token_id: &TokenId,
        title: String,
        media: String,
    ) -> Promise;
}

#[derive(BorshDeserialize, BorshSerialize, Serialize, Deserialize)]
pub struct PriceEntry {
    price: U128,            // Last reported price
    decimals: u16,          // Amount of decimals (e.g. if 2, 100 = 1.00)
    last_update: Timestamp, // Time or report
}

#[near_bindgen]
impl Contract {
    pub fn get_entry(
        &mut self,
        pair: String,
        provider: AccountId,
        token_id: &TokenId,
        title: String,
        media: String,
    ) -> Promise {
        fpo::ext(self.oracle.clone())
            .get_entry(
                pair.clone(),
                provider.clone(),
                //env::prepaid_gas() - GAS_FOR_FT_TRANSFER_CALL
            )
            .then(ext_self::ext(env::current_account_id()).set_entry(
                pair, provider, token_id,title,media 
            ))
    }

    #[private]
    pub fn set_entry(
        &mut self,
        pair: String,
        //provider: AccountId,
        token_id: &TokenId,
        title: String,
        media: String,
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
        let title = format!("{} {} {}",title,pair,entry.price.0/entry.decimals as u128 );
        self.set_metadata(token_id, title, media);
        token_id.clone()
    }
}
