import React, { useState, useEffect, useRef } from "react";
import Map from "ol/Map";
import View from "ol/View";
import { Tile as TileLayer } from "ol/layer";
import { OSM } from "ol/source";
import { fromLonLat } from "ol/proj";
import { Feature } from "ol";
import { Point } from "ol/geom";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { Icon, Style } from "ol/style";
import { Input } from "@/components/ui/input";

const LocationSelection = ({
    selectedLocationObject,
    setSelectedLocationObject,
    hideMap = false,
}: {
    selectedLocationObject: any;
    setSelectedLocationObject: any;
    hideMap?: boolean;
}) => {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const mapRef: any = useRef(null);
    const vectorLayerRef: any = useRef(null);

    useEffect(() => {
        if (!mapRef.current) {
            mapRef.current = new Map({
                target: "map",
                layers: [
                    new TileLayer({
                        source: new OSM(),
                    }),
                ],
                view: new View({
                    center: fromLonLat([78.4867, 17.385]), // Default to Hyderabad
                    zoom: 12,
                }),
            });
        }
    }, []);

    useEffect(() => {
        if (query.length > 2) {
            fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}`)
                .then((res) => res.json())
                .then((data) => {
                    setSuggestions(data);
                });
        } else {
            setSuggestions([]);
        }
    }, [query]);

    // handle action when user select the location dropdown
    const handleSelectLocation = (
        location: any,
        ignoreLocationUpdate = false
    ) => {
        if (!ignoreLocationUpdate) {
            setSelectedLocationObject(location);
        }
        setQuery(location.display_name);
        setSuggestions([]);

        const lon = parseFloat(location.lon);
        const lat = parseFloat(location.lat);
        const coords = fromLonLat([lon, lat]);

        const view = mapRef.current.getView();
        view.animate({ center: coords, zoom: 14 });

        // Remove old marker if exists
        if (vectorLayerRef.current) {
            mapRef.current.removeLayer(vectorLayerRef.current);
        }

        // Add a marker
        const marker = new Feature({
            geometry: new Point(coords),
        });

        marker.setStyle(
            new Style({
                image: new Icon({
                    anchor: [0.5, 1],
                    src: "https://openlayers.org/en/latest/examples/data/icon.png",
                }),
            })
        );

        const vectorSource: any = new VectorSource({
            features: [marker],
        });

        vectorLayerRef.current = new VectorLayer({
            source: vectorSource,
        });

        mapRef.current.addLayer(vectorLayerRef.current);
    };

    // show data on edit form
    useEffect(() => {
        if (selectedLocationObject && selectedLocationObject.display_name) {
            handleSelectLocation(selectedLocationObject, true);
        }
    }, [selectedLocationObject]);

    return (
        <div>
            <Input
                type="text"
                placeholder={"Search for a location"}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <div
                style={{
                    position: "absolute",
                    background: "#fff",
                    width: "300px",
                    boxShadow: "0px 2px 5px rgba(0,0,0,0.2)",
                    zIndex: 1000,
                }}
            >
                {suggestions.map((place: any) => (
                    <div
                        key={place.place_id}
                        onClick={() => handleSelectLocation(place)}
                        style={{
                            padding: "8px",
                            cursor: "pointer",
                            borderBottom: "1px solid #ddd",
                        }}
                    >
                        {place.display_name}
                    </div>
                ))}
            </div>

            {!hideMap && (
                <div
                    id="map"
                    style={{
                        width: "100%",
                        height: "400px",
                        marginTop: "10px",
                    }}
                ></div>
            )}
        </div>
    );
};

export default LocationSelection;