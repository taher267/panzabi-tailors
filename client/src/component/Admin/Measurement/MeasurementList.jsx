import AdminLayout from '../../Layout/AdminLayout/index';
import './measurement.css';
import { Box, LinearProgress } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useEffect, useState, useMemo } from 'react';
import MeasurementActions from './MeasurementActions';
import { useLocation } from 'react-router-dom';
import useGetQurey from './../../hooks/gql/useGetQurey';

const MeasurementList = () => {
  const location = useLocation();
  const [pageSize, setPageSize] = useState(10);
  const [rowId, setRowId] = useState(null);
  const { loading, data, error } = useGetQurey(
    'ALL_MEASUREMENTS',
    null,
    'allMeasurements'
  );
  // console.log(data);
  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);
  const columns = useMemo(
    () => [
      { field: '_id', headerName: 'ID', width: 220, hide: true },
      {
        field: 'label',
        headerName: 'Measurement Label',
        width: 200,
        editable: true,
      },
      {
        field: 'name',
        headerName: 'Measurement Name',
        width: 200,
        editable: true,
      },
      {
        field: 'sl_id',
        headerName: 'Serial id',
        type: 'number',
        width: 70,
        editable: true,
      },
      {
        field: 'options',
        headerName: 'Options',
        width: 150,
        editable: true,
      },
      {
        field: 'placeholder',
        headerName: 'Placeholder',
        width: 150,
        editable: true,
        hide: true,
      },
      {
        field: 'validation',
        headerName: 'Validation Rules',
        width: 150,
        editable: true,
      },
      {
        field: 'status',
        headerName: 'Status',
        type: 'singleSelect',
        sortable: false,
        valueOptions: [{ value: 'ACTIVE' }, { value: 'DEACTIVE' }].map(
          (s) => s.value
        ),
        width: 150,
        editable: true,
      },

      {
        field: 'icon',
        headerName: 'Symbol/Icon',
        sortable: false,
        hide: true,
        width: 120,
        renderCell: ({ row }) => {
          return (
            <>
              <p>{row?.icon?.src || row.name}</p>
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
          return <MeasurementActions {...{ params, rowId, setRowId }} />;
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
        <Box sx={{ width: '100%' }} className="measuementActions">
          <DataGrid
            autoHeight
            rows={(data?.length && [...data].reverse()) || []}
            columns={columns}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[10, 25, 50]}
            // checkboxSelection
            disableSelectionOnClick
            components={{ Toolbar: GridToolbar }}
            getRowId={(row) => row._id}
            onCellEditCommit={(row) => setRowId(row.id)}
          />
        </Box>
      </div>
    </AdminLayout>
  );
};
export default MeasurementList;
