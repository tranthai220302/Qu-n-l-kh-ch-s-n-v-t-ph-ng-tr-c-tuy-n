import React, { useEffect, useState } from 'react';
import NavbarOwner from '../../compoments/hotelOwner/NavbarOwner/NavbarOwner';
import { Alert, Button, CircularProgress } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import MailList from '../../compoments/customer/mailList/MailList';
import Footer from '../../compoments/customer/footer/Footer';
import './HomeHotel.css'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import StarsIcon from '@mui/icons-material/Stars';
import CancelIcon from '@mui/icons-material/Cancel';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { useNavigate } from 'react-router-dom';
import newRequest from '../../ults/newRequest';
import { format } from 'date-fns';
import EditIcon from '@mui/icons-material/Edit';
import Backdrop from '@mui/material/Backdrop';
import Snackbar from '@mui/material/Snackbar';
const DemoPaper = styled(Paper)(({ theme }) => ({
    width: 120,
    height: 105,
    padding: theme.spacing(2),
    ...theme.typography.body2,
    display : 'flex',
    flexDirection : 'column',
    gap : '10px',
    fontSize: '18px'
  }));
const HomeHotel = () => {
    const [current, setCurrent] = useState(null);
    const [rows, setRows] = useState([])
    const [rowsC, setRowsC] = useState([])
    const navigate = useNavigate();
    const [selectedIds, setSelectedIds] = useState([]);
    const [value, setValue] = React.useState('one');
    const [data, setData] = useState([])
    const [dataC, setDataC] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false)
    const [isLoadingDel, setIsLoadingDel] = useState(false);
    const navigae = useNavigate();
    const [state, setState] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'right',
      });
      const { vertical, horizontal, openSnack } = state;
      const handleCloseSnack = () => {
        setState({ ...state, openSnack: false });
      };
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'Name', headerName: 'Tên', width: 220 },
        { field: 'Address', headerName: 'Vị trí', width: 230 },
        { field: 'Status', headerName: 'Trạng thái', width: 150, headerClassName: 'status-header', },
        { field: 'Time', headerName: 'Thời gian đăng ký', description: 'This column has a value getter and is not sortable.', sortable: false, width: 160 },
        { field: 'Edit', headerName: 'Chỉnh sửa', width: 80,         renderCell: (params) => (
            <Button variant='outlined' onClick={()=>{navigae('/hotelAdmin/inforHotel')}}><EditIcon/></Button> 
        ), },
    ];
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    const handleSelectionChange = (selection) => {
        setSelectedIds(selection)
    };

    useEffect(() => {
        console.log(selectedIds);
    }, [selectedIds]);
    const getData = (is) => {
        setIsLoading(true)
        newRequest.get(`/hotel/list/owner/noConfirm/${is}`).then((res)=>{
            if(is==0){
                setData(res.data);
                console.log(res.data)
            }
            if(is==1){
                setDataC(res.data);
            }
            console.log(res.data)
            setIsLoading(false);
            setError(false)
        }).catch((error)=>{
            setIsLoading(false);
            setError(error.response.data)
        })
    }
    const getDataCurrent = () => {
        newRequest.get(`/owner/infor/current`).then((res)=>{
            setCurrent(res.data)
        }).catch((error)=>{
            console.log(error.response.data)
        })
    }
    useEffect(()=>{
        getData(0);
        getData(1);
        getDataCurrent()
    },[])
    useEffect(() => {
        if (data.length > 0) {
            const newRows = data.map((item) => ({
                id: item.id,
                Name : item.name,
                Address: item.Address.province,
                Status: item.isConfirm ? 'Đã xác nhận' : 'Đang đăng ký',
                Time: format(item.createdAt, 'dd-MM-yyyy'),
            }));
    
            setRows(newRows);
        }
        if (dataC.length > 0) {
            const newRows = dataC.map((item) => ({
                id: item.id,
                Name : item.name,
                Address: item.Address.province,
                Status: item.isConfirm ? 'Đang hoạt động' : 'Đang đăng ký',
                Time: format(item.createdAt, 'dd-MM-yyyy'),
            }));
    
            setRowsC(newRows);
        }
    }, [data, dataC]);
    const handleDelete = () =>{
        setIsLoadingDel(true)
        newRequest.post('/owner/delete', {
            id : selectedIds
        }).then((res)=>{
            setData(res.data);
            console.log(res.data)
            setIsLoadingDel(false);
            setError(false)
            setState({
                openSnack: true,
                vertical: 'top',
                horizontal: 'right',
            })
            getData(0);
        }).catch((error)=>{
            setIsLoadingDel(false);
            setError(error.response.data)
        })
    }
    const submit = () => {
        confirmAlert({
          title: 'Xoá khách sạn !',
          message: 'Khách sạn đang đợi duyệt, bạn thật sự muốn xoá ?',
          buttons: [
            {
              label: 'Yes',
              onClick: () => handleDelete()
            },
            {
              label: 'No',
              onClick: () => console.log(selectedIds)
            }
          ]
        });
      };
    return (
        <div>
            <NavbarOwner newValue={0}/>
                <Snackbar 
                    anchorOrigin={{ vertical, horizontal }}
                    open={openSnack}
                    onClose={handleCloseSnack}
                    message={"helo"}
                    key={vertical + horizontal}
                >
                        <Alert
                            anchorOrigin={{ vertical, horizontal }}
                            onClose={()=>{            
                                setState({
                                openSack: false,
                                vertical: 'top',
                                horizontal: 'right',
                            })}}
                            severity="success"
                            variant="filled"
                            sx={{ width: '100%' }}
                        >
                        Xoá thành công !
                    </Alert>
                </Snackbar>
                <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isLoadingDel}
                >
                <CircularProgress color="inherit" />
                </Backdrop>
            <div className="containerHomeOwner">
                <div className="headerOwner">
                    <h2>Trang chủ Quản lý khách sạn</h2>
                    <Button variant="contained" disableElevation sx={{ height: '40px' }} onClick={()=>{navigate('/hotelAdmin/addHotel')}}>
                        Thêm khách sạn
                    </Button>
                </div>
                <div className="hotelActivity">
                    <h3>Các khách sạn đang đăng ký</h3>
                    <div style={{ height: 400, width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: '10px' }}>
                        {rows && !isLoading && (
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                initialState={{
                                    pagination: {
                                        paginationModel: { page: 0, pageSize: 5 },
                                    },
                                }}
                                pageSizeOptions={[5, 10]}
                                onRowSelectionModelChange={(params) => {handleSelectionChange(params)}}
                                checkboxSelection
                            />
                        )}
                        {isLoading && <CircularProgress />}
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            {selectedIds.length > 0 && (
                                <Button variant="outlined" color="error" style={{ width: '60px', fontSize: '13px', height: '28px' }} onClick={submit}>
                                    Xoá
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="wrapped label tabs example"
                    >
                    <Tab
                        value="one"
                        label="Hoạt Động"
                        sx={{color: 'black', fontWeight: '600', textTransform: 'capitalize'}}
                    />
                    <Tab value="two" label="Hiệu suất" sx={{color: 'black', fontWeight: '600', textTransform: 'capitalize'}}/>
                    <Tab value="three" label="Cài đặt" sx={{color: 'black', fontWeight: '600', textTransform: 'capitalize'}}/>
                </Tabs>
                {current && (
                    <div className='current'>
                    <h2>Tổng quan hôm nay</h2>
                    <Stack direction="row" spacing={0.5}>
                        <DemoPaper square={false} sx={{width: '15%'}}>
                            <FormatListBulletedIcon sx={{fontSize : '30px'}}/>
                            <span style={{fontSize : '23px', fontWeight : '700'}}>{current.numRoom}</span>
                            <span style={{color : '#3573c2'}} className='nameCurrent'>Đặt phòng</span>
                        </DemoPaper>
                        <DemoPaper square={false} sx={{width: '15%'}}>
                            <LoginIcon sx={{fontSize : '30px'}}/>
                            <span style={{fontSize : '23px', fontWeight : '700'}}>{current.numPerson}</span>
                            <span style={{color : '#3573c2'}} className='nameCurrent'>Khách đến</span>
                        </DemoPaper>
                        <DemoPaper square={false} sx={{width: '15%'}}>
                            <LogoutIcon sx={{fontSize : '30px'}}/>
                            <span style={{fontSize : '23px', fontWeight : '700'}}>{current.numPersonOut}</span>
                            <span style={{color : '#3573c2'}} className='nameCurrent'>Khách đi</span>
                        </DemoPaper>
                        <DemoPaper square={false} sx={{width: '15%'}}>
                            <StarOutlineIcon sx={{fontSize : '30px'}}/>
                            <span style={{fontSize : '23px', fontWeight : '700'}}>{current.numReview}</span>
                            <span style={{color : '#3573c2'}} className='nameCurrent'>Đánh giá</span>
                        </DemoPaper>
                        <DemoPaper square={false} sx={{width: '38%'}}>
                            <HighlightOffIcon sx={{fontSize : '30px'}}/>
                            <span style={{fontSize : '23px', fontWeight : '700'}}>{current.numCancel}</span>
                            <span style={{color : '#3573c2'}} className='nameCurrent'>Lượt huỷ phòng</span>
                        </DemoPaper>
                    </Stack>
                </div>
                )}
                <div className="hotelActivity">
                    <h3>Các khách sạn đang hoạt động</h3>
                    <div style={{ height: 400, width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: '10px' }}>
                        <DataGrid
                            rows={rowsC}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: { page: 0, pageSize: 5 },
                                },
                            }}
                            pageSizeOptions={[5, 10]}
                            onRowSelectionModelChange={(params) => {handleSelectionChange(params)}}
                            checkboxSelection
                        />
                    </div>
                </div>
                </div>
            <MailList />
            <Footer />
        </div>
    );
};

export default HomeHotel;
