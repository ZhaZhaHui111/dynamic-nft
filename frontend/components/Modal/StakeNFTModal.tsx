import Button from "../../components/Common/Button";
import NFTokenFarm from "../../components/Common/NFTokenFarm";

import { GAS_FEE } from "../../constants/gasFee";
import { useNearProvider } from "../../hooks/useNearProvider";
import { INFToken } from "../../interfaces/token";
import { FunctionCallOptions } from "near-api-js/lib/account";
import React from "react";
import { useEffect, useState } from "react";
import near, { getAmount } from "../../services/near";
import { CONTRACT_NAME } from "../../services/config";

export const ONE_YOCTO_NEAR = "0.000000000000000000000001";

export interface ModalCommonProps {
  seedId: string;
  title: string;
}

const StakeNFTModal = (props: ModalCommonProps) => {
  const [ownedNFT, setOwnedNFT] = useState<INFToken[]>([]);
  const [stakedNFT, setStakedNFT] = useState<INFToken[]>([]);
  const { accountId } = useNearProvider();

  useEffect(() => {
    const fetchOwnedNFT = async () => {
      try {
        const resp: INFToken[] = await near.nearViewFunction({
          contractName: CONTRACT_NAME,
          methodName: "nft_tokens_for_owner",
          args: {
            account_id: accountId,
          },
        });
        setOwnedNFT(resp);
      } catch (error) {
        console.log(error);
      }
    };

    if (accountId) {
      fetchOwnedNFT();
    }

    const getStakedNFT = async () => {
      if (accountId) {
        const resp: INFToken[] = await near.nearViewFunction({
          contractName: CONTRACT_NAME,
          methodName: "nft_tokens_for_owner",
          args: {
            account_id: CONTRACT_NAME,
          },
        });
        //if (resp[props.seedId]) {
        setStakedNFT(resp);
        //}
      }
    };

    if (CONTRACT_NAME) {
      getStakedNFT();
    }
  }, [
    accountId,
    props.seedId,
    ownedNFT.length,
    stakedNFT.length,
    CONTRACT_NAME,
  ]);

  // const update = () => {
  //   if (accountId) {
  //     ownedNFT.forEach((nft) => {
  //     near.nearFunctionCall({
  //       contractName: CONTRACT_NAME,
  //       methodName: "update_check",
  //       amount: null,
  //       args: {
  //         token_id: nft.token_id,
  //       },
  //     });
  //   }
  // ,
  // )};};

  const update = async () => {
    try {
      const txs: {
        receiverId: string;
        functionCalls: FunctionCallOptions[];
      }[] = [];
      ownedNFT.forEach((nft) => {
        txs.push({
          receiverId: CONTRACT_NAME,
          functionCalls: [
            {
              methodName: "update_check",
              contractId: CONTRACT_NAME,
              args: {
                token_id: nft.token_id,
              },
              gas: getAmount(GAS_FEE[250]),
            },
          ],
        });
      });
      return await near.executeMultipleTransactions(txs);
    } catch (err) {
      console.log(err);
    }
  };

  const stakeNFT = async (tokenId: string, stakeAll = false) => {
    try {
      const txs: {
        receiverId: string;
        functionCalls: FunctionCallOptions[];
      }[] = [];

      if (stakeAll) {
        ownedNFT.forEach((nft) => {
          txs.push({
            receiverId: CONTRACT_NAME,
            functionCalls: [
              {
                methodName: "nft_transfer_call",
                contractId: CONTRACT_NAME,
                args: {
                  receiver_id: CONTRACT_NAME,
                  token_id: nft.token_id,
                  msg: "",
                },
                attachedDeposit: getAmount("1"),
                gas: getAmount(GAS_FEE[200]),
              },
            ],
          });
        });
      } else {
        txs.push({
          receiverId: CONTRACT_NAME,
          functionCalls: [
            {
              methodName: "nft_transfer_call",
              contractId: CONTRACT_NAME,
              args: {
                receiver_id: CONTRACT_NAME,
                token_id: tokenId,
                msg: "",
              },
              attachedDeposit: getAmount("1"),
              gas: getAmount(GAS_FEE[200]),
            },
          ],
        });
      }
      return await near.executeMultipleTransactions(txs);
    } catch (err) {
      console.log(err);
    }
  };

  const unstakeNFT = async (tokenId: string, unstakeAll = false) => {
    try {
      const txs: {
        receiverId: string;
        functionCalls: FunctionCallOptions[];
      }[] = [];

      if (unstakeAll) {
        stakedNFT.forEach((nft) => {
          txs.push({
            receiverId: CONTRACT_NAME,
            functionCalls: [
              {
                methodName: "withdraw",
                contractId: CONTRACT_NAME,
                args: {
                  token_id: nft.token_id,
                },
                attachedDeposit: getAmount("1"),
                gas: getAmount(GAS_FEE[200]),
              },
            ],
          });
        });
      } else {
        txs.push({
          receiverId: CONTRACT_NAME,
          functionCalls: [
            {
              methodName: "withdraw",
              contractId: CONTRACT_NAME,
              args: {
                token_id: tokenId,
              },
              attachedDeposit: getAmount("1"),
              gas: getAmount(GAS_FEE[200]),
            },
          ],
        });
      }

      return await near.executeMultipleTransactions(txs);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="m-auto w-full max-w-sm rounded-lg bg-parasGrey p-4 shadow-xl md:max-w-5xl">
        <div className="-mx-4 flex w-1/3 justify-between">
          <div className=" px-5">
            {ownedNFT.length >= 2 && (
              <div className="text-right">
                <Button
                  className="my-4 px-8 "
                  onClick={() => stakeNFT("", true)}
                >
                  Stake all NFT
                </Button>
              </div>
            )}
          </div>
          <div className=" justify-center px-5">
            {ownedNFT.length >= 1 && (
              <div className="w-1/3 text-center">
                <Button className="my-4 px-8  " onClick={() => update()}>
                  update
                </Button>
              </div>
            )}
          </div>
          {stakedNFT.length >= 2 && (
            <div className="w-1/3 px-5 text-right text-white">
              <Button
                className="mt-4 px-8"
                color="blue-gray"
                onClick={() => unstakeNFT("", true)}
              >
                Unstake all NFT
              </Button>
            </div>
          )}
        </div>

        <div className="no-scrollbar mt-4 h-[50vh] overflow-y-scroll md:h-[60vh]">
          {ownedNFT.length !== 0 ? (
            <div className="md:grid md:grid-cols-2 md:gap-4">
              {ownedNFT.map((nft) => (
                <NFTokenFarm
                  key={nft.token_id}
                  token={nft}
                  stakeNFT={stakeNFT}
                  type="stake"
                />
              ))}
            </div>
          ) : (
            <div className="flex h-full w-full items-center justify-center px-4 text-center">
              <div className="text-white">
                <p>{"You don't have any dNFT"}</p>
              </div>
            </div>
          )}
        </div>
        <div className="relative bg-black bg-opacity-40 bg-center bg-no-repeat p-4">
          <div className="mt-4 flex justify-between gap-x-48">
            <div className=" text-left text-white">
              <p className="text-3xl opacity-75">Staked NFT</p>
            </div>
          </div>
        </div>
        <div className="no-scrollbar mt-4 h-[50vh] overflow-y-scroll md:h-[60vh]">
          {stakedNFT.length !== 0 ? (
            <div className="md:grid md:grid-cols-2 md:gap-4">
              {stakedNFT.map((nft) => (
                <NFTokenFarm
                  key={nft.token_id}
                  token={nft}
                  stakeNFT={unstakeNFT}
                  type="unstake"
                />
              ))}
            </div>
          ) : (
            <div className="flex h-full w-full items-center justify-center px-4 text-center">
              <div className="text-white">
                <p>{"You don't have any staked dNFT"}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default StakeNFTModal;
