import "./list.css";
import Navbar from "../../../compoments/customer/navbar/Navbar";
import Header from "../../../compoments/customer/header/Header";
import { useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../../compoments/customer/searchItem/SearchItem";
import SideBarCustomer from "../../../compoments/customer/sideBar/SideBar";
import MapContainer from "../../../compoments/customer/map/MapContainer";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import NavCountry from "../../../compoments/customer/navCountry/NavCountry";
import {
  faBed,
  faCalendarDays,
  faCar,
  faPerson,
  faPlane,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NumPage from "../../../compoments/customer/numPage/NumPage";
import MailList from "../../../compoments/customer/mailList/MailList";
import Footer from "../../../compoments/customer/footer/Footer";
const ListCustomer = () => {
  const location = { lat: 16.047199, lng: 108.219955 }
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('Lựa chọn hàng đầu của tôi');
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const navigate = useNavigate();
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
  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="searchCon">
      <div className="headerSearch1">
          <div className="headerSearchItem1">
            <FontAwesomeIcon icon={faBed} className="headerIcon" />
            <input
              type="text"
              placeholder="Where are you going?"
              className="headerSearchInput"
              onChange={(e) => setDestination(e.target.value)}
            />
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
      </div>
      <div className="listContainer">
        <NavCountry />
        <div className="listWrapper">
          <div className="leftList">
            <MapContainer location={location} />
            <SideBarCustomer />
          </div>
          <div className="listResult">
            <div className="nameHotel">
              <h2>Hạ Long : Tìm thấy 868 chỗ nghỉ</h2>
              <div className="listSearch1">
                <span onClick={() => { setOpen(!open) }}>Sắp xếp theo : {name} </span>
                <ArrowDropDownIcon style={{ cursor: 'pointer' }} className="iconList" onClick={() => { setOpen(!open) }} />
                {open && (
                  <ul className="listItem">
                    <li className="itemSearch" onClick={() => { setOpen(false); setName('Được đánh giá hàng đầu'); }}>Được đánh giá hàng đầu</li>
                    <li className="itemSearch" onClick={() => { setOpen(false); setName('Lựa chọn hàng đầu của chúng tôi'); }}>Lựa chọn hàng đầu của chúng tôi</li>
                    <li className="itemSearch" onClick={() => { setOpen(false); setName('Xếp hàng chỗ nghỉ'); }}>Xếp hàng chỗ nghỉ</li>
                    <li className="itemSearch" onClick={() => { setOpen(false); setName('Khoảng cách gần nhất đến bãi biển'); }}>Khoảng cách gần nhất đến bãi biển</li>
                    <li className="itemSearch" onClick={() => { setOpen(false); setName('Khoảng cách gần nhất đến bãi biển'); }}>Khoảng cách gần nhất đến bãi biển</li>
                    <li className="itemSearch" onClick={() => { setOpen(false); setName('Khoảng cách gần nhất đến bãi biển'); }}>Khoảng cách gần nhất đến bãi biển</li>
                    <li className="itemSearch" onClick={() => { setOpen(false); setName('Khoảng cách gần nhất đến bãi biển'); }}>Khoảng cách gần nhất đến bãi biển</li>
                  </ul>
                )}
              </div>
            </div>
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <NumPage number={6} />
          </div>
        </div>
      </div>
      <MailList />
      <Footer/>
    </div>
  );
};

export default ListCustomer;
