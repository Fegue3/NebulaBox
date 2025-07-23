import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <h3>NebulaBox</h3>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
