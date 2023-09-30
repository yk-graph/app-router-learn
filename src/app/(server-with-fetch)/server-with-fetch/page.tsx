import Link from "next/link";

export default async function ServerWithFetchPage() {
  return (
    <div className="flex flex-col gap-y-4">
      {/* SSG */}
      <div className="flex">
        <div className="min-w-[200px]">
          <h2>
            <Link href="/server-with-fetch/ssg">Static Site Generation</Link>
          </h2>
        </div>
        <p className="text-neutral-500">
          ビルド時に必要なデータを取得し、生成されたファイルをCDNなどにキャッシュすることにより、高速な配信を可能にします。
        </p>
      </div>

      {/* SSR */}
      <div className="flex">
        <div className="min-w-[200px]">
          <h2>
            <Link href="/server-with-fetch/ssr">Server Side Rendering</Link>
          </h2>
        </div>
        <p className="text-neutral-500">
          エンドポイントにアクセスがあるたびにサーバがデータを取得&サーバ側でレンダリングしてクライアントへHTMLを返します。
        </p>
      </div>

      {/* Revalidate */}
      <div className="flex">
        <div className="min-w-[200px]">
          <h2>
            <Link href="/server-with-fetch/revalidate">Revalidate</Link>
          </h2>
        </div>
        <p className="text-neutral-500">
          Revalidate（再検証）とは、データキャッシュを削除し最新のデータを再取得するプロセスです。
          データが変更され最新の情報を確実に表示したい場合に便利です。
        </p>
      </div>
    </div>
  );
}
