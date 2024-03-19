import * as React from "react";
import { MFMap } from "react-map4d-map";

const MapContainer = () => {
    return (
        <div style={{ width: "100%", height: "400px" }}>
            <MFMap
            options={{
                center: { lat: 16.072163491469226, lng: 108.22690536081757 },
                zoom: 15,
                controls: true,
            }}
            accessKey="f66a688eeb905a318d0b2f4303d63da1"
            version={"2.4"}
            />
        </div>
    );
};

export default MapContainer;
