import * as React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Tab, Tabs } from '@mui/material';

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
          <Typography>{children}</Typography>
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

export default function VerticalTabs({ designs }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
        {designs?.map((item, i) => (
          <Tab
            key={item?._id?.$oid}
            label={item?.design_name}
            {...a11yProps(i)}
          />
        ))}
      </Tabs>
      {designs?.map(({ design_name }, i) => (
        <TabPanel key={i} value={value} index={i}>
          <span>{design_name}</span>
        </TabPanel>
      ))}
    </Box>
  );
}
