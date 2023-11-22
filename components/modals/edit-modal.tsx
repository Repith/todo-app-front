"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useModal } from "@/hooks/use-modal-store";

const formSchema = z.object({
  id: z.number().nullable(),
  title: z
    .string()
    .min(1, { message: "Please enter a title." }),
  description: z
    .string()
    .min(1, { message: "Please upload a description." }),
  progress: z.boolean(),
});

export const EditTodoModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();

  const isModalOpen = isOpen && type === "editTodo";
  const { todo } = data;

  const handleClose = () => {
    onClose();
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: todo?.id || null,
      title: "",
      description: "",
      progress: false,
    },
  });

  useEffect(() => {
    if (todo) {
      form.setValue("id", todo.id);
      form.setValue("title", todo.title);
      form.setValue("description", todo.description);
      form.setValue("progress", todo.progress);
    }
  }, [todo, form]);

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (
    values: z.infer<typeof formSchema>
  ) => {
    try {
      console.log(values);
      const response = await fetch(
        `http://localhost:8080/v1/api/todo/${todo?.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (!response.ok) {
        throw new Error(
          `HTTP error! Status: ${response.status}`
        );
      }

      form.reset();
      router.refresh();
      onClose();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="p-0 overflow-hidden dark:bg-[#2B2D31]">
        <DialogHeader className="px-6 py-4 space-y-2">
          <DialogTitle className="text-2xl font-bold text-left">
            Delete TODO
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <div className="px-6 space-y-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-bold  text-zinc-600 dark:text-zinc-400">
                      Title
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="pl-2 border-0 text-primary bg-zinc-200 dark:bg-zinc-800 focus-visible:ring-0 focus-visible:ring-offset-0"
                        placeholder="Enter title"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-bold  text-zinc-600 dark:text-zinc-400">
                      Description
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="pl-2 border-0 text-primary bg-zinc-200 dark:bg-zinc-800 focus-visible:ring-0 focus-visible:ring-offset-0"
                        placeholder="Enter description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="px-6 py-4 bg-zinc-100 dark:bg-zinc-800">
              <Button variant="ghost" disabled={isLoading}>
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
