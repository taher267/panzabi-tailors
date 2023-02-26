import AdminLayout from '../../Layout/AdminLayout/index';
import './measurement.css';
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useGetQurey from '../../hooks/gql/useGetQurey';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { DragDropContext, Draggable } from 'react-beautiful-dnd';
import Droppable from '../../../helpers/StrictModeDroppable';

const rgbaGen = (min = 0, max = 255) => {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
};
const InputGroupFieldsSync = () => {
  const navigate = useNavigate();
  const { fieldId } = useParams();
  const [rows, setRows] = useState([]);
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
    if (data && !rows?.length) {
      setRows(data.fields);
    }
  }, [data]);

  useEffect(() => {
    if (!/^[0-9a-fA-F]{24}$/.test(fieldId)) {
      navigate('/dashboard/fields', { replace: true });
    }
  }, []);

  const handleOnDrag = (result) => {
    if (!result?.destination) return;
    setRows((p) => {
      const tasks = [...p];
      const [reOrderedItem] = tasks.splice(result.source.index, 1);
      tasks.splice(result.destination.index, 0, reOrderedItem);
      return tasks;
    });
  };
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
              style={
                {
                  // display: 'grid',
                  // gap: '5px',
                  // gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                }
              }
            >
              <Box sx={{ width: '100%' }} className="">
                <Box>
                  <Typography variant="h5">
                    Group Name: {data?.fieldGroup}
                  </Typography>
                  <Divider />
                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns:
                        'repeat(auto-fit, minmax(450px, 1fr))',
                      border: '1px solid #ddd',
                      marginBottom: 1,
                      padding: 1,
                    }}
                  >
                    <DragDropContext onDragEnd={handleOnDrag}>
                      <Droppable droppableId="fieldGoup">
                        {(provided) => {
                          return (
                            <section
                              {...provided.droppableProps}
                              ref={provided.innerRef}
                            >
                              {rows?.map?.((fld, i) => {
                                const {
                                  icon,
                                  __typename,
                                  options,
                                  ...restFlds
                                } = fld;
                                return (
                                  <Draggable
                                    key={i}
                                    draggableId={fld._id}
                                    index={i}
                                  >
                                    {({
                                      draggableProps,
                                      dragHandleProps,
                                      innerRef,
                                    }) => {
                                      return (
                                        <Box
                                          {...draggableProps}
                                          {...dragHandleProps}
                                          ref={innerRef}
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
                                          {Object.keys(restFlds)?.map?.(
                                            (k, i) => {
                                              return (
                                                <Box
                                                  key={`${fld._id}${i}`}
                                                  sx={{
                                                    display: 'flex',
                                                    justifyContent:
                                                      'space-between',
                                                    borderRight:
                                                      i % 2 === 0
                                                        ? '1px solid #ddd'
                                                        : '',
                                                    paddingX: 1.5,
                                                    borderBottom: `1px solid rgb(${rgbaGen()},${rgbaGen()},${rgbaGen()})`,
                                                    marginBottom: 1,
                                                  }}
                                                >
                                                  <Typography>
                                                    {k} :{' '}
                                                  </Typography>
                                                  <Typography>
                                                    &nbsp;{restFlds[k]}
                                                  </Typography>
                                                </Box>
                                              );
                                            }
                                          )}
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
                                    }}
                                  </Draggable>
                                );
                              })}
                              {provided.placeholder}
                            </section>
                          );
                        }}
                      </Droppable>
                    </DragDropContext>
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
