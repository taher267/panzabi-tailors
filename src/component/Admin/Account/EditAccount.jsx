// import { useMutation } from '@apollo/client';
import { useState } from 'react';
import {
  LinearProgress,
  Box,
  TextField,
  Button,
  TextareaAutosize,
} from '@mui/material';
import AdminLayout from '../../Layout/AdminLayout';
import { Save } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import lodash from 'lodash';
import useGetQurey from '../../hooks/gql/useGetQurey';
import useMutationFunc from '../../hooks/gql/useMutationFunc';
import { dailyAccountFields } from '../../arrayForms/accountForm';
import csses from './account.module.css';

const valuesInit = { name: '', sl_id: '', icon: '' };
const EditAccount = () => {
  const { id: ID } = useParams();
  const [gqlErrs, setGqlErrs] = useState({});
  const { loading, error, data } = useGetQurey(
    'DAILY_ACCOUNT',
    {
      key: '_id',
      value: ID,
    },
    'getDailyAccount'
  );
  const {
    processing,
    data: updatedData,
    mutation: updateAccount,
    bug,
  } = useMutationFunc('EDIT_ACCOUNT');

  const {
    register,
    handleSubmit,
    watch,
    resetField,
    formState: { errors },
  } = useForm({});
  // console.log(data);
  const onSubmit = (updatingData) => {
    const senitizeData = {
      ...updatingData,
      cash_in: parseInt(updatingData?.cash_in),
      cash_out: parseInt(updatingData?.cash_out),
    };
    setGqlErrs({});
    if (Object.keys(gqlErrs).length > 0) return;
    let newObj = {};
    for (const item of Object.keys(senitizeData)) {
      newObj[item] = data[item];
    }
    if (lodash.isEqual(newObj, senitizeData)) {
      for (const i of Object.keys(senitizeData)) {
        setGqlErrs((p) => ({ ...p, [i]: `Nothing to be changed` }));
      }
      return;
    }
    // console.log(newObj, senitizeData);
    updateAccount({
      variables: {
        _id: ID,
        update: senitizeData,
      },
    });
  };
  const onFocus = ({ target: { name } }) => {
    let newErr = { ...gqlErrs };
    delete newErr[name];
    setGqlErrs(newErr);
  };
  return (
    <AdminLayout>
      {(loading || processing) && (
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      )}

      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <Box className={csses.newAccountgridWrapper}>
          {data &&
            dailyAccountFields?.(watch, resetField)?.map(
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
                        defaultValue={data?.[name] ?? ''}
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
                    defaultValue={data?.[name] ?? ''}
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
    </AdminLayout>
  );
};

export default EditAccount;
