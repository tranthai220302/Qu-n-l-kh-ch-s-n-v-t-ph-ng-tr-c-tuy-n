import express from 'express'
import { verifyjson } from '../middleware/jwt.js';
import { createHotel, createHotelFavourite, deleteHotelFavourite, getHotelById, getHotelByOwnerNoConfirm, getHotelByQuery, getHotelsFavourite, getHotelsFavouriteByCustomer, getQueryByHotel, getService, searchHotel } from '../Controllers/HotelController.js';
const routerHotel = express.Router()
routerHotel.post('/create', verifyjson, createHotel);
routerHotel.get('/favourite', getHotelsFavourite);
routerHotel.get('/search', searchHotel)
routerHotel.get('/query', getQueryByHotel)
routerHotel.get('/searchQuery', getHotelByQuery)
routerHotel.get('/:id', getHotelById)
routerHotel.post('/create/favourite/:id', verifyjson, createHotelFavourite);
routerHotel.get('/favourite/customer', verifyjson, getHotelsFavouriteByCustomer);
routerHotel.delete('/delete/favourite/:id', verifyjson, deleteHotelFavourite)
routerHotel.get('/list/services', getService)
routerHotel.get('/list/owner/noConfirm/:id',verifyjson, getHotelByOwnerNoConfirm)
export default routerHotel;