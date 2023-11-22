"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

export const DeleteTodoModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();

  const isModalOpen = isOpen && type === "deleteTodo";
  const { todo } = data;

  const [isLoading, setIsLoading] = useState(false);

  const onDelete = async () => {
    try {
      setIsLoading(true);

      const response = await fetch(
        `http://localhost:8080/v1/api/todo/${todo?.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error(
          `HTTP error! Status: ${response.status}`
        );
      }

      onClose();
      window.location.reload();
      router.refresh();
      router.push("/");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="p-0 overflow-hidden dark:bg-[#2B2D31]">
        <DialogHeader className="px-6 py-4 space-y-2">
          <DialogTitle className="text-2xl font-bold text-left">
            Delete TODO
          </DialogTitle>
          <DialogDescription className="text-left ">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-red-600">
              {todo?.title}?
            </span>{" "}
            <br />
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="px-6 py-3 bg-zinc-100 dark:bg-zinc-800 ">
          <div className="flex items-center justify-between w-full ">
            <Button
              disabled={isLoading}
              onClick={onClose}
              variant="ghost"
            >
              Cancel
            </Button>
            <Button
              disabled={isLoading}
              onClick={onDelete}
              variant="destructive"
            >
              Delete
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
