import { useQuery } from '@apollo/client';
import './userList.css';
import { ALL_USERS } from '../../graphql/Query/userQry';
import { LinearProgress, Box } from '@mui/material';
import AdminLayout from '../../Layout/AdminLayout/index';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { useState } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import {
  // DataGridPremium,
  GridToolbar,
  // useGridApiRef,
  // useKeepGroupedColumnsHidden,
} from '@mui/x-data-grid-premium';
import { Edit } from '@mui/icons-material';
import { useMemo } from 'react';
import UserActions from './UserActions';

const animatedComponents = makeAnimated();
const roleOptions = [
  { value: 'USER', label: 'USER', color: 'red' },
  { value: 'ADMIN', label: 'ADMIN' },
  { value: 'CUSTOMER', label: 'CUSTOMER' },
  { value: 'SUPER_ADMIN', label: 'SUPER_ADMIN' },
];

const UserList = () => {
  const [rowId, setRowId] = useState(null);
  const [filter, setFilter] = useState('ADMIN');
  const { loading, data } = useQuery(ALL_USERS, {
    variables: {
      key: 'roles',
      value: filter,
    },
  });
  const columns = useMemo(
    () => [
      { field: '_id', headerName: 'ID', width: 90, hide: true },
      {
        field: 'name',
        headerName: 'Full Name',
        width: 110,
        editable: true,
      },
      {
        field: 'roles',
        headerName: 'roles',
        width: 110,
        editable: true,
        type: 'singleSelect',
        valueOptions: roleOptions.map((role) => role.value),
      },
      {
        field: 'phone_no',
        headerName: 'Phone',
        type: 'text',
        width: 110,
        editable: true,
        sortable: false,
      },
      {
        field: 'email',
        headerName: 'Email',
        type: 'email',
        width: 110,
        sortable: false,
        editable: true,
      },
      {
        field: 'username',
        headerName: 'Username',
        sortable: false,
        width: 110,
        editable: true,
      },
      {
        field: 'status',
        headerName: 'Status',
        width: 150,
        sortable: false,
        editable: true,
      },
      {
        field: 'thirdPirty',
        headerName: 'Third Party Auth',
        width: 150,
        editable: true,
        hide: true,
      },
      {
        field: 'updatedAt',
        headerName: 'Update Date',
        description: 'User Updated',
        hide: true,
        width: 160,
        valueGetter: (pms) => {
          return pms.row.updatedAt
            ? new Date(parseInt(pms.row.updatedAt)).toLocaleString()
            : '';
        },
      },
      {
        hide: true,
        field: 'createdAt',
        headerName: 'Created Date',
        description: 'Customer Created',
        sortable: false,
        width: 160,
        valueGetter: (pms) => {
          return pms.row.updatedAt
            ? new Date(parseInt(pms.row.updatedAt)).toLocaleString()
            : '';
        },
      },
      {
        field: 'actions',
        outline: false,
        type: 'actions',
        headerName: 'Actions',
        width: 200,
        // editable: true,
        renderCell: (params) => {
          return <UserActions {...{ params, rowId, setRowId }} />;
        },
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
        styles={{
          background: '#000',
          zIndex: '9999',
        }}
      >
        <Select
          className="selectedRoles"
          onChange={(e) => {
            let R = '';
            for (const i of e) {
              R += i.value + '|';
            }

            if (R.slice(0, -1).length === 0) return setFilter('ADMIN');
            setFilter(R.slice(0, -1));
          }}
          closeMenuOnSelect={false}
          components={animatedComponents}
          defaultValue={[{ value: filter, label: filter }]}
          isMulti
          options={roleOptions}
        />
      </div>

      <div
        style={{
          display: 'grid',
          gap: '5px',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        }}
      >
        {!loading && data?.allUsers?.length && (
          <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={data?.allUsers || []}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
              disableSelectionOnClick
              components={{ Toolbar: GridToolbar }}
              getRowId={(row) => row._id}
              onCellEditCommit={(row) => setRowId(row._id)}
            />
          </Box>
        )}
      </div>
    </AdminLayout>
  );
};

export default UserList;
