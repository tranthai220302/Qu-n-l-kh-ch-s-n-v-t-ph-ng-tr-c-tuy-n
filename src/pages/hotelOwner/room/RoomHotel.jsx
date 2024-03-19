import React, {useEffect, useState} from 'react'
import NavbarOwner from '../../../compoments/hotelOwner/NavbarOwner/NavbarOwner'
import MailList from '../../../compoments/customer/mailList/MailList'
import Footer from '../../../compoments/customer/footer/Footer'
import dayjs from 'dayjs';
import { format } from 'date-fns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Button, CircularProgress } from '@mui/material';
import newRequest from '../../../ults/newRequest';
import { DataGrid } from '@mui/x-data-grid';
import { roomColumns } from '../../../datatablesource';
const ReviewOwner = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false)
  const [dateStart, setDateStart] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [data, setData] = useState([])
  const [selectedIds, setSelectedIds] = useState([]);
  const hanldeResult = () =>{
    setIsLoading(true)
    newRequest.get(`/room/hotelOwner?date=${dateStart}`).then((res)=>{
        setData(res.data)
        setIsLoading(false);
        setError(false)
        console.log(res.data)
    }).catch((error)=>{
        setIsLoading(false);
        setError(error.response.data)
    })
  }
  const handleSelectionChange = (selection) => {
    setSelectedIds(selection)
  };
  useEffect(()=>{
    hanldeResult()
  },[])
  return (
    <div>
        <NavbarOwner newValue={4} />
        <div className="containerReviewOwner">
            <h2>Phòng đã đặt</h2>
            <span className='titleH2'>Danh sách phòng đã đặt trong ngày</span>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div style={{display: 'flex', gap : '30px', marginTop : '30px'}}>
              <DatePicker
                value={dayjs(dateStart)}
                onChange={(newValue) => setDateStart(format(newValue.$d, 'yyyy-MM-dd'))}
                size="small"
                sx={{width : '25%'}}
                className="customDatePicker"
              />
              <Button variant='contained' onClick={()=>{hanldeResult()}} sx={{height : '55px'}}>{isLoading ? (<CircularProgress sx={{color : 'white'}}/>) : ('Tìm phòng')}</Button>
              </div>
            </LocalizationProvider>
            <div style={{ height: 400, width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: '10px', marginTop : '30px' }}>
                <DataGrid
                    rows={data}
                    columns={roomColumns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 7 },
                        },
                    }}
                    pageSizeOptions={[5, 20]}
                    onRowSelectionModelChange={(params) => {handleSelectionChange(params)}}
                    checkboxSelection
                />
            </div>
            {error && (<span style={{fontSize : '14px', fontStyle : 'italic', marginTop : '20px', color : 'red'}}>{error}</span>)}
        </div>
        <MailList/>
        <Footer/>
    </div>
  )
}

export default ReviewOwner