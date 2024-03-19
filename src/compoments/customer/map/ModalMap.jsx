import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useState } from 'react';
import MapContainer from './MapContainer';
export default function ModalMap({data}) {
  const [open, setOpen] = useState(false);
  console.log(data)
  return (
    <React.Fragment>
        <div style={{position : 'relative', marginBottom : '10px', boxShadow :'rgba(0, 0, 0, 0.24) 0px 3px 8px'}}>
            <img src="https://cdn.tgdd.vn/Files/2019/12/21/1227776/street-view-data_720x405.gif" alt="" width={'100%'} height={'100%'} />
            <Button variant="contained" onClick={()=>{setOpen(true)}} sx={{position : 'absolute', left : '50px', top : '50px'}}>
                Hiển thị bản đồ
            </Button>
        </div>
      <Dialog
        fullWidth={true}
        maxWidth={'xl'}
        open={open}
        onClose={()=>{setOpen(false)}}
      >
        <DialogContent>
            <MapContainer data = {data}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{setOpen(false)}}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
