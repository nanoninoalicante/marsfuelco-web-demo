import {
    ApolloClient,
    createHttpLink,
    InMemoryCache,
} from "@apollo/client/core";

// HTTP connection to the API
const httpLink = createHttpLink({
    // You should use an absolute URL here
    uri:
        import.meta.env.VITE_GRAPHQL_ENDPOINT ||
        "http://localhost:4000/graphql",
});

// Cache implementation
const cache = new InMemoryCache();

// Create the apollo client
export const apolloClient = new ApolloClient({
    link: httpLink,
    cache,
});