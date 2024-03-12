import React, {useEffect, useState} from 'react'
import Header from '../../../compoments/customer/header/Header'
import MailList from '../../../compoments/customer/mailList/MailList'
import Footer from '../../../compoments/customer/footer/Footer'
import './PaymentSuccess.css'
import PdfPayment from './pdfPayment/pdfPayment'
import Navbar from '../../../compoments/customer/navbar/Navbar'
import newRequest from '../../../ults/newRequest'
import { useParams } from 'react-router-dom'
import Skeleton from '@mui/material/Skeleton';
import { CircularProgress } from '@mui/material'
import LinearWithValueLabel from '../../../compoments/linear/Linear'
import { Link } from 'react-router-dom'
const PaymentSuccess = () => {
    const {id} = useParams();
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const getData = () =>{
        setIsLoading(true);
        newRequest.get(`/booking/${id}`).then((res)=>{
          setIsLoading(false);
          setError(false);
          setData(res.data)
          console.log(res.data);
        }).catch((error)=>{
          setIsLoading(false);
          setError(error.response.data);
          console.log(error.response.data)
        })
      }
    useEffect(()=>{
        getData()
    },[id])
  return (
    <div style={{backgroundColor : '#fdfefe'}}>
        <Navbar />
        <Header type="list" />
        {isLoading && <LinearWithValueLabel isLoading={isLoading}/>}
        {
            isLoading ? (
                <div className="paymentSuccess">
                    <Skeleton width={'593px'} height={'1000px'} style={{marginTop: '-200px', marginBottom : '-200px'}}/>
                </div>
            ) : (
                <div className="paymentSuccess">
                    {data && (
                        <div className="invoice-container">
                            <div className="invoice-header">
                            <span style={{color : '#13caac', fontWeight: 600, fontSize : '25px'}}>Đặt phòng thành công!</span>
                                <img src="https://i.pinimg.com/originals/0d/e4/1a/0de41a3c5953fba1755ebd416ec109dd.gif" alt="" srcset="" style={{height: '100px', width : '150px'}}/>
                                <p>Mã đặt phòng: 123456</p>
                            </div>
                            <div className="invoice-details">
                                <div className="invoice-section">
                                    <h4>Thông Tin Khách Hàng</h4>
                                    <p><strong>Tên:</strong> {data.Customer?.nameBook}</p>
                                    <p><strong>Email:</strong> {data.Customer?.emailBook}</p>
                                    <p><strong>Địa Chỉ:</strong> {data.Customer?.addressBooking}</p>
                                    <p><strong>Phone:</strong> {data.Customer?.phoneBook}</p>
                                </div>
                                <div className="invoice-section">
                                    <h4>Chi Tiết Đặt Phòng</h4>
                                    <p><strong>Ngày Nhận Phòng:</strong> {data.dateCheckIn}</p>
                                    <p><strong>Ngày Trả Phòng:</strong> {data.dateCheckOut}</p>
                                    <p><strong>Số Lượng Người:</strong> {data.numAudults} người lớn, {data.numChildrens} trẻ em</p>
                                    <Link to="https://support.google.com/mail/answer/8494?hl=vi&co=GENIE.Platform%3DDesktop">
                                    <p style={{fontSize: '13px', fontStyle: 'italic', textDecoration: 'underline', cursor: 'pointer'}}>Kiểm tra email của bạn để xem thêm chi tiết</p></Link>
                                </div>
                            </div>
                            <div className="invoice-total">
                                <h4>Tổng Thanh Toán</h4>
                                <p><strong>Tổng Cộng:</strong>VND {(data.priceTotal).toLocaleString('en-US')}</p>
                            </div>
                        </div>
                    )}
                <PdfPayment />
            </div>
            )
        }
        <MailList />
        <Footer />
    </div>
  )
}

export default PaymentSuccess