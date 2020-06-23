import React, { useRef, useState, useEffect } from "react";
import "./App.scss";
import UIMap from "./components/Map";
import { mockData } from "./mockdata";
import UITimeVis from "./components/TimeVis";
import UIDetailVis from "./components/DetailVis";

const options = ["map", "calendar", "grid"];

const Option = (props) => {
  const { selected, icon, onClick } = props;
  return (
    <li className={selected ? "selected" : ""} onClick={onClick}>
      <ion-icon name={icon}></ion-icon>
    </li>
  );
};

function App() {
  const mapRef = useRef(null);
  const [zoom, setZoom] = useState(11);
  const [selected, setSelected] = useState(2);
  useEffect(() => {
    if (mapRef.current) {
      const width = mapRef.current.clientWidth;
      if (width > 1920) setZoom(13);
      else if (width >= 1024 && width <= 1920) setZoom(12);
      else if (width >= 768 && width < 1024) setZoom(11);
    }
  }, [mapRef]);
  return (
    <div className="App">
      <header className="App-header" ref={mapRef}>
        <nav className="nav-bar">
          <div className="title">Meraki Wifi for Starhub</div>
          <ul>
            {options.map((opt, num) => (
              <Option
                key={num}
                selected={num === selected}
                icon={opt}
                onClick={() => setSelected(num)}
              />
            ))}
          </ul>
        </nav>
        {selected === 0 && <UIMap zoom={zoom} data={mockData} />}
        {selected === 1 && <UITimeVis data={mockData} />}
        {selected === 2 && <UIDetailVis data={mockData} />}
      </header>
    </div>
  );
}

export default App;
