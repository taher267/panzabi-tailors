import { useState } from 'react';
import { LinearProgress, Box, TextField, Button } from '@mui/material';
import AdminLayout from '../../Layout/AdminLayout';
import { AddCircle, Save, Delete } from '@mui/icons-material';
import { v4 } from 'uuid';
import { useForm } from 'react-hook-form';
// import { useNavigate } from 'react-router-dom';
import useMutationFunc from '../../hooks/gql/useMutationFunc';
const valuesInit = { name: '', sl_id: '', icon: '' };
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
  } = useForm();

  // console.dir(bug);
  const onSubmit = ({ design_name, type, ...newDesign }) => {
    setGqlErrs({});
    // console.log(newDesign);
    const newData = {
      design_name,
      type,
      designs: designs.reduce(
        (acc, cur) =>
          newDesign[cur] && [
            ...acc,
            {
              item: newDesign[cur],
              ds_id: acc.length + 1,
              status: newDesign['status_' + cur] === 'true' ? true : false,
            },
          ],
        []
      ),
    };
    // console.log(newData);
    createDesign({
      variables: { ...newData },
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
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '5px',
            }}
          >
            <TextField
              {...register('design_name', {
                required: true,
              })}
              onFocus={onFocus}
              color="secondary"
              variant="filled"
              label={`Design Name`}
              fullWidth
              error={
                gqlErrs?.design_name ? true : errors?.design_name ? true : false
              }
              helperText={
                gqlErrs?.design_name
                  ? gqlErrs?.design_name
                  : errors?.design_name
                  ? errors?.design_name?.message || 'Design name mandatory!'
                  : ''
              }
            />
            <fieldset
              style={{
                borderColor: gqlErrs?.type ? 'red' : errors?.type ? 'red' : '',
                color: gqlErrs?.type ? 'red' : errors?.type ? 'red' : '',
              }}
            >
              <legend>
                {(gqlErrs?.design_name
                  ? gqlErrs?.design_name
                  : errors?.design_name
                  ? errors?.design_name?.message || 'Design name mandatory!'
                  : '') || 'Select Design type'}
              </legend>
              <select
                multiple
                style={{ width: '100%' }}
                {...register('type', {
                  required: true,
                })}
              >
                <option value={1}>Panzabi</option>
                <option value={2}>Pazama</option>
              </select>
            </fieldset>
          </Box>
          {designs?.map((id, i) => (
            <div key={id} style={{ display: 'flex', marginBottom: '5px' }}>
              <TextField
                {...register(id, {
                  required: true,
                })}
                onFocus={onFocus}
                color="secondary"
                variant="filled"
                label={`Design ${i + 1}`}
                fullWidth
                error={errors[id] ? true : false}
              />
              <select name="status" {...register('status_' + id)}>
                <option value={true}>Active</option>
                <option value={false}>Deactive</option>
              </select>
              <Button
                onClick={() => {
                  if (designs?.length < 2) return;
                  setDesigns(designs.filter((d) => d !== id));
                }}
                variant="outlined"
                endIcon={<Delete />}
                type="button"
              >
                Del
              </Button>
            </div>
          ))}
          <Button
            onClick={() => {
              setDesigns((p) => [...p, v4()]);
            }}
            variant="outlined"
            endIcon={<AddCircle />}
            type="button"
          >
            add
          </Button>
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
            Add Design
          </Button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default NewDesign;
