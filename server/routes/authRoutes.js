const express = require('express');
const router = express.Router();
const cors = require('cors');
const { test,
    registerUser,
    loginUser,
    getProfile,
    logout,
    countByCity,
      countByType,
      createHotel,
      deleteHotel,
      getHotel,
      getHotelRooms,
      getHotels,
      updateHotel,
      createRoom,
    deleteRoom,
    getRoom,
    updateRoom,
    updateRoomAvailability, 
    adminLogin,
  adminRegister, 
  reserved,
delReserved,
getRoomByHotel} = require('../controllers/authController')
    const { verifyAdmin } = require('../utils/verifyToken');

//middleware
router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173'
    })
)

router.get('/', test)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/profile', getProfile)
router.get('/logout', logout)
router.post('/hotels/new', createHotel);
  
  // UPDATE
  router.put('/hotels/:id', verifyAdmin, updateHotel);
  
  // DELETE
  router.delete('/hotels/:id', deleteHotel);
  
  // GET
  router.get('/hotels/find/:id', getHotel);
  
  // GET ALL
  router.get('/hotels/', getHotels);
  router.get('/hotels/countByCity', countByCity);
  router.get('/hotels/countByType', countByType);
  router.get('/hotels/room/:id', getHotelRooms);
  router.post("/room/:hotelid", createRoom);

//UPDATE
router.put("/room/availability/:id/:roomNumber", updateRoomAvailability);
router.put("/room/:id", verifyAdmin, updateRoom);
//DELETE
router.delete("/room/:id", deleteRoom);
//GET

router.get("/room/:id", getRoom);
//GET ALL

router.post("/admin/login", adminLogin);
router.post("/admin/register", adminRegister);
router.get('/reserved/:id', reserved);
router.post('/delreserve', delReserved);
router.get('/room/:id/:hotelid', getRoomByHotel)
module.exports = router