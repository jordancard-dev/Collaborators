
import { Link, NavLink } from 'react-router-dom';

type Props = {}

const Navbar = (props: Props) => {
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