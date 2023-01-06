import { useQuery, useLazyQuery } from '@apollo/client';
import Actions from '../../graphql/Actions';
import { errorFormat } from '../../utils/errorConv';

export default function useGetQurey(QRY, variables, back, qryProps) {
  const { loading, data, error, refetch } = useQuery(Actions[QRY], {
    variables: {
      ...variables,
    },
    ...qryProps,
  });
  return {
    data: back ? data?.[back] || data : data,
    loading,
    error: error ? errorFormat(error) : error,
    refetch,
  };
}
