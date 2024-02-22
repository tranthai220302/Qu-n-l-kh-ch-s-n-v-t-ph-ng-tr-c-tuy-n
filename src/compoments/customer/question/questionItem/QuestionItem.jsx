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
const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function QuestionItem() {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          <div className="userQuestion">
            <AccountCircleIcon />
            <span>When is the best time to visit your property for the perfect beach holiday?</span>
          </div>
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          <div className="userFeedBack">
            <ChatBubbleIcon />
            <span>Dear Sir/Madam, Thank you for your kind question. The best time to visit the city is Summertime from March to August</span>
          </div>
        </Typography>
        <Typography variant="body2">
          <span style={{fontSize: '12px', color: 'gray'}}>Đã trả lời vào ngày 10 tháng 9 năm 2019</span>
        </Typography>
      </CardContent>
    </Card>
  );
}