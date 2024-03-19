import * as React from "react";
import { useState } from "react";
import { MFMap, MFMarker, MFPolyline, MFlOCA } from "react-map4d-map";
import { Backdrop } from "@mui/material";
import {CircularProgress} from "@mui/material";
const MapAddress = ({lat, lng}) => {
    const [isLoading, setIsLoading] = useState(true);
    return (
        <div style={{ width: "100%", height: "400px" }}>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isLoading}
                >
                <CircularProgress color="inherit" />
            </Backdrop>
            <MFMap
                options={{
                    center: { lat: lat   , lng: lng},
                    zoom: 15,
                    controls: true,
                    geolocate : true
                }}
                accessKey="f66a688eeb905a318d0b2f4303d63da1"
                version={"2.4"}
                onTilesLoaded={()=>{setIsLoading(false)}}
                >
                <MFMarker position={{lat : lat, lng : lng}} label={"Khách sạn của bạn"}/>
            </MFMap>
        </div>
    );
};

export default MapAddress;
