import React, {useEffect, useState} from 'react'
import { Button, Divider, FormControlLabel, Paper, Radio, RadioGroup, Rating, Stack, TextField, TextareaAutosize } from '@mui/material'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import {
    Unstable_NumberInput as BaseNumberInput,
    NumberInputProps,
    numberInputClasses,
  } from '@mui/base/Unstable_NumberInput';
const PriceTypeRoom = ({price, setPrice, percent, setPercent, number, setNumber}) => {
    const i = [1, 2, 3, 4];
    const handleChang = (e, item) => {
        const { value } = e.target;
        setPercent(prevPercent => ({
            ...prevPercent,
            [item]: value 
        }));
        console.log(percent)
    };
    const handleChangNumber = (e, item) => {
        const { value } = e.target;
        setNumber(prevPercent => ({
            ...prevPercent,
            [item]: value 
        }));
        console.log(number)
    };

    const calculatePrice = (price, percent) => {
        return price - (price * percent) / 100;
    };

  return (
    <div className="containerItemRoom">
        <h2>Loại giá</h2>
    <div style={{display : 'flex', gap : '20px', flexDirection :'column'}}>
        <Paper sx={{width : '500px', display: 'flex', flexDirection : 'column', alignItems : 'center', padding : '20px 30px', justifyContent : 'flex-start'}}>
            <Stack spacing={2} width={'100%'}>
                <span className='titleH2' style={{color :'black'}}>Để thu hút nhiều đối tượng khách hơn, chúng tôi đề xuất Quý vị nên thiết lập nhiều loại giá. Các mức giá và chính sách đề xuất cho mỗi loại giá được dựa trên dữ liệu từ các chỗ nghỉ tương tự như Quý vị. Tuy nhiên, Quý vị có thể chỉnh sửa các chi tiết này ngay bây giờ hoặc sau khi hoàn tất đăng ký.</span>
            </Stack>
        </Paper>
        <span style={{width : '400px', fontSize : '18px', fontWeight : '700', paddingLeft : '20px'}}>Giá cho mỗi đêm</span>
        <Paper sx={{width : '500px', display: 'flex', flexDirection : 'column', alignItems : 'center', padding : '20px 30px', justifyContent : 'flex-start'}}>
            <Stack spacing={2} width={'100%'}>
            <TextField
                id="outlined-size-small"
                size = 'small'
                defaultValue={price.toLocaleString('en-US')}
                onChange={(e)=>{setPrice(e.target.value)}}
                />
            </Stack>
        </Paper>
        <span style={{width : '400px', fontSize : '18px', fontWeight : '700', paddingLeft : '20px'}}>Loại giá giá tiêu chuẩn</span>
        <Paper sx={{width : '500px', display: 'flex', flexDirection : 'column', alignItems : 'center', padding : '20px 30px', justifyContent : 'flex-start'}}>
            <Stack spacing={2} width={'100%'}>
                <span style={{fontWeight : '700'}}>Giá theo cỡ nhóm</span>
                <Divider/>
                <table width={'100%'}>
            <tbody>
                <tr>
                    <td style={{ fontWeight: '700' }}>Số lượng khách</td>
                    <td style={{ fontWeight: '700' }}>Giảm giá</td>
                    <td style={{ fontWeight: '700' }}>Thành tiền</td>
                    <td style={{ fontWeight: '700' }}>Số phòng</td>
                </tr>
                {i.map((item) => (
                    <tr key={item}>
                        <td style={{ padding: '30px 0' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <PersonOutlineIcon />
                                <span>X{item}</span>
                            </div>
                        </td>
                        <td>
                            <FormControl sx={{ width: '100px' }} size="small">
                                <Select
                                    labelId="demo-select-small-label"
                                    id="demo-select-small"
                                    value={percent[item] || 0} // Sử dụng giá trị percent từ state hoặc mặc định là 0
                                    onChange={(e) => { handleChang(e, item) }} // Gọi hàm xử lý sự kiện khi thay đổi percent
                                >
                                    <MenuItem value={0}>
                                        <em>0%</em>
                                    </MenuItem>
                                    <MenuItem value={5}>5%</MenuItem>
                                    <MenuItem value={10}>10%</MenuItem>
                                    <MenuItem value={15}>15%</MenuItem>
                                    <MenuItem value={20}>20%</MenuItem>
                                    <MenuItem value={25}>25%</MenuItem>
                                    <MenuItem value={30}>30%</MenuItem>
                                    <MenuItem value={35}>35%</MenuItem>
                                    <MenuItem value={40}>40%</MenuItem>
                                </Select>
                            </FormControl>
                        </td>
                        <td>{(calculatePrice(price*item, percent[item] || 0)).toLocaleString('en-US')} VND</td> {/* Tính toán giá mới */}
                        <td width={'20%'}>
                            <TextField 
                                size='small'
                                style={{width : '100%'}}
                                onChange={(e)=>{handleChangNumber(e, item)}}
                                defaultValue={number[item] || 0}
                            />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
            </Stack>
        </Paper>
        {/* {open && (
            <Alert severity="warning" onClose={handleClose} sx={{width : '300px', height : '150px'}}>
                <b>Quý vị vẫn đang cân nhắc ?</b>
                <ul style={{color: 'gray', paddingLeft :'15px', display : 'flex', flexDirection : 'column', gap :'20px', marginTop : '10px'}}>
                    <li>
                    Đừng lo, Quý vị có thể cập nhật các vật dụng phòng tắm tại chỗ nghỉ sau.
                    </li>
                </ul>
            </Alert>
        )} */}
    </div>
    </div>
  )
}

export default PriceTypeRoom