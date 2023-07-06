import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { pin } from "../../assets/images";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import { memo } from "react";

const markerIcon = new L.Icon({
    iconUrl: pin,
    iconSize: [70, 70],
});

const MapLeaflet = ({ address }) => {
    const [coordss, setcoordss] = useState(null);

    useEffect(() => {
        //obligate if not render error center
        setcoordss(null);
        const provider = new OpenStreetMapProvider();
        const rs = async () => {
            const code = await provider.search({
                query: address,
            });
            if (code.length > 0) {
                setcoordss({
                    lat: code[0].y,
                    long: code[0].x,
                    label: code[0].label,
                });
            } else {
                // have address haven't code
                navigator.geolocation.getCurrentPosition(
                    ({ coords: { latitude, longitude } }) => {
                        setcoordss({
                            lat: latitude,
                            long: longitude,
                            label: "Vị trí của bạn",
                        });
                    }
                );
            }
        };

        if (address) {
            // have address
            rs();
        } else {
            navigator.geolocation.getCurrentPosition(
                ({ coords: { latitude, longitude } }) => {
                    setcoordss({
                        lat: latitude,
                        long: longitude,
                        label: "Vị trí của bạn",
                    });
                }
            );
        }
    }, [address]);

    return (
        <div>
            {coordss && (
                <MapContainer
                    center={[coordss?.lat, coordss?.long]}
                    zoom={13}
                    scrollWheelZoom={true}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://tile.osm.ch/switzerland/{z}/{x}/{y}.png"
                    />
                    <Marker
                        position={[coordss?.lat, coordss?.long]}
                        icon={markerIcon}
                    >
                        <Popup>{coordss?.label}</Popup>
                    </Marker>
                </MapContainer>
            )}
        </div>
    );
};

export default memo(MapLeaflet);
