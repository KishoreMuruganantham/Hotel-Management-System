import "./adminnewRoom.scss";
import AdminNavbar from "../components/AdminNavbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { roomInputs } from "../formSource";
import useFetch from "../components/hooks/useFetch";
import axios from "axios";
import toast from "react-hot-toast";

const AdminNewRoom = () => {
  const [info, setInfo] = useState({});
  const id = location.pathname.split("/")[3];
  const [rooms, setRooms] = useState([]);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const roomNumbers = rooms.split(",").map((room) => ({ number: room }));
    try {
      await axios.post(`/room/${id}`, { ...info, roomNumbers });
      toast.success("Rooms added successfully.");
    } catch (err) {
      console.log(err);
      toast.error('An error occurred while adding the Rooms');
    }
  };

  console.log(info)
  return (
    <div className="adminnew">
      <div className="newContainer">
        <AdminNavbar />
        <div className="top">
          <h1>Add New Room</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              {roomInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleChange}
                  />
                </div>
              ))}
              <div className="formInput">
                <label>Rooms</label>
                <textarea
                  onChange={(e) => setRooms(e.target.value)}
                  placeholder="give comma between room numbers."
                />
              </div>
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNewRoom;
