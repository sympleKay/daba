import express, { Application } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { graphqlHTTP } from "express-graphql";
import schema from "./schema";
import { PORT } from "./utils/env.util";
import { DBCONNECTION } from "./utils/databaseConnection.util";

const app: Application = express();

DBCONNECTION();

app.use(cors({ origin: "*" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(bodyParser.json({ limit: "100mb" }));

app.use(
  "/graphql",
  graphqlHTTP((req) => ({
    schema: schema,
    graphiql: true,
    context: {
      token: req.headers.authorization || "",
    },
    pretty: true,
    customFormatErrorFn: (err: any) => {
      return {
        code: err?.originalError?.response?.status,
        message: err?.originalError?.response?.data || err?.message,
        locations: err?.locations,
        path: err?.path,
      };
    },
  }))
);

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
