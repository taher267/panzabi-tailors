import { useMutation } from '@apollo/client';
import { Fragment, useState } from 'react';
import {
  LinearProgress,
  Box,
  TextField,
  Button,
  Typography,
} from '@mui/material';
import AdminLayout from '../../Layout/AdminLayout';
import { Save } from '@mui/icons-material';
import { NEW_MEASUREMENT } from '../../graphql/Mutations/measurementMut';
import { errorFormat } from '../../utils/errorConv';
import { measuementFields } from './../../arrayForms/measurementFields';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import stringToObject from '../../utils/stringToObject';
import Field from '../../ui/Action/Field';
import removeGqlErrors from '../../utils/removeGqlErrors';
import useMutationFunc from '../../hooks/gql/useMutationFunc';
import { useEffect } from 'react';

const valuesInit = { name: '', sl_id: '' };
const NewMeasuremen = () => {
  const navigate = useNavigate();
  const [gqlErrs, setGqlErrs] = useState({});
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: 'all', defaultValues: { ...valuesInit } });
  // const [createMeasurement, { data, loading, error }] = useMutation(
  //   NEW_MEASUREMENT,
  //   {
  //     update(proxy, result) {},
  //     onError(e) {
  //       setGqlErrs(errorFormat(e));
  //     },
  //     onCompleted() {
  //       reset({ ...valuesInit });
  //       navigate('/dashboard/measurement', { state: 'reload' });
  //     },
  //   }
  // );
  const {
    mutation: createMeasurement,
    data,
    processing,
    bug,
  } = useMutationFunc('NEW_MEASUREMENT');

  //   console.dir(data);
  useEffect(() => {
    if (data) {
      reset();
      navigate('/dashboard/measurement', { state: 'reload' });
    }
  }, [data]);
  const onSubmit = (data) => {
    setGqlErrs({});
    // console.log(data);
    createMeasurement({ variables: { measures: data } });
  };

  const onFocus = ({ target: { name } }) => {
    let newErr = { ...gqlErrs };
    delete newErr[name];
    setGqlErrs(newErr);
  };
  return (
    <AdminLayout>
      {processing && (
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      )}
      <Box>
        <Typography variant="h6">New Measurement</Typography>
        <Typography>
          Instruction for validation syntex =&gt; Validation
          /required→true←message∂
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          {measuementFields?.map(
            (
              field //{ name, defaultError, validation, ...rest }
            ) => (
              <Fragment key={field.name}>
                <Field
                  {...{
                    ...field,
                    register,
                    errors,
                    gqlErrs,
                    setGqlErrs,
                    // predefined: measurement,
                    removeGqlErrors,
                  }}
                />
              </Fragment>
            )
          )}
          <Button
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
            Add Measurement
          </Button>
        </form>
      </Box>
    </AdminLayout>
  );
};

export default NewMeasuremen;
