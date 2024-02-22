import Featured from "../../../compoments/customer/featured/Featured";
import FeaturedProperties from "../../../compoments/customer/featuredProperties/FeaturedProperties";
import Footer from "../../../compoments/customer/footer/Footer";
import Header from "../../../compoments/customer/header/Header";
import MailList from "../../../compoments/customer/mailList/MailList";
import Navbar from "../../../compoments/customer/navbar/Navbar";
import PropertyList from "../../../compoments/customer/propertyList/PropertyList";
import Endow from "../../../compoments/customer/endow/Endow";
import Favourite from "../../../compoments/customer/addressFavourite/Favourite";
import "./home.css";

const Home = () => {
  return (
    <div className="container">
      <Navbar />
      <Header/>
      <div className="homeContainer">
        <h1 className="homeTitle">Ưu đãi</h1>
        <Endow/>
        <h1 className="homeTitle">Địa điểm đang thịnh hành</h1>
        <Featured/>
        <h1 className="homeTitle">Tìm theo loại chỗ nghỉ</h1>
        <PropertyList/>
        <h1 className="homeTitle">Khách sạn yêu thích</h1>
        <FeaturedProperties/>
        <h1 className="homeTitle">Các điểm đến được chúng tôi ưa thích</h1>
        <Favourite />
      </div>
      <MailList/>
      <Footer/>
    </div>

  );
};

export default Home;
