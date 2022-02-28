import mongoose from "mongoose";
import {
  DB_PROTOCOL,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_NAME,
} from "./env.util";

export const DBCONNECTION = () => {
  mongoose.connect(
    `${DB_PROTOCOL}${DB_USER}${DB_PASSWORD}${DB_HOST}${DB_NAME}`
  );
  const DB = mongoose.connection;
  DB.on("error", (err) => console.log(err));
  DB.once("open", () => {
    DB.watch();
    console.log(
      `Connection to DB was successful, DB running on port: ${DB.port}`
    );
  });
};
