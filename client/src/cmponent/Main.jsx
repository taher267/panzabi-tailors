import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from '@apollo/client';
import Animals from './Amimals';
import MainCard from './MainCard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Animal from './Amimals/animal';
import Nav from './Nav/Nav';
import Products from './Product/index';
const Main = () => {
  const client = new ApolloClient({
    uri: 'http://localhost:4000/',
    cache: new InMemoryCache(),
  });
  return (
    <ApolloProvider client={client}>
      {/* <MainCard /> */}
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Animals />} />
          <Route path="/:id" element={<Animal />} />
          <Route path="/shop" element={<Products />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
};
export default Main;
