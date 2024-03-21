import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { KeyboardArrowDown } from '@mui/icons-material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Pagination, Navigation } from 'swiper/modules';
import { CardActionArea, CardActions } from '@mui/material';
export default function ModalRoomCustomer({data}) {
    console.log(data);
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <div className='push' onClick={handleClickOpen} style={{textAlign: 'center', fontSize : '13px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap :'0px', justifyContent: 'flex-end'}}><span>Xem thêm</span> <KeyboardArrowDown style={{fontSize : '15px'}} /></div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Danh sách phòng đã đặt"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <Swiper
      slidesPerView={1}
      spaceBetween={10}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination]}
      className="fp"
      >
        {
          data && data.price.length > 0 && data.price.map((item)=>(
            <SwiperSlide key={item.id}>
                <CardActions sx={{display : 'flex', flexDirection : 'column', gap : '10px', marginBottom: '20px'}}>
                <span style={{fontWeight: 700, fontSize : '15px', textDecoration: 'underline'}}>Phòng đã đặt</span>
                <div style={{display: 'flex', flexDirection : 'column', gap : '10px', overflowY : 'atuo', height : '200px'}}>
                    <table style={{fontSize : '13px', width: '230px', padding: '5px 0 5px 8px', borderRadius : '10px', boxShadow : 'rgba(0, 0, 0, 0.1) 0px 4px 12px'}}>
                        <tr>
                            <td style={{width : '50%', fontWeight : 700, padding : '6px 0'}}>Tên phòng</td>
                            <td>{item.Room.name}</td>
                        </tr>
                        <tr>
                            <td style={{width : '50%', fontWeight : 700, padding : '6px 0'}}>Mã phòng</td>
                            <td>{item.id}</td>
                        </tr>
                        <tr>
                            <td style={{width : '50%', fontWeight : 700, padding : '6px 0'}}>Mã pin</td>
                            <td>{data.pinCode}</td>
                        </tr>
                        <tr>
                            <td style={{width : '50%', fontWeight : 700, padding : '6px 0'}}>Số lượng</td>
                            <td>{item.BookingPriceRoom.numRoom}</td>
                        </tr>
                        <tr>
                            <td style={{width : '50%', fontWeight : 700, padding : '6px 0'}}>Người</td>
                            <td>{item.numberPerson} người</td>
                        </tr>
                        <tr>
                            <td style={{width : '50%', fontWeight : 700, padding : '6px 0'}}>Giá/người</td>
                            <td style={{color: 'red'}}>{(item.price).toLocaleString('en-US')} VND</td>
                        </tr>
                        <tr>
                            <td style={{width : '50%', fontWeight : 700, padding : '6px 0'}}>Huỷ phòng</td>
                            <td style={{color: 'red', cursor: 'pointer'}}>Xác nhận</td>
                        </tr>
                    </table>
                </div>
            </CardActions>
          </SwiperSlide>
          ))
        }
      </Swiper>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Ok</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}