import Link from "next/link";
import { clsx } from "clsx";

import { TodoType } from "@/types";

async function getTodoData() {
  const res = await fetch(`${process.env.API_URL}/todos`, {
    cache: "no-store",
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  const fetchData = await res.json();
  return fetchData.documents;
}

export default async function SsrPage() {
  const todoData = await getTodoData();

  const todosRegex = /todos\/([^/]+)/;

  const todos = todoData.map((item: TodoType) => {
    const todoId = item.name.match(todosRegex)?.[1];

    return {
      id: todoId,
      task: item.fields.task.stringValue,
      isDone: item.fields.isDone.booleanValue,
      createdAt: item.fields.createdAt.timestampValue,
      updatedAt: item.fields.updatedAt.timestampValue,
    };
  });

  return (
    <div className="p-8 w-2/3 mx-auto">
      <h2 className="text-xl mb-2">SSR - Server Side Rendering</h2>
      <p className="text-neutral-500">
        fetchするときにno-storeを指定することで、SSRとしてデータを取得することができる
      </p>
      <div className="flex flex-col gap-y-2 my-4">
        {todos.map((item: any) => (
          <div key={item.id} className="flex items-center">
            <p
              className={clsx(
                "mr-4",
                item.isDone ? "text-white" : "text-gray-600"
              )}
            >
              Done
            </p>
            <p className="mr-auto">{item.task}</p>
            <Link href={`/server-with-fetch/ssr/${item.id}`}>{item.id}</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
