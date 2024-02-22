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
import { useState } from "react";
import RoomEmpty from "../../../compoments/customer/RoomEmpty/RoomEmpty";
import Review from "../../../compoments/customer/review/Review";
import Question from "../../../compoments/customer/question/Question";
import Services from "../../../compoments/customer/services/Services";
import Rule from "../../../compoments/customer/rule/Rule";
import QuestionUsually from "../../../compoments/customer/questionUsually/QuestionUsually";
import { useRef } from "react";
const Hotel = () => {
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const roomEmptyRef = useRef(null);
  const handleBookNowClick = () => {
    roomEmptyRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  const photos = [
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707778.jpg?k=56ba0babbcbbfeb3d3e911728831dcbc390ed2cb16c51d88159f82bf751d04c6&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707367.jpg?k=cbacfdeb8404af56a1a94812575d96f6b80f6740fd491d02c6fc3912a16d8757&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708745.jpg?k=1aae4678d645c63e0d90cdae8127b15f1e3232d4739bdf387a6578dc3b14bdfd&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707776.jpg?k=054bb3e27c9e58d3bb1110349eb5e6e24dacd53fbb0316b9e2519b2bf3c520ae&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708693.jpg?k=ea210b4fa329fe302eab55dd9818c0571afba2abd2225ca3a36457f9afa74e94&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707389.jpg?k=52156673f9eb6d5d99d3eed9386491a0465ce6f3b995f005ac71abc192dd5827&o=&hp=1",
    },
  ];

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

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="hotelContainer">
        {open && (
          <div className="slider">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="close"
              onClick={() => setOpen(false)}
            />
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              className="arrow"
              onClick={() => handleMove("l")}
            />
            <div className="sliderWrapper">
              <img src={photos[slideNumber].src} alt="" className="sliderImg" />
            </div>
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="arrow"
              onClick={() => handleMove("r")}
            />
          </div>
        )}
        <div className="hotelWrapper">
          <button className="bookNow" onClick={handleBookNowClick}>Reserve or Book Now!</button>
          <h1 className="hotelTitle">Tower Street Apartments</h1>
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>Elton St 125 New york</span>
          </div>
          <span className="hotelDistance">
            Excellent location – 500m from center
          </span>
          <span className="hotelPriceHighlight">
            Book a stay over $114 at this property and get a free airport taxi
          </span>
          <div className="hotelImages">
            {photos.map((photo, i) => (
              <div className="hotelImgWrapper" key={i}>
                <img
                  onClick={() => handleOpen(i)}
                  src={photo.src}
                  alt=""
                  className="hotelImg"
                />
              </div>
            ))}
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <p className="hotelDesc">
              Tọa lạc ở Hạ Long, cách Bãi Cháy 7 phút đi bộ, Sunland Halong Hotel and Restaurant cung cấp chỗ nghỉ có hồ bơi ngoài trời, chỗ đậu xe riêng miễn phí, khu vườn và phòng chờ chung. Chỗ nghỉ này có các tiện nghi như sân hiên, nhà hàng và quầy bar. Chỗ nghỉ cung cấp lễ tân 24/24, dịch vụ đưa đón sân bay, bếp chung và Wi-Fi miễn phí ở toàn bộ chỗ nghỉ.

              Các phòng tại khách sạn được trang bị điều hòa, khu vực ghế ngồi, TV màn hình phẳng có truyền hình vệ tinh, két an toàn, phòng tắm riêng, vòi xịt/chậu rửa vệ sinh, đồ vệ sinh cá nhân miễn phí và máy sấy tóc. Tất cả các phòng có ấm đun nước, trong đó một số phòng có ban công và một số khác thì nhìn ra thành phố. Tại Sunland Halong Hotel and Restaurant, tất cả các phòng đều được thiết kế có ga trải giường và khăn tắm.

              Hằng ngày, chỗ nghỉ có các lựa chọn thực đơn buffet, thực đơn à la carte hoặc kiểu lục địa cho bữa sáng.

              Chỗ nghỉ có BBQ.

              Sunland Halong Hotel and Restaurant cách Cáp treo Nữ Hoàng 1.8 km và Trung tâm thương mại Vincom Hạ Long 8.4 km. Sân bay gần nhất là Sân bay Quốc tế Cát Bi, cách khách sạn 42 km.

              Các cặp đôi đặc biệt thích địa điểm này — họ cho điểm 8,8 cho kỳ nghỉ dành cho 2 người.
              </p>
              <h4>Các tiện nghi được yêu chuộng nhất</h4>
              <ul className="services">
                <li className="servicesItem">
                  <PoolIcon  style={{color: 'rgb(83, 196, 83)'}} />
                  <p>Hồ bơi ngoài trời</p>
                </li>
                <li className="servicesItem">
                  <PoolIcon style={{color: 'rgb(83, 196, 83)'}} />
                  <p>Hồ bơi ngoài trời</p>
                </li>
                <li className="servicesItem">
                  <PoolIcon style={{color: 'rgb(83, 196, 83)'}} />
                  <p>Hồ bơi ngoài trời</p>
                </li>
                <li className="servicesItem">
                  <PoolIcon style={{color: 'rgb(83, 196, 83)'}} />
                  <p>Hồ bơi ngoài trời</p>
                </li>
                <li className="servicesItem">
                  <PoolIcon style={{color: 'rgb(83, 196, 83)'}} />
                  <p>Hồ bơi ngoài trời</p>
                </li>
                <li className="servicesItem">
                  <PoolIcon style={{color: 'rgb(83, 196, 83)'}} />
                  <p>Hồ bơi ngoài trời</p>
                </li>
                <li className="servicesItem">
                  <PoolIcon style={{color: 'rgb(83, 196, 83)'}} />
                  <p>Hồ bơi ngoài trời</p>
                </li>
                <li className="servicesItem">
                  <PoolIcon style={{color: 'rgb(83, 196, 83)'}} />
                  <p>Hồ bơi ngoài trời</p>
                </li>
                <li className="servicesItem">
                  <PoolIcon style={{color: 'rgb(83, 196, 83)'}} />
                  <p>Hồ bơi ngoài trời</p>
                </li>
              </ul>
            </div>
            <div className="hotelDetailsPrice">
              <h1>Perfect for a 9-night stay!</h1>
              <span>
                Located in the real heart of Krakow, this property has an
                excellent location score of 9.8!
              </span>
              <h2>
                <b>$945</b> (9 nights)
              </h2>
              <button onClick={handleBookNowClick}>Reserve or Book Now!</button>
            </div>
          </div>
        </div>
        <div ref={roomEmptyRef}>
        <RoomEmpty />
        </div>
        <Review/>
        <Question />
        <Services/>
        <Rule/>
        <QuestionUsually />
        <h2 className="homeTitle">Các phòng khác của khách sạn</h2>
        <FeaturedProperties/>
      </div>
      <MailList />
      <Footer />

    </div>
  );
};

export default Hotel;
