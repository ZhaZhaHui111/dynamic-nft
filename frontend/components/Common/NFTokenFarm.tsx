import { INFToken } from "../../interfaces/token";
import React from "react";
import { parseImgUrl } from "../../utils/common";
import Button from "./Button";
import Media from "./Media";
import { CONTRACT_NAME } from "../../services/config";

interface NFTokenFarmProps {
  token: INFToken;
  stakeNFT: (tokenId: string) => void;
  type: "unstake" | "stake";
}

const NFTokenFarm = ({ token, stakeNFT, type }: NFTokenFarmProps) => {
  const tokenUrl = `https://testnet.nearblocks.io/address/${CONTRACT_NAME}#contract`;

  return (
    <div className="mb-4 flex h-[11rem] justify-between overflow-hidden rounded-xl border-2 border-borderGray p-3 shadow-lg md:mb-0">
      <div className="w-1/2 pr-4">
        <div className="h-full w-full">
          <Media
            url={parseImgUrl(token.metadata.media, ""
			)}
            className="h-full w-full object-contain"
          />
        </div>
      </div>
      <div className="m-auto w-1/2">
        <div className="truncate overflow-ellipsis">
          <a href={tokenUrl} target="_blank" rel="noreferrer">
            <p className="inline text-md text-white font-bold hover:opacity-80">
              {token.metadata.title}
            </p>
          </a>
        </div>
        <div className="truncate overflow-ellipsis"></div>
        <Button
          className="mt-4 px-6"
          size="md"
          color={type === "stake" ? "blue" : "blue-gray"}
          onClick={() => stakeNFT(token.token_id)}
        >
          {type === "stake" ? "Stake" : "Unstake"}
        </Button>
      </div>
    </div>
  );
};

export default NFTokenFarm;
