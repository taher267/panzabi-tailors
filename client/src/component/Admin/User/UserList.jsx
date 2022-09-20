import { useQuery } from '@apollo/client';
import { ALL_USERS } from '../../graphql/Query/userQry';
import { LinearProgress, Box } from '@mui/material';
import AdminLayout from '../../Layout/AdminLayout/index';
import { DataGrid } from '@mui/x-data-grid';
import {
  // DataGridPremium,
  GridToolbar,
  // useGridApiRef,
  // useKeepGroupedColumnsHidden,
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
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 110,
    editable: true,
  },
  {
    field: 'username',
    headerName: 'Username',
    width: 110,
    editable: true,
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 150,
    editable: true,
    hide: true,
  },
  {
    field: 'thirdPirty',
    headerName: 'Third Party Auth',
    width: 150,
    editable: true,
    hide: true,
  },
  {
    field: 'createdAt',
    headerName: 'Created Date',
    description: 'User new entry date',
    sortable: false,
    width: 160,
    valueGetter: (pms) => {
      return pms.row.createdAt
        ? new Date(parseInt(pms.row.createdAt)).toLocaleString()
        : '';
    },
  },
  {
    field: 'updatedAt',
    headerName: 'Update Date',
    description: 'User Updated',
    sortable: false,
    width: 160,
    valueGetter: (pms) => {
      return pms.row.updatedAt
        ? new Date(parseInt(pms.row.updatedAt)).toLocaleString()
        : '';
    },
  },
  {
    field: 'Actions',
    headerName: 'Created Date',
    description: 'Customer Created',
    sortable: false,
    width: 160,
    valueGetter: (pms) => {
      return pms.row.updatedAt
        ? new Date(parseInt(pms.row.updatedAt)).toLocaleString()
        : '';
    },
  },
];

const UserList = () => {
  const { loading, data } = useQuery(ALL_USERS);
  // console.log(data);
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
              rows={data?.allUsers || []}
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

export default UserList;
