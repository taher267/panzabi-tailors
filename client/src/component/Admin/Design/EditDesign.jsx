// import { useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AdminLayout from '../../Layout/AdminLayout';
import { Save } from '@mui/icons-material';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import removeGqlErrors from '../../utils/removeGqlErrors';
import lodash from 'lodash';
import useGetQurey from '../../hooks/gql/useGetQurey';
import useMutationFunc from '../../hooks/gql/useMutationFunc';
const valuesInit = { name: '', sl_id: '', icon: '' };

const EditDesign = () => {
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
  } = useMutationFunc('EDIT_DESIGN');

  useEffect(() => {
    if (data && isValueSet === false) {
      setValue(
        'designs',
        data?.designs?.map?.(({ item, icon: { _id, src }, ds_id }) => {
          const icon = {};
          if (_id) icon._id = _id;
          if (src) icon.src = src;

          return {
            item,
            icon,
            ds_id,
          };
        })
      );
      setisValueSet(true);
    }
  }, [data]);
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
    if (Object.keys(gqlErrs).length > 0) return;
    let newObj = {};
    for (const i of Object.keys(updatingData)) {
      newObj[i] = data[i];
    }
    if (lodash.isEqual(newObj, updatingData)) {
      for (const i of Object.keys(updatingData)) {
        setGqlErrs((p) => ({ ...p, [i]: `Nothing to be changed` }));
      }
      return;
    }
    console.log(updatingData);
    // console.log({ id: ID, ...updatingData });
  };
  const isUnique = (d) =>
    watch('designs')
      ?.map?.((v) => v.ds_id)
      ?.includes?.(d);

  return (
    <AdminLayout>
      {(loading || processing) && (
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      )}
      {!loading && !processing && data && (
        <div>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <Box>
              <TextField
                defaultValue={data?.design_name || ''}
                name="design_name"
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
                        validate: (v) => {
                          console.log(
                            watch('designs')
                              ?.map?.(({ ds_id }) => ds_id)
                              ?.indexOf?.(v)
                          );
                          // if (isUnique(v)) return `ds_id should be unique`;
                        },
                      }}
                      render={({ field, fieldState: { error } }) => (
                        <TextField
                          {...field}
                          label={`Design Id ${i + 1}`}
                          error={error ? true : false}
                          helperText={error?.message}
                          type="number"
                        />
                      )}
                      name={`designs.${i}.ds_id`}
                      control={control}
                    />
                    {/* <Button
                      type="button"
                      variant="contained"
                      onClick={() => remove(i)}
                    >
                      Delete
                    </Button> */}
                  </Box>
                ))}

              <Button
                type="button"
                variant="contained"
                onClick={() => append({ item: '', ds_id: fields?.length + 1 })}
              >
                Add
              </Button>
            </Box>
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
              Update Design
            </Button>
          </form>
        </div>
      )}
    </AdminLayout>
  );
};

export default EditDesign;
