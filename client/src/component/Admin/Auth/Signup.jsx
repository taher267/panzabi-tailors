import { Button, TextField } from '@mui/material';
import React from 'react';
import { useMutation } from '@apollo/client';
import { SIGNUP } from '../../graphql/Mutations/signUpMut';
import { useForm } from 'react-hook-form';
import { ReactSession } from 'react-client-session';
ReactSession.setStoreType('localStorage');

const init = {
  name: '',
  username: '',
  email: '',
  phone_no: '',
  password: '',
};
const Signin = () => {
  const [gqlErr, setGqlErr] = React.useState({});
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { ...init } });
  const [userSignup, { loading, data, error }] = useMutation(SIGNUP, {
    update(proxy, result) {
      const token = result?.data?.userSignup?.token;
      console.log(token);
      if (token) ReactSession.set('token', token);
    },
    onError(e) {
      console.log(e);
      // console.log(e?.graphQLErrors?.[0]?.extensions);
      // const { graphQLErrors: [{ extensions: exc }] }=e
      // if (exc?.errors?.message) {
      //   return setGqlErr({
      //     username: exc?.errors?.message,
      //     password: exc?.errors?.message,
      //   });
      // }
      // setGqlErr(exc?.errors || {});
    },
  });
  // console.log(ReactSession.get('token'));
  const onSubmit = (data) => {
    delete data.confirmPassword;
    setGqlErr({});
    userSignup({ variables: data });
    console.log(data);
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
          error={gqlErr.name ? true : errors.name ? true : false}
          label="name"
          placeholder="Enter full name.."
          {...register('name', { required: true })}
          helperText={errors.name ? 'Name mandatory' : ''}
          variant="standard"
          fullWidth
          style={{ marginBottom: '15px' }}
          onFocus={onFocus}
        />
        <TextField
          error={gqlErr.username ? true : errors.username ? true : false}
          label="Username"
          placeholder="Enter phone no or email or username..."
          {...register('username', { required: true })}
          helperText={errors.username ? 'Username mandatory' : ''}
          variant="standard"
          fullWidth
          style={{ marginBottom: '15px' }}
          onFocus={onFocus}
        />

        <TextField
          error={gqlErr.phone_no ? true : errors.phone_no ? true : false}
          label="Phone number"
          placeholder="Enter phone no or email or phone_no..."
          {...register('phone_no', { required: true })}
          helperText={errors.phone_no ? 'phone number mandatory' : ''}
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
          helperText={errors.email ? 'Email mandatory' : ''}
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
              ? 'Password mandatory'
              : ''
          }
          {...register('password', { required: true })}
          variant="standard"
          fullWidth
          style={{ marginBottom: '15px' }}
        />

        <TextField
          error={
            gqlErr.confirmPassword
              ? true
              : errors.confirmPassword
              ? true
              : false
          }
          id="standard-error-helper-text"
          label="Confirm Password"
          type="password"
          onFocus={onFocus}
          //   gqlErr
          helperText={
            gqlErr.confirmPassword
              ? gqlErr.confirmPassword
              : errors.confirmPassword
              ? 'confirmPassword mandatory'
              : ''
          }
          {...register('confirmPassword', { required: true })}
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
