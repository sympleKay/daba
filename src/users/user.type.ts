import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLScalarType,
} from "graphql/type";

export const UserType = new GraphQLObjectType({
  name: "UserType",
  description: "User property",
  fields: () => ({
    id: {
      type: GraphQLID,
      description: "User ID",
      resolve: (obj, args, context) => obj._id || obj.id,
    },
    username: {
      type: GraphQLString,
      description: "User unique username",
    },
    email: {
      type: GraphQLString,
      description: "User unique email address",
    },
    firstName: {
      type: GraphQLString,
      description: "User first name",
    },
    lastName: {
      type: GraphQLString,
      description: "User last name",
    },
    photo: {
      type: GraphQLString,
      description: "Photo url",
    },
    bio: {
      type: GraphQLString,
      description: "User bio",
    },
    lastLogin: {
      type: new GraphQLScalarType({
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
      type: new GraphQLScalarType({
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
export const LoginType = new GraphQLObjectType({
  name: "LoginType",
  description: "User property",
  fields: () => ({
    accessToken: {
      type: GraphQLString,
      description: "User access token",
    },
    email: {
      type: GraphQLString,
      description: "User unique email address",
    },
  }),
});
