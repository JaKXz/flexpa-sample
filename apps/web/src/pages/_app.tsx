import "uno.css";
import "../css/reset.css";

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className="max-w-2xl mx-auto">
      <Component {...pageProps} />
    </main>
  );
}
