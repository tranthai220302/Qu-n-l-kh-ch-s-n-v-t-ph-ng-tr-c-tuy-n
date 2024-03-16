import React from 'react'
import Sidebar from '../../../compoments/admin/sidebar/Sidebar'
import Navbar from '../../../compoments/admin/navbar/Navbar'
import DataService from '../../../compoments/admin/dataService/DataService'
import { CircularProgress } from '@mui/material'
import { useState, useEffect } from 'react'
import newRequest from '../../../ults/newRequest'
const Service = () => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false)
  const getData = () =>{
    setIsLoading(true)
    newRequest.get(`/service`).then((res)=>{
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
    getData()
  },[])
    return (
        <div className="list2">
          <Sidebar/>
          <div className="listContainer2">
            <Navbar/>
            {data && !isLoading && (
              <DataService rows = {data} getData = {getData}/>
            )}
            {
              isLoading && <div style={{width : '100%', display : 'flex', justifyContent : 'center', margin : 'auto', marginTop : '200px'}}><CircularProgress/></div>
            }
          </div>
        </div>
    )
}

export default Service