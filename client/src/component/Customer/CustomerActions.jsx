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
    let { name, email, phone_no, address, status, transportation } = row;
    let updateData = {
      name,
      email,
      phone_no,
      address,
      status,
      transportation,
    };

    updateMutation({ variables: { id, ...updateData } });
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
