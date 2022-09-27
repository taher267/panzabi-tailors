import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <ul>
      <li>
        <Link to="/customer">Customer</Link>
      </li>
      <li>
        <Link to="/customer/new">New</Link>
      </li>
      <li>
        <Link to="/dashboard/product">Product</Link>
      </li>
      <li>
        <Link to="/dashboard/product/new">New Product</Link>
      </li>
      <li>
        <Link to="/dashboard/measurement">Measurement</Link>
      </li>

      <li>
        <Link to="/dashboard/measurement/new">New Measurement</Link>
      </li>
    </ul>
  );
};

export default Sidebar;
