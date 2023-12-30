import "./footer.css";
import { Link } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { useContext } from "react";
const Footer = () => {
  const openNewTab = () => {
    window.open('http://localhost:5174', '_blank'); // '_blank' opens the URL in a new tab
  };
  const { user, logout } = useContext(UserContext);
  return (
    <div className="footer">
      <div className="fLists">
        <ul className="fList">
          <li className="fListItem">Countries</li>
          <li className="fListItem">Regions</li>
          <li className="fListItem">Cities</li>
          <li className="fListItem">Districts</li>
          <li className="fListItem">Airports</li>
          <li className="fListItem">Hotels</li>
        </ul>
        <ul className="fList">
          <li className="fListItem">Homes </li>
          <li className="fListItem">Apartments </li>
          <li className="fListItem">Resorts </li>
          <li className="fListItem">Villas</li>
          <li className="fListItem">Hostels</li>
          <li className="fListItem">Guest houses</li>
        </ul>
        <ul className="fList">
          <li className="fListItem">Unique places to stay </li>
          <li className="fListItem">Reviews</li>
          <li className="fListItem">Unpacked: Travel articles </li>
          <li className="fListItem">Travel communities </li>
          <li className="fListItem">Seasonal and holiday deals </li>
        </ul>
        <ul className="fList">
          <li className="fListItem">Car rental </li>
          <li className="fListItem">Flight Finder</li>
          <li className="fListItem"><span onClick={openNewTab}>Restaurant reservations</span></li>
          <li className="fListItem">Travel Agents </li>
        </ul>
        <ul className="fList">
          <li className="fListItem">Curtomer Service</li>
          <li className="fListItem">Partner Help</li>
          <li className="fListItem">Careers</li>
          <li className="fListItem">Sustainability</li>
          <li className="fListItem">Press center</li>
          <li className="fListItem">Safety Resource Center</li>
          <li className="fListItem">Investor relations</li>
          <li className="fListItem">Terms & conditions</li>
        </ul>
      </div>
      {user ? (
      <Link to="/admin/login" style={{ textDecoration: "none" }}>
      <span className="extranet_link" onClick={logout}>
        Extranet Log-in
      </span>
    </Link>
    ) : (<Link to="/admin/login" style={{ textDecoration: "none" }}>
      <span className="extranet_link"> Extranet Log-in </span>
            </Link>)}
      <div className="fText">Copyright © 1996–2023 Booking.com™. All rights reserved.</div>
    </div>
  );
};

export default Footer;