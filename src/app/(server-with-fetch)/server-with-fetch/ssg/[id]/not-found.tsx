import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-4/5 flex flex-col items-center justify-center gap-y-8 mx-auto">
      <h2>Not Found</h2>
      <p>SSGの詳細ページで存在しないIDを指定した時にNotFoundにする</p>
      <p>
        - 個別ページでnotFound関数をnext/navigationからimportする必要がある -
        個別ページでエラーハンドリングすると（throw
        Errorしてしまうと）NotFoundページが表示されないので注意
      </p>
      <Link href="/server-with-fetch/ssg">Return SSG index</Link>
    </div>
  );
}
