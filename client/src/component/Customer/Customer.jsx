import { useMemo, useState } from 'react';
import { Box, LinearProgress, Typography } from '@mui/material';
import AdminLayout from '../Layout/AdminLayout';

import Visibility from '@mui/icons-material/Visibility';
import Groups from '@mui/icons-material/Groups';
import {
  DataGridPremium,
  GridToolbar,
  // useGridApiRef,
  // useKeepGroupedColumnsHidden,
} from '@mui/x-data-grid-premium';
import { Link } from 'react-router-dom';
// import useGetQurey from '../hooks/gql/useGetQurey';
import LinearLoader from '../Loaders/LinearLoader';
import CustomerActions from './CustomerActions';
import { useEffect } from 'react';
import clientQuery from '../hooks/gql/usePromissQurey';
const statusesOptions = [
  { value: 'ACTIVE', label: 'ACTIVE', color: 'red' },
  { value: 'PENDING', label: 'PENDING' },
  { value: 'REJECT', label: 'REJECT' },
];
const Customer = () => {
  const [actionErrs, setActionErrs] = useState({});
  const [val, setVal] = useState(null);
  const [rowId, setRowId] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = useMemo(
    () => [
      {
        field: '_id',
        headerName: 'ID',
        minWidth: 150,
        hide: true,
      },
      {
        field: 'name',
        headerName: 'Full Name',
        minWidth: 150,
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
        minWidth: 200,
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
        headerAlign: 'center',
        minWidth: 300,
        renderCell: (params) => (
          <CustomerActions {...{ params, rowId, setRowId, setActionErrs }} />
        ),
      },
    ],
    [rowId]
  );
  // const { loading, data, error } = useGetQurey(
  //   'ALL_CUSTOMERS',
  //   null
  //   // 'allCustomers'
  // );
  useEffect(() => {
    if (customers?.length) {
      document.querySelector('.Mui-resizeTriggers')?.previousSibling.remove();
    }
  }, [customers]);

  useEffect(() => {
    const fatch = async () => {
      try {
        const { data } = await clientQuery('ALL_CUSTOMERS');
        setCustomers(data?.allCustomers || []);
      } catch (e) {
        console.log(e?.message);
      } finally {
        setLoading(false);
      }
    };
    fatch();
  }, []);
  return (
    <AdminLayout>
      {/* {loading && <LinearLoader />} */}
      <Typography variant="h5" sx={{ marginBottom: 2, color: '#009dea' }}>
        <Groups /> গ্রাহকসমূহ
      </Typography>
      <DataGridPremium
        components={{
          LoadingOverlay: LinearProgress,
          Toolbar: GridToolbar,
        }}
        loading={loading}
        rows={customers || []}
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
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0
            ? 'customerEven'
            : 'customerOdd'
        }
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
  if (row?.orders?.length) {
    return (
      <Box width="100%">
        {[...row.orders].reverse().map?.(({ _id, order_no }) => {
          return (
            <Box key={_id}>
              <Typography sx={typeSx}>Order No :</Typography>
              <Typography sx={typeSx}>{order_no}</Typography>
              <Typography sx={typeSx}>Order ID :</Typography>
              <Typography sx={typeSx}>{_id}</Typography>
            </Box>
          );
        })}
      </Box>
    );
  }
  return <></>;
};
