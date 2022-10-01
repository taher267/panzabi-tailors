// import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { LinearProgress, Box, TextField, Button } from '@mui/material';
import AdminLayout from '../../Layout/AdminLayout';
import { Save } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import removeGqlErrors from '../../utils/removeGqlErrors';
import lodash from 'lodash';
import useGetQurey from '../../hooks/gql/useGetQurey';
import useMutationFunc from '../../hooks/gql/useMutationFunc';

const valuesInit = { name: '', sl_id: '', icon: '' };
const EditDesign = () => {
  const { id: ID } = useParams();
  const [gqlErrs, setGqlErrs] = useState({});
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});
  console.log(error);
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
    console.log({ id: ID, ...updatingData });
    // updateDesign({
    //   variables: {
    //     id: ID,
    //     update: data,
    //   },
    // });
  };
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
