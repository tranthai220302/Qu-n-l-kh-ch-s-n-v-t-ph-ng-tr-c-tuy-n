import React, {useEffect, useState} from 'react'
import './Services.css'
import ListServices from './listServices/List'
import newRequest from '../../../ults/newRequest'
const Services = ({id}) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const getData = () =>{
    setIsLoading(true);
    newRequest.get(`/categoryItem/${id}`).then((res)=>{
      setIsLoading(false);
      setError(false);
      setData(res.data)
      console.log(res.data)
    }).catch((error)=>{
      setIsLoading(false);
      setError(error.response.data);
    })
  }
  useEffect(()=>{
    getData()
  },[])
  return (
    <div>
      {!isLoading && !error && (
        <div class="containerServices">
            <h2>Các tiện nghi của khách sạn:</h2>
            <div style={{display : 'flex', flexWrap: 'wrap'}}>
                {
                  data && data.map((item, i)=>(
                      <ListServices item = {item} key={i}/>
                  ))
                }
            </div>
          </div>
      )}
    </div>
  )
}

export default Services