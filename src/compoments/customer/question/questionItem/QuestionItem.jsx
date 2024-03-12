import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import './QuestionItem.css'
import { format } from 'date-fns';
const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function QuestionItem({data}) {
  return (
    <Card sx={{ minWidth: 275, height : '250px' }}>
      <CardContent style={{display: 'flex', flexDirection : 'column', height : '100%', position: 'relative'}}>
        <div>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          <div className="userQuestion">
            <AccountCircleIcon />
            <span>{data.question}?</span>
          </div>
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          <div className="userFeedBack">
            <ChatBubbleIcon />
            <span>{data.FeedBack.feedback}</span>
          </div>
        </Typography>
        </div>
        <Typography variant="body2">
          <span style={{fontSize: '12px', color: 'gray',  position : 'absolute', bottom : 60}}>Đã trả lời vào {format(data.FeedBack.createdAt, 'yyyy-MM-dd')}</span>
        </Typography>
      </CardContent>
    </Card>
  );
}