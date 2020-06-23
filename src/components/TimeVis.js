import React, { useState, useEffect } from "react";
import UITimeBlock from "./TimeBlock";
import UILegend from "./Legend";
import UITable from "./Table";

const accTimeData = (fromDict, toDict) => {
  const num = toDict.numPoints;
  const timeArr = ["day", "week", "month"];
  const attrArr = [
    "uptime",
    "latency",
    "utilization",
    "success",
    "association",
    "authentication",
    "dhcp",
    "dns",
  ];
  for (let time of timeArr) {
    for (let attr of attrArr) {
      const value = parseFloat(fromDict[time][attr]);
      if (attr in Object.keys(toDict[time])) {
        toDict[time][attr] = (toDict[time][attr] * num + value) / (num + 1);
      } else toDict[time][attr] = value;
      if (attr !== "uptime") toDict[time][attr] = Math.ceil(toDict[time][attr]);
    }
  }
  return toDict;
};

const UITimeVis = (props) => {
  const { data } = props;
  const [type, setType] = useState("uptime");
  const [time, setTime] = useState("day");
  const [modalData, setModalData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [aggData, setAggData] = useState({});
  useEffect(() => {
    if (data.length > 0) {
      const testData = data.reduce((acc, cur) => {
        if (!(cur.district in acc)) {
          acc[cur.district] = {
            district: cur.district,
            numPoints: 0,
            week: {},
            day: {},
            month: {},
          };
        }
        acc[cur.district] = { ...accTimeData(cur, acc[cur.district]) };
        acc[cur.district].numPoints += 1;
        return acc;
      }, {});
      setAggData(testData);
    }
  }, [data]);
  const onBlockClick = (district, time) => {
    setTime(time);
    setModalData(data.filter((i) => i.district === district));
    setShowModal(true);
  };

  return (
    <div className="app-timevis-content">
      {Object.values(aggData).map((i) => (
        <UITimeBlock
          key={i.district}
          type={type}
          data={i}
          onClick={onBlockClick}
        />
      ))}
      {/* overlay */}
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
          </div>
        </div>
        <UILegend type={type} />
      </div>
      <div className={showModal ? "modal-bg" : "modal-bg hide"}>
        <div className="modal">
          <div className="modal-header">
            <div className="modal-title">
              Details in {modalData.length > 0 ? modalData[0].district : ""}
            </div>
            <div className="modal-close" onClick={() => setShowModal(false)}>
              <ion-icon name="close-circle-sharp"></ion-icon>
            </div>
          </div>
          <UITable data={modalData} time={time} />
        </div>
      </div>
    </div>
  );
};

export default UITimeVis;
