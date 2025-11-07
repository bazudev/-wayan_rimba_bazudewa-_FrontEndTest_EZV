import Image from "next/image";
import type { ReactNode } from "react";
import { StoreProvider } from "./StoreProvider";

import "./styles/globals.css";

interface Props {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <StoreProvider>
      <html lang="en">
        <body>
          <main style={{ margin: '10px auto', width: '50%' }}>{children}</main>
        </body>
      </html>
    </StoreProvider>
  );
}
