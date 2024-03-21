import "./hotel.css";
import Navbar from "../../../compoments/customer/navbar/Navbar";
import Header from "../../../compoments/customer/header/Header";
import MailList from "../../../compoments/customer/mailList/MailList";
import Footer from "../../../compoments/customer/footer/Footer";
import PoolIcon from '@mui/icons-material/Pool';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Favourite from "../../../compoments/customer/addressFavourite/Favourite";
import FeaturedProperties from "../../../compoments/customer/featuredProperties/FeaturedProperties";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import RoomEmpty from "../../../compoments/customer/RoomEmpty/RoomEmpty";
import Review from "../../../compoments/customer/review/Review";
import Question from "../../../compoments/customer/question/Question";
import Services from "../../../compoments/customer/services/Services";
import Rule from "../../../compoments/customer/rule/Rule";
import QuestionUsually from "../../../compoments/customer/questionUsually/QuestionUsually";
import { useRef } from "react";
import { useParams } from 'react-router-dom';
import newRequest from "../../../ults/newRequest";
import Skeleton from '@mui/material/Skeleton';
import Rating from '@mui/material/Rating';
import ModalImg from "./ModalImg/ModalImg";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Hotel = () => {
  const { id } = useParams();
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const roomEmptyRef = useRef(null);
  const revieeRef = useRef(null);
  const questionRef = useRef(null);
  const ruleRef = useRef(null);
  const itemRef = useRef(null);
  const endRef = useRef(null);
  const homeRef = useRef(null)
  const [value, setValue] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleBookNowClick = () => {
    roomEmptyRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  const handleReviewClick = () => {
    revieeRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber)
  };
  const getData = () =>{
    setIsLoading(true);
    newRequest.get(`/hotel/${id}`).then((res)=>{
      setIsLoading(false);
      setError(false);
      setData(res.data)
      console.log(res.data);
    }).catch((error)=>{
      setIsLoading(false);
      setError(error.response.data);
      console.log(error.response.data)
    })
  }
  useEffect(()=>{
    getData();
  }, [])
  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="hotelContainer">
          <div className={isScrolled ? 'headerBookY' : 'headerBook1'}>
            <Box >
              <Box >
                <Tabs value={value} onChange={handleChange} >
                  <div style={{display: 'flex', gap: '15px', borderBottom : 0, width: '100%', padding: '0 20px'}}>
                  <Tab label="Tổng quan"  onClick={()=>{homeRef.current.scrollIntoView({behavior : 'smooth'})}} style={{ textTransform: 'none', fontWeight : '500' }}/>
                  <Tab label="Thông tin và giá" onClick={handleBookNowClick} style={{ textTransform: 'none', fontWeight : '500' }}/>
                  <Tab label="Đánh giá khách hàng" onClick={handleReviewClick} style={{ textTransform: 'none', fontWeight : '500' }}/>
                  <Tab label="Đặt câu hỏi"  onClick={()=>{questionRef.current.scrollIntoView({ behavior: 'smooth' });}} style={{ textTransform: 'none', fontWeight : '500' }}/>
                  <Tab label="Tiện nghi"  onClick={()=>{itemRef.current.scrollIntoView({behavior : 'smooth'})}} style={{ textTransform: 'none', fontWeight : '500' }}/>
                  <Tab label="Quy tắc chung" onClick={()=>{ruleRef.current.scrollIntoView({behavior : 'smooth'})}} style={{ textTransform: 'none', fontWeight : '500' }}/>
                  <Tab label="Khách sạn khác"  onClick={()=>{endRef.current.scrollIntoView({behavior : 'smooth'})}} style={{ textTransform: 'none', fontWeight : '500' }}/>
                  </div>
                </Tabs>
              </Box>
            </Box>
            </div>
        {
          isLoading && (
            <div className="hotelWrapper">
            <h1 className="hotelTitle"><Skeleton width={'40%'} height={40} /></h1>
            <div className="hotelAddress">
              <Skeleton width={'20%'} height={20} />
            </div>
            <span className="hotelDistance">
              <Skeleton width={'20%'} height={20} />
            </span>
            <span className="hotelPriceHighlight">
              <Skeleton width={'40%'} height={20} />
            </span>
            <div className="hotelImages">
                <div className="hotelImgWrapper">
                   <Skeleton  style={{height : '460px', marginTop : '-100px'}}/>
                </div>
                <div className="hotelImgWrapper">
                   <Skeleton  style={{height : '460px', marginTop : '-100px'}}/>
                </div>
                <div className="hotelImgWrapper">
                   <Skeleton  style={{height : '460px', marginTop : '-100px'}}/>
                </div>
                <div className="hotelImgWrapper">
                   <Skeleton  style={{height : '460px', marginTop : '-180px'}}/>
                </div>
                <div className="hotelImgWrapper">
                   <Skeleton  style={{height : '460px', marginTop : '-180px'}}/>
                </div>
                <div className="hotelImgWrapper">
                   <Skeleton  style={{height : '460px', marginTop : '-180px'}}/>
                </div>
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
              <Skeleton  height={400} style={{marginTop : '-190px'}}/>
                <h4><Skeleton width={'50%'} style={{marginTop : '-80px'}}/></h4>
                <Skeleton  height={200} style={{marginTop : '-50px'}}/>
              </div>
            </div>
          </div>
          )
        }
        {
          !isLoading && !error && data && (
            <div className="hotelWrapper" ref={homeRef}>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <span className="hotelTitle">{data.name} <Rating name="half-rating-read" defaultValue={5} precision={1} readOnly style={{fontSize : '15px', color: 'yellow'}} /></span>
            <button className="bookNow" onClick={handleBookNowClick}>Đặt phòng ngay!</button>
            </div>
            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data.Address.numberHome}, {data.Address.ward}, {data.Address.district}, {data.Address.province}</span>
            </div>
            <span className="hotelDistance">
              Cách trung tâm 500m
            </span>
            <div className="imgContainer">
              <div className="imgTop">
                <div className="imgTopLeft">
                  {data.Images.map((item, i)=>{
                    if(i < 2) return (
                      <img 
                      key = {i}
                      src={item.filename} 
                      alt="" 
                      className="imgSrc"
                    />
                    )
                  })}
                </div>
                <div className="imgTopRight">
                  <img 
                      src={data.Images[2].filename} 
                      alt="" 
                      className="imgSrcRight"
                    />
                </div>
              </div>
              <div className="imgBottom">
                  {data.Images.map((item, i)=>{
                    if(i > 2 && i < 8){
                      return (
                        <img 
                          key = {i}
                          src={item.filename} 
                          alt="" 
                          className="imgSrcBottom"
                        />
                      )
                    }else if(i == 8){
                      return (
                        <div className="plusImg">
                          <img 
                            key = {i}
                            src={item.filename} 
                            alt="" 
                            className="imgSrcBottom1"
                          />
                          <span className="numImgDu"><ModalImg num = {data.Images.length - 9} data = {data.Images}/></span>
                        </div>
                      )
                    }
                  })}
              </div>
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <p className="hotelDesc">
                  {data?.description}
                </p>
                <h4>Các tiện nghi được yêu chuộng nhất</h4>
                <ul className="services">
                  {data.Services.map((item, i)=>(
                    <li className="servicesItem" key={i}>
                      <PoolIcon  style={{color: 'rgb(83, 196, 83)'}} />
                      <p>{item?.name}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="hotelDetailsPrice">
                <h1>Hoàn hảo cho kỳ nghỉ</h1>
                <span>
                Nằm ngay trung tâm , chỗ nghỉ này có điểm vị trí tuyệt vời - 9,8!
                </span>
                <button onClick={handleBookNowClick}>Đặt phòng ngay!</button>
              </div>
            </div>
          </div>
          )
        }
        {!isLoading && error && data &&(
          <div>{error}</div>
        )}
        <div ref={roomEmptyRef}>
        {data && <RoomEmpty data = {data.Rooms} hotel = {data} id = {id}/>}
        </div>
        <div ref = {revieeRef}>
        <Review id = {id}/>
        </div>
        <div ref = {questionRef}>
          <Question id = {id}/>
        </div>
        <div ref = {itemRef}>
          <Services id = {id}/>
        </div>
        <div ref={ruleRef}>
          <Rule id = {id}/>
        </div>
        <h2 className="homeTitle" ref={endRef}>Các phòng khác của khách sạn</h2>
        <FeaturedProperties/>
      </div>
      <MailList />
      <Footer />

    </div>
  );
};

export default Hotel;
