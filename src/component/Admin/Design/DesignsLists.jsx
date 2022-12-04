import AdminLayout from '../../Layout/AdminLayout/index';
import './design.css';
import { Box, LinearProgress } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useEffect, useState, useMemo } from 'react';
import DesignActions from './DesignActions';
import { useLocation } from 'react-router-dom';
import useGetQurey from '../../hooks/gql/useGetQurey';

const DesignsLists = () => {
  const location = useLocation();
  const [type, setType] = useState([]);
  const [pageSize, setPageSize] = useState(5);
  const [rowId, setRowId] = useState(null);
  const { loading, data, error } = useGetQurey(
    'ALL_DESIGNS',
    null,
    'allDesigns'
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
        requreid: true,
        field: 'design_name',
        headerName: 'Design Name',
        width: 200,
        editable: true,
      },
      {
        field: 'type',
        headerName: 'Type',
        width: 110,
        // editable: true,
        renderCell: ({ row }) => {
          return (
            <select
              onChange={({ target: { name, value } }) => {
                console.log({ ...type, [name]: value });
              }}
            >
              <option value="1">Panzabi</option>
              <option value="2">Pazama</option>
            </select>
          );
        },
      },

      {
        field: 'designs',
        headerName: 'Designs',
        sortable: false,
        // editable: true,
        width: 500,
        renderCell: ({ row: { designs } }) => {
          return (
            <div style={{ display: 'block' }}>
              {designs.reduce((acc, cur) => {
                return (acc += cur.item + ', ');
              }, '')}
            </div>
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
          <DesignActions
            {...{ params, rowId, setRowId }}
            type={type}
            setType={setType}
          />
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
export default DesignsLists;