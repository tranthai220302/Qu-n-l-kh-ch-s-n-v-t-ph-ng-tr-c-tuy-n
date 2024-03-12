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
import ChatraIntegration from "../../../compoments/customer/Chatra/ChatraIntegration";
import { useEffect, useState } from "react";

const Home = () => {
  const [userCurrent, setCurrentUser] = useState(JSON.parse(localStorage.getItem('currentUser')));
  const [setup1, Setsetup] = useState({
    agentId : "bAhfyZhaKkkGZxdQG",
    buttonPosition: window.innerWidth < 1024 ? 'bl' : 'br' ,
    clientId : userCurrent?.id
  })
  const [setup2, Setsetup2] = useState({
    agentId : "bAhfyZhaKkkGZxdQG",
    buttonPosition: window.innerWidth < 1024 ? 'bl' : 'br' ,
    clientId : 0
  })
  const integration = {
    name : userCurrent?.name,
    email : userCurrent?.email
  }
  console.log(userCurrent)
  return (
    <div className="container">
      <Navbar user = {userCurrent} setUser = {setCurrentUser}/>
      <Header/>
      <div className="homeContainer">
        <h1 className="homeTitle">Ưu đãi</h1>
        <Endow/>
        <Featured/> 
        <PropertyList/>
        <FeaturedProperties/>
        <h1 className="homeTitle">Các điểm đến được chúng tôi ưa thích</h1>
        <Favourite />
      </div>
      <MailList/>
      <Footer/>
      {
        userCurrent ? (
          <ChatraIntegration setup={setup1} integration={integration}/>
        ) : (
          <ChatraIntegration setup={setup2}/>
        )
      }
    </div>

  );
};

export default Home;
