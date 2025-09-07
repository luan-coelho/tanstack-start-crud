import fs from "node:fs";
import { useCallback, useState } from "react";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const filePath = "todos.json";

async function readTodos() {
  return JSON.parse(
    await fs.promises.readFile(filePath, "utf-8").catch(() =>
      JSON.stringify(
        [
          { id: 1, name: "Get groceries" },
          { id: 2, name: "Buy a new phone" },
        ],
        null,
        2
      )
    )
  );
}

const getTodos = createServerFn({
  method: "GET",
}).handler(async () => await readTodos());

const addTodo = createServerFn({ method: "POST" })
  .validator((d: string) => d)
  .handler(async ({ data }) => {
    const todos = await readTodos();
    todos.push({ id: todos.length + 1, name: data });
    await fs.promises.writeFile(filePath, JSON.stringify(todos, null, 2));
    return todos;
  });

export const Route = createFileRoute("/todos")({
  component: Home,
  loader: async () => await getTodos(),
});

function Home() {
  const router = useRouter();
  let todos = Route.useLoaderData();

  const [todo, setTodo] = useState("");

  const submitTodo = useCallback(async () => {
    todos = await addTodo({ data: todo });
    setTodo("");
    router.invalidate();
  }, [addTodo, todo]);

  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-full max-w-2xl p-8 rounded-xl border border-gray-200 bg-white shadow-lg">
        <h1 className="text-2xl mb-4">Start Server Functions - Todo Example</h1>
        <ul className="mb-4 space-y-2">
          {todos?.map((t: any) => (
            <li key={t.id} className="rounded-lg p-3">
              <span className="text-lg">{t.name}</span>
            </li>
          ))}
        </ul>
        <div className="flex flex-col gap-2">
          <Input
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                submitTodo();
              }
            }}
            placeholder="Enter a new todo..."
          />
          <Button disabled={todo.trim().length === 0} onClick={submitTodo}>
            Add todo
          </Button>
        </div>
      </div>
    </div>
  );
}
