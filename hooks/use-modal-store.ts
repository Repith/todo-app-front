import { create } from "zustand";

export type ModalType =
  | "deleteTodo"
  | "addTodo"
  | "editTodo";

interface Todo {
  id: number;
  title: string;
  description: string;
  progress: boolean;
}

interface ModalData {
  todo?: Todo;
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) =>
    set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false }),
}));
