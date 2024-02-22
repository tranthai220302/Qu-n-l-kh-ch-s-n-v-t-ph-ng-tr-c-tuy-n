import React from 'react'
import './Rule.css'
import TableRule from './tableRule/TableRule'
const Rule = () => {
  return (
    <div className='containerRule'>
        <h2>Quy tắc chung:</h2>
        <span className='titleH2'>Merry Land Hotel Da Nang nhận yêu cầu đặc biệt - gửi yêu cầu trong bước kế tiếp!</span>
        <TableRule  />
    </div>
  )
}

export default Rule