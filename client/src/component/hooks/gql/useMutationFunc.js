import { useMutation } from '@apollo/client';
import { errorFormat } from '../../utils/errorConv';
import Actions from '../../graphql/Actions';
export default function useMutationFunc(
  MUT,
  setSuccess,
  setErrors,
  back,
  refetchQueries = [],
  setGqlCommonErr
) {
  const [mutation, { data, loading, error }] = useMutation(Actions[MUT], {
    update(proxy, result) {},
    onError(e) {
      const err = errorFormat(e);
      setGqlCommonErr && setGqlCommonErr(err.message);
      setErrors && setErrors(err?.errors);
    },
    onCompleted() {
      setSuccess && setSuccess(true);
    },
    // onQueryUpdated(observableQuery) {
    //   if (shouldRefetchQuery(observableQuery)) {
    //     return observableQuery.refetch();
    //   }
    // },
    refetchQueries,
    // refetchQueries: [],
  });
  return {
    mutation,
    data: data && back ? data?.[back] : data,
    processing: loading,
    bug: error ? errorFormat(error) || error : error,
  };
}
