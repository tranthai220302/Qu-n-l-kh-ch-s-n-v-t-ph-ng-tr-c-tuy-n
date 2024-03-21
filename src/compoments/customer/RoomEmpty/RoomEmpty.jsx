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
import { differenceInDays, format } from "date-fns";
import { DateRange } from "react-date-range";
import { CircularProgress, LinearProgress, Modal } from '@mui/material';
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
import { useSelector, useDispatch } from 'react-redux';
import newRequest from '../../../ults/newRequest';
import { addRoom, removeRoom } from '../../../redux/actions/bookingActions';
const RoomEmpty = ({hotel, id}) => {
    const [destination, setDestination] = useState("");
    const [openDate, setOpenDate] = useState(false);
    const navigate = useNavigate();
    const [numberRoomSelect, setNumberRoomSelect] = useState([]);
    const [number, setNumber] = useState(0)
    const [total, setTotal] = useState([])
    const [idPriceRoom, setIdPriceRoom] = useState([])
    const [priceTotal, setPriceTotal] = useState(0)
    const dispatch = useDispatch();
    const selectedRooms = useSelector(state => state.booking.selectedRooms);
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const handleAddRoom = (room) => {
      dispatch(addRoom(room));
    };
  
    const handleRemoveRoom = (room) => {
      dispatch(removeRoom(room));
    };
    const handleBookRoom = ()=>{
      if(idPriceRoom.length > 0 ){
        navigate(`/bookRoom/${id}`)
      }
    }
    const [date, setDate] = useState(JSON.parse(localStorage.getItem('date')) || [
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
    const [openOptions, setOpenOptions] = useState(false);
    const [options, setOptions] = useState(JSON.parse(localStorage.getItem('options')) || {
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
      const handleChange = (id, numRoom, price) => {
        let indexToRemove = idPriceRoom.indexOf(id); // Tìm vị trí của id trong mảng idPriceRoom
        if (numRoom != 0) {
          handleAddRoom({
            id : id,
            price : price,
            num : numRoom
          })
          if (indexToRemove === -1) {
            setIdPriceRoom(prevState => [...prevState, id]);
            setNumberRoomSelect(prevState => [...prevState, parseInt(numRoom)]);
            setTotal(prevState => [...prevState, price]);
          } else {
            setNumberRoomSelect(prevState => {
              prevState[indexToRemove] = parseInt(numRoom);
              return [...prevState];
            });
            setTotal(prevState => {
              prevState[indexToRemove] = price;
              return [...prevState];
            });

          }
        } else {
          if (indexToRemove !== -1) {
            console.log(id)
            handleRemoveRoom({
              id : id,
            })
            setIdPriceRoom(prevState => prevState.filter((item, i) => i !== indexToRemove));
            setNumberRoomSelect(prevState => prevState.filter((_, index) => index !== indexToRemove));
            setTotal(prevState => prevState.filter((_, index) => index !== indexToRemove));
          }
        }
      }
      const getData = () =>{
        console.log(format(date[0].startDate, "yyyy/MM/dd"))

        setIsLoading(true);
        newRequest.get(`/room/empty/${id}?dateCheckIn=${format(date[0].startDate, "yyyy-MM-dd")}&dateCheckOut=${format(date[0].endDate, "yyyy-MM-dd")}&Audult=${options.adult}&Children=${options.children}`).then((res)=>{
          setIsLoading(false);
          setError(false);
          setData(res.data)
          console.log(res.data);
        }).catch((error)=>{
          setIsLoading(false);
          setError(error.response.data);
          console.log(error.response.data)
        })
      }
      const calculateDateDifference = (start, end) => {
        return differenceInDays(new Date(end), new Date(start)) + 1;
      };
    useEffect(()=>{
      setPriceTotal(total.reduce((acc, current)=> acc + current, 0));
      setNumber(numberRoomSelect.reduce((acc, current)=> acc + current, 0));
    },[total, numberRoomSelect])
    useEffect(()=>{
      getData()
    },[id])
    const handleSearch = () =>{
      localStorage.setItem('date', JSON.stringify(date));
      localStorage.setItem('options', JSON.stringify(options));
      getData()
    }
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
                defaultValue={destination}
                onChange={(item) => {setDate([item.selection])}}
                moveRangeOnFirstSelection={false}
                ranges={date}
                className="date1"
                minDate={new Date()}
              />
            )}
          </div>
          <div className="headerSearchItem5">
            <FontAwesomeIcon icon={faPerson} className="headerIcon" />
            <span
              onClick={() => setOpenOptions(!openOptions)}
              className="headerSearchText"
            >{`${options.adult} adult · ${options.children} children`}</span>
            {openOptions && (
              <div className="options4">
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
              </div>
            )}
          </div>
          <div className="headerSearchItem4" onClick={()=>{handleSearch()}}>
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
              <th style={thStyle}>Chọn số lượng</th>
              <th style={thStyle}></th>
            </tr>
          </thead>
          {isLoading && !error && (
            <CircularProgress color="inherit" />
          )}
          {
            error && (
              <span>Hết phòng</span>
            )
          }
          {
            data && !isLoading && !error && (
              <tbody>
                <tr>
                  <td rowSpan={data[0].PriceRooms.length} style={{border: '1px solid #5bbaff',textAlign: 'left', width: '25%', padding: '8px'}}>
                    <div style={{display: 'flex'}}>
                      <h3 className='nameRoom' style={{paddingTop: '0', marginTop: '0'}}>
                        {data[0].Category?.name}-{data[0].name}
                      </h3>
                      <ModalRoom/>
                    </div>
                    <ul className="servicesRoom">
                        {hotel.Services.map((service, i)=>(
                            <li className="servicesItem1" style={{marginTop: '-10px'}} key={i}>
                              <PoolIcon  style={{fontSize : '15px'}} />
                              <p>{service.name}</p>
                            </li>
                        ))}
                    </ul>
                    <ul className="roamRoom">
                      {
                        data[0].Item.map((item, i) => {
                          return (
                            <li key={i} className="roamItem" style={{ marginTop: '-10px' }}>
                              <CheckIcon style={{ fontSize: '15px', color: 'green' }} />
                              <p>{item.name}</p>
                            </li>
                          );
                        })
                      }
                    </ul>
                  </td>
                  <td style={tdStyle}>
                  {[...Array(data[0].PriceRooms[0].numberPerson)].map((_, index) => (
                    <PersonIcon key={index} />
                  ))}
                  </td>
                  <td style={tdStyle}>
                    <div className="price">
                      <span className="pricePrev">
                        VND 2.030.999
                      </span>
                      <span className="priceNext1">
                        <span className='priceNext'>
                        VND {(data[0].PriceRooms[0].price).toLocaleString('en-US')}
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
                            onChange={(e)=>{handleChange(data[0].PriceRooms[0].id, e.target.value, data[0].PriceRooms[0].price*e.target.value)}}
                            defaultValue={30}
                            inputProps={{
                              name: 'age',
                              id: 'uncontrolled-nat ive',
                            }}
                          >
                            <option value={0}>0</option>
                            {[...Array(data[0].PriceRooms[0].numRoom)].map((_, index)=>(
                              <option style={{fontSize : '14px'}} value={index+1}>{index + 1} - ({((index + 1)*data[0].PriceRooms[0].price).toLocaleString('en-US')}) VND</option>
                            ))}
                          </NativeSelect>
                        </FormControl>
                      </Box>
                  </td>
                  <td style={{textAlign: 'left',padding: '8px',width: '20%', height: '100%',position: 'sticky', top: '20px' ,left: 0, zIndex: '99', backgroundColor : '#ebf3ff', boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px' }}>
                    <div style={{display: 'flex', flexDirection: 'column', background: '#ebf3ff', position: 'sticky', top: '65px', width : '100%', left: 0, zIndex: '99', height: '100%', width: '100%', gap : '10px'}}>
                      <span><b>{number}</b> phòng tổng giá</span>
                      <span style={{fontSize: '19px'}}><b>VND {(priceTotal*calculateDateDifference(date[0].startDate, date[0].endDate)).toLocaleString('en-US')}</b></span>
                      <span style={{fontSize: '13px', color : 'gray'}}>Đã bao gồm thuế và phí</span>
                      <button style={{backgroundColor: '#0071c2', outline: 'none', cursor: 'pointer', padding: '10px 5px', border: 'none', borderRadius: '10px', color: 'white', fontWeight: '500', fontSize: '14px'}} onClick={()=>{handleBookRoom()}}>Tôi sẽ đặt</button>
                      <span>Bạn sẽ được chuyển sang bước kế tiếp</span>
                    </div>
                  </td>
                </tr>
                {
                  data[0].PriceRooms.slice(1).map((item, i)=>{
                      return (
                        <tr key={i}>
                          <td style={tdStyle}>
                          {[...Array(item.numberPerson)].map((_, index) => (
                            <PersonIcon key={index} />
                          ))}
                          </td>
                          <td style={tdStyle}>
                            <div className="price">
                              <span className="pricePrev">
                                VND 2.030.999
                              </span>
                              <span className="priceNext1">
                                <span className='priceNext'>
                                VND {(item.price).toLocaleString('en-US')}
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
                                  onChange={(e)=>{handleChange(item.id, e.target.value, e.target.value*item.price)}}
                                  defaultValue={30}
                                  inputProps={{
                                    name: 'age',
                                    id: 'uncontrolled-native',
                                  }}
                                >
                                  <option value={0}>0</option>
                                {[...Array(item.numRoom)].map((_, index)=>(
                                  <option style={{fontSize : '14px'}} value={index+1}>{index + 1} - {((index + 1)*item.price).toLocaleString('en-US')} VND</option>
                                ))}
                                </NativeSelect>
                              </FormControl>
                            </Box>
                          </td>
                        </tr>
                      )
                  })
                }
                {
                  data.slice(1).map((room, i)=>{
                      return (
                        <React.Fragment key={i}>
                          <tr>
                            <td rowSpan={room.PriceRooms.length} style={{border: '1px solid #5bbaff',textAlign: 'left', width: '25%', padding: '8px'}}>
                              <div style={{display: 'flex'}}>
                                <h3 className='nameRoom' style={{paddingTop: '0', marginTop: '0'}}>
                                {room.Category.name}-{room.name}
                                </h3>
                                <ModalRoom/>
                              </div>
                              <ul className="servicesRoom">
                              {hotel.Services.map((service, i)=>(
                                  <li className="servicesItem1" style={{marginTop: '-10px'}} key={i}>
                                    <PoolIcon  style={{fontSize : '15px'}} />
                                    <p>{service.name}</p>
                                  </li>
                              ))}
                              </ul>
                              <ul className="roamRoom">
                              {
                                room.Item.map((item, i)=>(
                                  <li key={i} className="roamItem" style={{ marginTop: '-10px' }}>
                                    <CheckIcon style={{ fontSize: '15px', color: 'green' }} />
                                    <p>{item.name}</p>
                                  </li>
                                ))
                              }
                              </ul>
                            </td>
                            <td style={tdStyle}>
                            {[...Array(room.PriceRooms[0].numberPerson)].map((_, index) => (
                              <PersonIcon key={index} />
                            ))}
                            </td>
                            <td style={tdStyle}>
                              <div className="price">
                                <span className="pricePrev">
                                  VND 2.030.999
                                </span>
                                <span className="priceNext1">
                                  <span className='priceNext'>
                                  VND {(room.PriceRooms[0].price).toLocaleString('en-US')}
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
                                    onChange={(e)=>{handleChange(room.PriceRooms[0].id, e.target.value, e.target.value*room.PriceRooms[0].price)}}
                                    defaultValue={30}
                                    inputProps={{
                                      name: 'age',
                                      id: 'uncontrolled-native',
                                    }}
                                  >
                                  <option value={0}>0</option>
                                  {[...Array(room.PriceRooms[0].numRoom)].map((_, index)=>(
                                  <option style={{fontSize : '14px'}} value={index+1}>{index + 1} - ({((index + 1)*data[0].PriceRooms[0].price).toLocaleString('en-US')}) VND</option>
                                  ))}
                                  </NativeSelect>
                                </FormControl>
                              </Box>
                            </td>
                          </tr>
                          {room.PriceRooms && room.PriceRooms.slice(1).map((roomItem, i)=>(
                              <tr>
                                <td style={tdStyle}>
                                {[...Array(roomItem.numberPerson)].map((_, index) => (
                                  <PersonIcon key={index} />
                                ))}
                                </td>
                                <td style={tdStyle}>
                                  <div className="price">
                                    <span className="pricePrev">
                                      VND 2.030.999
                                    </span>
                                    <span className="priceNext1">
                                      <span className='priceNext'>
                                      VND {(roomItem.price).toLocaleString('en-US')}
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
                                          onChange={(e)=>{handleChange(roomItem.id, e.target.value, e.target.value*roomItem.price)}}
                                          defaultValue={30}
                                          inputProps={{
                                            name: 'age',
                                            id: 'uncontrolled-native',
                                          }}
                                        >
                                          <option value={0}>0</option>
                                        {[...Array(roomItem.numRoom)].map((_, index)=>(
                                          <option key={index} style={{fontSize : '14px'}} value={index+1}>{index + 1} - ({((index + 1)*roomItem.price).toLocaleString('en-US')}) VND</option>
                                        ))}
                                        </NativeSelect>
                                      </FormControl>
                                    </Box>
                                </td>
                              </tr>
                          ))}
                      </React.Fragment>
                      )
                  })
                }
              </tbody>
            )
          }
        </table>
    </div>
  )
}

export default RoomEmpty