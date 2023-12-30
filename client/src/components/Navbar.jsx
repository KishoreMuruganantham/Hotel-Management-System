/*import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav>
      <Link to='/'>Home</Link>
      <Link to='/register'>Register</Link>
      <Link to='login'>Login</Link>
    </nav>
  )
}*/
import "./navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
//import { AuthContext } from "../../context/AuthContext";
import { UserContext } from "../context/userContext";

export default function Navbar()  {
  const { user, logout } = useContext(UserContext);

  return (
    <div className="navbar">
      <div className="navContainer">
      <a href="/" className="logo">Booking</a>

        {user ? (
          <div className="user-info">
            <span className="user-name">{user.name}</span>
            <button className="navButton" onClick={logout}>
              Logout
            </button>
          </div>
        ) : (
          <div className="navItems">
            <Link to="/register" style={{ textDecoration: "none" }}>
              <button className="navButton">Register</button>
            </Link>
            <Link to="/login" style={{ textDecoration: "none" }}>
              <button className="navButton">Login</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}