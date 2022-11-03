import { useMemo, useState } from 'react';
import { Box, Button } from '@mui/material';
import AdminLayout from '../Layout/AdminLayout/index';
import { DataGrid } from '@mui/x-data-grid';
import { Visibility } from '@mui/icons-material';
import {
  DataGridPremium,
  GridToolbar,
  useGridApiRef,
  useKeepGroupedColumnsHidden,
} from '@mui/x-data-grid-premium';
import { Link } from 'react-router-dom';
import useGetQurey from '../hooks/gql/useGetQurey';
import LinearLoader from '../Loaders/LinearLoader';
import CustomerActions from './CustomerActions';
const statusesOptions = [
  { value: 'ACTIVE', label: 'ACTIVE', color: 'red' },
  { value: 'PENDING', label: 'PENDING' },
  { value: 'REJECT', label: 'REJECT' },
];
const Customer = () => {
  const [val, setVal] = useState(null);
  const [rowId, setRowId] = useState(null);
  const columns = useMemo(
    () => [
      { field: '_id', headerName: 'ID', width: 210, hide: true },
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
        width: 200,
        editable: true,
        hide: true,
      },
      {
        field: 'address',
        headerName: 'Adderess',
        width: 300,
        editable: true,
        hide: true,
      },
      {
        field: 'status',
        headerName: 'Status',
        width: 80,
        type: 'singleSelect',
        valueOptions: statusesOptions.map((status) => status.value),
        editable: true,
        hide: false,
      },
      {
        field: 'delivery_details',
        headerName: 'Delivery Details',
        width: 250,
        editable: false,
        hide: true,
      },
      {
        field: 'createdAt',
        headerName: 'Created Date',
        description: 'Customer Created',
        width: 160,
        hide: true,
      },
      {
        field: 'updatedAt',
        headerName: 'Entry Update',
        description: 'Customer update info time',
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
          return row?.orders?.length;
        },
      },
      {
        field: 'user',
        headerName: 'Entry By',
        sortable: false,
        width: 250,
        hide: false,
        renderCell: ({ row }) => {
          return (
            <>
              <p>{row?.user?.name}</p>
              <Link
                to={`/user/${row?.user?.id}`}
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
          return row?.engage?.length;
        },
        hide: true,
      },
      {
        field: 'Actions',
        headerName: 'Actions',
        sortable: false,
        width: 250,
        renderCell: (params) => (
          <CustomerActions {...{ params, rowId, setRowId }} />
        ),
      },
    ],
    [rowId]
  );
  const { loading, data, error } = useGetQurey(
    'ALL_CUSTOMERS',
    null,
    'allCustomers'
  );
  console.log(error);
  return (
    <AdminLayout>
      {loading && <LinearLoader />}
      <div
        style={{
          display: 'grid',
          gap: '5px',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        }}
      >
        {!loading && data?.length && (
          <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={data}
              // columns={[{
              //  type:'singleSelect',
              //  valueOptions
              // }]}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              // checkboxSelection
              // disableSelectionOnClick
              components={{ Toolbar: GridToolbar }}
              getRowId={({ _id }) => _id}
              onCellEditCommit={({ id }) => setRowId(id)}
              setEditCellValue={(d) => {
                console.log(d);
              }}
            />
          </Box>
        )}
      </div>
    </AdminLayout>
  );
};

export default Customer;
