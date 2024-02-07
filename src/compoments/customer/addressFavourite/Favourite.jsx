import React, { useState } from 'react'
import Area from './area/Area'
import City from './city/City'
import PlaceInterest from './placeInterest/Place'
import './Favourite.css'
const Favourite = () => {
  const [open, setOpen] = useState(0);
  return (
    <div className='favourite'>
      <ul>
        <li onClick={()=>{setOpen(0)}} className={open == 0 ? 'select' : 'item'}>Khu vực</li>
        <li onClick={()=>{setOpen(1)}} className={open == 1 ? 'select' : 'item'}>Thành phố</li>
        <li onClick={()=>{setOpen(2)}} className={open == 2 ? 'select' : 'item'}>Địa điểm được quan tâm</li>
      </ul>
      {open == 0 && <Area />}
      {open == 1 && <City />}
      {open == 2 && <PlaceInterest />}
    </div>
  )
}

export default Favourite