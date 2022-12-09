import { useMemo, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
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
import { useEffect } from 'react';
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
      {
        field: '_id',
        headerName: 'ID',
        minWidth: 150,
        hide: false,
      },
      {
        field: 'name',
        headerName: 'Full Name',
        minWidth: 110,
        editable: true,
      },
      {
        field: 'phone_no',
        headerName: 'Phone',
        minWidth: 110,
        editable: true,
      },
      {
        field: 'email',
        headerName: 'Email',
        minWidth: 200,
        editable: true,
        hide: true,
      },
      {
        field: 'address',
        headerName: 'Adderess',
        minWidth: 300,
        editable: true,
        hide: true,
      },
      {
        field: 'status',
        headerName: 'Status',
        minWidth: 80,
        type: 'singleSelect',
        valueOptions: statusesOptions.map((status) => status.value),
        editable: true,
        hide: false,
      },
      {
        field: 'delivery_details',
        headerName: 'Delivery Details',
        minWidth: 250,
        editable: false,
        hide: true,
      },
      {
        field: 'createdAt',
        headerName: 'Created Date',
        description: 'Customer Created',
        minWidth: 160,
        hide: true,
      },
      {
        field: 'updatedAt',
        headerName: 'Entry Update',
        description: 'Customer update info time',
        hide: true,
        minWidth: 160,
      },
      {
        field: 'orders',
        headerName: 'Orders',
        description: 'Customer Created',
        sortable: false,
        minWidth: 75,
        valueGetter: ({ row }) => {
          return row?.orders?.length;
        },
      },

      {
        field: 'last_order_info',
        headerName: 'Last Order',
        description: 'Last order detail',
        sortable: false,
        // hide: true,
        minWidth: 120,
        renderCell: ({ row }) => <OrderInfo {...{ row }} />,
      },
      {
        field: 'user',
        headerName: 'Issue By',
        sortable: false,
        minWidth: 250,
        hide: true,
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
        minWidth: 160,
        valueGetter: ({ row }) => {
          return row?.engage?.length;
        },
        hide: true,
      },
      {
        field: 'Actions',
        headerName: 'Actions',
        sortable: false,
        minWidth: 250,
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
  useEffect(() => {
    document.querySelector('.Mui-resizeTriggers')?.previousSibling.remove();
  }, [data]);
  return (
    <AdminLayout>
      {loading && <LinearLoader />}
      <DataGridPremium
        rows={(data?.length && data) || []}
        autoHeight
        // columns={[{
        //  type:'singleSelect',
        //  valueOptions
        // }]}
        columns={columns}
        pageSize={10}
        // rowHeight={50}
        getRowHeight={() => 'auto'}
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
    </AdminLayout>
  );
};

export default Customer;

const OrderInfo = ({ row }) => {
  const typeSx = { fontSize: '12px' };
  return (
    <Box>
      {row.orders?.reverse?.()?.map(({ order_id, order_no }) => {
        return (
          <Box key={order_id}>
            <Typography sx={typeSx}>Order No :</Typography>
            <Typography sx={typeSx}>{order_no}</Typography>
            <Typography sx={typeSx}>Order ID :</Typography>
            <Typography sx={typeSx}>{order_id}</Typography>
          </Box>
        );
      })}
    </Box>
  );
};
