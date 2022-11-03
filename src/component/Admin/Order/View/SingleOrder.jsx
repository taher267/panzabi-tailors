import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useGetQurey from '../../../hooks/gql/useGetQurey';

const SingleOrder = () => {
  const { id } = useParams();
  const { data, loading, error } = useGetQurey(
    'SINGLE_ORDER',
    { id },
    'getOrder'
  );
  console.log(data);

  return <div>SingleOrder</div>;
};

export default SingleOrder;
