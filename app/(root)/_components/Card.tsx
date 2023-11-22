import { useModal } from "@/hooks/use-modal-store";
import { cn } from "@/lib/utils";
import { useState } from "react"; // Import useState

import { Edit, Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface DataProps {
  todo: {
    id: number;
    title: string;
    description: string;
    progress: boolean;
  };
}

const Card = ({ todo }: DataProps) => {
  const { onOpen } = useModal();
  const [isCompleted, setIsCompleted] = useState(
    todo.progress
  );

  const toggleCompletion = async () => {
    try {
      const updatedTodo = {
        ...todo,
        progress: !isCompleted,
      };

      const response = await fetch(
        `http://localhost:8080/v1/api/todo/${todo?.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedTodo),
        }
      );

      if (!response.ok) {
        throw new Error(
          `HTTP error! Status: ${response.status}`
        );
      }

      setIsCompleted((prevStatus) => !prevStatus);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="flex flex-col w-60 h-60 p-4 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <h1
          className={cn(
            "text-lg font-bold text-neutral-800 overflow-auto",
            isCompleted && "line-through"
          )}
        >
          {todo.title}
        </h1>
        <div className="flex justify-center items-center gap-x-2 overflow-auto">
          <Edit
            className="h-4 w-4 hover:text-indigo-600 ease-in-out transition-all"
            onClick={() => onOpen("editTodo", { todo })}
          />
          <Trash
            className="h-4 w-4 cursor-pointer hover:text-red-500 ease-in-out transition-all"
            onClick={() => onOpen("deleteTodo", { todo })}
          />
        </div>
      </div>

      <p
        className={cn(
          "text-sm text-neutral-700 overflow-auto h-full break-all",
          isCompleted && "line-through"
        )}
      >
        {todo.description}
      </p>
      <div className="flex items-center justify-center mt-auto cursor-pointer">
        <Badge
          variant={isCompleted ? "completed" : "progress"}
          onClick={toggleCompletion}
        >
          {isCompleted ? "Completed" : "In progress"}
        </Badge>
      </div>
    </main>
  );
};

export default Card;
