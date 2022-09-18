import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { LinearProgress, Box, TextField, Button } from '@mui/material';
import AdminLayout from '../../Layout/AdminLayout';
import { Save } from '@mui/icons-material';
import { NEW_MEASUREMENT } from '../../graphql/Mutations/measurement';
import { errorConversion } from '../../utils/errorConv';
const valuesInit = { name: '', sl_id: '', icon: '' };
const NewMeasuremen = () => {
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({ ...valuesInit });
  const [createMeasurement, { data, loading, error }] = useMutation(
    NEW_MEASUREMENT,
    {
      update(proxy, result) {
        //   console.log(result);
      },
      onError(err) {
        console.log(err);
        // setErrors(errorConversion(err));
      },
      onCompleted() {
        setValues({ ...valuesInit });
      },
      variables: values,
    }
  );

  //   console.dir(data);
  //   console.dir('validErrs', validErrs);
  const onSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    // setValues({ ...newData });
    // console.log(data);
    createMeasurement();
  };

  const onChange = ({ target: { name, value } }) => {
    setValues((p) => ({ ...p, [name]: value }));
  };

  return (
    <AdminLayout>
      {loading && (
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      )}
      <div>
        {Object.entries(errors).map((item) => (
          <p key={item[0]}>{item[1]}</p>
        ))}
        <form onSubmit={onSubmit} autoComplete="off">
          <TextField
            type="number"
            name="sl_id"
            value={values.sl_id}
            onChange={onChange}
            color="secondary"
            variant="filled"
            label="Seriel id"
            fullWidth
            placeholder="Serial Id"
          />
          {errors?.sl_id && <span>Serial Id Mandatory</span>}
          <TextField
            onChange={onChange}
            value={values.name}
            variant="filled"
            label="Name"
            name="name"
            fullWidth
            placeholder="Measurement Name"
          />
          {errors?.name && <span>Name Mandatory</span>}
          <Button
            disabled={loading}
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
