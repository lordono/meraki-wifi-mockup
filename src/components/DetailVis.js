import React, { useState, useEffect } from "react";
import UIDetailBlock from "./DetailBlock";
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

const UIDetailVis = (props) => {
  const { data } = props;
  const [modalData, setModalData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [time, setTime] = useState("day");
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

  const onBlockClick = (district) => {
    setModalData(data.filter((i) => i.district === district));
    setShowModal(true);
  };
  return (
    <div className="app-detailvis-content">
      {Object.values(aggData).map((i) => (
        <UIDetailBlock
          key={i.district}
          time={time}
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

export default UIDetailVis;
