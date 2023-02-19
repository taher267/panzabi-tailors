import { NEW_CUSTOMER, EDIT_CUSTOMER } from './../Mutations/customerMut';
import { NEW_PRODUCT, EDIT_PRODUCT } from './../Mutations/productMut';
import {
  NEW_ORDER,
  ADD_NEW_ORDER_ITEM,
  DELETE_ORDER_ITEM,
  EDIT_ORDER,
  UPDATE_PAYMENT,
  UPDATE_ORDER_ITEM,
} from './../Mutations/orderMut';

import { NEW_TEMPLATE, EDIT_TEMPLATE } from './../Mutations/templateMut';
import {
  ALL_ORDERS,
  SINGLE_ORDER,
  SINGLE_ORDER_BASIC,
  ORDER_ITEM,
  USER_ORDERS_ITEMS,
} from './../Query/orderQry';
import {
  NEW_MEASUREMENT,
  EDIT_MEASUREMENT,
} from './../Mutations/measurementMut';

import { ALL_USERS } from '../Query/userQry';
import { ALL_CUSTOMERS, SINGLE_CUSTOMER } from './../Query/customerQry';
import { ALL_TEMPATES, SINGLE_TEMPATE } from './../Query/templateQry';
import { ALL_MEASUREMENTS, SINGLE_MEASUREMENT } from '../Query/measurementQry';
import { ALL_PRODUCTS } from '../Query/productQry';
import {
  NEW_DESIGN,
  EDIT_DESIGN,
  DELETE_DESIGN,
} from './../Mutations/designMut';
import {
  ALL_DESIGNS,
  SPECIFIC_ALL_DESIGNS,
  SINGLE_DESIGN,
} from './../Query/designQry';
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
  DELETE_ORDER_ITEM,
  ADD_NEW_ORDER_ITEM,
  EDIT_ORDER,
  ALL_ORDERS,
  USER_ORDERS_ITEMS,
  SINGLE_ORDER,
  SINGLE_ORDER_BASIC,
  ORDER_ITEM,
  UPDATE_PAYMENT,
  UPDATE_ORDER_ITEM,
  //DESIGN
  ALL_DESIGNS,
  SPECIFIC_ALL_DESIGNS,
  SINGLE_DESIGN,
  NEW_DESIGN,
  EDIT_DESIGN,
  DELETE_DESIGN,
  // TEMPLATE
  ALL_TEMPATES,
  SINGLE_TEMPATE,
  NEW_TEMPLATE,
  EDIT_TEMPLATE,
  // ACCOUNT
  ALL_ACCOUNTS,
  DAILY_ACCOUNT,
  NEW_ACCOUNT,
  EDIT_ACCOUNT,
  DELETE_ACCOUNT,
};
