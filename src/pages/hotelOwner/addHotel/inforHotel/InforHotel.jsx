import React, { useEffect, useState } from 'react'
import NavbarOwner from '../../../../compoments/hotelOwner/NavbarOwner/NavbarOwner'
import Footer from '../../../../compoments/customer/footer/Footer'
import MailList from '../../../../compoments/customer/mailList/MailList'
import './InforHotel.css'
import { Button, Divider, Paper, Rating, Stack, TextareaAutosize } from '@mui/material'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Address from '../../../../compoments/address/Address'
import AddressHotel from '../../../../compoments/hotelOwner/address/AddressHotel'
import Alert from '@mui/material/Alert';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import newRequest from '../../../../ults/newRequest'
import Snackbar from '@mui/material/Snackbar';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import ImageHotel from './ImageHotel/ImageHotel'
import uploadImg from '../../../../ults/upImage'
import AddRoom from './AddRoom/AddRoom'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { clearRooms } from '../../../../redux/actions/roomAction'
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
const steps = ['', '', '', '','', '', '', '', ''];
let data = [
    '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00',
    '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00',
    '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00',
    '22:00', '23:00', '24:00'
];

console.log(data);
const blue = {
    100: '#DAECFF',
    200: '#b6daff',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
  };

  const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
  };

  const Textarea = styled(BaseTextareaAutosize)(
    ({ theme }) => `
    box-sizing: border-box;
    margin-top : 10px;
    width: 100%;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    border-radius: 12px 12px 0 12px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};

    &:hover {
      border-color: ${blue[400]};
    }

    &:focus {
      outline: 0;
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
    }

    // firefox
    &:focus-visible {
      outline: 0;
    }
  `,
  );
