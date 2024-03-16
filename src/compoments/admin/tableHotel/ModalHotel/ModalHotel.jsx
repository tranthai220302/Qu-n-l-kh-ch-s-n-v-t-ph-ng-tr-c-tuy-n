import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Box from '@mui/material/Box';
import { useEffect } from 'react';
import { Stack } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Pagination, Navigation } from 'swiper/modules';
import FeaturedProperties from '../../../customer/featuredProperties/FeaturedProperties';
import ModalRoom from './ModalRoom';
import ModalTitle from './ModalItem';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import StarBorderIcon from '@mui/icons-material/StarBorder';

function srcset(image, width, height, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${width * cols}&h=${
      height * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalHotel({data}) {
    useEffect(()=>{
        console.log(data)
    },[])
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        View
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {data.name}
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <List sx={{height : '100%'}}>
            <Stack direction={'row'} spacing={3} width={'100%'} height={'100%'}>
                <Stack  height={'100%'}>
                <Box sx={{ width: 500, height: 650, overflowY: 'scroll' }} padding={'10px'}>
                <ImageList variant="masonry" cols={3} gap={8}>
                    {data.Images && data.Images.length > 0 && data.Images.map((item) => (
                    <ImageListItem key={item.id}>
                        <img
                        srcSet={`${item.filename}?w=248&fit=crop&auto=format&dpr=2 2x`}
                        src={item.filename}
                        loading="lazy"
                        />
                    </ImageListItem>
                    ))}
                </ImageList>
                
                </Box>
                </Stack>
                <Stack padding={'10px'} width={'100%'}>
                    <span style={{fontWeight: '800', fontSize: '26px', color: '#94c9eb'}}>{data.name}</span>
                    <div style={{marginTop: '20px'}}>
                    <span style={{fontSize: '15px', color : 'gray', fontStyle: 'italic'}}>{data.description}</span>
                    </div>
                    <div style={{marginTop: '20px'}}>
                        <span style={{fontSize: '16px'}}><b>Địa chỉ:</b>{data.numberHome}, {data.ward}, {data.district}, {data.province}</span>
                    </div>
                    <div style={{marginTop: '20px'}}>
                        <span><b>Phone:</b>{data.HotelOwner.User.phone}</span>
                    </div>
                    <div style={{marginTop: '20px'}}>
                        <span><strong>Email:</strong>{data.HotelOwner.User.email}</span> 
                    </div>
                    <div style={{marginTop: '20px', display : 'flex', gap :'10px', flexDirection : 'column'}}>
                    <span style={{marginBottom : '10px'}}><strong>Danh sách phòng :</strong></span> 
                    <Swiper
                        slidesPerView={4}
                        spaceBetween={10}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[Pagination]}
                        className="fp"
                        >
                            {
                            data.Rooms && data.Rooms.length > 0 && data.Rooms.map((item)=>(
                                <SwiperSlide key={item.id}>
                                    <div className="fpItem" key={item.id}>
                                    <img
                                        src={item.Images.length > 0 ? item.Images[0].filename : "https://cf.bstatic.com/xdata/images/hotel/max1280x900/215955381.jpg?k=ff739d1d9e0c8e233f78ee3ced82743ef0355e925df8db7135d83b55a00ca07a&o=&hp=1"}
                                        alt=""
                                        className='fpImg'
                                    />
                                    <div className="descHotelItem">
                                        <span className="fpName">{item.name}-{item.Category.name}</span>
                                        {/* <Rating name="half-rating-read" defaultValue={item.numStars} precision={0.5} readOnly style={{fontSize : '13px'}} /> */}
                                        <div style={{display : 'flex', justifyContent : 'space-between', marginTop : '10px'}}>
                                            <ModalRoom data = {item.PriceRooms}/>
                                            <ModalTitle data = {item.Item} />
                                        </div>
                                    </div>
                                    </div>
                             </SwiperSlide>
                        ))
                    }
                    {
                        data.Rooms == 0 && <span>Không có phòng</span>
                    }
                </Swiper>
                    </div>
                </Stack>
            </Stack>
        </List>
      </Dialog>
    </React.Fragment>
  );
}
const itemData = [
    {
      img: 'https://images.unsplash.com/photo-1549388604-817d15aa0110',
      title: 'Bed',
    },
    {
      img: 'https://images.unsplash.com/photo-1525097487452-6278ff080c31',
      title: 'Books',
    },
    {
      img: 'https://images.unsplash.com/photo-1523413651479-597eb2da0ad6',
      title: 'Sink',
    },
    {
      img: 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3',
      title: 'Kitchen',
    },
    {
      img: 'https://images.unsplash.com/photo-1588436706487-9d55d73a39e3',
      title: 'Blinds',
    },
    {
      img: 'https://images.unsplash.com/photo-1574180045827-681f8a1a9622',
      title: 'Chairs',
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
      img: 'https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62',
      title: 'Candle',
    },
    {
      img: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4',
      title: 'Coffee table',
    },
  ];
