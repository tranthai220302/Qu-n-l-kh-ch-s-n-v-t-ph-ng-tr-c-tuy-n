import React, { useState, useEffect  } from 'react'
import styles from './SideBar.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faCartShopping, faBell, faSearch, faBook} from '@fortawesome/free-solid-svg-icons';
import Slider from '@mui/material/Slider';
import { getData } from "../../../ults/getData";
import Rating from '@mui/material/Rating';
import { styled } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';
function valuetext(value) {
    return `${value}°C`;
  }
  
const minDistance = 10;
export default function SideBarCustomer({setValue2, value2, categorySelect, setCategorySelect, servicesSelect, setServicesSelect, numStart, setNumStart, isBreakFast, setIsBreakFast, setIsPayment, isPayment, itemSearch, setItemSearch}) {
  const [services, setServices] = useState([]);
  const [item, setItem] = useState([]);
  const [category, setCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const fetchData = async () => {
      try {
          const result = await getData(`/hotel/query`, setIsLoading, setError);
          if (result !== "loi"){
            setCategory(result.category);
            setServices(result.services);
            setItem(result.item)
          }
      } catch (error) {
          console.error('Error fetching data:', error);
      }
  };
  useEffect(() => {
    fetchData(1);
  }, []);
  const handleChange2 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minDistance);
        setValue2([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setValue2([clamped - minDistance, clamped]);
      }
    } else {
      setValue2(newValue);
    }
  };
   const handleSelectCategory = (id) =>{
    const index = categorySelect.indexOf(id);
    if(index !== -1){
        const newSelected = [...categorySelect];
        newSelected.splice(index,1)
        setCategorySelect(newSelected);
    }else{
        setCategorySelect([...categorySelect, id])
    }
   }
    const handleSelectServices = (id) =>{
        const index = servicesSelect.indexOf(id);
        if(index !== -1){
            const newSelected = [...servicesSelect];
            newSelected.splice(index,1)
            setServicesSelect(newSelected);
        }else{
            setServicesSelect([...servicesSelect, id])
        }
   } 
    const handleSelectStart = (id) =>{
        const index = numStart.indexOf(id);
        if(index !== -1){
            const newSelected = [...numStart];
            newSelected.splice(index,1)
            setNumStart(newSelected);
        }else{
            setNumStart([...numStart, id])
        }
    } 
    const handleSelectBreakFast = (id) =>{
        const index = isBreakFast.indexOf(id);
        if(index !== -1){
            const newSelected = [...isBreakFast];
            newSelected.splice(index,1)
            setIsBreakFast(newSelected);
        }else{
            setIsBreakFast([...isBreakFast, id])
        }
    } 
    const handleSelectPayment = (id) =>{
        const index = isPayment.indexOf(id);
        if(index !== -1){
            const newSelected = [...isPayment];
            newSelected.splice(index,1)
            setIsPayment(newSelected);
        }else{
            setIsPayment([...isPayment, id])
        }
    }
    const handleSelectItem = (id) =>{
        const index = itemSearch.indexOf(id);
        if(index !== -1){
            const newSelected = [...itemSearch];
            newSelected.splice(index,1)
            setItemSearch(newSelected);
        }else{
            setItemSearch([...itemSearch, id])
        }
    }
    return (
        <div className={styles.SideBar}>
            <div className={styles.SideBar_item}>
                <div className={styles.title}>
                    Ngân sách của bạn mỗi đêm
                </div>
                <div>VND {value2[0]}.000.000 - VND {value2[1]}.000.000</div>
                <Slider
                    getAriaLabel={() => 'Minimum distance shift'}
                    value={value2}
                    style={{height : '3px'}}
                    onChange={handleChange2}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                    disableSwap

                />
            </div>
            <div className={styles.SideBar_item}>
                <div className={styles.title}>
                    Điểm đánh giá của khách hàng
                </div>
                <ul>
                    <li> 
                        <input type="checkbox" />
                        <span>Tuyệt hảo : 9 điểm trở lên</span>
                    </li>
                    <li>
                        <input type="checkbox" />
                        <span>Rất tốt : 8 điểm trở lên</span>
                    </li>
                    <li>
                        <input type="checkbox" />
                        <span>Tốt : 7 điểm trở lên</span>
                    </li>
                    <li>
                        <input type="checkbox" />
                        <span>Dễ chịu : 6 điểm trở lên</span>
                    </li>
                </ul>
            </div>
            <div className={styles.SideBar_item}>
                <div className={styles.title}>
                    Thể loại phòng nghỉ
                </div>
                <ul>
                    {category && category.map((item)=>(
                        <li key={item.id} > 
                            <input type="checkbox"onChange={()=>{handleSelectCategory(item.id)}}/>
                            <span>{item.name}</span>
                        </li>
                    )) }
                </ul>
            </div>
            <div className={styles.SideBar_item}>
                <div className={styles.title}>
                    Dịch vụ
                </div>
                <ul>
                    {services && services.map((item)=>(
                        <li key={item.id} > 
                            <input type="checkbox" onChange={()=>{handleSelectServices(item.id)}}/>
                            <span>{item.name}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className={styles.SideBar_item}>
                <div className={styles.title}>
                    Xếp hạng khách sạn
                </div>
                <ul>
                    <li> 
                        <input type="checkbox"  onChange={()=>{handleSelectStart(5)}}/>
                        <Rating name="half-rating-read" defaultValue={5} precision={1} readOnly style={{fontSize : '15px', color: 'yellow'}} />
                    </li>
                    <li> 
                        <input type="checkbox" onChange={()=>{handleSelectStart(4)}}/>
                        <Rating name="half-rating-read" defaultValue={4} precision={1} readOnly style={{fontSize : '15px', color: 'yellow'}} />
                    </li>
                    <li> 
                        <input type="checkbox" onChange={()=>{handleSelectStart(3)}}/>
                        <Rating name="half-rating-read" defaultValue={3} precision={1} readOnly style={{fontSize : '15px', color: 'yellow'}} />
                    </li>
                    <li> 
                        <input type="checkbox" onChange={()=>{handleSelectStart(2)}}/>
                        <Rating name="half-rating-read" defaultValue={2} precision={1} readOnly style={{fontSize : '15px', color: 'yellow'}} />
                    </li>
                    <li> 
                        <input type="checkbox" onChange={()=>{handleSelectStart(1)}}/>
                        <Rating name="half-rating-read" defaultValue={1} precision={1} readOnly style={{fontSize : '15px', color: 'yellow'}} />
                    </li>
                    <li> 
                        <input type="checkbox" onChange={()=>{handleSelectStart(0)}}/>
                        <span>Không xếp hạng</span>
                    </li>
                </ul>
            </div>
            <div className={styles.SideBar_item}>
                <div className={styles.title}>
                    Bữa ăn
                </div>
                <ul>
                    <li> 
                        <input type="checkbox" onChange={()=>{handleSelectBreakFast(1)}}/>
                        <span>Bao gồm bữa sáng</span>
                    </li>
                    <li> 
                        <input type="checkbox" onChange={()=>{handleSelectBreakFast(0)}}/>
                        <span>Không có bữa sáng</span>
                    </li>
                </ul>
            </div>
            <div className={styles.SideBar_item}>
                <div className={styles.title}>
                    Chính sách đặt phòng
                </div>
                <ul>
                    <li> 
                        <input type="checkbox" />
                        <span>Miễn phí huỷ</span>
                    </li>
                    <li> 
                        <input type="checkbox" onChange={()=>{handleSelectPayment(1)}}/>
                        <span>Không cần thanh toán trước</span>
                    </li>
                    <li> 
                        <input type="checkbox" onChange={(e)=>{handleSelectPayment(0)}}/>
                        <span>Thanh toán trực tuyến</span>
                    </li>
                </ul>
            </div>
            <div className={styles.SideBar_item}>
                <div className={styles.title}>
                    Tiện nghi
                </div>
                <ul>
                    {item && item.map((item)=>(
                        <li key={item.id}> 
                            <input type="checkbox" onChange={()=>{handleSelectItem(item.id)}}/>
                            <span>{item.name}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className={styles.SideBar_item}>
                <div className={styles.title}>
                    Ưu đãi
                </div>
                <ul>
                    <li> 
                        <input type="checkbox" />
                        <span>Tất cả ưu đãi</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}