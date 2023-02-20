import { Visibility, Save, Delete, Check, Add } from '@mui/icons-material';
import { Button, Box, Fab, CircularProgress } from '@mui/material';
import Typography from '@mui/material/Typography';
import { green, red } from '@mui/material/colors';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
export default function CRUDActions({
  rowId,
  id,
  success,
  setSuccess,
  setRowId,
  bug,
  data,
  processing,
  updateHandle,
  delFunc,
  editUrl,
  DelIcon,
  deleting,
}) {
  useEffect(() => {
    if (rowId === id && success) {
      setSuccess(false);
      setRowId(false);
    }
  }, [rowId, data, processing]);
  return (
    <Box
      className="measuementActions"
      sx={{
        outline: 'none',
        // m: 1,
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Link to={`${editUrl}/edit/${id}`}>
        <Visibility />
      </Link>

      {processing ? (
        <Typography>
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
        </Typography>
      ) : (
        <Typography>
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
        </Typography>
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
      <Link to={`/dashboard/order/new/${id}`}>
        <Add /> নতুন অর্ডারঃ
      </Link>
      <Button disabled={deleting}>
        {DelIcon ? (
          <DelIcon sx={{ color: red[700] }} onClick={delFunc} />
        ) : (
          <Delete onClick={delFunc} />
        )}
      </Button>
    </Box>
  );
}
