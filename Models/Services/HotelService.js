import { add, format } from "date-fns";
import createError from "../../ultis/createError.js";
import db from "../Entitys/index.js"
import { createRoomServices } from "./RoomService.js";
import { Op, Sequelize } from "sequelize";
import algoliasearch from "algoliasearch";
import sendRequestByEmail from "../../ultis/senRequestByEmail.js";
export const createHotelServices = async(data, id) =>{
    try {
        console.log(data)
        const {address, service,img,lat, lng, ...res} = data
        // //thêm địa chỉ
        address.lat = lat;
        address.lng = lng
        const addressNew = await db.address.create(address);
        if(!addressNew) return createError(400, 'Thêm địa chỉ không thành công');
        res.AddressId = addressNew.id;
        const user = await db.user.findByPk(id, {
            include : [
                {
                    model : db.hotelOwner,
                }
            ]
        })
        console.log(user)
        if(!user) return createError(400, 'Không tìm thấy người dùng!')
        res.HotelOwnerId = user.HotelOwner.id;
        // //tạo khách sạn
        const hotel = await db.hotel.create(res);
        if(!hotel) return createError(400, 'Tạo khách sạn không thành công!');
        // //thêm dịch vụ
        const servicesPromises = service.map(async serviceItem =>{
            const foundService = await db.services.findByPk(serviceItem);
            if(!foundService) return createError(400, 'Không tìm thấy dịch vụ tương ứng!');
            return foundService;
        })
        const servicesNew = await Promise.all(servicesPromises);
        await hotel.addServices(servicesNew);
        // thêm ảnh
        const imagesData = img.map(image => {
            return { filename: image, HotelId: hotel.id };
        });
        await db.image.bulkCreate(imagesData);
        // thêm phòng
        // for(let i = 0; i < rooms.length; i++){
        //     const roomNew = await createRoomServices(rooms[i], hotel.id);
        //     if(!roomNew.status) return createError(400, 'Thêm phòng không thành công!')
        // }
        return {
            message : 'Thêm khách sạn thành công!',
            hotel : hotel
        }
    } catch (error) {
        return error;
    }
}
export const getHotelsFavouriteServices = async() =>{
    try {
        const hotels = await db.hotel.findAll({
            where : {
                isConfirm : 1
            },
            include : [
                {
                    model : db.address
                },
                {
                    model : db.image
                },
                {
                    model : db.room,
                    include: [
                        {
                            model: db.price,
                            attributes: ['price'],
                            order: [['price', 'ASC']],
                            limit: 1
                        },
                        {
                            model : db.item,
                            as : 'Item'
                        }
                    ]
                }

            ]
        })
        if(hotels.length == 0) return createError(400, 'Không tìm thấy khách sạn!');
        return hotels;
    } catch (error) {
        return error;
    }
}
export const searchHotelService = async(queryAddress, queryPerson, queryDate, page, bookPerPage)=>{
    try {   
        const offset = (page -1)*bookPerPage
        const hotels = await db.hotel.findAll({
            where : {
                isConfirm : 1
            },
            include: [
                {
                    model : db.favourite,
                },
                {
                    model: db.address,
                    where: queryAddress
                },
                {
                    model: db.room,
                    
                    include: [
                        {
                            model: db.price,
                            where: queryPerson,
                            include: [
                                {
                                    model: db.booking,
                                    as: 'booking',
                                    required: false,
                                    where: queryDate
                                }
                            ]
                        },
                        {
                            model : db.item,
                            as : 'Item'
                        }
                    ],
                },
                {
                    model : db.image
                }
            ],
            limit : bookPerPage,
            offset: offset,
        });
        const num = await db.hotel.findAll({
            where : {
                isConfirm : 1
            },
            include: [
                {
                    model : db.favourite
                },
                {
                    model: db.address,
                    where: queryAddress
                },
                {
                    model: db.room,
                    
                    include: [
                        {
                            model: db.price,
                            where: queryPerson,
                            include: [
                                {
                                    model: db.booking,
                                    as: 'booking',
                                    required: false,
                                    where: queryDate
                                }
                            ]
                        },
                        {
                            model : db.item,
                            as : 'Item'
                        }
                    ],
                },
                {
                    model : db.image
                }
            ],
        });
        if(hotels.length == 0) return createError(400, 'Không tìm thấy khách sạn')
        const numPage = Math.ceil(num.length/6);
        return {
            numPage,
            hotels,
            length : num.length
        }
    } catch (error) {
        return error;
    }
}
export const getQueryByHotelServices = async()=>{
    try {
        const category = await db.category.findAll();
        const services = await db.services.findAll();
        const item = await db.item.findAll();
        return {
            category,
            services, item
        }
    } catch (error) {
        return error;
    }
}
export const getHotelByQueryService = async(wherePrice,queryDate, queryAddress, queryCategory,queryServices,queryNumStart, queryItem, page, bookPerPage)=>{
    try {

        const offset = (page-1)*bookPerPage
        const hotel = await db.hotel.findAll({
            where : queryNumStart,
            include: [
                {
                    model : db.favourite
                },
                {
                    model: db.address,
                    where: queryAddress
                },
                {
                    model : db.services,
                    as : 'Services',
                    where : queryServices
                },
                {
                    model: db.room,
                    where : queryCategory,
                    include: [
                        {
                            model: db.price,
                            where: wherePrice,
                            include: [
                                {
                                    model: db.booking,
                                    as: 'booking',
                                    required: false,
                                    where: queryDate
                                }
                            ]
                        },
                        {
                            model : db.item,
                            as : 'Item',
                            where : queryItem
                        },
                        {
                            model : db.category,
                        }
                    ],
                },
                {
                    model : db.image
                }
            ],
            limit : bookPerPage,
            offset : offset
        })
        const num = await db.hotel.findAll({
            where : queryNumStart,
            include: [
                {
                    model: db.address,
                    where: queryAddress
                },
                {
                    model : db.services,
                    as : 'Services',
                    where : queryServices
                },
                {
                    model: db.room,
                    where : queryCategory,
                    include: [
                        {
                            model: db.price,
                            where: wherePrice,
                            include: [
                                {
                                    model: db.booking,
                                    as: 'booking',
                                    required: false,
                                    where: queryDate
                                }
                            ]
                        },
                        {
                            model : db.item,
                            as : 'Item'
                        },
                        {
                            model : db.category,
                        }
                    ],
                },
                {
                    model : db.image
                }
            ],
        })
        let dataMap = [];
        num.map((item)=>{
            dataMap.push({
                location : [item.Address.lng,item.Address.lat],
                address : item.name
            })
        })
        if(hotel.length === 0) return createError(400, 'Không tìm thấy khách sạn!');
        return {
            hotel,
            numPage : Math.ceil(num.length/bookPerPage),
            length : num.length,
            dataMap 
        };
    } catch (error) {
        return error;
    }
}
export const getHotelByIdServices = async(id)=>{
    try {
        const hotel = await db.hotel.findOne({
            where : {
                [Op.and] : [
                    {id},
                    {isConfirm : 1}
                ]
            },
            include: [
                {
                    model : db.hotelOwner,
                    include : [
                        {
                            model : db.user
                        }
                    ]
                },
                {
                    model: db.address,
                },
                {
                    model : db.services,
                    as : 'Services',
                },
                {
                    model: db.room,
                    include: [
                        {
                            model: db.price,
                            include: [
                                {
                                    model: db.booking,
                                    as: 'booking',
                                    required: false,
                                }
                            ]
                        },
                        {
                            model : db.item,
                            as : 'Item'
                        },
                        {
                            model : db.category,
                        }
                    ],
                },
                {
                    model : db.image
                }
            ],
        },
        )
        if(!hotel) return createError(400, 'Không tìm thấy khách sạn!');
        return hotel;
    } catch (error) {
        return error;
    }
}
export const createHotelFavouriteService = async(CustomerId, HotelId) =>{
    try {
        const user = await db.user.findOne({
            where : {
                id : CustomerId
            },
            include : [{model : db.customer}]
        })
        const favourite = await db.favourite.findOne({
            where : {
                [Op.and] : [
                    {CustomerId : user.Customer.id},
                    {HotelId}
                ]
            }
        })
        if(favourite){
            const deleteFa = await db.favourite.destroy({
                where : {
                    [Op.and] : [
                        {CustomerId : user.Customer.id},
                        {HotelId}
                    ]
                }
            })
            return {
                message : "Bỏ yêu thích thành công!"
            }
        }
        const createFavourite = await db.favourite.create({
            CustomerId : user.Customer.id,
            HotelId
        })
        if(!createFavourite) return createError(400, 'Thêm yêu thích không thành công!')
        return createFavourite;
    } catch (error) {
        return error;
    }
}
export const getHotelFavouriteByCustomerService = async (CustomerId)=>{
    try {
        const user = await db.user.findOne({
            where : {
                id : CustomerId
            },
            include : [{model : db.customer}]
        })
        const hotel = await db.favourite.findAll({
            where : {
                CustomerId : user.Customer.id
            },
            include : [
                {
                    model : db.hotel,
                    include : [
                        {
                            model : db.address
                        },
                        {
                            model : db.image
                        }
                    ]
                }
            ]
        })
        if(hotel.length == 0) return createError(400, 'Không có khách sạn được yêu thích!');
        return hotel;
    } catch (error) {
        return error;
    }
}
export const deleteHotelFavouriteService = async(CustomerId, HotelId) =>{
    try {
        const user = await db.user.findOne({
            where : {
                id : CustomerId
            },
            include : [{model : db.customer}]
        })
        const favourite = db.favourite.findOne({
            where : {
                [Op.and] : [
                    {CustomerId : user.Customer.id},
                    {HotelId}
                ]
            }
        })
        if(!favourite) return createError(400, 'Không tìm thấy khách sạn!');
        await db.favourite.destroy({
            where : {
                [Op.and] : [
                    {CustomerId : user.Customer.id},
                    {HotelId}
                ]
            }
        })
        return {
            message : 'Xoá thành công!'
        }
    } catch (error) {
        
    }
}
export const getServiceService = async()=>{
    try {
        return await db.services.findAll();
    } catch (error) {
        return error;
    }
}
export const getHotelByOwnerNoConfirmService = async(id, is) =>{
    try {
        const user = await db.user.findByPk(id, {
            include : [
                {
                    model : db.hotelOwner
                }
            ]
        })
        const hotel = await db.hotel.findAll({
            where : {
                [Op.and] : [
                    {HotelOwnerId : user.HotelOwner.id},
                    {isConfirm : is}
                ]
            },
            include : [
                {
                    model : db.address
                }
            ]
        })
        return hotel;
    } catch (error) {
        return error;
    }
}

