import AdminLayout from '../../Layout/AdminLayout/index';
import './product.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import Tooltip from '@mui/material/Tooltip';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useEffect, useState, useMemo } from 'react';
import MeasurementActions from './ProductActions';
import { useLocation, useNavigate } from 'react-router-dom';
import useGetQurey from './../../hooks/gql/useGetQurey';

const ProductList = () => {
  const location = useLocation();
  const [pageSize, setPageSize] = useState(5);
  const [rowId, setRowId] = useState(null);
  const [copyId, setCopyId] = useState();
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

  /**
   * <Tooltip open={false} title="Coppied to Add" leaveDelay={1500}  onClose={()=>{}}>
      <Button>Arrow</Button>
    </Tooltip>
   */
  const columns = useMemo(
    () => [
      // { field: '_id', headerName: 'ID', width: 250, hide: true },
      {
        field: '_id',
        headerName: 'ID',
        width: 250,
        // hide: true,
        renderCell: ({ row }) => {
          let { _id } = row;
          return (
            <Box
              sx={
                {
                  // bgcolor: copyId === _id ? '#970bee' : '',
                }
              }
            >
              <Tooltip
                title="Coppied the ID"
                open={copyId === _id ? true : false}
                onClick={() => {
                  setCopyId(_id);
                  navigator.clipboard.writeText(_id);
                }}
                leaveDelay={1500}
              >
                <Button
                  sx={{
                    border: 0,
                    // color: copyId === _id ? '#fff' : '',
                    '&:focus': {
                      outline: 'none',
                    },
                  }}
                >
                  {row?._id}
                </Button>
              </Tooltip>
            </Box>
          );
        },
      },
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
    [rowId, copyId]
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
              autoHeight
              rows={data}
              columns={columns}
              pageSize={pageSize}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              rowsPerPageOptions={[25, 50, 100]}
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
