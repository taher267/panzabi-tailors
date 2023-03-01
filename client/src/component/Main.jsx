import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './Nav/Nav';
// import Products from './Product/index';
import Dashboard from './Admin/Dashboard';
import Customer from './Customer/Customer';
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
import EditAccount from './Admin/Account/EditAccount';
import StaticNewOrder from './Admin/NewOrder';
import OrdersList from './Admin/Order/View/OrdersList';
// import FORM from '../component/FORM-PRACTICE';
import SingleOrder from './Admin/Order/View/SingleOrder';
import Print from './Admin/Order/View/Print';
import { TailorsProvider } from './context/TailorsContext';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Head from './graphql/Head';
import TemplateList from './Admin/Tempalte';
import NewTempate from './Admin/Tempalte/NewTemplate';
import NewInputField from './Admin/InputField/NewInputField';
import InputFieldList from './Admin/InputField';
import InputGroupFieldsSync from './Admin/InputField/InputGroupFieldsSync';
import {
  ACCOUNT_PATH,
  CUSTOMER_PATH,
  DASHBOARD_PATH,
  DESIGN_PATH,
  INPUT_FIELD_PATH,
  TEMPLATE_PATH,
  USER_PATH,
} from '../config';

const Main = () => {
  const [mode, setMode] = React.useState(
    localStorage.getItem('themeMode') || 'light'
  );
  // console.log(location.pathname);
  const handleMode = () => {
    setMode((p) => {
      const newMode = p === 'dark' ? 'light' : 'dark';
      localStorage.setItem('themeMode', newMode);
      return newMode;
    });
  };

  const darkTheme = createTheme({
    palette: {
      mode,
    },
  });

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Head />
        <AuthProvider>
          <TailorsProvider>
            {/* <MainCard /> */}
            <BrowserRouter>
              {/* <DragableList /> */}
              <Nav {...{ handleMode, mode }} />
              <Routes>
                <Route path="/" element={<Home />} />
                {/* <Route path="/form" element={<FORM />} /> */}
                <Route path="/NEW_ORDER" element={<StaticNewOrder />} />
                {/* <Route path="/new-product" element={<NewProduct />} /> */}

                {/* <Route path="/new-measurement" element={<NewMeasuremen />} /> */}
                <Route element={<ProtectedRoutes />}>
                  <Route path={DASHBOARD_PATH}>
                    <Route path="" element={<Dashboard />} />
                    <Route path={CUSTOMER_PATH}>
                      <Route path="" element={<Customer />} />
                      <Route path="new" element={<NewCustomer />} />
                      <Route path="edit/:id" element={<EditCustomer />} />
                    </Route>
                    <Route path={DESIGN_PATH}>
                      <Route path="" element={<DesignsLists />} />
                      <Route path="new" element={<NewDesign />} />
                      <Route path="edit/:id" element={<EditDesign />} />
                    </Route>
                    <Route path="products">
                      <Route path="" element={<ProductList />} />
                      <Route path="new" element={<NewProduct />} />
                    </Route>
                    <Route path="orders">
                      <Route path="" element={<OrdersList />} />
                      <Route path="new/:customerID" element={<NewOrder />} />
                      <Route path=":id" element={<SingleOrder />} />
                      <Route path="print/:id/:keey" element={<Print />} />
                    </Route>
                    <Route path="measurements">
                      <Route path="" element={<MeasurementList />} />
                      <Route path="new" element={<NewMeasuremen />} />
                      <Route path="edit/:id" element={<EditMeasuremen />} />
                    </Route>
                    <Route path={INPUT_FIELD_PATH}>
                      <Route path="" element={<InputFieldList />} />
                      <Route path="new" element={<NewInputField />} />

                      <Route
                        path=":fieldId"
                        element={<InputGroupFieldsSync />}
                      />
                      {/* 
                      
                      <Route path="edit/:id" element={<EditMeasuremen />} /> */}
                    </Route>
                    <Route path={USER_PATH} element={<UserList />} />{' '}
                    <Route path={TEMPLATE_PATH}>
                      <Route path="" element={<TemplateList />} />
                      <Route path="new" element={<NewTempate />} />
                    </Route>
                    <Route path={ACCOUNT_PATH}>
                      <Route path="" element={<AccountsList />} />
                      <Route path="new" element={<NewAccount />} />
                      <Route path="edit/:id" element={<EditAccount />} />
                    </Route>
                  </Route>
                </Route>
                <Route element={<AuthRoute />}>
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </TailorsProvider>
        </AuthProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
};
export default Main;

function Home() {
  // const { logout } = useAuth();
  return (
    <>
      <h3>Home</h3>
      <p>{/* <button onClick={logout}>Logout</button> */}</p>
    </>
  );
}
