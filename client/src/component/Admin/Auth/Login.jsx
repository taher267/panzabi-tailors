import { Button, TextField } from '@mui/material';
import React from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../../graphql/Mutations/loginMut';
import { useForm } from 'react-hook-form';
import { ReactSession } from 'react-client-session';
import { AuthContext } from '../../context/AuthContext';
ReactSession.setStoreType('localStorage');
const init = {
  username: '01765470147',
  password: '12345678',
};
const Login = () => {
  const context = React.useContext(AuthContext);
  const [gqlErr, setGqlErr] = React.useState({});
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { ...init } });
  const [userLogin, { loading, data, error }] = useMutation(LOGIN, {
    update(proxy, result) {
      const token = result?.data?.userLogin?.token;
      if (token) ReactSession.set('token', token);
      context?.login(token);
    },
    onError({ graphQLErrors: [{ extensions: exc }] }) {
      if (exc?.errors?.message) {
        return setGqlErr({
          username: exc?.errors?.message,
          password: exc?.errors?.message,
        });
      }
      setGqlErr(exc?.errors || {});
    },
  });
  const onSubmit = (data) => {
    setGqlErr({});
    userLogin({ variables: data });
  };
  const onFocus = ({ target: { name } }) => {
    let newErr = { ...gqlErr };
    delete newErr[name];
    setGqlErr(newErr);
  };
  return (
    <>
      <div>
        <h3>Login</h3>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          error={gqlErr.username ? true : errors.username ? true : false}
          label="Username"
          placeholder="Enter phone no or email or username..."
          {...register('username', { required: true })}
          helperText={
            gqlErr.username
              ? gqlErr.username
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
          error={gqlErr.password ? true : errors.password ? true : false}
          id="standard-error-helper-text"
          label="Password"
          type="password"
          onFocus={onFocus}
          //   gqlErr
          helperText={
            gqlErr.password
              ? gqlErr.password
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
            loading ||
            Object.keys(gqlErr).length > 0 ||
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
