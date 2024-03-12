import React, {useEffect, useState} from 'react'
import NavbarOwner from '../../../compoments/hotelOwner/NavbarOwner/NavbarOwner'
import MailList from '../../../compoments/customer/mailList/MailList'
import Footer from '../../../compoments/customer/footer/Footer'
import './ReviewOwner.css'
import dayjs from 'dayjs';
import { format } from 'date-fns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Button, CircularProgress } from '@mui/material';
import newRequest from '../../../ults/newRequest';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import TablePagination from '@mui/material/TablePagination';

function createData(name, calories, fat, carbs, desc, rating) {
    return {
      name,
      calories,
      fat,
      carbs,
      desc,
      rating
    };
  }
  function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
  
    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.name}
          </TableCell>
          <TableCell align="right">{row.calories}</TableCell>
          <TableCell align="right">{row.fat}</TableCell>
          <TableCell align="right">{row.carbs}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Chi tiết
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableBody>
                      <TableRow key={1}>
                        <TableCell component="th" scope="row" sx={{fontWeight : '600', width : '30%'}}>
                          Nội dung đánh giá
                        </TableCell>
                        <TableCell sx={{fontStyle : 'italic', fontSize : '12px'}}>{row.desc}</TableCell>
                      </TableRow>
                      {row.rating.map((item, i)=>(
                        <TableRow key={i+2}>
                            <TableCell component="th" scope="row" sx={{fontWeight : '600'}}>
                            {item.CategoryRating.name}
                            </TableCell>
                            <TableCell component="th" scope="row">
                            {item.score}đ
                            </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
  Row.propTypes = {
    row: PropTypes.shape({
      calories: PropTypes.number.isRequired,
      carbs: PropTypes.number.isRequired,
      fat: PropTypes.number.isRequired,
      history: PropTypes.arrayOf(
        PropTypes.shape({
          amount: PropTypes.number.isRequired,
          customerId: PropTypes.string.isRequired,
          date: PropTypes.string.isRequired,
        }),
      ).isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      protein: PropTypes.number.isRequired,
    }).isRequired,
  };
const ReviewOwner = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false)
  const [dateStart, setDateStart] = useState('01-01-2024');
  const [dateEnd, setDateEnd] = useState('01-01-2024');
  const [data, setDate] = useState([])
  const [row, setRow] = useState([])
  const [feedBack, setFeedBack] = useState(null)
  const hanldeResult = () =>{
    setIsLoading(true)
    newRequest.post('/owner/review', {
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
  useEffect(()=>{
    if(data.length > 0){
        let r = []
        data.map((item)=>{
            let rating = 0;
            item.Ratings.map((ratingI)=>{
                rating += ratingI.score
            })
            r.push(createData(
                item.Customer.User.name,
                Math.floor(rating/item.Ratings.length).toFixed(1) + "đ",
                item.PriceRoom.id,
                format(item.updatedAt, 'dd-MM-yyyy'),
                item.desc,
                item.Ratings
            ))
        })
        setRow(r)
    }
  },[data, dateStart, dateEnd])
  return (
    <div>
        <NavbarOwner newValue={2} />
        <div className="containerReviewOwner">
            <h2>Đánh giá</h2>
            <span className='titleH2'>Tiếp thu ý kiến của khách hàng để khách sạn phát triển hơn</span>
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
              <Button variant='contained' onClick={()=>{hanldeResult()}} sx={{height : '55px'}}>Hiển thị đánh giá</Button>
              </div>
            </LocalizationProvider>
            {data && !isLoading && !error && data.length > 0 && (
                <TableContainer component={Paper} style={{marginTop : '30px'}}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell style={{fontWeight : '700', fontSize : '17px'}}>Khách hàng</TableCell>
                            <TableCell style={{fontWeight : '700', fontSize : '17px'}} align="right">Tổng điểm</TableCell>
                            <TableCell style={{fontWeight : '700', fontSize : '17px'}} align="right">Mã phòng đánh giá</TableCell>
                            <TableCell style={{fontWeight : '700', fontSize : '17px'}} align="right">Ngày đánh giá/chỉnh sửa</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {row.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((rowI, i) => (
                            <Row key={i} row={rowI} />
                        ))}
                    </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={row.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={(event, newPage) => {
                            setPage(newPage);
                        }}
                        onRowsPerPageChange={(event) => {
                            setRowsPerPage(parseInt(event.target.value, 10));
                            setPage(0);
                        }}
                    />
            </TableContainer>
            )}
            {isLoading && <div style={{display : 'flex', margin : 'auto', marginTop : '20px'}}><CircularProgress /></div>}
            {error && (<span style={{fontSize : '14px', fontStyle : 'italic', marginTop : '20px', color : 'red'}}>{error}</span>)}
        </div>
        <MailList/>
        <Footer/>
    </div>
  )
}

export default ReviewOwner