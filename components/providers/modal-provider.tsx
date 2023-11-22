"use client";

import { MountedCheck } from "@/lib/mounted-check";
import { DeleteTodoModal } from "../modals/delete-modal";
import { EditTodoModal } from "../modals/edit-modal";
import { AddTodoModal } from "../modals/add-modal";

export const ModalProvider = () => {
  return (
    <>
      <MountedCheck>
        <DeleteTodoModal />
        <EditTodoModal />
        <AddTodoModal />
      </MountedCheck>
    </>
  );
};
