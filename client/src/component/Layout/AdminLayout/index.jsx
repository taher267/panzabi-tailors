import Box from '@mui/material/Box';
import Sidebar from '../../Admin/Sidebar';

const AdminLayout = ({ children }) => {
  return (
    <Box sx={{ width: '100%', height: '100%', display: 'flex' }}>
      <Box
        sx={{
          width: '20%',
          height: '100%',
          display: 'inline-block',
          paddingX: 2,
        }}
      >
        <Sidebar />
      </Box>
      <Box sx={{ width: '80%', height: '100%', display: 'inline-block' }}>
        {children}
      </Box>
    </Box>
  );
};

export default AdminLayout;
