import "uno.css";
import "../css/reset.css";

import type { AppProps } from "next/app";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${roboto.style.fontFamily};
        }
      `}</style>

      <main className="mx-auto max-w-4xl">
        <Component {...pageProps} />
      </main>
    </>
  );
}
