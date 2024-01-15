"use client";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

// NOTE: Make sure to pass children as props. This is the context that
// is passed from page to component and vice versa.
export default function Providers({ children }: { children: React.ReactNode }) {
  const client = new ApolloClient({
    // GraphQL Server
    uri: "http://localhost:3000/api/graphql",
    // Caching data retrieved from the server.
    cache: new InMemoryCache(),
  });

  return (
    <>
      {/* NOTE: The provider holds the context to be passed to the rest 
    of the application. It is best to put this as high as 
    possible in the tree. In the case of a Next app, wrap it 
    around the layout component. */}
      <ApolloProvider client={client}>
        <div>{children}</div>
      </ApolloProvider>
    </>
  );
}
