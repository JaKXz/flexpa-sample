import Script from "next/script";
import { useEffect, useState } from "react";
import { Button } from "ui";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST || "http://localhost:3001";

export default function Web() {
  const [data, setData] = useState<any>(null);
  const [publicToken, setPublicToken] = useState("");

  useEffect(() => {
    const req = fetch(`${API_HOST}/flexpa/ExplanationOfBenefit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: localStorage.getItem("publicToken") }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("yayy");
        setData(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [publicToken]);
  return (
    <>
      <Script
        src="https://js.flexpa.com/v1/"
        onLoad={() => {
          FlexpaLink.create({
            publishableKey:
              process.env.NEXT_PUBLIC_FLEXPA_PUBLISHABLE_KEY || "",
            onSuccess: (publicToken: string) => {
              // Send `publicToken` to your backend to exchange it for a patient `access_token`
              // https://www.flexpa.com/docs/sdk/login#exchange
              console.log("publicToken: ", publicToken);
              localStorage.setItem("publicToken", publicToken);
              setPublicToken(publicToken);
            },
          });
        }}
      />
      <h1>Web</h1>
      <Button onClick={() => FlexpaLink.open()}>choose a flexpa thing</Button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
}
