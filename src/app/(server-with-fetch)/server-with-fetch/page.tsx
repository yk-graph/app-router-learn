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
          AppRouterではfetchする時にforce-cacheを指定する※デフォルトなので指定しなくてもOK
          <br />
          PageRouterではgetStaticPropsに該当
          <br />
          Next.jsは、データキャッシュから一致するリクエストを探します。
          一致するものがあり、それが新しい場合は、キャッシュから返されます。
          一致するものがなかったり、古かったりすると、Next.jsはリモートサーバーからリソースを取得し、ダウンロードしたリソースでキャッシュを更新します。
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
          AppRouterではfetchする時にno-storeのオプションを指定する
          <br />
          PageRouterではgetServerSidePropsに該当
          <br />
          Next.jsはリクエストごとにキャッシュを見ずにリモートサーバーからリソースをフェッチし、ダウンロードしたリソースでキャッシュを更新しません。
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
          <br />
          false - リソースを無期限にキャッシュします。
          <br />
          0 - リソースをキャッシュしないようにします。
          <br />
          number - リソースのキャッシュ有効期間を最大n秒に指定します。
        </p>
      </div>

      {/* Streaming */}
      <div className="flex">
        <div className="min-w-[200px]">
          <h2>
            <Link href="/server-with-fetch/streaming">Streaming</Link>
          </h2>
        </div>
        <p className="text-neutral-500">
          サーバーコンポーネントでデータの取得タイミングが違う場合でもいい感じにローディングUIを表示する
          <br />
          Suspenceを使う
        </p>
      </div>
    </div>
  );
}
