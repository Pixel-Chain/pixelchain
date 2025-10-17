// graphql/resolvers.ts
import type { GraphQLFieldResolver } from "graphql";
import User from "../../models/User.js";

export const queryResolvers = {
  // Return all users
  users: (async (): Promise<User[]> => {
    return await User.findAll();
  }) as GraphQLFieldResolver<unknown, any>,

  // Return a user by id
  user: (async (
    _: unknown,
    args: { id: string }
  ): Promise<User | null> => {
    const { id } = args;
    return await User.findById(id);
  }) as GraphQLFieldResolver<unknown, any, { id: string }>,
};

export const mutationResolvers = {
  // Create a new user
  createUser: (async (
    _: unknown,
    args: { id: string; name: string; email: string }
  ): Promise<User> => {
    const { id, name, email } = args;
    return await User.create(id, name, email);
  }) as GraphQLFieldResolver<unknown, any, { id:string; name: string; email: string }>,
};
