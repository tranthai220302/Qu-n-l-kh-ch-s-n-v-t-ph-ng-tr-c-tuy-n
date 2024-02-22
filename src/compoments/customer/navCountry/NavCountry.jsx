import React from 'react'
import './NavCountry.css'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
const NavCountry = () => {
  return (
    <div className='navCountryContainer'>
        <span>Trang chủ</span>
        <ChevronRightIcon  className='iconNav'/>
        <span>Việt Nam</span>
        <ChevronRightIcon  className='iconNav'/>
        <span>Quảng Ninh</span>
        <ChevronRightIcon  className='iconNav'/>
        <span>Hạ Long</span>
        <ChevronRightIcon  className='iconNav'/>
        <span>Tìm kiếm</span>
    </div>
  )
}

export default NavCountry