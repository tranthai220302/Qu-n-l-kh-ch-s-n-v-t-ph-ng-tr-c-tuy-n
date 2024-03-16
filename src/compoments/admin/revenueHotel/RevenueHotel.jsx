import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import dayjs from 'dayjs';
import { format } from 'date-fns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Button, CircularProgress } from '@mui/material';
import newRequest from '../../../ults/newRequest';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import BarChartIcon from '@mui/icons-material/BarChart';
const RevenueHotel = ({id}) => {
  const date = new Date()
  const [dateStart, setDateStart] = useState('01-01-2024');
  const [dateEnd, setDateEnd] = useState('01-01-2024');
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false)
  const [chartData, setChartData] = useState(null);
  const [category, setCategory] = useState([])
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(()=>{
    setChartData({
      series: [{
        name: "VND",
        data: data.data ? data.data : [],
      
      }],
      options: {
        chart: {
          height: 350,
          type: 'line',
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'straight'
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'],
            opacity: 0.5
          },
        },
        xaxis: {
          categories: data.dateRange ? data.dateRange : []
        }
      }
    })
  },[dateStart, dateEnd, data])
  const hanldeResult = () =>{
    setIsLoading(true)
    newRequest.post(`/booking/revenueHotel/${id}`, {
        dateStart : format(dateStart, 'yyyy-MM-dd'),
        dateEnd : format(dateEnd, 'yyyy-MM-dd')
    }).then((res)=>{
        setData(res.data);
        console.log(res.data)
        setIsLoading(false);
        setError(false)
    }).catch((error)=>{
        setIsLoading(false);
        setError(error.response.data)
    })
  }
  return (
    <React.Fragment>
      <Button onClick={handleClickOpen}>
        <BarChartIcon />
      </Button>
      <Dialog
        fullWidth={true}
        maxWidth={'lg'}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Optional sizes</DialogTitle>
        <DialogContent>
          <DialogContentText>
          <div className="cotainerRevenue">
          <h2>Phân tích</h2>
          <span className='titleH2'>Phân tích các đặt phòng có sẵn để lên kế hoạch trong tương lai</span>
          <div>
            <div id="chart">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div style={{display: 'flex', gap : '30px'}}>
                <DatePicker
                  label="Từ ngày"
                  value={dayjs(dateStart)}
                  onChange={(newValue) => setDateStart(format(newValue.$d, 'yyyy-MM-dd'))}
                  size="small"
                  sx={{width : '25%'}}
                  slotProps={{
                    textField: {
                      helperText: 'MM/DD/YYYY',
                    },
                  }}
                />
                <DatePicker
                  label="Đến ngày"
                  value={dayjs(dateEnd)}
                  onChange={(newValue) => setDateEnd(format(newValue.$d, 'yyyy-MM-dd'))}
                  size="small"
                  sx={{width : '25%'}}
                  slotProps={{
                    textField: {
                      helperText: 'MM/DD/YYYY',
                    },
                  }}
                />
                <Button variant='outlined' onClick={()=>{hanldeResult()}} sx={{height : '55px'}}>
                  {isLoading ? (
                    <CircularProgress />
                  ) : 'Doanh thu'}
                </Button>
                </div>
              </LocalizationProvider>
              {chartData && <ReactApexChart options={chartData.options} series={chartData.series} type="line" height={350} />}
            </div>
            <div id="html-dist"></div>
          </div>
        </div>
          </DialogContentText>
          <Box
            noValidate
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              m: 'auto',
              width: 'fit-content',
            }}
          >
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default RevenueHotel;
