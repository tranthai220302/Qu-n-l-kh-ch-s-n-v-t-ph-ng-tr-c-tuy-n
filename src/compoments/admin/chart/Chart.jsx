import "./chart.css";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import dayjs from 'dayjs';
import { format } from 'date-fns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Button, CircularProgress } from '@mui/material';
import newRequest from "../../../ults/newRequest";
import { useEffect, useState } from "react";
const data1 = [
  { name: "January", Total: 1200 },
  { name: "February", Total: 2100 },
  { name: "March", Total: 800 },
  { name: "April", Total: 1600 },
  { name: "May", Total: 900 },
  { name: "June", Total: 1700 },
];

const Chart = ({ aspect, title }) => {
  const date = new Date()
  const datenew = new Date(date);
  datenew.setDate(date.getDate() -1)
  const [dateStart, setDateStart] = useState(format(datenew, 'MM-dd-yyyy'));
  const [dateEnd, setDateEnd] = useState(format(date, 'MM-dd-yyyy'));
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false)
  const hanldeResult = () =>{
    setIsLoading(true)
    newRequest.post('/user/admin/revenue', {
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
  useEffect(()=>{
    hanldeResult()
  },[])
  return (
    <div className="chart">
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div style={{display: 'flex', gap : '30px', marginBottom : '20px'}}>
      <DatePicker
        label="Từ ngày"
        value={dayjs(dateStart)}
        onChange={(newValue) => setDateStart(format(newValue.$d, 'yyyy-MM-dd'))}
        size="small"
        sx={{width : '25%', height : '30px', fontSize : '12px'}}
      />
      <DatePicker
        label="Đến ngày"
        value={dayjs(dateEnd)}
        onChange={(newValue) => setDateEnd(format(newValue.$d, 'yyyy-MM-dd'))}
        size="small"
        sx={{width : '25%', height : '30px', fontSize : '12px'}}
      />
      <Button variant='outlined' onClick={()=>{hanldeResult()}} sx={{height : '55px'}}>Doanh thu</Button>
      </div>
      </LocalizationProvider>
      {isLoading && <div style={{width : '100%', display : 'flex', justifyContent : 'center', margin : 'auto', marginTop : '150px'}}><CircularProgress/></div>}
      {
        !isLoading && data && (
          <ResponsiveContainer width="100%" aspect={aspect}>  
          <AreaChart
            width={730}
            height={250}
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" stroke="gray" />
            <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="Total"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#total)"
            />
          </AreaChart>
        </ResponsiveContainer>
        )
      }
    </div>
  );
};

export default Chart;
