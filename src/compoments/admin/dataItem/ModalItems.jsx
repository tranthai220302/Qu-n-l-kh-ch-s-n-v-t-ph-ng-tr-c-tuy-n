import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import { Checkbox } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import {CircularProgress } from "@mui/material";
import { useState } from 'react';
import newRequest from '../../../ults/newRequest';
const emails = ['username@gmail.com', 'user02@gmail.com'];

function SimpleDialog(props) {
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const { onClose, selectedValue, open, data, getData } = props;
  const [selectedId, setSelectedId] = useState([])
  const handleClose = () => {
    onClose(selectedValue);
  };
  const handleChangeId = (e) =>{
    const checked = e.target.checked;
    const value = e.target.value;
    if(checked){
        setSelectedId([...selectedId, value])
    }else{
        const update = selectedId.filter((item) => item !== value)
        setSelectedId(update)
    }
  }
  const handleListItemClick = (value) => {
    onClose(value);
  };
  const handleDelete = () =>{
    setIsLoading(true);
    newRequest.post('/item/delete', {
        id : selectedId
    }).then((res)=>{
        setIsLoading(false);
        setError(false);
        getData();
    }).catch((error)=>{
        setError(error.response.data);
        setIsLoading(false)
    })
  }
  return (
    <Dialog onClose={handleClose} open={open}>
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isLoading}
            >
            <CircularProgress color="inherit" />
      </Backdrop>
      <DialogTitle>Danh sách vật dụng</DialogTitle>
      <List sx={{ pt: 0 }}>
        {data.map((item) => (
          <ListItem disableGutters key={item.id}>
            <ListItemButton>
                <Checkbox size='small' value={item.id} onChange={(e)=>{handleChangeId(e)}}/>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      {
        selectedId.length > 0 && (
            <div style={{padding : '20px', width : '80%'}}>
            <Button sx={{border : '1px solid red', color : 'red', width : '100%'}} variant='outlined' onClick={()=>{handleDelete()}}>Xoá</Button>
            </div>
        )
      }
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function ModalItems({data, getData}) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        <TurnedInIcon/>
      </Button>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        data = {data}
        getData = {getData}
      />
    </div>
  );
}
