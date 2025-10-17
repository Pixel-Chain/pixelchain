// graphql/schema/userSchema.ts
import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
  type GraphQLFieldConfigMap,
} from "graphql";
import { queryResolvers, mutationResolvers } from "../resolvers/userResolvers.js";

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    createdAt: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "Query",
  fields: (): GraphQLFieldConfigMap<unknown, any> => ({
    users: {
      type: new GraphQLList(UserType),
      resolve: queryResolvers.users,
    },
    user: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: queryResolvers.user as any, // allow specific args internally
    },
  }),
});

const RootMutation = new GraphQLObjectType({
  name: "Mutation",
  fields: (): GraphQLFieldConfigMap<unknown, any> => ({
    createUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: mutationResolvers.createUser as any,
    },
  }),
});

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});
