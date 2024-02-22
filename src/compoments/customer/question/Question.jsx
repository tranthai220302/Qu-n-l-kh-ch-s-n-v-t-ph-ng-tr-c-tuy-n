import React from 'react'
import './Question.css'
import { Swiper, SwiperSlide  } from 'swiper/react';
import ProgressBar from "@ramonak/react-progress-bar";
import ReviewItem from '../review/reviewItem/ReviewItem';
import { Pagination } from 'swiper/modules';
import QuestionItem from './questionItem/QuestionItem';
const Question = () => {
  return (
    <div className='quesContainer'>
        <h2>Hỏi đáp về chỗ nghỉ</h2>
        <div className="listReview">
            <span className='titleH2' >Nếu muốn biết thêm về chỗ nghỉ, bạn có thể xem các câu hỏi của khách</span>
            <Swiper
                slidesPerView={3}
                spaceBetween={20}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                >
                <SwiperSlide  width= '30%'>
                    <QuestionItem />
                </SwiperSlide >
                <SwiperSlide width= '30%'>
                    <QuestionItem />
                </SwiperSlide >
                <SwiperSlide width= '30%'>
                    <QuestionItem />
                </SwiperSlide >
                <SwiperSlide width= '30%'>
                    <QuestionItem />
                </SwiperSlide >
                <SwiperSlide width= '30%'>
                    <QuestionItem />
                </SwiperSlide >
                <SwiperSlide width= '30%'>
                    <QuestionItem />
                </SwiperSlide >
                <SwiperSlide width= '30%'>
                    <QuestionItem />
                </SwiperSlide >
                <SwiperSlide width= '30%'>
                    <QuestionItem />
                </SwiperSlide >
            </Swiper>
        </div>
    </div>
  )
}

export default Question