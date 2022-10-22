import { useMutation } from '@apollo/client';
import { Fragment, useState } from 'react';
import { LinearProgress, Box, TextField, Button } from '@mui/material';
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

const valuesInit = { name: '', sl_id: '', icon: '' };
const NewMeasuremen = () => {
  const navigate = useNavigate();
  const [gqlErrs, setGqlErrs] = useState({});
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: 'all', defaultValues: { ...valuesInit } });
  const [createMeasurement, { data, loading, error }] = useMutation(
    NEW_MEASUREMENT,
    {
      update(proxy, result) {},
      onError(e) {
        setGqlErrs(errorFormat(e));
      },
      onCompleted() {
        reset({ ...valuesInit });
        navigate('/dashboard/measurement', { state: 'reload' });
      },
    }
  );

  //   console.dir(data);
  //   console.dir('validErrs', validErrs);
  const onSubmit = (data) => {
    setGqlErrs({});
    console.log(data);
    // createMeasurement({ variables: { ...data } });
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
