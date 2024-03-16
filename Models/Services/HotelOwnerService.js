import stripe from "stripe";
import createError from "../../ultis/createError.js";
import db from "../Entitys/index.js";
import { Op } from "sequelize";
export const deleteHotelNoConfirmService = async(id) =>{
    try {
        await db.hotel.destroy({
            where : {
                id : {
                    [Op.in] : id
                }
            }
        })
        return {
            messgae : "Đã xoá thành công!"
        }
    } catch (error) {
        return(error);
    }
}
export const inforCurrentDateService = async(id) =>{
    try {
        const user = await db.user.findByPk(id, {
            include : [
                {
                    model : db.hotelOwner
                }
            ]
        })
        if(!user) return createError(400, 'Không tìm thấy người dùng!')
        const today = new Date();
        const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
        const booking = await db.booking.findAll(
            {
                where: {
                    createdAt: {
                    [Op.between]: [startOfDay, endOfDay]
                    }
                },
                include : [
                    {
                        model : db.hotel,
                        where : {HotelOwnerId : user.HotelOwner.id}
                    },
                    {
                        model : db.price,
                        as : 'price'
                    }
                ]
            },
        )
        let numRoom = 0;
        let numPerson = 0;
        let numPersonOut = 0;
        booking.map((bookingItem)=>{
            bookingItem.price.map((room)=>{
                numRoom += room.BookingPriceRoom.numRoom,
                numPerson += room.numberPerson
            })
        })
        const review = await db.review.findAll({
            where: {
                createdAt: {
                [Op.between]: [startOfDay, endOfDay]
                }
            },
            include : [
                {
                    model : db.price,
                    include : [
                        {
                            model : db.room,
                            include : [
                                {
                                    model : db.hotel,
                                    where : {
                                        HotelOwnerId : user.HotelOwner.id
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        })
        review.filter(item => item.PriceRoom.Room.Hotel.HotelOwner == user.HotelOwner.id)
        return {
            numRoom,
            numPerson,
            numPersonOut,
            numReview : review.length,
            numCancel : 0
        };
    } catch (error) {
        return error;
    }
}
export const getReviewByOwnerService = async(id, dateStart, dateEnd)=>{
    try {
        const user = await db.user.findByPk(id, {
            include : [
                {
                    model : db.hotelOwner
                }
            ]
        })
        const review = await db.review.findAll({
            where : {
                createdAt : {
                    [Op.between] : [
                        `${dateStart} 00:00:00`,
                        `${dateEnd} 23:59:59`
                    ]
                }
            },
            include : [
                {
                    model : db.price,
                    attributes : ['id'],
                    where : {
                        id : {
                            [Op.not] : null
                        }
                    },
                    include : [
                        {
                            model : db.room,
                            where : {
                                id : {
                                    [Op.not] : null
                                }
                            },
                            attributes : ['name'],
                            include : {
                                model : db.hotel,

                                where : {HotelOwnerId : user.HotelOwner.id}
                            }
                        }
                    ]
                },
                {
                    model : db.rating,
                    include : [
                        {
                            model : db.categoryRating,
                            attributes : ['name']
                        }
                    ]
                },
                {
                    model : db.customer,
                    attributes : ['id'],
                    include : [
                        {
                            model : db.user,
                            attributes : ['name', 'avatar']
                        }
                    ]
                },
            ]
        })
        if(review.length == 0) return createError(400, 'Không có đánh giá!')
        return review;
    } catch (error) {
        return error;
    }
}
export const getQuestionOwnerService = async(id,dateStart, dateEnd)=>{
    try {
        const user = await db.user.findByPk(id, {
            include : [
                {
                    model : db.hotelOwner
                }
            ]
        })
        const question = await db.question.findAll({
            where : {
                createdAt : {
                    [Op.between] : [
                        `${dateStart} 00:00:00`,
                        `${dateEnd} 23:59:59`
                    ]
                }
            },
            include : [
                {
                    model : db.customer,
                    include : {model : db.user}
                },
                {
                    model : db.hotel,
                    where : {
                        HotelOwnerId : user.HotelOwner.id
                    }
                },
                {
                    model : db.feedBack,
                    require : false
                }
            ]
        })
        let q = []
        question.map((item)=>{
            if(item.FeedBack === null){
                q.push(item)
            }
        })
        if(q.length == 0) return createError(400, 'Không có câu hỏi!');
        return q;
    } catch (error) {
        return error;
    }
}
export const getlistOwnerService = async()=>{
    try {
        const user = await db.hotelOwner.findAll({
            include : [
                {
                    model : db.user,
                    include : [
                        {
                            model  : db.address
                        }
                    ]
                },
            ]
        })
        let data = [];
        user.map((item)=>{
            data.push({
                id : item.id,
                name : item.User.name,
                avatar : item.User.avatar,
                email : item.User.email,
                phone : '0' + item.User.phone,
                address : item.User.Address.province,
            })
        })
        if(data.length === 0) return createError(400, 'Không có khách hàng!');
        return data;
    } catch (error) {
        return error;
    }
}
export const getRevenueOwnerByHotelsService = async(id, dateStart, dateEnd)=>{
    try {
        const hotel = await db.hotel.findAll({
            where : {
                HotelOwnerId : id
            },
            include : [
                {
                    model : db.booking,
                    where: {
                        createdAt: {
                            [Op.between]: [
                                `${dateStart} 00:00:00`,
                                `${dateEnd} 23:59:59`  
                            ]
                        }
                    },
                }
            ]
        })
        const hotelName = await db.hotel.findAll({
            attributes : ['name']
        });
        let data = []
        let category = []
        hotel.map((item)=>{
            let total = 0;
            item.Bookings.map((booking)=>{
                total += booking.priceTotal
            })
            data.push(total);
            category.push(item.name)
        })
        hotelName.map((item)=>{
            if(category.indexOf(item.name) == -1){
                category.push(item.name);
                data.push(0)
            }
        })
        return {
            data,
            category
        }
    } catch (error) {
        return error;
    }
}