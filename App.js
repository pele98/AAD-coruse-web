import React from 'react';
import Pages from '/pages';
import GlobalStyle from '/components/GlobalStyle';
import { createRoot } from 'react-dom/client';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from 'apollo-link-context';
import { UserProvider } from './context/UserContext'

const uri = process.env.API_URL;
const cache = new InMemoryCache();
const httpLink = createHttpLink({ uri });

const authLink = setContext((_, { headers }) => {
  const authorization = localStorage.getItem('token') || '';
  return {
    headers: {
      ...headers,
      authorization: authorization
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  resolvers: {},
  connectToDevTools: true
});

const App = () => (
  <ApolloProvider client={client}>
    <UserProvider>
      <GlobalStyle />
      <Pages />
    </UserProvider>
  </ApolloProvider>
);

const root = createRoot(document.getElementById('root'));

root.render(<App />);
