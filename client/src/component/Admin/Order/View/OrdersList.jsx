import AdminLayout from '../../../Layout/AdminLayout/index';
import './orderList.css';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useEffect, useState, useMemo } from 'react';
import OrderActions from '../OrderActions';
import { useLocation, useNavigate } from 'react-router-dom';
import useGetQurey from '../../../hooks/gql/useGetQurey';
import { debounce } from 'lodash';
import Payment from '../Payment';
import moment from 'moment';
// import useMutationFunc from '../../../hooks/gql/useMutationFunc';

const searchedBy = [
  { name: 'Phone Number', key: 'phone_no' },
  { name: 'Name', key: 'name' },
  { name: 'Email', key: 'email' },
  { name: 'Order No', key: 'order_no' },
  { name: 'Order ID', key: 'order_id' },
];

const OrdersList = () => {
  const location = useLocation();
  const [pageSize, setPageSize] = useState(50);
  const [rowId, setRowId] = useState(null);
  const [paymentRow, setPaymentRow] = useState(null);
  const [delt, setDelt] = useState(null);
  const { loading, data, error } = useGetQurey(
    'ALL_ORDERS',
    null,
    'allOrders'
    // { pollInterval: 2000 }
  );

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen((p) => !p);
  };

  const handlePaymentRow = (row = {}) => {
    setPaymentRow(row);
    handleClose();
  };

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  const columns = useMemo(
    () => [
      { field: '_id', headerName: 'ID', width: 210, hide: true },
      { field: 'customer', headerName: 'Customer ID', width: 210, hide: true },
      {
        field: 'order_no',
        headerName: 'Order No',
        width: 200,
        editable: true,
      },
      {
        field: 'order_status',
        headerName: 'Order Status',
        type: 'singleSelect',
        valueOptions: ['COMPLETED', 'ALTER', 'PROCESSING', 'NEW', 'DELIVIRED'],
        width: 150,
        editable: true,
      },
      {
        field: 'previous_order',
        headerName: 'Previous Order',
        width: 200,
        editable: true,
        hide: true,
      },
      {
        field: 'delivery_date',
        headerName: 'Delivery Date',
        width: 100,
      },

      {
        field: 'due',
        headerName: 'Due',
        width: 70,
      },
      {
        field: 'advanced',
        headerName: 'Advance',
        width: 100,
        // editable: true,
      },
      {
        field: 'createdAt',
        headerName: 'Issue Date',
        width: 152,
        hide: true,
      },
      {
        field: 'updatedAt',
        headerName: 'Issue Update Date',
        width: 152,
        hide: true,
      },
      {
        field: 'totalQty',
        headerName: 'Total Qty',
        width: 80,
        // editable: true,
      },
      {
        field: 'totalPrice',
        headerName: 'Total Price',
        width: 100,
        // editable: true,
      },
      {
        field: 'discount',
        headerName: 'Discount',
        width: 100,
        hide: true,
        // editable: true,
      },

      {
        field: 'transport_charge',
        headerName: 'Transport Charge',
        width: 130,
        hide: true,
      },

      // {
      //   field: 'order_items',
      //   headerName: 'Order Items',
      //   sortable: false,
      //   width: 250,
      //   hide: true,
      //   renderCell: ({ row }) => {
      //     return (
      //       <>
      //         <p>Orders</p>
      //       </>
      //     );
      //   },
      // },
      {
        field: 'name',
        headerName: 'Name',
        sortable: false,
        width: 250,
        valueGetter: ({ row }) => `${row?.customerDetail?.name || ''}`,
      },
      {
        field: 'phone_no',
        headerName: 'Phone No',
        sortable: false,
        width: 150,
        valueGetter: ({ row }) => `${row?.customerDetail?.phone_no || ''}`,
      },
      {
        field: 'email',
        headerName: 'Email',
        sortable: false,
        hide: true,
        width: 250,
        valueGetter: ({ row }) => `${row?.customerDetail?.email || ''}`,
      },

      {
        field: 'Actions',
        headerName: 'Actions',
        sortable: false,
        width: 250,
        type: 'actions',
        renderCell: (params) => {
          // console.log(params);
          return (
            <OrderActions
              {...{
                params,
                rowId,
                setRowId,
                open,
                handleClose,
                handlePaymentRow: () => handlePaymentRow(params.row),
              }}
            />
          );
        },
      },
    ],
    [rowId]
  );
  useEffect(() => {
    if (location?.state) {
      window.history.replaceState({}, document.title);
      window.location.reload();
    }
  }, []);
  const search = async ({ target }) => {
    console.log(target?.value);
  };
  // console.log(data);
  return (
    <AdminLayout title="Orders">
      {loading ? (
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      ) : (
        <Box
        // style={{
        //   display: 'grid',
        //   gap: '5px',
        //   gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        // }}
        >
          <Box
            sx={{ height: 600, width: '100%' }}
            className="measuementActions"
          >
            <Box sx={{ display: 'flex', gap: 2, marginY: 2 }}>
              <TextField
                variant="standard"
                label="Search"
                fullWidth
                onChange={debounce(search, 500)}
              />
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={searchedBy}
                sx={{ width: 300 }}
                getOptionLabel={(item) => item.name}
                renderInput={(params) => (
                  <TextField
                    fullWidth
                    {...params}
                    label="Search By"
                    variant="standard"
                  />
                )}
              />
            </Box>
            <DataGrid
              rows={data || []}
              columns={columns}
              pageSize={pageSize}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              rowsPerPageOptions={[25, 50, 100]}
              // checkboxSelection
              autoHeight
              disableSelectionOnClick
              components={{ Toolbar: GridToolbar }}
              getRowId={(row) => row._id}
              onCellEditCommit={(row) => setRowId(row.id)}
              sx={
                {
                  // boxShadow: 2,
                  // // border: 2,
                  // borderColor: 'primary.light',
                  // '& .MuiDataGrid-cell:hover': {
                  //   color: 'primary.main',
                  // },
                }
              }
              getRowClassName={(params) => {
                const status = params.row.order_status;
                const delivery = params.row.delivery_date;
                const success = ['DELIVIRED', 'COMPLETED'];
                if (!success.includes(status) && moment(delivery) < moment()) {
                  return `ORDER_LIST_DELIVERY_DATE_CROSSED`;
                }
                return `ORDER_LIST_${status}`;
              }}
            />
          </Box>
        </Box>
      )}
      {(paymentRow?._id && (
        <Payment
          {...{
            handleClose,
            open,
            paymentRow,
            handlePaymentRow,
          }}
        />
      )) ||
        ''}
    </AdminLayout>
  );
};
export default OrdersList;
