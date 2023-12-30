import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import "./reserve.css";
import useFetch from "../components/hooks/useFetch";
import { useContext, useState, useEffect } from "react";
import { SearchContext } from "../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

const Reserve = ({ setOpen, hotelId }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { data, loading, error } = useFetch(`/hotels/room/${hotelId}`);
  const { dates } = useContext(SearchContext);
  const { user, logout } = useContext(UserContext);

  
  const getDatesInRange = (startDate, endDate) => {
    console.log("Start:",new Date(startDate));
    console.log("end:", new Date(endDate))
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((unavailableDate) => {

      const date = new Date(unavailableDate.date);

      return alldates.some((selectedDate) => {
        const currentDate = new Date(selectedDate);
  
        // Compare only the date part

        return (
          
          currentDate.getFullYear() === date.getFullYear() &&
          currentDate.getMonth() === date.getMonth() &&
          currentDate.getDate() === date.getDate()
        );
      });
    });
  
    return !isFound;
  };  
  
  

  const handleSelect = (e, roomId, roomNumber) => {
    const checked = e.target.checked;
    setSelectedRooms((prevSelectedRooms) =>
      checked
        ? [...prevSelectedRooms, { roomId, roomNumber }]
        : prevSelectedRooms.filter((item) => item.roomId !== roomId || item.roomNumber !== roomNumber)
    );
  };
  

  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map(({ roomId, roomNumber }) => {
          const res = axios.put(`/room/availability/${roomId}/${roomNumber}`, {
            dates: alldates,
            userId: user.id,
          });
          return res.data;
        })
      );
      setOpen(false);
      navigate("/");
    } catch (err) {
      // Handle errors
    }
  };
  
  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Select your rooms:</span>
        {data.map((item) => (
          <div className="rItem" key={item.id}>
            <div className="rItemInfo">
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">
                Max people: <b>{item.maxPeople}</b>
              </div>
              <div className="rPrice">{item.price}</div>
            </div>
            <div className="rSelectRooms">
            {item.roomNumbers.map((roomNumber) => (
  <div className="room" key={roomNumber.number}>
    <label>{roomNumber.number}</label>
    <input
      type="checkbox"
      value={roomNumber.id}
      onChange={(e) => handleSelect(e, item.id, roomNumber.id)}
      disabled={!isAvailable(roomNumber)}
    />
  </div>
))}

            </div>
          </div>
        ))}
        <button onClick={handleClick} className="rButton">
          Reserve Now!
        </button>
      </div>
    </div>
  );
};

export default Reserve;