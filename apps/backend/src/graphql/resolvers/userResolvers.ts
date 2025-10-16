// graphql/resolvers.ts
import User from "../../models/User.js";

export const queryResolvers = {
  users: async (): Promise<User[]> => await User.findAll(),
  user: async (_: unknown, { id }: { id: number }): Promise<User | null> => 
    await User.findById(id),
};

export const mutationResolvers = {
  createUser: async (_: unknown, { name, email }: { name: string; email: string; }): Promise<User> => 
    await User.create(name, email),
};