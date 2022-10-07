import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Visibility, Save, Delete, Check } from '@mui/icons-material';
import { Button, Box, Fab, CircularProgress } from '@mui/material';
import moment from 'moment';
import { green, red } from '@mui/material/colors';
import useMutationFunc from '../../hooks/gql/useMutationFunc';
import CRUDActions from '../../ui/Action/CRUDActions';

export default function AccountActions({ params, rowId, setRowId }) {
  //   const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const {
    processing,
    data,
    mutation: updateMutation,
    bug,
  } = useMutationFunc('EDIT_ACCOUNT', setSuccess);

  const { data: iSsuccess, mutation: del } = useMutationFunc(
    'DELETE_ACCOUNT',
    setSuccess
  );
  const { id, row } = params;
  // useEffect(() => {
  //   if (rowId === id && success) {
  //     setSuccess(false);
  //     setRowId(false);
  //   }

  //   if (bug) {
  //   }
  // }, [rowId, data, processing]);

  const updateHandle = () => {
    if (moment(row.date) > moment())
      return window.alert(`select max date today- ${moment()}`);
    const copy = { ...row };
    delete copy._id;
    delete copy.__typename;
    delete copy.updatedAt;
    delete copy.createdAt;
    // console.log({ _id: rowId, update: copy });
    updateMutation({
      variables: { _id: rowId, update: copy },
    });
  };
  return (
    <CRUDActions
      {...{
        rowId,
        id,
        success,
        setSuccess,
        setRowId,
        bug,
        data,
        processing,
        updateHandle,
        editUrl: '/dashboard/account',
        delFunc: () => {},
      }}
    />
  );
}
