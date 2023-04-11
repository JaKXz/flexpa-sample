import express, { type Application } from "express";

export default function flexpa(app: Application) {
  const router = express.Router();

  router.use("*", async (req, res, next) => {
    const accessToken = app.get("accessToken");
    const expiresIn = app.get("expiresIn");

    console.log("accessToken stored?", accessToken);

    if (expiresIn && accessToken && expiresIn > Date.now()) {
      return next();
    }

    console.log(req.body, process.env.FLEXPA_SECRET_KEY);

    const request = await fetch("https://api.flexpa.com/link/exchange", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        public_token: req.body.token,
        secret_key: process.env.FLEXPA_SECRET_KEY,
      }),
    });

    const { access_token, expires_in } = await request.json();

    app.set("accessToken", access_token);
    app.set("expiresIn", Date.now() + Number(expires_in) * 1000);

    console.log("accessToken exchanged!", access_token);

    next();
  });

  router.post("/:endpoint", async (req, res) => {
    const accessToken = app.get("accessToken");

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
