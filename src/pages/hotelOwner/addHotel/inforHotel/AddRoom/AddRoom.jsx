import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import { useState } from 'react';
import './AddRoom.css'
import RoomTitle from '../../../../../compoments/hotelOwner/room/RoomTitle';
import BathRoom from '../../../../../compoments/hotelOwner/room/BathRoom/BathRoom';
import ItemRoom from '../../../../../compoments/hotelOwner/room/ItemRoom/ItemRoom';
import { Button, CircularProgress, FormControlLabel, Paper, Radio, RadioGroup, Rating, Stack, TextField, TextareaAutosize } from '@mui/material'
import PriceTypeRoom from '../../../../../compoments/hotelOwner/room/PriceTypeRoom/PriceTypeRoom';
import ImgRoom from '../../../../../compoments/hotelOwner/room/ImgRoom/ImgRoom';
import uploadImg from '../../../../../ults/upImage';
import Backdrop from '@mui/material/Backdrop';
import newRequest from '../../../../../ults/newRequest';
import { useSelector, useDispatch } from 'react-redux';
import { addRoom } from '../../../../../redux/actions/roomAction';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const steps = ['', '', '', '', '', '', ''];
export default function AddRoom({id}) {
  const [open, setOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [nameRoom, setNameRoom] = useState('')
  const [selectedImages, setSelectedImages] = useState([])
  const [category, setCategory] = useState(null);
  const [isSmoke, setIsSmoke] = useState(false);
  const [idItem, setIdItem] = useState([]);
  const [idItems, setIdItems] = useState([]);
  const [price, setPrice] = useState([]);
  const [percent, setPercent] = useState({});
  const [number, setNumber] = useState([]);
  const [isLoadingCreate, setIsLoadingCreate] = useState(false);
  const [errorCreate, setErrorCreate] = useState(false)
  const dispatch = useDispatch();
  const selectedRooms = useSelector(state => state.room.createRoom);
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
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCreateRoom = async() =>{
        setIsLoadingCreate(true)
        let img = []
        for(let i = 0 ; i < selectedImages.length; i++){
            const imgItem = await uploadImg(selectedImages[i]);
            img.push(imgItem);
        }
        const priceRoom = []
        console.log(percent)
        for(let i = 1; i <5 ; i++){
          priceRoom.push({
            person : i,
            price : price*i - (price* i * parseInt(percent[i]) || 0) / 100,
            numberRoom : number[i] || 0
          })
        }
        newRequest.post(`/room/create/${id}`, {
          priceRoom : priceRoom,
          imgs : img,
          name : nameRoom,
          isSmoke : isSmoke,
          items : idItem.concat(idItems),
          category : category
        }).then((res)=>{
          setIsLoadingCreate(false);
          setErrorCreate(false)
          console.log(res.data.room)
          dispatch(addRoom(res.data.room))
          handleClose()
        }).catch((error)=>{
          setErrorCreate(error.response.data)
          setIsLoadingCreate(false);  
        })
}
  console.log(selectedRooms)
  return (
    <div style={{backgroundColor : '#f9f9fa'}}>
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
       Thêm phòng
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
                >
                <CloseIcon />
                </IconButton>
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Thêm phòng
            </Button>
          </Toolbar>
        </AppBar>
        <List>
        <div className='containerAddRoom' >
            <Box sx={{ width: '100%' }}>
            <Stepper nonLinear activeStep={activeStep}>
                {steps.map((label, index) => (
                <Step key={label} completed={completed[index]}>
                    <StepButton color="inherit" onClick={handleStep(index)}>
                    {label}
                    </StepButton>
                </Step>
                ))}
            </Stepper>
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
                    <div>
                        {activeStep == 0 && (
                            <RoomTitle category={category} setCategory={setCategory} isSmoke={isSmoke} setIsSmoke={setIsSmoke}/>
                        )}
                        {activeStep == 1 && (
                            <BathRoom idItem={idItem} setIdItem={setIdItem}/>
                        )}
                        {activeStep == 2 && (
                            <ItemRoom idItem = {idItems} setIdItem={setIdItems}/>
                        )}
                        {activeStep == 3 && (
                               <div className="containerRoomTitle">
                               <h2 style={{width : '400px'}}>Tên của phòng này là gì?</h2>
                               <div style={{display : 'flex', gap : '20px'}}>
                                   <Paper sx={{width : '400px', height : '200px', display: 'flex', flexDirection : 'column', alignItems : 'center', padding : '20px 30px', justifyContent : 'flex-start'}}>
                                       <Stack spacing={2} width={'100%'}>
                                       <span className='titleH2'>Đây là tên mà khách sẽ thấy trên trang chỗ nghỉ của Quý vị. Hãy chọn tên miêu tả phòng này chính xác nhất.</span>
                                       <Stack direction={'column'} width={'100%'} spacing={2}>
                                                <span style={{fontWeight : 700}}>Tên phòng</span>
                                               <TextField
                                                    id="outlined-size-small"
                                                    defaultValue={nameRoom}
                                                    size="small"
                                                    onChange={(e)=>{setNameRoom(e.target.value)}}
                                                />
                                           </Stack>
                                       </Stack>
                                   </Paper>
                               </div>
                               </div>
                        )}
                        {activeStep == 4 && (
                            <PriceTypeRoom price={price} setPrice={setPrice} percent={percent} setPercent={setPercent} number={number} setNumber={setNumber}/>
                        )}
                        {activeStep == 5 && (
                            <ImgRoom selectedImages={selectedImages} setSelectedImages={setSelectedImages}/>
                        )}
                        <Backdrop
                          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                          open={isLoadingCreate}
                        >
                          <CircularProgress color="inherit" />
                        </Backdrop>
                    </div>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Button
                        color="inherit"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                    >
                        Back
                    </Button>
                    <Box sx={{ flex: '1 1 auto' }} />
                    {
                      activeStep == 5 ? (
                      <Button onClick={()=>{handleCreateRoom()}} sx={{ mr: 1 }}>
                        Tạo phòng
                      </Button>
                      ):(
                      <Button onClick={handleNext} sx={{ mr: 1 }}>
                          Next
                      </Button>
                      )
                    }
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
        </List>
      </Dialog>
    </React.Fragment>
    </div>
  );
}