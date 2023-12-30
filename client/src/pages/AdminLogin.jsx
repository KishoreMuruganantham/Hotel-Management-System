import {useState} from 'react';
import axios from 'axios';
import {toast} from 'react-hot-toast';
import {Link,useNavigate} from 'react-router-dom';
import "./login.css"

export default function AdminLogin() {
  const navigate = useNavigate()
  const [data, setData] = useState({
    email: '',
    password: '',
  })

  const loginUser = async (e) => {
    e.preventDefault()
    const {email, password} = data
    try {
      const {data} = await axios.post('/admin/login', {
        email,
        password
      });
      if(data.error) {
        toast.error(data.error)
      } else {
        setData({});
        navigate('/admin')
        window.location.reload();
      }
    } catch (error) {

    }
  }
  const registerUser = () => {
        setData({});
        navigate('/admin/register')
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
        <button onClick={loginUser} className="lButton">
          Login
        </button>
        <button onClick={registerUser} className="lButton">
          Register 
        </button>
      </div>
      </div>
    </div>
  );
};
