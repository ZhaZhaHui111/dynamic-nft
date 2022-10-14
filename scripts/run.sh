sh scripts/build.sh

# accountId=${accountId:-dnft.YOUR-TESTNET-ACCOUNT}
# master=${master:-YOUR-TESTNET-ACCOUNT}
 accountId=${accountId:-dnft.fluxt.testnet}
 master=${master:-fluxt.testnet}

# default params
network=${network:-testnet}
initialBalance=${initialBalance:-10}
oracle=${oracle:-fpo.opfilabs.testnet}
paymentToken=${paymentToken:-v2.wnear.flux-dev}

# request default params
pair=${pair:-NEAR/USD}
provider=${provider:-opfilabs.testnet}
amount=${amount:-0}

# reset account
NEAR_ENV=$network near delete $accountId $master
NEAR_ENV=$network near create-account $accountId --masterAccount $master --initialBalance $initialBalance

# set up account and deploy requester
# Register account with wNEAR contract and Oracle contract, give 1 NEAR to store with oracle to allow for multiple Data Requests to be made
near call $paymentToken storage_deposit "{\"account_id\": \"$accountId\"}" --accountId $accountId --amount 0.00125 --gas=300000000000000
near call $paymentToken storage_deposit "{\"account_id\": \"$oracle\"}" --accountId $accountId --amount 0.00125 --gas=300000000000000


# Deposit 2 NEAR to get 2 wNEAR tokens to use in your contract
near call $paymentToken near_deposit "{}" --accountId $accountId --amount 2 --gas=300000000000000

NEAR_ENV=$network near deploy --accountId $accountId --wasmFile ./target/wasm32-unknown-unknown/release/dynamic_non_fungible_token.wasm

# initialize the contract
near call $accountId new_default_meta "{\"owner_id\": \"$accountId\"}" --accountId $accountId

near call $accountId storage_deposit "{\"account_id\": \"$master\"}" --accountId $master --amount 0.1 --gas=300000000000000

# perform first data request
#near call $accountId get_entry "{\"pair\": \"$pair\", \"provider\": \"$provider\"}" --accountId $accountId --gas=300000000000000
near call $accountId nft_mint "{\"token_id\": \"0\", \"receiver_id\": \"$master\"}" --accountId $accountId --amount 0.0125 --gas=300000000000000
near call $accountId nft_mint "{\"token_id\": \"1\", \"receiver_id\": \"$master\"}" --accountId $accountId --amount 0.0125 --gas=300000000000000
near call $accountId nft_mint "{\"token_id\": \"2\", \"receiver_id\": \"$master\"}" --accountId $accountId --amount 0.0125 --gas=300000000000000
near call $accountId nft_mint "{\"token_id\": \"3\", \"receiver_id\": \"$master\"}" --accountId $accountId --amount 0.0125 --gas=300000000000000

#near call $accountId update_check "{\"token_id\": \"0\"}" --accountId $accountId --gas=300000000000000