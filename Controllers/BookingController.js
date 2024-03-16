import { createBookingService, getBookingByIdService, paymentService, revenueHotelService, revenueService } from "../Models/Services/BookingService.js";
import dotenv from 'dotenv'
dotenv.config()
import Stripe from "stripe";
export const createBooking = async(req, res, next) =>{
    try {
        console.log(req.body)
        const booking = await createBookingService(req.body, req.id, req.params.id);
        if(booking instanceof Error) return next(booking);
        return res.status(200).send(booking)
    } catch (error) {
        next(error);
    }
}
export const paymentBooking = async(req, res, next) =>{
    try {
            const data = req.body;
            console.log(data)
            const booking= await createBookingService(data, req.id, req.params.id)
            if(booking instanceof Error) return next(booking);
            const stripe = Stripe("sk_test_51OqC8TITL44jpS8t9J3L7ld5DHXJDHROB2hnYZIKOkHvAffOQjbatEuJryczu61CmfW2L1cuhWNzByxBQH8T9bst00TVLfZkAx");
            const customer = await stripe.customers.create({
                email: data.inforUser.emailBook,
                name : data.inforUser.nameBook,
                phone : data.inforUser.phoneBook,
            });
            let totalAmount = 0;
            for (const product of data.selectedRooms) {
                const itemTotal = product.price;
                totalAmount += itemTotal;
            }
            const invoice = await stripe.invoices.create({
                customer: customer.id,
            });
            const paymentIntent = await stripe.paymentIntents.create({
                amount: totalAmount, 
                currency: 'VND',
                customer: customer.id,
                payment_method_types: ['card', 'link'],
                payment_method: 'pm_card_visa'
            })
            const payment = await stripe.paymentIntents.confirm(paymentIntent.id);
            res.status(200).json({ 
                client_secret: paymentIntent.client_secret,
                customer_id: customer.id,
                invoice_id: invoice.id,
                booking
            });
    } catch (error) {
        next(error);
    }
}
export const getBookingById = async(req, res, next) => {
    try {
        const booking = await getBookingByIdService(req.params.id);
        if(booking instanceof Error) return next(booking);
        return res.status(200).send(booking)
    } catch (error) {
        next(error)
    }
}
export const revenue = async(req, res, next) =>{
    try {
        console.log(req.body)
        const booking = await revenueService(req.body.dateStart, req.body.dateEnd, req.id);
        if(booking instanceof Error) return next(booking);
        return res.status(200).send(booking)
    } catch (error) {
        next(error);
    }
}
export const revenueHotel = async(req, res, next)=>{
    try {
        const booking = await revenueHotelService(req.body.dateStart, req.body.dateEnd, req.params.id);
        if(booking instanceof Error) return next(booking);
        return res.status(200).send(booking)
    } catch (error) {
        next(error);
    }
}
