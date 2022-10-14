import { useNearProvider } from "../hooks/useNearProvider";
import { NextPage } from "next";
import React, { useState } from "react";
import ReactTooltip from "react-tooltip";
import StakeNFTModal from "../components/Modal/StakeNFTModal";
import { CONTRACT_NAME } from "../services/config";



const NftStakingPage: NextPage = () => {

  return (
    <div className="mx-auto mt-16 max-w-6xl rounded-2xl bg-black">
      <div className="flex justify-center gap-4 md:block md:gap-0">
        <p className="mb-4 p-5 text-left text-3xl font-semibold text-white">
          Staking
        </p>
      </div>

      <div className={`relative text-white `}>
        <div
          className={`'saturate-50 opacity-70' } overflow-hidden rounded-xl  bg-parasGrey text-white
            shadow-xl`}
        >
          <ReactTooltip html={true} />
          <div className="relative bg-black bg-opacity-40 bg-center bg-no-repeat p-4">
            <div className="mt-4 mx-16 flex justify-between gap-x-48">
              <div className=" text-left">
                <p className="text-3xl opacity-75">Owned NFT</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <StakeNFTModal
        seedId={CONTRACT_NAME}
        title={"dnft"}
      />
    </div>
  );
};

type TShowModal = "stakeNFT" | "unstakeNFT" | null;

export default NftStakingPage;
