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
import './ChangePass.css'
const ChangePass = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [openSuccess, setOpenSuccess] = React.useState(false)
    const [openPass, setOpenPass] = useState(false)
    const [message, setMessage] = useState('')
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    const navigate = useNavigate()
    const [data, setData] = useState({
        passOld : '',
        passNew : '',
        confirmPassNew : ''
    })
    const handleChange = (e) =>{
        setData((prev)=>({
            ...prev,
            [e.target.name] : e.target.value
        }))
    }
    const [openDel, setOpenDel] = useState(false)
    const [state, setState] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'right',
      });
    const { vertical, horizontal, open } = state;
    const handleClose = () => {
    setState({ ...state, open: false });
    };
    const [edit, setEdit] = React.useState(true)
    const handleLogout = () =>{
        setIsLoading(true)
        newRequest.post('/auth/logout').then((res)=>{
          localStorage.removeItem('currentUser')
          setIsLoading(false);
          setError(null);
          navigate('/')
        }).catch((error)=>{
          setError(error.response.data)
        })
      }
    const handleDelete = ()=>{
        newRequest.delete(`/user/delete/${currentUser.id}`).then((res)=>{
            console.log(res.data)
            setError(false)
            setIsLoading(false)
            handleLogout()
        }).catch((error)=>{
            setError(error.response.data)
            setIsLoading(false)
            setState({
                open: true,
                vertical: 'top',
                horizontal: 'right',
            })
        })
    }
    const handleChangePass = () =>{
        setIsLoading(true)
        newRequest.put(`/user/changePass/${currentUser.id}`, data).then((res)=>{
            console.log(res.data)
            setOpenSuccess(true)
            setError(false)
            setIsLoading(false)
            setState({
                open: true,
                vertical: 'top',
                horizontal: 'right',
            })
            setOpenPass(false)
        }).catch((error)=>{
            setError(error.response.data)
            setIsLoading(false)
            setState({
                open: true,
                vertical: 'top',
                horizontal: 'right',
            })
        })
    }
  return (
    <div style={{width : '80%'}}>
        <div>
            <span style={{fontSize: '40px', fontWeight: '700'}}>An toàn và bảo mật</span><br></br>
            <span className='titleH2'>Thay đổi thiết lập bảo mật, cài đặt xác thực bổ sung hoặc xóa tài khoản của Quý vị..</span>
        </div>
        <TableContainer component={Paper} style={{marginTop: '10px'}}>
                {!error ? (
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
                )}
            <Table sx={{ width: '100%' }} aria-label="simple table">
              <TableBody>
                  <TableRow
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                      <TableCell component="th" scope="row" width="20%">
                          Đổi mật khẩu
                      </TableCell>
                      {!openPass ? (
                            <TableCell align="right" style={{textAlign: 'left'}}>
                            Đổi mật khẩu thường xuyên để giữ tài khoản của bạn được bảo mật
                            </TableCell>
                      ) : (
                        <TableCell>
                            <div style={{display : 'flex', gap : '20px'}}>
                            <TextField
                                id="standard-password-input"
                                label="Mật khẩu cũ"
                                type="password"
                                autoComplete="current-password"
                                variant="standard"
                                style={{ width: '40%' }}
                                InputLabelProps={{
                                    style: { fontSize: '12px' },
                                }}
                                name = 'passOld'
                                onChange={(e)=>{handleChange(e)}}
                            />
                            <TextField
                                id="standard-password-input"
                                label="Mật khẩu mới"
                                type="password"
                                autoComplete="current-password"
                                variant="standard"
                                style={{ width: '40%' }}
                                InputLabelProps={{
                                    style: { fontSize: '12px' },
                                }}
                                name = 'passNew'
                                onChange={(e)=>{handleChange(e)}}
                            />
                            <TextField
                                id="standard-password-input"
                                label="Xác nhận mật khẩu"
                                type="password"
                                autoComplete="current-password"
                                variant="standard"
                                style={{ width: '40%' }}
                                InputLabelProps={{
                                    style: { fontSize: '12px' },
                                }}
                                name = 'confirmPassNew'
                                onChange={(e)=>{handleChange(e)}}
                            />
                        </div>
                        </TableCell>
                      )}
                      {
                        !openPass ? (
                            <TableCell align="right" style={{textAlign: 'right', color : '#003b95', fontWeight : '600', cursor: 'pointer'}} onClick={()=>{setOpenPass(true)}}>
                                Cài lại
                            </TableCell>
                        ) : (
                            <TableCell align="right" style={{textAlign: 'right', color : '#003b95', fontWeight : '600', cursor: 'pointer'}} >
                                <span onClick={()=>{handleChangePass()}}>Xác nhận</span>
                                <FastRewindIcon style={{color : '#003b95', textAlign: 'center', marginLeft: '10px'}} onClick={()=>{setOpenPass(false)}}/>
                            </TableCell>
                        )
                      }
                  </TableRow>    
                  <TableRow
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                      <TableCell component="th" scope="row" width="20%">
                          Xoá tài khoản
                      </TableCell>
                      <TableCell align="right" style={{textAlign: 'left', display: 'flex', flexDirection : 'column'}}>
                        <span onClick={()=>{setOpenDel(!openDel)}}>Vì sao bạn muốn xóa tài khoản của mình?</span>
                        {
                            openDel && (
                            <FormControl style={{marginLeft : '30px'}}>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue="female"
                                    name="radio-buttons-group"
                                >
                                    <FormControlLabel 
                                        value="female" 
                                        control={<Radio />} 
                                        label="Tôi nhận được quá nhiều email từ harumi.com" 
                                    />
    
                                    <FormControlLabel 
                                        value="male" 
                                        control={<Radio />} 
                                        label="Tôi muốn dùng email khác cho tài khoản của mình" 
                                    />
    
                                    <FormControlLabel 
                                        value="other" 
                                        control={<Radio />} 
                                        label="Tôi muốn xóa tất cả dữ liệu của mình" 
                                    />
                                </RadioGroup>
                            </FormControl>
                            )
                        }
                      </TableCell>
                      {/* <TableCell align="right" style={{textAlign: 'right', color : '#003b95', fontWeight : '600', cursor: 'pointer'}} onClick={()=>{setOpenDel(true)}}>
                      Xoá tài khoản
                      </TableCell> */}
                      {
                        !openDel ? (
                            <TableCell align="right" style={{textAlign: 'right', color : '#003b95', fontWeight : '600', cursor: 'pointer'}} onClick={()=>{setOpenDel(true)}}>
                                Xoá tài khoản
                            </TableCell>
                        ) : (
                            <TableCell align="right" style={{textAlign: 'right', color : '#003b95', fontWeight : '600', cursor: 'pointer'}} >
                                <span onClick={()=>{handleDelete()}}>Xác nhận</span>
                                <FastRewindIcon style={{color : '#003b95', textAlign: 'center', marginLeft: '10px'}} onClick={()=>{setOpenDel(false)}}/>
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

export default ChangePass