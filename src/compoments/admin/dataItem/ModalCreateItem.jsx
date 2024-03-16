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
const FRUITS = [
  1,
  2,
  3,
  4
];

function renderItem(handleItemChange) {
  return (
    <div style={{marginTop : '10px'}}>
      <TextField id="standard-basic" label="Tên dịch vụ" variant="standard" onChange={(e) => handleItemChange(e.target.value)}/>
    </div>
  );
}

export default function ModalCreateItem({getData, id}) {
  const [fruitsInBasket, setFruitsInBasket] = useState(FRUITS.slice(0, 1));
  const [open, setOpen] = useState(false);
  const [serviceNames, setServiceNames] = useState([]);
  const [data, setData] = useState([])
  const [message, setMessage] = useState('')
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const handleAddFruit = () => {
    const nextHiddenItem = FRUITS.find((i) => !fruitsInBasket.includes(i));
    if (nextHiddenItem) {
      setFruitsInBasket((prev) => [nextHiddenItem, ...prev]);
    }
  };

  const handleItemChange = (key, value) => {
    setServiceNames((prev) => {
      const index = prev.findIndex(item => item.key === key);
      if (index !== -1) {
        const updatedServiceNames = [...prev];
        updatedServiceNames[index].value = value;
        return updatedServiceNames;
      } else {
        return [...prev, { key, value }];
      }
    });
  };
  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'right',
  });
  const { vertical, horizontal, openSnack } = state;
  const addFruitButton = (
    <Button
      variant="contained"
      disabled={fruitsInBasket.length >= FRUITS.length}
      onClick={handleAddFruit}
    >
      Thêm thiết bị
    </Button>
  );

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleCloseSnack = () => {
    setState({ ...state, openSnack: false });
  };
  const handleCreate = ()=>{
    setIsLoading(true)
    newRequest.post(`/item/create/${id}`, {
        data : serviceNames
    }).then((res)=>{
        setData(res.data);
        setIsLoading(false);
        setError(false)
        setState({
            openSnack: true,
            vertical: 'top',
            horizontal: 'right',
        })
        setMessage("Thêm thành công!")
        getData()
        setServiceNames([])
    }).catch((error)=>{
        setIsLoading(false);
        setError(error.response.data)
        setMessage(error.response.dat)
        setServiceNames([])
        getData()
    })
  }
  const handleClose = () => {
    setOpen(false);
  };
  const handleOk = () =>{
    setOpen(false);
    handleCreate()
    setFruitsInBasket(FRUITS.slice(0, 1))
  }
  
  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        <AddIcon />
      </Button>
      <Snackbar 
          anchorOrigin={{ vertical, horizontal }}
          open={openSnack}
          onClose={handleCloseSnack}
          message={"helo"}
          key={vertical + horizontal}
      >
      </Snackbar>
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
            {addFruitButton}
            <List sx={{ mt: 1 }}>
              <TransitionGroup>
                {fruitsInBasket.map((item, i) => (
                  <Collapse key={item}>
                    <div style={{marginTop : '10px'}}>
                    <TextField 
                        defaultValue={serviceNames[i]?.value}
                        key={i} 
                        id={`standard-basic-${i}`} 
                        label="Tên dịch vụ" 
                        variant="standard" 
                        onChange={(e) => handleItemChange(`service-${i}`, e.target.value)}
                      />
                    </div>
                  </Collapse>
                ))}
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
