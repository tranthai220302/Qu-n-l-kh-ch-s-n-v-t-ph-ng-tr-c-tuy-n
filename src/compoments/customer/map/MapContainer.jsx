import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
const MapContainer = ({ location }) => {
    const mapStyles = {
        height: "150px",
        width: "100%",
        borderRadius : "5px",
        marginBottom : '10px'
    };

    const defaultCenter = {
        lat: location.lat,
        lng: location.lng
    };

    return (
        <div><img src="https://toquoc.mediacdn.vn/280518851207290880/2022/10/31/tfisg1c-166720423465128148766.png" alt="" style={{height : '150px', width: '266px', marginBottom : '10px'}}/></div>
    );
};

export default MapContainer;
