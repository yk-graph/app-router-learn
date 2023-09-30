import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col gap-y-4">
        <div className="leading-6">
          <Link href="/server-with-fetch">server-with-fetch</Link>
          <p className="text-neutral-500">
            fetchはNext13から使用できるAPI
            <br />
            サーバー上の各fetchリクエストに対するキャッシュと再検証※revalidateの動作を設定できるようにした
            <br />
            サーバーコンポーネント、ルートハンドラ、サーバーアクションでasync/awaitを使用してfetchを使用できる
          </p>
        </div>
        <div className="leading-6">
          <Link href="/server-with-fetch">server-with-fetch</Link>
          <p className="text-neutral-500">
            fetchはNext13から使用できるAPI
            <br />
            サーバー上の各fetchリクエストに対するキャッシュと再検証※revalidateの動作を設定できるようにした
            <br />
            サーバーコンポーネント、ルートハンドラ、サーバーアクションでasync/awaitを使用してfetchを使用できる
          </p>
        </div>
      </div>
    </main>
  );
}
