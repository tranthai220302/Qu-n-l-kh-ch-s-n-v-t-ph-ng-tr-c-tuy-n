import Home from "./pages/admin/home/Home";
import Login from "./pages/admin/login/Login";
import List from "./pages/admin/list/List";
import ListCustomer from "./pages/customers/list/List";
import Single from "./pages/admin/single/Single";
import HomeCustomer from "./pages/customers/home/Home";
import New from "./pages/admin/new/New";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.css";
import { useContext, useEffect, useState } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import Hotel from "./pages/customers/hotel/Hotel";
import LoginCustomer from "./pages/customers/login/Login";
import RegisterCustomer from "./pages/customers/register/Register";
import Profile from "./pages/customers/profile/Profile";
import BookRoom from "./pages/customers/bookRoom/BookRoom";
import PaymentSuccess from "./pages/customers/paymetSuccess/PaymentSuccess";
import RoomBooking from "./pages/customers/room/RoomBooking";
import HotelFavourite from "./pages/customers/hotelFavourite/HotelFavourite";
import HomeHotel from "./pages/hotelOwner/HomeHotel";
import Revenue from "./pages/hotelOwner/revenue/Revenue";
import AddHotel from "./pages/hotelOwner/addHotel/AddHotel";
import InforHotel from "./pages/hotelOwner/addHotel/inforHotel/InforHotel";
import ReviewOwner from "./pages/hotelOwner/reviewOwner/ReviewOwner";
import QuestionOwner from "./pages/hotelOwner/questionOwner/QuestionOwner";
import LoginOwner from "./pages/hotelOwner/login/LoginOwner";
import RegisterOwner from "./pages/hotelOwner/register/Register";
import HotelAdmin from "./pages/admin/hotel/HotelAdmin";
import HotelOwner from "./pages/admin/hotelOwner/HotelOwner";
import Service from "./pages/admin/service/Service";
import Item from "./pages/admin/item/Item";
import { useNavigate } from "react-router-dom";
function App() {
  const { darkMode } = useContext(DarkModeContext);
  const [loggedInUser, setLoggedInUser] = useState(JSON.parse(localStorage.getItem('currentUser')));
  const checkAccess = (user, allowedRoles) => {
    return user && allowedRoles.includes(user.idRole);
  }
  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/admin">
            <Route index element={
            loggedInUser?.idRole == 3 ? (
                <Home/>
              ) : loggedInUser?.idRole == 2 ? (
                <Navigate to="/hotelAdmin" />
              ) : (
                <Navigate to="/" />
              )
            } />
            <Route path="login" element={<Login />} />
            <Route path="hotelowner" element={<HotelOwner />} />
            <Route path="service" element={<Service />} />
            <Route path="item" element={<Item />} />
            <Route path="users">
              <Route index element={<List />} />
              <Route path=":userId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={userInputs} title="Add New User" />}
              />
            </Route>
            <Route path="hotels">
              <Route index element={<HotelAdmin />} />
              <Route path=":productId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={productInputs} title="Add New Product" />}
              />
            </Route>
          </Route>
            <Route path="/hotelAdmin" element={
              loggedInUser?.idRole == 3 ? (
                <Navigate to="/admin" />
              ) : loggedInUser?.idRole == 2 ? (
                <HomeHotel/>
              ) : (
                <Navigate to="/" />
              )
            }>
              <Route path="revenue" element={<Revenue />} />
              <Route path="addHotel" element={<AddHotel />} >
              </Route>
              <Route path="inforHotel" element={<InforHotel />} />
              <Route path="review" element={<ReviewOwner />} />
              <Route path="question" element={<QuestionOwner />} />
            </Route>
            <Route path="loginOwner" element={<LoginOwner />} />
            <Route path="registerOwner" element={<RegisterOwner />} />
            <Route path="/" element={<HomeCustomer />} />
            <Route path="/hotels" element={<ListCustomer />} />
            <Route path="/hotels/:id" element={<Hotel />} />
            <Route path="/login" element={<LoginCustomer />} />
            <Route path="/register" element={<RegisterCustomer />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/bookRoom/:id" element={<BookRoom />} />
            <Route path="/payment/succees/:id" element={<PaymentSuccess />} />
            <Route path="/roomBooking" element={<RoomBooking />} />
            <Route path="/hotelFavourite" element={<HotelFavourite />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
