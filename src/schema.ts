import { GraphQLObjectType, GraphQLSchema } from "graphql/type";
import {
  RegisterMutation,
  LoginMutation,
  CurrentUser,
  UpdateMutation,
} from "./users";

const query = new GraphQLObjectType({
  name: "QueryType",
  fields: {
    CurrentUser,
  },
});

const mutation = new GraphQLObjectType({
  name: "Mutations",
  fields: {
    RegisterMutation,
    LoginMutation,
    UpdateUserMutation: UpdateMutation,
  },
});

export default new GraphQLSchema({
  query,
  mutation,
});
