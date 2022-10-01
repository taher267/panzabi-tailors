import { useQuery } from '@apollo/client';
import { ALL_CUSTOMERS } from '../graphql/Query/customerQry';
import { LinearProgress, Box, Button } from '@mui/material';
import AdminLayout from './../Layout/AdminLayout/index';
import { DataGrid } from '@mui/x-data-grid';
import { Visibility } from '@mui/icons-material';
import {
  DataGridPremium,
  GridToolbar,
  useGridApiRef,
  useKeepGroupedColumnsHidden,
} from '@mui/x-data-grid-premium';
import { Link } from 'react-router-dom';
const columns = [
  { field: '_id', headerName: 'ID', width: 90, hide: true },
  {
    field: 'name',
    headerName: 'Full Name',
    width: 110,
    editable: true,
  },
  {
    field: 'phone_no',
    headerName: 'Phone',
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
    hide: true,
  },
  {
    field: 'delivery_details',
    headerName: 'Delivery Details',
    width: 150,
    editable: true,
    hide: true,
  },
  {
    field: 'createdAt',
    headerName: 'Created Date',
    description: 'Customer Created',
    sortable: false,
    width: 160,
  },
  {
    field: 'updatedAt',
    headerName: 'Entry Update',
    description: 'Customer update info time',
    sortable: false,
    hide: true,
    width: 160,
  },

  {
    field: 'orders',
    headerName: 'Orders',
    description: 'Customer Created',
    sortable: false,
    width: 160,
    valueGetter: ({ row }) => {
      return row.orders.length;
    },
  },
  {
    field: 'user',
    headerName: 'Entry By',
    sortable: false,
    width: 250,
    hide: true,
    renderCell: ({ row: { user } }) => {
      return (
        <>
          <p>{user.name}</p>
          <Link
            to={`/user/${user.id}`}
            style={{ display: 'flex', marginLeft: '5px' }}
          >
            <Visibility />
          </Link>
        </>
      );
    },
  },
  {
    field: 'engage',
    headerName: 'Reference',
    description: 'Customer Created',
    sortable: false,
    width: 160,
    valueGetter: ({ row }) => {
      return row.engage.length;
    },
    hide: true,
  },
  {
    field: 'Actions',
    headerName: 'Actions',
    sortable: false,
    width: 250,

    renderCell: ({ id, row }) => {
      return (
        <>
          <Button variant="outlined">
            <Link to={`/customer/${id}`}>View</Link>
          </Button>{' '}
          |
          <Button variant="outlined">
            <Link to={`/customer/edit/${id}`}>Edit</Link>
          </Button>{' '}
          |
          <Button variant="outlined">
            <Link to={`/customer/delete/${id}`}>Delete</Link>
          </Button>
        </>
      );
    },
  },
];

const Customer = () => {
  const qury = useQuery(ALL_CUSTOMERS);
  const { error, loading, data } = qury;
  console.log(error);
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
        {!loading && data?.allCustomers?.length && (
          <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={data.allCustomers}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
              disableSelectionOnClick
              components={{ Toolbar: GridToolbar }}
              getRowId={(row) => row._id}
            />
          </Box>
        )}
      </div>
    </AdminLayout>
  );
};

export default Customer;
