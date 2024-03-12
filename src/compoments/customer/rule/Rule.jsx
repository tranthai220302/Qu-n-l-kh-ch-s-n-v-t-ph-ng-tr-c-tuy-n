import React, {useEffect, useState} from 'react'
import './Rule.css'
import TableRule from './tableRule/TableRule'
import newRequest from '../../../ults/newRequest'
const Rule = ({id}) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const getData = () =>{
    setIsLoading(true);
    newRequest.get(`/hotel/${id}`).then((res)=>{
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
  },[id])
  return (
    <div>
      {!isLoading && !error && data && (
          <div className='containerRule'>
              <h2>Quy tắc chung:</h2>
              <span className='titleH2'>{data.name} nhận yêu cầu đặc biệt - gửi yêu cầu trong bước kế tiếp!</span>
              <TableRule data = {data}  />
          </div>
      )}
    </div>
  )
}

export default Rule