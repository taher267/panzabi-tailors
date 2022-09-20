import { useQuery } from '@apollo/client';
import { ALL_CUSTOMERS } from '../graphql/Query/customerQry';
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
  },
  {
    field: 'delivery_details',
    headerName: 'Delivery Details',
    width: 150,
    editable: true,
    hide: true,
  },

  // {
  //   field: 'createdAt',
  //   headerName: 'Created Date',
  //   type: 'dateTime',
  //   width: 150,
  //   editable: true,
  // },
  {
    field: 'createdAt',
    headerName: 'Created Date',
    description: 'Customer Created',
    sortable: false,
    width: 160,
    valueGetter: (pms) => {
      return pms.row.createdAt
        ? new Date(parseInt(pms.row.createdAt)).toLocaleString()
        : '';
    },
  },

  {
    field: 'Actions',
    headerName: 'Actions',
    description: 'Customer Created',
    sortable: false,
    width: 160,
    valueGetter: (pms) => {
      return pms.row.createdAt
        ? new Date(parseInt(pms.row.createdAt)).toLocaleString()
        : '';
    },
  },
];

const Customer = () => {
  const qury = useQuery(ALL_CUSTOMERS);
  const { loading, data } = qury;
  // console.log(qury);
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
            />
          </Box>
        )}
      </div>
    </AdminLayout>
  );
};

export default Customer;
