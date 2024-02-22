import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ImageRoom from '../ImgaeRoom/ImageRoom';
import PoolIcon from '@mui/icons-material/Pool';
import CheckIcon from '@mui/icons-material/Check';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import './ModalRoom.css'
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
  '& .MuiDialog-paper': {
    maxWidth: '80%',
    width: '80%',   
  },
}));


export default function ModalRoom() {
  const [open, setOpen] = useState(false);
  const [openImg, setOpenImg] = useState(false);
  const [slideNumber, setSlideNumber] = useState(0);
  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpenImg(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber)
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
    <ErrorOutlineIcon className='iconInfor' style={{fontSize: '15px', cursor : 'pointer', color : '#5bbaff'}} onClick={handleClickOpen}/>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          <b>Thông tin chi tiết của phòng</b>
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
        {openImg && itemData[slideNumber]?.img &&  (
              <div className="slider1">
                <FontAwesomeIcon
                  icon={faCircleXmark}
                  className="close1"
                  onClick={() => setOpenImg(false)}
                />
                <FontAwesomeIcon
                  icon={faCircleArrowLeft}
                  className="arrow1"
                  onClick={() => handleMove("l")}
                />
                <div className="sliderWrapper1">
                  <img src={itemData[slideNumber]?.img} alt="" className="sliderImg1" />
                </div>
                <FontAwesomeIcon
                  icon={faCircleArrowRight}
                  className="arrow1"
                  onClick={() => handleMove("r")}
                />
              </div>
          )}
          <div className="modalRoom">
          <ImageList sx={{ width: 500, height: 600 }} variant="woven" cols={3} gap={8}>
          {itemData.map((item, i) => (
            <ImageListItem key={item.img}>
              <img
                onClick={() => handleOpen(i)}
                srcSet={`${item.img}?w=161&fit=crop&auto=format&dpr=2 2x`}
                src={`${item.img}?w=161&fit=crop&auto=format`}
                alt={item.title}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
            <div className="roomDesc">
              <h3>Nhà 1 Phòng Ngủ</h3>
                <ul className="serRoom">
                  <li className="serItem1" style={{marginTop: '-10px'}}>
                    <PoolIcon  style={{fontSize : '15px'}} />
                    <p>Hồ trời</p>
                  </li>
                  <li className="serItem1" style={{marginTop: '-10px'}}>
                    <PoolIcon  style={{fontSize : '15px'}} />
                    <p>Hồ bơi ngoài trời</p>
                  </li>
                  <li className="serItem1" style={{marginTop: '-10px'}}>
                    <PoolIcon  style={{fontSize : '15px'}} />
                    <p>Hồ bơi ngoài trời</p>
                  </li>
                  <li className="serItem1" style={{marginTop: '-10px'}}>
                    <PoolIcon  style={{fontSize : '15px'}} />
                    <p>Hồ bơi</p>
                  </li>
                  <li className="serItem1" style={{marginTop: '-10px'}}>
                    <PoolIcon  style={{fontSize : '15px'}} />
                    <p>Hồ bơi ngoài trời</p>
                  </li>
                  <li className="serItem1" style={{marginTop: '-10px'}}>
                    <PoolIcon  style={{fontSize : '15px'}} />
                    <p>Hồ bơi ngoài trời</p>
                  </li>
                  <li className="serItem1" style={{marginTop: '-10px'}}>
                    <PoolIcon  style={{fontSize : '15px'}} />
                    <p>Hồ bơi ngoài trời</p>
                  </li>
                </ul>
                <div><b>Kích thước nhà</b>: 54m<sup>2</sup></div>
                <span>Giường thoải mái, 9.2 – Dựa trên 15 đánh giá</span><br></br>
                <span>This cottage includes the rustic charm of Timber paneling plus the warm tone of Terracotta floor tiles downstairs. Upstairs you will find a mixture of Jarrah and recycled Hardwood. There is a fire place downstairs.</span><br></br>
                <b>Trong nhà bếp riêng của bạn: </b>
                <ul className="roamRoom1">
                  <li className="roamItem1" style={{marginTop: '-10px'}}>
                    <CheckIcon  style={{fontSize : '15px', color : 'green'}} />
                    <p>Hồ bơi ngoài trời</p>
                  </li>
                  <li className="roamItem1" style={{marginTop: '-10px'}}>
                    <CheckIcon  style={{fontSize : '15px', color : 'green'}} />
                    <p>Hồ bơi ngoài trời</p>
                  </li>
                  <li className="roamItem1" style={{marginTop: '-10px'}}>
                    <CheckIcon  style={{fontSize : '15px', color : 'green'}} />
                    <p>Hồ bơi ngoài trời</p>
                  </li>
                  <li className="roamItem1" style={{marginTop: '-10px'}}>
                    <CheckIcon  style={{fontSize : '15px', color : 'green'}} />
                    <p>Hồ bơi ngoài trời</p>
                  </li>
                  <li className="roamItem1" style={{marginTop: '-10px'}}>
                    <CheckIcon  style={{fontSize : '15px', color : 'green'}} />
                    <p>Hồ bơi ngoài trời</p>
                  </li>
                  <li className="roamItem1" style={{marginTop: '-10px'}}>
                    <CheckIcon  style={{fontSize : '15px', color : 'green'}} />
                    <p>Hồ bơi ngoài trời</p>
                  </li>
                  <li className="roamItem1" style={{marginTop: '-10px'}}>
                    <CheckIcon  style={{fontSize : '15px', color : 'green'}} />
                    <p>Hồ bơi </p>
                  </li>
                </ul>
                <b>Trong phòng tắm riêng của bạn: </b>
                <ul className="roamRoom1">
                  <li className="roamItem1" style={{marginTop: '-10px'}}>
                    <CheckIcon  style={{fontSize : '15px', color : 'green'}} />
                    <p>Hồ bơi ngoài trời</p>
                  </li>
                  <li className="roamItem1" style={{marginTop: '-10px'}}>
                    <CheckIcon  style={{fontSize : '15px', color : 'green'}} />
                    <p>Hồ bơi ngoài trời</p>
                  </li>
                  <li className="roamItem1" style={{marginTop: '-10px'}}>
                    <CheckIcon  style={{fontSize : '15px', color : 'green'}} />
                    <p>Hồ bơi ngoài trời</p>
                  </li>
                  <li className="roamItem1" style={{marginTop: '-10px'}}>
                    <CheckIcon  style={{fontSize : '15px', color : 'green'}} />
                    <p>Hồ bơi ngoài trời</p>
                  </li>
                  <li className="roamItem1" style={{marginTop: '-10px'}}>
                    <CheckIcon  style={{fontSize : '15px', color : 'green'}} />
                    <p>Hồ bơi ngoài trời</p>
                  </li>
                  <li className="roamItem1" style={{marginTop: '-10px'}}>
                    <CheckIcon  style={{fontSize : '15px', color : 'green'}} />
                    <p>Hồ bơi ngoài trời</p>
                  </li>
                  <li className="roamItem1" style={{marginTop: '-10px'}}>
                    <CheckIcon  style={{fontSize : '15px', color : 'green'}} />
                    <p>Hồ bơi </p>
                  </li>
                </ul>
                <b>Tiện nghi trong nhà: </b>
                <ul className="roamRoom1">
                  <li className="roamItem1" style={{marginTop: '-10px'}}>
                    <CheckIcon  style={{fontSize : '15px', color : 'green'}} />
                    <p>Hồ bơi ngoài trời</p>
                  </li>
                  <li className="roamItem1" style={{marginTop: '-10px'}}>
                    <CheckIcon  style={{fontSize : '15px', color : 'green'}} />
                    <p>Hồ bơi ngoài trời</p>
                  </li>
                  <li className="roamItem1" style={{marginTop: '-10px'}}>
                    <CheckIcon  style={{fontSize : '15px', color : 'green'}} />
                    <p>Hồ bơi ngoài trời</p>
                  </li>
                  <li className="roamItem1" style={{marginTop: '-10px'}}>
                    <CheckIcon  style={{fontSize : '15px', color : 'green'}} />
                    <p>Hồ bơi ngoài trời</p>
                  </li>
                  <li className="roamItem1" style={{marginTop: '-10px'}}>
                    <CheckIcon  style={{fontSize : '15px', color : 'green'}} />
                    <p>Hồ bơi ngoài trời</p>
                  </li>
                  <li className="roamItem1" style={{marginTop: '-10px'}}>
                    <CheckIcon  style={{fontSize : '15px', color : 'green'}} />
                    <p>Hồ bơi ngoài trời</p>
                  </li>
                  <li className="roamItem1" style={{marginTop: '-10px'}}>
                    <CheckIcon  style={{fontSize : '15px', color : 'green'}} />
                    <p>Hồ bơi </p>
                  </li>
                </ul>
                <div className='priceTotal'>VNĐ 684.000 cho một đêm</div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Đặt phòng
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1549388604-817d15aa0110',
    title: 'Bed',
  },
  {
    img: 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3',
    title: 'Kitchen',
  },
  {
    img: 'https://images.unsplash.com/photo-1523413651479-597eb2da0ad6',
    title: 'Sink',
  },
  {
    img: 'https://images.unsplash.com/photo-1525097487452-6278ff080c31',
    title: 'Books',
  },
  {
    img: 'https://images.unsplash.com/photo-1574180045827-681f8a1a9622',
    title: 'Chairs',
  },
  {
    img: 'https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62',
    title: 'Candle',
  },
  {
    img: 'https://images.unsplash.com/photo-1530731141654-5993c3016c77',
    title: 'Laptop',
  },
  {
    img: 'https://images.unsplash.com/photo-1481277542470-605612bd2d61',
    title: 'Doors',
  },
  {
    img: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7',
    title: 'Coffee',
  },
  {
    img: 'https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee',
    title: 'Storage',
  },
  {
    img: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4',
    title: 'Coffee table',
  },
  {
    img: 'https://images.unsplash.com/photo-1588436706487-9d55d73a39e3',
    title: 'Blinds',
  },
];