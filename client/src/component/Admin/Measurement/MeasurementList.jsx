import AdminLayout from '../../Layout/AdminLayout/index';
import { useQuery } from '@apollo/client';
import { ALL_MEASUREMENTS } from '../../graphql/Query/measurementQry';
import { Box, LinearProgress } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { Visibility, Edit, Delete } from '@mui/icons-material';
import { useEffect } from 'react';
const columns = [
  { field: 'id', headerName: 'ID', width: 90, hide: true },
  {
    field: 'name',
    headerName: 'Measurement Name',
    width: 200,
    editable: true,
  },
  {
    field: 'sl_id',
    headerName: 'Serial id',
    width: 110,
    editable: true,
  },

  {
    field: 'icon',
    headerName: 'Symbol/Icon',
    sortable: false,
    width: 250,
    renderCell: ({ row }) => {
      return (
        <>
          <p>{row?.icon?.src || row.name}</p>
        </>
      );
    },
  },
  {
    field: 'Actions',
    headerName: 'Actions',
    sortable: false,
    width: 250,

    renderCell: ({ id }) => {
      return (
        <>
          <Link to={`/dashboard/measurement/${id}`}>
            <Visibility />
          </Link>
          |
          <Link to={`/dashboard/measurement/edit/${id}`}>
            <Edit />
          </Link>
          |
          <Link to={`/dashboard/measurement/delete/${id}`}>
            <Delete />
          </Link>
        </>
      );
    },
  },
];
const MeasurementList = () => {
  const { loading, data, error } = useQuery(ALL_MEASUREMENTS);
  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);
  return (
    <AdminLayout>
      {loading && (
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      )}
      <div
        style={{
          display: 'grid',
          gap: '5px',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        }}
      >
        {!loading && data?.allMeasurements?.length && (
          <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={data.allMeasurements}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
              disableSelectionOnClick
              components={{ Toolbar: GridToolbar }}
            />
          </Box>
        )}
      </div>
    </AdminLayout>
  );
};
export default MeasurementList;
