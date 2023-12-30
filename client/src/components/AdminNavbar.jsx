import "./adminnavbar.scss";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import { Link } from "react-router-dom";

const AdminNavbar = () => {
  const { user, logout } = useContext(UserContext);

  return (
    <div className="adminnavbar">
      <div className="navContainer">
      <a href="/admin" className="logo">Booking</a>

        {user ? (
          <div className="user-info">
            <span className="user-name">{user.name}</span>
            <Link to="/" style={{ textDecoration: "none" }}>
            <button className="navButton" onClick={logout}>
              Logout
            </button>
            </Link>
          </div>
        ) : (
          <div className="navItems">
            <Link to="admin/register" style={{ textDecoration: "none" }}>
              <button className="navButton">Register</button>
            </Link>
            <Link to="admin/login" style={{ textDecoration: "none" }}>
              <button className="navButton">Login</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminNavbar;
