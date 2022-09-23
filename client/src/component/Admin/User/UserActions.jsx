import { Button } from '@mui/material';
import { Visibility, Delete } from '@mui/icons-material';
export default function UserActions({ params, rowId, setRowId }) {
  const handleSubmit = () => {
    console.log(params.row);
  };
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Button variant="outlined" onClick={handleSubmit}>
        Save
      </Button>

      <Visibility />

      <Delete />
    </div>
  );
}
