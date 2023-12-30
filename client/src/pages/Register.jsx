import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import './login.css';

export default function Register() {
  const navigate = useNavigate()
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  })
  const registerUser = async (e) =>{
    e.preventDefault()
    const{name, email ,password} =  data
    try {
      const {data} = await axios.post('/register',{
        name, email, password
      })
      if(data.error) {
        toast.error(data.error)
      } else {
        setData({})
        toast.success('Login Successful. Welcome!')
        navigate('/login')
      }
    } catch (error) {
      console.log(error)
    }
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
          type="email"
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
        <button onClick={registerUser} className="lButton">
          Register
        </button>
      </div>
      </div>
    </div>
  )
}
