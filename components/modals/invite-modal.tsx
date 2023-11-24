"use client";

import { useModal } from "@/hooks/use-modal-store";

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";

export const InviteModal = () => {
	
	const { type, isOpen, onClose } = useModal();
	const isModalOpen = isOpen && type === "invite";

	return (
		<>
			<Dialog open={isModalOpen} onOpenChange={onClose}>
				<DialogContent className="bg-white text-black p-0 overflow-hidden">
					<DialogHeader className="pt-8 px-6">
						<DialogTitle className="text-2xl text-center font-bold">
							Create your server 🚀
						</DialogTitle>
						<DialogDescription className="text-zinc-500 text-center">
							Give your server a personality by adding a
							name and an avatar. You can always change
							these later.
						</DialogDescription>
					</DialogHeader>
					Invite Modal
				</DialogContent>
			</Dialog>
		</>
	);
};
