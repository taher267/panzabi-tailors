import AdminLayout from '../../Layout/AdminLayout/index';
import './product.css';
import { Box, LinearProgress } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useEffect, useState, useMemo } from 'react';
import MeasurementActions from './ProductActions';
import { useLocation, useNavigate } from 'react-router-dom';
import useGetQurey from './../../hooks/gql/useGetQurey';

const ProductList = () => {
  const location = useLocation();
  const [pageSize, setPageSize] = useState(5);
  const [rowId, setRowId] = useState(null);
  const { loading, data, error } = useGetQurey(
    'ALL_PRODUCTS',
    null,
    'allProducts'
  );
  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  const columns = useMemo(
    () => [
      { field: '_id', headerName: 'ID', width: 210, hide: true },
      {
        field: 'name',
        headerName: 'Measurement Name',
        width: 200,
        editable: true,
      },
      {
        field: 'description',
        headerName: 'Description',
        width: 110,
        editable: true,
      },

      {
        field: 'measurementItem',
        headerName: 'Measurement Item',
        sortable: false,
        width: 250,
        hide: true,
        renderCell: ({ row }) => {
          return (
            <>
              <p>Measurementidte</p>
            </>
          );
        },
      },

      {
        field: 'price',
        type: 'number',
        headerName: 'Price',
        sortable: false,
        editable: true,
        width: 110,
      },

      {
        field: 'category',
        headerName: 'Category',
        sortable: false,
        width: 110,
      },
      {
        field: 'Actions',
        headerName: 'Actions',
        sortable: false,
        width: 250,
        type: 'actions',
        renderCell: (params) => (
          <MeasurementActions {...{ params, rowId, setRowId }} />
        ),
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
        {!loading && data?.length && (
          <Box
            sx={{ height: 400, width: '100%' }}
            className="measuementActions"
          >
            <DataGrid
              rows={data}
              columns={columns}
              pageSize={pageSize}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              rowsPerPageOptions={[5, 10, 25, 50]}
              // checkboxSelection
              disableSelectionOnClick
              components={{ Toolbar: GridToolbar }}
              getRowId={(row) => row._id}
              onCellEditCommit={(row) => setRowId(row.id)}
            />
          </Box>
        )}
      </div>
    </AdminLayout>
  );
};
export default ProductList;
