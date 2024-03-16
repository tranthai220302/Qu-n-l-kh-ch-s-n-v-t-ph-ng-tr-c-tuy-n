import express from 'express'
import { verifyjson } from '../middleware/jwt.js';
import { createCategoryItem, createItemByCategory, deleteCategoryItem, deleteItem, getItemByCategory } from '../Controllers/ItemController.js';
const routerItem = express.Router()

routerItem.post('/create/:id', verifyjson, createItemByCategory)
routerItem.get('/', verifyjson, getItemByCategory)
routerItem.post('/delete', verifyjson, deleteItem)
routerItem.post('/categoryItem/create', verifyjson, createCategoryItem)
routerItem.post('/categoryItem/delete', verifyjson, deleteCategoryItem)
export default routerItem;