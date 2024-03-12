import Home from "./pages/admin/home/Home";
import Login from "./pages/admin/login/Login";
import List from "./pages/admin/list/List";
import ListCustomer from "./pages/customers/list/List";
import Single from "./pages/admin/single/Single";
import HomeCustomer from "./pages/customers/home/Home";
import New from "./pages/admin/new/New";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
function App() {
  const { darkMode } = useContext(DarkModeContext);
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('currentUser');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  }, [user]);
  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/admin">
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="users">
              <Route index element={<List />} />
              <Route path=":userId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={userInputs} title="Add New User" />}
              />
            </Route>
            <Route path="products">
              <Route index element={<List />} />
              <Route path=":productId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={productInputs} title="Add New Product" />}
              />
            </Route>
          </Route>
            <Route path="/hotelAdmin">
              <Route index element={<HomeHotel />} />
              <Route path="revenue" element={<Revenue />} />
              <Route path="addHotel" element={<AddHotel />} >
              </Route>
              <Route path="inforHotel" element={<InforHotel />} />
              <Route path="review" element={<ReviewOwner />} />
              <Route path="question" element={<QuestionOwner />} />
              {/*<Route path="users">
                <Route index element={<List />} />
                <Route path=":userId" element={<Single />} />
                <Route
                  path="new"
                  element={<New inputs={userInputs} title="Add New User" />}
                />
              </Route>
              <Route path="products">
                <Route index element={<List />} />
                <Route path=":productId" element={<Single />} />
                <Route
                  path="new"
                  element={<New inputs={productInputs} title="Add New Product" />}
                />
              </Route> */}
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
