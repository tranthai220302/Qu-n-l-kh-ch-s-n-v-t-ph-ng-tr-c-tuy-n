import * as React from 'react';
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
import Address from '../../../../compoments/address/Address';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import newRequest from '../../../../ults/newRequest';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import './TableProfile.css'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import uploadImg from '../../../../ults/upImage';
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}
export default function TableProfile() {
    const [state, setState] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'right',
      });
      const { vertical, horizontal, open } = state;
      const handleClose = () => {
        setState({ ...state, open: false });
      };
    const [file, setFile] = React.useState("");
    const [openSuccess, setOpenSuccess] = React.useState(false)
    const [edit, setEdit] = React.useState(true)
    const [click, setClick] = React.useState(false)
    const [oke, setOke] = React.useState(false)
    const currentUser= JSON.parse(localStorage.getItem('currentUser'))
    const [user, setUser] = React.useState(null)
    const getUser = () =>{
        newRequest.get(`/user/${currentUser?.id}`).then((res)=>{
            setUser(res.data)
        }).catch((error)=>{
            console.log(error.response.data)
        })
    }
    React.useEffect(()=>{
        getUser()
    },[])
    const [address, setAddress] = React.useState({
        province : user?.Address?.province,
        district: user?.Address?.district,
        ward: user?.Address?.ward,
        numberHome : user?.Address?.numberHome
    })
    const [data, setData] = React.useState({
        name : user?.name,
        email : user?.email,
        phone : user?.phone,
        birthDate: user?.birthDate,
        genDer : user?.genDer,
        address : address
    })
    const [img, setImg] = React.useState(null)
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(false);
    const handleEdit = () =>{
        setIsLoading(true)
        newRequest.put(`/user/update/${user.id}`, data).then((res)=>{
            console.log(res.data)
            setError(false)
            setIsLoading(false)
            setEdit(true);
            setOke(false)
            setOpenSuccess(true)
            setState({
                open: true,
                vertical: 'top',
                horizontal: 'right',
            })
            getUser();
        }).catch((error)=>{
            setError(error.response.data)
            setIsLoading(false)
            setEdit(false);
            setOke(true)
            getUser()
            setState({
                open: true,
                vertical: 'top',
                horizontal: 'right',
            })
        })
    }
    React.useEffect(()=>{
        setData((prev)=>({
            ...prev,
            ['address'] : address
        }))
    },[address])
    const handleChange = (e) =>{
        const value = e.target.value
        setData((prev)=>({
            ...prev,
            [e.target.name] : value
        }))
    }

  return (
    <div style={{width: '80%'}}>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <div>
                <span style={{fontSize: '40px', fontWeight: '700'}}>Thông tin cá nhân</span><br></br>
                <span className='titleH2'>Cập nhật thông tin của bạn và tìm hiểu các thông tin này được sử dụng ra sao.</span>
            </div>
            <div className="left" >
                <img
                style={{
                    height : '80px',
                    borderRadius : '50%',
                    width : '80px'
                }}
                src={
                    file
                    ? URL.createObjectURL(file)
                    : user?.avatar ? user.avatar : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
                }
                alt=""
                />
                <div className="formInput">
                <label htmlFor="file">
                  <AddAPhotoIcon className="icon" style={{color: '#003b95', cursor: 'pointer'}}/>
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>
            </div>
        </div>
    {
        user && (
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
                            Chỉnh sửa thành công!
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
                          Tên
                      </TableCell>
                      <TableCell align="right" style={{textAlign: 'left'}}>
                      <TextField
                      id="standard-helperText"
                      defaultValue={user.name}
                      InputProps={{
                          readOnly: edit,
                        }}
                      variant="standard"
                      onChange={(e)=>{handleChange(e)}}
                      name='name'
                      style={!edit ? {width: '35%',backgroundColor: 'rgb(214, 214, 214)'} : {width: '35%'}}
                      />
                      </TableCell>
                  </TableRow>
                  <TableRow
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                      <TableCell component="th" scope="row" width="20%">
                          Địa chỉ email
                      </TableCell>
                      <TableCell align="right" style={{textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '10px'}}>
                          <TextField
                          id="standard-helperText"
                          defaultValue={user.email}
                          InputProps={{
                              readOnly: edit,
                          }}
                          name = 'email'
                          onChange={(e)=>{handleChange(e)}}
                          variant="standard"
                          style={!edit ? {width: '35%',backgroundColor: 'rgb(214, 214, 214)'} : {width: '35%'}}
                          />
                          <span style={{fontSize: '13px', color: 'gray'}}>Chúng tôi sẽ gửi đường link xác thực đến địa chỉ email mới. Vui lòng kiểm tra hộp thư của bạn.</span>
                      </TableCell>
                  </TableRow>
                  <TableRow
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                      <TableCell component="th" scope="row" width="20%">
                          Số điện thoại
                      </TableCell>
                      <TableCell align="right" style={{textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '10px'}}>
                          <TextField
                          id="standard-helperText"
                          defaultValue={"0" + user.phone}
                          InputProps={{
                              readOnly: edit,
                          }}
                          name = 'phone'
                          onChange={(e)=>{handleChange(e)}}
                          variant="standard"
                          style={!edit ? {width: '35%',backgroundColor: 'rgb(214, 214, 214)'} : {width: '35%'}}
                          />
                          <span style={{fontSize: '13px', color: 'gray'}}>Chỗ nghỉ hoặc địa điểm tham quan bạn đặt sẽ liên lạc với bạn qua số này nếu cần.</span>
                      </TableCell>
                  </TableRow>
                  <TableRow
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                      <TableCell component="th" scope="row" width="20%">
                          Ngày sinh
                      </TableCell>
                      <TableCell align="right" style={{textAlign: 'left'}}>
                          {!edit ? (
                              <input type='date' style={{
                                  border: '1px solid gray',
                                  padding : '10px',
                                  borderRadius: '5px'
                              }}
                              name = 'birthDate'
                              onChange={(e)=>{handleChange(e)}}
                              defaultValue={user.birthDate}
                              />
                          ) : (
                              <span>22/02/2002</span>
                          )}
                      </TableCell>
                  </TableRow>
                  <TableRow
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                      <TableCell component="th" scope="row" width="20%">
                          Giới tính
                      </TableCell>
                      <TableCell align="right" style={{textAlign: 'left'}}>
                          {!edit ? (
                              <FormControl style={{width : '20%'}}>
                              <NativeSelect
                                  defaultValue="Nam"
                                  inputProps={{
                                  name: 'genDer',
                                  id: 'uncontrolled-native',
                                  }}
                                  onChange={(e)=>{handleChange(e)}}
                              >
                                  <option value='Nam'></option>
                                  <option value='Nam'>Nam</option>
                                  <option value='Nữ'>Nữ</option>
                              </NativeSelect>
                              </FormControl>
                          ) : (
                              <span>{user.genDer}</span>
                          )}
                      </TableCell>
                  </TableRow>
                  <TableRow
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                      <TableCell component="th" scope="row" width="20%">
                          Địa chỉ
                      </TableCell>
                      <TableCell align="right" style={{textAlign: 'left'}}>
                          <Address isEdit = {edit} address = {address} setAddress = {setAddress} user = {user}/>
                      </TableCell>
                  </TableRow>
                  
              </TableBody>
            </Table>
          </TableContainer>
        )
    }
    <div style={{ display: 'flex', justifyContent: 'end'}}>
        {!oke ? (
            <Button variant="outlined" style={{marginTop: '20px'}} onClick={()=>{
                setEdit(false);
                setOke(true)
            }}>
                Chỉnh sửa
            </Button>
        ) : (
            <Button variant="outlined" style={{marginTop: '20px'}} onClick={()=>{
                handleEdit()
            }}>
                Oke
            </Button>
        )}
    </div>
    </div>
  );
}
