import React from 'react'
import AdminNavbar from '../components/AdminNavbar'
import "./hotels.css";
import Header from "../components/Header";
import MailList from "../components/MailList";
import Footer from "../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import useFetch from "../components/hooks/useFetch";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../context/SearchContext";
import { UserContext } from "../context/userContext";
import Reserve from "../components/Reserve";

export default function AdminViewHotel() {
    const location = useLocation();
    const id = location.pathname.split("/")[3];
    const [slideNumber, setSlideNumber] = useState(0);
    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
  
    const { data, loading, error } = useFetch(`/hotels/find/${id}`);
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
  
    const handleOpen = (i) => {
      setSlideNumber(i);
      setOpen(true);
    };
  
    const handleMove = (direction) => {
      let newSlideNumber;
  
      if (direction === "l") {
        newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
      } else {
        newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
      }
  
      setSlideNumber(newSlideNumber);
    };
  
    const handleClick = () => {
        navigate("rooms");
    };
    return (
      <div>
        <AdminNavbar />
          {!(data && data.length > 0 )? (
            "loading"
          ) : (
            <div className="hotelContainer">
  
              <div className="hotelWrapper">
                <h1 className="hotelTitle">{data[0].name}</h1>
                <div className="hotelAddress">
                  <FontAwesomeIcon icon={faLocationDot} />
                  <span>{data[0].address}</span>
                </div>
                <span className="hotelDistance">
                  Excellent location – {data[0].distance} from center
                </span>
                <span className="hotelPriceHighlight">
                  Book a stay over ₹{data[0].cheapestPrice} at this property and get a
                  free airport taxi
                </span>
                <div className="hotelImages">
    {data[0].photos.map((photo, i) => (
      <div className="hotelImgWrapper" key={i}>
        <div className="image-container">
        <img
          onClick={() => handleOpen(i)}
          src={photo}
          alt={`Hotel Image ${i}`}
          className="image"
        />
        </div>
      </div>
    ))}
  </div>
  
  
                <div className="hotelDetails">
                  <div className="hotelDetailsTexts">
                    <h1 className="hotelTitle">{data[0].title}</h1>
                    <p className="hotelDesc">{data[0].desc}</p>
                  </div>
                  <div className="hotelDetailsPrice">
                <h1>Perfect for a 0-night stay!</h1> 
                    <span>
                      Located in the real heart of {data[0].city}, this property has an
                      excellent location score of {data[0].rating}!
                    </span>
                    <h2>
                      <b>₹{data[0].cheapestPrice}</b>
                    </h2>
                    <button onClick={handleClick}>Add/Edit Rooms</button>
                  </div>
                </div>
              </div>
            </div>        
        )}
        {openModal && <Reserve setOpen={setOpenModal} hotelId={id}/>}
      </div>
    );
  };
