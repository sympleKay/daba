"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBCONNECTION = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const env_util_1 = require("./env.util");
const DBCONNECTION = () => {
    mongoose_1.default.connect(`${env_util_1.DB_PROTOCOL}${env_util_1.DB_USER}${env_util_1.DB_PASSWORD}${env_util_1.DB_HOST}${env_util_1.DB_NAME}`);
    const DB = mongoose_1.default.connection;
    DB.on("error", (err) => console.log(err));
    DB.once("open", () => {
        DB.watch();
        console.log(`Connection to DB was successful, DB running on port: ${DB.port}`);
    });
};
exports.DBCONNECTION = DBCONNECTION;
