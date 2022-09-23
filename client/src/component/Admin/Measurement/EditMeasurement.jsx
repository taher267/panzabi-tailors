import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { LinearProgress, Box, TextField, Button } from '@mui/material';
import AdminLayout from '../../Layout/AdminLayout';
import { Save } from '@mui/icons-material';
import { EDIT_MEASUREMENT } from '../../graphql/Mutations/measurementMut';
import { errorFormat } from '../../utils/errorConv';
import { measuementFields } from './../../arrayForms/measurementForm';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import useSingleMeasuement from './../../hooks/useSingleMeasurement';
import lodash from 'lodash';
import { useEffect } from 'react';
const valuesInit = { name: '', sl_id: '', icon: '' };
const EditMeasuremen = () => {
  const { id: ID } = useParams();
  const [gqlErrs, setGqlErrs] = useState({});
  const { processing, measurement, bug } = useSingleMeasuement(ID);

  const [updateMeasurement, { data, loading, error }] = useMutation(
    EDIT_MEASUREMENT,
    {
      update(proxy, result) {},
      onError(e) {
        console.log(e);
        setGqlErrs(errorFormat(e));
      },
    }
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});
  //   console.log(error);
  const onSubmit = (data) => {
    // setGqlErrs({});
    if (Object.keys(gqlErrs).length > 0) return;
    // let newObj = {};
    // for (const i of Object.keys(data)) {
    //   newObj[i] = data[i];
    // }
    // if (lodash.isEqual(newObj, data)) {
    //   for (const i of Object.keys(data)) {
    //     setGqlErrs((p) => ({ ...p, [i]: `Nothing to be changed` }));
    //   }
    //   return;
    // }
    // console.log({ id: ID, ...data });
    updateMeasurement({ variables: { id: ID, ...data } });
  };

  const onFocus = ({ target: { name } }) => {
    let newErr = { ...gqlErrs };
    delete newErr[name];
    setGqlErrs(newErr);
  };
  useEffect(() => {
    if (error?.message) {
      //   window.alert(error?.message);
      //   setGqlErrs({});
    }
  }, [error]);
  return (
    <AdminLayout>
      {loading ||
        (processing && (
          <Box sx={{ width: '100%' }}>
            <LinearProgress />
          </Box>
        ))}
      {!loading && !processing && measurement && (
        <div>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            {measuementFields?.map(
              ({ name, defaultError, validation, ...rest }) => (
                <TextField
                  key={name}
                  {...register(name, { ...validation })}
                  defaultValue={measurement?.[name] || ''}
                  name={name}
                  onFocus={onFocus}
                  color="secondary"
                  variant="filled"
                  label={name}
                  fullWidth
                  error={gqlErrs?.[name] ? true : errors?.[name] ? true : false}
                  helperText={
                    gqlErrs?.[name]
                      ? gqlErrs?.[name]
                      : errors?.[name]
                      ? errors?.[name]?.message || defaultError
                      : ''
                  }
                  {...rest}
                />
              )
            )}
            <Button
              disabled={
                loading ||
                Object.keys(errors).length > 0 ||
                Object.keys(gqlErrs).length > 0
              }
              variant="contained"
              fullWidth
              endIcon={<Save />}
              type="submit"
            >
              Update Measurement
            </Button>
          </form>
        </div>
      )}
    </AdminLayout>
  );
};

export default EditMeasuremen;
