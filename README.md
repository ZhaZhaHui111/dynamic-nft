# dNFT-with-staking

**Get NEAR-USD price, dynamic change token metadata(title, media) depends on time or preset conditions**

1. replace YOUR-TESTNET-ACCOUNT
   with your testnet account in scripts/run.sh

accountId=${accountId:-dnft.YOUR-TESTNET-ACCOUNT }
master=${master:-YOUR-TESTNET-ACCOUNT }

2.  build, deploy, initialize the contract
    ```bash
    sh scripts/run.sh
    ```
3.  cd frontend

    ```bash
    cd ./frontend
    ```

4.  install the dependencies
    ```bash
    yarn
    ```
5.  run frontend
    ```bash
    yarn dev
    ```
