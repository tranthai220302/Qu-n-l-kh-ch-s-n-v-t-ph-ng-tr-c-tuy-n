import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useJsApiLoader } from '@react-google-maps/api';
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
        <LoadScript googleMapsApiKey="AIzaSyBmBRnE3W0ELQgwsIfLKKEEI2YRcOv3xnA">
            <GoogleMap  
                mapContainerStyle={mapStyles}
                zoom={13}
                center={defaultCenter}
            >
                <Marker position={defaultCenter} />
            </GoogleMap>
        </LoadScript>
    );
};

export default MapContainer;
