"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const type_1 = require("graphql/type");
const users_1 = require("./users");
const query = new type_1.GraphQLObjectType({
    name: "QueryType",
    fields: {
        CurrentUser: users_1.CurrentUser,
    },
});
const mutation = new type_1.GraphQLObjectType({
    name: "Mutations",
    fields: {
        RegisterMutation: users_1.RegisterMutation,
        LoginMutation: users_1.LoginMutation,
        UpdateUserMutation: users_1.UpdateMutation,
    },
});
exports.default = new type_1.GraphQLSchema({
    query,
    mutation,
});
