use crate::*;

//#[near_bindgen]
//impl Contract{
pub(crate) fn to_nano(sec: u32) -> Timestamp {
    Timestamp::from(sec) * 10u64.pow(9)
}

pub(crate) fn nano_to_sec(nano: u64) -> u32 {
    (nano / 10u64.pow(9)) as u32
}
