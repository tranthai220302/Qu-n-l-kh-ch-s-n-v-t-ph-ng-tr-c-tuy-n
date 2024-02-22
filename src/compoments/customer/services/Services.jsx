import React from 'react'
import './Services.css'
import ListServices from './listServices/List'
const Services = () => {
  return (
    <div class="containerServices">
        <h2>Các tiện nghi của khách sạn:</h2>
        <div style={{display : 'flex', flexWrap: 'wrap'}}>
            <ListServices/>
            <ListServices/>
            <ListServices/>
            <ListServices/>
            <ListServices/>
            <ListServices/>
            <ListServices/>
            <ListServices/>
            <ListServices/>
            <ListServices/>
            <ListServices/>
            <ListServices/>
        </div>
    </div>
  )
}

export default Services