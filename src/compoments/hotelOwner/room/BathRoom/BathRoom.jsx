import React, {useEffect, useState} from 'react'
import { Button, Checkbox, CircularProgress, Divider, FormControlLabel, Paper, Radio, RadioGroup, Rating, Stack, TextareaAutosize } from '@mui/material'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import newRequest from '../../../../ults/newRequest';
import FormGroup from '@mui/material/FormGroup';
const BathRoom = ({idItem, setIdItem}) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false)
    const [isPrivate, setIsPrivate] = useState(false)
    const handleClickItem = (e) =>{
        if(e.target.checked){
            setIdItem([...idItem, parseInt(e.target.value)]);
        }else{
            setIdItem(idItem.filter(item => item !== parseInt(e.target.value)))
        }
    }
    const getData = () => {
        setIsLoading(true)
        newRequest.get('/categoryItem/item/1').then((res)=>{
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
    <div className="containerBathRoom">
    <h2 style={{width : '400px'}}>Thông tin phòng tắm</h2>
    <div style={{display : 'flex', gap : '20px'}}>
        <Paper sx={{width : '330px', display: 'flex', flexDirection : 'column', alignItems : 'center', padding : '20px 30px', justifyContent : 'flex-start'}}>
            <Stack spacing={4} width={'100%'}>
            <Stack direction={'column'} width={'100%'} spacing={2}>
                    <span style={{fontWeight : '600'}}>Đây có phải là phòng tắm riêng không ?</span>
                    <FormControl>
                        <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={isPrivate}
                            onChange={(e)=>{setIsPrivate(e.target.value)}}
                        >
                            <FormControlLabel value={true} control={<Radio size="small"/>} label={'Đúng'} />
                            <FormControlLabel value={false} control={<Radio size="small"/>} label={'Không phải, đây là phòng tắm chung'} />
                        </RadioGroup>
                    </FormControl>
                </Stack>
                <Divider/>
                <Stack direction={'column'} width={'100%'} spacing={2}>
                    <span style={{fontWeight : '600'}}>Phòng tắm này có vật dụng gì ?</span>
                    <FormGroup>
                        {
                            !isLoading && data && data.map((item,i)=>(
                                <FormControlLabel key={i} control={<Checkbox value={item.id} defaultChecked = {idItem.indexOf(parseInt(item.id)) !== - 1 ? true : false} onChange={(e)=>{handleClickItem(e)}}/>} label={item.name} />
                            ))
                        }
                        {
                            isLoading && <CircularProgress size={'20px'}/>
                        }
                    </FormGroup>
                </Stack>

            </Stack>
        </Paper>
    </div>
    </div>
  )
}

export default BathRoom
