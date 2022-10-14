import Button from "../../components/Common/Button";
import Modal from "../../components/Common/Modal";
import React from "react";
import near from "../../services/near";

interface LoginModalProps {
  show: boolean;
  onClose: () => void;
}

const LoginModal = ({ show, onClose }: LoginModalProps) => {
  return (
    <Modal isShow={show} onClose={onClose}>
      <div className="mx-4 w-full max-w-xs rounded-md bg-parasGrey p-4 text-center text-white shadow-xl md:m-auto">
        <p className="mb-3 text-xl font-bold">Please Login First</p>
        <p className="opacity-90">You will be redirected to NEAR Wallet</p>
        <div className="mt-4 flex items-center justify-between">
          <Button isFullWidth onClick={() => near.signIn()}>
            Login
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default LoginModal;
