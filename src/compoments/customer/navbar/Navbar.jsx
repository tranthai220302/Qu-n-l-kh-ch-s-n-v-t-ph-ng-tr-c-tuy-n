import "./navbar.css"
import { useNavigate } from "react-router-dom"
import logo from './logo.png'
import Button from '@mui/material/Button';
const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="navbar">
      <div className="navContainer">
        <span className="logo" onClick={()=>{navigate('/')}}><img style={{height: 50}} src={logo}></img></span>
        <div className="navItems">
        <Button  style={{textTransform: 'none', color: 'white'}}>Đăng khách sạn của quý vị</Button>
        <Button variant="outlined" style={{backgroundColor: 'white', marginRight: '20px',marginLeft: '20px', textTransform: 'none'}} onClick={()=>{navigate('/login')}}>Đăng nhập</Button>
        <Button variant="outlined" style={{backgroundColor: 'white', textTransform: 'none'}} onClick={()=>{navigate('/register')}}>Đăng ký</Button>
        </div>
      </div>
    </div>
  )
}

export default Navbar