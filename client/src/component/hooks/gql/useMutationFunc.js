import { useMutation } from '@apollo/client';
import { errorFormat } from '../../utils/errorConv';
import Actions from '../../graphql/Actions';
export default function useMutationFunc(EDIT, setSuccess, setErrors) {
  const [mutation, { data, loading, error }] = useMutation(Actions[EDIT], {
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
    bug: error,
  };
}
