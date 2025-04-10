
import { Link, NavLink } from 'react-router-dom';


const Navbar = () => {
  return (
    <nav>
    <ul>
      <li>
        <NavLink to="/" >Home</NavLink>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
    </ul>
  </nav>
  )
}

export default Navbar