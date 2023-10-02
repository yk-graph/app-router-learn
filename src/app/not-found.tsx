import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-4/5 flex flex-col items-center justify-center gap-y-8 mx-auto">
      <h2>Not Found</h2>
      <p>デフォルトのNot Foundを上書き</p>
      <Link href="/">Return Home</Link>
    </div>
  );
}
