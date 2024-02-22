import React from 'react'
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

const Review = () => {
  return (
    <div className='reviewContainer'>
        <h2>Đánh giá của khách hàng</h2>
        <div className="totalReview">   
            <span className='numberPoint'>9,3</span>
            <span className='descReview'>Tuyệt hảo</span>
            <span className='numberTotal'>79 đánh giá</span>
            <span className='allReview'>Đọc tất cả đánh giá</span>
        </div>
        <div className="reviewContent">
            <b>Hạng mục:</b>
            <div class="progress1">
                <div class="progress-bar-container">
                    <div className="progressTitle">
                        <span>Nhân viên phục vụ</span>
                        <span>9,2</span>
                    </div>
                    <ProgressBar completed="60" width='100%' height='8px' isLabelVisible = {false} bgColor='#003580' />
                </div>
                <div class="progress-bar-container">
                    <div className="progressTitle">
                        <span>Nhân viên phục vụ</span>
                        <span>9,2</span>
                    </div>
                    <ProgressBar completed="60" width='100%' height='8px' isLabelVisible = {false} bgColor='#003580'/>
                </div>
                <div class="progress-bar-container">
                    <div className="progressTitle">
                        <span>Nhân viên phục vụ</span>
                        <span>9,2</span>
                    </div>
                    <ProgressBar completed="60" width='100%' height='8px' isLabelVisible = {false} bgColor='#003580'/>
                </div>
                <div class="progress-bar-container">
                    <div className="progressTitle">
                        <span>Nhân viên phục vụ</span>
                        <span>9,2</span>
                    </div>
                    <ProgressBar completed="60" width='100%' height='8px' isLabelVisible = {false} bgColor='#003580'/>
                </div>
                <div class="progress-bar-container">
                    <div className="progressTitle">
                        <span>Nhân viên phục vụ</span>
                        <span>9,2</span>
                    </div>
                    <ProgressBar completed="60" width='100%' height='8px' isLabelVisible = {false} bgColor='#003580'/>
                </div>
            </div>
        </div>
        <div className="listReview">
            {/* <ReviewItem />
            <ReviewItem />
            <ReviewItem /> */}
            <b>Đọc xem khách yêu thích gì nhất:</b>
            <Swiper
                slidesPerView={3}
                spaceBetween={20}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                >
                <SwiperSlide  width= '30%'>
                    <ReviewItem />
                </SwiperSlide >
                <SwiperSlide width= '30%'>
                    <ReviewItem />
                </SwiperSlide >
                <SwiperSlide width= '30%'>
                    <ReviewItem />
                </SwiperSlide >
                <SwiperSlide width= '30%'>
                    <ReviewItem />
                </SwiperSlide >
                <SwiperSlide width= '30%'>
                    <ReviewItem />
                </SwiperSlide >
                <SwiperSlide width= '30%'>
                    <ReviewItem />
                </SwiperSlide >
                <SwiperSlide width= '30%'>
                    <ReviewItem />
                </SwiperSlide >
                <SwiperSlide width= '30%'>
                    <ReviewItem />
                </SwiperSlide >
            </Swiper>
            <ModalReview/>
        </div>
    </div>
  )
}

export default Review