import { useReducer, useState, useEffect, createContext } from 'react';
import { ReactSession } from 'react-client-session';
import decode from 'jwt-decode';

const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
});

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
      };
    case 'LOGOUT':
      const data = {
        ...state,
        user: null,
      };
      localStorage.clear();
      return data;

    default:
      return state;
  }
}

function AuthProvider({ children, ...rest }) {
  const [state, dispatch] = useReducer(authReducer, { user: null });
  const [authCheckingLoading, setAuthCheckingLoading] = useState(true);
  function login(userData) {
    dispatch({
      type: 'LOGIN',
      payload: userData,
    });
  }

  function logout() {
    dispatch({
      type: 'LOGOUT',
    });
  }
  useEffect(() => {
    if (ReactSession.get('token')) {
      const decoded = decode(ReactSession.get('token'));
      if (decoded?.exp * 1000 > Date.now()) {
        login(decoded);
        setAuthCheckingLoading(false);
      } else {
        dispatch({
          type: 'LOGOUT',
        });
        setAuthCheckingLoading(false);
      }
    } else {
      setAuthCheckingLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        login,
        logout,
        authCheckingLoading,
        setAuthCheckingLoading,
      }}
      {...rest}
    >
      {authCheckingLoading === false && children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
