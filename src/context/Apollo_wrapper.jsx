import { useState, createContext } from "react";
import {
  HttpLink,
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  split,
} from "@apollo/client";
import { useContext } from "react";
import config from "../config.json";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";

var confs;
if (process.env.REACT_APP_MILIEU !== "PROD") confs = config.dev;
else confs = config.prod;

export const apolloContext = createContext();

export const ApolloUseContext = () => {
  return useContext(apolloContext);
};

export default function ApolloWrapper({ children }) {
  const wrapper = useApolloWrapper();
  return (
    <apolloContext.Provider value={wrapper}>
      <ApolloProvider client={wrapper.client}> {children} </ApolloProvider>
    </apolloContext.Provider>
  );
}

function useApolloWrapper() {
  const [user, setUser] = useState();
  const httpLink = new HttpLink({
    uri: confs.route.GATEWAY_ADDRESS,
    headers: {
      authorization: user?.access_token ? user?.access_token : "",
    },
  });
  const wsLink = new WebSocketLink({
    uri: confs.route.WS_GATEWAY_ADDRESS,
    options: {
      reconnect: true,
    },
  });

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    wsLink,
    httpLink
  );

  const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            YOUR_FIELD: {
              merge(existing = [], incoming) {
                return { ...existing, ...incoming };
              },
            },
          },
        },
      },
    }),
  });

  return { client, setUser, user };
}
