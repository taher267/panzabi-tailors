import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { LinearProgress, Box, TextField, Button } from '@mui/material';
import AdminLayout from '../../Layout/AdminLayout';
import { Save } from '@mui/icons-material';
import { NEW_MEASUREMENT } from '../../graphql/Mutations/measurementMut';
import { errorFormat } from '../../utils/errorConv';
import { measuementFields } from './../../arrayForms/measurementForm';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
const valuesInit = { name: '', sl_id: '', icon: '' };
const NewMeasuremen = () => {
  const navigate = useNavigate();
  const [gqlErrs, setGqlErrs] = useState({});
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { ...valuesInit } });
  const [createMeasurement, { data, loading, error }] = useMutation(
    NEW_MEASUREMENT,
    {
      update(proxy, result) {},
      onError(e) {
        setGqlErrs(errorFormat(e));
      },
      onCompleted() {
        reset({ ...valuesInit });
        navigate('/dashboard/measurement');
      },
    }
  );

  //   console.dir(data);
  //   console.dir('validErrs', validErrs);
  const onSubmit = (data) => {
    setGqlErrs({});
    createMeasurement({ variables: data });
  };

  const onFocus = ({ target: { name } }) => {
    let newErr = { ...gqlErrs };
    delete newErr[name];
    setGqlErrs(newErr);
  };
  return (
    <AdminLayout>
      {loading && (
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      )}
      <div>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          {measuementFields?.map(
            ({ name, defaultError, validation, ...rest }) => (
              <TextField
                key={name}
                {...register(name, { ...validation })}
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
              Object.keys(gqlErrs).length > 0 ||
              Object.keys(errors).length > 0
            }
            variant="contained"
            fullWidth
            endIcon={<Save />}
            type="submit"
          >
            Add Measurement
          </Button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default NewMeasuremen;
