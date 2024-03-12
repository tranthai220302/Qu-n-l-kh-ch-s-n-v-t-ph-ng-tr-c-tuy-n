import {
  faBed,
  faCalendarDays,
  faCar,
  faPerson,
  faPlane,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.css";
import { DateRange } from "react-date-range";
import { useEffect, useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PlaceIcon from '@mui/icons-material/Place';
import React from "react";
import newRequest from "../../../ults/newRequest";
const Header = ({ type }) => {
  const [destination, setDestination] = useState(JSON.parse(localStorage.getItem('destination')) || '');
  const [openDate, setOpenDate] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [date, setDate] = useState(JSON.parse(localStorage.getItem('date')) || [
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [nameAddress, setNamAddress] = useState([])
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState(JSON.parse(localStorage.getItem('options')) || {
    adult: 1,
    children: 0,
    room: 1,
  });

  const navigate = useNavigate();

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };
  useEffect(()=>{
    newRequest.get(`/address/search?name=${destination}`).then((res)=>{
      setNamAddress(res.data.hits);
      console.log(res.data.hits)
    }).catch((error)=>{
      console.log(error.response.data)
    })
    console.log('cc')
  },[destination])
  const handleSearch = () => {
    localStorage.setItem('destination', JSON.stringify(destination));
    localStorage.setItem('date', JSON.stringify(date));
    localStorage.setItem('options', JSON.stringify(options));
    navigate("/hotels", { state: { destination, date, options } });
  };
  return (
    <div className="header">
      <div
        className={
          type === "list" ? "headerContainer listMode" : "headerContainer"
        }
      >
        <div className="headerList1">
          <div className="headerListItem active">
            <FontAwesomeIcon icon={faBed} />
            <span>Lưu trú</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faPlane} />
            <span>Chuyến bay</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faCar} />
            <span>Thuê xe</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faBed} />
            <span>Khách sạn</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faTaxi} />
            <span>Taxi sân bay</span>
          </div>
        </div>
        {type !== "list" && (
          <div className="conta">
            <span className="sea">Tìm chỗ nghỉ tiếp theo</span>
            <span className="descSea">Tìm ưu đãi khách sạn, chỗ nghỉ dạng nhà và nhiều hơn nữa...</span>
            <div className="headerSearch">
              <div className="headerSearchItem1" onClick={()=>{setOpenSearch(!openSearch)}}>
                <FontAwesomeIcon icon={faBed} className="headerIcon" />
                <input
                  type="text"
                  placeholder="Where are you going?"
                  value={destination}
                  className="headerSearchInput"
                  onChange={(e)=>{setDestination(e.target.value)}}
                />
                {openSearch && (
                  <div className="aloSearch">
                    <ul className="addresLis">
                      {nameAddress.map((item)=>(
                          <li className="addressItem" key={item.id} onClick={()=>{setDestination(item.name); setOpenSearch(false)}}>
                              <PlaceIcon style={{color : 'black'}} />
                              <span>{item.name}</span>
                          </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className="headerSearchItem2">
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
              <div className="headerSearchItem3">
                <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                <span
                  onClick={() => setOpenOptions(!openOptions)}
                  className="headerSearchText"
                >{`${options.adult} adult · ${options.children} children`}</span>
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
                  </div>
                )}
              </div>
              <div className="headerSearchItem4" onClick={handleSearch}>
                  Search
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
