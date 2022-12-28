import React, { useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { ReactSession } from 'react-client-session';
import { AuthContext } from '../../context/AuthContext';
import useMutationFunc from './../../hooks/gql/useMutationFunc';
import decode from 'jwt-decode';

ReactSession.setStoreType('localStorage');
const init = {
  username: '01765470147',
  password: '12345678',
};
const Login = () => {
  const context = React.useContext(AuthContext);
  const [gqlErrs, setGqlErrs] = React.useState({});
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { ...init } });
  const {
    mutation: muteLogin,
    processing,
    data,
  } = useMutationFunc(
    'LOGIN',
    null,
    setGqlErrs,
    'userLogin'
    //func
  );
  useEffect(() => {
    if (data) {
      const token = data?.token;
      if (token) {
        ReactSession.set('token', token);
        const decoded = decode(token);
        context?.login?.(decoded);
      }
    }
  }, [data]);

  const onSubmit = (newData) => {
    setGqlErrs({});
    muteLogin({ variables: newData });
  };
  const onFocus = ({ target: { name } }) => {
    let newErr = { ...gqlErrs };
    delete newErr[name];
    setGqlErrs(newErr);
  };
  return (
    <>
      <div>
        <h3>Login</h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          error={gqlErrs?.username ? true : errors.username ? true : false}
          label="Username"
          placeholder="Enter phone no or email or username..."
          {...register('username', { required: true })}
          helperText={
            gqlErrs?.username
              ? gqlErrs?.username
              : errors.username
              ? 'Username mandatroy'
              : ''
          }
          variant="standard"
          fullWidth
          style={{ marginBottom: '15px' }}
          onFocus={onFocus}
        />

        <TextField
          error={gqlErrs?.password ? true : errors?.password ? true : false}
          id="standard-error-helper-text"
          label="Password"
          type="password"
          onFocus={onFocus}
          //   gqlErr
          helperText={
            gqlErrs?.password
              ? gqlErrs.password
              : errors.password
              ? 'Password mandatroy'
              : ''
          }
          {...register('password', { required: true })}
          variant="standard"
          fullWidth
          style={{ marginBottom: '15px' }}
        />
        <Button
          fullWidth
          disabled={
            processing ||
            Object.keys(gqlErrs).length > 0 ||
            Object.keys(errors).length > 0
          }
          variant="outlined"
          type="submit"
        >
          Login
        </Button>
      </form>
    </>
  );
};
export default Login;
