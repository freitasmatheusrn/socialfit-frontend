import Link from "next/link";
import { api } from "@/lib/api";

export default async function HomePage() {
  const data = await api("/api/", { isServer: true });

  return (
    <div>
      <h1>Página Home2</h1>
      <Link href={""}></Link>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}