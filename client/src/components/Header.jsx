import {
    faBed,
    faBowlFood,
    faCalendarDays,
    faCar,
    faPerson,
    faPlane,
    faTaxi,
  } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import "./header.css";
  import { DateRange } from "react-date-range";
  import { useContext, useState } from "react";
  import "react-date-range/dist/styles.css"; // main css file
  import "react-date-range/dist/theme/default.css"; // theme css file
  import { format } from "date-fns";
  import { useNavigate } from "react-router-dom";
  import { SearchContext } from "../context/SearchContext.jsx";
  import { UserContext } from "../context/userContext.jsx";
  import { Link } from "react-router-dom";
  
  const Header = ({ type }) => {
    const [destination, setDestination] = useState("");
    const [openDate, setOpenDate] = useState(false);
    const [dates, setDates] = useState([
      {
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
      },
    ]);
    const [openOptions, setOpenOptions] = useState(false);
    const [options, setOptions] = useState({
      adult: 1,
      children: 0,
      room: 1,
    });
  
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
  
  
    const handleOption = (name, operation) => {
      setOptions((prev) => {
        return {
          ...prev,
          [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
        };
      });
    };
  
    const { dispatch } = useContext(SearchContext);
  
    const handleSearch = () => {
      dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
      navigate("/hotels", { state: { destination, dates, options } });
    };
  
    const handleTabClick = (tabName) => {
      // Update the active tab when a tab is clicked
      setActiveTab(tabName);
    };

    const [activeTab, setActiveTab] = useState("Stays"); // Initialize the active tab
    return (
      <div className="header">
        <div
          className={
            type === "list" ? "headerContainer listMode" : "headerContainer"
          }
        >
          <div className="headerList">
            <div
              className={`headerListItem ${activeTab === "Stays" ? "active" : ""}`}
              onClick={() => handleTabClick("Stays")}
            >
              <FontAwesomeIcon icon={faBed} />
              <span>Stays</span>
            </div>
            <div
              className={`headerListItem ${activeTab === "Flights" ? "active" : ""}`}
              onClick={() => handleTabClick("Flights")}
            >
              <FontAwesomeIcon icon={faPlane} />
              <span>Flights</span>
            </div>
            <div
              className={`headerListItem ${activeTab === "Car Rentals" ? "active" : ""}`}
              onClick={() => handleTabClick("Car Rentals")}
            >
              <FontAwesomeIcon icon={faCar} />
              <span>Car Rentals</span>
            </div>
            <div
              className={`headerListItem ${activeTab === "Food" ? "active" : ""}`}
              onClick={() => {handleTabClick("Food")} }
            >
              <FontAwesomeIcon icon={faBowlFood} />
              <span>Food</span>
            </div>
            <div
              className={`headerListItem ${activeTab === "Airport Taxis" ? "active" : ""}`}
              onClick={() => handleTabClick("Airport Taxis")}
            >
              <FontAwesomeIcon icon={faTaxi} />
              <span>Airport Taxis</span>
            </div>
          </div>
          {type !== "list" && (
            <>
              <h1 className="headerTitle">
                A lifetime of discounts? It's Genius.
              </h1>
              <p className="headerDesc">
                Get rewarded for your travels – unlock instant savings of 10% or
                more with a free Booking account
              </p>
              {user ?(<Link to="/reserved" style={{ textDecoration: "none" }}><button className="headerBtn">Reserved Rooms</button></Link>): (<Link to="/login" style={{ textDecoration: "none" }}><button className="headerBtn">Sign in / Register</button></Link>)}
              <div className="headerSearch">
                <div className="headerSearchItem">
                  <FontAwesomeIcon icon={faBed} className="headerIcon" />
                  <input
                    type="text"
                    placeholder="Where are you going?"
                    className="headerSearchInput"
                    onChange={(e) => setDestination(e.target.value)}
                  />
                </div>
                <div className="headerSearchItem">
                  <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                  <span
                    onClick={() => setOpenDate(!openDate)}
                    className="headerSearchText"
                  >{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
                    dates[0].endDate,
                    "MM/dd/yyyy"
                  )}`}</span>
                  {openDate && (
                    <DateRange
                      editableDateInputs={true}
                      onChange={(item) => setDates([item.selection])}
                      moveRangeOnFirstSelection={false}
                      ranges={dates}
                      className="date"
                      minDate={new Date()}
                    />
                  )}
                </div>
                <div className="headerSearchItem">
                  <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                  <span
                    onClick={() => setOpenOptions(!openOptions)}
                    className="headerSearchText"
                  >{`${options.adult} adult · ${options.children} children · ${options.room} room`}</span>
                  {openOptions && (
                    <div className="options">
                      <div className="optionItem">
                        <span className="optionText">Adult</span>
                        <div className="optionCounter">
                          <button
                            disabled={options.adult <= 1}
                            className="optionCounterButton"
                            onClick={() => handleOption("adult", "d")}
                          >
                            -
                          </button>
                          <span className="optionCounterNumber">
                            {options.adult}
                          </span>
                          <button
                            className="optionCounterButton"
                            onClick={() => handleOption("adult", "i")}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="optionItem">
                        <span className="optionText">Children</span>
                        <div className="optionCounter">
                          <button
                            disabled={options.children <= 0}
                            className="optionCounterButton"
                            onClick={() => handleOption("children", "d")}
                          >
                            -
                          </button>
                          <span className="optionCounterNumber">
                            {options.children}
                          </span>
                          <button
                            className="optionCounterButton"
                            onClick={() => handleOption("children", "i")}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="optionItem">
                        <span className="optionText">Room</span>
                        <div className="optionCounter">
                          <button
                            disabled={options.room <= 1}
                            className="optionCounterButton"
                            onClick={() => handleOption("room", "d")}
                          >
                            -
                          </button>
                          <span className="optionCounterNumber">
                            {options.room}
                          </span>
                          <button
                            className="optionCounterButton"
                            onClick={() => handleOption("room", "i")}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="headerSearchItem">
                  <button className="headerBtn" onClick={handleSearch}>
                    Search
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };
  
  export default Header;