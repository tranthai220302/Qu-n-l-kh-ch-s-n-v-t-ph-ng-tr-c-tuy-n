import React, { useState } from 'react'
import './BookRoom.css'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Navbar from '../../../compoments/customer/navbar/Navbar';
import MailList from '../../../compoments/customer/mailList/MailList';
import Footer from '../../../compoments/customer/footer/Footer';
import Header from '../../../compoments/customer/header/Header';
import RoomBook from '../../../compoments/customer/roomBook/RoomBook';
import InformationUser from '../../../compoments/customer/InformationUser/InformationUser';
import Payment from '../../../compoments/customer/payment/Payment';
import { useParams } from 'react-router-dom';
const steps = ['Chọn phòng', 'Chi tiết thông tin về bạn', 'Thanh toán'];
const BookRoom = () => {
    const {id} = useParams()
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('currentUser')));
    const [error, setError] = useState(false)
    const [inforUser, setInforUser] = useState({
        name: user ? user.name : '',
        email: user ? user.email : '',
        phone: user ? user.phone : '',
        genDer : user ? user.genDer : ''
      });
    const [address, setAddress] = useState('')
    const [activeStep, setActiveStep] = React.useState(1);
    const [completed, setCompleted] = React.useState({});
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
    const handleCheck = () =>{
        if(!inforUser.name || !inforUser.email || !inforUser.phone || !inforUser.genDer || !address){
            setError('Nhập đầy đủ thông tin!')
        }else handleNext()
    }
  
    const handleBack = () => {
        if (activeStep === 1) {
            setActiveStep(1);
        } else {
            setActiveStep((prevActiveStep) => prevActiveStep - 1);
        }
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
      setActiveStep(1);
      setCompleted({});
    };
  return (
    <div>
        <Navbar />
        <Header type="list" />
        <div className='containerBook'>
        <Box sx={{ width: '1024px' }}>
        <Stepper nonLinear activeStep={activeStep}>
            {steps.map((label, index) => {
                if(index == 0){
                    return (
                        <Step key={label} completed={true}>
                            <StepButton color="inherit" onClick={handleStep(index)}>
                            {label}
                            </StepButton>
                        </Step>
                    )
                }else{
                    return(
                        <Step key={label} completed={completed[index]}>
                            <StepButton color="inherit" onClick={handleStep(index)}>
                            {label}
                            </StepButton>
                        </Step>
                    )
                }
            })}
        </Stepper>
        </Box>
        <div className="bookContent">
            <RoomBook id = {id}/>
            {activeStep == 1 && (
                <div>
                    <InformationUser inforUser = {inforUser} setInforUser = {setInforUser} address = {address} setAddress = {setAddress}/>
                    <span style={{color : 'red', fontSize : '14px', fontStyle : 'italic', marginTop : '20px'}}>{error}</span>
                </div>
            )}
            {activeStep == 2 && (
                <Payment inforUser = {inforUser} setInforUser = {setInforUser} address = {address} setAddress = {setAddress} id = {id}/>
            )}
        </div>
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
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                >
                    Quay lại
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                {activeStep == 1 && (
                    <Button onClick={handleCheck} sx={{ mr: 1 }}>
                        Tiếp tục
                    </Button>
                )}
                {activeStep !== steps.length &&
                    (completed[activeStep] ? (
                    <Typography variant="caption" sx={{ display: 'inline-block' }}>
                        Bước {activeStep + 1} hoàng thành
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
        </div>
        <MailList />
        <Footer />
    </div>
  )
}

export default BookRoom