import React from "react";

const UITimeBlock = (props) => {
  const { data, type, onClick } = props;
  const getSuffix = (type) => {
    if (type === "uptime") return "%";
    else if (type === "utilization") return "mbps";
    else if (type === "latency") return "ms";
    else return "";
  };
  const suffix = getSuffix(type);

  const boxCss = (time) => {
    const value = data[time][type];
    const redCss = "time-box red";
    const greenCss = "time-box green";
    const orangeCss = "time-box orange";
    if (type === "uptime") {
      if (value >= 95.0) return greenCss;
      else if (value >= 85 && value < 95.0) return orangeCss;
      else return redCss;
    } else if (type === "latency") {
      if (value > 200) return redCss;
      else if (value <= 200 && value >= 70) return orangeCss;
      else return greenCss;
    } else if (type === "utilization") {
      if (value > 60) return redCss;
      else if (value > 20 && value <= 60) return orangeCss;
      else return greenCss;
    }
    return greenCss;
  };
  return (
    <div className="time-block">
      <div className="time-block-title">{data.district}</div>
      <div className="time-box-container">
        <div
          className={boxCss("month")}
          onClick={() => onClick(data.district, "month")}
        >
          <div className="time-box-title">Monthly({suffix})</div>
          <div className="time-box-desc">{data.month[type]}</div>
        </div>
        <div
          className={boxCss("week")}
          onClick={() => onClick(data.district, "week")}
        >
          <div className="time-box-title">Weekly({suffix})</div>
          <div className="time-box-desc">{data.week[type]}</div>
        </div>
        <div
          className={boxCss("day")}
          onClick={() => onClick(data.district, "day")}
        >
          <div className="time-box-title">Daily({suffix})</div>
          <div className="time-box-desc">{data.day[type]}</div>
        </div>
      </div>
    </div>
  );
};

export default UITimeBlock;
