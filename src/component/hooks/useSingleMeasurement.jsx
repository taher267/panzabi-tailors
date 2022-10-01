// import { useEffect, useState } from 'react';
import { SINGLE_MEASUREMENT } from '../graphql/Query/measurementQry';
import { useQuery } from '@apollo/client';
export default function useSingleMeasuement(ID) {
  const { loading, data, error } = useQuery(SINGLE_MEASUREMENT, {
    variables: {
      key: 'id',
      value: ID,
    },
  });
  return {
    processing: loading,
    measurement: data?.getMeasurement,
    bug: error,
  };
}
