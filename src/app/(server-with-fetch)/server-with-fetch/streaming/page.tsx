import { Suspense } from "react";
import { Revalidate0 } from "../_components/revalidate0";
import { Revalidate15 } from "../_components/revalidate15";
import { Spinner } from "../_components/spinner";

export default async function SsrPage() {
  return (
    <div className="p-8 w-2/3 mx-auto">
      <h2 className="text-xl mb-2">Streaming</h2>
      <p className="text-neutral-500">
        Revalidateでデータを取得、2秒と5秒で取得のタイミングを遅延している
        <br />
        Suspenseに対してfallbackのpropsを渡して、その中にローディングUIコンポーネントを入れる
      </p>
      <div className="flex gap-x-8 mt-6">
        <Suspense fallback={<Spinner />}>
          <Revalidate0 />
        </Suspense>

        <Suspense fallback={<Spinner />}>
          <Revalidate15 />
        </Suspense>
      </div>
    </div>
  );
}
