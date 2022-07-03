import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  dataIdFromObject: (o) => o.id,
  uri: "http://localhost:3000/api/graphql",
  cache: new InMemoryCache(),
});

export default client;
