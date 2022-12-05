import AdminLayout from '../../../Layout/AdminLayout/index';
// import './product.css';
import { Box, LinearProgress } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useEffect, useState, useMemo } from 'react';
import OrderActions from '../OrderActions';
import { useLocation, useNavigate } from 'react-router-dom';
import useGetQurey from '../../../hooks/gql/useGetQurey';

const OrdersList = () => {
  const location = useLocation();
  const [pageSize, setPageSize] = useState(10);
  const [rowId, setRowId] = useState(null);
  const [delt, setDelt] = useState(null);
  const { loading, data, error } = useGetQurey('ALL_ORDERS', null, 'allOrders');

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  // console.log(data);
  const columns = useMemo(
    () => [
      { field: '_id', headerName: 'ID', width: 210, hide: true },
      {
        field: 'order_no',
        headerName: 'Order No',
        width: 200,
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
        field: 'createdAt',
        headerName: 'Issue Date',
        width: 152,
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
        field: 'advanced',
        headerName: 'Advance',
        width: 100,
        // editable: true,
      },
      {
        field: 'due',
        headerName: 'Due',
        width: 70,
      },
      {
        field: 'transport_charge',
        headerName: 'Transport Charge',
        width: 130,
        hide: true,
      },

      {
        field: 'order_items',
        headerName: 'Order Items',
        sortable: false,
        width: 250,
        hide: true,
        renderCell: ({ row }) => {
          return (
            <>
              <p>Orders</p>
            </>
          );
        },
      },

      {
        field: 'Actions',
        headerName: 'Actions',
        sortable: false,
        width: 250,
        type: 'actions',
        renderCell: (params) => {
          // console.log(params);
          return <OrderActions {...{ params, rowId, setRowId }} />;
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
  // console.log(data);
  return (
    <AdminLayout>
      {loading ? (
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      ) : (
        <Box
          style={{
            display: 'grid',
            gap: '5px',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          }}
        >
          <Box
            sx={{ height: 600, width: '100%' }}
            className="measuementActions"
          >
            <DataGrid
              rows={data || []}
              columns={columns}
              pageSize={pageSize}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              rowsPerPageOptions={[5, 10, 25, 50]}
              // checkboxSelection
              autoHeight
              disableSelectionOnClick
              components={{ Toolbar: GridToolbar }}
              getRowId={(row) => row._id}
              onCellEditCommit={(row) => setRowId(row.id)}
            />
          </Box>
        </Box>
      )}
    </AdminLayout>
  );
};
export default OrdersList;
