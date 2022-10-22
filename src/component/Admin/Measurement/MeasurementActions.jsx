import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Visibility, Save, Delete, Check } from '@mui/icons-material';
import { Button, Box, Fab, CircularProgress } from '@mui/material';

import { green, red } from '@mui/material/colors';
// import useMutMeasurement from './useMutMeasurement';
import useMutationFunc from './../../hooks/gql/useMutationFunc';

export default function MeasurementActions({ params, rowId, setRowId }) {
  //   const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const {
    bug,
    mutation: updateMutation,
    processing,
    data,
  } = useMutationFunc('EDIT_MEASUREMENT', setSuccess);
  // const { processing, data, updateMeasurement, bug } =useMutMeasurement(setSuccess);
  const { id, row } = params;
  useEffect(() => {
    if (rowId === id && success) {
      setSuccess(false);
      setRowId(false);
    }

    if (bug) {
    }
  }, [rowId, data, processing]);
  const updateHandle = () => {
    // console.log(row);
    let newRow = { ...row };
    delete newRow.__typename;
    delete newRow.icon;
    delete newRow._id;

    updateMutation({
      variables: { id: rowId, update: newRow },
    });
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
      <Link to={`/dashboard/measurement/edit/${id}`}>
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
