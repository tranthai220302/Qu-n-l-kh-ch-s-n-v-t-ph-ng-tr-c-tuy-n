
import { createCategoryItemServices, createItemByCategoryService, deleteCategoryItemServices, deleteItemServices, getItemByCategoryService } from "../Models/Services/ItemService.js";
import createError from "../ultis/createError.js";

export const getItemByCategory = async(req, res, next) =>{
    try {
        const item = await getItemByCategoryService();
        if(item instanceof Error) return next(item);
        res.status(200).send(item)
    } catch (error) {
        next(error);
    }
}
export const createItemByCategory = async(req, res, next) =>{
    try {
        if(req.idRole !== 3) return next(createError(400, 'Bạn không có quyền này!'))
        const items = await createItemByCategoryService(req.body.data, req.params.id);
        if(items instanceof Error) return next(items)
        res.status(200).send(items)
    } catch (error) {
        next(error);
    }
}
export const deleteItem = async(req, res, next) =>{
    try {
        if(req.idRole !== 3) return next(createError(400, 'Bạn không có quyền này!'))
        const item = await deleteItemServices(req.body.id);
        if(item instanceof Error) return next(item);
        res.status(200).send(item)
    } catch (error) {
        next(error);
    }
}
export const deleteCategoryItem = async(req, res, next) =>{
    try {
        if(req.idRole !== 3) return next(createError(400, 'Bạn không có quyền này!'))
        const item = await deleteCategoryItemServices(req.body.id);
        if(item instanceof Error) return next(item);
        res.status(200).send(item)
    } catch (error) {
        next(error);
    }
}
export const createCategoryItem = async(req, res, next) =>{
    try {
        if(req.idRole !== 3) return next(createError(400, 'Bạn không có quyền này!'))
        const categoryItem = await createCategoryItemServices(req.body.name);
        if(categoryItem instanceof Error) return next(categoryItem);
        res.status(200).send(categoryItem)
    } catch (error) {
        next(error);
    }
}