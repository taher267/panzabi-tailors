import Box from '@mui/material/Box';
import Sidebar from '../../Admin/Sidebar';
import Head from '../../graphql/Head';

const AdminLayout = ({ children, title, rightSX, leftSX }) => {
  return (
    <Box sx={{ width: '100%', height: '100%', display: 'flex', marginTop: 3 }}>
      <Head title={title} />
      <Box
        sx={{
          width: '20%',
          height: '100%',
          display: 'inline-block',
          paddingX: 2,
          ...leftSX,
        }}
      >
        <Sidebar />
      </Box>
      <Box
        sx={{
          width: '80%',
          height: '100%',
          display: 'inline-block',
          ...rightSX,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default AdminLayout;
