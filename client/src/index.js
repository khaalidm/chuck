import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';

import App from './App';
import './index.css';
import * as serviceWorker from './serviceWorker';


const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'http://localhost:4000/',
});

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'cache-and-network'
  },
  query: {
    fetchPolicy: 'cache-and-network'
  },
}


const client = new ApolloClient({
   // Provide required constructor fields
   cache: cache,
   link: link,
   name: 'react-web-client',
   defaultOptions: defaultOptions
})


ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();

