require("dotenv").config();

const { createStore } = require("./utils");

const LaunchAPI = require("./datasources/launch");
const UserAPI = require("./datasources/user");

const store = createStore();
const resolvers = require("./resolvers");

const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    launchAPI: new LaunchAPI(),
    userAPI: new UserAPI({ store }),
  }),
});

const port = 4002;

server.listen({ port: port }).then(() => {
  console.log(`
    Server is running!
    Listening on port ${port}
    Explore at https://studio.apollographql.com/sandbox
  `);
});
