import { GraphQLString, GraphQLNonNull, GraphQLArgument } from "graphql/type";

import { register, login, currentUser, update } from "./user.service";
import { UserType, LoginType } from "./user.type";

export const RegisterMutation = {
  type: GraphQLString,
  args: {
    firstName: { type: GraphQLNonNull(GraphQLString) },
    lastName: { type: GraphQLNonNull(GraphQLString) },
    email: { type: GraphQLNonNull(GraphQLString) },
    username: { type: GraphQLNonNull(GraphQLString) },
    password: { type: GraphQLNonNull(GraphQLString) },
    bio: { type: GraphQLNonNull(GraphQLString) },
    photo: { type: GraphQLString },
  },
  resolve: (_: unknown, args: any, context: unknown) => {
    return register(args, context);
  },
};

export const LoginMutation = {
  type: LoginType,
  args: {
    email: { type: GraphQLNonNull(GraphQLString) },
    password: { type: GraphQLNonNull(GraphQLString) },
  },
  resolve: (_: unknown, args: any, context: unknown) => {
    return login(args, context);
  },
};

export const CurrentUser = {
  type: UserType,
  resolve: (_: unknown, args: unknown, context: unknown) =>
    currentUser(args, context),
};

export const UpdateMutation = {
  type: UserType,
  args: {
    firstName: { type: GraphQLNonNull(GraphQLString) },
    lastName: { type: GraphQLNonNull(GraphQLString) },
    email: { type: GraphQLNonNull(GraphQLString) },
    username: { type: GraphQLNonNull(GraphQLString) },
    password: { type: GraphQLNonNull(GraphQLString) },
    bio: { type: GraphQLNonNull(GraphQLString) },
    photo: { type: GraphQLString },
  },
  resolve: (_: unknown, args: any, context: unknown) => {
    return update(args, context);
  },
};
