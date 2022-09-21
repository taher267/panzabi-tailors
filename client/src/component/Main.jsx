import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

// import ApolloClient from 'apollo-boost';
// import { InMemoryCache } from 'apollo-cache-inmemory';
// import { createHttpLink } from 'apollo-link-http';
// import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './Nav/Nav';
// import Products from './Product/index';
import Dashboard from './Admin/Dashboard';
import Customer from './Customer';
import NewCustomer from './Customer/NewCustomer/NewCustomer';
import Measurement from './Admin/Measurement';
import NewMeasuremen from './Admin/Measurement/NewMeasurement';
import DragableList from './dragableList';
import UserList from './Admin/User/UserList';
import Login from './Admin/Auth/Login';
import Signup from './Admin/Auth/Signup';
// const httpLink = createHttpLink({
//   uri: 'http://localhost:4000',
// });
// const client = new ApolloClient({
//   link: httpLink,
//   cache: new InMemoryCache(),
// });

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
});
const Main = () => {
  return (
    <ApolloProvider client={client}>
      {/* <MainCard /> */}
      <BrowserRouter>
        {/* <DragableList /> */}
        <Nav />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/customer/new" element={<NewCustomer />} />
          <Route path="/dashboard/measurement" element={<Measurement />} />
          <Route path="/user" element={<UserList />} />
          <Route
            path="/dashboard/measurement/new"
            element={<NewMeasuremen />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
};
export default Main;
