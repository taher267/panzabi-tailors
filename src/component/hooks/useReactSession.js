import React from 'react';
import { ReactSession } from 'react-client-session';
import decode from 'jwt-decode';
const useReactSession = () => {
  const [check, setCheck] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    if (ReactSession.get('token')) {
      const jwt = decode(ReactSession.get('token'));
      console.log('id', jwt.exp);
      //   console.log('id', new Date(), Date.now());
      setCheck(true);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, []);
  if (!loading) return check;
};
export default useReactSession;
