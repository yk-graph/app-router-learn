import Link from "next/link";
import { notFound } from "next/navigation";
import { clsx } from "clsx";
import moment from "moment";

import { TodoType } from "@/types";

async function getTodo(id: string) {
  const res = await fetch(`${process.env.API_URL}/todos/${id}`, {
    cache: "no-store",
  });

  // [Tips]一番初めにここでエラーを拾ってしまうため、NotFoundに遷移させたいのであればここのエラーハンドリングは不要
  // if (!res.ok) {
  //   throw new Error("Failed to fetch data");
  // }

  const fetchData: TodoType = await res.json();
  return fetchData;
}

export default async function SsrDetailPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const todoData = await getTodo(params.id);

  if (!todoData.fields) {
    return notFound();
  }

  const todo = {
    task: todoData.fields.task.stringValue,
    isDone: todoData.fields.isDone.booleanValue,
    createdAt: todoData.fields.createdAt.timestampValue,
    updatedAt: todoData.fields.updatedAt.timestampValue,
  };

  return (
    <div className="p-8 w-2/3 mx-auto">
      <h2 className="text-xl mb-2">SSR - Dynamic Route</h2>
      <p className="text-neutral-500 mb-2">
        動的なルーティングのidはparamsとして受け取ることができる
        <br />
        ダイナミックセグメントはlayout、page、route、generateMetadata関数にparams
        propとして渡されます。
      </p>
      <a
        href="https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes"
        target="_blank"
      >
        参考
      </a>
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
        <Link href="/server-with-fetch/ssr">back</Link>
      </div>
    </div>
  );
}
