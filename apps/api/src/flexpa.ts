import express, { type Application } from "express";
import fetch from "node-fetch";

export default function flexpa(app: Application) {
  const router = express.Router();

  router.use("*", async (req, res, next) => {
    const accessToken = app.get(`accessToken-${req.body.publicToken}`);
    const expiresIn = app.get(`expiresIn-${req.body.publicToken}`);

    if (expiresIn && accessToken && expiresIn > Date.now()) {
      return next();
    }

    const request = await fetch("https://api.flexpa.com/link/exchange", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        public_token: req.body.publicToken,
        secret_key: process.env.FLEXPA_SECRET_KEY,
      }),
    });

    const { access_token, expires_in } = (await request.json()) as {
      access_token: string;
      expires_in: string;
    };

    app.set(`accessToken-${req.body.publicToken}`, access_token);
    app.set(
      `expiresIn-${req.body.publicToken}`,
      Date.now() + Number(expires_in) * 1000
    );

    next();
  });

  router.post("/:endpoint", async (req, res) => {
    const accessToken = app.get(`accessToken-${req.body.publicToken}`);

    const url = `https://api.flexpa.com/fhir/${req.params.endpoint}?patient=$PATIENT_ID`;

    const request = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await request.json();

    res.send(data);
  });

  return router;
}
