import React from "react";
import ReactDOM from "react-dom";
import '../public/favicon.ico';
import "./App.css";
import App from "./App.js";

//Graphql
import { ApolloClient } from 'apollo-boost';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo'
import { onError } from "apollo-link-error";

import { AUTH_TOKEN, GRAPHQL_URL } from './Utils/Constans/Communication';


// const linkError = onError(({ graphQLErrors, networkError }) => {
//     if (graphQLErrors)
//         graphQLErrors.map(({ message, locations, path }) =>
//             console.log(
//                 `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
//             ),
//         );

//     if (networkError) console.log(`[Network error]: ${networkError}`);
// });

const httpLink = createHttpLink({
    uri: GRAPHQL_URL,
});

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem(AUTH_TOKEN);
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({ addTypename: false }),

});

ReactDOM.render(

    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,

    document.getElementById("root"));