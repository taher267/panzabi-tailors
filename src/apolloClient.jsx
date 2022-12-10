import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ReactSession } from 'react-client-session';
const httpLink = createHttpLink({
  // uri: 'https://precious-daffodil-da626b.netlify.app',
  // uri: 'https://6339dccf0558fc1390238f4c--precious-daffodil-da626b.netlify.app',
  // uri: 'https://panzabi-tailors.onrender.com',
  uri: 'http://localhost:4000',
});
const authLink = setContext((_, { headers }) => {
  let token = ReactSession.get('token');
  console.log('token===', token);
  return {
    headers: {
      ...headers,
      'Access-Control-Allow-Origin': '*',
      accept: '*/*',
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
