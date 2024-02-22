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
export default function TemporaryDrawer() {
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: 1000}}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List className='containerList'>
        <div className="headerList">
            <div className="totalReview1">   
                <span className='numberPoint'>9,3</span>
                <span className='descReview'>Tuyệt hảo</span>
                <span className='numberTotal'>79 đánh giá</span>
                <span className='allReview'>Đọc tất cả đánh giá</span>
            </div>
            <Button variant="outlined">Viết đánh giá</Button>
        </div>
        <div className="reviewContent1">
            <b>Hạng mục:</b>
            <div class="progress1">
                <div class="progress-bar-container1">
                    <div className="progressTitle">
                        <span>Nhân viên phục vụ</span>
                        <span>9,2</span>
                    </div>
                    <ProgressBar completed="60" width='100%' height='8px' isLabelVisible = {false} bgColor='green' />
                </div>
                <div class="progress-bar-container1">
                    <div className="progressTitle">
                        <span>Nhân viên phục vụ</span>
                        <span>9,2</span>
                    </div>
                    <ProgressBar completed="60" width='100%' height='8px' isLabelVisible = {false} bgColor='orange'/>
                </div>
                <div class="progress-bar-container1">
                    <div className="progressTitle">
                        <span>Nhân viên phục vụ</span>
                        <span>9,2</span>
                    </div>
                    <ProgressBar completed="60" width='100%' height='8px' isLabelVisible = {false} bgColor='green'/>
                </div>
                <div class="progress-bar-container1">
                    <div className="progressTitle">
                        <span>Nhân viên phục vụ</span>
                        <span>9,2</span>
                    </div>
                    <ProgressBar completed="60" width='100%' height='8px' isLabelVisible = {false} bgColor='green'/>
                </div>
                <div class="progress-bar-container1">
                    <div className="progressTitle">
                        <span>Nhân viên phục vụ</span>
                        <span>9,2</span>
                    </div>
                    <ProgressBar completed="60" width='100%' height='8px' isLabelVisible = {false} bgColor='orange'/>
                </div>
            </div>
        </div>
        <div className="reviewSelect1">
            <b>Chọn chủ đề để đánh giá:</b>
            <ul className="listSelect">
                <li className="selectItem">
                    <AddIcon style={{fontSize: '17px'}}/>
                    <span>Nhân viên</span>
                </li>
                <li className="selectItem">
                    <AddIcon style={{fontSize: '17px'}}/>
                    <span>Nhân viên</span>
                </li>
                <li className="selectItem">
                    <AddIcon style={{fontSize: '17px'}}/>
                    <span>Nhân viên</span>
                </li>
                <li className="selectItem">
                    <AddIcon style={{fontSize: '17px'}}/>
                    <span>Nhân viên</span>
                </li>
            </ul>
        </div>
        <div className="listReviewDesc">
            <b>Đánh giá của khách:</b>
            <table>
                <tr style={{borderBottom: '1px solid gray'}}>
                    <td>
                        <div className="leftTab">
                            <div className="user">
                                <Avatar alt="Remy Sharp" src="https://png.pngtree.com/png-clipart/20200819/ourlarge/pngtree-female-avatar-profile-png-image_2326119.jpg" />
                                <div className="username">Bala</div>
                            </div>
                            <div className="nameRoomBook">
                                <BedIcon />
                                <span>Phòng Giường Đôi Có Ban Công</span>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div className='rightTab'>
                            <span className="time">Đã đánh giá: ngày 20 tháng 2 năm 2024</span>
                            <span className='desc'>Căn hộ được biết đến vì chúng tôi đã sử dụng nó nhiều lần, nhưng với mỗi lần lưu trú, điều kiện ngày càng tồi tệ hơn - tức là một căn phòng nhỏ, phòng tắm không sạch sẽ lắm (chủ yếu là vòi sen), không có TV - mặc dù báo cáo và dịch vụ không có kết quả và không có phản hồi từ các chủ nhà. Tôi nghĩ đây là lần lưu trú cuối cùng của chúng tôi trong căn hộ này, thật đáng tiếc.... Tiếng ồn lớn do tàu ở gần.</span>
                            <div className="like">
                                <ThumbUpIcon style={{fontSize: '15px', color: '#5fa6d8'}} />
                                <ThumbDownIcon style={{fontSize: '15px', color: '#5fa6d8'}}/>
                            </div>
                        </div>
                    </td>
                </tr> 
                <tr>
                    <td>
                        <div className="leftTab">
                            <div className="user">
                                <Avatar alt="Remy Sharp" src="https://png.pngtree.com/png-clipart/20200819/ourlarge/pngtree-female-avatar-profile-png-image_2326119.jpg" />
                                <div className="username">Bala</div>
                            </div>
                            <div className="nameRoomBook">
                                <BedIcon />
                                <span>Phòng Giường Đôi Có Ban Công</span>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div className='rightTab'>
                            <span className="time">Đã đánh giá: ngày 20 tháng 2 năm 2024</span>
                            <span className='desc'>Căn hộ được biết đến vì chúng tôi đã sử dụng nó nhiều lần, nhưng với mỗi lần lưu trú, điều kiện ngày càng tồi tệ hơn - tức là một căn phòng nhỏ, phòng tắm không sạch sẽ lắm (chủ yếu là vòi sen), không có TV - mặc dù báo cáo và dịch vụ không có kết quả và không có phản hồi từ các chủ nhà. Tôi nghĩ đây là lần lưu trú cuối cùng của chúng tôi trong căn hộ này, thật đáng tiếc.... Tiếng ồn lớn do tàu ở gần.</span>
                            <div className="like">
                                <ThumbUpIcon style={{fontSize: '15px', color: '#5fa6d8'}} />
                                <ThumbDownIcon style={{fontSize: '15px', color: '#5fa6d8'}}/>
                            </div>
                        </div>
                    </td>
                </tr> 
                <tr>
                    <td style={{width: '25%'}}>
                        <div className="leftTab">
                            <div className="user">
                                <Avatar alt="Remy Sharp" src="https://png.pngtree.com/png-clipart/20200819/ourlarge/pngtree-female-avatar-profile-png-image_2326119.jpg" />
                                <div className="username">Bala</div>
                            </div>
                            <div className="nameRoomBook">
                                <BedIcon />
                                <span>Phòng Giường Đôi Có Ban Công</span>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div className='rightTab'>
                            <span className="time">Đã đánh giá: ngày 20 tháng 2 năm 2024</span>
                            <span className='desc'>
                            Căn hộ được biết đến vì chúng tôi đã sử dụng nó nhiều lần, nhưng với mỗi lần lưu trú, điều kiện ngày càng tồi tệ hơn - tức là một căn phòng nhỏ, phòng tắm không sạch sẽ lắm (chủ yếu là vòi sen), không có TV - mặc dù báo cáo và dịch vụ không có kết quả và không có phản hồi từ các chủ nhà. Tôi nghĩ đây là lần lưu trú cuối cùng của chúng tôi trong căn hộ này, thật đáng tiếc.... Tiếng ồn lớn do tàu ở gần.
                            </span>
                            <div className="like">
                                <ThumbUpIcon style={{fontSize: '15px', color: '#5fa6d8'}} />
                                <ThumbDownIcon style={{fontSize: '15px', color: '#5fa6d8'}}/>
                            </div>
                        </div>
                    </td>
                </tr> 
            </table>
        </div>
        <Pagination count={10} color="primary" style={{display: 'flex', margin: 'auto'}}/>
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