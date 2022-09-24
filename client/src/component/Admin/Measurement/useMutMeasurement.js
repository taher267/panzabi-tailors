import { useMutation } from '@apollo/client';
import { EDIT_MEASUREMENT } from '../../graphql/Mutations/measurementMut';
export default function useMutMeasurement(setSuccess, setLoading) {
  const [updateMeasurement, { data, loading, error }] = useMutation(
    EDIT_MEASUREMENT,
    {
      update(proxy, result) {},
      onError(e) {
        console.log(e);
        // setGqlErrs(errorFormat(e));
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
