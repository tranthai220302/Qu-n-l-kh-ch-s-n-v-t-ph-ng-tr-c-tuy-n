import React, {useEffect, useState} from 'react'
import ProgressBar from "@ramonak/react-progress-bar";
import './Review.css'
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import ReviewItem from './reviewItem/ReviewItem';
import { Swiper, SwiperSlide  } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import CircularProgress from '@mui/material/CircularProgress';
import ModalReview from './ModalReview/ModalReview';
import newRequest from '../../../ults/newRequest';
import Skeleton from '@mui/material/Skeleton';
const Review = ({id}) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [percentCategory, setPercentCategory] = useState();
  const [n, setN] = useState(0)
  const [total, setTotal] = useState(0)
  const getData = (page) =>{
    setIsLoading(true);
    newRequest.get(`/review/list/${id}?page=${page}`).then((res)=>{
      setIsLoading(false);
      setError(false);
      setData(res.data.listReview)
      setPercentCategory(res.data.categoryScore)
      setN(res.data.n)
      setTotal(res.data.t)
    }).catch((error)=>{
      setIsLoading(false);
      setError(error.response.data);
    })
  }
  useEffect(()=>{
    getData(1)
  },[id])
  return (
    <div className='reviewContainer'>
        {
            isLoading ? (
                <h2><Skeleton width={'20%'} height={40} /></h2>
            ) : (
                <h2>Đánh giá của khách hàng</h2>
            )
        }
        {
            !isLoading && !error && n > 0 ? (
            <div className="totalReview">   
                <span className='numberPoint'>{(total.total).toFixed(1)}</span>
                <span className='descReview'>{total.name}</span>
                <span className='numberTotal'>{n} đánh giá</span>
                <span className='allReview'>Đọc tất cả đánh giá</span>
            </div>
            ) :(
                <div className="totalReview1">   
                    <span className='numberTotal'>0 đánh giá</span>
                </div>
            )
        }
        <div className="reviewContent">
            {
                isLoading ? (
                    <b><Skeleton width={'20%'} height={20} /></b>
                ) : (
                    <b>Hạng mục:</b>
                )
            }
            <div class="progress1">
                {
                    !isLoading && !error && percentCategory && percentCategory.map((item, i)=>(
                        <div class="progress-bar-container" key={i}>
                            <div className="progressTitle">
                                <span>{item.name}</span>
                                <span>{(item.percent).toFixed(1)}</span>
                            </div>
                            <ProgressBar completed={item.percent*10} width='100%' height='8px' isLabelVisible = {false} bgColor='#003580' />
                        </div>
                    ))
                }
            </div>
        </div>
        <div className="listReview">
            {/* <ReviewItem />
            <ReviewItem />
            <ReviewItem /> */}
            {
                isLoading ? (
                    <Skeleton width={'40%'} height={20} />
                ) : (
                    <b>{data?.length > 0 && "Đọc xem khách yêu thích gì nhất:"}</b>
                )
            }
            {
                isLoading ? (
                    <Swiper
                        slidesPerView={3}
                        spaceBetween={20}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[Pagination]}
                        >
                        <SwiperSlide  width= '30%'>
                            <Skeleton width={'100%'} height={400} style={{marginTop : '-50px'}} />
                        </SwiperSlide >
                        <SwiperSlide  width= '30%'>
                            <Skeleton width={'100%'} height={400} style={{marginTop : '-50px'}} />
                        </SwiperSlide >
                        <SwiperSlide  width= '30%'>
                            <Skeleton width={'100%'} height={400} style={{marginTop : '-50px'}} />
                        </SwiperSlide >
                    </Swiper>
                ) : (
                <Swiper
                    slidesPerView={3}
                    spaceBetween={20}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination]}
                    >
                    {!isLoading && !error && data && data.map((item)=>(
                        <SwiperSlide  width= '30%'>
                            <ReviewItem data = {item}/>
                        </SwiperSlide >
                    ))}
                </Swiper>
                )
            }
            {<ModalReview id = {id}/>}
        </div>
    </div>
  )
}

export default Review