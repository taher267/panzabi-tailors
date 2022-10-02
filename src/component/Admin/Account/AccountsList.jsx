import AdminLayout from '../../Layout/AdminLayout/index';
import './account.css';
import { Box, LinearProgress, Typography } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useEffect, useState, useMemo } from 'react';
import AccountActions from './AccountActions';
import { useLocation } from 'react-router-dom';
import useGetQurey from '../../hooks/gql/useGetQurey';
import moment from 'moment';
import AccountSummary from './AccountSummary';
const initReport = {
  cash_in: 0,
  cash_out: 0,
  today_cash_in: 0,
  today_cash_out: 0,
  month_of_cash_in: 0,
  month_of_cash_out: 0,
};
const AccountsList = () => {
  const location = useLocation();
  const [pageSize, setPageSize] = useState(5);
  const [mnt, setMnt] = useState(moment());
  const [report, setReport] = useState({ ...initReport });
  const [rowId, setRowId] = useState(null);
  const { loading, data, error } = useGetQurey(
    'ALL_ACCOUNTS',
    null,
    'allAccounts'
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
        field: 'date',
        // type: 'date',
        headerName: 'Date',
        width: 100,
        editable: true,
      },
      {
        field: 'purpose',
        headerName: 'Purpose',
        width: 250,
        editable: true,
      },
      {
        field: 'type',
        headerName: 'Type',
        width: 90,
        editable: true,
      },
      {
        field: 'cash_in',
        headerName: 'Cash In',
        type: 'number',
        sortable: true,
        editable: true,
        width: 90,
      },
      {
        field: 'cash_out',
        headerName: 'Cash Out',
        type: 'number',
        sortable: true,
        editable: true,
        width: 90,
      },
      {
        field: 'name',
        headerName: 'Name',
        sortable: false,
        editable: true,
        width: 120,
      },
      {
        field: 'comment',
        headerName: 'Comment',
        sortable: false,
        editable: true,
        width: 250,
      },
      {
        field: 'createdAt',
        headerName: 'Entry Time',
        sortable: true,
        width: 160,
        hide: true,
      },
      {
        field: 'updatedAt',
        headerName: 'Entry Update',
        sortable: true,
        width: 160,
        hide: true,
      },
      {
        field: 'Actions',
        headerName: 'Actions',
        sortable: false,
        width: 250,
        type: 'actions',
        renderCell: (params) => (
          <AccountActions {...{ params, rowId, setRowId }} />
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
      <AccountSummary
        data={data}
        initReport={initReport}
        report={report}
        setReport={setReport}
      />
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
export default AccountsList;
