import { useState } from 'react';
import useUpdateMutation from '../hooks/gql/useUpdateMutation';
import CRUDActions from '../ui/Action/CRUDActions';

export default function CustomerActions({ params, rowId, setRowId }) {
  const [success, setSuccess] = useState(false);
  const { processing, data, updateMutation, bug } = useUpdateMutation(
    'EDIT_CUSTOMER',
    setSuccess
  );
  const { id, row } = params;

  const updateHandle = () => {
    console.log(row);
    // updateMutation({
    //   variables: { id: rowId, update: { name: row.name, sl_id: row.sl_id } },
    // });
  };

  return (
    <CRUDActions
      {...{
        bug,
        data,
        id,
        processing,
        rowId,
        setSuccess,
        success,
        updateHandle,
        setRowId,
        editUrl: '/dashboard/customer',
        delFunc: () => {},
      }}
    />
  );
}
