import { getLocationPopularService, searchAdressHotelService } from "../Models/Services/AddressService.js";
import { deleteHotelNoConfirmService, getQuestionOwnerService, getReviewByOwnerService, inforCurrentDateService } from "../Models/Services/HotelOwnerService.js";
import createError from "../ultis/createError.js";

export const deleteHotelNoConfirm = async(req, res, next) =>{
    try {
        if(req.idRole !== 2 && req.idRole !== 3) return next(createError(400, 'Bạn không có quyền này!'))
        console.log(req.body)
        const message = await deleteHotelNoConfirmService(req.body.id);
        if(message instanceof Error) return next(message);
        return res.status(200).send(message)
    } catch (error) {
        next(error);
    }
}
export const inforCurrentDate = async(req, res, next) =>{
    try {
        if(req.idRole !== 2 && req.idRole !== 3) return next(createError(400, 'Bạn không có quyền này!'))
        const message = await inforCurrentDateService(req.id);
        if(message instanceof Error) return next(message);
        return res.status(200).send(message)
    } catch (error) {
        next(error);
    }
}
export const getReviewByOwner = async(req, res, next) =>{
    try {
        if(req.idRole !== 2 && req.idRole !== 3) return next(createError(400, 'Bạn không có quyền này!'))
        const message = await getReviewByOwnerService(req.id, req.body.dateStart, req.body.dateEnd);
        if(message instanceof Error) return next(message);
        res.status(200).send(message)
    } catch (error) {
        next(error);
    }
}
export const getQuestionByOwner = async(req, res, next) =>{
    try {
        if(req.idRole !== 2 && req.idRole !== 3) return next(createError(400, 'Bạn không có quyền này!'))
        const message = await getQuestionOwnerService(req.id, req.body.dateStart, req.body.dateEnd);
        if(message instanceof Error) return next(message);
        res.status(200).send(message)
    } catch (error) {
        next(error);
    }
}
