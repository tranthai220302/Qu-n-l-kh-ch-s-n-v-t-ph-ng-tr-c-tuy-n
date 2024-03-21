import "./navbar.css"
import { useNavigate } from "react-router-dom"
import logo from './logo.png'
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
const Navbar = ({user, setUser}) => {
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
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(()=>{
    setCurrentUser(JSON.parse(localStorage.getItem('currentUser')))
  },[])
  const navigate = useNavigate();
  const handleLogout = () =>{
    setIsLoading(true)
    newRequest.post('/auth/logout').then((res)=>{
      localStorage.removeItem('currentUser')
      setIsLoading(false);
      setError(null);
      console.log(res.data)
      setCurrentUser(null)
      setUser(null)
    }).catch((error)=>{
      setError(error)
      console.log(error)
    })
    setAnchorEl(null);
  }
  return (
    <div className="navbar">
      <div  style={{position: 'absolute', top : '0', width :'100%'}}>
        {isLoading && <LinearWithValueLabel isLoading={isLoading}/>}
      </div>
      <div className="navContainer">
        <span className="logo" onClick={()=>{navigate('/')}}>HaruBooking</span>
        <div className="navItems">
        <Button  style={{textTransform: 'none', color: 'white', border: '1px solid gray', height : '35px'}} onClick={()=>{navigate('/loginOwner')}}>Đăng khách sạn của quý vị</Button>
        {
          currentUser && currentUser.idRole == 1 ? (
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
    </div>
  )
}

export default Navbar