import Script from "next/script";
import { useEffect, useState } from "react";
import { Button } from "ui";

import { useLocalStorage } from "../hooks/use-local-storage";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST || "http://localhost:3001";

export default function Web() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const [publicToken, setPublicToken] = useLocalStorage("publicToken", "");

  useEffect(() => {
    if (!publicToken) return;
    setLoading(true);
    const abortController = new AbortController();

    const _req = fetch(`${API_HOST}/flexpa/ExplanationOfBenefit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ publicToken }),
      signal: abortController.signal,
    })
      .then((res) => res.json())
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        console.error(err);
        setData({ error: err.message });
      })
      .finally(() => {
        setLoading(false);
      });

    return () => {
      abortController.abort();
    };
  }, [publicToken]);

  const loadingMarkup = loading ? (
    <p className="my-4 text-blue">Loading...</p>
  ) : null;
  const isEmpty = !data || !publicToken || !!data.error;

  return (
    <>
      <Script
        src="https://js.flexpa.com/v1/"
        onLoad={() => {
          // @ts-ignore
          FlexpaLink.create({
            publishableKey:
              process.env.NEXT_PUBLIC_FLEXPA_PUBLISHABLE_KEY || "",
            onSuccess: (publicToken: string) => {
              setPublicToken(publicToken);
            },
          });
        }}
      />
      <h1 className="text-6xl my-12 max-w-2xl mx-auto">
        Flexible Patient Access Data Explorer
      </h1>
      {loadingMarkup}
      {isEmpty && !loading && (
        <Button
          onClick={() => {
            // @ts-ignore
            FlexpaLink.open();
          }}
        >
          Choose your provider (Humana)
        </Button>
      )}
      {!isEmpty && (
        <pre className="whitespace-pre-wrap">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
      {!loading && data?.error && <p className="text-red">{data.error}</p>}
    </>
  );
}
