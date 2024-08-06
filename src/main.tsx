import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import ReactDOM from "react-dom/client";
import App from "./components/App.tsx";
import "./main.css";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    <MantineProvider theme={{ primaryColor: "dark" }}>
      <App />
    </MantineProvider>
  </ApolloProvider>
);
