import AdminLayout from '../../Layout/AdminLayout/index';
import './product.css';
import { useQuery } from '@apollo/client';
import { ALL_PRODUCTS } from '../../graphql/Query/productQry';
import { Box, LinearProgress } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useEffect, useState, useMemo } from 'react';
// import MeasurementActions from './ProductActions';
import { useLocation, useNavigate } from 'react-router-dom';

const ProductList = () => {
  const location = useLocation();
  const [pageSize, setPageSize] = useState(5);
  const [rowId, setRowId] = useState(null);
  const { loading, data, error } = useQuery(ALL_PRODUCTS);
  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);
  const columns = useMemo(
    () => [
      { field: 'id', headerName: 'ID', width: 90, hide: true },
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
        headerName: 'Price',
        sortable: false,
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
          <h1>Actions</h1>
          // <MeasurementActions {...{ params, rowId, setRowId }} />
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
        {!loading && data?.allProducts?.length && (
          <Box
            sx={{ height: 400, width: '100%' }}
            className="measuementActions"
          >
            <DataGrid
              rows={data.allProducts}
              columns={columns}
              pageSize={pageSize}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              rowsPerPageOptions={[5, 10, 25, 50]}
              checkboxSelection
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
