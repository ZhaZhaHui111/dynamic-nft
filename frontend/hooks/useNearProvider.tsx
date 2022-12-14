import LoginModal from "../components/Modal/LoginModal";
import React, { createContext, useContext, useEffect, useState } from "react";
import near from "../services/near";

interface INearContext {
  isInit: boolean;
  hasDeposit: boolean;
  accountId: string | null;
  commonModal: TCommonModal;
  setCommonModal: React.Dispatch<React.SetStateAction<TCommonModal>>;
}

type TCommonModal = "login" | "deposit" | null;

const defaultValue: INearContext = {
  isInit: false,
  hasDeposit: false,
  accountId: null,
  commonModal: null,
  setCommonModal: () => null,
};

export const NearContext = createContext<INearContext>(defaultValue);
export const useNearProvider = () => useContext(NearContext);

export const NearProvider = (props: { children: React.ReactNode }) => {
  const [isInit, setIsInit] = useState(false);
  const [hasDeposit, setHasDeposit] = useState(false);
  const [accountId, setAccountId] = useState(null);
  const [commonModal, setCommonModal] = useState<TCommonModal>(null);

  useEffect(() => {
    near.init(() => {
      setIsInit(true);
      setAccountId(near.wallet.getAccountId());
    });
  }, []);

  const value: INearContext = {
    isInit,
    hasDeposit,
    accountId,
    commonModal,
    setCommonModal,
  };

  return (
    <NearContext.Provider value={value}>
      {props.children}
      <LoginModal
        show={commonModal === "login"}
        onClose={() => setCommonModal(null)}
      />
    </NearContext.Provider>
  );
};
