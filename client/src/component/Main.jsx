import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from '@apollo/client';
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
const Main = () => {
  const client = new ApolloClient({
    uri: 'http://localhost:4000/',
    cache: new InMemoryCache(),
  });
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
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
};
export default Main;
