import { clsx } from "clsx";

import { TodoType } from "@/types";

async function getTodoData() {
  // 処理を2秒待機
  await new Promise((resolve) => setTimeout(resolve, 2000));

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

export const NoStore = async () => {
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
    <div className="border rounded-sm p-8">
      <h2 className="text-xl mb-4">NoStore</h2>
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
            <p className="mr-auto">{item.id}</p>
            <p>{item.task}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
