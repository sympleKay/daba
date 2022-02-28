"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMutation = exports.CurrentUser = exports.LoginMutation = exports.RegisterMutation = void 0;
const type_1 = require("graphql/type");
const user_service_1 = require("./user.service");
const user_type_1 = require("./user.type");
exports.RegisterMutation = {
    type: type_1.GraphQLString,
    args: {
        firstName: { type: (0, type_1.GraphQLNonNull)(type_1.GraphQLString) },
        lastName: { type: (0, type_1.GraphQLNonNull)(type_1.GraphQLString) },
        email: { type: (0, type_1.GraphQLNonNull)(type_1.GraphQLString) },
        username: { type: (0, type_1.GraphQLNonNull)(type_1.GraphQLString) },
        password: { type: (0, type_1.GraphQLNonNull)(type_1.GraphQLString) },
        bio: { type: (0, type_1.GraphQLNonNull)(type_1.GraphQLString) },
        photo: { type: type_1.GraphQLString },
    },
    resolve: (_, args, context) => {
        return (0, user_service_1.register)(args, context);
    },
};
exports.LoginMutation = {
    type: user_type_1.LoginType,
    args: {
        email: { type: (0, type_1.GraphQLNonNull)(type_1.GraphQLString) },
        password: { type: (0, type_1.GraphQLNonNull)(type_1.GraphQLString) },
    },
    resolve: (_, args, context) => {
        return (0, user_service_1.login)(args, context);
    },
};
exports.CurrentUser = {
    type: user_type_1.UserType,
    resolve: (_, args, context) => (0, user_service_1.currentUser)(args, context),
};
exports.UpdateMutation = {
    type: user_type_1.UserType,
    args: {
        firstName: { type: (0, type_1.GraphQLNonNull)(type_1.GraphQLString) },
        lastName: { type: (0, type_1.GraphQLNonNull)(type_1.GraphQLString) },
        email: { type: (0, type_1.GraphQLNonNull)(type_1.GraphQLString) },
        username: { type: (0, type_1.GraphQLNonNull)(type_1.GraphQLString) },
        password: { type: (0, type_1.GraphQLNonNull)(type_1.GraphQLString) },
        bio: { type: (0, type_1.GraphQLNonNull)(type_1.GraphQLString) },
        photo: { type: type_1.GraphQLString },
    },
    resolve: (_, args, context) => {
        return (0, user_service_1.update)(args, context);
    },
};
