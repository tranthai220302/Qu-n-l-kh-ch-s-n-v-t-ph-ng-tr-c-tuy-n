import React, { useState } from 'react'
import Navbar from '../../../compoments/customer/navbar/Navbar'
import MailList from '../../../compoments/customer/mailList/MailList'
import Footer from '../../../compoments/customer/footer/Footer'
import ListProfile from './listProfile/ListProfile'
import TableProfile from './tableProfile/TableProfile'
import Address from '../../../compoments/address/Address'
import './Profile.css'
import ChangePass from './ChangePass/ChangePass'
import Payment from './Payment/Payment'
const Profile = () => {
  const [open, setOpen] = useState(0)
  return (
    <div className='container'>
        <Navbar />
        <div className="profile">
            <ListProfile setOpen = {setOpen}/>
            {open == 0 && <TableProfile/>}
            {open == 1 && <ChangePass />}
            {open == 2 && <Payment />}
        </div>
        <MailList />
        <Footer />
    </div>
  )
}

export default Profile
