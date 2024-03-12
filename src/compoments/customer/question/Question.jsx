import React, {useState, useEffect} from 'react'
import './Question.css'
import { Swiper, SwiperSlide  } from 'swiper/react';
import ProgressBar from "@ramonak/react-progress-bar";
import ReviewItem from '../review/reviewItem/ReviewItem';
import { Pagination } from 'swiper/modules';
import QuestionItem from './questionItem/QuestionItem';
import newRequest from '../../../ults/newRequest';
import Skeleton from '@mui/material/Skeleton';
import ModalQuestion from '../modalQuestion/ModalQuestion';
const Question = ({id}) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  console.log(id)
  const getData = () =>{
    setIsLoading(true);
    newRequest.get(`/question/${id}`).then((res)=>{
      setIsLoading(false);
      setError(false);
      setData(res.data)
      console.log(res.data)
    }).catch((error)=>{
      setIsLoading(false);
      setError(error.response.data);
    })
  }
  useEffect(()=>{
    getData();
  },[id])
  return (
    <div className='quesContainer'>
        {
            isLoading ? (<h2><Skeleton width={'20%'} height={40} /></h2>) :(<h2>Hỏi đáp về chỗ nghỉ</h2>)
        }
        <div className="listReview">
            {!isLoading && <span className='titleH2' >Nếu muốn biết thêm về chỗ nghỉ, bạn có thể xem các câu hỏi của khách</span>}
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
                        <SwiperSlide width= '30%'>
                            <Skeleton width={'100%'} height={400} style={{marginTop : '-50px'}} />
                        </SwiperSlide >
                        <SwiperSlide width= '30%'>
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
                        {data && data.length > 0 && data.map((item, i)=>(
                            <SwiperSlide  width= '30%' key={i}>
                                <QuestionItem data = {item}/>
                            </SwiperSlide >
                        ))}
                    </Swiper>
                )
            }
        </div>
        <ModalQuestion id={id} />
    </div>
  )
}

export default Question