import Link from "next/link";
import { notFound } from "next/navigation";
import { clsx } from "clsx";
import moment from "moment";

import { TodoType } from "@/types";

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const fetchData = await fetch(`${process.env.API_URL}/todos`).then((res) => {
    // [Tips]一番初めにここでエラーを拾ってしまうため、NotFoundに遷移させたいのであればここのエラーハンドリングは不要
    // if (!res.ok) {
    //   throw new Error("Failed to fetch data");
    // }

    return res.json();
  });

  const todosRegex = /todos\/([^/]+)/;
  return fetchData.documents.map((item: TodoType) => {
    const todoId = item.name.match(todosRegex)?.[1];

    return {
      id: todoId,
    };
  });
}

async function getTodo(id: string) {
  const res = await fetch(`${process.env.API_URL}/todos/${id}`);

  const fetchData: TodoType = await res.json();
  return fetchData;
}

export default async function SsgDetailPage({
  params,
}: {
  params: { id: string };
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
      <h2 className="text-xl mb-2">SSG - Dynamic Route</h2>
      <p className="text-neutral-500 mb-2">
        Next12までのgetStaticPathsが、Next13からはgenerateStaticParamsに該当する
        <br />
        そのため詳細ページをSSGとして生成する場合はデータ取得時にgenerateStaticParams
        で動的なルートを事前に生成する必要がある
        <br />
        .next/server/app/server-with-fetch/ssg/:id.html にhtmlファイルが作られる
      </p>
      <a
        href="https://nextjs.org/docs/app/api-reference/functions/generate-static-params"
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
        <Link href="/server-with-fetch/ssg">back</Link>
      </div>
    </div>
  );
}
