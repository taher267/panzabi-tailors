import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <ul>
      <li>
        <Link to="/dashboard/order">Order</Link>
      </li>

      <li>
        <Link to="/dashboard/order/new">New Oreder</Link>
      </li>
      <li>
        <Link to="/dashboard/design">Design</Link>
      </li>
      <li>
        <Link to="/dashboard/design/new">New Design</Link>
      </li>
      <li>
        <Link to="/dashboard/customer">Customer</Link>
      </li>
      <li>
        <Link to="/dashboard/customer/new">New</Link>
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

      <li>
        <Link to="/dashboard/account">Account</Link>
      </li>
      <li>
        <Link to="/dashboard/account/new">New Account</Link>
      </li>
    </ul>
  );
};

export default Sidebar;
