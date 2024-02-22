import React from 'react'
import './RoomEmpty.css'
import {
    faBed,
    faCalendarDays,
    faCar,
    faPerson,
    faPlane,
    faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useRef, useEffect } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import { LinearProgress, Modal } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfast';
import CheckIcon from '@mui/icons-material/Check';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import PoolIcon from '@mui/icons-material/Pool';
import ModalRoom from './ModalRoom/ModalRoom';
import NativeSelect from '@mui/material/NativeSelect';
const RoomEmpty = () => {
    const location = { lat: 16.047199, lng: 108.219955 }
    const [open, setOpen] = useState(false)
    const [name, setName] = useState('Lựa chọn hàng đầu của tôi');
    const [destination, setDestination] = useState("");
    const [openDate, setOpenDate] = useState(false);
    const navigate = useNavigate();
    const [numRoom, setNumRoom] = useState(0)
    const [date, setDate] = useState([
      {
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
      },
    ]);
    const handleOption = (name, operation) => {
      setOptions((prev) => {
        return {
          ...prev,
          [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
        };
      });
    };
  
    const handleSearch = () => {
      navigate("/hotels", { state: { destination, date, options } });
    };
    const [openOptions, setOpenOptions] = useState(false);
    const [options, setOptions] = useState({
      adult: 1,
      children: 0,
      room: 1,
    });
    const tableStyle = {
        borderCollapse: 'collapse',
        width: '100%'
      };
  
      const thStyle = {
        border: '1px solid #5bbaff',
        textAlign: 'left',
        padding: '8px',
        backgroundColor: '#4c76b2',
        color: 'white'
      };
  
      const tdStyle = {
        border: '1px solid #5bbaff',
        textAlign: 'left',
        padding: '8px',
      };
  
  return (
    <div className='roomEmpty'>
        <h2>Phòng Trống</h2>
        <div className="headerSearch2">
          <div className="headerSearchItem6">
            <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
            <span
              onClick={() => setOpenDate(!openDate)}
              className="headerSearchText"
            >{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
              date[0].endDate,
              "MM/dd/yyyy"
            )}`}</span>
            {openDate && (
              <DateRange
                editableDateInputs={true}
                onChange={(item) => setDate([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={date}
                className="date"
                minDate={new Date()}
              />
            )}
          </div>
          <div className="headerSearchItem5">
            <FontAwesomeIcon icon={faPerson} className="headerIcon" />
            <span
              onClick={() => setOpenOptions(!openOptions)}
              className="headerSearchText"
            >{`${options.adult} adult · ${options.children} children · ${options.room} room`}</span>
            {openOptions && (
              <div className="options">
                <div className="optionItem">
                  <span className="optionText">Adult</span>
                  <div className="optionCounter">
                    <button
                      disabled={options.adult <= 1}
                      className="optionCounterButton"
                      onClick={() => handleOption("adult", "d")}
                    >
                      -
                    </button>
                    <span className="optionCounterNumber">
                      {options.adult}
                    </span>
                    <button
                      className="optionCounterButton"
                      onClick={() => handleOption("adult", "i")}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="optionItem">
                  <span className="optionText">Children</span>
                  <div className="optionCounter">
                    <button
                      disabled={options.children <= 0}
                      className="optionCounterButton"
                      onClick={() => handleOption("children", "d")}
                    >
                      -
                    </button>
                    <span className="optionCounterNumber">
                      {options.children}
                    </span>
                    <button
                      className="optionCounterButton"
                      onClick={() => handleOption("children", "i")}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="optionItem">
                  <span className="optionText">Room</span>
                  <div className="optionCounter">
                    <button
                      disabled={options.room <= 1}
                      className="optionCounterButton"
                      onClick={() => handleOption("room", "d")}
                    >
                      -
                    </button>
                    <span className="optionCounterNumber">
                      {options.room}
                    </span>
                    <button
                      className="optionCounterButton"
                      onClick={() => handleOption("room", "i")}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="headerSearchItem4">
              Search
          </div>
        </div>
        <h4>Lọc theo</h4>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Loại chỗ nghỉ</th>
              <th style={thStyle}>Số lượng khách</th>
              <th style={thStyle}>Giá</th>
              <th style={thStyle}>Các lựa chọn</th>
              <th style={thStyle}>Chọn phòng</th>
              <th style={thStyle}></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td rowSpan={2} style={{border: '1px solid #5bbaff',textAlign: 'left', width: '25%', padding: '8px'}}>
                <div style={{display: 'flex'}}>
                  <h3 className='nameRoom' style={{paddingTop: '0', marginTop: '0'}}>
                    Phòng Superior Giường Đôi Nhìn Ra Thành Phố
                  </h3>
                  <ModalRoom/>
                </div>
                <ul className="servicesRoom">
                  <li className="servicesItem1" style={{marginTop: '-10px'}}>
                    <PoolIcon  style={{fontSize : '15px'}} />
                    <p>Hồ trời</p>
                  </li>
                  <li className="servicesItem1" style={{marginTop: '-10px'}}>
                    <PoolIcon  style={{fontSize : '15px'}} />
                    <p>Hồ bơi ngoài trời</p>
                  </li>
                  <li className="servicesItem1" style={{marginTop: '-10px'}}>
                    <PoolIcon  style={{fontSize : '15px'}} />
                    <p>Hồ bơi ngoài trời</p>
                  </li>
                  <li className="servicesItem1" style={{marginTop: '-10px'}}>
                    <PoolIcon  style={{fontSize : '15px'}} />
                    <p>Hồ bơi</p>
                  </li>
                  <li className="servicesItem1" style={{marginTop: '-10px'}}>
                    <PoolIcon  style={{fontSize : '15px'}} />
                    <p>Hồ bơi ngoài trời</p>
                  </li>
                  <li className="servicesItem1" style={{marginTop: '-10px'}}>
                    <PoolIcon  style={{fontSize : '15px'}} />
                    <p>Hồ bơi ngoài trời</p>
                  </li>
                  <li className="servicesItem1" style={{marginTop: '-10px'}}>
                    <PoolIcon  style={{fontSize : '15px'}} />
                    <p>Hồ bơi ngoài trời</p>
                  </li>
                </ul>
                <ul className="roamRoom">
                  <li className="roamItem" style={{marginTop: '-10px'}}>
                    <CheckIcon  style={{fontSize : '15px', color : 'green'}} />
                    <p>Hồ bơi ngoài trời</p>
                  </li>
                  <li className="roamItem" style={{marginTop: '-10px'}}>
                    <CheckIcon  style={{fontSize : '15px', color : 'green'}} />
                    <p>Hồ bơi ngoài trời</p>
                  </li>
                  <li className="roamItem" style={{marginTop: '-10px'}}>
                    <CheckIcon  style={{fontSize : '15px', color : 'green'}} />
                    <p>Hồ bơi ngoài trời</p>
                  </li>
                  <li className="roamItem" style={{marginTop: '-10px'}}>
                    <CheckIcon  style={{fontSize : '15px', color : 'green'}} />
                    <p>Hồ bơi ngoài trời</p>
                  </li>
                  <li className="roamItem" style={{marginTop: '-10px'}}>
                    <CheckIcon  style={{fontSize : '15px', color : 'green'}} />
                    <p>Hồ bơi ngoài trời</p>
                  </li>
                  <li className="roamItem" style={{marginTop: '-10px'}}>
                    <CheckIcon  style={{fontSize : '15px', color : 'green'}} />
                    <p>Hồ bơi ngoài trời</p>
                  </li>
                  <li className="roamItem" style={{marginTop: '-10px'}}>
                    <CheckIcon  style={{fontSize : '15px', color : 'green'}} />
                    <p>Hồ bơi </p>
                  </li>
                </ul>
              </td>
              <td style={tdStyle}><PersonIcon /></td>
              <td style={tdStyle}>
                <div className="price">
                  <span className="pricePrev">
                    VND 2.030.999
                  </span>
                  <span className="priceNext1">
                    <span className='priceNext'>
                    VND 1.030.999
                    </span>
                    <ErrorOutlineIcon className='iconInfor' style={{fontSize: '15px', cursor : 'pointer'}} />
                  </span>
                  <span className='thue'>Đã bao gồm thuế và phí</span>
                  <span className='percent1'>Tiết kiệm 74%</span>
                  <span className='percent2'>Ưu đãi trong thời gian có hạn</span>
                </div>
              </td>
              <td style={tdStyle}>
                  <tr style={{display: 'flex', gap: '5px', alignItems : 'center', fontSize: '13px', marginBottom: '10px'}}>
                    <td><FreeBreakfastIcon style={{fontSize: '16px'}}/></td>
                    <td>Bữa sáng Tốt -VND 800.000</td>
                  </tr>
                  <tr className='timeCancel'>
                    <td><CheckIcon style={{fontSize: '16px', textAlign: 'center'}} /></td>
                    <td>Hủy miễn phí trước 21 tháng 2, 2024</td>
                  </tr>
                  <tr className='timeCancel'>
                    <td><CheckIcon style={{fontSize: '16px'}} /></td>
                    <td>Hủy miễn phí trước 21 tháng 2, 2024</td>
                  </tr>
              </td>
              <td style={tdStyle}>
                  <Box sx={{ width: 50 }}>
                    <FormControl fullWidth>
                      <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        Số phòng
                      </InputLabel>
                      <NativeSelect
                        defaultValue={30}
                        inputProps={{
                          name: 'age',
                          id: 'uncontrolled-nat ive',
                        }}
                      >
                        <option value={10}>1</option>
                        <option value={20}>2</option>
                        <option value={30}>3</option>
                      </NativeSelect>
                    </FormControl>
                  </Box>
              </td>
              <td style={{textAlign: 'left',padding: '8px',width: '20%', height: '100%',position: 'sticky', top: '20px' ,left: 0, zIndex: '99', backgroundColor : '#ebf3ff', boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px' }}>
                <div style={{display: 'flex', flexDirection: 'column', background: '#ebf3ff', position: 'sticky', top: '65px', width : '100%', left: 0, zIndex: '99', height: '100%', width: '100%', gap : '10px'}}>
                  <span><b>2</b> phòng tổng giá</span>
                  <span style={{fontSize: '19px'}}><b>VND 1.800.000</b></span>
                  <span style={{fontSize: '13px', color : 'gray'}}>Đã bao gồm thuế và phí</span>
                  <button style={{backgroundColor: '#0071c2', outline: 'none', cursor: 'pointer', padding: '10px 5px', border: 'none', borderRadius: '10px', color: 'white', fontWeight: '500', fontSize: '14px'}}>Tôi sẽ đặt</button>
                  <span>Bạn sẽ được chuyển sang bước kế tiếp</span>
                </div>
              </td>
            </tr>
            <tr>
              <td style={tdStyle}><PersonIcon /><PersonIcon /></td>
              <td style={tdStyle}>
                <div className="price">
                  <span className="pricePrev">
                    VND 2.030.999
                  </span>
                  <span className="priceNext1">
                    <span className='priceNext'>
                    VND 1.030.999
                    </span>
                    <ErrorOutlineIcon className='iconInfor' style={{fontSize: '15px', cursor : 'pointer'}} />
                  </span>
                  <span className='thue'>Đã bao gồm thuế và phí</span>
                  <span className='percent1'>Tiết kiệm 74%</span>
                  <span className='percent2'>Ưu đãi trong thời gian có hạn</span>
                </div>
              </td>
              <td style={tdStyle}>
                  <tr style={{display: 'flex', gap: '5px', alignItems : 'center', fontSize: '13px', marginBottom: '10px'}}>
                    <td><FreeBreakfastIcon style={{fontSize: '16px'}}/></td>
                    <td>Bữa sáng Tốt -VND 800.000</td>
                  </tr>
                  <tr className='timeCancel'>
                    <td><CheckIcon style={{fontSize: '16px', textAlign: 'center'}} /></td>
                    <td>Hủy miễn phí trước 21 tháng 2, 2024</td>
                  </tr>
                  <tr className='timeCancel'>
                    <td><CheckIcon style={{fontSize: '16px'}} /></td>
                    <td>Hủy miễn phí trước 21 tháng 2, 2024</td>
                  </tr>
              </td>
              <td style={tdStyle}>
                <Box sx={{ width: 50 }}>
                  <FormControl fullWidth>
                    <InputLabel variant="standard" htmlFor="uncontrolled-native">
                      Số phòng
                    </InputLabel>
                    <NativeSelect
                      defaultValue={30}
                      inputProps={{
                        name: 'age',
                        id: 'uncontrolled-native',
                      }}
                    >
                      <option value={10}>1</option>
                      <option value={20}>2</option>
                      <option value={30}>3</option>
                    </NativeSelect>
                  </FormControl>
                </Box>
              </td>
            </tr>
            <tr>
              <td rowSpan={2} style={{border: '1px solid #5bbaff',textAlign: 'left', width: '25%', padding: '8px'}}>
                <div style={{display: 'flex'}}>
                  <h3 className='nameRoom' style={{paddingTop: '0', marginTop: '0'}}>
                    Phòng Superior Giường Đôi Nhìn Ra Thành Phố
                  </h3>
                  <ModalRoom/>
                </div>
                <ul className="servicesRoom">
                  <li className="servicesItem1" style={{marginTop: '-10px'}}>
                    <PoolIcon  style={{fontSize : '15px'}} />
                    <p>Hồ trời</p>
                  </li>
                  <li className="servicesItem1" style={{marginTop: '-10px'}}>
                    <PoolIcon  style={{fontSize : '15px'}} />
                    <p>Hồ bơi ngoài trời</p>
                  </li>
                  <li className="servicesItem1" style={{marginTop: '-10px'}}>
                    <PoolIcon  style={{fontSize : '15px'}} />
                    <p>Hồ bơi ngoài trời</p>
                  </li>
                  <li className="servicesItem1" style={{marginTop: '-10px'}}>
                    <PoolIcon  style={{fontSize : '15px'}} />
                    <p>Hồ bơi</p>
                  </li>
                  <li className="servicesItem1" style={{marginTop: '-10px'}}>
                    <PoolIcon  style={{fontSize : '15px'}} />
                    <p>Hồ bơi ngoài trời</p>
                  </li>
                  <li className="servicesItem1" style={{marginTop: '-10px'}}>
                    <PoolIcon  style={{fontSize : '15px'}} />
                    <p>Hồ bơi ngoài trời</p>
                  </li>
                  <li className="servicesItem1" style={{marginTop: '-10px'}}>
                    <PoolIcon  style={{fontSize : '15px'}} />
                    <p>Hồ bơi ngoài trời</p>
                  </li>
                </ul>
                <ul className="roamRoom">
                  <li className="roamItem" style={{marginTop: '-10px'}}>
                    <CheckIcon  style={{fontSize : '15px', color : 'green'}} />
                    <p>Hồ bơi ngoài trời</p>
                  </li>
                  <li className="roamItem" style={{marginTop: '-10px'}}>
                    <CheckIcon  style={{fontSize : '15px', color : 'green'}} />
                    <p>Hồ bơi ngoài trời</p>
                  </li>
                  <li className="roamItem" style={{marginTop: '-10px'}}>
                    <CheckIcon  style={{fontSize : '15px', color : 'green'}} />
                    <p>Hồ bơi ngoài trời</p>
                  </li>
                  <li className="roamItem" style={{marginTop: '-10px'}}>
                    <CheckIcon  style={{fontSize : '15px', color : 'green'}} />
                    <p>Hồ bơi ngoài trời</p>
                  </li>
                  <li className="roamItem" style={{marginTop: '-10px'}}>
                    <CheckIcon  style={{fontSize : '15px', color : 'green'}} />
                    <p>Hồ bơi ngoài trời</p>
                  </li>
                  <li className="roamItem" style={{marginTop: '-10px'}}>
                    <CheckIcon  style={{fontSize : '15px', color : 'green'}} />
                    <p>Hồ bơi ngoài trời</p>
                  </li>
                  <li className="roamItem" style={{marginTop: '-10px'}}>
                    <CheckIcon  style={{fontSize : '15px', color : 'green'}} />
                    <p>Hồ bơi </p>
                  </li>
                </ul>
              </td>
              <td style={tdStyle}><PersonIcon /></td>
              <td style={tdStyle}>
                <div className="price">
                  <span className="pricePrev">
                    VND 2.030.999
                  </span>
                  <span className="priceNext1">
                    <span className='priceNext'>
                    VND 1.030.999
                    </span>
                    <ErrorOutlineIcon className='iconInfor' style={{fontSize: '15px', cursor : 'pointer'}} />
                  </span>
                  <span className='thue'>Đã bao gồm thuế và phí</span>
                  <span className='percent1'>Tiết kiệm 74%</span>
                  <span className='percent2'>Ưu đãi trong thời gian có hạn</span>
                </div>
              </td>
              <td style={tdStyle}>
                  <tr style={{display: 'flex', gap: '5px', alignItems : 'center', fontSize: '13px', marginBottom: '10px'}}>
                    <td><FreeBreakfastIcon style={{fontSize: '16px'}}/></td>
                    <td>Bữa sáng Tốt -VND 800.000</td>
                  </tr>
                  <tr className='timeCancel'>
                    <td><CheckIcon style={{fontSize: '16px', textAlign: 'center'}} /></td>
                    <td>Hủy miễn phí trước 21 tháng 2, 2024</td>
                  </tr>
                  <tr className='timeCancel'>
                    <td><CheckIcon style={{fontSize: '16px'}} /></td>
                    <td>Hủy miễn phí trước 21 tháng 2, 2024</td>
                  </tr>
              </td>
              <td style={tdStyle}>
                <Box sx={{ width: 50 }}>
                  <FormControl fullWidth>
                    <InputLabel variant="standard" htmlFor="uncontrolled-native">
                      Số phòng
                    </InputLabel>
                    <NativeSelect
                      defaultValue={30}
                      inputProps={{
                        name: 'age',
                        id: 'uncontrolled-native',
                      }}
                    >
                      <option value={10}>1</option>
                      <option value={20}>2</option>
                      <option value={30}>3</option>
                    </NativeSelect>
                  </FormControl>
                </Box>
              </td>
            </tr>
            <tr>
              <td style={tdStyle}><PersonIcon /><PersonIcon /></td>
              <td style={tdStyle}>
                <div className="price">
                  <span className="pricePrev">
                    VND 2.030.999
                  </span>
                  <span className="priceNext1">
                    <span className='priceNext'>
                    VND 1.030.999
                    </span>
                    <ErrorOutlineIcon className='iconInfor' style={{fontSize: '15px', cursor : 'pointer'}} />
                  </span>
                  <span className='thue'>Đã bao gồm thuế và phí</span>
                  <span className='percent1'>Tiết kiệm 74%</span>
                  <span className='percent2'>Ưu đãi trong thời gian có hạn</span>
                </div>
              </td>
              <td style={tdStyle}>
                  <tr style={{display: 'flex', gap: '5px', alignItems : 'center', fontSize: '13px', marginBottom: '10px'}}>
                    <td><FreeBreakfastIcon style={{fontSize: '16px'}}/></td>
                    <td>Bữa sáng Tốt -VND 800.000</td>
                  </tr>
                  <tr className='timeCancel'>
                    <td><CheckIcon style={{fontSize: '16px', textAlign: 'center'}} /></td>
                    <td>Hủy miễn phí trước 21 tháng 2, 2024</td>
                  </tr>
                  <tr className='timeCancel'>
                    <td><CheckIcon style={{fontSize: '16px'}} /></td>
                    <td>Hủy miễn phí trước 21 tháng 2, 2024</td>
                  </tr>
              </td>
              <td style={tdStyle}>
                  <Box sx={{ width: 50 }}>
                    <FormControl fullWidth>
                      <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        Số phòng
                      </InputLabel>
                      <NativeSelect
                        defaultValue={30}
                        inputProps={{
                          name: 'age',
                          id: 'uncontrolled-native',
                        }}
                      >
                        <option value={10}>1</option>
                        <option value={20}>2</option>
                        <option value={30}>3</option>
                      </NativeSelect>
                    </FormControl>
                  </Box>
              </td>
            </tr>
            <tr>
              <td rowSpan={2} style={{border: '1px solid #5bbaff',textAlign: 'left', width: '25%', padding: '8px'}}>
                <div style={{display: 'flex'}}>
                  <h3 className='nameRoom' style={{paddingTop: '0', marginTop: '0'}}>
                    Phòng Superior Giường Đôi Nhìn Ra Thành Phố
                  </h3>
                  <ModalRoom/>
                </div>
                <ul className="servicesRoom">
                  <li className="servicesItem1" style={{marginTop: '-10px'}}>
                    <PoolIcon  style={{fontSize : '15px'}} />
                    <p>Hồ trời</p>
                  </li>
                  <li className="servicesItem1" style={{marginTop: '-10px'}}>
                    <PoolIcon  style={{fontSize : '15px'}} />
                    <p>Hồ bơi ngoài trời</p>
                  </li>
                  <li className="servicesItem1" style={{marginTop: '-10px'}}>
                    <PoolIcon  style={{fontSize : '15px'}} />
                    <p>Hồ bơi ngoài trời</p>
                  </li>
                  <li className="servicesItem1" style={{marginTop: '-10px'}}>
                    <PoolIcon  style={{fontSize : '15px'}} />
                    <p>Hồ bơi</p>
                  </li>
                  <li className="servicesItem1" style={{marginTop: '-10px'}}>
                    <PoolIcon  style={{fontSize : '15px'}} />
                    <p>Hồ bơi ngoài trời</p>
                  </li>
                  <li className="servicesItem1" style={{marginTop: '-10px'}}>
                    <PoolIcon  style={{fontSize : '15px'}} />
                    <p>Hồ bơi ngoài trời</p>
                  </li>
                  <li className="servicesItem1" style={{marginTop: '-10px'}}>
                    <PoolIcon  style={{fontSize : '15px'}} />
                    <p>Hồ bơi ngoài trời</p>
                  </li>
                </ul>
                <ul className="roamRoom">
                  <li className="roamItem" style={{marginTop: '-10px'}}>
                    <CheckIcon  style={{fontSize : '15px', color : 'green'}} />
                    <p>Hồ bơi ngoài trời</p>
                  </li>
                  <li className="roamItem" style={{marginTop: '-10px'}}>
                    <CheckIcon  style={{fontSize : '15px', color : 'green'}} />
                    <p>Hồ bơi ngoài trời</p>
                  </li>
                  <li className="roamItem" style={{marginTop: '-10px'}}>
                    <CheckIcon  style={{fontSize : '15px', color : 'green'}} />
                    <p>Hồ bơi ngoài trời</p>
                  </li>
                  <li className="roamItem" style={{marginTop: '-10px'}}>
                    <CheckIcon  style={{fontSize : '15px', color : 'green'}} />
                    <p>Hồ bơi ngoài trời</p>
                  </li>
                  <li className="roamItem" style={{marginTop: '-10px'}}>
                    <CheckIcon  style={{fontSize : '15px', color : 'green'}} />
                    <p>Hồ bơi ngoài trời</p>
                  </li>
                  <li className="roamItem" style={{marginTop: '-10px'}}>
                    <CheckIcon  style={{fontSize : '15px', color : 'green'}} />
                    <p>Hồ bơi ngoài trời</p>
                  </li>
                  <li className="roamItem" style={{marginTop: '-10px'}}>
                    <CheckIcon  style={{fontSize : '15px', color : 'green'}} />
                    <p>Hồ bơi </p>
                  </li>
                </ul>
              </td>
              <td style={tdStyle}><PersonIcon /></td>
              <td style={tdStyle}>
                <div className="price">
                  <span className="pricePrev">
                    VND 2.030.999
                  </span>
                  <span className="priceNext1">
                    <span className='priceNext'>
                    VND 1.030.999
                    </span>
                    <ErrorOutlineIcon className='iconInfor' style={{fontSize: '15px', cursor : 'pointer'}} />
                  </span>
                  <span className='thue'>Đã bao gồm thuế và phí</span>
                  <span className='percent1'>Tiết kiệm 74%</span>
                  <span className='percent2'>Ưu đãi trong thời gian có hạn</span>
                </div>
              </td>
              <td style={tdStyle}>
                  <tr style={{display: 'flex', gap: '5px', alignItems : 'center', fontSize: '13px', marginBottom: '10px'}}>
                    <td><FreeBreakfastIcon style={{fontSize: '16px'}}/></td>
                    <td>Bữa sáng Tốt -VND 800.000</td>
                  </tr>
                  <tr className='timeCancel'>
                    <td><CheckIcon style={{fontSize: '16px', textAlign: 'center'}} /></td>
                    <td>Hủy miễn phí trước 21 tháng 2, 2024</td>
                  </tr>
                  <tr className='timeCancel'>
                    <td><CheckIcon style={{fontSize: '16px'}} /></td>
                    <td>Hủy miễn phí trước 21 tháng 2, 2024</td>
                  </tr>
              </td>
              <td style={tdStyle}>
                <Box sx={{ width: 50 }}>
                  <FormControl fullWidth>
                    <InputLabel variant="standard" htmlFor="uncontrolled-native">
                      Số phòng
                    </InputLabel>
                    <NativeSelect
                      defaultValue={30}
                      inputProps={{
                        name: 'age',
                        id: 'uncontrolled-native',
                      }}
                    >
                      <option value={10}>1</option>
                      <option value={20}>2</option>
                      <option value={30}>3</option>
                    </NativeSelect>
                  </FormControl>
                </Box>
              </td>
            </tr>
            <tr>
              <td style={tdStyle}><PersonIcon /><PersonIcon /></td>
              <td style={tdStyle}>
                <div className="price">
                  <span className="pricePrev">
                    VND 2.030.999
                  </span>
                  <span className="priceNext1">
                    <span className='priceNext'>
                    VND 1.030.999
                    </span>
                    <ErrorOutlineIcon className='iconInfor' style={{fontSize: '15px', cursor : 'pointer'}} />
                  </span>
                  <span className='thue'>Đã bao gồm thuế và phí</span>
                  <span className='percent1'>Tiết kiệm 74%</span>
                  <span className='percent2'>Ưu đãi trong thời gian có hạn</span>
                </div>
              </td>
              <td style={tdStyle}>
                  <tr style={{display: 'flex', gap: '5px', alignItems : 'center', fontSize: '13px', marginBottom: '10px'}}>
                    <td><FreeBreakfastIcon style={{fontSize: '16px'}}/></td>
                    <td>Bữa sáng Tốt -VND 800.000</td>
                  </tr>
                  <tr className='timeCancel'>
                    <td><CheckIcon style={{fontSize: '16px', textAlign: 'center'}} /></td>
                    <td>Hủy miễn phí trước 21 tháng 2, 2024</td>
                  </tr>
                  <tr className='timeCancel'>
                    <td><CheckIcon style={{fontSize: '16px'}} /></td>
                    <td>Hủy miễn phí trước 21 tháng 2, 2024</td>
                  </tr>
              </td>
              <td style={tdStyle}>
                  <Box sx={{ width: 50 }}>
                    <FormControl fullWidth>
                      <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        Số phòng
                      </InputLabel>
                      <NativeSelect
                        defaultValue={30}
                        inputProps={{
                          name: 'age',
                          id: 'uncontrolled-native',
                        }}
                      >
                        <option value={10}>1</option>
                        <option value={20}>2</option>
                        <option value={30}>3</option>
                      </NativeSelect>
                    </FormControl>
                  </Box>
              </td>
            </tr>
          </tbody>
        </table>
    </div>
  )
}

export default RoomEmpty