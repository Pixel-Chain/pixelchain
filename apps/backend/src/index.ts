// server.ts
import express from "express";
import type { Request, Response } from "express";
import { createServer } from "http";
import { Server as IOServer } from "socket.io";
import { graphqlHTTP } from "express-graphql";
import { schema } from "./graphql/schemas/userSchema.js";

const app = express();
const server = createServer(app);
const io: IOServer = new IOServer(server);

// Middleware
app.use(express.json());

// GraphQL endpoint
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true, // Disable in production
  })
);

// Root route
app.get("/", (req: Request, res: Response) => 
  res.send("PixelChain GraphQL API running")
);

// Socket.IO
io.on("connection", (socket) => {
  console.log("a user connected");
});

server.listen(4000, () => {
  console.log("Backend listening on 4000");
  console.log("GraphQL ready at http://localhost:4000/graphql");
});