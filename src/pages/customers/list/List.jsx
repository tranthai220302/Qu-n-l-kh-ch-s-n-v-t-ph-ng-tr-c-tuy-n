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
import Pagination from '@mui/material/Pagination';
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
import { getData } from "../../../ults/getData";
import Skeleton from '@mui/material/Skeleton';
import newRequest from "../../../ults/newRequest";
import ModalMap from "../../../compoments/customer/map/ModalMap";
const ListCustomer = () => {
  const location = { lat: 16.047199, lng: 108.219955 }
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('Lựa chọn hàng đầu của tôi');
  const [destination, setDestination] = useState(JSON.parse(localStorage.getItem('destination')));
  const [openDate, setOpenDate] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [numPage, setNumPage] = useState(0);
  const [length, setLength] = useState(0)
  const navigate = useNavigate();
  const [page, setPage] = useState(1)
  const [value2, setValue2] = useState([1, 37]);
  const [category, setCategory] = useState([])
  const [servicesSelect, setServicesSelect] = useState([])
  const [numStart, setNumStart] = useState([])
  const [isBreakFast, setIsBreakFast] = useState([]);
  const [isEat, setIsEat] = useState(null);
  const [isPayment, setIsPayment] = useState([])
  const [itemSearch, setIitemSearch] = useState([])
  const [dataMap, setDataMap] = useState([]);
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
    localStorage.setItem('options', JSON.stringify(options));
  };

  const handleSearch = () => {
    navigate("/hotels", { state: { destination, date, options } });
  };
  
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState(JSON.parse(localStorage.getItem('options')) || {
    adult: 1,
    children: 0,
    room: 1,
  });
  const getData = (page) =>{
    const dateStart = format(date[0].startDate, "yyyy-MM-dd")
    const dateEnd = format(date[0].endDate, "yyyy-MM-dd")
    setIsLoading(true);
    newRequest.get(`/hotel/searchQuery?address=${destination}&audult=${options.adult}&children=${options.children}&dateStart=${dateStart}&dateEnd=${dateEnd}&priceMin=${value2[0]*1000000}&priceMax=${value2[1]*1000000}&page=${page}&category=${category}&services=${servicesSelect}&stars=${numStart}&isBreakFast=${isBreakFast}&isEat=${isEat}&payment=${isPayment}&item=${itemSearch}`).then((res)=>{
      setIsLoading(false);
      setError(false);
      setData(res.data.hotel)
      setNumPage(res.data.numPage)
      setLength(res.data.length) 
      setDataMap(res.data.dataMap)
    }).catch((error)=>{
      setIsLoading(false);
      setError(error);
    })
  }
  useEffect(() => {
    getData(1);
  }, [value2, category, servicesSelect, numStart, isBreakFast, isEat, isPayment, itemSearch]);
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
              defaultValue={destination}
              onChange={(e) => {
                setDestination(e.target.value);
                localStorage.setItem('destination', JSON.stringify(e.target.value))
              }}
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
                onChange={(item) => {
                  setDate([item.selection]);
                  localStorage.setItem('date', JSON.stringify([item.selection]));
                }}
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
          <div className="headerSearchItem4" onClick={()=>{getData(1)}}>
              Search
          </div>
        </div>
      </div>
      <div className="listContainer">
      <NavCountry />
        <div className="listWrapper">
          <div className="leftList">
              <ModalMap data = {dataMap} />
              <SideBarCustomer 
                setValue2 = {setValue2} 
                value2 = {value2}
                categorySelect = {category}
                setCategorySelect = {setCategory}
                servicesSelect = {servicesSelect}
                setServicesSelect={setServicesSelect}
                numStart = {numStart}
                setNumStart = {setNumStart}
                isBreakFast = {isBreakFast}
                setIsBreakFast = {setIsBreakFast}
                isEat = {isEat}
                setIsEat = {setIsEat}
                isPayment = {isPayment}
                setIsPayment = {setIsPayment}
                itemSearch = {itemSearch}
                setItemSearch = {setIitemSearch}
              />
          </div>
          {isLoading && (
            <div className="listResult">
            <div className="nameHotel">
              <Skeleton width={'60%'} height={40} />
              <Skeleton width={'50%'} height={80} />
            </div>
            <Skeleton width={'100%'} height={350} style={{marginBottom : '-120px', marginTop: '-100px'}} />
            <Skeleton width={'100%'} height={350} style={{marginBottom : '-120px'}}/>
            <Skeleton width={'100%'} height={350} style={{marginBottom : '-120px'}}/>
            <Skeleton width={'100%'} height={350} style={{marginBottom : '-120px'}}/>
            <Skeleton width={'100%'} height={350} style={{marginBottom : '-120px'}}/>
            <Skeleton width={'100%'} height={350} style={{marginBottom : '-120px'}}/>
            <Skeleton width={'100%'} height={350} style={{marginBottom : '-120px'}}/>
            <Skeleton width={'100%'} height={350} style={{marginBottom : '-120px'}}/>
            <Skeleton width={'100%'} height={350} />
          </div>
          )}  
          {!isLoading && !error &&
          (
            <div className="listResult">
            <div className="nameHotel">
              <h2>Tìm thấy {length} chỗ nghỉ</h2>
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
            {
              data && data.length > 0 && data.map((item)=>{
                if(item.Rooms.length > 0){
                  return <SearchItem data = {item} options = {options} key={item.id}/>
                }
              })
            }
           {numPage && (
            <Pagination
                defaultPage={page}
                count={numPage}
                style={{display: 'flex', justifyContent: 'center'}}
                onChange={(event, value) => {
                    getData(value); 
                    setPage(value); 
                }}
            />
            )}
          </div>
          )
          }
          {
            !isLoading && error && (
              <div style={{display: 'flex',width : '78%', flex : '3', justifyContent: 'center'}}>
                <div style={{display: 'flex', flexDirection : 'column', alignItems: 'center'}}>
                <img src="https://cdn.dribbble.com/users/1753953/screenshots/3818675/animasi-emptystate.gif" alt="" style={{height : '300px'}}/>
                <span className="titleH2" style={{fontSize: '16px', fontStyle: 'italic'}}>Không tìm thấy khách sạn</span>
                </div>
              </div>
            )
          }
        </div>
      </div>
      <MailList />
      <Footer/>
    </div>
  );
};

export default ListCustomer;
