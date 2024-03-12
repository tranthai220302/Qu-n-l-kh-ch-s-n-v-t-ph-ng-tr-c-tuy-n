import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { blue, red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import format from 'date-fns/format';
import './ReviewItem.css'
import { useState } from 'react';
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function ReviewItem({data}) {
  const [expanded, setExpanded] = React.useState(false);
  const [click, setClick] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const style = {
    maxHeight: '5.5em', 
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 4, 
    WebkitBoxOrient: 'vertical',
  };
  return (
    <Card sx={{ width : '100%', height: 230 }}>
      <CardHeader
        avatar={
          data.Customer.User.avatar ? (
            <Avatar alt="Cindy Baker" src={data.Customer.User.avatar} />
          ) : (
            <Avatar sx={{ bgcolor: blue[800] }} aria-label="recipe">
          </Avatar>
          )
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={data.Customer.User.name}
        subheader={format(data.createdAt, 'yyyy-MM-dd HH:mm:ss')}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary" style={style}>
          {data.desc}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={()=>{setClick(!click)}}>
          <FavoriteIcon style={click ? {color: 'red'} : {}} />
        </IconButton>
        <span className='linkReview'>Xem chi tiết</span>
      </CardActions>
    </Card>
  );
}