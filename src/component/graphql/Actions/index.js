import { NEW_CUSTOMER, EDIT_CUSTOMER } from './../Mutations/customerMut';
import { NEW_PRODUCT, EDIT_PRODUCT } from './../Mutations/productMut';
import { NEW_ORDER } from './../Mutations/orderMut';
import { ALL_ORDERS, SINGLE_ORDER } from './../Query/orderQry';
import {
  NEW_MEASUREMENT,
  EDIT_MEASUREMENT,
} from './../Mutations/measurementMut';
import { ALL_USERS } from '../Query/userQry';
import { ALL_CUSTOMERS, SINGLE_CUSTOMER } from './../Query/customerQry';
import { ALL_MEASUREMENTS, SINGLE_MEASUREMENT } from '../Query/measurementQry';
import { ALL_PRODUCTS } from '../Query/productQry';
import { NEW_DESIGN, EDIT_DESIGN } from './../Mutations/designMut';
import { ALL_DESIGNS, SINGLE_DESIGN } from './../Query/designQry';
import { ALL_ACCOUNTS, DAILY_ACCOUNT } from './../Query/accountQry';
import { PRODUCTS_NAME_ID_CAT } from './../Query/productQry';
import { LOGIN, SIGNUP } from './../Mutations/authMut';
import {
  NEW_ACCOUNT,
  EDIT_ACCOUNT,
  DELETE_ACCOUNT,
} from './../Mutations/accountMut';

export default {
  // AUTH
  SIGNUP,
  LOGIN,
  //CUSTOMER
  ALL_CUSTOMERS,
  SINGLE_CUSTOMER,
  NEW_CUSTOMER,
  EDIT_CUSTOMER,
  //PRODUCT
  ALL_PRODUCTS,
  NEW_PRODUCT,
  EDIT_PRODUCT,
  PRODUCTS_NAME_ID_CAT,
  //MEASUREMENT
  ALL_MEASUREMENTS,
  NEW_MEASUREMENT,
  EDIT_MEASUREMENT,
  SINGLE_MEASUREMENT,
  //USER
  ALL_USERS,
  // ORDER
  NEW_ORDER,
  ALL_ORDERS,
  SINGLE_ORDER,
  //DESIGN
  ALL_DESIGNS,
  SINGLE_DESIGN,
  NEW_DESIGN,
  EDIT_DESIGN,
  // ACCOUNT
  ALL_ACCOUNTS,
  DAILY_ACCOUNT,
  NEW_ACCOUNT,
  EDIT_ACCOUNT,
  DELETE_ACCOUNT,
};
