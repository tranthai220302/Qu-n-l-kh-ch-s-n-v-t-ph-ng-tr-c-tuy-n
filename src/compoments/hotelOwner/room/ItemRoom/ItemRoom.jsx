import React, {useEffect, useState} from 'react'
import { Button, Checkbox, CircularProgress, Divider, FormControlLabel, Paper, Radio, RadioGroup, Rating, Stack, TextareaAutosize } from '@mui/material'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import newRequest from '../../../../ults/newRequest';
import FormGroup from '@mui/material/FormGroup';
import Alert from '@mui/material/Alert';
const ItemRoom = ({idItem, setIdItem}) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false)
    const [open, setOpen] = useState(true);

    const handleClose = () => {
        setOpen(false);
    };
    const handleClickItem = (e) =>{
        if(e.target.checked){
            setIdItem([...idItem, parseInt(e.target.value)]);
        }else{
            setIdItem(idItem.filter(item => item !== parseInt(e.target.value)))
        }
    }
    const getData = () => {
        setIsLoading(true)
        newRequest.get('/categoryItem/list/items').then((res)=>{
            setData(res.data);
            setIsLoading(false);
            setError(false)
            console.log(res.data)
        }).catch((error)=>{
            setIsLoading(false);
            setError(error.response.data)
        })
    }
    useEffect(()=>{
        getData()
    },[])
  return (
    <div className="containerItemRoom">
    <h2 style={{width : '400px'}}>Khách có thể sử dụng gì trong phòng này ?</h2>
    <div style={{display : 'flex', gap : '20px'}}>
        <Paper sx={{width : '330px', display: 'flex', flexDirection : 'column', alignItems : 'center', padding : '20px 30px', justifyContent : 'flex-start'}}>
            <Stack spacing={2} width={'100%'}>
                {
                    !isLoading && data && data.map((item, i)=>(
                        <Stack direction={'column'} width={'100%'} spacing={2} key = {i}>
                            <span style={{fontWeight : '700'}}>{item.name}</span>
                            <FormGroup>
                                {
                                    item.Items.map((product,j)=>(
                                        <FormControlLabel key={j} control={<Checkbox value={product.id} size='small' defaultChecked = {idItem.indexOf(parseInt(product.id)) !== - 1 ? true : false} onChange={(e)=>{handleClickItem(e)}}/>} label={<span style={{fontSize : '14px', color : 'gray'}}>{product.name}</span>} />
                                    ))
                                }
                                {
                                    isLoading && <CircularProgress size={'20px'}/>
                                }
                            </FormGroup>
                            <Divider/>
                        </Stack>
                    ))
                }
                {
                    isLoading && <CircularProgress size={'20px'}/>
                }
            </Stack>
        </Paper>
        {open && (
            <Alert severity="warning" onClose={handleClose} sx={{width : '300px', height : '150px'}}>
                <b>Quý vị vẫn đang cân nhắc ?</b>
                <ul style={{color: 'gray', paddingLeft :'15px', display : 'flex', flexDirection : 'column', gap :'20px', marginTop : '10px'}}>
                    <li>
                    Đừng lo, Quý vị có thể cập nhật các vật dụng phòng tắm tại chỗ nghỉ sau.
                    </li>
                </ul>
            </Alert>
        )}
    </div>
    </div>
  )
}

export default ItemRoom
