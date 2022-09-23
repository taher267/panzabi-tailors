import { Button, TextField } from '@mui/material';
import React from 'react';
import { useMutation } from '@apollo/client';
import { SIGNUP } from '../../graphql/Mutations/signUpMut';
import { useForm } from 'react-hook-form';
import { ReactSession } from 'react-client-session';
import { AuthContext } from '../../context/AuthContext';

ReactSession.setStoreType('localStorage');

const init = {
  name: '',
  username: '',
  email: '',
  phone_no: '',
  password: '',
};
const Signin = () => {
  const context = React.useContext(AuthContext);
  const [gqlErr, setGqlErr] = React.useState({});
  // User form
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({ defaultValues: { ...init } });
  // Controlling Mutation
  const [userSignup, { loading, data, error }] = useMutation(SIGNUP, {
    update(proxy, result) {
      const token = result?.data?.userSignup?.token;
      // console.log(token);
      if (token) ReactSession.set('token', token);
      context?.login(token);
    },
    onError(e) {
      // console.log(e);
      const exc = e?.graphQLErrors?.[0]?.extensions;
      if (exc?.errors?.message) {
        return setGqlErr({
          username: exc?.errors?.message,
          password: exc?.errors?.message,
        });
      }
      console.log(exc?.errors);
      setGqlErr(exc?.errors || {});
    },
  });
  const onSubmit = (data) => {
    delete data.confirmPassword;
    setGqlErr({});
    userSignup({ variables: data });
    // console.log(data);
  };
  const onFocus = ({ target: { name } }) => {
    let newErr = { ...gqlErr };
    delete newErr[name];
    setGqlErr(newErr);
  };
  return (
    <>
      <div>
        <h3>SIGN IN</h3>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          error={gqlErr?.name ? true : errors.name ? true : false}
          label={
            errors.name ? errors.name.message || 'Name mandatory' : 'Full Name'
          }
          placeholder="Enter full name.."
          {...register('name', {
            required: true,
          })}
          helperText={
            gqlErr.name ? gqlErr.name : errors.name ? 'Name mandatroy' : ''
          }
          variant="standard"
          fullWidth
          style={{ marginBottom: '15px' }}
          onFocus={onFocus}
        />
        <TextField
          error={gqlErr.username ? true : errors.username ? true : false}
          label="Username"
          placeholder="Enter phone number..."
          {...register('username', {
            required: true,
            pattern: /^[A-Za-z0-9]+$/i,
          })}
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
          error={gqlErr.phone_no ? true : errors.phone_no ? true : false}
          label="Phone number"
          placeholder="Enter phone number..."
          {...register('phone_no', { required: true })}
          helperText={
            gqlErr.phone_no
              ? gqlErr.phone_no
              : errors.phone_no
              ? 'Phone number mandatroy'
              : ''
          }
          variant="standard"
          fullWidth
          style={{ marginBottom: '15px' }}
          onFocus={onFocus}
        />

        <TextField
          error={gqlErr.email ? true : errors.email ? true : false}
          label="Email"
          type="email"
          placeholder="Enter valid email..."
          {...register('email', { required: true })}
          helperText={
            gqlErr.email
              ? gqlErr.email
              : errors.email
              ? 'Email is mandatroy'
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
              ? 'Password is mandatory'
              : ''
          }
          {...register('password', { required: true })}
          variant="standard"
          fullWidth
          style={{ marginBottom: '15px' }}
        />
        <TextField
          error={errors?.confirmPassword ? true : false}
          id="standard-error-helper-text"
          label="Confirm Password"
          type="password"
          onFocus={onFocus}
          helperText={
            errors.confirmPassword
              ? errors.confirmPassword.message || 'Confirm Password mandatory!'
              : ''
          }
          {...register('confirmPassword', {
            required: true,
            validate: (val) => {
              if (watch('password') && watch('password') !== val)
                return 'Your passwords do no match';
            },
          })}
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
          Signup
        </Button>
      </form>
    </>
  );
};
export default Signin;
