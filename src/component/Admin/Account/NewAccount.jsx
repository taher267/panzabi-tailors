import { useState, useEffect } from 'react';
import moment from 'moment';
import {
  LinearProgress,
  Box,
  TextField,
  Button,
  TextareaAutosize,
  Typography,
  Checkbox,
} from '@mui/material';
import AdminLayout from '../../Layout/AdminLayout';
import { AddCircle, Save, Delete } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
// import { useNavigate } from 'react-router-dom';
import useMutationFunc from '../../hooks/gql/useMutationFunc';
import { dailyAccountFields } from './../../arrayForms/accountForm';
import csses from './account.module.css';
const valuesInit = { name: '', sl_id: '', icon: '' };
const NewAccount = () => {
  const [gqlErrs, setGqlErrs] = useState({});
  const {
    mutation: createDailyAccount,
    data,
    processing,
    bug,
  } = useMutationFunc('NEW_ACCOUNT', null, setGqlErrs);
  const {
    register,
    handleSubmit,
    resetField,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (formData) => {
    setGqlErrs({});
    const account = {
      ...formData,
      cash_in: parseFloat(formData?.cash_in) || 0.0,
      cash_out: parseFloat(formData?.cash_out) || 0.0,
    };
    // console.log(account);
    createDailyAccount({
      variables: { account },
    });
  };

  const onFocus = ({ target: { name } }) => {
    let newErr = { ...gqlErrs };
    delete newErr[name];
    setGqlErrs(newErr);
  };
  useEffect(() => {
    const ele = document.querySelector("input[type='date']");
    ele?.setAttribute('max', moment().format('YYYY-MM-DD'));
    //Cashin min value set
    document.querySelector("[name='cash_in']")?.setAttribute('min', 0);
    //Cashout min value set
    document.querySelector("[name='cash_out']")?.setAttribute('min', 0);
  });

  useEffect(() => {
    if (data) {
      // console.dir(data);
      reset();
    }
  }, [data]);
  return (
    <AdminLayout>
      {processing && (
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      )}
      <div>
        <Typography variant="h6" sx={{ marginBottom: '10px' }}>
          প্রতিদিনের হিসাবঃ
        </Typography>
        {/* <Checkbox onChange={() => {}} /> Clear form */}
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <Box className={csses.newAccountgridWrapper}>
            {dailyAccountFields?.(watch, resetField)?.map(
              ({ name, validation, defaultError, ...rest }, idx) => {
                if (rest.type === 'textarea') {
                  return (
                    <fieldset
                      key={name}
                      className={
                        gqlErrs?.[name]
                          ? csses.error
                          : errors?.[name]
                          ? csses.error
                          : ''
                      }
                    >
                      <legend>{rest.label}</legend>
                      <TextareaAutosize
                        className={`${csses.textareaAutosize} ${
                          gqlErrs?.[name]
                            ? csses.error
                            : errors?.[name]
                            ? csses.error
                            : ''
                        }`}
                        {...register(name, { ...validation })}
                        onFocus={onFocus}
                        aria-label="minimum height"
                        minRows={4}
                        placeholder={name.toUpperCase() + '...'}
                        {...rest}
                      />
                      <p className={csses.errMsg}>
                        {gqlErrs?.[name]
                          ? gqlErrs?.[name]
                          : errors?.[name]
                          ? errors?.[name]?.message || defaultError
                          : ''}
                      </p>
                    </fieldset>
                  );
                }
                return (
                  <TextField
                    className={
                      idx + 1 === dailyAccountFields?.().length &&
                      (idx + 1) % 2 > 0
                        ? csses.lastColumn
                        : ''
                    }
                    key={name}
                    {...register(name, { ...validation })}
                    onFocus={onFocus}
                    color="secondary"
                    variant="filled"
                    label={name}
                    fullWidth
                    {...rest}
                    error={
                      gqlErrs?.[name] ? true : errors?.[name] ? true : false
                    }
                    helperText={
                      gqlErrs?.[name]
                        ? gqlErrs?.[name]
                        : errors?.[name]
                        ? errors?.[name]?.message || defaultError
                        : ''
                    }
                  />
                );
              }
            )}
          </Box>
          <Button
            sx={{ marginTop: '15px' }}
            disabled={
              processing ||
              Object.keys(gqlErrs).length > 0 ||
              Object.keys(errors).length > 0
            }
            variant="contained"
            fullWidth
            endIcon={<Save />}
            type="submit"
          >
            Add
          </Button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default NewAccount;
