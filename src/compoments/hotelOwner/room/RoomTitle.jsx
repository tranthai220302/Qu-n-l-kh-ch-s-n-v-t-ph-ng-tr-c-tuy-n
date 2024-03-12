import React, {useEffect, useState} from 'react'
import { Button, Divider, FormControlLabel, Paper, Radio, RadioGroup, Rating, Stack, TextareaAutosize } from '@mui/material'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import newRequest from '../../../ults/newRequest';
const RoomTitle = ({category, setCategory, isSmoke, setIsSmoke}) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false)
    const getData = () => {
        setIsLoading(true)
        newRequest.get('/category').then((res)=>{
            setData(res.data.data);
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
    <div className="containerRoomTitle">
    <h2 style={{width : '400px'}}>Chi tiết phòng</h2>
    <div style={{display : 'flex', gap : '20px'}}>
        <Paper sx={{width : '400px', display: 'flex', flexDirection : 'column', alignItems : 'center', padding : '20px 30px', justifyContent : 'flex-start'}}>
            <Stack spacing={4} width={'100%'}>
            <Stack direction={'column'} width={'100%'} spacing={2}>
                    <span style={{fontWeight : '600'}}>Đây là loại chỗ nghỉ gì ?</span>
                    <FormControl sx={{ m: 1, width : '100%' }} size="small">
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={category}
                            onChange={(e)=>{setCategory(e.target.value)}}
                        >
                            {data && data.length > 0 && data.map((item)=>(
                                <MenuItem key={item.id} value={item.name}>{item.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Stack>
                <Divider/>
                <Stack direction={'column'} width={'100%'} spacing={2}>
                    <span style={{fontWeight : '600'}}>Có được hút thuốc trong phòng này không ?</span>
                    <FormControl>
                        <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={isSmoke}
                            onChange={(e)=>{setIsSmoke(e.target.value)}}
                        >
                            <FormControlLabel value={true} control={<Radio size="small"/>} label={'Có'} />
                            <FormControlLabel value={false} control={<Radio size="small"/>} label={'Không'} />
                        </RadioGroup>
                    </FormControl>
                </Stack>
            </Stack>
        </Paper>
    </div>
    </div>
  )
}

export default RoomTitle