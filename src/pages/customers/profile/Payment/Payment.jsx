import React, { useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { DateRange } from "react-date-range";
import { Button } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import newRequest from '../../../../ults/newRequest';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { useNavigate } from 'react-router-dom';
import './Payment.css'
const Payment = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [openSuccess, setOpenSuccess] = React.useState(false)
    const [openPass, setOpenPass] = useState(false)
    const [message, setMessage] = useState('')
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    const navigate = useNavigate()
  return (
    <div style={{width : '80%'}}>
        <div>
            <span style={{fontSize: '40px', fontWeight: '700'}}>Thông tin thanh toán</span><br></br>
            <span className='titleH2'>Thêm hoặc bỏ các phương thức thanh toán một cách bảo mật để dễ đặt hơn.</span>
        </div>
        <TableContainer component={Paper} style={{marginTop: '10px'}}>
                {/* {!error ? (
                    <Snackbar 
                        anchorOrigin={{ vertical, horizontal }}
                        open={open}
                        onClose={handleClose}
                        key={vertical + horizontal}
                    >
                        <Alert
                            anchorOrigin={{ vertical, horizontal }}
                            onClose={()=>{setOpenSuccess(false)}}
                            severity="success"
                            variant="filled"
                            sx={{ width: '100%' }}
                        >
                            Đổi mật khẩu không thành công!
                        </Alert>
                    </Snackbar>
                ) : (
                    <Snackbar 
                    anchorOrigin={{ vertical, horizontal }}
                    open={open}
                    onClose={handleClose}
                    message={error}
                    key={vertical + horizontal}
                    />
                )} */}
            <Table sx={{ width: '100%' }} aria-label="simple table">
              <TableBody>
                  <TableRow
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                      <TableCell component="th" scope="row" width="20%">
                          Thẻ thanh toán
                      </TableCell>
                      {!openPass ? (
                            <TableCell align="right" style={{textAlign: 'left'}}>
                                Thanh toán bằng thẻ mới
                            </TableCell>
                      ) : (
                        <TableCell>
                            <div style={{display : 'flex', gap : '30px', flexDirection: 'column'}}>
                                <TextField id="outlined-basic" label="Tên chủ thẻ" variant="outlined" />
                                <TextField id="outlined-basic" label="Số thẻ" variant="outlined" />
                                <TextField id="outlined-basic" label="Ngày hết hạn" variant="outlined" />
                            </div>
                        </TableCell>
                      )}
                      {
                        !openPass ? (
                            <TableCell align="right" style={{textAlign: 'right', color : '#003b95', fontWeight : '600', cursor: 'pointer'}} onClick={()=>{setOpenPass(true)}}>
                                Thêm thẻ
                            </TableCell>
                        ) : (
                            <TableCell align="right" style={{textAlign: 'right', color : '#003b95', fontWeight : '600', cursor: 'pointer'}} >
                                <span>Huỷ</span>
                                <FastRewindIcon style={{color : '#003b95', textAlign: 'center', marginLeft: '10px'}} onClick={()=>{setOpenPass(false)}}/>
                            </TableCell>
                        )
                      }
                  </TableRow>          
              </TableBody>
            </Table>
          </TableContainer>
    </div>
  )
}

export default Payment