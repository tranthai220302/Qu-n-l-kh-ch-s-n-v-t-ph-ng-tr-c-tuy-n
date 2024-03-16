import Sidebar from "../../../compoments/admin/sidebar/Sidebar";
import Navbar from "../../../compoments/admin/navbar/Navbar";
import "./home.css";
import Widget from "../../../compoments/admin/widget/Widget";
import Featured from "../../../compoments/admin/featured/Featured";
import Chart from "../../../compoments/admin/chart/Chart";
import Table from "../../../compoments/admin/table/Table";
import { useEffect, useState } from "react";
import newRequest from "../../../ults/newRequest";
import { CircularProgress } from "@mui/material";
import { CircularProgressbar } from "react-circular-progressbar";

const Home = () => {
  const [data, setData] = useState([]);
  const [revenue, setRevenue] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [revenueH, setRevenueH] = useState([])
  const getData = (url, setData)=>{
    setIsLoading(true)
    newRequest.get(url).then((res)=>{
      setIsLoading(false);
      setError(false)
      setData(res.data);
      console.log(res.data)
    }).catch((error)=>{
      setIsLoading(false);
      setError(error);
    })
  }
  useEffect(()=>{
    getData('/user/admin/infor',setData);
    getData('/user/admin/revenue/currentDate',setRevenue);
    getData('/user/admin/hotelHigh', setRevenueH)
  },[])
  return (
    <div className="home1">
      <Sidebar />
      <div className="homeContainer1">
        <Navbar />
        {isLoading && <div style={{width : '100%', display : 'flex', justifyContent : 'center', margin : 'auto', marginTop : '200px'}}><CircularProgress/></div>}
        {!isLoading && data && (
            <div className="widgets">
              <Widget type="customer" number={data.user} />
              <Widget type="hotelOwner" number={data.hotelOwner}/>
              <Widget type="hotel"number={data.hotel}/>
              <Widget type="booking" number={data.booking}/>
            </div>
        )}
        {!isLoading && revenue && (
        <div className="charts">
          <Featured revenue = {revenue}/>
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
        )}
        {
          !isLoading && (
          <div className="listContainer1">
            <div className="listTitle1">Khách sạn có doanh thu cao trong tháng</div>
            <Table data = {revenueH}/>
          </div>
          )
        }
      </div>
    </div>
  );
};

export default Home;
