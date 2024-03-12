import stripe from "stripe";
import createError from "../../ultis/createError.js";
import db from "../Entitys/index.js";
import dotenv from 'dotenv'
import sendEmail from "../../ultis/sendEmail.js";
import { getHotelByIdServices } from "./HotelService.js";
import { Op } from "sequelize";
dotenv.config()
const createPinCode = ()=>{
    let pin = Math.floor(Math.random()*1000);
    if(pin < 100){
        pin = '0' + pin
    }
    if(pin < 10){
        pin = "00" + pin
    }
    return pin;
}
export const createBookingService = async (data1, id, HotelId) =>{
    try {
        const {selectedRooms, body, inforUser, address, ...data} = data1;
        let addressV = address.numberHome + "," + address.ward + "," + address.district + "," + address.province 
        let priceTotal = 0;
        let pricesRoom = []
        for(let i = 0 ; i < selectedRooms.length; i++){
            priceTotal += selectedRooms[i].price;
            const priceRoom = await db.price.findByPk(selectedRooms[i].id,{
                include : [
                    {
                        model : db.room
                    }
                ]
            })
            if(!priceRoom) return createError(400, 'Không tìm thấy phòng');
            if(priceRoom.numRoom <= 0) return createError(400, 'Hết phòng!')
            pricesRoom.push(priceRoom)
        }
        const user = await db.user.findOne({
            where : {
                id : id
            },
            include : [
                {
                    model : db.customer
                }
            ]
        })
        if(!user) return createError(400, 'Không tìm thấy người dùng!')
        inforUser.addressBooking = addressV
        await db.customer.update(inforUser, {
            where : {
                id : user.Customer.id
            }
        })
        let pinCode = createPinCode();
        body.priceTotal = priceTotal
        body.pinCode = pinCode
        body.CustomerId = user.Customer.id
        body.HotelId = HotelId
        const booking = await db.booking.create(body);
        if(!booking) return createError(400, 'Đặt phòng không thành công!');
        console.log(pricesRoom.length)
        for(let i = 0 ; i < pricesRoom.length; i++){
            const numRoom = parseInt(selectedRooms[i].num)
            const bookingPrice = await db.bookingPriceRoom.create({
                BookingId : booking.id,
                PriceRoomId : pricesRoom[i].id,
                numRoom : parseInt(selectedRooms[i].num)
            })
            if(!bookingPrice) return createError(400, 'Đăt phòng không thành công')
        }
        const bookingNew = await db.booking.findOne({
            where : {
                id : booking.id
            },
            include : [
                {
                    model : db.price,
                    as : 'price',
                    include : [
                        {
                            model : db.room
                        }
                    ]
                },
                {
                    model : db.customer
                },
            ]
        })
        if(bookingNew){
            const hotel = await getHotelByIdServices(HotelId);
            sendEmail(hotel, pricesRoom, bookingNew, selectedRooms, body)
            return bookingNew;

        }
        return createError(400, 'Đặt phòng không thành công!')
    } catch (error) {
        return error;
    }
}
export const paymentService = async(data) =>{
    try {
        const stripe = stripe(process.env.key);
        stripe.customers
        .create({
          email: data.email,
          name: data.name,
        })
        .then((customer) => {
          return stripe.charges.create({
            amount: parseFloat(data.amount) * 100,
            description: `Payment for USD ${amount}`,
            currency: "USD",
            customer: customer.id,
          });
        })
        .then((charge) => res.status(200).send(charge))
        .catch((err) => console.log(err));
    } catch (error) {
        return error;
    }
}
export const getBookingByIdService = async(id)=>{
    try {
        const booking = await db.booking.findByPk(id,{
            include : [
                {
                    model : db.price,
                    as : 'price',
                    include : [
                        {
                            model : db.room
                        }
                    ],   
                },
                {
                    model : db.customer
                }
            ]
        })
        if(!booking) return createError(400, 'Không tìm thấy hoá đơn!');
        return booking;
    } catch (error) {
        return error;
    }
}
export const revenueService = async(dateStart, dateEnd, id)=>{
    try {
        const user = await db.user.findOne({
            where : {
                id : id
            },
            include : [
                {
                    model : db.hotelOwner
                }
            ]
        })
        const startDate = new Date(dateStart);
        const endDate = new Date(dateEnd);
        const dateRange = [];
        let data = []
        for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const formattedDate = `${year}-${month}-${day}`;
            dateRange.push(formattedDate);       
            const bookings = await db.booking.findAll({
                where: {
                    createdAt: {
                        [Op.between]: [
                            `${formattedDate} 00:00:00`,
                            `${formattedDate} 23:59:59`  
                        ]
                    }
                },
                include : [
                    {
                        model : db.hotel,
                        where :{HotelOwnerId : user.HotelOwner.id}
                    }
                ]
            });
            let total = 0;
            bookings.map((item)=>{
                total += item.priceTotal
            })
            console.log(total)
            data.push(total)
        }       
      return {
        data,
        dateRange   
      }
    } catch (error) {
        return error;
    }
}

