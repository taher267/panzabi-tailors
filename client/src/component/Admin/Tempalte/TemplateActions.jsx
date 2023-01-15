import { useState } from 'react';
import useMutationFunc from '../../hooks/gql/useMutationFunc';
import CRUDActions from '../../ui/Action/CRUDActions';
export default function TemplateActions({ params, rowId, setRowId }) {
  const [success, setSuccess] = useState(false);
  const {
    bug,
    data,
    mutation: updateTempate,
    processing,
  } = useMutationFunc('EDIT_TEMPLATE', setSuccess);

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

    updateTempate({ variables: { id, ...updateData } });
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
