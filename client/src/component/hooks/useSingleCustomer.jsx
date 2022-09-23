// import { useEffect, useState } from 'react';
import { SINGLE_CUSTOMER } from '../graphql/Query/customerQry';
import { useQuery } from '@apollo/client';
export default function useSingleCustomer(ID) {
  const { loading, data, error } = useQuery(SINGLE_CUSTOMER, {
    variables: {
      key: 'id',
      value: ID,
    },
  });
  return {
    processing: loading,
    customer: data?.getCustomer,
    bug: error,
  };
}
