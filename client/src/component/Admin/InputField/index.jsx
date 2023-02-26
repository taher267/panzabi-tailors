import AdminLayout from '../../Layout/AdminLayout/index';
import './measurement.css';
import Box from '@mui/material/Box';
// import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import { useEffect, useState, useMemo } from 'react';
import InputFieldActions from './InputFieldActions';
import { Link, useLocation } from 'react-router-dom';
import useGetQurey from '../../hooks/gql/useGetQurey';
import { CircularProgress, Divider, Typography } from '@mui/material';
import SyncIcon from '@mui/icons-material/Sync';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

const rgbaGen = (min = 0, max = 255) => {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
};
const InputFieldList = () => {
  const location = useLocation();
  // const [pageSize, setPageSize] = useState(10);
  // const [rowId, setRowId] = useState(null);
  // const [copyId, setCopyId] = useState();
  const { loading, data, error } = useGetQurey(
    'ALL_INPUT_FIELDS',
    null,
    'allFields'
  );
  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);
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
  useEffect(() => {
    // if (location?.state) {
    //   window.history.replaceState({}, document.title);
    //   window.location.reload();
    // }
  }, []);

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
        <Box
          style={{
            display: 'grid',
            gap: '5px',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          }}
        >
          <Box sx={{ width: '100%' }} className="measuementActions">
            {data?.map?.((item) => {
              const { fieldGroup, fields } = item;
              return (
                <Box key={fieldGroup}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: 2,
                    }}
                  >
                    <Typography variant="h5">
                      Group Name: {fieldGroup}
                    </Typography>
                    <Link to={`/dashboard/fields/${item._id}`}>
                      <Button
                        variant="outlined"
                        endIcon={<ArrowOutwardIcon />}
                        startIcon={<SyncIcon />}
                      >
                        Sync
                      </Button>
                    </Link>
                  </Box>
                  <Divider />
                  <Box>
                    {fields.map?.((fld) => {
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
              );
            })}
          </Box>
        </Box>
      )}
    </AdminLayout>
  );
};
export default InputFieldList;
