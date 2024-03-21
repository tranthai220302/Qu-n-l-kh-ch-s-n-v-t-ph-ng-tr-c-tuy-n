import React, {useState, useEffect} from 'react'
import './RoomBook.css'
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import { Stack } from '@mui/material';
import PoolIcon from '@mui/icons-material/Pool';
import { differenceInDays, format } from 'date-fns';
import newRequest from '../../../ults/newRequest';
import { useSelector, useDispatch } from 'react-redux';
import Skeleton from '@mui/material/Skeleton';
const RoomBook = ({data, id}) => {
    const selectedRooms = useSelector(state => state.booking.selectedRooms);
    console.log(selectedRooms)
    const [numRoom, setNumRoom] = useState(0)
    const [price, setPrice] = useState(0)
    const [dateEnd, setDateEnd] = useState(JSON.parse(localStorage.getItem('date')))
    const [optionEnd, setOptionEnd] = useState(JSON.parse(localStorage.getItem('options')))
    const [dataHotel, setDataHotel] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [n, setN] = useState(0)
    const [total, setTotal] = useState(0)
    const [error, setError] = useState(false);
    const calculateDateDifference = () => {
        return differenceInDays(new Date(dateEnd[0].endDate), new Date(dateEnd[0].startDate)) + 1;
      };
    const getData = () =>{
        setIsLoading(true);
        newRequest.get(`/hotel/${id}`).then((res)=>{
          setIsLoading(false);
          setError(false);
          setDataHotel(res.data)
          console.log(res.data);
        }).catch((error)=>{
          setIsLoading(false);
          setError(error.response.data);
          console.log(error.response.data)
        })
      }
      useEffect(()=>{
        let total = 0;
        let priceT = 0;
        selectedRooms.map((item)=>{
            total += parseInt(item.num)
            priceT += parseInt(item.price)
        })
        setNumRoom(total)
        setPrice(priceT)
      },[selectedRooms])
      useEffect(()=>{
        getData();
      }, [])
      const getReview = () =>{
        setIsLoading(true);
        newRequest.get(`/review/list/${id}?page=${1}`).then((res)=>{
          setIsLoading(false);
          setError(false);
          setN(res.data.n)
          setTotal(res.data.t)
        }).catch((error)=>{
          setIsLoading(false);
          setError(error.response.data);
        })
      }
  return (
    <div className='containerRoomBook'>
        {isLoading ? (
            <div style={{marginTop : 0}}>
                <Skeleton width={'100%'} height={"1000px"} sx={{marginTop : '-220px'}}/>
            </div>
        ) : (
            <div className="roomBookHeader">
                {dataHotel && (
                <Stack spacing={1}>
                    <Stack direction="row" spacing={1}>
                        <Typography variant="body2" gutterBottom>
                            Khách sạn căn hộ    
                        </Typography>
                        <Rating name="size-small" defaultValue={dataHotel.numStars} size="small" />
                    </Stack>
                    <span style={{fontWeight: 700}}>{dataHotel.name}</span>
                    <Typography variant="caption" display="block" gutterBottom>
                        {dataHotel.Address.numberHome}, {dataHotel.Address.ward}, {dataHotel.Address.district}, {dataHotel.Address.province}  
                    </Typography>
                    <div className="totalReview">   
                        <span className='numberPoint'>{total.total ? (total?.total).toFixed(1) : total?.total}</span>
                        <span className='titleH2' style={{fontSize : '11px'}}>{total.name}</span>
                        <span className='titleH2'style={{fontSize : '11px'}}>{n} đánh giá</span>
                    </div>
                    <ul className="services1">
                        {dataHotel.Services.map((item)=>(
                            <li className="servicesItem1">
                                <PoolIcon  style={{color: 'rgb(83, 196, 83)', fontSize : '18px'}} />
                                <span className='titleH2' style={{fontSize : '13px'}}>{item.name}</span>
                            </li>
                        ))}
                    </ul>
                </Stack>
                )}
        </div>
        )}
        {!isLoading && (
                    <div className="roomBookDetail">
                    <Stack spacing={1}>
                        <span style={{fontWeight: 700}}>Chi tiết đặt phòng:</span>
                        <Stack direction="row" spacing={2} sx={{borderBottom : '1px solid rgb(216, 215, 215)', paddingBottom : '30px'}}>
                            <div className="checkInRoom">
                                <span className='nameNhan'>Nhận phòng</span>
                                <span className="timeCheckInRoom">
                                    {format(dateEnd[0].startDate, 'yyyy-MM-dd')}
                                </span>
                                <span className="titleH2">{dataHotel?.timeCheckIn}</span>
                            </div>
                            <div className="checkOutRoom">
                                <span className='nameNhan'>Trả phòng</span>
                                <span className="timeCheckInRoom">
                                {format(dateEnd[0].endDate, 'yyyy-MM-dd')}
                                </span>
                                <span className="titleH2">{dataHotel?.timeCheckOut}</span>
                            </div>
                        </Stack>
                        <span className='nameNhan'>Bạn đã chọn phòng:</span>
                        <span style={{fontWeight: 700}}>{numRoom} phòng cho {optionEnd?.adult} người lớn {optionEnd.children} trẻ em</span>
                    </Stack>
                </div>
        )}
        {
            !isLoading && (
                <div className="roomBookPrice">
                    <Stack spacing={1}>
                    <span style={{fontWeight: 700}}>Tóm tắt giá:</span>
                    <table>
                        <tr>
                            <td style={{fontSize : '15px', fontWeight : '300'}}>Giá gốc</td>
                            <td style={{fontWeight : 400, color : 'red'}}>VND {(price*calculateDateDifference()).toLocaleString('en-US')}</td>
                        </tr>
                        <tr>
                            <td style={{fontSize : '15px', fontWeight : '300'}}>Giảm giá</td>
                            <td style={{fontWeight : 400, color : 'red'}}>0</td>
                        </tr>
                        <tr>
                            <td style={{fontSize : '15px', fontWeight : '300'}}>Bookinh thanh toán</td>
                            <td style={{fontWeight : 400, color : 'red'}}>VND {(price*calculateDateDifference()).toLocaleString('en-US')}</td>
                        </tr>
                    </table>
                    </Stack>
                </div>
            )
        }
    </div>
  )
}

export default RoomBook