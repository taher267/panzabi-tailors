import { useMemo, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';

// import { DataGrid } from '@mui/x-data-grid';
// import { Visibility } from '@mui/icons-material';
import {
  DataGridPremium,
  GridToolbar,
  // useGridApiRef,
  // useKeepGroupedColumnsHidden,
} from '@mui/x-data-grid-premium';
import { Link } from 'react-router-dom';
import useGetQurey from '../../hooks/gql/useGetQurey';
import LinearLoader from '../../Loaders/LinearLoader';
import { useEffect } from 'react';
import AdminLayout from '../../Layout/AdminLayout';
import TemplateAction from './TemplateActions';

const statusesOptions = [
  { value: 'ACTIVE', label: 'ACTIVE', color: 'red' },
  { value: 'PENDING', label: 'PENDING' },
  { value: 'REJECT', label: 'REJECT' },
];
const TemplateList = () => {
  const [val, setVal] = useState(null);
  const [rowId, setRowId] = useState(null);
  const columns = useMemo(
    () => [
      {
        field: '_id',
        headerName: 'ID',
        minWidth: 150,
        hide: true,
      },
      {
        field: 'name',
        headerName: 'Name/Type',
        minWidth: 110,
        type: 'singleSelect',
        valueOptions: ['up', 'down'].map((item) => item),
        editable: true,
      },
      {
        field: 'templateBody',
        headerName: 'Template Body',
        minWidth: 700,
        editable: true,
      },

      {
        field: 'engage',
        headerName: 'Reference',
        description: 'Customer Created',
        sortable: false,
        minWidth: 160,
        valueGetter: ({ row }) => {
          return row?.engage?.length;
        },
        hide: true,
      },
      {
        field: 'Actions',
        headerName: 'Actions',
        sortable: false,
        minWidth: 300,
        renderCell: (params) => (
          <TemplateAction {...{ params, rowId, setRowId }} />
        ),
      },
    ],
    [rowId]
  );
  const { loading, data, error } = useGetQurey(
    'ALL_TEMPATES',
    null,
    'allTemplates'
  );
  useEffect(() => {
    document.querySelector('.Mui-resizeTriggers')?.previousSibling.remove();
  }, [data]);
  // console.log(data);
  return (
    <AdminLayout>
      {loading && <LinearLoader />}
      <DataGridPremium
        rows={(data?.length && data) || []}
        autoHeight
        columns={columns}
        pageSize={10}
        getRowHeight={() => 'auto'}
        rowsPerPageOptions={[5]}
        components={{ Toolbar: GridToolbar }}
        getRowId={({ _id }) => _id}
        onCellEditCommit={({ id }) => setRowId(id)}
      />
    </AdminLayout>
  );
};

export default TemplateList;
