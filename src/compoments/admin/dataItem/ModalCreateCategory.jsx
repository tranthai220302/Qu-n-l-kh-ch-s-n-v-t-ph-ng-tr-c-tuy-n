import React, { useState } from 'react';
import { Alert, Button, CircularProgress } from '@mui/material';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import { TransitionGroup } from 'react-transition-group';
import newRequest from '../../../ults/newRequest';
import Backdrop from '@mui/material/Backdrop';
import Snackbar from '@mui/material/Snackbar';
import AddIcon from "@mui/icons-material/Add";


export default function ModalCreateCategory({getData}) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([])
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState(null);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleCreate = ()=>{
    setIsLoading(true)
    newRequest.post(`/item/categoryItem/create`, {
        name : name
    }).then((res)=>{
        setIsLoading(false);
        setError(false)
        getData()
    }).catch((error)=>{
        setIsLoading(false);
        setError(error.response.data)
        getData()
    })
  }
  const handleClose = () => {
    setOpen(false);
  };
  const handleOk = () =>{
    setOpen(false);
    handleCreate()
  }
  
  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        <AddIcon />
      </Button>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
        >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogContent>
          <div>
            <List sx={{ mt: 1 }}>
              <TransitionGroup>
                  <Collapse>
                    <div style={{marginTop : '10px'}}>
                    <TextField 
                        id={`standard-basic`} 
                        label="Nhập tên tiện nghi" 
                        variant="standard" 
                        onChange={(e)=>{setName(e.target.value)}}
                      />
                    </div>
                  </Collapse>
              </TransitionGroup>
            </List>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOk}>OK</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
