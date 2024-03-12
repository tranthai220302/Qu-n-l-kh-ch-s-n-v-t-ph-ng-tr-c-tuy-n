import React, {useEffect, useState} from 'react'
import Navbar from '../../../compoments/customer/navbar/Navbar'
import Header from '../../../compoments/customer/header/Header'
import MailList from '../../../compoments/customer/mailList/MailList'
import Footer from '../../../compoments/customer/footer/Footer'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import './RoomBooking.css'
import FavoriteIcon from '@mui/icons-material/Favorite';
import Rating from '@mui/material/Rating';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CancelIcon from '@mui/icons-material/Cancel';
import { Keyboard, Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react'; 
import newRequest from '../../../ults/newRequest'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Button, CardActionArea, CardActions } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { format } from 'date-fns'
const RoomBooking = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [state, setState] = useState({
      open: false,
      vertical: 'top',
      horizontal: 'right',
    });
    const handleCloseSnack = () => {
        setState({ ...state, openSnack: false });
      };
    const { vertical, horizontal, openSack } = state;
    const getData = () =>{
        setIsLoading(true);
        newRequest.get(`/room/roomBook`).then((res)=>{
          setIsLoading(false);
          setError(false);
          setData(res.data)
          console.log(res.data);
        }).catch((error)=>{
          setIsLoading(false);
          setError(error);
          console.log(error)
        })
      }
    useEffect(()=>{
        getData()
    },[])
    const handleDelete = (id) =>{
        setIsLoading(true);
        newRequest.delete(`/room/roomBook`).then((res)=>{
          setIsLoading(false);
          setError(false);
          setState({
            openSack: true,
            vertical: 'top',
            horizontal: 'right',
        })
        getData()
        }).catch((error)=>{
          setIsLoading(false);
          setError(error.response.data);
        })
    }
  return (
    <div>
        <Navbar />
        <Header type='list' />
        <div className="containerHotelFav">
        <Snackbar 
            anchorOrigin={{ vertical, horizontal }}
            open={openSack}
            onClose={handleCloseSnack}
            message={"helo"}
            key={vertical + horizontal}
        >
                <Alert
                    anchorOrigin={{ vertical, horizontal }}
                    onClose={()=>{            
                        setState({
                        openSack: false,
                        vertical: 'top',
                        horizontal: 'right',
                    })}}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                Xoá thành công !
            </Alert>
        </Snackbar>
            <div className="headerHotelFav">
                <h1>Danh sách phòng đã đặt</h1>
                <span style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
                <FavoriteIcon style={{color : 'red'}}/> 
                </span>
            </div>
            <div className='listHotelFav'>
            <Swiper
                slidesPerView={2}
                spaceBetween={20}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="fp"
                >
                    {
                        data && data.map((item,i)=>(
                            <SwiperSlide key={i}>
                                <Card sx={{ width : '100%', display: 'flex' }}>
                                    <CardActionArea sx={{width : '50%'}}>
                                        <CardMedia
                                        component="img"
                                        height="140"
                                        image={item.price[0].Room.Hotel.Images[0].filename}
                                        alt="green iguana"
                                        />
                                        <CardContent sx={{borderRight : '1ps solid gray'}}>
                                        <Typography gutterBottom component="div" sx={{fontWeight : 600}}>
                                            {item.price[0].Room.Hotel.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{display: 'flex', flexDirection: 'column', fontSize: '12px', gap : '8px'}}>
                                            <span><b>Địa điểm :</b>{item.price[0].Room.Hotel.Address.numberHome}, {item.price[0].Room.Hotel.Address.ward}, {item.price[0].Room.Hotel.Address.district}, {item.price[0].Room.Hotel.Address.province}</span>
                                            <span><b>Thời gian đặt phòng :</b> {format(item.dateCheckIn, 'dd/MM/yyyy')} (từ {item.price[0].Room.Hotel.timeCheckIn})</span>
                                            <span><b>Thời gian nhận phòng :</b> {format(item.dateCheckIn, 'dd/MM/yyyy')} (từ {item.price[0].Room.Hotel.timeCheckIn})</span>
                                        </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions sx={{display : 'flex', flexDirection : 'column', gap : '10px'}}>
                                        <span style={{fontWeight: 700, fontSize : '15px', textDecoration: 'underline'}}>Phòng đã đặt</span>
                                        <div style={{display: 'flex', flexDirection : 'column', gap : '10px', overflowY : 'atuo', height : '200px'}}>
                                            <table style={{fontSize : '13px', width: '230px', padding: '5px 0 5px 8px', borderRadius : '10px', boxShadow : 'rgba(0, 0, 0, 0.1) 0px 4px 12px'}}>
                                                <tr>
                                                    <td style={{width : '50%', fontWeight : 700, padding : '6px 0'}}>Tên phòng</td>
                                                    <td>{item.price[0].Room.name}</td>
                                                </tr>
                                                <tr>
                                                    <td style={{width : '50%', fontWeight : 700, padding : '6px 0'}}>Mã phòng</td>
                                                    <td>{item.price[0].id}</td>
                                                </tr>
                                                <tr>
                                                    <td style={{width : '50%', fontWeight : 700, padding : '6px 0'}}>Mã pin</td>
                                                    <td>{item.pinCode}</td>
                                                </tr>
                                                <tr>
                                                    <td style={{width : '50%', fontWeight : 700, padding : '6px 0'}}>Số lượng</td>
                                                    <td>123</td>
                                                </tr>
                                                <tr>
                                                    <td style={{width : '50%', fontWeight : 700, padding : '6px 0'}}>Người</td>
                                                    <td>{item.price[0].numberPerson} người</td>
                                                </tr>
                                                <tr>
                                                    <td style={{width : '50%', fontWeight : 700, padding : '6px 0'}}>Giá/người</td>
                                                    <td style={{color: 'red'}}>{(item.price[0].price).toLocaleString('en-US')} VND</td>
                                                </tr>
                                                <tr>
                                                    <td style={{width : '50%', fontWeight : 700, padding : '6px 0'}}>Huỷ phòng</td>
                                                    <td style={{color: 'red', cursor: 'pointer'}}>Xác nhận</td>
                                                </tr>
                                            </table>
                                            <div className='push' style={{textAlign: 'center', fontSize : '13px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap :'0px', justifyContent: 'flex-end'}}><span>Xem thêm</span> <KeyboardArrowDownIcon style={{fontSize : '15px'}} /></div>
                                        </div>
                                    </CardActions>
                                    </Card>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </div>
        <MailList />
        <Footer />
    </div>
  )
}

export default RoomBooking