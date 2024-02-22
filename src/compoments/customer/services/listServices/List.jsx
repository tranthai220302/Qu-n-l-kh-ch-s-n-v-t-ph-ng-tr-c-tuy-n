import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import BathtubIcon from '@mui/icons-material/Bathtub';
import CheckIcon from '@mui/icons-material/Check';
import './List.css'
export default function listServices() {
  return (
    <List sx={{ width: '25%', bgcolor: 'background.paper' }} style={{marginTop: '10px'}}>
      <ul className="listTB">
      <li className="TBItem1">
            <BathtubIcon style={{fontSize: '20px', color: 'black'}}/>
            <span>Phòng tắm</span>
        </li>
        <li className="TBItem">
            <CheckIcon style={{fontSize: '15px', color: 'gray'}}/>
            <span>Giấy vệ sinh</span>
        </li>
        <li className="TBItem">
            <CheckIcon style={{fontSize: '15px', color: 'gray'}}/>
            <span>Phòng tắm riêng</span>
        </li>
        <li className="TBItem">
            <CheckIcon style={{fontSize: '15px', color: 'gray'}}/>
            <span>Bồn tắm</span>
        </li>
        <li className="TBItem">
            <CheckIcon style={{fontSize: '15px', color: 'gray'}}/>
            <span>Bồn tắm</span>
        </li>
        <li className="TBItem">
            <CheckIcon style={{fontSize: '15px', color: 'gray'}}/>
            <span>Bồn tắm</span>
        </li>
        <li className="TBItem">
            <CheckIcon style={{fontSize: '15px', color: 'gray'}}/>
            <span>Bồn tắm</span>
        </li>
        <li className="TBItem">
            <CheckIcon style={{fontSize: '15px', color: 'gray'}}/>
            <span>Bồn tắm</span>
        </li>
        <li className="TBItem">
            <CheckIcon style={{fontSize: '15px', color: 'gray'}}/>
            <span>Bồn tắm</span>
        </li>
      </ul>
    </List>
  );
}