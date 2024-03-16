import "./sidebar.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link, useNavigate } from "react-router-dom";
import { DarkModeContext } from "../../../context/darkModeContext";
import { useContext } from "react";
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import newRequest from "../../../ults/newRequest";
import { useState } from "react";
import Backdrop from '@mui/material/Backdrop';
import { Alert, Button, CircularProgress } from '@mui/material';
const Sidebar = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null)
  const navigate = useNavigate();
  const handleLogout = () =>{
    setIsLoading(true)
    newRequest.post('/auth/logout').then((res)=>{
      localStorage.removeItem('currentUser')
      setIsLoading(false);
      setError(null);
      navigate('/')
    }).catch((error)=>{
      setIsLoading(false)
      setError(error)
      console.log(error)
    })
  }
  const { dispatch } = useContext(DarkModeContext);
  return (
    <div className="sidebar">
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isLoading}
            >
            <CircularProgress color="inherit" />
          </Backdrop>
      <div className="topSideBar">
        <Link to="/admin" style={{ textDecoration: "none" }}>
          <span className="logo">lamadmin</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/admin" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Trang chủ</span>
            </li>
          </Link>
          <p className="title">LISTS</p>
          <Link to="/admin/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Khách hàng</span>
            </li>
          </Link>
          <Link to="/admin/hotels" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Khách sạn</span>
            </li>
          </Link>
          <Link to="/admin/hotelowner" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Chủ khách sạn</span>
            </li>
          </Link>
          <p className="title">Other</p>
          <Link to="/admin/service" style={{ textDecoration: "none" }}>
          <li>
            <SettingsSystemDaydreamOutlinedIcon className="icon" />
            <span>Dịch vụ</span>
          </li>
          </Link>
          <Link to="/admin/item" style={{ textDecoration: "none" }}>
          <li>
            <TurnedInIcon className="icon" />
            <span>Tiện nghi</span>
          </li>
          </Link>
          <li>
            <SettingsApplicationsIcon className="icon" />
            <span>Cài đặt</span>
          </li>
          <p className="title">USER</p>
          <Link to="/admin/users/new" style={{ textDecoration: "none" }}>
          <li>
          <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
          </li>
          </Link>
          <li onClick={()=>{handleLogout()}}>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
