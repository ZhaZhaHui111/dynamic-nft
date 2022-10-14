import Button from '../../components/Common/Button'
import Modal from '../../components/Common/Modal'
import near from '../../services/near'
import { prettyTruncate } from '../../utils/common'
import React from 'react'
import { useNearProvider } from '../../hooks/useNearProvider'

interface ProfileModalProps {
	show: boolean
	onClose: () => void
}

const ProfileModal = ({ show, onClose }: ProfileModalProps) => {
	const { accountId } = useNearProvider();
	return (
		<Modal isShow={show} onClose={onClose}>
			<div className="bg-parasGrey text-white shadow-xl w-full p-4 rounded-md m-auto max-w-xs text-center">
				<p className="font-bold text-xl mb-3">Account</p>
				<p className="mt-4 opacity-90 text-lg font-semibold">
				{prettyTruncate(accountId, 16, `address`)}
				</p>
				<div className="flex justify-between items-center mt-4">
					<Button isFullWidth onClick={() => near.signOut()}>
						Logout
					</Button>
				</div>
			</div>
		</Modal>
	)
}

export default ProfileModal
