import Link from "next/link";
import { clsx } from "clsx";
import moment from "moment";

import { TodoType } from "@/types";

async function getTodo(id: string) {
  const res = await fetch(`${process.env.API_URL}/todos/${id}`, {
    next: { revalidate: 20 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const fetchData: TodoType = await res.json();
  return fetchData;
}

export default async function RevalidateDetailPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const todoData = await getTodo(params.id);

  const todo = {
    task: todoData.fields.task.stringValue,
    isDone: todoData.fields.isDone.booleanValue,
    createdAt: todoData.fields.createdAt.timestampValue,
    updatedAt: todoData.fields.updatedAt.timestampValue,
  };

  return (
    <div className="p-8 w-2/3 mx-auto">
      <h2 className="text-xl mb-2">Revalidate - Dynamic Route</h2>
      <p className="text-neutral-500 mb-2">
        このページではTime-based-revalidationを使って、20秒指定でデータを再検証している
        <br />
        何も指定しない場合はSSRとして扱われるため、ブラウザのリロードするたびにデータが再取得される
      </p>
      <div className="flex items-center gap-y-2 my-4">
        <p
          className={clsx("mr-4", todo.isDone ? "text-white" : "text-gray-600")}
        >
          Done
        </p>
        <p className="mr-auto">{todo.task}</p>
        <p className="mr-4">
          {moment(new Date(todo.createdAt)).format("M/DD HH:mm")}
        </p>
        <Link href="/server-with-fetch/revalidate">back</Link>
      </div>
    </div>
  );
}