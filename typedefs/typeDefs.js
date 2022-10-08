import { gql } from 'apollo-server';

import {
  Design,
  DesignItem,
  DesignMutations,
  DesignQueries,
  Icon,
  InpDesignItem,
  InpIcon,
  InputDisign,
} from './../schema/designSchema.js';

import {
  MeasurementItem,
  Product,
  ProductQueries,
  ProductMutations,
  InpMeasurementItem,
  InputPoduct,
} from './../schema/productSchema.js';

import {
  CustomerQueries,
  CustomerMutations,
  Customer,
  InputTransportation,
  InputCustomer,
  Transportation,
} from '../schema/customerSchema.js';

import {
  InputThirdPirty,
  InputUser,
  thirdPirtyDetails,
  User,
  UserMutations,
  UserQueries,
} from './../schema/userSchema.js';

import {
  InputMeasurement,
  Measurement,
  MeasurementMutations,
  MeasurementQueries,
} from './../schema/measurementSchema.js';
import {
  InputOrder,
  InputOrderDesign,
  InputOrderItemsOfOrder,
  InputOrderMeasurement,
  Order,
  OrderDesign,
  OrderItemsOfOrder,
  OrderMeasurement,
  OrderMutations,
  OrderQueries,
  InputOrderDesignItems,
} from './../schema/orderSchema.js';
import {
  Login,
  InputLogin,
  userLogin,
  userSignup,
  InputSignUp,
} from '../schema/authSchema.js';

import {
  DailyAccount,
  InputDailyAccount,
  dailyAccountQueries,
  dailyAccountMutations,
} from '../schema/accountSchema.js';

export default gql`
  type Query {
    ${DesignQueries}
    # Product
    ${ProductQueries}
    # User
    ${UserQueries}
    # Customer
    ${CustomerQueries}
    # Measurement
    ${MeasurementQueries}
    # Order
    ${OrderQueries}

    # Daily Account
    ${dailyAccountQueries}
  }

  # Auth Query Start
  ${Login}
  # Auth Query end
  # Order Query Start
  ${OrderMeasurement}
  ${OrderItemsOfOrder}
  ${OrderDesign}
  ${Order}  
  # Order Query End
  # Measurement Query Start
  ${Measurement}
  # Measurement Query End
  # User Query Start
  
  ${thirdPirtyDetails}
  ${User}
  # User Query End
  # Custoer Query start
  ${Customer}
  ${Transportation}
  # Custoer Query End
  # Product Query Start
  ${MeasurementItem}
  ${Product}
  # Product Query End
  # Design Query Start
  ${Design}
  ${Icon}  
  ${DesignItem}
  # Design Query End
  ${InputLogin}
  # Daily Query Start
  ${DailyAccount}
  # Daily Query End

scalar Date
scalar DateTime
  type Mutation {
    # auth
    ${userLogin}
    ${userSignup}
    # Design
    ${DesignMutations}
    # Product
    ${ProductMutations}
    # User
    ${UserMutations}

    # Csustomer
    ${CustomerMutations}
    # Measurement
    ${MeasurementMutations}

    # Order
    ${OrderMutations}

    # Daily Account
    ${dailyAccountMutations}
  }
  # Auth Mutation Start
  ${InputSignUp}
  # Auth Mutation Start
  # Order Mutation Start
  ${InputOrderMeasurement}
  ${InputOrderItemsOfOrder}
  ${InputOrderDesign}
  ${InputOrderDesignItems}
  ${InputOrder}
  # Order Mutation Start
  # Measurement Mutation Start
  ${InputMeasurement}
  # Measurement Mutation End

  # User mutation Start
  ${InputThirdPirty}

   ${InputUser}
  # User mutation End
  # Customer mutation Start
  ${InputCustomer}
  ${InputTransportation}
  # Customer mutation End

  # Design mutation Start
  ${InpDesignItem}

  ${InpIcon}
  ${InputDisign}
  # Design mutation end
  # Product mutation Start
   ${InpMeasurementItem}
   ${InputPoduct}

  # Product mutation end
  # Daily Account mutation Start
   ${InputDailyAccount}
  # Daily Account mutation end
`;
