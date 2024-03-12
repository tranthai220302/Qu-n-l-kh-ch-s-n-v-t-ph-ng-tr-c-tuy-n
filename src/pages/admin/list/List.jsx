import "./list.css"
import Sidebar from "../../../compoments/admin/sidebar/Sidebar"
import Navbar from "../../../compoments/admin/navbar/Navbar"
import Datatable from "../../../compoments/admin/datatable/Datatable"
import MapContainer from "../../../compoments/customer/map/MapContainer"
import newRequest from "../../../ults/newRequest"
import { useEffect, useState } from "react"
import { CircularProgress } from "@mui/material"

const List = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const getData = ()=>{
    setIsLoading(true)
    newRequest.get('/user/list/customer').then((res)=>{
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
    getData();
  },[])
  return (
    <div className="list2">
      <Sidebar/>
      <div className="listContainer2">
        <Navbar/>
        {
          isLoading && <div style={{width : '100%', display : 'flex', justifyContent : 'center', margin : 'auto', marginTop : '200px'}}><CircularProgress/></div>
        }
        {
          !isLoading && data && (
            <Datatable rows = {data}/>
          )
        }
      </div>
    </div>
  )
}

export default List