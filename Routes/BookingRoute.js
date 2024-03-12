import express from 'express'
import { verifyjson } from '../middleware/jwt.js';
import { createBooking, getBookingById, paymentBooking, revenue } from '../Controllers/BookingController.js';
const routerBooking = express.Router()

routerBooking.post('/create/:id', verifyjson, createBooking);
routerBooking.post('/payment/:id',verifyjson, paymentBooking)
routerBooking.get('/:id', getBookingById)
routerBooking.post('/revenue', verifyjson, revenue)
export default routerBooking;