// import { useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AdminLayout from '../../Layout/AdminLayout';
import Delete from '@mui/icons-material/Delete';
import Save from '@mui/icons-material/Save';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import removeGqlErrors from '../../utils/removeGqlErrors';
import useGetQurey from '../../hooks/gql/useGetQurey';
import useMutationFunc from '../../hooks/gql/useMutationFunc';
import Autocomplete from '@mui/material/Autocomplete';

const EditDesign = () => {
  const navigate = useNavigate();
  const { id: ID } = useParams();
  const [gqlErrs, setGqlErrs] = useState({});
  const [isValueSet, setisValueSet] = useState(false);
  const { loading, error, data } = useGetQurey(
    'SINGLE_DESIGN',
    {
      key: '_id',
      value: ID,
    },
    'getDesign'
  );
  const {
    processing,
    data: updatedData,
    mutation: updateDesign,
    bug,
  } = useMutationFunc('EDIT_DESIGN', null, null, null, ['ALL_DESIGNS']);

  useEffect(() => {
    if (data && isValueSet === false) {
      setValue(
        'designs',
        data?.designs?.map?.(
          ({ item, icon: { _id: iconId, src }, ds_id, _id }) => {
            const icon = {};
            if (iconId) icon._id = iconId;
            if (src) icon.src = src;

            return {
              item,
              icon,
              ds_id,
              _id,
            };
          }
        )
      );
      setValue('type', data.type);
      setisValueSet(true);
    }
  }, [data]);
  useEffect(() => {
    if (updatedData) navigate('/dashboard/design', { replace: true });
  }, [updatedData]);
  // console.log(data);
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    watch,
  } = useForm({
    mode: 'onBlur',
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'designs',
  });
  // console.log(fields, 'fields');
  const onSubmit = (updatingData) => {
    setGqlErrs({});
    // if (Object.keys(gqlErrs).length > 0) return;
    // let newObj = {};
    // for (const i of Object.keys(updatingData)) {
    //   newObj[i] = data[i];
    // }
    // if (lodash.isEqual(newObj, updatingData)) {
    //   for (const i of Object.keys(updatingData)) {
    //     setGqlErrs((p) => ({ ...p, [i]: `Nothing to be changed` }));
    //   }
    //   return;
    // }
    updateDesign({
      variables: { _id: ID, update: { ...updatingData } },
    });
  };

  return (
    <AdminLayout>
      {(loading || processing) && (
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      )}
      {!loading && data && (
        <Box sx={{}}>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <Box sx={{ width: '97%' }}>
              <Box>
                <Controller
                  defaultValue={data?.design_name || ''}
                  rules={{
                    required: {
                      value: true,
                      message: `Design name is mandatory!`,
                    },
                  }}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      label="Design name"
                      error={error ? true : false}
                      helperText={error?.message}
                      fullWidth
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
                      defaultValue={data?.type || []}
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
                  name="type"
                  control={control}
                />
              </Box>
              <Box sx={{ marginY: 2 }}>
                {!loading &&
                  fields.map((item, i) => (
                    <Box
                      key={item.id}
                      sx={{ display: 'flex', marginBottom: 2, gap: 1 }}
                    >
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
                      <Controller
                        rules={{
                          required: {
                            value: true,
                            message: `ds_id[${i + 1}] is mandatory!`,
                          },
                        }}
                        render={({ field, fieldState: { error } }) => (
                          <TextField
                            {...field}
                            label={`Design Id ${i + 1}`}
                            // error={error ? true : false}
                            // helperText={error?.message}
                            InputProps={{
                              readOnly: true,
                            }}
                            type="number"
                            fullWidth
                          />
                        )}
                        name={`designs.${i}.ds_id`}
                        control={control}
                      />
                      <Button
                        disabled={item?._id ? true : false}
                        onClick={() => {
                          if (!item._id) remove(i);
                        }}
                        variant="outlined"
                        type="button"
                      >
                        <Delete />
                      </Button>
                    </Box>
                  ))}
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    disabled={
                      processing ||
                      Object.keys(errors).length > 0 ||
                      Object.keys(gqlErrs).length > 0
                    }
                    variant="contained"
                    fullWidth
                    endIcon={<Save />}
                    type="submit"
                  >
                    Update Design
                  </Button>
                  <Button
                    type="button"
                    variant="contained"
                    onClick={() =>
                      append({ item: '', ds_id: fields?.length + 1 })
                    }
                  >
                    Add
                  </Button>
                </Box>
              </Box>
            </Box>
          </form>
        </Box>
      )}
    </AdminLayout>
  );
};

export default EditDesign;
