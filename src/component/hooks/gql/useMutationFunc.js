import { useMutation } from '@apollo/client';
import { errorFormat } from '../../utils/errorConv';
import Actions from '../../graphql/Actions';
export default function useMutationFunc(
  MUT,
  setSuccess,
  setErrors,
  back,
  refetchQueries = []
) {
  const [mutation, { data, loading, error }] = useMutation(Actions[MUT], {
    update(proxy, result) {},
    onError(e) {
      setErrors && setErrors(errorFormat(e));
    },
    onCompleted() {
      setSuccess && setSuccess(true);
    },
    refetchQueries: [...refetchQueries],
  });
  return {
    mutation,
    data: data && back ? data?.[back] : data,
    processing: loading,
    bug: error ? errorFormat(error) || error : error,
  };
}
