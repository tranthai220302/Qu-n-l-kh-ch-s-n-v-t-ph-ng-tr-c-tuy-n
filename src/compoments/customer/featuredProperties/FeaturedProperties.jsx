import "./featuredProperties.css";
import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Pagination, Navigation } from 'swiper/modules';
const FeaturedProperties = () => {
  return (
    <>
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
            <img
              src="https://cf.bstatic.com/xdata/images/hotel/square600/13125860.webp?k=e148feeb802ac3d28d1391dad9e4cf1e12d9231f897d0b53ca067bde8a9d3355&o=&s=1"
              alt=""
              className="fpImg"
            />
            <span className="fpName">Aparthotel Stare Miasto</span>
            <span className="fpCity">Madrid</span>
            <span className="fpPrice">Starting from $120</span>
            <div className="fpRating">
              <button>8.9</button>
              <span>Excellent</span>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="fpItem">
            <img
              src="https://cf.bstatic.com/xdata/images/hotel/max1280x900/215955381.jpg?k=ff739d1d9e0c8e233f78ee3ced82743ef0355e925df8db7135d83b55a00ca07a&o=&hp=1"
              alt=""
              className="fpImg"
            />
            <span className="fpName">Comfort Suites Airport</span>
            <span className="fpCity">Austin</span>
            <span className="fpPrice">Starting from $140</span>
            <div className="fpRating">
              <button>9.3</button>
              <span>Exceptional</span>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="fpItem">
            <img
              src="https://kfa.vn/wp-content/uploads/2021/01/thiet-ke-phong-nha-nghi-2-1.jpg"
              alt=""
              className="fpImg"
            />
            <span className="fpName">Four Seasons Hotel</span>
            <span className="fpCity">Lisbon</span>
            <span className="fpPrice">Starting from $99</span>
            <div className="fpRating">
              <button>8.8</button>
              <span>Excellent</span>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="fpItem">
            <img
              src="https://noithatanhung.vn/uploads/images/bai-viet/pham-thuy/thang-8/8-thang8/hinh-anh-giuong-ngu-dep-2-.jpg"
              alt=""
              className="fpImg"
            />
            <span className="fpName">Hilton Garden Inn</span>
            <span className="fpCity">Berlin</span>
            <span className="fpPrice">Starting from $105</span>
            <div className="fpRating">
              <button>8.9</button>
              <span>Excellent</span>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="fpItem">
            <img
              src="https://cf.bstatic.com/xdata/images/hotel/max1280x900/215955381.jpg?k=ff739d1d9e0c8e233f78ee3ced82743ef0355e925df8db7135d83b55a00ca07a&o=&hp=1"
              alt=""
              className="fpImg"
            />
            <span className="fpName">Comfort Suites Airport</span>
            <span className="fpCity">Austin</span>
            <span className="fpPrice">Starting from $140</span>
            <div className="fpRating">
              <button>9.3</button>
              <span>Exceptional</span>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="fpItem">
            <img
              src="https://cf.bstatic.com/xdata/images/hotel/max1280x900/215955381.jpg?k=ff739d1d9e0c8e233f78ee3ced82743ef0355e925df8db7135d83b55a00ca07a&o=&hp=1"
              alt=""
              className="fpImg"
            />
            <span className="fpName">Comfort Suites Airport</span>
            <span className="fpCity">Austin</span>
            <span className="fpPrice">Starting from $140</span>
            <div className="fpRating">
              <button>9.3</button>
              <span>Exceptional</span>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default FeaturedProperties;
