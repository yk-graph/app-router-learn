import Link from "next/link";
import { clsx } from "clsx";

import { TodoType } from "@/types";

async function getTodoData() {
  const res = await fetch(`${process.env.API_URL}/todos`, {
    next: { revalidate: 0 },
  });
  // const res = await fetch(`${process.env.API_URL}/todos`);

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  const fetchData = await res.json();
  return fetchData.documents;
}

export default async function RevalidatePage() {
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
      <h2 className="text-xl mb-2">Revalidate</h2>
      <p className="text-neutral-500">
        fetchするときに revalidate を指定することで実現できる
        <span className="text-white text-bold"> Time-based revalidation </span>
        と<span className="text-white text-bold"> On-demand revalidation </span>
        の2種類がある
        <br />
        ※このページではTime-based
        revalidationを使って、10秒ごとにデータを再検証している
      </p>
      <hr className="my-4" />
      <p className="text-neutral-500">
        <span className="text-white text-bold">Time-based revalidation </span>
        は指定した時間が経過した場合データを自動的に再検証します。データの変更頻度が低く、鮮度がそれほど重要でない場合に便利です。
        <a
          href="https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#time-based-revalidation"
          target="_blank"
        >
          参考
        </a>
        <br />
        <span className="text-white text-bold">On-demand revalidation </span>
        はイベント（フォーム送信など）に基づいてデータを手動で再検証します。On-demand
        revalidationでは、タグベースまたはパスベースのアプローチを使用して、データのグループを一度に再検証できます。これは、最新のデータをできるだけ早く表示したい場合に便利です（ヘッドレス
        CMS からのコンテンツが更新された場合など）
        <a
          href="https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#on-demand-revalidation"
          target="_blank"
        >
          参考
        </a>
      </p>

      <div className="flex flex-col gap-y-2 my-4">
        {todos.map((item: any) => (
          <div key={item.id} className="flex items-center">
            <p
              className={clsx(
                "mr-8",
                item.isDone ? "text-white" : "text-gray-600"
              )}
            >
              Done
            </p>
            <p className="mr-auto">{item.task}</p>
            <Link href={`/server-with-fetch/revalidate/${item.id}`}>
              {item.id}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
