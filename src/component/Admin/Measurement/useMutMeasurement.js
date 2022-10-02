import { useMutation } from '@apollo/client';
import { EDIT_MEASUREMENT } from '../../graphql/Mutations/measurementMut';
import { errorFormat } from '../../utils/errorConv';

export default function useMutMeasurement(setSuccess, setErrors) {
  const [updateMeasurement, { data, loading, error }] = useMutation(
    EDIT_MEASUREMENT,
    {
      update(proxy, result) {},
      onError(e) {
        setErrors && setErrors(errorFormat(e));
      },
      onCompleted() {
        setSuccess && setSuccess(true);
      },
      notifyOnNetworkStatusChange() {
        console.log('notifyOnNetworkStatusChange');
      },
    }
  );

  return {
    updateMeasurement,
    data,
    processing: loading,
    bug: error,
  };
}
