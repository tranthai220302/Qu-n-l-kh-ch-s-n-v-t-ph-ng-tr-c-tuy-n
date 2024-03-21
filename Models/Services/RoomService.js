
import { format } from "date-fns";
import createError from "../../ultis/createError.js";
import db from "../Entitys/index.js";
import { Op} from "sequelize";
import { calculateDateDifference } from "./BookingService.js";
export const createRoomServices = async(data, idHotel) =>{
    try {
        const {items, imgs, priceRoom,category, ...res} = data;
        const hotel = await db.hotel.findByPk(idHotel);
        if(!hotel) return createError(400, 'Không tìm thấy khách sạn!');
        var filteredData = priceRoom.filter(function(item) {
            return parseInt(item.numberRoom) > 0;
        });
        const CategoryId = await db.category.findOne({
            where : {name : category}
        })
        console.log(filteredData)
        var maxPerson = filteredData.reduce(function(prev, current) {
            return (prev.person > current.person) ? prev : current;
        });
        res.numPersonMax = maxPerson.person;
        res.HotelId = idHotel
        res.CategoryId = CategoryId.id
        const room = await db.room.create(res);
        if(!room) return createError(400, 'Thêm phòng không thành công');
        const itemNew = await db.item.findAll({
            where : {
                id : items
            }
        })
        await room.addItem(itemNew);
        const imagesData = imgs.map(img =>{
            return {filename : img, RoomId : room.id}
        });
        await db.image.bulkCreate(imagesData);
        const pricesData = filteredData.map(price =>{
            return {
                price : price.price,
                numberPerson : price.person,
                RoomId : room.id,
                numRoom : parseInt(price.numberRoom)
            }
        })
        await db.price.bulkCreate(pricesData)
        return {
            status : true,
            message : 'Thêm phòng thành công!',
            room : room
        }
    } catch (error) {
        return error;
    }
}
export const checkRoom = (roomList, dateCheckIn, dateCheckOut, i) =>{
    let priceRoomEmptyCopy = [];
    roomList.map((item) => {
        item.PriceRooms.map((room, i) => {
            let num = room.numRoom;
            if (room.booking.length == 0 && room.numRoom > 0) {
                priceRoomEmptyCopy.push(room.id);
            } else {
                console.log('Phong :', room.id);
                console.log('num ban dau : ', num);
                room.booking.map((bookingItem) => {
                    if (dateCheckIn <= bookingItem.dateCheckIn && bookingItem.dateCheckIn <= dateCheckOut) {
                        console.log(1);
                        console.log(dateCheckIn, dateCheckOut, bookingItem.dateCheckIn, bookingItem.dateCheckOut);
                        num -= bookingItem.BookingPriceRoom.numRoom;
                    } else if (dateCheckIn <= bookingItem.dateCheckOut && bookingItem.dateCheckOut <= dateCheckOut) {
                        console.log(dateCheckIn, dateCheckOut, bookingItem.dateCheckIn, bookingItem.dateCheckOut);
                        console.log(2);
                        num -= bookingItem.BookingPriceRoom.numRoom;
                    } else if (bookingItem.dateCheckIn < dateCheckIn && dateCheckOut < bookingItem.dateCheckOut) {
                        console.log(dateCheckIn, dateCheckOut, bookingItem.dateCheckIn, bookingItem.dateCheckOut);
                        console.log(3);
                        num -= bookingItem.BookingPriceRoom.numRoom;
                    }
                });
                console.log('num sau check :', num);
                if (num <= 0) {
                    room.numRoom = 0;
                    console.log('k dc them');
                } else {
                    room.numRoom = num;
                    console.log('dc them');
                    priceRoomEmptyCopy.push(room.id);
                }
            }
        });
    });
    if(i == 1){
        return priceRoomEmptyCopy
    }else return roomList;
}
export const getRoomEmptyService = async(id, dateCheckIn, dateCheckOut)=>{
    try {
        var roomList = await db.room.findAll({
            where : {
                HotelId : id
            },
            include : [
                {
                    model : db.category
                },
                {
                    model : db.price,
                    include : [
                        {
                            as : 'booking',
                            model : db.booking,
                            through : db.bookingPriceRoom
                        }
                    ],
                    order: [['numRoom', 'DESC']]
                },
                {
                    model : db.item,
                    as : 'Item'
                }
            ]
        })

        const idRoom = checkRoom(roomList, dateCheckIn, dateCheckOut, 1);
        const roomEmpty = await db.room.findAll({
            where : {
                HotelId : id
            },
            include : [
                {
                    model : db.category
                },
                {
                    model : db.price,
                    where : {
                        id : idRoom
                    },
                    include : [
                        {
                            as : 'booking',
                            model : db.booking,
                            through : db.bookingPriceRoom
                        }
                    ],
                    order: [['numRoom', 'DESC']]
                },
                {
                    model : db.item,
                    as : 'Item'
                }
            ]
        })
        const idRoomEmpty = checkRoom(roomEmpty, dateCheckIn, dateCheckOut, 0);
        return idRoomEmpty;
    } catch (error) {
        return error;
    }
}
export const getRoomBookServices = async(CustomerId) =>{
    try {
        const user = await db.user.findByPk(CustomerId,{
            include : {model: db.customer}
        })
        const date = format(new Date(), 'yyyy-MM-dd');
        if(!user) return createError(400, 'Không tìm thấy người dùng!')
        const booking = await db.booking.findAll({
            where : {
                [Op.and] : [
                    {CustomerId : user.Customer.id},
                    {dateCheckIn  : {
                        [Op.gte] : date
                    }}
                ]
             },
            include : [
                {
                    model : db.price,
                    as : 'price',
                    where : {
                        id : {
                            [Op.not] : null
                        }
                    },
                    include : {
                        model : db.room,
                        include : [
                            {model : db.category},
                            {model : db.image},
                            {
                                model : db.hotel,
                                include : [
                                    {
                                        model : db.image
                                    },
                                    {
                                        model : db.address
                                    }
                                ]
                            }
                        ]
                    }
                }
            ]
        })
        if(booking.length == 0) return createError(400, 'Bạn chưa đặt phòng');
        return booking;
    } catch (error) {
        return error;
    }
}
export const getRoomByHotelOwnerServices = async(HotelOwnerId, date) =>{
    try {
        console.log(date)
        const user = await db.user.findOne({
            where : {id : HotelOwnerId},
            include : [
                {
                    model : db.hotelOwner
                }
            ]
        })
        const booking = await db.booking.findAll({
            where : {
                createdAT : {
                    [Op.between] : [
                        `${date} 00:00:00`,
                        `${date} 23:59:59`
                    ]
                }
            },
            include : [
                {
                    model : db.hotel,
                    where : {HotelOwnerId : user.HotelOwner.id},
                    include : [
                        {
                            model : db.image    
                        }
                    ]
                },
                {
                    model : db.price,
                    as : 'price'
                },
                {
                    model : db.customer
                }
            ]
        })
        let data = [];
        booking.map((bookingItem)=>{
            bookingItem.price.map((room)=>{
                data.push({
                    id : room.id,
                    price : room.price,
                    person : room.numberPerson,
                    customer : bookingItem.Customer.nameBook,
                    numRoom : room.BookingPriceRoom.numRoom,
                    hotel : bookingItem.Hotel.name,
                    img : bookingItem.Hotel.Images[0].filename
                })
            })
        })
        return data;
    } catch (error) {
        return error;
    }
}
export const cancelRoomService = async (id, BookingId, PriceRoomId) =>{
    try {
        const customer = await db.customer.findOne({
            include : [
                {
                    model : db.user,
                    where : {id}
                }
            ]
        })
        const booking = await db.booking.findOne({
            where : {
                [Op.and] : [
                    {CustomerId : customer.id},
                    {id : BookingId}
                ]
            },
            include : [
                {
                    model : db.hotel,
                    attributes : ['name', 'isCancel']
                },
                {
                    model : db.price,
                    as : 'price',
                    where : {
                        id :PriceRoomId,
                    }
                }
            ]
        });
        if(!booking) return createError(400, 'Huỷ phòng không thành công!')
        const currentTime = new Date(); // Thời điểm hiện tại
        const bookingCreationTime = booking.createdAt
        const timeDifference = currentTime - bookingCreationTime;
        console.log(timeDifference)
        const hoursDifference = timeDifference / (1000 * 60 * 60);
        console.log(hoursDifference)
        if (hoursDifference <= 24) {
            return createError(400, 'Huỷ phòng không thành công! Phải hủy ít nhất sau 24 giờ kể từ thời điểm đặt phòng.');
        }
        if(booking.Hotel.isCancel == false) return createError(400, 'Khách sạn không phục vụ dịch vụ trả phòng!');
        await db.bookingPriceRoom.destroy({
            where : {
                [Op.and] : [
                    {BookingId :BookingId},
                    {PriceRoomId}
                ]
            }
        })
        const priceTotal = booking.priceTotal - booking.price[0].price*booking.price[0].BookingPriceRoom.numRoom*calculateDateDifference(booking.dateCheckOut, booking.dateCheckIn);
        const bookingCheck = await db.booking.findByPk(BookingId);
        if(bookingCheck.price.length == 0){
            await db.booking.destroy({where : {id : BookingId}})
        }
        await db.booking.update({
            priceTotal : priceTotal
        })
        return {
            message : "Huỷ phòng thành công!"
        }
    } catch (error) {
        return error;
    }
}