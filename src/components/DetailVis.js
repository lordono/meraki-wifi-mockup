import React, { useState, useEffect } from "react";
import UIDetailBlock from "./DetailBlock";
import UILegend from "./Legend";

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
  return (
    <div className="app-detailvis-content">
      {Object.values(aggData).map((i) => (
        <UIDetailBlock key={i.district} time={time} data={i} />
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
    </div>
  );
};

export default UIDetailVis;
