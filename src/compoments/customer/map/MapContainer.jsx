import * as React from "react";
import { useState, useEffect } from "react";
import { MFMap, MFMarker, MFPolygon, MFPolyline } from "react-map4d-map";
import { Backdrop, CircularProgress, TextField, Button } from "@mui/material";
import axios from "axios";
import Snackbar from '@mui/material/Snackbar';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DraftsIcon from '@mui/icons-material/Drafts';
import SearchIcon from '@mui/icons-material/Search';
const MapContainer = ({data}) => {
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const handleListItemClick = (event, index, item) => {
      setSelectedIndex(index);
      setAddressStart({
        location :  item.location,
        address : item.name
      })
      setListSearch([])
      setOpen(false)
      console.log(item)
    };
    const [index, setIndex] = useState(null)
    const [isLoading, setIsLoading] = useState(true);
    const [userLocation, setUserLocation] = useState(null);
    const [addressStart, setAddressStart] = useState({
        location : '',
        address : ''
    });
    const [open, setOpen] = useState(false)
    const [error, setError] = useState(false)
    const [listSearch, setListSearch] = useState([])
    const [selectedDestination, setSelectedDestination] = useState({
        location : '',
        address : ''
    });
    const [state, setState] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'right',
    });
    const { vertical, horizontal, openSnack } = state;
    const handleCloseSnack = () => {
    setState({ ...state, openSnack: false });
    };
    const [paths, setPaths] = useState([]);

    const handleMarkerClick = (index) => {
        setSelectedDestination(data[index]);
    };
    const handleSearch = async () => {
        try {
            setIsLoading(true)
            const response = await axios.get(`http://api.map4d.vn/sdk/route?key=f66a688eeb905a318d0b2f4303d63da1&origin=${addressStart.location.lat + ',' + addressStart.location.lng}&destination=${selectedDestination.location[1] + ',' + selectedDestination.location[0]}&mode=car&language=vi&weighting=0`)
            if(response.data.code === "ok"){
                const arrLocation = [[addressStart.location.lng, addressStart.location.lat]];
                const data = response.data.result.routes[0].legs[0].steps;
                console.log(response.data.result.routes)
                data.map((item)=>{
                    arrLocation.push([item.endLocation.lng, item.endLocation.lat])
                })
                setPaths(arrLocation)
            }
            setIsLoading(false)
            } catch (error) {
            setIsLoading(false)
            setError(error.message);
            setState({
                openSnack: true,
                vertical: 'top',
                horizontal: 'right',
            });
        }
    };
    const getListSearch = async() =>{
        try {
            const response = await axios.get(`http://api.map4d.vn/sdk/place/text-search?key=f66a688eeb905a318d0b2f4303d63da1&text=${addressStart.address}`);
            setListSearch(response.data.result)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        getListSearch()
    },[addressStart])

    return (
        <div style={{ width: "100%", height: "78vh" }}>
            <Snackbar 
                anchorOrigin={{ vertical, horizontal }}
                open={openSnack}
                onClose={handleCloseSnack}
                message={error}
                key={vertical + horizontal}
            />
            <Backdrop
                sx={{ color: '#fff', zIndex: 999999999}}
                open={isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <MFMap
                options={{
                    center: {lat : 16.0525581, lng: 108.1795185},
                    zoom: 14,
                    controls: true,
                    geolocate: true,
                }}
                accessKey="f66a688eeb905a318d0b2f4303d63da1"
                version={"2.4"}
                onTilesLoaded={() => { setIsLoading(false) }}
            >
                {data && data.length > 0 && data.map((post, i) => (
                    <MFMarker 
                        position={post.location} 
                        key={i}
                        onClick={() => handleMarkerClick(i)}
                        label={post.address}
                        onHover={()=>{setIndex(i)}}
                    >
                    </MFMarker>
                ))}
                 <MFPolyline strokeColor={"#ff0000"} strokeWidth={10} path={paths} />
            </MFMap>
            <div style={{ position: 'absolute', top: '20px', left: '22px', zIndex: 9999, display : 'flex', gap : '10px' }}>
                <TextField
                    placeholder="Vị trí của bạn"
                    variant="outlined"
                    onChange={(e)=>{setAddressStart({
                        location : '',
                        address : e.target.value
                    }); setOpen(true)}}
                    sx={{zIndex : 999,width : '240px', bgcolor : 'white', outline : 'none'}}
                    value={addressStart.address}
                    size="small"
                />

                <List component="nav" aria-label="main mailbox folders" sx={{position : 'absolute', zIndex : 999, backgroundColor : 'white', left : '0px', top : '40px'}}>
                    {open && listSearch && listSearch.length > 0 &&  listSearch.map((item, i)=>{
                        if(i < 6) return (
                            <ListItemButton component="a" href="#simple-list"
                                onClick={(event) => handleListItemClick(event, 1, item)}
                                sx={{bgcolor : 'white', width : '400px'}}
                                key={i}
                            >
                                <ListItemIcon>
                                    <LocationOnIcon />
                                </ListItemIcon>
                                <div style = {{display : 'flex', flexDirection : 'column', gap : '5px'}}>
                                <ListItemText primary={item.name} />
                                <span className="titleH2" style={{fontSize : '12px'}}>{item.address}</span>
                                </div>
                            </ListItemButton>
                        )
                    })}
                </List>
                <TextField
                    variant="outlined"
                    value={selectedDestination.address}
                    disabled
                    sx={{zIndex : 999, width : '240px', bgcolor : 'white', outline : 'none'}}
                    size="small"
                    placeholder="Tìm kiếm trên bản đồ"
                />
                <Button variant="outlined" sx={{bgcolor : 'white'}} onClick={handleSearch}><SearchIcon /></Button>
            </div>
        </div>
    );
};

export default MapContainer;
