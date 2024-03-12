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
import ImageRoom from '../../../../compoments/customer/RoomEmpty/ImgaeRoom/ImageRoom';
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


export default function ModalImg({num, data}) {
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
  console.log(data)

  return (
    <React.Fragment>
        <span className='numImgDu'  onClick={handleClickOpen}>+ {num}</span>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          <b>Thông tin khách sạn</b>
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
        {openImg && data[slideNumber]?.filename &&  (
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
                  <img src={data[slideNumber]?.filename} alt="" className="sliderImg1" />
                </div>
                <FontAwesomeIcon
                  icon={faCircleArrowRight}
                  className="arrow1"
                  onClick={() => handleMove("r")}
                />
              </div>
          )}
          <div className="modalRoom">
          <ImageList sx={{ width: '100%', height: 600 }} variant="woven" cols={3} gap={8}>
          {data.map((item, i) => (
            <ImageListItem key={item.img}>
              <img
                onClick={() => handleOpen(i)}
                srcSet={`${item.filename}?w=161&fit=crop&auto=format&dpr=2 2x`}
                src={`${item.filename}?w=161&fit=crop&auto=format`}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
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
