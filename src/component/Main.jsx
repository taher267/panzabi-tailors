// import ApolloClient from 'apollo-boost';
// import { InMemoryCache } from 'apollo-cache-inmemory';
// import { createHttpLink } from 'apollo-link-http';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './Nav/Nav';
// import Products from './Product/index';
import Dashboard from './Admin/Dashboard';
import Customer from './Customer';
import NewCustomer from './Customer/NewCustomer/NewCustomer';
import MeasurementList from './Admin/Measurement/MeasurementList';
import NewMeasuremen from './Admin/Measurement/NewMeasurement';
import UserList from './Admin/User/UserList';
import Login from './Admin/Auth/Login';
import Signup from './Admin/Auth/Signup';

import { AuthProvider } from './context/AuthContext';
import AuthRoute from './route/AuthRoute';
import ProtectedRoutes from './route/ProtectedRoutes';
import useAuth from './hooks/useAuth';
import EditCustomer from './Customer/NewCustomer/EditCustomer';
import EditMeasuremen from './Admin/Measurement/EditMeasurement';
import client from './../apolloClient';
import { ApolloProvider } from '@apollo/client';
import ProductList from './Admin/Product/ProductList';
import NewProduct from './Admin/Product/NewProduct';
import NewOrder from './Admin/Order/NewOrder';
import NewDesign from './Admin/Design/NewDesign';
import DesignsLists from './Admin/Design/DesignsLists';
import EditDesign from './Admin/Design/EditDesign';
import AccountsList from './Admin/Account/AccountsList';
import NewAccount from './Admin/Account/NewAccount';

const Main = () => {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        {/* <MainCard /> */}
        <BrowserRouter>
          {/* <DragableList /> */}
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/new-product" element={<NewProduct />} /> */}

            {/* <Route path="/new-measurement" element={<NewMeasuremen />} /> */}
            <Route element={<ProtectedRoutes />}>
              <Route path="/dashboard">
                <Route path="" element={<Dashboard />} />
                <Route path="customer">
                  <Route path="" element={<Customer />} />
                  <Route path="new" element={<NewCustomer />} />
                  <Route path="edit/:id" element={<EditCustomer />} />
                </Route>
                <Route path="design">
                  <Route path="" element={<DesignsLists />} />
                  <Route path="new" element={<NewDesign />} />
                  <Route path="edit/:id" element={<EditDesign />} />
                </Route>

                <Route path="account">
                  <Route path="" element={<AccountsList />} />
                  <Route path="new" element={<NewAccount />} />
                </Route>

                <Route path="product">
                  <Route path="" element={<ProductList />} />
                  <Route path="new" element={<NewProduct />} />
                </Route>
                <Route path="order">
                  {/* <Route path="" element={<ProductList />} /> */}
                  <Route path="new" element={<NewOrder />} />
                </Route>
                <Route path="measurement">
                  <Route path="" element={<MeasurementList />} />
                  <Route path="new" element={<NewMeasuremen />} />
                  <Route path="edit/:id" element={<EditMeasuremen />} />
                </Route>
                <Route path="user" element={<UserList />} />
              </Route>
            </Route>
            <Route element={<AuthRoute />}>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ApolloProvider>
  );
};
export default Main;

function Home() {
  const { logout } = useAuth();
  return (
    <>
      <h3>Home</h3>
      <p>
        <button onClick={logout}>Logout</button>
      </p>
    </>
  );
}
