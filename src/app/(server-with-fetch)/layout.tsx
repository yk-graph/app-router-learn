import Link from "next/link";

export default function ServerWithFetchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <header className="py-4 px-8 border-b flex items-center justify-between">
        <h1>
          <Link href="/server-with-fetch">On the server, with fetch</Link>
        </h1>
        <Link href="/">Home</Link>
      </header>
      <main className="flex min-h-screen flex-col p-24">{children}</main>
    </div>
  );
}
