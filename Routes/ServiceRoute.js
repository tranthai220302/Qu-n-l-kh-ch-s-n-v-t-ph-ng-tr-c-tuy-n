import express from 'express'
import { verifyjson } from '../middleware/jwt.js';
import { changPass, deleteUser, get5HotelRevenueHigh, getCustomer, getInforAdmin, getUserById, revenueAdmin, revenueCurrentDate, updateUser } from '../Controllers/UserController.js';
import { createService, deleteService, getServiceController } from '../Controllers/ServiceController.js';
const routerService = express.Router()

routerService.post('/create', verifyjson, createService)
routerService.get('/', verifyjson, getServiceController)
routerService.post('/delete', verifyjson, deleteService)
export default routerService;