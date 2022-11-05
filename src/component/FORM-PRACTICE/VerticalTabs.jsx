import * as React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  Tab,
  Tabs,
  Checkbox,
  TextField,
  FormControlLabel,
} from '@mui/material';

export default function VerticalTabs({
  allDesigns,
  register,
  errors,
  watching,
  design_type = 'up',
}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    if (!Object.keys(errors)?.length) setValue(newValue);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        // bgcolor: 'background.paper',
        display: 'flex',
        // height: 350,
        maxHeight: '100%',
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ border: 1, borderColor: 'divider' }}
      >
        {allDesigns?.map((item, i) => (
          <Tab
            sx={{
              color: errors?.[design_type]?.[i] ? 'red !important' : '',
              borderColor: 'red',
            }}
            key={item?._id}
            // key={item?._id?.$oid }
            label={item?.design_name}
            {...a11yProps(i)}
          />
        ))}
      </Tabs>
      {allDesigns?.map(({ design_name, designs, _id: parent }, i) => (
        <TabPanel key={i} value={value} index={i}>
          <Typography>{design_name}</Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              // gridTemplateColumns: 'repeat(auto-fit, minmax(700px, 1fr))',
            }}
          >
            {/* {console.log(parent)} */}
            <input
              type="hidden"
              defaultValue={parent} //|| _id
              // defaultValue={parent.$oid}
              {...register(`${[design_type]}.${i}.group`)}
            />
            {designs?.map(({ item, _id }, k) => {
              let error = errors?.[design_type]?.[i]?.[k];
              return (
                <Box
                  key={k}
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    // width: '100%',
                    marginBottom: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Typography
                    component="div"
                    sx={{
                      color: error ? '#dd1334' : '',
                    }}
                  >
                    {error ? (
                      <Typography
                        sx={{
                          marginLeft: 2,
                          fontSize: 12,
                        }}
                      >
                        {error?.desc?.message}
                      </Typography>
                    ) : (
                      ''
                    )}

                    <FormControlLabel
                      sx={{
                        margin: 0,
                      }}
                      control={
                        <Checkbox
                          {...register(`${[design_type]}.${i}.${k}.isCheck`)}
                          sx={{
                            color: errors?.[design_type]?.[i]?.[k]
                              ? '#dd1334'
                              : '',
                          }}
                        />
                      }
                      label={item}
                    />
                    {/* {console.log(_id.$oid)} */}
                    <input
                      type="hidden"
                      defaultValue={_id} //|| _id
                      // defaultValue={_id.$oid}
                      {...register(`${[design_type]}.${i}.${k}.dsn_id`)}
                    />
                  </Typography>
                  <TextField
                    error={errors?.[design_type]?.[i]?.[k] ? true : false}
                    fullWidth
                    {...register(`${[design_type]}.${i}.${k}.desc`, {
                      validate: (val) => {
                        console.log(
                          '!watching?.[i]?.[k]?.isCheck',
                          watching?.[i]?.[k]
                        );
                        // if (val?.trim() && !watching?.[i]?.[k]?.isCheck)
                        //   return `✅ Please check it!`;
                      },
                    })}
                  />
                </Box>
              );
            })}
          </Box>
        </TabPanel>
      ))}
    </Box>
  );
}
VerticalTabs.propTypes = {
  register: PropTypes.func.isRequired,
  clearErrors: PropTypes.func,
  allDesigns: PropTypes.array.isRequired,
  errors: PropTypes.object.isRequired,
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}
