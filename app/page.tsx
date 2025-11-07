import type { Metadata } from "next";
import Link from "next/link";

export default function IndexPage() {
  // return <Counter />;
  return <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh' }}>
    <Link href="/todossr">Go to SSR Page</Link><br />
    <Link href="/todoisr">Go to ISR Page</Link><br />
  </div>;
}

export const metadata: Metadata = {
  title: "Redux Toolkit",
};
