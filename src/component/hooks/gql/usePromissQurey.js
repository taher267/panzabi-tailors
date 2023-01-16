import { useQuery, useSubscription } from '@apollo/client';
import client from '../../../apolloClient';

import Actions from '../../graphql/Actions';

export default async function useGetQurey(QRY, variables = {}) {
  return client.query({
    query: Actions[QRY],
    variables: { ...variables },
  });
}
