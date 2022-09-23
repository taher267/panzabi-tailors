import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloProvider,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
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
import MeasurementList from './Admin/Measurement/MeasurementList';
import NewMeasuremen from './Admin/Measurement/NewMeasurement';
import DragableList from './dragableList';
import UserList from './Admin/User/UserList';
import Login from './Admin/Auth/Login';
import Signup from './Admin/Auth/Signup';
import { ReactSession } from 'react-client-session';
import { AuthProvider } from './context/AuthContext';
import AuthRoute from './route/AuthRoute';
import ProtectedRoutes from './route/ProtectedRoutes';
import useAuth from './hooks/useAuth';
import EditCustomer from './Customer/NewCustomer/EditCustomer';
import EditMeasuremen from './Admin/Measurement/EditMeasurement';
// const httpLink = createHttpLink({
//   uri: 'http://localhost:4000',
// });
const httpLink = createHttpLink({
  uri: 'http://localhost:4000',
});
// const client = new ApolloClient({
//   link: httpLink,
//   cache: new InMemoryCache(),
// });
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

            <Route element={<ProtectedRoutes />}>
              <Route path="/dashboard" element={<Dashboard />} />
              {/* <Route path="/customer" element={<Customer />} /> */}
              <Route path="/customer">
                <Route path="" element={<Customer />} />
                <Route path="new" element={<NewCustomer />} />
                <Route path="edit/:id" element={<EditCustomer />} />
              </Route>

              <Route path="/dashboard/measurement">
                <Route path="" element={<MeasurementList />} />
                <Route path="new" element={<NewMeasuremen />} />
                <Route path="edit/:id" element={<EditMeasuremen />} />
              </Route>
              <Route path="/user" element={<UserList />} />
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
