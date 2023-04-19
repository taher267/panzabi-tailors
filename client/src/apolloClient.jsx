import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
// import { WebSocketLink } from '@apollo/client/link/ws';
import { setContext } from '@apollo/client/link/context';
import { ReactSession } from 'react-client-session';
// console.log(import.meta.env.VITE_URI);
const httpLink = createHttpLink({
  // uri: 'https://precious-daffodil-da626b.netlify.app',
  // uri: 'https://6339dccf0558fc1390238f4c--precious-daffodil-da626b.netlify.app',
  uri:
    import.meta.env.MODE === 'production'
      ? 'https://tailor-server.onrender.com'
      : 'http://localhost:4000',
  // uri: 'http://localhost:4000',
  // uri: import.meta.env.VITE_URI
  //   ? import.meta.env.VITE_URI
  //   : 'https:tailor-server.onrender.com',
  // uri: 'https://tailor-server.onrender.com',
  // uri: `https://tailors-panzabi-server.vercel.app`,
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
const apolloClient = new ApolloClient({
  // uri: 'http://localhost:4000/',
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default apolloClient;
