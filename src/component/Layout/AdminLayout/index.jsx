import Sidebar from '../../Admin/Sidebar';

const AdminLayout = ({ children }) => {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div style={{ width: '20%', height: '100%', display: 'inline-block' }}>
        <Sidebar />
      </div>
      <div style={{ width: '80%', height: '100%', display: 'inline-block' }}>
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
