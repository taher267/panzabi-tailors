import { gql } from 'apollo-server';
import DesignSchema from '../schema/designSchema.mjs';
import ProductSchema from '../schema/productSchema.mjs';
import CustomerSchema from '../schema/customerSchema.mjs';
import UserSchema from '../schema/userSchema.mjs';
import MeasurementSchema from '../schema/measurementSchema.mjs';
import OrderSchema from '../schema/orderSchema.mjs';
import AuthSchema from '../schema/authSchema.mjs';
import AccountSchema from '../schema/accountSchema.mjs';
import TempateSchema from '../schema/templateSchema.mjs';

export default gql`
  ${AuthSchema}
  ${MeasurementSchema}
  ${UserSchema}
  ${CustomerSchema}
  ${ProductSchema}
  ${AccountSchema}
  ${OrderSchema}
  ${TempateSchema}
  ${DesignSchema}
  # type Icon {
  #   _id: String
  #   src: String
  # }

  scalar Date
  scalar DateTime
`;
