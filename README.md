# dNFT-with-staking

**Get NEAR-USD price, dynamic change token metadata(title, media) depends on time or preset conditions**

1. replace `YOUR-TESTNET-ACCOUNT`
   with your testnet account in `scripts/run.sh`

- accountId=${accountId:-dnft.`YOUR-TESTNET-ACCOUNT`}
- master=${master:-`YOUR-TESTNET-ACCOUNT` }

2.  Build, deploy, initialize the contract
    ```bash
    sh scripts/run.sh
    ```
3.  Change directory to frontend

    ```bash
    cd ./frontend
    ```

4.  Install the dependencies
    ```bash
    yarn
    ```
5.  Run frontend

    ```bash
    yarn dev
    ```

6.  Open browser
    [http://localhost:1234](http://localhost:1234)
