import "./featuredProperties.css";
import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Pagination, Navigation } from 'swiper/modules';
import { getData } from "../../../ults/getData";
import Skeleton from '@mui/material/Skeleton';
import Rating from '@mui/material/Rating';
import { useNavigate } from "react-router-dom";
const FeaturedProperties = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
        try {
            const result = await getData('/hotel/favourite', setIsLoading, setError);
            if (result !== "loi") setData(result)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchData();
  }, []);

  return (
    <div className="containerProperties">
    
    {
      isLoading ? <h1 className="homeTitle"><Skeleton width={'20%'} style={{marginBottom: '30px', textAlign : 'left', marginLeft : 0}}/></h1> : <h1 className="homeTitle" style={{marginBottom: '30px'}}>Khách sạn yêu thích</h1>
    }
    {
      isLoading ? <h1 className="homeTitle"><Skeleton width={'30%'} style={{marginBottom: '30px', textAlign : 'left', marginLeft : 0}}/></h1> : <div className="title" style={{textAlign : 'left', width : '100%'}}>Khách có tiêu chí tìm kiếm như bạn đã đặt những chỗ này</div>
    }
    {isLoading ? (
      <Swiper
      slidesPerView={4}
      spaceBetween={20}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination]}
      className="fp"
      >
        <SwiperSlide>
          <div className="fpItem">
            <Skeleton
            sx={{ bgcolor: 'grey.300' }}
            variant="rectangular"
            width={"100%"}
            height={400}
            style={{
              borderRadius : '10px'
            }}
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="fpItem">
          <Skeleton
            sx={{ bgcolor: 'grey.300' }}
            variant="rectangular"
            width={"100%"}
            height={400}
            style={{
              borderRadius : '10px'
            }}
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="fpItem">
          <Skeleton
            sx={{ bgcolor: 'grey.300' }}
            variant="rectangular"
            width={"100%"}
            height={400}
            style={{
              borderRadius : '10px'
            }}
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="fpItem">
          <Skeleton
            sx={{ bgcolor: 'grey.300' }}
            variant="rectangular"
            width={"100%"}
            height={400}
            style={{
              borderRadius : '10px'
            }}
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="fpItem">
          <Skeleton
            sx={{ bgcolor: 'grey.300' }}
            variant="rectangular"
            width={"100%"}
            height={400}
            style={{
              borderRadius : '10px'
            }}
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="fpItem">
          <Skeleton
            sx={{ bgcolor: 'grey.300' }}
            variant="rectangular"
            width={"100%"}
            height={400}
            style={{
              borderRadius : '10px'
            }}
            />
          </div>
        </SwiperSlide>
      </Swiper>
    ) : (
      <div>
      <Swiper
      slidesPerView={4}
      spaceBetween={10}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination]}
      className="fp"
      >
        {
          data && data.length > 0 && data.map((item)=>(
            <SwiperSlide key={item.id} onClick={()=>{navigate(`/hotels/${item.id}`)}}>
            <div className="fpItem" key={item.id}>
              <img
                src={item.Images.length > 0 ? item.Images[0].filename : "https://cf.bstatic.com/xdata/images/hotel/max1280x900/215955381.jpg?k=ff739d1d9e0c8e233f78ee3ced82743ef0355e925df8db7135d83b55a00ca07a&o=&hp=1"}
                alt=""
                className="fpImg"
              />
              <div className="descHotelItem">
                <span className="fpName">{item.name}</span>
                <span className="fpCity">{item.Address.province}</span>
                <Rating name="half-rating-read" defaultValue={item.numStars} precision={0.5} readOnly style={{fontSize : '13px'}} />
                <div className="fpRating">
                  <button>9.3</button>
                  <span>Xuất sắc</span>
                </div>
                <div style={{
                  display: 'flex',
                  gap : '5px',
                  alignItems : 'center',
                  justifyContent : 'flex-end',
                  marginTop : '20px'
                }}>
                  <span style={{fontSize : '12px', color : 'rgb(159, 157, 157)'}}>Bắt đầu từ</span>
                  <span style={{fontSize : '15px', fontWeight : '700'}}>VND {(item.Rooms[0]?.PriceRooms[0]?.price)?.toLocaleString('en-US')}</span>
                </div>
              </div>
            </div>
          </SwiperSlide>
          ))
        }
      </Swiper>
      </div>
    )}
    </div>
  );
};

export default FeaturedProperties;
