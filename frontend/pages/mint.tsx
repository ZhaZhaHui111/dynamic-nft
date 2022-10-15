import { FunctionCallOptions } from "near-api-js/lib/account";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import ReactTooltip from "react-tooltip";
import Button from "../components/Common/Button";
import Media from "../components/Common/Media";
import { ModalCommonProps } from "../components/Modal/StakeNFTModal";
import { GAS_FEE } from "../constants/gasFee";
import { useNearProvider } from "../hooks/useNearProvider";
import { INFToken } from "../interfaces/token";
import { CONTRACT_NAME } from "../services/config";
import near, { getAmount } from "../services/near";
import { parseImgUrl } from "../utils/common";

const NFToken = ({ token }) => {
  const tokenUrl = `https://testnet.nearblocks.io/address/${CONTRACT_NAME}#contract`;

  return (
    <div className="mb-4 flex h-[11rem] justify-between overflow-hidden rounded-xl border-2 border-borderGray p-3 shadow-lg md:mb-0">
      <div className="w-1/2 pr-4">
        <div className="h-full w-full">
          <Media
            url={parseImgUrl(token.metadata.media, "")}
            className="h-full w-full object-contain"
          />
        </div>
      </div>
      <div className="m-auto w-1/2">
        <div className="truncate overflow-ellipsis">
          <a href={tokenUrl} target="_blank" rel="noreferrer">
            <p className="text-md inline font-bold text-white hover:opacity-80">
              {token.metadata.title}
            </p>
          </a>
        </div>
        <div className="truncate overflow-ellipsis"></div>
      </div>
    </div>
  );
};

const UserNFTModal = (props: ModalCommonProps) => {
  const [ownedNFT, setOwnedNFT] = useState<INFToken[]>([]);
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
  }, [accountId, props.seedId, ownedNFT.length, CONTRACT_NAME]);

  return (
    <>
      <div className="m-auto w-full max-w-sm rounded-lg bg-parasGrey p-4 shadow-xl md:max-w-5xl">
        <div className="-mx-4 flex justify-between">
          <div className="w-2/3 px-5"></div>
        </div>

        <div className="no-scrollbar mt-4 h-[50vh] overflow-y-scroll md:h-[60vh]">
          {ownedNFT.length !== 0 ? (
            <div className="md:grid md:grid-cols-2 md:gap-4">
              {ownedNFT.map((nft) => (
                <NFToken key={nft.token_id} token={nft} />
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
      </div>
    </>
  );
};

const MintModal = () => {
  const mint = async () => {
    try {
      const txs: {
        receiverId: string;
        functionCalls: FunctionCallOptions[];
      }[] = [];

      txs.push({
        receiverId: CONTRACT_NAME,
        functionCalls: [
          {
            methodName: "nft_mint",
            contractId: CONTRACT_NAME,
            args: {},
            attachedDeposit: getAmount("12500000000000000000000"),
            gas: getAmount(GAS_FEE[250]),
          },
        ],
      });
      return await near.executeMultipleTransactions(txs);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="relative bg-black bg-opacity-40 bg-center bg-no-repeat p-4">
      <div className="mt-4 flex justify-center gap-x-48">
        <Button className="my-7 px-9 text-lg " onClick={() => mint()}>
          Mint one dNFT
        </Button>
      </div>
    </div>
  );
};

const MintingPage: NextPage = () => {
  return (
    <div className="mx-auto mt-16 max-w-6xl rounded-2xl bg-black">
      <div className="flex justify-center gap-4 md:block md:gap-0">
        <p className="mb-4 p-5 text-left text-3xl font-semibold text-white">
          Mint
        </p>
      </div>

      <div className={`relative text-white `}>
        <div
          className={`'saturate-50 opacity-70' } overflow-hidden rounded-xl  bg-parasGrey text-white
            shadow-xl`}
        >
          <ReactTooltip html={true} />
          <div className="relative bg-black bg-opacity-40 bg-center bg-no-repeat p-4">
            <div className="mt-4 flex justify-between gap-x-48"></div>
          </div>
          <MintModal />
          <div className="relative bg-black bg-opacity-40 bg-center bg-no-repeat p-4">
            <div className="mt-4 flex justify-between gap-x-48">
              <div className=" text-left">
                <p className="text-3xl opacity-75">Owned NFT</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <UserNFTModal seedId={CONTRACT_NAME} title={"dnft"} />
    </div>
  );
};

export default MintingPage;
