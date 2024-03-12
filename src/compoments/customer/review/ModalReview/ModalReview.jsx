import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import AddIcon from '@mui/icons-material/Add';
import ProgressBar from "@ramonak/react-progress-bar";
import { Avatar } from '@mui/material';
import BedIcon from '@mui/icons-material/Bed';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import './ModalReview.css'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import newRequest from '../../../../ults/newRequest';
import { useState, useEffect } from 'react';
import { blue, red } from '@mui/material/colors';
import ModalCreate from './ModalCreate/ModalCreae';
import CircularProgress from '@mui/material/CircularProgress';
import { format } from 'date-fns';
export default function TemporaryDrawer({id}) {
  const [state, setState] = React.useState({
    right: false,
  });
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [percentCategory, setPercentCategory] = useState();
  const [n, setN] = useState(0)
  const [total, setTotal] = useState(0)
  const [numPage, setNumPage] = useState(null)
  const [page, setPage]= useState(1)
  const style = {
    maxHeight: '5.5em', 
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 4, 
    WebkitBoxOrient: 'vertical',
  };
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      ((event.key === 'Tab' && event.target.tagName !== 'INPUT') ||
        event.key === 'Shift')
    ) {
      return;
    }
  
    setState({ ...state, [anchor]: open });
  };
  const getData = (page) =>{
    setIsLoading(true);
    newRequest.get(`/review/list/${id}?page=${page}`).then((res)=>{
      setIsLoading(false);
      setError(false);
      setData(res.data.listReview)
      setPercentCategory(res.data.categoryScore)
      setN(res.data.n)
      setTotal(res.data.t)
      setNumPage(res.data.page)
    }).catch((error)=>{
      setIsLoading(false);
      setError(error.response.data);
    })
  }
  useEffect(()=>{
    getData(page)
  },[id, page])
  const list = (anchor) => (
    <Box
      sx={{ width: 1000}}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
    >
              <List className='containerList'sx={{ width: 1000}}>
        <div className="headerList">
        {
            !isLoading && !error && n > 0 ? (
            <div className="totalReview1">   
                <span className='numberPoint'>{(total.total).toFixed(1)}</span>
                <span className='descReview'>{total.name}</span>
                <span className='numberTotal'>{n} đánh giá</span>
            </div>
            ) : (
                <div className="totalReview1">   
                    <span className='numberTotal'>0 đánh giá</span>
                </div>
            )
        }
            <ModalCreate getDataReview={getData}/>
        </div>
        <div className="reviewContent1">
            <b>Hạng mục:</b>
            <div class="progress1">
                {
                    !isLoading && !error && percentCategory && percentCategory.map((item, i)=>(
                        <div class="progress-bar-container1">
                            <div className="progressTitle" key = {i}>
                                <span>{item.name}</span>
                                <span>{(item.percent).toFixed(1)}</span>
                            </div>
                            <ProgressBar completed={item.percent*10} width='100%' height='8px' isLabelVisible = {false} bgColor='#003580' />
                        </div>
                    ))
                }
            </div>
        </div>
        <div className="listReviewDesc">
            <b>Đánh giá của khách:</b>
            <table>
                {
                    !isLoading && !error && data && data.map((item,i)=>(
                        <tr style={{borderBottom: '1px solid gray'}} key={i}>
                            <td>
                                <div className="leftTab">
                                    <div className="user">
                                        {
                                            item.Customer.User.avatar ? (
                                                <Avatar alt="Cindy Baker" src={item.Customer.User.avatar} />
                                            ) : (
                                                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                                </Avatar>
                                            )
                                        }
                                        <div className="username">{item.CustomerId.name ? item.CustomerId.nam : "Thai"}</div>
                                    </div>
                                    <div className="nameRoomBook">
                                        <BedIcon />
                                        <span>{item.PriceRoom.Room.name}</span>
                                    </div>
                                </div>
                            </td>
                            <td width={'85%'}>
                                <div className='rightTab'>
                                    <span className="time">Đã đánh giá: {format(item.createdAt, 'yyyy-MM-dd HH:mm:ss')}</span>
                                    <span className='desc' style={style}>
                                        {item.desc}
                                    </span>
                                    <div className="like">
                                        <ThumbUpIcon style={{fontSize: '15px', color: '#5fa6d8'}} />
                                        <ThumbDownIcon style={{fontSize: '15px', color: '#5fa6d8'}}/>
                                    </div>
                                </div>
                            </td>
                        </tr> 
                    ))
                }
            </table>
            {!error && (<span className='titleH2'>{error}</span>)}
            {isLoading && <CircularProgress color="inherit" />}
        </div>
        {
            !isLoading && numPage && numPage > 0 && (
                <Pagination defaultPage={page} count={numPage} color="primary" style={{display: 'flex', margin: 'auto'}} onChange={(event, value) => {setPage(value)}}/>
            )
        }
      </List>
    </Box>
  );

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button variant="outlined" onClick={toggleDrawer(anchor, true)}>Xem tất cả đánh giá</Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}