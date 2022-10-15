import Button from "../../components/Common/Button";
import Modal from "../../components/Common/Modal";
import near from "../../services/near";
import { prettyTruncate } from "../../utils/common";
import React from "react";
import { useNearProvider } from "../../hooks/useNearProvider";

interface ProfileModalProps {
  show: boolean;
  onClose: () => void;
}

const ProfileModal = ({ show, onClose }: ProfileModalProps) => {
  const { accountId } = useNearProvider();
  return (
    <Modal isShow={show} onClose={onClose}>
      <div className="m-auto w-full max-w-xs rounded-md bg-parasGrey p-4 text-center text-white shadow-xl">
        <p className="mb-3 text-xl font-bold">Account</p>
        <p className="mt-4 text-lg font-semibold opacity-90">
          {prettyTruncate(accountId, 16, `address`)}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <Button isFullWidth onClick={() => near.signOut()}>
            Logout
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ProfileModal;
