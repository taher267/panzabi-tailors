import { useMutation } from '@apollo/client';
import { errorFormat } from '../../utils/errorConv';
import Actions from '../../graphql/Actions';
export default function useUpdateMutation(EDIT, setSuccess, setErrors) {
  const [updateMutation, { data, loading, error }] = useMutation(
    Actions[EDIT],
    {
      update(proxy, result) {},
      onError(e) {
        setErrors && setErrors(errorFormat(e));
      },
      onCompleted() {
        setSuccess && setSuccess(true);
      },
    }
  );
  return {
    updateMutation,
    data,
    processing: loading,
    bug: error,
  };
}