export const getHotelByNoConfirmService = async(id)=>{
    try {
        if(id == 0){
            const hotel = await db.hotel.findAll({
                where : {
                    isConfirm : 0
                },
                include: [
                    {
                        model : db.hotelOwner,
                        include : {
                            model : db.user
                        }
                    },
                    {
                        model : db.favourite
                    },
                    {
                        model: db.address,
                    },
                    {
                        model: db.room,
                        include: [
                            {
                                model: db.price,
                                include: [
                                    {
                                        model: db.booking,
                                        as: 'booking',
                                        required: false,
                                    }
                                ]
                            },
                            {
                                model : db.item,
                                as : 'Item',
                            },
                            {
                                model : db.category,
                            },
                            {
                                model : db.image
                            }
                        ],
                    },
                    {
                        model : db.image
                    }
                ],
            })
            let data = []
            hotel.map((item)=>{
                data.push({
                    id : item.id,
                    name : item.name,
                    nameHotelOwner : item.HotelOwner.User.name,
                    address : item.Address.province,
                    payment : item.isPaymentOff ? 'active' : 'pending',
                    date : format(item.createdAt, 'dd-MM-yyy'),
                    data : item
                })
            })
            return data;
        }else{
            const hotel = await db.hotel.findAll({
                where : {
                    isConfirm : id
                },
                include: [
                    {
                        model : db.hotelOwner,
                        include : {
                            model : db.user
                        }
                    },
                    {
                        model: db.address,
                    },
                    {
                        model : db.image
                    }
                ],
            })
            let data = []
            hotel.map((item)=>{
                data.push({
                    id : item.id,
                    name : item.name,
                    nameHotelOwner : item.HotelOwner.User.name,
                    address : item.Address.province,
                    payment : item.isPaymentOff ? 'active' : 'pending',
                })
            })
            return data;
        }
    } catch (error) {
        
    }
}
export const confirmHotelService = async(id) =>{
    try {
        await db.hotel.update({
            isConfirm : 1
        },{
            where : {
                id : {
                    [Op.in] : id
                }
            }
        })
        return{
            message : 'Xác nhận thành công!'
        }
    } catch (error) {
        return error;
    }
}
export const cancelConfirmHotelService = async(id) => {
    try {
        await db.hotel.update({
            isConfirm : 2
        },{
            where : {
                id : {
                    [Op.in] : id
                }
            }
        })
        await sendRequestByEmail()
        return{
            message : 'Từ chối thành công!'
        }
    } catch (error) {
        return error;
    }
}
export const deleteHotelService = async(id) =>{
    try {
        await db.hotel.destroy({
            where : {
                id : {
                    [Op.in] : id
                }
            }
        })
        return {message : 'Xoá thành công!'}
    } catch (error) {
        return error;
    }
}
export const noActiviHotelService = async(id, is)=>{
    try {
        await db.hotel.update({
            isConfirm : is
        },{
            where : {
                id : {
                    [Op.in] : id
                }
            }
        })
        return {message : 'Xác nhận thành công!'}
    } catch (error) {
        return error;
    }
}