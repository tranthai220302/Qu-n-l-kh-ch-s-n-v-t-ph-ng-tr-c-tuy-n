import React, {useEffect, useState} from 'react'
import Navbar from '../../../compoments/customer/navbar/Navbar'
import Header from '../../../compoments/customer/header/Header'
import MailList from '../../../compoments/customer/mailList/MailList'
import Footer from '../../../compoments/customer/footer/Footer'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import './HotelFavourite.css'
import FavoriteIcon from '@mui/icons-material/Favorite';
import Rating from '@mui/material/Rating';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CancelIcon from '@mui/icons-material/Cancel';
import { Keyboard, Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react'; 
import newRequest from '../../../ults/newRequest'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
const HotelFavourite = () => {
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
        newRequest.get(`/hotel/favourite/customer`).then((res)=>{
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
        newRequest.delete(`/hotel/delete/favourite/${id}`).then((res)=>{
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
                <h1>Cho chuyến đi sắp tới của tôi</h1>
                <span style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
                <FavoriteIcon style={{color : 'red'}}/> 
                {data && (
                    <span>Đã lưu {data.length} chỗ nghỉ </span>
                )}
                </span>
            </div>
            <div className='listHotelFav'>
            <Swiper
                slidesPerView={4}
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
                            <Card sx={{ width : '100%', position : 'relative', height: '90%' }}>
                                <CardActionArea sx={{position : 'relative'}}>
                                    <CancelIcon sx={{position: 'absolute', top: 0, right: 0, color: 'white'}} onClick = {()=>{handleDelete(item.Hotel.id)}}/>
                                    <CardMedia
                                    component="img"
                                    height="140"
                                    image={item.Hotel.Images[0].filename}
                                    alt="green iguana"
                                    />
                                    <CardContent sx = {{display: 'flex', flexDirection : 'column', gap: '10px', justifyContent: 'space-between', paddingBottom : '30px'}}>
                                    <Typography gutterBottom variant="h5" component="div" sx={{display: 'flex', flexDirection: 'column'}}>
                                        <span style={{fontWeight : 600}}>{item.Hotel.name}</span>
                                        <Rating name="half-rating-read" defaultValue={5} precision={1} readOnly style={{fontSize : '15px', color: 'yellow'}} />
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        <span className="towLine">
                                            {item.Hotel.description}
                                        </span>
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{display: 'flex', alignItems:'center', gap :'5px', paddingLeft: 0,marginLeft: 0, height : '50px'}}>
                                        <LocationOnIcon sx={{paddingLeft : 0, marginLeft: 0}}/>
                                        <span style={{fontSize: '12px'}}>{item.Hotel.Address.numberHome}, {item.Hotel.Address.ward}, {item.Hotel.Address.district}, {item.Hotel.Address.province}</span>
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" >
                                    <div className="fpRating">
                                        <button>9.3</button>
                                        <span>Xuất sắc</span>
                                    </div>
                                    </Typography>
                                    </CardContent>
                                </CardActionArea>
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

export default HotelFavourite