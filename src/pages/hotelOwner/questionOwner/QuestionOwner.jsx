import React,{useState} from 'react'
import NavbarOwner from '../../../compoments/hotelOwner/NavbarOwner/NavbarOwner'
import MailList from '../../../compoments/customer/mailList/MailList'
import Footer from '../../../compoments/customer/footer/Footer'
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import dayjs from 'dayjs';
import { format } from 'date-fns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Alert, Button, Checkbox, CircularProgress } from '@mui/material';
import newRequest from '../../../ults/newRequest';
import { styled } from '@mui/material/styles';
import './QuestionOwner.css'
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import Backdrop from '@mui/material/Backdrop';
import Snackbar from '@mui/material/Snackbar';
import LinearWithValueLabel from '../../../compoments/linear/Linear';
import { CheckBox } from '@mui/icons-material';
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
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
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
const QuestionOwner = () => {
    const [state, setState] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'right',
    });
    const { vertical, horizontal, openSnack } = state;
    const handleCloseSnack = () => {
        setState({ ...state, openSnack: false });
    };
    const [expanded, setExpanded] = React.useState(false);
    const [dateStart, setDateStart] = useState('01-01-2024');
    const [dateEnd, setDateEnd] = useState('01-01-2024');
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingDel, setIsLoadingDel] = useState(false);
    const [error, setError] = useState(false)
    const [isLoadingFeed, setIsLoadingFeed] = useState(false);
    const [errorF, setErrorF] = useState(false)
    const [data, setDate] = useState([])
    const [feedBack, setFeedBack] = useState(null)
    const [message, setMasseage] = useState('')
    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };
    const [id, setId] = useState([])
    const handleId = (e) =>{
        let is = e.target.checked;
        if(is){
            setId([...id, parseInt(e.target.value)])
        }else{
            setId(id.filter(item => item != e.target.value))
        }
    }
    const handleDelete = () =>{
        setIsLoadingDel(true)
        newRequest.post('/feedback/delete', {
            id : id
        }).then((res)=>{
            console.log(res.data)
            setIsLoadingDel(false);
            setError(false)
            setState({
                openSnack: true,
                vertical: 'top',
                horizontal: 'right',
            })
            setMasseage('Xoá thành công!')
            hanldeResult()
            setId([])
        }).catch((error)=>{
            setIsLoadingDel(false);
            setError(error.response.data)
        })
    }
    const hanldeResult = () =>{
        setIsLoading(true)
        newRequest.post('/owner/question', {
            dateStart : format(dateStart, 'yyyy-MM-dd'),
            dateEnd : format(dateEnd, 'yyyy-MM-dd')
        }).then((res)=>{
            console.log(res.data)
            setDate(res.data)
            setIsLoading(false);
            setError(false)
        }).catch((error)=>{
            setIsLoading(false);
            setError(error.response.data)
            console.log(error.response.data)
        })
      }
      const hanldeFeedBack = (id) =>{
        setIsLoadingFeed(true)
        newRequest.post(`/feedBack/create/${id}`, {
            feedback : feedBack
        }).then((res)=>{
            setIsLoadingFeed(false);
            setError(false)
            setState({
                openSnack: true,
                vertical: 'top',
                horizontal: 'right',
            })
            setMasseage('Phản hồi thành công!')
            hanldeResult()
        }).catch((error)=>{
            setIsLoadingFeed(false);
            setError(error.response.data)
            console.log(error.response.data)
        })
      }
  return (
    <div>
        <NavbarOwner newValue={3}/>
        {isLoadingFeed && <LinearWithValueLabel isLoading={isLoadingFeed}/>}
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
                {message}
            </Alert>
        </Snackbar>
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isLoadingDel}
            >
            <CircularProgress color="inherit" />
        </Backdrop>
        <div className="containerQuestionOwner">
            <h2>Đánh giá</h2>
            <span className='titleH2'>Hãy phản hồi các câu hỏi của khách hàng để họ có thể hiểu hơn về khách sạn của bạn ?</span>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div style={{display: 'flex', gap : '30px', marginTop : '30px'}}>
              <DatePicker
                label="Từ ngày"
                value={dayjs(dateStart)}
                onChange={(newValue) => setDateStart(format(newValue.$d, 'yyyy-MM-dd'))}
                size="small"
                sx={{width : '25%'}}
                className="customDatePicker"
              />
              <DatePicker
                label="Đến ngày"
                value={dayjs(dateEnd)}
                onChange={(newValue) => setDateEnd(format(newValue.$d, 'yyyy-MM-dd'))}
                size="small"
                sx={{width : '25%'}}
              />
              <Button variant='contained' onClick={()=>{hanldeResult()}} sx={{height : '55px'}}>Hiển thị câu hỏi</Button>
              </div>
            </LocalizationProvider>            
            <div style={{marginTop : '30px'}}>
                {data && !error && !isLoading && data.length > 0 && data.map((item, i)=>(
                <Accordion expanded={expanded === `panel${i}`} onChange={handleChange(`panel${i}`)} key={i}>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                    >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                        <Checkbox {...label} value={item.id} size="small" onChange={(e)=>{handleId(e)}} />
                        {item.Customer.User.name}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{item.question}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography sx={{ width: '67%', flexShrink: 0, marginLeft : '33%' }}>
                        <div style={{display : 'flex', gap : '20px', alignItems: 'center'}}>
                            <Textarea aria-label="empty textarea" placeholder="Nhập câu trả lời của bạn ?"  onChange={(e)=>{setFeedBack(e.target.value)}}/>
                            <img src="https://cdn-icons-png.freepik.com/256/9572/9572674.png" alt="" srcset="" height={'45px'} style={{marginTop : '10px', cursor : 'pointer'}} className='imgSend' onClick={()=>{hanldeFeedBack(item.id)}}/>
                        </div>
                    </Typography>
                    </AccordionDetails>
                </Accordion>
                ))}
                {isLoading && <div style={{display : 'flex', margin : 'auto', marginTop : '20px'}}><CircularProgress /></div>}
                {error && (<span style={{fontSize : '14px', fontStyle : 'italic', marginTop : '20px', color : 'red'}}>{error}</span>)}
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    {id.length > 0 && (
                        <Button variant="outlined" color="error" style={{ width: '60px', fontSize: '13px', height: '28px' }} onClick={()=>handleDelete()}>
                            Xoá
                        </Button>
                    )}
                </div>
            </div>
        </div>
        <MailList/>
        <Footer/>
    </div>
  )
}

export default QuestionOwner