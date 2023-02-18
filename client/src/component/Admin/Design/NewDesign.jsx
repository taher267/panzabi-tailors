import { useState } from 'react';
import {
  LinearProgress,
  Box,
  TextField,
  Button,
  Typography,
  Autocomplete,
} from '@mui/material';
import AdminLayout from '../../Layout/AdminLayout';
import { AddCircle, Save, Delete, Add } from '@mui/icons-material';
import { v4 } from 'uuid';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
// import { useNavigate } from 'react-router-dom';
import useMutationFunc from './../../hooks/gql/useMutationFunc';

const NewDesign = () => {
  const [gqlErrs, setGqlErrs] = useState({});
  const [designs, setDesigns] = useState([v4()]);
  const {
    mutation: createDesign,
    data,
    processing,
    bug,
  } = useMutationFunc('NEW_DESIGN', null, setGqlErrs);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    mode: 'all',
    defaultValues: {
      design_name: '',
      designs: [{ item: '' }],
      type: [],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'designs',
  });
  const onSubmit = (data) => {
    const { design_name, type, designs } = data;
    setGqlErrs({});
    const newData = {
      design_name,
      type,
      designs: designs.map(({ item }, i) => ({ item, ds_id: i + 1 })),
    };
    createDesign({
      variables: newData,
    });
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
      <div>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <Box
            sx={{
              // display: 'grid',
              // gridTemplateColumns: 'repeat(2, 1fr)',
              width: '95%',
              gap: '5px',
            }}
          >
            <Typography variant="h4">New Design</Typography>
            <Controller
              rules={{
                required: {
                  value: true,
                  message: `Name is mandatory!`,
                },
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="Design Name"
                  fullWidth
                  error={error ? true : false}
                  helperText={error?.message}
                />
              )}
              name="design_name"
              control={control}
            />
            <Controller
              rules={{
                required: {
                  value: true,
                  message: `Type is mandatory!`,
                },
              }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <Autocomplete
                  multiple
                  id="tags-standard"
                  options={['1', '2']}
                  renderInput={(props) => (
                    <TextField
                      {...props}
                      sx={{ marginY: 1 }}
                      label={`Type`}
                      type="number"
                      fullWidth
                      error={error ? true : false}
                      helperText={error?.message}
                    />
                  )}
                  onChange={(_, data) => {
                    onChange(data);
                    return data;
                  }}
                />
              )}
              name={`type`}
              control={control}
            />
            {fields.map((item, i) => (
              <Box
                key={i}
                sx={{ display: 'flex', gap: 1, width: '100%', marginY: 1.5 }}
              >
                {/* <TextField fullWidth {...register(`designs.${i}.name`)} /> */}
                <Controller
                  rules={{
                    required: {
                      value: true,
                      message: `Item[${i + 1}] is mandatory!`,
                    },
                  }}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      label={`Design item ${i + 1}`}
                      error={error ? true : false}
                      helperText={error?.message}
                      fullWidth
                    />
                  )}
                  name={`designs.${i}.item`}
                  control={control}
                />

                <Button
                  type="button"
                  variant="outlined"
                  disabled={fields.length < 2 ? true : false}
                  onClick={() => {
                    if (fields.length > 1) remove(i);
                  }}
                >
                  <Delete />
                </Button>
              </Box>
            ))}
          </Box>

          <Box
            sx={{
              gap: 1,
              width: '95%',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{ display: 'inline-block', width: '95%' }}
            >
              Submit <Save />
            </Button>
            <Button
              fullWidth
              type="button"
              onClick={() => append({ item: '' })}
              variant="outlined"
              sx={{ display: 'inline-block', width: '5%' }}
            >
              <Add />
            </Button>
          </Box>
        </form>
      </div>
    </AdminLayout>
  );
};

export default NewDesign;
