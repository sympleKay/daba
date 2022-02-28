"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const express_graphql_1 = require("express-graphql");
const schema_1 = __importDefault(require("./schema"));
const env_util_1 = require("./utils/env.util");
const databaseConnection_util_1 = require("./utils/databaseConnection.util");
const app = (0, express_1.default)();
(0, databaseConnection_util_1.DBCONNECTION)();
app.use((0, cors_1.default)({ origin: "*" }));
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json({ type: "application/vnd.api+json" }));
app.use(body_parser_1.default.json({ limit: "100mb" }));
app.use("/graphql", (0, express_graphql_1.graphqlHTTP)((req) => ({
    schema: schema_1.default,
    graphiql: true,
    context: {
        token: req.headers.authorization || "",
    },
    pretty: true,
    customFormatErrorFn: (err) => {
        var _a, _b, _c, _d;
        return {
            code: (_b = (_a = err === null || err === void 0 ? void 0 : err.originalError) === null || _a === void 0 ? void 0 : _a.response) === null || _b === void 0 ? void 0 : _b.status,
            message: ((_d = (_c = err === null || err === void 0 ? void 0 : err.originalError) === null || _c === void 0 ? void 0 : _c.response) === null || _d === void 0 ? void 0 : _d.data) || (err === null || err === void 0 ? void 0 : err.message),
            locations: err === null || err === void 0 ? void 0 : err.locations,
            path: err === null || err === void 0 ? void 0 : err.path,
        };
    },
})));
app.listen(env_util_1.PORT, () => console.log(`Server started on port: ${env_util_1.PORT}`));
