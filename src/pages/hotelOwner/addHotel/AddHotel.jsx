import React from 'react'
import NavbarOwner from '../../../compoments/hotelOwner/NavbarOwner/NavbarOwner'
import MailList from '../../../compoments/customer/mailList/MailList'
import Footer from '../../../compoments/customer/footer/Footer'
import './AddHotel.css'
import { Button, Paper } from '@mui/material'
import { useNavigate } from 'react-router-dom'
const AddHotel = () => {
  const navigate = useNavigate();
  return (
    <div style={{backgroundColor : '#f9f9fa'}}>
        <NavbarOwner type = 'add'/>
        <div className="containerAddHotel">
            <Paper sx={{width : '450px', height : '500px', display: 'flex', flexDirection : 'column', alignItems : 'center', padding : '10px 10px', justifyContent : 'space-around'}}>
                <span>Quý vị đăng</span>
                <img src="https://q.bstatic.com/static/img/join/segmentation/accomm_hotels_main_v2@2x.png" alt="" srcset="" />
                <h2 style={{textAlign : 'center'}}>Một khách sạn nơi khách có thể đặt phòng</h2>
                <span>Quý vị thấy có đúng như chỗ nghỉ của mình không?</span>
                <Button variant='contained' style={{width : '100%', height : '50px'}} onClick={()=>{navigate('/hotelAdmin/inforHotel')}}>Tiếp tục</Button>
                <Button variant='outlined' style={{width : '100%', height : '50px'}}>Không</Button>
            </Paper>
        </div>
        <MailList/>
        <Footer />
    </div>
  )
}

export default AddHotel