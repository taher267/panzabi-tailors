import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Visibility, Save, Delete, Check } from '@mui/icons-material';
import { Button, Box, Fab, CircularProgress } from '@mui/material';
import { green, red } from '@mui/material/colors';
import useUpdateMutation from '../../hooks/gql/useUpdateMutation';
export default function OrderActions({ params, rowId, setRowId }) {
  //   const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { updateMutation, processing, data, bug } = useUpdateMutation(
    'EDIT_PRODUCT',
    setSuccess
  );
  const { id, row } = params;
  useEffect(() => {
    if (rowId === id && success) {
      setSuccess(false);
      setRowId(false);
    }
  }, [rowId, data, processing]); //
  const updateHandle = () => {
    const { name, category, price, description } = row;
    // console.log({
    //   variables: {
    //     _id: rowId,
    //     update: { name, category, price, description },
    //   },
    // });
    // console.log(updateMutation);

    updateMutation({
      variables: {
        _id: rowId,
        name,
        category,
        price,
        description,
      },
    });
    // updateMutation({
    //   variables: {
    //     _id: rowId,
    //     update: { name, category, price, description },
    //   },
    // });
  };
  return (
    <Box
      className="measuementActions"
      sx={{
        outline: 'none',
        m: 1,
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Link to={`/dashboard/product/${id}`}>
        <Visibility />
      </Link>
      {processing ? (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
            bgcolor: green[500],
            '&:hover': { bgcolor: green[700] },
          }}
        >
          <Check />
        </Fab>
      ) : (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
            bgcolor: bug ? red[500] : green[500],
            '&:hover': { bgcolor: bug ? red[700] : green[700] },
          }}
          disabled={id !== rowId || processing}
        >
          <Save onClick={updateHandle} />
        </Fab>
      )}
      {processing && id === rowId && (
        <CircularProgress
          size={52}
          sx={{
            color: green[700],
            position: 'absolute',
            top: -6,
            left: 18,
            zIndex: 1,
          }}
        />
      )}
      <Button>
        <Delete
          onClick={() => {
            window.alert(id);
          }}
        />
      </Button>
    </Box>
  );
}
