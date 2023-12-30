import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import axios from 'axios';
import { Toaster } from 'react-hot-toast'
import Dashboard from '../src/pages/Dashboard.jsx';
import { UserContext, UserContextProvider } from './context/userContext.jsx';
import Hotel from "./pages/Hotels.jsx";
import List from "./pages/List.jsx";
import AdminRegister from "./pages/AdminRegister.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminHome from "./pages/AdminHome.jsx";
import AdminList from "./pages/AdminList.jsx";
import { userColumns, hotelColumns, roomColumns } from "./datatablesource.jsx";
import AdminNewRoom from "./pages/AdminNewRoom.jsx";
import AdminNewHotel from "./pages/AdminNewHotel.jsx";
import { userInputs} from "./formSource.jsx";
import Reserved from "./pages/Reserved.jsx";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AdminViewHotel from "./pages/AdminViewHotel.jsx";
import AdminListRooms from "./pages/AdminListRooms.jsx";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true

function App() {
  return (
    <>
    <Toaster position ='bottom-right' toastOptions={{duration: 2000}} />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/hotels" element={<List/>}/>
        <Route path="/hotels/:id" element={<Hotel/>}/>
        <Route path="/reserved" element={<Reserved/>}/>
          <Route path="/admin/">
          <Route path="register" element={<AdminRegister />} />
            <Route
              index
              element={
                <AdminHome />
              }
            />
          <Route path="login" element={<AdminLogin />} />
            <Route
              index
              element={
                <AdminHome />
              }
            />
            <Route path="hotels">
              <Route
                index
                element={
                    <AdminList columns={hotelColumns} />
                }
              />
              <Route path=":id">
              <Route
              index
                element={
                    <AdminViewHotel />
                }
              />
              <Route path="rooms">
               <Route index element={
                  <AdminListRooms columns={roomColumns} />
                }
              />
             <Route
                path="new"
                element={
                    <AdminNewRoom />
                }
              />
              </Route>
               </Route>
              <Route
                path="new"
                element={
                    <AdminNewHotel  />
                }
              />
           
            </Route>
          </Route>
      </Routes>
    </BrowserRouter>
    </>
    
  );
}

export default App;
