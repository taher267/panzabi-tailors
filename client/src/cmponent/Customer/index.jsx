import { useQuery } from '@apollo/client';
import Card from './Card';
import { CUSTOMERS_QRY } from '../graphql/Query/customer';
import { LinearProgress, Box } from '@mui/material';
import AdminLayout from './../Layout/AdminLayout/index';
import { DataGrid } from '@mui/x-data-grid';
import {
  DataGridPremium,
  GridToolbar,
  useGridApiRef,
  useKeepGroupedColumnsHidden,
} from '@mui/x-data-grid-premium';
const columns = [
  { field: 'id', headerName: 'ID', width: 90, hide: true },
  {
    field: 'name',
    headerName: 'Full Name',
    width: 150,
    editable: true,
  },
  {
    field: 'phone_no',
    headerName: 'Phone',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 110,
    editable: true,
    hide: true,
  },
  {
    field: 'address',
    headerName: 'Adderess',
    width: 150,
    editable: true,
  },
  {
    field: 'delivery_details',
    headerName: 'Delivery Details',
    width: 150,
    editable: true,
    hide: true,
  },

  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

const Customer = () => {
  const { loading, data } = useQuery(CUSTOMERS_QRY);

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
        {!loading && data?.allUsers?.length && (
          <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={data.allUsers}
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

export default Customer;
