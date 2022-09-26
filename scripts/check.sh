accountId=${accountId:-dnft.fluxt.testnet}
near call $accountId update_check "{\"token_id\": \"0\"}" --accountId $accountId --gas=300000000000000
near view $accountId view_metadata  "{\"token_id\": \"0\"}"