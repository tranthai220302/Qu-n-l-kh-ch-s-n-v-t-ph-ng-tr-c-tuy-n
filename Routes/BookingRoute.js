import express from 'express'
import { verifyjson } from '../middleware/jwt.js';
import { createBooking, getBookingById, paymentBooking, revenue, revenueHotel } from '../Controllers/BookingController.js';
const routerBooking = express.Router()

routerBooking.post('/create/:id', verifyjson, createBooking);
routerBooking.post('/payment/:id',verifyjson, paymentBooking)
routerBooking.get('/:id', getBookingById)
routerBooking.post('/revenue', verifyjson, revenue)
routerBooking.post('/revenueHotel/:id', verifyjson, revenueHotel)
export default routerBooking;