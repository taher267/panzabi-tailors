import { Box } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useMemo, useState, Fragment } from 'react';

export default function DesignView({ alldesigns }) {
  const [rowId, setRowId] = useState();
  const columns = useMemo(
    () => [
      { field: '_id', headerName: 'ID', width: 210, hide: true },
      {
        field: 'item',
        headerName: 'Item',
        width: 250,
      },
      {
        field: 'desc',
        headerName: 'Description',
        width: 250,
        editable: true,
      },
    ],
    [rowId]
  );
  return (
    <Box
      height={'500px'}
      sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}
    >
      {alldesigns?.length &&
        alldesigns.map((items) => {
          return (
            <Fragment key={items._id}>
              {/* {console.log(items)} */}
              {items?.designs && (
                <DataGrid
                  rows={items.designs}
                  columns={columns}
                  //   disableSelectionOnClick
                  checkboxSelection
                  //   components={{ Toolbar: GridToolbar }}
                  hideFooter
                  pageSize={items?.designs?.length}
                  getRowId={(row) => row._id}
                  // selectionModel={['633752a9138679d5420134a0']}
                  disableColumnSelector={true}
                  experimentalFeatures={{ newEditingApi: true }}
                />
              )}
            </Fragment>
          );
        })}
    </Box>
  );
}
