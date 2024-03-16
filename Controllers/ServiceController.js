import { createServiceServices, deleteServiceServices, getServiceServices } from "../Models/Services/ServiceService.js";
import createError from "../ultis/createError.js";

export const getServiceController = async(req, res, next) =>{
    try {
        const service = await getServiceServices();
        res.status(200).send(service)
    } catch (error) {
        next(error);
    }
}
export const createService = async(req, res, next) =>{
    try {
        if(req.idRole !== 3) return next(createError(400, 'Bạn không có quyền này!'))
        const service = await createServiceServices(req.body.data);
        if(service instanceof Error) return next(service)
        res.status(200).send(service)
    } catch (error) {
        next(error);
    }
}
export const deleteService = async(req, res, next) =>{
    try {
        if(req.idRole !== 3) return next(createError(400, 'Bạn không có quyền này!'))
        const service = await deleteServiceServices(req.body.id);
        res.status(200).send(service)
    } catch (error) {
        next(error);
    }
}