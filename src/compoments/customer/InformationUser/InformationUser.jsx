import React, { useEffect, useState } from 'react'
import './InformationUser.css'
import { Stack } from '@mui/material'
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import Address from '../../address/Address';
import PhoneIcon from '@mui/icons-material/Phone';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import NativeSelect from '@mui/material/NativeSelect';
import FormLabel from '@mui/material/FormLabel';
import AddressInfor from '../../address/AddressInfor';
const InformationUser = ({inforUser, setInforUser, address, setAddress}) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('currentUser')));
  const [oke, setOke] = useState(false)
  const handleChange = (e) =>{
    setInforUser((prev)=>(
        {
            ...prev,
            [e.target.name] : e.target.value
        }
    ))
  }
  console.log(address)
  return (
    <div className='containerInfor'>
        <Stack spacing={3}>
            <span className='titleInfor'>Nhập thông tin chi tiết</span>
            <div className="inputInfor">
                <FormControl variant="standard" sx={{width : '45%'}}>
                    <InputLabel htmlFor="input-with-icon-adornment">
                    Tên
                    </InputLabel>
                    <Input
                    id="input-with-icon-adornment"
                    defaultValue={inforUser.name}
                    name = 'name'
                    onChange={(e)=>{handleChange(e)}}
                    startAdornment={
                        <InputAdornment position="start">
                        <AccountCircle />
                        </InputAdornment>
                    }
                    />
                </FormControl>
                <FormControl sx={{width : '45%'}}>
                    <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    Giới tính
                    </InputLabel>
                    <NativeSelect
                    defaultValue={inforUser.genDer}
                    inputProps={{
                        id: 'uncontrolled-native',
                    }}
                    name='genDer'
                    onChange={(e)=>{handleChange(e)}}
                    >
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                    </NativeSelect>
                </FormControl>
                <FormControl variant="standard" sx={{width : '45%'}}>
                    <InputLabel htmlFor="input-with-icon-adornment">
                    Email
                    </InputLabel>
                    <Input
                    id="input-with-icon-adornment"
                    name = 'email'
                    onChange={(e)=>{handleChange(e)}}
                    startAdornment={
                        <InputAdornment position="start">
                        <EmailIcon />
                        </InputAdornment>
                    }
                    defaultValue={inforUser.email}
                    />
                </FormControl>
                <span className='titleH2' style={{marginTop :'-30px'}}>Email xác nhận đặt phòng sẽ được gửi đến địa chỉ này</span>
            </div>
            <div className='addressInfor'>
                <span style={{fontWeight : 700, fontSize : '16px'}}>Địa chỉ của bạn</span>
                <div style={{display: 'flex', gap : '30px', alignItems : 'center'}}>
                    {
                        <AddressInfor isEdit={false} address={address} setAddress={setAddress} user={user} />
                    }
                </div>
            </div>
            <div className="numberInfor">
                <Stack direction='column' spacing={2}>
                    <span style={{fontWeight : 700, fontSize : '16px'}}>Số điện thoại của bạn</span>
                    <FormControl variant="standard" sx={{width : '45%'}}>
                        <Input
                        id="input-with-icon-adornment"
                        name = 'phone'
                        onChange={(e)=>{handleChange(e)}}
                        startAdornment={
                            <InputAdornment position="start">
                            <PhoneIcon />
                            </InputAdornment>
                        }
                        defaultValue={"0" + inforUser.phone}
                        />
                    </FormControl>
                    <span className='titleH2'>Để chỗ ở có thể liên hệ với bạn</span>
                </Stack>
            </div>
            <div className="inforTour">
                <Stack>
                    <Stack direction='column' spacing={2}>
                        <span style={{fontWeight : 700, fontSize : '16px'}}>Bạn đặt phòng cho ai?</span>
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel value="female" control={<Radio />} label="Tôi là người lưu trú chính" />
                                <FormControlLabel value="male" control={<Radio />} label="Đặt phòng này cho người khác" />
                            </RadioGroup>
                        </FormControl>
                    </Stack>
                </Stack>
            </div>
        </Stack>
    </div>
  )
}

export default InformationUser