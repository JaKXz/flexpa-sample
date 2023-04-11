import { log } from "logger";
import { createServer } from "./server";

const port = process.env.PORT || 3001;
const server = createServer();

server.listen(port, () => {
  log(`api running on ${port}`);
  log(
    `env variables: PORT:${process.env.PORT} FLEXPA_SECRET_KEY:${process.env.FLEXPA_SECRET_KEY}`
  );
});
