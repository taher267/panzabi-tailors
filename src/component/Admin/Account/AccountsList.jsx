import AdminLayout from '../../Layout/AdminLayout/index';
import './account.css';
import { Box, LinearProgress, Typography } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useEffect, useState, useMemo } from 'react';
import AccountActions from './AccountActions';
import { useLocation } from 'react-router-dom';
import useGetQurey from '../../hooks/gql/useGetQurey';
import moment from 'moment';
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

  useEffect(() => {
    if (data) {
      setReport({ ...initReport });
      for (const item of data) {
        setReport((p) => {
          return {
            ...p,
            cash_in: p?.cash_in + item.cash_in,
            cash_out: p?.cash_out + item.cash_out,
            today_cash_in:
              mnt.format('YYYY-MM-DD') ===
              moment(item.date).format('YYYY-MM-DD')
                ? p?.today_cash_in + item?.cash_in
                : p?.today_cash_in,

            today_cash_out:
              mnt.format('YYYY-MM-DD') ===
              moment(item.date).format('YYYY-MM-DD')
                ? p?.today_cash_out + item?.cash_out
                : p?.today_cash_out,

            month_of_cash_in:
              mnt.startOf('month').format('YYYY-MM-DD') &&
              mnt.endOf('month').format('YYYY-MM-DD')
                ? p?.month_of_cash_in + item?.cash_in
                : p?.month_of_cash_in,

            month_of_cash_out:
              mnt.startOf('month').format('YYYY-MM-DD') &&
              mnt.endOf('month').format('YYYY-MM-DD')
                ? p?.month_of_cash_out + item?.cash_out
                : p?.month_of_cash_out,
          };
        });
      }
    }
  }, [data]);

  return (
    <AdminLayout>
      {loading && (
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      )}
      <Box sx={{ border: '1px solid #ddd', marginBottom: '5px' }}>
        <Typography variant="h5" sx={{ textAlign: 'center' }}>
          Today
        </Typography>

        <Typography variant="subtitle1">
          Total Cash IN {report?.cash_in}
        </Typography>
        <Typography variant="subtitle1">
          Total Cash out {report?.cash_out}
        </Typography>
        <Typography variant="subtitle1">
          {mnt.format('MMMM')} Cash In {report?.month_of_cash_in}
        </Typography>
        <Typography variant="subtitle1">
          {mnt.format('MMMM')} Cash out {report?.month_of_cash_out}
        </Typography>
        <Typography variant="subtitle1">
          Today Cash In {report?.today_cash_in}
        </Typography>
        <Typography variant="subtitle1">
          Today Cash out {report?.today_cash_out}
        </Typography>
      </Box>
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
