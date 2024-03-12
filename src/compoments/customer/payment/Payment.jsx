import React, {useEffect, useState} from 'react'
import './Payment.css'
import { Button, Stack } from '@mui/material'
import ReactDOM from 'react-dom';
import {loadStripe} from '@stripe/stripe-js';
import CircularProgress from '@mui/material/CircularProgress';
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { useSelector, useDispatch } from 'react-redux';
import newRequest from '../../../ults/newRequest';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { clearRooms } from '../../../redux/actions/bookingActions';
const Payment = ({inforUser, setInforUser, address, setAddress, id}) => {
    const stripe = useStripe();
    const elements = useElements();
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null);
    const selectedRooms = useSelector(state => state.booking.selectedRooms);
    const dispatch = useDispatch();
    const [clientSecret, setClientSecret] = useState(null);
    const [dateEnd, setDateEnd] = useState(JSON.parse(localStorage.getItem('date')))
    const [optionEnd, setOptionEnd] = useState(JSON.parse(localStorage.getItem('options')))
    const navigate = useNavigate();
    const [idBooking, setIdBooking] = useState(null);
    console.log(selectedRooms)
    useEffect(()=>{
        if(clientSecret){
            stripe.retrievePaymentIntent(clientSecret)
            .then(({paymentIntent}) => {
                switch (paymentIntent.status) {
                  case 'succeeded':{
                    navigate(`/payment/succees/${idBooking}`)
                    dispatch(clearRooms())
                    localStorage.removeItem('date')
                    localStorage.removeItem('options')
                    localStorage.removeItem('destination')
                    break;
                  }
                  case 'processing':
                    {
                      dispatch(clearRooms())
                      localStorage.removeItem('date')
                      localStorage.removeItem('options')
                      localStorage.removeItem('destination')
                      console.log("Payment processing. We'll update you when payment is received.");
                      break;
                    }
        
                  case 'requires_payment_method':
                    {
                      dispatch(clearRooms())
                      localStorage.removeItem('date')
                      localStorage.removeItem('options')
                      localStorage.removeItem('destination')
                      console.log('Payment failed. Please try another payment method.');
                      break;
                    }
        
                  default:
                    {
                      dispatch(clearRooms())
                      localStorage.removeItem('date')
                      localStorage.removeItem('options')
                      localStorage.removeItem('destination')
                      console.log('Something went wrong.');
                      break;
                    }
                }
              });
        }
    }, [clientSecret])
    const handleSubmit = async (event) => {
        event.preventDefault()
        if (!stripe || !elements) {
            console.log('Vui lòng chờ cho đến khi dịch vụ thanh toán sẵn sàng.');
            return;
          }
        setIsLoading(true);
        newRequest.post(`/booking/payment/${id}`,{
            inforUser : {
              nameBook : inforUser.name,
              emailBook : inforUser.email,
              phoneBook : inforUser.phone,
              genDerBook : inforUser.genDer
            },
            address,
            selectedRooms,
            body : {
              dateCheckIn : format(dateEnd[0].startDate, 'yyyy-MM-dd'),
              dateCheckOut : format(dateEnd[0].endDate, 'yyyy-MM-dd'),
              numAudults : optionEnd?.adult,
              numChildrens : optionEnd?.children
            }
        }).then((res)=>{
            setIsLoading(false);
            setErrorMessage(false);
            setClientSecret(res.data.client_secret)
            setIdBooking(res.data.booking.id)
            console.log(res.data.booking)
        }).catch((error)=>{
            setIsLoading(false)
            setErrorMessage(error.response.data)
            console.log(error.response.data)
        })
    };
  return (
    <div className='containerPay'>
        <div className="headerPayment">
            <Stack spacing={2}>
                <span className='titleInfor'>Nhập thông tin chi tiết</span>
                <span className='titleH2'>Bạn sẽ nhận phòng sau khi thanh toán thành công</span>
            </Stack>
        </div>
        <div className="cardPay">
            <Stack spacing={2}>
                <span className='titleInfor'>Bạn muốn thanh toán bằng cách nào?</span>
                <form onSubmit={handleSubmit}>
                    <PaymentElement />
                    <Button disabled={isLoading} type='submit' variant="outlined" style={{marginTop : '20px', width : '150px'}} >{isLoading ? <CircularProgress size={27} /> : 'Thanh toán'}</Button>
                    {errorMessage && <div>{errorMessage}</div>}
                </form>
            </Stack>
        </div>
    </div>
  )
}

export default Payment