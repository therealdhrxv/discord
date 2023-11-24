import { create } from "zustand";
import { Server } from "@prisma/client";

export type ModalType = "createServer" | "invite";

interface ModalStore {
	type: ModalType | null;
	data: ModalData;
	isOpen: boolean;
	onOpen: (type: ModalType, data?: ModalData) => void;
	onClose: () => void;
}

interface ModalData {
	server?: Server
}

export const useModal = create<ModalStore>((set) => ({
	type: null,
	data: {},
	isOpen: false,
	onOpen: (type, data = {}) => set({ type, isOpen: true, data }),
	onClose: () => set({ type: null, isOpen: false }),
}));
