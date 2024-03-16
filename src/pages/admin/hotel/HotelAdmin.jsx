import React from 'react'
import Sidebar from "../../../compoments/admin/sidebar/Sidebar"
import Navbar from "../../../compoments/admin/navbar/Navbar"
import Datatable from "../../../compoments/admin/datatable/Datatable"
import MapContainer from "../../../compoments/customer/map/MapContainer"
import newRequest from "../../../ults/newRequest"
import { useEffect, useState } from "react"
import { CircularProgress } from "@mui/material"
import TableHotel from '../../../compoments/admin/tableHotel/TableHotel'
const HotelAdmin = () => {
    const [data, setData] = useState([]);
    const [dataH, setDataH] = useState([])
    const [dataC, setDataC] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const getData = (id)=>{
      setIsLoading(true)
      newRequest.get(`/hotel/admin/noConfirm/${id}`).then((res)=>{
        setIsLoading(false);
        setError(false)
        if(id == 0) setData(res.data);
        if(id == 1) setDataH(res.data);
        if(id == 3) setDataC(res.data);
        console.log(res.data)
      }).catch((error)=>{
        setIsLoading(false);
        setError(error);
      })
    }
    useEffect(()=>{ 
      getData(0);
      getData(1)
      getData(3)
    },[])
    return (
      <div className="list2">
        <Sidebar/>
        <div className="listContainer2">
          <Navbar/>
              <TableHotel rows = {data} row2 = {dataH} row3 = {dataC} getData={getData} isLoading={isLoading}/>
        </div>
      </div>
    )
}

export default HotelAdmin