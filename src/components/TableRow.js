import React from "react";

const UITableRow = (props) => {
  const { data, time } = props;

  const boxCss = (type) => {
    const value = data[time][type];
    const redCss = "table-box red";
    const greenCss = "table-box green";
    const orangeCss = "table-box orange";
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
    } else {
      const dt = data[time];
      const statusTotal =
        parseInt(dt.success, 10) +
        parseInt(dt.association, 10) +
        parseInt(dt.dns, 10) +
        parseInt(dt.authentication, 10) +
        parseInt(dt.dhcp, 10);
      const percent = dt[type] / statusTotal;
      if (type === "success") {
        if (percent > 0.975) return greenCss;
        else if (percent > 0.85) return orangeCss;
        else return redCss;
      } else {
        if (percent < 0.005) return greenCss;
        else if (percent < 0.01) return orangeCss;
        else return redCss;
      }
    }
  };
  return (
    <div className="table-row">
      <div className="table-row-title">{data.name}</div>
      <div className="table-box-container">
        <div className={boxCss("uptime")}>
          <div className="table-box-desc">{data[time].uptime}</div>
        </div>
        <div className={boxCss("latency")}>
          <div className="table-box-desc">{data[time].latency}</div>
        </div>
        <div className={boxCss("utilization")}>
          <div className="table-box-desc">{data[time].utilization}</div>
        </div>
        <div className={boxCss("success")}>
          <div className="table-box-desc">{data[time].success}</div>
        </div>
        <div className={boxCss("association")}>
          <div className="table-box-desc">{data[time].association}</div>
        </div>
        <div className={boxCss("authentication")}>
          <div className="table-box-desc">{data[time].authentication}</div>
        </div>
        <div className={boxCss("dhcp")}>
          <div className="table-box-desc">{data[time].dhcp}</div>
        </div>
        <div className={boxCss("dns")}>
          <div className="table-box-desc">{data[time].dns}</div>
        </div>
      </div>
    </div>
  );
};

export default UITableRow;
