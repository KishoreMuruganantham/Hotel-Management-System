import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import useFetch from '../components/hooks/useFetch';
import { UserContext } from '../context/userContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './reserved.css';
import { SearchContext } from '../context/SearchContext';
import axios from 'axios';
import toast from 'react-hot-toast';


export default function Reserved() {
    const [dates, setDates] = useState([
      {
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
      },
    ]);
    const [options, setOptions] = useState({
      adult: 1,
      children: 0,
      room: 1,
    });
  
    const navigate = useNavigate();
    const { dispatch } = useContext(SearchContext);
  const id = location.pathname.split("/")[2];
  const { user } = useContext(UserContext);
  const { data, loading, error, reFetch } = useFetch(`/reserved/${user?.id}`);

  const [selectedHotelId, setSelectedHotelId] = useState(null);
  const [selectedRoomNumber, setSelectedRoomNumber] = useState(null);
  const [selectedRoomId, setSelectedRoomId] = useState(null);

  const handleHotelClick = (hotelId) => {
    setSelectedHotelId(selectedHotelId === hotelId ? null : hotelId);
    setSelectedRoomId(null); // Reset selected room title when changing hotels
    setSelectedRoomNumber(null); // Reset selected room number when changing hotels
  };

  const handleRoomIdClick = (roomId) => {
    setSelectedRoomId(selectedRoomId === roomId ? null : roomId);
    setSelectedRoomNumber(null); // Reset selected room number when changing rooms
  };

  const handleRoomNumberClick = (roomNumberId) => {
    setSelectedRoomNumber(selectedRoomNumber === roomNumberId ? null : roomNumberId);
  };
  
  const groupedData = Array.isArray(data) ? data.reduce((acc, item) => {
    const hotelId = item.hotel_id;
    const roomId = item.rooms_id;
    const roomTitle = item.rooms_title;
    const roomNumberId = item.roomNumbers_id;
    const roomNumber = item.rooms_number; // Use rooms_number instead of roomNumbers_id
  
    if (!acc[hotelId]) {
      acc[hotelId] = {
        hotel_title: item.hotel_title,
        hotel_type: item.hotel_type,
        image: item.hotel_photos[0],
        hotel_city: item.hotel_city,
        hotel_address: item.hotel_address,
        hotels_desc: item.hotels_desc,
        hotels_rating: item.hotels_rating,
        rooms: [],
      };
    }
  
    const hotel = acc[hotelId];
  
    if (!hotel.rooms.find((r) => r.rooms_id === roomId)) {
      hotel.rooms.push({
        rooms_id: roomId,
        rooms_title: roomTitle,
        rooms_price: item.rooms_price,
        rooms_description: item.rooms_description,
        rooms_maxpeople: item.rooms_maxpeople,
        roomNumbers: [], // No need for this array
      });
    }
  
    const room = hotel.rooms.find((r) => r.rooms_id === roomId);
  
    if (!room.roomNumbers.includes(roomNumber)) {
      room.roomNumbers.push(roomNumber);
    }
  
    return acc;
  }, {}) : {};


  const handleSearch = (city) => {
    console.log(city);
    
    dispatch({ type: "NEW_SEARCH", payload: { destination: city, dates, options } });
    navigate("/hotels", { state: { destination: city, dates, options } });
  };
  

  const handleDelete = async (unavailId) => {
    try {
      const { data } = await axios.post('/delreserve', {
        unavailId,
      });
  
      if (data.error) {
        toast.error(data.error);
      } else {
        // Assuming setData is a function to update your state
        reFetch();
        // You might want to update your state based on the deletion instead of a full page reload
  
        // Optionally, provide some feedback to the user that the deletion was successful
        toast.success('Reservation canceled successfully');
      }
    } catch (error) {
      // Handle or log the error
      console.error('Error deleting reservation:', error);
      // Optionally, provide feedback to the user about the error
      toast.error('An error occurred while canceling the reservation');
    }
  };
  


  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="reserved">
        {Object.values(groupedData).map((hotel, hotelIndex) => (
          <div key={hotelIndex} className={`hotel-container ${selectedHotelId === hotelIndex ? 'selected-hotel' : ''}`}>
            <div className="hotel-header" onClick={() => handleHotelClick(hotelIndex)}>
              <div className="hotel-image">
                <img src={hotel.image} alt={`Image for ${hotel.hotel_title}`} />
              </div>
              <div className="hotel-info">
                <h3>{hotel.hotel_title}</h3>
                <p>Type: {hotel.hotel_type}</p>
                <p>City: {hotel.hotel_city}</p>
                <p>Address: {hotel.hotel_address}</p>
                <p>Description: {hotel.hotels_desc}</p>
                <div className="rating">
                  <span>Rating:</span>
                  {[...Array(Math.round(hotel.hotels_rating))].map((_, index) => (
                    <span key={index}>⭐</span>
                  ))}
                </div>
                <div className="headerSearchItem">
                <button className="headerBtn" onClick={() => handleSearch(hotel.hotel_city)}>
                    Book Extra
                  </button>
                </div>
              </div>
            </div>
            {selectedHotelId === hotelIndex && (
              <>
                {hotel.rooms.map((room, roomIndex) => (
                  <div key={roomIndex} className={`room-container ${selectedRoomId === room.rooms_id ? 'selected-room' : ''}`}>
                    <h4 onClick={() => handleRoomIdClick(room.rooms_id)}>{room.rooms_title}</h4>
                    {selectedRoomId === room.rooms_id && (
                      <>
                        <p>Price: ₹{room.rooms_price}</p>
                        <p>Description: {room.rooms_description}</p>
                        <p>
                          Max People: {[...Array(room.rooms_maxpeople)].map((_, index) => (
                            <span key={index}>🛏️</span>
                          ))}
                        </p>
                        <div className="room-numbers-container">
                          {room.roomNumbers.map((roomNumberId, numberIndex) => (
                            <button
                              key={numberIndex}
                              className={`room-number ${selectedRoomNumber === roomNumberId ? 'selected-room' : ''}`}
                              onClick={() => handleRoomNumberClick(roomNumberId)}
                            >
                              {roomNumberId}
                            </button>
                          ))}
                        </div>
                        {selectedRoomNumber === null ? null : (
                          <div className="booked-dates">
                            <h4>Booked Dates for room {selectedRoomNumber}</h4>
                            <div className="timeline">
                              {data
                                .filter((item) => item.rooms_number === selectedRoomNumber && selectedRoomId === item.rooms_id)
                                .map((date, dateIndex) => (
                                  <div key={dateIndex} className="timeline-item">
                                    <span>📅</span>
                                    <p>
                                      {new Date(new Date(date.booked_date).setDate(new Date(date.booked_date).getDate() + 0.5))
                                        .toLocaleString('en-US', {
                                          year: 'numeric',
                                          month: 'long',
                                          day: 'numeric',
                                          timeZone: 'Asia/Kolkata',
                                        })}
                                    </p>
                                    <span><button className="cancel-btn" onClick={() => handleDelete(date.unavailableDates_id)}>
                                    Cancel
                  </button></span>
                                  </div>
                                ))}
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}