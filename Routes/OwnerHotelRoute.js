import express from 'express'
import { verifyjson } from '../middleware/jwt.js';
import { createRoom, getRoomBook, getRoomEmpty } from '../Controllers/RoomController.js';
import { deleteHotelNoConfirm, getListOwner, getQuestionByOwner, getRevenueOwnerByHotels, getReviewByOwner, inforCurrentDate } from '../Controllers/OwnerHotelController.js';
const routerOwnerHotel = express.Router()
routerOwnerHotel.post('/delete', verifyjson, deleteHotelNoConfirm);
routerOwnerHotel.get('/infor/current', verifyjson, inforCurrentDate);
routerOwnerHotel.post('/review', verifyjson, getReviewByOwner);
routerOwnerHotel.post('/question', verifyjson, getQuestionByOwner);
routerOwnerHotel.post('/revenueOwner/:id', verifyjson, getRevenueOwnerByHotels);
routerOwnerHotel.get('/list', verifyjson, getListOwner)
export default routerOwnerHotel;