
import ProfileModal from "../Modal/ProfileModal";
import { useNearProvider } from "../../hooks/useNearProvider";
import { MouseEventHandler, useEffect, useRef, useState } from "react";
import near, { CONTRACT } from "../../services/near";
import { parseImgUrl, prettyBalance, prettyTruncate } from "../../utils/common";
import Button from "./Button";
import Link from "next/link";
import React from "react";

function Anchor({
  href,
  pattern,
  name,
  // className,
  newFuntion,
}: {
  href: string;
  pattern?: string;
  name: string;
  className?: string;
  newFuntion?: boolean;
}) {
  return (
    <Link href={href}>
      <h1
        // className={`link hover:text-greenColor text-lg font-bold p-4 cursor-pointer relative z-10 ${className} ${isSelected ? 'text-greenColor' : 'text-gray-400'
        // 	}`}
        className={
          "select-none rounded-md px-3 py-2 text-sm font-medium text-black hover:bg-amber-500 hover:text-white"
        }
      >
        {name}
        {/* {newFuntion ? (
					<span className="absolute top-5 right-2">
						<IconAirDropGreenTip />
					</span>
				) : null} */}
      </h1>
    </Link>
  );
}


const Header = () => {
  const { accountId } = useNearProvider();
  const [showProfileModal, setShowProfileModal] = useState(false);

  const Profile = () => {
    return (
      <div
        onClick={() => setShowProfileModal(true)}
        className="flex cursor-pointer items-center overflow-hidden rounded-md bg-gray-800 py-1 hover:opacity-80"
      >
        <div className="px-1">
          <div className="flex items-center rounded-md bg-black bg-opacity-80 px-2 py-1">
            <p className="pr-2 font-semibold text-gray-300">
              {prettyTruncate(accountId, 16, `address`)}
            </p>
          </div>
        </div>
      </div>
    );
  };


  return (
    <>
      <div className="fixed   top-0  z-50 mx-auto flex h-16 w-screen items-center justify-between bg-test px-2 sm:px-6 lg:px-8">
        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <nav>
            <div className="hidden space-x-4 sm:ml-6 sm:flex ">
              <Anchor href="/" name="Home" />
              <Anchor href="/mint" name="Mint" />
              <Anchor href="/nft" name="NFT Stake" />
            </div>
          </nav>
        </div>
        <div className=" inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <div className="ml-4 hidden md:inline-block">
            {accountId ? (
              <div>
                <Profile />
              </div>
            ) : (
              <Button className="px-4" onClick={() => near.signIn()}>
                Login with NEAR
              </Button>
            )}
          </div>
        </div>
      </div>

      {accountId ? (
        <div className="fixed bottom-0 left-0 right-0 z-10 bg-gray-900 p-4 md:hidden">
          <div className="flex items-center justify-center">
            <Profile />
          </div>
        </div>
      ) : (
        <div className="fixed bottom-0 left-0 right-0 z-10 bg-gray-900 p-4 md:hidden">
          <div className="flex">
            <Button className="px-4" onClick={() => near.signIn()}>
              Login with NEAR
            </Button>
          </div>
        </div>
      )}

      <ProfileModal
        show={showProfileModal}
        onClose={() => setShowProfileModal(false)}
      />
    </>
  );
};

export default Header;
