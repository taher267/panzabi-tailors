import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ReactSession } from 'react-client-session';
const httpLink = createHttpLink({
  uri: 'https://pz-front-end.herokuapp.com',
  // uri: 'http://localhost:4000',
});
const authLink = setContext((_, { headers }) => {
  let token = ReactSession.get('token');
  console.log('token', token);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});
const client = new ApolloClient({
  // uri: 'http://localhost:4000/',
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
