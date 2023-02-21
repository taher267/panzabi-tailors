import Box from '@mui/material/Box';
import Sidebar from '../../Admin/Sidebar';
import Head from '../../graphql/Head';
import AllOutIcon from '@mui/icons-material/AllOut';
import React from 'react';

const AdminLayout = ({ children, title, rightSX, leftSX }) => {
  const [width, setWidth] = React.useState({ l: 20, r: 80 });
  const [isExpend, setisExpend] = React.useState(false);
  const widthHandler = () => {
    setisExpend((p) => !p);
    setWidth((p) => (p.l === 20 ? { l: 0, r: 100 } : { l: 20, r: 80 }));
  };
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        marginTop: 3,
        position: 'relative',
      }}
    >
      <Head title={title} />
      <AllOutIcon
        onClick={widthHandler}
        sx={{ position: 'absolute', marginLeft: '19%', zIndex: 99999 }}
      />
      <Box
        sx={{
          width: { xs: 0, sm: 0, md: `${width?.l || ''}%` },
          paddingX: { xs: 0, sm: 0, md: 2 },
          display: {
            xs: isExpend ? 'inline-block' : 'none',
            sm: isExpend ? 'inline-block' : 'none',
            md: isExpend ? 'inline-block' : 'none',
            // xs: width?.l ? 'inline-block' : 'none',
            // sm: width?.l ? 'inline-block' : 'none',
            // md: width?.l ? 'inline-block' : 'none',
          },
          height: '100%',
          ...leftSX,
        }}
      >
        <Sidebar />
      </Box>
      <Box
        sx={{
          width: { xs: '100%', sm: '100%', md: `${width?.r || ''}%` },
          display: { xs: 'block', sm: 'block', md: 'inline-block' },
          padding: { xs: 2, sm: 1.5 },
          height: '100%',
          ...rightSX,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default AdminLayout;
