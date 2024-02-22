import React, { useState } from 'react'
import './numPage.css'
const NumPage = ({number}) => {
    const [select, setSelect] = useState(1);
    const page = [];
    for (let index = 1; index <= number ; index++){
        page.push(index);
    }
  return (
    <div className='numPageContainer'>
        {
            page.length > 0 && page.map((item, i)=>(
                <div className={select == item ? 'numberItemSelect' : 'numberItem'} key={i} onClick={()=>{setSelect(item)}}>{item}</div>
            ))
        }
    </div>
  )
}

export default NumPage