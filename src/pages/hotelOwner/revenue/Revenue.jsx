import React, { useEffect, useState } from 'react';
import NavbarOwner from '../../../compoments/hotelOwner/NavbarOwner/NavbarOwner'
import MailList from '../../../compoments/customer/mailList/MailList'
import Footer from '../../../compoments/customer/footer/Footer'
import ReactApexChart from 'react-apexcharts';
import dayjs from 'dayjs';
import { format } from 'date-fns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import './Revenue.css'
import { Button } from '@mui/material';
import newRequest from '../../../ults/newRequest';
const Revenue = () => {
  const date = new Date()
  const [dateStart, setDateStart] = useState('01-01-2024');
  const [dateEnd, setDateEnd] = useState('01-01-2024');
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false)
  const [chartData, setChartData] = useState(null);
  const [category, setCategory] = useState([])
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
    newRequest.post('/booking/revenue', {
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
    <div>
      <NavbarOwner newValue={1}/>
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
              <Button variant='outlined' onClick={()=>{hanldeResult()}} sx={{height : '55px'}}>Doanh thu</Button>
              </div>
            </LocalizationProvider>
            {chartData && <ReactApexChart options={chartData.options} series={chartData.series} type="line" height={350} />}
          </div>
          <div id="html-dist"></div>
        </div>
      </div>
      <MailList/>
      <Footer />
    </div>
  );
}

export default Revenue;
