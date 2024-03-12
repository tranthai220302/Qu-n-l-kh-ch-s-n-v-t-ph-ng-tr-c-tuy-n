import { Op } from "sequelize";
import { createHotelFavouriteService, createHotelServices, deleteHotelFavouriteService, getHotelByIdServices, getHotelByOwnerNoConfirmService, getHotelByQueryService, getHotelFavouriteByCustomerService, getHotelsFavouriteServices, getQueryByHotelServices, getServiceService, searchHotelService } from "../Models/Services/HotelService.js";
import createError from "../ultis/createError.js"

export const createHotel = async (req, res, next) =>{
    try {
        if(req.idRole !== 3 && req.idRole !== 2) return next(createError(400, 'Bạn không có quyền này!'));
        const data = req.body;
        const hotel = await createHotelServices(data, req.id);
        if(hotel instanceof Error) return next(hotel);
        return res.status(200).send(hotel)
    } catch (error) {
        next(error)
    }
}
export const getHotelsFavourite = async(req, res, next) =>{
    try {
        const hotels = await getHotelsFavouriteServices();
        if(hotels instanceof Error) return next(hotels);
        return res.status(200).send(hotels)
    } catch (error) {
        next(error)
    }
}
export const searchHotel = async(req, res, next) =>{
    try {
        const queryAddress = {
            ...(req.query.address && {province : {
                [Op.like] : `%${req.query.address}%`
            }})
        }
        const queryPerson = {
            ...(req.query.audult && req.query.children && {
                numberPerson : parseInt(req.query.audult) + parseInt(req.query.children)
            })
        }
        const queryDate = {
            ...(req.query.dateStart && req.query.dateEnd && {
                [Op.or] : [
                    {id : null},
                    {
                        [Op.or] : [
                            {
                                dateCheckOut : {
                                    [Op.lt] : req.query.dateStart
                                }
                            },
                            {
                                dateCheckIn : {
                                    [Op.gt] : req.query.dateEnd
                                }
                            }
                        ]
                    }
                ]
            })
        }
        const hotels = await searchHotelService(queryAddress, queryPerson, queryDate, req.query.page, 6);
        if(hotels instanceof Error) return next(hotels);
        return res.status(200).send(hotels)
    } catch (error) {
        next(error)
    }
}
export const getQueryByHotel = async(req, res, next) =>{
    try {
        const data = await getQueryByHotelServices();
        return res.status(200).send(data)
    } catch (error) {   
        next(error)
    }
}
export const getHotelByQuery = async(req, res, next) =>{
    try {
        const data = req.query
        const queryAddress = {
            ...(req.query.address && {province : {
                [Op.like] : `%${req.query.address}%`
            }})
        }
        const wherePrice = {
            [Op.and] : [
                {
                    ...(data.priceMin && data.priceMax && {
                        price : {
                            [Op.and] : [
                                {
                                    [Op.gte] : data.priceMin
                                },
                                {
                                    [Op.lte] : data.priceMax
                                }
                            ]
                        },
                    }),
                },
                {
                    ...(data.audult && data.children&& {
                        numberPerson : parseInt(data.audult) + parseInt(data.children)
                    })
                }
            ]
        }
        const queryDate = {
            ...(data.dateStart && data.dateEnd && {
                [Op.or] : [
                    {id : null},
                    {
                        [Op.or] : [
                            {
                                dateCheckOut : {
                                    [Op.lt] : data.dateStart
                                }
                            },
                            {
                                dateCheckIn : {
                                    [Op.gt] : data.dateEnd
                                }
                            }
                        ]
                    }
                ]
            })
        }
        const queryCategory = {
            ...(data.category && data.category.split(',').length > 0 && {
                CategoryId : data.category.split(',')
            })
        }
        const queryServices = {
            ...(data.services && data.services.split(',').length > 0 && {
                id : data.services.split(',')
            })
        }
        const queryNumStart = {
            [Op.and] : [
                {
                    ...(data.stars && data.stars.split(',').length > 0 && {
                        numStars : data.stars.split(',')
                    }),
                },
                {
                    ...(data.isBreakFast && data.isBreakFast.split(',').length > 0 && {
                        isBreakFast : data.isBreakFast.split(',')
                    }),
                },
                {
                    ...(data.payment && data.payment.split(',').length > 0 && {
                        isPaymentOff : data.payment.split(',')
                    })
                }
            ]
        }
        const queryItem = {
            ...(data.item && data.item.split(',').length > 0 && {
                id : data.item.split(',')
            })
        }
        const hotel = await getHotelByQueryService(wherePrice, queryDate, queryAddress,queryCategory,queryServices,queryNumStart, queryItem, req.query.page, 6)
        if(hotel instanceof Error) return next(hotel);
        return res.status(200).send(hotel);
    } catch (error) {
        next(error)
    }
}
export const getHotelById = async(req, res, next) =>{
    try {
        const hotel = await getHotelByIdServices(req.params.id)
        if(hotel instanceof Error) return next(hotel);
        return res.status(200).send(hotel)
    } catch (error) {
        next(error)
    }
}
export const createHotelFavourite = async(req, res, next) =>{
    try {
        const favourite = await createHotelFavouriteService(req.id, req.params.id)
        if(favourite instanceof Error) return next(favourite);
        return res.status(200).send(favourite)
    } catch (error) {
        next(error)
    }
}
export const getHotelsFavouriteByCustomer = async(req, res, next) =>{
    try {
        const hotel = await getHotelFavouriteByCustomerService(req.id)
        if(hotel instanceof Error) return next(hotel);
        return res.status(200).send(hotel)
    } catch (error) {
        next(error)
    }
}
export const deleteHotelFavourite = async(req, res, next) =>{
    try {
        const hotel = await deleteHotelFavouriteService(req.id, req.params.id);
        if(hotel instanceof Error) return next(hotel);
        return res.status(200).send(hotel)
    } catch (error) {
        next(error)
    }
}
export const getService = async(req, res, next) =>{
    try {
        const services = await getServiceService();
        if(services instanceof Error) return next(services);
        res.status(200).send(services);
    } catch (error) {
        next(error)
    }
}
export const getHotelByOwnerNoConfirm = async(req, res, next) =>{
    try {
        if(req.idRole !== 2) return createError(400, 'Bạn không có quyền này!')
        const hotel = await getHotelByOwnerNoConfirmService(req.id, req.params.id);
        if(hotel instanceof Error) return next(hotel);
        res.status(200).send(hotel)
    } catch (error) {
        next(error);
    }
}