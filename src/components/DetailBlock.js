import React from "react";

const UIDetailBlock = (props) => {
  const { data, type } = props;
  const getSuffix = (type) => {
    if (type === "uptime") return "%";
    else if (type === "utilization") return "mbps";
    else if (type === "latency") return "ms";
    else return "";
  };
  const suffix = getSuffix(type);

  const boxCss = (time) => {
    const value = data[time][type];
    const redCss = "detail-box red";
    const greenCss = "detail-box green";
    const orangeCss = "detail-box orange";
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
    <div className="detail-block">
      <div className="detail-block-title">{data.district}</div>
      <div className="detail-box-container">
        <div className={boxCss("month")}>
          <div className="detail-box-title">Monthly({suffix})</div>
          <div className="detail-box-desc">{data.month[type]}</div>
        </div>
        <div className={boxCss("week")}>
          <div className="detail-box-title">Weekly({suffix})</div>
          <div className="detail-box-desc">{data.week[type]}</div>
        </div>
        <div className={boxCss("day")}>
          <div className="detail-box-title">Daily({suffix})</div>
          <div className="detail-box-desc">{data.day[type]}</div>
        </div>
      </div>
    </div>
  );
};

export default UIDetailBlock;
