import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import './ModalCreate.css'
import newRequest from '../../../../../ults/newRequest';
import { useState } from 'react';
import { useEffect } from 'react';
import Slider from '@mui/material/Slider';
import Snackbar from '@mui/material/Snackbar';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};


const steps = [
    {
      label: 'Nhập chi tiết đặt phòng của bạn',
      description: `Vui lòng kiểm tra email xác nhận đặt phòng để tìm mã số đặt phòng và PIN`,
    },
    {
      label: 'Chấm điểm',
      description : 'Chấm điểm các dịch vụ '
    },
    {
        label: 'Đánh giá phòng',
        description : 'Nội dung đánh giá'
      },
  ];
export default function ModalCreate({getDataReview}) {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [category, setCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false)
  const maxSteps = steps.length;
  const [pinCode, setPinCode] = useState(null);
  const [idRoom, setIdRoom] = useState(null);
  const [errorCheck, setErrorCheck] = useState(false);
  const [isLoadingCheck, setIsLoadingCheck] = useState(false);
  const [score, setScore] = useState(null)
  const [isLoad, setIsLoad] = useState(false)
  const [errorLoad, setErrorLoad] = useState(false);
  const [desc, setDesc] = useState(null);
  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'right',
  });
  const { vertical, horizontal, openSack } = state;
  const handleCloseSnack = () => {
    setState({ ...state, openSnack: false });
  };
  const getData = () =>{
    setIsLoading(true)
    newRequest.get('/review/category').then((res)=>{
        setIsLoading(false)
        setError(false)
        setCategory(res.data)
        const arr = res.data.map((item)=>{
            return {
                id : item.id,
                score : 10
            }
        })
        setScore(arr)
        console.log(res.data)
    }).catch((error)=>{
        setIsLoading(false)
        setError(error.response.data)
    })
  }
  const handleScore = (id, value) =>{
    const update = [...score];
    const index = update.findIndex(item=>item.id === id);
    if(index !== -1){
        update[index].score = value;
    }else{
        update.push({id:id, score:value})
    }
    setScore(update)
  }
  const handleCheck = (idRoom, pinCode)=>{
    setIsLoadingCheck(true);
    if(!idRoom || !pinCode){
        setErrorCheck('Nhập thông tin đầy đủ');
    }else{
        newRequest.post('/review/check',{
            idRoom,
            pinCode
        }).then((res)=>{
            setIsLoadingCheck(false);
            setErrorCheck(false)
            handleNext();
        }).catch((error)=>{
            setErrorCheck(error.response.data);
            setIsLoadingCheck(false)
        })
    }
  }
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  useEffect(()=>{
    getData();
  },[])
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleKeyDown = (event) => {
    event.stopPropagation();
  }
  const hanleReview = (desc, category, idRoom) =>{
    if(!desc){
        setErrorLoad('Nhập thông tin đánh giá !')
    }else{
        setIsLoad(true)
        newRequest.post('/review/create',{
            desc,
            category : category,
            idRoom : idRoom,
            img : ''
        }).then((res)=>{
            setIsLoad(false);
            setErrorLoad(false)
            setState({
                openSack: true,
                vertical: 'top',
                horizontal: 'right',
            })
            getDataReview(1)
            handleClose()
        }).catch((error)=>{
            setErrorLoad(error.response.data);
            setIsLoad(false)
        })
    }
  }
  return (
    <div>
      <Button variant="outlined" onClick={handleOpen}>Viết đánh giá</Button>
      <Snackbar 
        anchorOrigin={{ vertical, horizontal }}
        open={openSack}
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
        Cảm ơn bạn đã đóng góp ý kiến !
    </Alert>
      </Snackbar>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
        <Paper
        square
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: 50,
          pl: 2,
          bgcolor: 'background.default',
        }}
      >
        <Typography>
            <h3>{steps[activeStep].label}</h3>
        </Typography>
      </Paper>
      <Box sx={{ height: 230, maxWidth: 400, width: '100%', p: 2 }}>
        <span className='titleH2'>{steps[activeStep].description}</span>
        {activeStep == 0 &&(
            <div className='pinCode'>
                <div className="pinCodeItem">
                    <span>Mã đặt phòng</span>
                    <input type="text" onChange={(e)=>{setIdRoom(e.target.value)}} defaultValue={idRoom}  onKeyDown={handleKeyDown}/>
                </div>
                <div className="pinCodeItem">
                    <span>Mã pin</span>
                    <input type="text" onChange={(e)=>{setPinCode(e.target.value)}} defaultValue={pinCode}  onKeyDown={handleKeyDown}/>
                </div>
                {
                    errorCheck && (
                        <span style={{marginTop : '-10px', fontSize : '12px', color : 'red'}}>{errorCheck}</span>
                    )
                }
            </div>
        )}
        {
            activeStep == 1 && score &&(
                <div className="scoreRating">
                {
                    category && category.map((item, i)=>(
                        <div class="scoreRatingItem" key={i}>
                            <div className="scoreRatingTitle">
                                <span>{item.name}</span>
                            </div>
                            <Box sx={{ width: 100 }}>
                                <Slider
                                    size="small"
                                    value={score[i].score}
                                    aria-label="Small"
                                    valueLabelDisplay="auto"
                                    min={1}
                                    max={10}
                                    name={item.id}
                                    onChange={(e)=>{handleScore(e.target.name, e.target.value)}}
                                />
                            </Box>
                        </div>
                    ))
                }
                </div>
            )
        }
        {
            activeStep == 2 && (
                <div style={{display : 'flex', flexDirection : 'column', gap : '5px'}}>
                    <textarea name="" id="" cols="36" rows="10" className='textReview' onChange={(e)=>{setDesc(e.target.value)}} onKeyDown={handleKeyDown}></textarea>
                    {
                    errorLoad && (
                        <span style={{fontSize : '12px', color : 'red'}}>{errorLoad}</span>
                    )
                }
                </div>
            )
        }
      </Box>
      <MobileStepper
        variant="text"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={() => {
                if (activeStep === 0) {
                  handleCheck(idRoom, pinCode);
                } else if(activeStep == 1) {
                  handleNext();
                } else if(activeStep == 2){
                  hanleReview(desc, score, idRoom)
                }
            }}
          >
            {activeStep == 0 && isLoading && !error ? (
                <CircularProgress color="inherit" size={13}/>
            ) : activeStep == 0 && !isLoading && !error ? ( <span>Next</span>) : activeStep == 1 ? ( <span>Next</span>) : activeStep == 2 && isLoad && !error ? (<CircularProgress color="inherit" size={13}/>) : ( <span>OK</span>)}
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
        </Box>
      </Modal>
    </div>
  );
}
