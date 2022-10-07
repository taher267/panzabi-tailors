import { Button, TextField } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { ReactSession } from 'react-client-session';
import { AuthContext } from '../../context/AuthContext';
import useMutationFunc from '../../hooks/gql/useMutationFunc';
import { registerFields } from '../../arrayForms/registerForm';

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
  const [gqlErrs, setGqlErrs] = React.useState({});
  const {
    mutation: userSignup,
    processing,
    data,
    error,
  } = useMutationFunc('SIGNUP', null, setGqlErrs);
  // User form
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({ defaultValues: { ...init } });

  const onSubmit = (data) => {
    delete data.confirmPassword;
    setGqlErrs({});
    userSignup({ variables: data });
  };
  const onFocus = ({ target: { name } }) => {
    let newErr = { ...gqlErrs };
    delete newErr[name];
    setGqlErrs(newErr);
  };
  return (
    <>
      <div>
        <h3>SIGN IN</h3>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {registerFields?.(watch)?.map(
          ({ name, defaultError, validation, ...rest }) => (
            <TextField
              key={name}
              error={gqlErrs?.[name] ? true : errors?.[name] ? true : false}
              {...register(name, { ...validation })}
              helperText={
                gqlErrs?.[name]
                  ? gqlErrs?.[name]
                  : errors?.[name]
                  ? errors?.[name]?.message || defaultError
                  : ''
              }
              variant="standard"
              fullWidth
              style={{ marginBottom: '15px' }}
              onFocus={onFocus}
              {...rest}
            />
          )
        )}

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
          Signup
        </Button>
      </form>
    </>
  );
};
export default Signin;
