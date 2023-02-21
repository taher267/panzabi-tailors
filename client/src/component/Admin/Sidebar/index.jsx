import { Link } from 'react-router-dom';

const Sidebar = ({ position }) => {
  return (
    <ul style={{ listStyle: 'none', position }}>
      <li>
        <Link to="/dashboard/order">অর্ডার সমুহঃ</Link>
      </li>
      {/* <li>
        <Link to="/dashboard/order/new">নতুন অর্ডারঃ</Link>
      </li> */}
      <li>
        <Link to="/dashboard/design">নকশাসমূহ</Link>
      </li>
      <li>
        <Link to="/dashboard/design/new">নতুন নকশা</Link>
      </li>
      <li>
        <Link to="/dashboard/customer">গ্রাহকসমূহ</Link>
      </li>
      <li>
        <Link to="/dashboard/customer/new">নতুন গ্রাহক</Link>
      </li>
      <li>
        <Link to="/dashboard/product">পণ্যসমূহ</Link>
      </li>
      <li>
        <Link to="/dashboard/product/new">নতুন পণ্য</Link>
      </li>
      <li>
        <Link to="/dashboard/measurement">পরিমাপ</Link>
      </li>
      <li>
        <Link to="/dashboard/measurement/new">নতুন পরিমাপ</Link>
      </li>
      <li>
        <Link to="/template">Template</Link>
      </li>
      <li>
        <Link to="/template/new">New Template</Link>
      </li>
      <li>
        <Link to="/dashboard/account">হিসাবসমূহ</Link>
      </li>
      <li>
        <Link to="/dashboard/account/new">নতুন হিসাব</Link>
      </li>
    </ul>
  );
};

export default Sidebar;
