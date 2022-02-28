"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginType = exports.UserType = void 0;
const type_1 = require("graphql/type");
exports.UserType = new type_1.GraphQLObjectType({
    name: "UserType",
    description: "User property",
    fields: () => ({
        id: {
            type: type_1.GraphQLID,
            description: "User ID",
            resolve: (obj, args, context) => obj._id || obj.id,
        },
        username: {
            type: type_1.GraphQLString,
            description: "User unique username",
        },
        email: {
            type: type_1.GraphQLString,
            description: "User unique email address",
        },
        firstName: {
            type: type_1.GraphQLString,
            description: "User first name",
        },
        lastName: {
            type: type_1.GraphQLString,
            description: "User last name",
        },
        photo: {
            type: type_1.GraphQLString,
            description: "Photo url",
        },
        bio: {
            type: type_1.GraphQLString,
            description: "User bio",
        },
        lastLogin: {
            type: new type_1.GraphQLScalarType({
                name: "LastLogin",
                description: "User last login",
                serialize(value) {
                    return value.getTime();
                },
                parseValue(value) {
                    return new Date(value);
                },
            }),
        },
        createdAt: {
            type: new type_1.GraphQLScalarType({
                name: "UserCreationDate",
                description: "User creation date",
                serialize(value) {
                    return value.getTime();
                },
                parseValue(value) {
                    return new Date(value);
                },
            }),
        },
    }),
});
exports.LoginType = new type_1.GraphQLObjectType({
    name: "LoginType",
    description: "User property",
    fields: () => ({
        accessToken: {
            type: type_1.GraphQLString,
            description: "User access token",
        },
        email: {
            type: type_1.GraphQLString,
            description: "User unique email address",
        },
    }),
});
