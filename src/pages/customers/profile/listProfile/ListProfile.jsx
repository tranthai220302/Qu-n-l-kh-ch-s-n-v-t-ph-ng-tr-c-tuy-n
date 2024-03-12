import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import KeyboardOptionKeyIcon from '@mui/icons-material/KeyboardOptionKey';
import PersonIcon from '@mui/icons-material/Person';
import SecurityIcon from '@mui/icons-material/Security';
import PaymentIcon from '@mui/icons-material/Payment';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PeopleIcon from '@mui/icons-material/People';
export default function ListProfile({setOpen}) {
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index, i) => {
    setSelectedIndex(index);
    setOpen(i)
  };

  return (
    <Box sx={{ width: '20%', bgcolor: 'background.paper',  }}>
      <List component="nav" aria-label="main mailbox folders">
        <ListItemButton
            style={{marginBottom: '10px'}}
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0, 0)}
        >
          <ListItemIcon>
          <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Thông tin cá nhân" />
        </ListItemButton>
        <ListItemButton
        style={{marginBottom: '10px'}}
          selected={selectedIndex === 2}
          onClick={(event) => handleListItemClick(event, 0, 1)}
        >
          <ListItemIcon>
            <SecurityIcon />
          </ListItemIcon>
          <ListItemText primary="An toàn và bảo mật" />
        </ListItemButton>
        <ListItemButton
        style={{marginBottom: '10px'}}
          selected={selectedIndex === 3}
          onClick={(event) => handleListItemClick(event, 0, 2)}
        >
          <ListItemIcon>
            <PaymentIcon/>
          </ListItemIcon>
          <ListItemText primary="Thông tin thanh toán" />
        </ListItemButton>
        <ListItemButton
        style={{marginBottom: '10px'}}
          selected={selectedIndex === 4}
          onClick={(event) => handleListItemClick(event, 0, 3)}
        >
          <ListItemIcon>
            <AdminPanelSettingsIcon/>
          </ListItemIcon>
          <ListItemText primary="Quyền riêng tư" />
        </ListItemButton>
        <ListItemButton
        style={{marginBottom: '10px'}}
          selected={selectedIndex === 5}
          onClick={(event) => handleListItemClick(event, 0, 4)}
        >
          <ListItemIcon>
            <NotificationsIcon/>
          </ListItemIcon>
          <ListItemText primary="Thông báo email" />
        </ListItemButton>
        <ListItemButton
        style={{marginBottom: '10px'}}
          selected={selectedIndex === 6}
          onClick={(event) => handleListItemClick(event, 1, 5)}
        >
          <ListItemIcon>
            <PeopleIcon/>
          </ListItemIcon>
          <ListItemText primary="Người đi cúng" />
        </ListItemButton>
      </List>
      <Divider />
    </Box>
  );
}