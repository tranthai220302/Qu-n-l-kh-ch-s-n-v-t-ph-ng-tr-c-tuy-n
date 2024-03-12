import "./propertyList.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { getData } from "../../../ults/getData";
import { useEffect, useState } from "react";
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
const PropertyList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const [numRoom, setNumRoom] = useState([])
  useEffect(() => {
    const fetchData = async () => {
        try {
            const result = await getData('/category', setIsLoading, setError);
            if (result !== "loi") {
                setData(result?.data);
                setNumRoom(result?.numRoom);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchData();
  }, []);

  return (
    <div className="containerProperties">
      {
        isLoading ? <h1 className="homeTitle"><Skeleton width={'20%'} style={{marginBottom: '30px', textAlign : 'left', marginLeft : 0}}/></h1> : <h1 className="homeTitle" style={{marginBottom: '30px'}}>Các thể loại phòng</h1>
      }
      {
        isLoading ? <h1 className="homeTitle"><Skeleton width={'30%'} style={{marginBottom: '30px', textAlign : 'left', marginLeft : 0}}/></h1> : <div className="title" style={{textAlign : 'left', width : '100%'}}>Từ biệt thự, lâu đài cho đến nhà thuyền, igloo, chúng tôi đều có hết</div>
      }
      {isLoading ? (
          <Swiper
          slidesPerView={5}
          spaceBetween={20}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="pListItem">
              <Skeleton
                sx={{ bgcolor: 'grey.300' }}
                variant="rectangular"
                width={180}
                height={150}
                style={{
                  borderRadius : '10px'
                }}
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="pListItem">
              <Skeleton
                sx={{ bgcolor: 'grey.300' }}
                variant="rectangular"
                width={180}
                height={150}
                style={{
                  borderRadius : '10px'
                }}
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="pListItem">
              <Skeleton
                sx={{ bgcolor: 'grey.300' }}
                variant="rectangular"
                width={180}
                height={150}
                style={{
                  borderRadius : '10px'
                }}
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="pListItem">
              <Skeleton
                sx={{ bgcolor: 'grey.300' }}
                variant="rectangular"
                width={180}
                height={150}
                style={{
                  borderRadius : '10px'
                }}
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="pListItem">
              <Skeleton
                sx={{ bgcolor: 'grey.300' }}
                variant="rectangular"
                width={180}
                height={150}
                style={{
                  borderRadius : '10px'
                }}
              />
            </div>
          </SwiperSlide>
        </Swiper>
      ) : (
        <Swiper
        slidesPerView={5}
        spaceBetween={20}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {data && data.map((item,i)=>(
          <SwiperSlide key={item.id}>
            <div className="pListItem">
              <img
                src={item.img}
                alt=""
                className="pListImg"
              />
              <div className="pListTitles">
                <h1>{item.name}</h1>
                <h2>{numRoom[i]} phòng</h2>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      )}
    </div>
  );
};

export default PropertyList;
