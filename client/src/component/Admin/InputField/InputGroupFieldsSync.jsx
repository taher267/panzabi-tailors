import AdminLayout from '../../Layout/AdminLayout/index';
import './measurement.css';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import { useEffect, useState, useMemo } from 'react';
import InputFieldActions from './InputFieldActions';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useGetQurey from '../../hooks/gql/useGetQurey';
import { CircularProgress, Divider, Typography } from '@mui/material';

const rgbaGen = (min = 0, max = 255) => {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
};
const InputGroupFieldsSync = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { fieldId } = useParams();
  // const [rowId, setRowId] = useState(null);
  // const [copyId, setCopyId] = useState();
  const { loading, data, error } = useGetQurey(
    'SINGLE_INPUT_FIELD',
    { key: '_id', value: fieldId },
    'getInputField'
  );

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  useEffect(() => {
    if (!/^[0-9a-fA-F]{24}$/.test(fieldId)) {
      navigate('/dashboard/fields', { replace: true });
    }
  }, []);
  /** <Tooltip
                title="Coppied the ID"
                open={copyId === _id ? true : false}
                onClick={() => {
                  setCopyId(_id);
                  navigator.clipboard.writeText(_id);
                }}
                leaveDelay={1500}
              >
                <Button
                  sx={{
                    border: 0,
                    // color: copyId === _id ? '#fff' : '',
                    '&:focus': {
                      outline: 'none',
                    },
                  }}
                >
                  {row?._id}
                </Button>
              </Tooltip> */

  return (
    <AdminLayout>
      {(loading && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '80vh',
          }}
        >
          <CircularProgress />
        </Box>
      )) || (
        <Box>
          <Typography>Group Field Sync</Typography>
          {typeof data === 'object' && (
            <Box
              style={{
                display: 'grid',
                gap: '5px',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              }}
            >
              <Box sx={{ width: '100%' }} className="">
                <Box>
                  <Typography variant="h5">
                    Group Name: {data?.fieldGroup}
                  </Typography>
                  <Divider />
                  <Box>
                    {data?.fields?.map?.((fld) => {
                      const { icon, __typename, options, ...restFlds } = fld;
                      return (
                        <Box
                          key={fld._id}
                          sx={{
                            display: 'grid',
                            gridTemplateColumns:
                              'repeat(auto-fit, minmax(450px, 1fr))',
                            border: '1px solid #ddd',
                            marginBottom: 1,
                            padding: 1,
                          }}
                        >
                          {Object.keys(restFlds)?.map?.((k, i) => {
                            return (
                              <Box
                                key={`${fld._id}${i}`}
                                sx={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  borderRight:
                                    i % 2 === 0 ? '1px solid #ddd' : '',
                                  paddingX: 1.5,
                                  borderBottom: `1px solid rgb(${rgbaGen()},${rgbaGen()},${rgbaGen()})`,
                                  marginBottom: 1,
                                }}
                              >
                                <Typography>{k} : </Typography>
                                <Typography>&nbsp;{restFlds[k]}</Typography>
                              </Box>
                            );
                          })}
                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              paddingX: 1.5,
                              borderBottom: `1px solid rgb(${rgbaGen()},${rgbaGen()},${rgbaGen()})`,
                              marginBottom: 1,
                            }}
                          >
                            <Typography>Options : </Typography>
                            {options?.map?.((opt, ky) => (
                              <Typography key={`${k}.${ky}`}>
                                &nbsp;{opt}
                              </Typography>
                            ))}
                          </Box>
                        </Box>
                      );
                    })}
                  </Box>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      )}
    </AdminLayout>
  );
};
export default InputGroupFieldsSync;
