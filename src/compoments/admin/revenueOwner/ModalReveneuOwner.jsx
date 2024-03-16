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
const ModalRevenueOwner = ({id}) => {
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
  const handleClickOpen = ({id}) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(()=>{
    setChartData({
      series: [{
        name: 'Inflation',
        data: data ? data : []
      }],
      options: {
        chart: {
          height: 350,
          type: 'bar',
        },
        plotOptions: {
          bar: {
            borderRadius: 10,
            dataLabels: {
              position: 'top', // top, center, bottom
            },
          }
        },
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return val.toLocaleString('en-US');
          },
          offsetY: -20,
          style: {
            fontSize: '12px',
            colors: ["#304758"]
          }
        },
        xaxis: {
          categories: category ? category : [],
          position: 'top',
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          },
          labels: {
            show: false // Ẩn hiển thị tên trục x
          },
          crosshairs: {
            fill: {
              type: 'gradient',
              gradient: {
                colorFrom: '#D8E3F0',
                colorTo: '#BED1E6',
                stops: [0, 100],
                opacityFrom: 0.4,
                opacityTo: 0.5,
              }
            }
          },
          tooltip: {
            enabled: false,
          }
        },
        yaxis: {
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false,
          },
          labels: {
            show: false,
            formatter: function (val) {
              return val.toLocaleString('en-US') +'VND';
            }
          }
        },
      }
    })
  },[dateStart, dateEnd, data])
  const hanldeResult = () =>{
    setIsLoading(true)
    newRequest.post(`/owner/revenueOwner/${id}`, {
        dateStart : format(dateStart, 'yyyy-MM-dd'),
        dateEnd : format(dateEnd, 'yyyy-MM-dd')
    }).then((res)=>{
        setData(res.data.data);
        setCategory(res.data.category)
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
              {chartData &&  <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={350} />}
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

export default ModalRevenueOwner;
