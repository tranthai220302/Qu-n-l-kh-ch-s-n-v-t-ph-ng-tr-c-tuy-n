import Featured from "../../../compoments/customer/featured/Featured";
import FeaturedProperties from "../../../compoments/customer/featuredProperties/FeaturedProperties";
import Footer from "../../../compoments/customer/footer/Footer";
import Header from "../../../compoments/customer/header/Header";
import MailList from "../../../compoments/customer/mailList/MailList";
import Navbar from "../../../compoments/customer/navbar/Navbar";
import PropertyList from "../../../compoments/customer/propertyList/PropertyList";
import "./home.css";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header/>
      <div className="homeContainer">
        <Featured/>
        <h1 className="homeTitle">Browse by property type</h1>
        <PropertyList/>
        <h1 className="homeTitle">Homes guests love</h1>
        <FeaturedProperties/>
        <MailList/>
        <Footer/>
      </div>
    </div>
  );
};

export default Home;
