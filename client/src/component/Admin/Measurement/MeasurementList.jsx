import AdminLayout from '../../Layout/AdminLayout/index';
import './measurement.css';
import { useQuery } from '@apollo/client';
import { ALL_MEASUREMENTS } from '../../graphql/Query/measurementQry';
import { Box, LinearProgress } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import { useEffect, useState, useMemo } from 'react';
import MeasurementActions from './MeasurementActions';

const MeasurementList = () => {
  const [rowId, setRowId] = useState(null);
  const { loading, data, error } = useQuery(ALL_MEASUREMENTS);
  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);
  const columns = useMemo(
    () => [
      { field: 'id', headerName: 'ID', width: 90, hide: true },
      {
        requreid: true,
        field: 'name',
        headerName: 'Measurement Name',
        width: 200,
        editable: true,
      },
      {
        requreid: true,
        field: 'sl_id',
        headerName: 'Serial id',
        type: 'number',
        width: 110,
        editable: true,
      },

      {
        field: 'icon',
        headerName: 'Symbol/Icon',
        sortable: false,
        width: 250,
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
        renderCell: (params) => (
          <MeasurementActions {...{ params, rowId, setRowId }} />
        ),
      },
    ],
    [rowId]
  );
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
        {!loading && data?.allMeasurements?.length && (
          <Box
            sx={{ height: 400, width: '100%' }}
            className="measuementActions"
          >
            <DataGrid
              rows={data.allMeasurements}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
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
export default MeasurementList;
