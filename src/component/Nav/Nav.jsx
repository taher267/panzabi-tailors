import { NavLink } from 'react-router-dom';
export default function Nav() {
  return (
    <ul
      style={{
        listStyle: 'none',
        display: 'flex',
        gap: '10px',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      }}
    >
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/login">Login</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/customer">Customer</NavLink>
      </li>
      <li>
        <NavLink to="/category-products">Category Products</NavLink>
      </li>
    </ul>
  );
}