const InforHotel = () => {
    const dispatch = useDispatch();
    const selectedRooms = useSelector(state => state.room.createRoom);
    const [selectedImages, setSelectedImages] = useState([]);
    const [messageError, setMessageError] = useState(null)
    const [imgBtn , setImgBtn] = useState(false)
    const [desc, setDesc] = useState('')
    const [state, setState] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'right',
      });
      const { vertical, horizontal, openSnack } = state;
      const handleCloseSnack = () => {
        setState({ ...state, openSnack: false });
      };
    const [isAnimal, setIsAnimal] = useState(false)
    const [timeCheckIn, setTimeCheckIn] = useState({
        from : '',
        to : ''
    })
    const [timeCheckOut, setTimeCheckOut] = useState({
        from : '',
        to : ''
    })
    const [isBreakfast, setIsBreakfast] = useState(false)
    const [isPark, setIsPark] = useState(false)
    const [six, setSix] = useState(false)
    const [numStar, setNumStar] = useState(0);
    const [activeStep, setActiveStep] = React.useState(0);
    const [nameHotel, setNameHotel] = useState('')
    const [completed, setCompleted] = React.useState({});
    const [service, setService] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false)
    const [isLoadingCreate, setIsLoadingCreate] = useState(false);
    const [errorCreate, setErrorCreate] = useState(false)
    const [idService, setIdService] = useState([]);
    const [idHotel, setIdHotel] = useState(null)
    const [address, setAddress] = useState({
        province : '',
        district : '',
        ward : '',
        numberHome : ''
    })
    const handleClikcService = (e) =>{
        const id = e.target.value;
        const isChecked = e.target.checked;
        if(isChecked){
            setIdService([...idService, parseInt(id)])
        }else{
            setIdService(idService.filter(item => item != id))
        }
    }
    const navigae = useNavigate()
    const totalSteps = () => {
      return steps.length;
    };
  
    const completedSteps = () => {
      return Object.keys(completed).length;
    };
  
    const isLastStep = () => {
      return activeStep === totalSteps() - 1;
    };
  
    const allStepsCompleted = () => {
      return completedSteps() === totalSteps();
    };
  
    const handleNext = () => {
      const newActiveStep =
        isLastStep() && !allStepsCompleted()
          ? 
            steps.findIndex((step, i) => !(i in completed))
          : activeStep + 1;
      setActiveStep(newActiveStep);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  
    // const handleStep = (step) => () => {
    //     switch (step-1) {
    //         case 0:
    //             if(!address.province || !address.district || !address.ward || !address.numberHome){
    //                 setMessageError('Vui lòng nhập địa chỉ chính xác!')
    //                 setState({
    //                     openSnack: true,
    //                     vertical: 'top',
    //                     horizontal: 'right',
    //                 })
    //             }else setActiveStep(step);
    //             break;
    //         case 1:
    //             if(!nameHotel || !desc){
    //                 setMessageError('Vui lòng nhập đầy đủ thông tin!')
    //                 setState({
    //                     openSnack: true,
    //                     vertical: 'top',
    //                     horizontal: 'right',
    //                 })
    //             }else setActiveStep(step);
    //             break;
    //         case 2:
    //             if(idService.length == 0){
    //                 setMessageError('Vui lòng chọn dịch vụ!')
    //                 setState({
    //                     openSnack: true,
    //                     vertical: 'top',
    //                     horizontal: 'right',
    //                 })
    //             }else setActiveStep(step);
    //             break;
    //         case 7:
    //             if(!six){
    //                 setMessageError('Vui lòng nhập đầy đủ thông tin!')
    //             }else setActiveStep(step);
    //             break
    //         case 5:
    //             if(!timeCheckIn.from  || !timeCheckIn.to || !timeCheckOut.from || !timeCheckOut.to){
    //                 setMessageError('Vui lòng nhập đầy đủ thông tin!')
    //                 setState({
    //                     openSnack: true,
    //                     vertical: 'top',
    //                     horizontal: 'right',
    //                 })
    //             }else setActiveStep(step);
    //             break
    //         default:
    //             setActiveStep(step);
    //             break;
    //     }
    // };
  
    const handleComplete = () => {
      const newCompleted = completed;
      newCompleted[activeStep] = true;
      setCompleted(newCompleted);
      handleNext();
    };
  
    const handleReset = () => {
      setActiveStep(0);
      setCompleted({});
    };
    const [open, setOpen] = useState(true);

    const handleClose = () => {
        setOpen(false);
    };
    const [age, setAge] = React.useState('');
    const getData = () => {
        setIsLoading(true)
        newRequest.get('/hotel/list/services').then((res)=>{
            setService(res.data);
            setIsLoading(false);
            setError(false)
        }).catch((error)=>{
            setIsLoading(false);
            setError(error.response.data)
        })
    }
    const checkError = (step) => {
        switch (step) {
            case 0:
                if(!address.province || !address.district || !address.ward || !address.numberHome){
                    setMessageError('Vui lòng nhập địa chỉ chính xác!')
                    setState({
                        openSnack: true,
                        vertical: 'top',
                        horizontal: 'right',
                    })
                }else handleComplete()
                break;
            case 1:
                if(!nameHotel || !desc){
                    setMessageError('Vui lòng nhập đầy đủ thông tin!')
                    setState({
                        openSnack: true,
                        vertical: 'top',
                        horizontal: 'right',
                    })
                }else handleComplete()
                break;
            case 2:
                if(idService.length == 0){
                    setMessageError('Vui lòng chọn dịch vụ!')
                    setState({
                        openSnack: true,
                        vertical: 'top',
                        horizontal: 'right',
                    })
                }else handleComplete()
                break;
            default:
                handleComplete()
                break;
        }
    };
    useEffect(()=>{
        if(activeStep == 2) getData()
    },[activeStep])
    const handleCreateHotel = async() =>{
        if(!timeCheckIn.from  || !timeCheckIn.to || !timeCheckOut.from || !timeCheckOut.to){
            setMessageError('Vui lòng nhập đầy đủ thông tin!')
            setState({
                openSnack: true,
                vertical: 'top',
                horizontal: 'right',
            })
        }else{
            setIsLoadingCreate(true)
            let img = []
            for(let i = 0 ; i < selectedImages.length; i++){
                const imgItem = await uploadImg(selectedImages[i]);
                img.push(imgItem);
            }
            newRequest.post('hotel/create',{
                service : idService,
                address,
                isBreakfast : isBreakfast,
                isParking : isPark,
                timeCheckIn :  `Từ ${timeCheckIn.from} đến ${timeCheckIn.to}`,
                timeCheckOut :  `Từ ${timeCheckOut.from} đến ${timeCheckOut.to}`,
                isAnimals : isAnimal,
                name : nameHotel,
                numStars : numStar,
                description : desc,
                img : img   
            }).then((res)=>{
                setIsLoadingCreate(false)
                setMessageError(false)
                setIdHotel(res.data.hotel.id)
                console.log(res.data.message);
                setSix(true)
                handleComplete()
            }).catch((error)=>{
                setMessageError(error.response.data)
                setIsLoadingCreate(false)
                console.log(error.response.data)
                setState({
                    openSnack: true,
                    vertical: 'top',
                    horizontal: 'right',
                })
            })
        }
    }
  return (
    <div style={{backgroundColor : '#f9f9fa'}}>
        <NavbarOwner type = 'add'/>
        <Snackbar 
            anchorOrigin={{ vertical, horizontal }}
            open={openSnack}
            onClose={handleCloseSnack}
            message={messageError}
            key={vertical + horizontal}
      />
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoadingCreate}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <div className="containerH">
        <Box sx={{ width: '1024px', marginTop : '10px' }}>
            <Stepper nonLinear activeStep={activeStep}>
                {steps.map((label, index) => (
                <Step key={index} completed={completed[index]}>
                    <StepButton color="white" onClick={()=>setActiveStep(index)}>
                    {label}
                    </StepButton>
                </Step>
                ))}
            </Stepper>
            {
                !imgBtn ? (
                    <div>
                    {
                        activeStep == 0 && (
                            <div className="containerInforHotel">
                            <Paper sx={{width : '650px', height : '300px', display: 'flex', flexDirection : 'column', alignItems : 'center', padding : '10px 30px', justifyContent : 'space-around'}}>
                                    <Stack direction={'column'} width={'100%'} spacing={1}>
                                        <span style={{fontWeight : '600'}}>Vùng/quốc gia</span>
                                        <TextField
                                            id="filled-read-only-input"
                                            defaultValue="Việt Nam"
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            sx={{
                                                width : '100%',
                                            }}
                                        />
                                    </Stack>
                                    <Stack direction={'column'} width={'100%'} spacing={1}>
                                        <span style={{fontWeight : '600'}}>Địa chỉ</span>
                                        <AddressHotel setAddress={setAddress} address={address}/>
                                        {
                                            address.province && address.district && address.ward && address.numberHome && (
                                                <span>{address.numberHome}, {address.ward}, {address.district}, { address.province}</span>
                                            )
                                        }
                                    </Stack>
                            </Paper>
                            {open && (
                            <Alert severity="warning" onClose={handleClose} sx={{width : '300px'}}>
                                <b>Thông tin gì cần được bao gồm trong địa chỉ của tôi?</b>
                                <ul style={{color: 'gray', paddingLeft :'15px', display : 'flex', flexDirection : 'column', gap :'20px'}}>
                                    <li>
                                      Vui lòng nhập tên đường và số nhà chung nơi tất cả các căn chỗ nghỉ tọa lạc
                                    </li>
                                    <li>Hãy viết tên đường chính xác</li>
                                    <li>Dùng địa chỉ thực sự của chỗ nghỉ, không dùng địa chỉ văn phòng hay nhà của Quý vị</li>
                                </ul>
                            </Alert>
                        )}
                        </div>
                        )
                    }
                    {
                        activeStep == 1 && (
                        <div className="containerInforHotel1">
                            <h2 style={{width : '560px'}}>Chon chúng tôi biêt thêm về thông tin khách sạn của quý vị</h2>
                            <Paper sx={{width : '500px', height : '560px', display: 'flex', flexDirection : 'column', alignItems : 'center', padding : '10px 30px', justifyContent : 'space-around'}}>
                                    <Stack direction={'column'} width={'100%'} spacing={1} borderBottom='1px solid #e7e7e7' paddingBottom={'20px'}>
                                        <span style={{fontWeight : '600'}}>Tên khách sạn</span>
                                        <TextField
                                            id="filled-read-only-input"
                                            defaultValue={nameHotel}
                                            sx={{
                                                width : '100%',
                                            }}
                                            onChange={(e)=>{setNameHotel(e.target.value)}}
                                        />
                                        <span className='titleH2'>Tên này sẽ được hiển thị tới khách khi họ tìm kiếm chỗ nghỉ.</span>
                                    </Stack>
                                    <Stack direction={'column'} width={'100%'} spacing={1} borderBottom='1px solid #e7e7e7' paddingBottom={'20px'}>
                                        <span style={{fontWeight : '600'}}>Khách sạn của Quý vị được xếp hạng mấy sao?</span>
                                        <FormControl>
                                            <RadioGroup
                                                aria-labelledby="demo-controlled-radio-buttons-group"
                                                name="controlled-radio-buttons-group"
                                                value={numStar}
                                                onChange={(e)=>{setNumStar(e.target.value)}}
                                            >
                                                <FormControlLabel value="0" control={<Radio size="small"/>} label={'Không xếp hạng'} />
                                                <FormControlLabel value="1" control={<Radio size="small"/>} label={<Rating name="read-only" value={1} readOnly />} />
                                                <FormControlLabel value="2" control={<Radio size="small"/>} label={<Rating name="read-only" value={2} readOnly />} />
                                                <FormControlLabel value="3" control={<Radio size="small"/>} label={<Rating name="read-only" value={3} readOnly />} />
                                                <FormControlLabel value="4" control={<Radio size="small"/>} label={<Rating name="read-only" value={4} readOnly />} />
                                                <FormControlLabel value="5" control={<Radio size="small"/>} label={<Rating name="read-only" value={5} readOnly />} />
                                            </RadioGroup>
                                        </FormControl>
                                    </Stack>
                                    <Stack direction={'column'} width={'100%'} spacing={2} borderBottom='1px solid #e7e7e7' paddingBottom={'20px'} marginTop={'20px'}>
                                        <span style={{fontWeight : '600'}}>Hãy giới thiệu một chút về khách sạn của quý vị ?</span>
                                        <Textarea aria-label="empty textarea" placeholder="Thông tin khách sạn" value = {desc} onChange = {(e)=>{setDesc(e.target.value)}}  />
                                    </Stack>
                            </Paper>
                        </div>
                        )
                    }
                    {
                        activeStep == 2 && (
                        <div className="containerInforHotel1">
                            <h2 style={{width : '400px'}}>Khách có thể sử dụng gì tại khách sạn của Quý vị ?</h2>
                            <div style={{display : 'flex', gap : '20px'}}>
                            <Paper sx={{width : '400px', display: 'flex', flexDirection : 'column', alignItems : 'center', padding : '10px 30px', justifyContent : 'space-around'}}>
                                    <Stack direction={'column'} width={'100%'} spacing={1} borderBottom='1px solid #e7e7e7' paddingBottom={'20px'}>
                                        <FormGroup>
                                            {
                                                service && service.map((item,i)=>(
                                                    <FormControlLabel key={i} control={<Checkbox value={item.id} defaultChecked = {idService.indexOf(parseInt(item.id)) !== - 1 ? true : false} onChange={(e)=>{handleClikcService(e)}}/>} label={item.name} />
                                                ))
                                            }
                                        </FormGroup>
                                    </Stack>
                            </Paper>
                            {open && (
                                <Alert severity="warning" onClose={handleClose} sx={{width : '300px', height : '50%'}}>
                                    <b>Nếu tôi không thấy tiện nghi mà tôi có cung cấp thì sao?</b>
                                    <ul style={{color: 'gray', paddingLeft :'15px', display : 'flex', flexDirection : 'column', gap :'20px'}}>
                                        <li>
                                        Các tiện nghi được liệt kê tại đây là các tiện nghi được khách tìm kiếm nhiều nhất. Sau khi hoàn tất đăng ký, Quý vị có thể thêm nhiều tiện nghi khác qua danh sách đầy đủ hơn trên extranet, kênh mà Quý vị sẽ sử dụng để quản lý chỗ nghỉ của mình.
                                        </li>
                                    </ul>
                                </Alert>
                            )}
                            </div>
                        </div>
                        )
                    }
                    {
                        activeStep == 3 && (
                        <div className="containerInforHotel1">
                            <h2 style={{width : '400px'}}>Thông tin bữa sáng ?</h2>
                            <div style={{display : 'flex', gap : '20px'}}>
                            <Paper sx={{width : '400px',height : '360px', display: 'flex', flexDirection : 'column', alignItems : 'center', padding : '20px 30px', justifyContent : 'flex-start'}}>
                                    <Stack direction={'column'} width={'100%'} spacing={1}>
                                        <span style={{fontWeight : '600'}}>Khách sạn của Quý vị được có phục vụ bữa sáng không ?</span>
                                        <FormControl>
                                            <RadioGroup
                                                aria-labelledby="demo-controlled-radio-buttons-group"
                                                name="controlled-radio-buttons-group"
                                                value={isBreakfast}
                                                onChange={(e)=>{setIsBreakfast(e.target.value)}}
                                            >
                                                <FormControlLabel value={true} control={<Radio size="small"/>} label={'Có'} />
                                                <FormControlLabel value={false} control={<Radio size="small"/>} label={'Không'} />
                                            </RadioGroup>
                                        </FormControl>
                                    </Stack>
                            </Paper>
                            </div>
                        </div>
                        )
                    }
                    {
                        activeStep == 4 && (
                        <div className="containerInforHotel1">
                            <h2 style={{width : '500px'}}>Hãy cho chúng tôi biết về tình hình chỗ đậu xe tại khách sạn của Quý vị ?</h2>
                            <div style={{display : 'flex', gap : '20px'}}>
                            <Paper sx={{width : '400px', display: 'flex', flexDirection : 'column', alignItems : 'center', padding : '20px 30px', justifyContent : 'flex-start'}}>
                                    <Stack direction={'column'} width={'100%'} spacing={1}>
                                        <span style={{fontWeight : '600'}}>Quý vị có chỗ đậu xe cho khách không ?</span>
                                        <FormControl>
                                            <RadioGroup
                                                aria-labelledby="demo-controlled-radio-buttons-group"
                                                name="controlled-radio-buttons-group"
                                                value={isPark}
                                                onChange={(e)=>{setIsPark(e.target.value)}}
                                            >
                                                <FormControlLabel value={true} control={<Radio size="small"/>} label={'Có'} />
                                                <FormControlLabel value={false} control={<Radio size="small"/>} label={'Không'} />
                                            </RadioGroup>
                                        </FormControl>
                                    </Stack>
                            </Paper>
                            </div>
                        </div>
                        )
                    }
                    {
                        activeStep == 5 && (
                        <div className="containerInforHotel1">
                            <h2 style={{width : '500px'}}>Quy định chung</h2>
                            <div style={{display : 'flex', gap : '20px'}}>
                            <Paper sx={{width : '400px', display: 'flex', flexDirection : 'column', alignItems : 'center', padding : '20px 30px', justifyContent : 'flex-start'}}>
                                    <Stack direction={'column'} width={'100%'} spacing={5} borderBottom='1px solid #e7e7e7' paddingBottom={'20px'}>
                                        <span style={{fontWeight : '600'}}>Giờ nhận phòng - trả phòng của quý vị là khi nào ?</span>
                                        <Stack>
                                            <span style={{fontWeight : '600'}}>Nhận phòng</span>
                                            <Stack direction={'row'} spacing={6}>
                                                <Stack>
                                                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                                        <InputLabel id="demo-simple-select-standard-label">Từ</InputLabel>
                                                        <Select
                                                        labelId="demo-simple-select-standard-label"
                                                        id="demo-simple-select-standard"
                                                        value={timeCheckIn.from}
                                                        onChange={(e)=>{
                                                            setTimeCheckIn((prev)=>({...prev, from : e.target.value}))
                                                        }}
                                                        label="Age"
                                                        >
                                                        {data.map((item, i)=>(
                                                            <MenuItem value={item} key={i}>{item}</MenuItem>
                                                        ))}
                                                        </Select>
                                                    </FormControl>
                                                </Stack>
                                                <Stack>
                                                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                                        <InputLabel id="demo-simple-select-standard-label">Đến</InputLabel>
                                                        <Select
                                                        labelId="demo-simple-select-standard-label"
                                                        id="demo-simple-select-standard"
                                                        value={timeCheckIn.to}
                                                        onChange={(e)=>{
                                                            setTimeCheckIn((prev)=>({...prev, to : e.target.value}))
                                                        }}
                                                        label="Age"
                                                        >
                                                        {data.map((item, i)=>(
                                                            <MenuItem value={item} key={i}>{item}</MenuItem>
                                                        ))}
                                                        </Select>
                                                    </FormControl>
                                                </Stack>
                                            </Stack>
                                        </Stack>
                                        <Stack>
                                            <span style={{fontWeight : '600'}}>Trả phòng</span>
                                            <Stack direction={'row'} spacing={6}>
                                                <Stack>
                                                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                                        <InputLabel id="demo-simple-select-standard-label">Từ</InputLabel>
                                                        <Select
                                                        labelId="demo-simple-select-standard-label"
                                                        id="demo-simple-select-standard"
                                                        value={timeCheckOut.from}
                                                        onChange={(e)=>{
                                                            setTimeCheckOut((prev)=>({...prev, from : e.target.value}))
                                                        }}
                                                        label="Age"
                                                        >
                                                        {data.map((item, i)=>(
                                                            <MenuItem value={item} key={i}>{item}</MenuItem>
                                                        ))}
                                                        </Select>
                                                    </FormControl>
                                                </Stack>
                                                <Stack>
                                                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                                        <InputLabel id="demo-simple-select-standard-label">Đến</InputLabel>
                                                        <Select
                                                        labelId="demo-simple-select-standard-label"
                                                        id="demo-simple-select-standard"
                                                        value={timeCheckOut.to}
                                                        onChange={(e)=>{
                                                            setTimeCheckOut((prev)=>({...prev, to : e.target.value}))
                                                        }}
                                                        label="Age"
                                                        >
                                                        {data.map((item, i)=>(
                                                            <MenuItem value={item} key={i}>{item}</MenuItem>
                                                        ))}
                                                        </Select>
                                                    </FormControl>
                                                </Stack>
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                    <Stack direction={'column'} width={'100%'} spacing={1} marginTop={'20px'}>
                                        <span style={{fontWeight : '600'}}>Quý vị có cho phép vật nuôi không ?</span>
                                        <FormControl>
                                            <RadioGroup
                                                aria-labelledby="demo-controlled-radio-buttons-group"
                                                name="controlled-radio-buttons-group"
                                                value={isAnimal}
                                                onChange={(e)=>{setIsAnimal(e.target.value)}}
                                            >
                                                <FormControlLabel value={true} control={<Radio size="small"/>} label={'Có'} />
                                                <FormControlLabel value={false} control={<Radio size="small"/>} label={'Không'} />
                                            </RadioGroup>
                                        </FormControl>
                                    </Stack>
                            </Paper>
                            </div>
                        </div>
                        )
                    }
                    {
                        activeStep == 6 && (
                            <ImageHotel selectedImages={selectedImages} setSelectedImages = {setSelectedImages}/>
                        )
                    }
                    {
                        activeStep == 7 && (
                        <div className="containerInforHotel1">
                            <h2 style={{width : '500px'}}>Thanh toán</h2>
                            <div style={{display : 'flex', gap : '20px'}}>
                            <Paper sx={{width : '400px', display: 'flex', flexDirection : 'column', alignItems : 'center', padding : '20px 30px', justifyContent : 'flex-start'}}>
                                    <Stack direction={'column'} width={'100%'} spacing={1}>
                                        <span style={{fontWeight : '600'}}>Khách thanh toán tiền phòng bằng cách nào ?</span>
                                        <FormControl>
                                            <RadioGroup
                                                aria-labelledby="demo-controlled-radio-buttons-group"
                                                name="controlled-radio-buttons-group"
                                                value={isPark}
                                                onChange={(e)=>{setIsPark(e.target.value)}}
                                            >
                                                <FormControlLabel value={true} control={<Radio size="small"/>} label={'Bằng thẻ tín dụng, tại chỗ nghỉ'} />
                                                <FormControlLabel value={false} control={<Radio size="small"/>} label={'Thanh toán online khi đặt phòng. Booking.com sẽ hỗ trợ xử lý các khoản thanh toán của khách với dịch vụ Thanh toán bởi Booking.com.'} />
                                            </RadioGroup>
                                        </FormControl>
                                    </Stack>
                            </Paper>
                            </div>
                        </div>
                        )
                    }
                    {
                        activeStep == 8 && (
                            <div className='containerSuccessInfor'>
                                <div className="itemSucess">
                                    <table style={{width : '100%'}}>
                                        <tr>
                                            <td width={'10%'}><img src="https://thumbs.dreamstime.com/b/tick-icon-vector-symbol-checkmark-isolated-white-background-checked-correct-choice-sign-check-mark-checkbox-picto-pictogram-143596426.jpg" height={'40px'} alt="" srcset="" /></td>
                                            <td>
                                                <div style={{display : 'flex', flexDirection :'column', gap : '10px'}}>
                                                <span className='titleH2'>Bước 1</span>
                                                <span style={{fontWeight : '700'}}>Thông tin khách sạn</span>
                                                <span className='titleH2'>Các thông tin cơ bản. Nhập tên chỗ nghỉ, địa chỉ, tiện nghi và nhiều hơn nữa.</span>
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                                <div className="itemSucess">
                                    <table style={{width : '100%'}}>
                                        <tr>
                                        <td width={'10%'}><img src="https://thumbs.dreamstime.com/b/tick-icon-vector-symbol-checkmark-isolated-white-background-checked-correct-choice-sign-check-mark-checkbox-picto-pictogram-143596426.jpg" height={'40px'} alt="" srcset="" /></td>
                                            <td>
                                                <div style={{display: 'flex', justifyContent : 'space-between', alignItems: 'center'}}>
                                                <div style={{display : 'flex', flexDirection :'column', gap : '10px'}}>
                                                <span className='titleH2'>Bước 2</span>
                                                <span style={{fontWeight : '700'}}>Ảnh</span>
                                                <span className='titleH2'>Chia sẻ một số hình ảnh chỗ nghỉ của Quý vị để khách biết mình nên có những kỳ vọng gì.</span>
                                                </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                                <div className="itemSucess">
                                    <table style={{width : '100%'}}>
                                        <tr>
                                            <td width={'10%'}><img src="https://icon-library.com/images/room-icon/room-icon-8.jpg" height={'40px'} alt="" srcset="" /></td>
                                            <td>
                                                <div style={{display: 'flex', justifyContent : 'space-between', alignItems: 'center', flexDirection : 'column', gap : '10px'}}>
                                                <div style={{display : 'flex', flexDirection :'column', gap : '10px', flex : '6', marginRight : '25px'}}>
                                                <span className='titleH2'>Bước 3</span>
                                                <span style={{fontWeight : '700'}}>Phòng</span>
                                                <span className='titleH2'>Hãy cho chúng tôi biết về phòng đầu tiên của Quý vị. Sau khi đã thiết lập xong một căn, Quý vị có thể thêm nhiều căn nữa.</span>
                                                </div>
                                                {
                                                    selectedRooms && selectedRooms.length > 0 && selectedRooms.map((item, i)=>(
                                                        <Stack direction={'row'} key={i} width={'100%'} spacing={3}>
                                                            <img src="https://q.bstatic.com/static/img/join/illustrated_bedroom.jpg" height={'103px'} width={'99px'} alt="" srcset="" />
                                                            <Stack spacing={2}>
                                                                <Stack><span style={{fontWeight : '700'}}>{item.room.name}</span></Stack>
                                                                <table width={'100%'}>
                                                                    <tr>
                                                                        <td style={{padding : '5px 8px', fontSize : '13px', color: 'gray'}}>Lượng khách</td>
                                                                        <td style={{padding : '5px 8px', fontSize : '13px', color: 'gray'}}>Có được hút thuốc</td>
                                                                        <td style={{padding : '5px 8px', fontSize : '13px', color: 'gray'}}>Phòng loại này</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style={{padding : '5px 8px', fontSize : '13px', color: 'gray'}}>{item.room.numPersonMax}</td>
                                                                        <td style={{padding : '5px 8px', fontSize : '13px', color: 'gray'}}>{item.room.isSmoke ? 'Có' : 'Không'}</td>
                                                                        <td style={{padding : '5px 8px', fontSize : '13px', color: 'gray'}}>{item.room.CategoryId}</td>
                                                                    </tr>
                                                                </table>
                                                            </Stack>
                                                            <Divider/>
                                                        </Stack>
                                                    ))
                                                }
                                                {idHotel && (
                                                    <AddRoom id = {idHotel}/>
                                                )}
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                                <div className="itemSucess1" onClick={()=>{handleComplete()}}>
                                    <Button variant='contained' style={{width : '100%'}}onClick={()=>{navigae('/hotelAdmin'); dispatch(clearRooms)}}>Trở về trang chủ</Button>
                                </div>
                            </div>
                        )
                    }
                    </div>
                ) : (
                    <div>cc</div>
                )
            }
            <div>
                {allStepsCompleted() ? (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                    All steps completed - you&apos;re finished
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Box sx={{ flex: '1 1 auto' }} />
                    <Button onClick={handleReset}>Reset</Button>
                    </Box>
                </React.Fragment>
                ) : (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1, py: 1 }}>

                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        {
                            activeStep < 7 && (
                                <Button
                                color="inherit"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{ mr: 1 }}
                            >
                                Back
                            </Button>
                            )
                        }
                    <Box sx={{ flex: '1 1 auto' }} />
                    {activeStep == 7     ? (
                        <Button onClick={handleCreateHotel} sx={{ mr: 1 }}>
                            OK
                        </Button>
                    ) : (
                        <Button onClick={()=>checkError(activeStep)} sx={{ mr: 1 }}>
                            Next
                        </Button>
                    )}
                    {activeStep !== steps.length &&
                        (completed[activeStep] ? (
                        <Typography variant="caption" sx={{ display: 'inline-block' }}>
                            Step {activeStep + 1} already completed
                        </Typography>
                        ) : (
                        <Button onClick={handleComplete}>
                            {completedSteps() === totalSteps() - 1
                            ? 'Finish'
                            : 'Complete Step'}
                        </Button>
                        ))}
                    </Box>
                </React.Fragment>
                )}
            </div>
        </Box>
        </div>
        <MailList/>
        <Footer />
    </div>
  )
}

export default InforHotel