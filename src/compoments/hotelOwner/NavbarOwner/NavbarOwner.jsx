import "./NavbarOwner.css"
import { useNavigate } from "react-router-dom"
import Button from '@mui/material/Button';
import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import VillaIcon from '@mui/icons-material/Villa';
import FavoriteIcon from '@mui/icons-material/Favorite';
import * as React from 'react';
import newRequest from "../../../ults/newRequest";
import LinearWithValueLabel from "../../linear/Linear";
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import BarChartIcon from '@mui/icons-material/BarChart';
import RateReviewIcon from '@mui/icons-material/RateReview';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import DataThresholdingIcon from '@mui/icons-material/DataThresholding';
import DirectionsIcon from '@mui/icons-material/Directions';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
const NavbarOwner = ({user, setUser, type, newValue}) => {
  const [value, setValue] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleProfile = () => {
    setAnchorEl(null);
    navigate('/profile')
  };
  const handleRoomBook = () => {
    setAnchorEl(null);
    navigate('/roomBooking')
  };
  const handleHotel = () => {
    setAnchorEl(null);
    navigate('/hotelFavourite')
  };
  const currentUser = JSON.parse(localStorage.getItem('currentUser')) ? JSON.parse(localStorage.getItem('currentUser')) : null;
  const navigate = useNavigate();
  const handleLogout = () =>{
    setIsLoading(true)
    newRequest.post('/auth/logout').then((res)=>{
      localStorage.removeItem('currentUser')
      setIsLoading(false);
      setError(null);
      console.log(res.data)
      navigate('/')
    }).catch((error)=>{
      setError(error)
      console.log(error)
    })
    setAnchorEl(null);
  }
  return (
    <div className="navbarOwner">
      <div  style={{position: 'absolute', top : '0', width :'100%'}}>
        {isLoading && <LinearWithValueLabel isLoading={isLoading}/>}
      </div>
      <div className="navContainer">
        <span className="logo" onClick={()=>{navigate('/hotelAdmin')}}>HaruAdmin</span>
        <div className="navItems">
        <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 330 }}
            >
            <IconButton sx={{ p: '10px' }} aria-label="menu">
                <MenuIcon />
            </IconButton>
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Tìm khách sạn"
                inputProps={{ 'aria-label': 'search google maps' }}
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
            </IconButton>
            </Paper>
        {
          currentUser ? (
            <div>
              <React.Fragment>
                <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                  <Tooltip title="Tài khoản">
                    <IconButton
                      onClick={handleClick}
                      size="small"
                      sx={{ ml: 2 }}
                      aria-controls={open ? 'account-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}
                    >
                     <Avatar style={{textAlign: 'center'}} alt="Remy Sharp" src={currentUser.avatar ? currentUser.avatar : "https://as2.ftcdn.net/v2/jpg/03/31/69/91/1000_F_331699188_lRpvqxO5QRtwOM05gR50ImaaJgBx68vi.jpg"} />
                    </IconButton>
                  </Tooltip>
                </Box>
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                      mt: 1.5,
                      '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      '&::before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <MenuItem onClick={handleProfile}>
                    <Avatar /> Tài khoản của tôi
                  </MenuItem>
                  <MenuItem onClick={handleRoomBook}>
                    <Avatar><VillaIcon/></Avatar> Phòng đã đặt
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleHotel}>
                    <ListItemIcon>
                      <FavoriteIcon fontSize="small"/>
                    </ListItemIcon>
                    Đã lưu
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Đăng xuất
                  </MenuItem>
                </Menu>
              </React.Fragment> 
            </div>
          ) : (
            <div>
              <Button variant="outlined" style={{backgroundColor: 'white', marginRight: '20px',marginLeft: '20px', textTransform: 'none'}} onClick={()=>{navigate('/login')}}>Đăng nhập</Button>
              <Button variant="outlined" style={{backgroundColor: 'white', textTransform: 'none'}} onClick={()=>{navigate('/register')}}>Đăng ký</Button>
            </div>
          )
        }
        </div>
      </div>
      <Tabs value={newValue}  centered sx={{display: 'flex', alignItems: 'center'}}>
        <Tab label="Trang chủ nhóm chỗ nghỉ" sx={{color: 'white', fontWeight: '500', textTransform: 'capitalize'}} onClick={()=>{navigate('/hotelAdmin')}}/>
        <Tab label="Thống kê doanh số" sx={{color: 'white', fontWeight: '500', textTransform: 'capitalize'}} onClick={()=>{navigate('/hotelAdmin/revenue')}}/>
        <Tab label="Đánh giá" sx={{color: 'white', fontWeight: '500', textTransform: 'capitalize'}} onClick={()=>{navigate('/hotelAdmin/review')}}/>  
        <Tab label="Câu hỏi Khách hàng" sx={{color: 'white', fontWeight: '500', textTransform: 'capitalize'}} onClick={()=>{navigate('/hotelAdmin/question')}}/>
        <Tab label="Chỉnh sửa đồng loạt" sx={{color: 'white', fontWeight: '500', textTransform: 'capitalize'}} />
        <DataThresholdingIcon sx={{marginTop : '10px', marginRight : '-10px', color: 'white'}}/>
        <Tab label="Dữ liệu thị trường" sx={{color: 'white', fontWeight: '500', textTransform: 'capitalize'}} />
      </Tabs>
    </div>
  )
}

export default NavbarOwner