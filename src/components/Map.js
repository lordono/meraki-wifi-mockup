import React, { useState } from "react";
import "leaflet/dist/leaflet.css";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import UILegend from "./Legend";
import RedMarker from "../img/red-marker.png";
import OrangeMarker from "../img/orange-marker.png";
import GreenMarker from "../img/green-marker.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const mapCenter = {
  lat: 1.34127,
  lng: 103.825969,
};

const LeafIcon = L.Icon.extend({
  options: {
    iconSize: [38, 38],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
  },
});

const redIcon = new LeafIcon({ iconUrl: RedMarker });
const orangeIcon = new LeafIcon({ iconUrl: OrangeMarker });
const greenIcon = new LeafIcon({ iconUrl: GreenMarker });

const chooseMarker = (pointer, time, type) => {
  const value = parseFloat(pointer[time][type]);
  if (type === "uptime") {
    if (value >= 95.0) return greenIcon;
    else if (value >= 85 && value < 95.0) return orangeIcon;
    else return redIcon;
  } else if (type === "latency") {
    if (value > 200) return redIcon;
    else if (value <= 200 && value >= 70) return orangeIcon;
    else return greenIcon;
  } else if (type === "utilization") {
    if (value > 60) return redIcon;
    else if (value > 20 && value <= 60) return orangeIcon;
    else return greenIcon;
  }
  return greenIcon;
};

const UIMap = (props) => {
  const [type, setType] = useState("uptime");
  const [time, setTime] = useState("day");
  const { zoom, data } = props;
  const position = [mapCenter.lat, mapCenter.lng];

  return (
    <div className="app-map-content">
      <Map center={position} zoom={zoom} className="app-map-chart">
        <TileLayer
          attribution='&amp;copy <a href="https://www.stadiamaps.com/">© Stadia Maps</a> <a href="https://openmaptiles.org/">© OpenMapTiles</a> <a href="http://osm.org/copyright">© OpenStreetMap</a> contributors.'
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
        />
        {data.map((pt) => (
          <Marker
            position={[pt.lat, pt.lng]}
            key={pt.name}
            icon={chooseMarker(pt, time, type)}
          >
            <Popup>
              {pt.name} - {pt[time][type]}
              {type === "uptime"
                ? "%"
                : type === "utilization"
                ? " mbps"
                : " ping"}
            </Popup>
          </Marker>
        ))}
      </Map>
      <div className="overlay">
        <div className="overlay-options">
          <div className="title">Options</div>
          <div className="options-content">
            <div className="options-input-block">
              <div className="label">Type:</div>
              <select
                name="type"
                id="type-select"
                onChange={(e) => setType(e.target.value)}
              >
                <option value="uptime">Availability</option>
                <option value="latency">Latency</option>
                <option value="utilization">Utilization</option>
              </select>
            </div>
            <div className="options-input-block">
              <div className="label">Time:</div>
              <select
                name="time"
                id="time-select"
                onChange={(e) => setTime(e.target.value)}
              >
                <option value="day">Daily</option>
                <option value="week">Weekly</option>
                <option value="month">Monthly</option>
              </select>
            </div>
          </div>
        </div>
        <UILegend type={type} />
      </div>
    </div>
  );
};

export default UIMap;
