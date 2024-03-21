import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import "./searchItem.css";
import DoneIcon from '@mui/icons-material/Done';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useEffect, useState } from 'react';
import Rating from '@mui/material/Rating';
import { useNavigate } from 'react-router-dom';
import newRequest from '../../../ults/newRequest';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
const SearchItem = ({data, options}) => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))
  const [click, setClick] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'right',
  });
  const { vertical, horizontal, open } = state;
  const handleClose = () => {
    setState({ ...state, open: false });
  };
    const getData = () =>{
      setIsLoading(true);
      newRequest.post(`/hotel/create/favourite/${data.id}`).then((res)=>{
        setIsLoading(false);
        setError(false);
        console.log(res.data);
        if(res.data.message == "Bỏ yêu thích thành công!"){
          setClick(false)
        }else{
          setClick(true)
        }
      }).catch((error)=>{
        setIsLoading(false);
        setError(error.response.data);
        setState({
          open: true,
          vertical: 'top',
          horizontal: 'right',
        })
      })
    }
    const handleCLickFavourite = () =>{
      getData();
    }
    useEffect(()=>{
      const isFavourite = data.Favourites.some(fav=>fav.CustomerId === currentUser?.Customer.id);
      if(isFavourite){
        setClick(true)
      }else{
        setClick(false)
      }
    },[data])
  return (
    <div className="searchItem" >
      <Snackbar 
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message={error}
        key={vertical + horizontal}
      />
      <div style={{position: 'relative', display: 'flex', alignItems: 'center', paddingLeft : '10px'}}>
        <img
          src={data.Images?.length > 0 ? data.Images[0].filename : "https://cf.bstatic.com/xdata/images/hotel/square600/261707778.webp?k=fa6b6128468ec15e81f7d076b6f2473fa3a80c255582f155cae35f9edbffdd78&o=&s=1"}
          alt=""
          className="siImg"
        >
        </img>
        {
          isLoading ? (
            <div style={{position: 'absolute', right : '10px', top: '40px', padding: '4px 3px -3px 3px', borderRadius : '50%'}} >
              <CircularProgress color="success" size={17}/>
            </div>
          ) : (
            <div style={{position: 'absolute', right : '10px', top: '40px', padding: '4px 3px -3px 3px', borderRadius : '50%'}} >
               <FavoriteIcon style={click ? {color : 'red'} : {color : 'white'}} onClick={()=>{handleCLickFavourite()}}/>
            </div>
          )
        }
      </div>
      <div className="siDesc">
        <h1 className="siTitle">{data.name}</h1>
        <Rating name="half-rating-read" defaultValue={data.numStars} precision={1} readOnly style={{fontSize : '15px', color: 'yellow'}} />
        <span className="siDistance">{data.Address.numberHome}, {data.Address.ward}, {data.Address.district}, {data.Address.province}</span>
        <span className='siTaxiOp'>Ưu đãi đầu năm 2024</span>
        <div className="siDistance1" style={{border : '1px solid gray', width : '55%', textAlign:'center', padding : '3px 3px', borderRadius: '5px'}}>Được đề xuất cho nhóm của bạn</div>
        <div style={{
          display: 'flex',
          flexDirection : 'column',
          borderLeft : '2px solid rgb(210, 209, 209)',
          padding: '4px 4px 4px 6px',
          gap : '5px'
        }}>
            <span className="siSubtitle">
              {data.Rooms[0].name} - {data.Rooms[0].Category.name}
            </span>
            {data.Rooms[0].Item.map((item, i)=>{
                if(i < 2) return (
                  <span className="siFeatures"key={i}>
                    Có {item.name}
                  </span>
                )
            })}
            <span className="siCancelOp"><DoneIcon style={{fontSize: '12px'}}/> Miễn phí huỷ</span>
            {
              data.isPaymentOff ? <span className="siCancelOp"><DoneIcon style={{fontSize: '12px'}}/> Không cần thanh toán trước</span> : <span className="siCancelOp"><DoneIcon style={{fontSize: '12px'}}/> Thanh toán trực tuyến</span>
            }
        </div>
      </div>
      <div className="siDetails">
        <div className="siRating">
          <span>Xuất sắc</span>
          <button>8.9</button>
        </div>
        <div className="siDetailTexts">
          <span className="siTaxOp">{options.adult} người lớn - {options.children} trẻ em</span>
          <span  style={{fontSize : '13px', textDecoration : 'line-through', color: 'red'}}>VND {(data.Rooms[0].PriceRooms[0].price).toLocaleString('en-US')}</span>
          <span className="siPrice" style={{fontSize : '16px', fontWeight : '600'}}>VND {(data.Rooms[0].PriceRooms[0].price).toLocaleString('en-US')}</span>
          <span className="siTaxOp">Đã bao gồm thuế và phí</span>
          <button className="siCheckButton" onClick = {()=>{window.open(`/hotels/${data.id}`)}}>Xem chỗ trống</button>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
