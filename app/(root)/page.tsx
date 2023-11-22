"use client";

import { useEffect, useState } from "react";

import { useModal } from "@/hooks/use-modal-store";

import Card from "./_components/Card";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";

interface Todo {
  id: number;
  title: string;
  description: string;
  progress: boolean;
}

const getData = async () => {
  try {
    const response = await fetch(
      "http://localhost:8080/v1/api/todo"
    );
    const data: Todo[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching todos:", error);
  }
};

const Home = () => {
  const { onOpen } = useModal();
  const [data, setData] = useState<Todo[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const result = await getData();
      if (!result) return console.log("No data available.");
      setData(result);
    };

    fetchData();
  }, []);

  const filteredData = data.filter((todo) =>
    todo.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <main>
      <div className="flex items-center justify-center flex-col pt-4">
        <div className="flex items-center justify-between flex-col">
          <h1 className="text-gray-200xl text-6xl text-center text-neutral-800 mb-2 font-bold">
            TODO App
          </h1>
          <h2 className="text-gray-200xl md:text-md text-center text-neutral-800 mb-6">
            CRUD application for job purposes
          </h2>
        </div>
        <div className="flex items-center justify-center">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-60 p-2 mr-2 border border-gray-300 rounded-md"
          />

          <Button onClick={() => onOpen("addTodo")}>
            <PlusCircleIcon className="h-4 w-4" />
            <p className="text-sm ml-2">Add Todo </p>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-4">
          {filteredData.map((todo) => (
            <Card key={todo.id} todo={todo} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Home;
