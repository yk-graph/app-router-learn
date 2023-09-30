import Link from "next/link";
import { clsx } from "clsx";

import { TodoType } from "@/types";

async function getTodoData() {
  const res = await fetch(`${process.env.API_URL}/todos`, {
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  const fetchData = await res.json();
  return fetchData.documents;
}

export const Revalidate0 = async () => {
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
    <div className="w-1/2 border rounded-sm p-8">
      <h3 className="text-xl mb-4">Revalidate 0</h3>
      <div className="flex flex-col gap-y-2">
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
            <Link href={`/server-with-fetch/revalidate/${item.id}`}>
              {item.task}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
