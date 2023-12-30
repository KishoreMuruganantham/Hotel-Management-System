import {useState} from 'react';
import axios from 'axios';
import {toast} from 'react-hot-toast';
import {Link,useNavigate} from 'react-router-dom';
import "./login.css"

export default function AdminRegister() {
  const navigate = useNavigate()
  const [data, setData] = useState({
    name : '',
    email: '',
    password: '',
  })

  const registerAdmin = async (e) => {
    e.preventDefault()
    const {name, email, password} = data
    try {
      const {data} = await axios.post('/admin/register', {
        name,
        email,
        password
      });
      if(data.error) {
        toast.error(data.error)
      } else {
        setData({});
        navigate('/admin')
      }
    } catch (error) {

    }
  }

  const loginAdmin = () => {
    setData({});
    navigate('/admin');
  }

  return (
    <div>
    {/* TopBar Component */}
    <div className="topbar">
    <a href="/" className="booking">Booking</a>
    </div>
    <div className="login">
      <div className="lContainer">
      <input
          type="text"
          placeholder="Name"
          id="name"
          onChange={(e) => setData({...data, name: e.target.value})}
          className="lInput"
        />
        <input
          type="text"
          placeholder="Email"
          id="username"
          onChange={(e) => setData({...data, email: e.target.value})}
          className="lInput"
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          onChange={(e) => setData({...data, password: e.target.value})}
          className="lInput"
        />
        <button onClick={registerAdmin} className="lButton">
          Register
        </button>
        <button onClick={loginAdmin} className="lButton">
          Login
        </button>
      </div>
      </div>
    </div>
  );
};
