import { NEW_CUSTOMER, EDIT_CUSTOMER } from './../Mutations/customerMut';
import { NEW_PRODUCT, EDIT_PRODUCT } from './../Mutations/productMut';
import { NEW_ORDER } from './../Mutations/orderMut';
import {
  NEW_MEASUREMENT,
  EDIT_MEASUREMENT,
} from './../Mutations/measurementMut';
import { ALL_USERS } from '../Query/userQry';
import { ALL_CUSTOMERS, SINGLE_CUSTOMER } from './../Query/customerQry';
import { ALL_MEASUREMENTS, SINGLE_MEASUREMENT } from '../Query/measurementQry';
import { ALL_PRODUCTS } from '../Query/productQry';

export default {
  //CUSTOMER
  ALL_CUSTOMERS,
  SINGLE_CUSTOMER,
  NEW_CUSTOMER,
  EDIT_CUSTOMER,
  //PRODUCT
  ALL_PRODUCTS,
  NEW_PRODUCT,
  EDIT_PRODUCT,
  //MEASUREMENT
  ALL_MEASUREMENTS,
  NEW_MEASUREMENT,
  EDIT_MEASUREMENT,
  SINGLE_MEASUREMENT,
  //USER
  ALL_USERS,
  // ORDER
  NEW_ORDER,
};
