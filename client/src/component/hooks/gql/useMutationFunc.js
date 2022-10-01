import { useMutation } from '@apollo/client';
import { errorFormat } from '../../utils/errorConv';
import Actions from '../../graphql/Actions';
export default function useMutationFunc(MUT, setSuccess, setErrors) {
  const [mutation, { data, loading, error }] = useMutation(Actions[MUT], {
    update(proxy, result) {},
    onError(e) {
      setErrors && setErrors(errorFormat(e));
    },
    onCompleted() {
      setSuccess && setSuccess(true);
    },
  });
  return {
    mutation,
    data,
    processing: loading,
    bug: error ? errorFormat(error) || error : error,
  };
}
