import React from "react";

const UIDetailBlock = (props) => {
  const { data, time } = props;

  const boxCss = (type) => {
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
    } else {
      const dt = data[time];
      const statusTotal =
        dt.success +
        dt.association +
        dt.dns +
        dt.authentication +
        dt.dns +
        dt.dhcp;
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
    <div className="detail-block">
      <div className="detail-block-title">{data.district}</div>
      <div className="detail-box-container">
        <div className="detail-border">
          <div className="detail-border-title">Availability</div>
          <div className="detail-border-container">
            <div className={boxCss("uptime")}>
              <div className="detail-box-desc">{data[time].uptime}</div>
              <div className="detail-box-title">Uptime(%)</div>
            </div>
          </div>
        </div>
        <div className="detail-border">
          <div className="detail-border-title">Performance</div>
          <div className="detail-border-container">
            <div className={boxCss("latency")}>
              <div className="detail-box-desc">{data[time].latency}</div>
              <div className="detail-box-title">Latency(ms)</div>
            </div>
            <div className={boxCss("utilization")}>
              <div className="detail-box-desc">{data[time].utilization}</div>
              <div className="detail-box-title">Usage(mbps)</div>
            </div>
            <div className={boxCss("success")}>
              <div className="detail-box-desc">{data[time].success}</div>
              <div className="detail-box-title">Success</div>
            </div>
          </div>
        </div>
        <div className="detail-border">
          <div className="detail-border-title">Issues</div>
          <div className="detail-border-container">
            <div className={boxCss("association")}>
              <div className="detail-box-desc">{data[time].association}</div>
              <div className="detail-box-title">Association</div>
            </div>
            <div className={boxCss("authentication")}>
              <div className="detail-box-desc">{data[time].authentication}</div>
              <div className="detail-box-title">Authentication</div>
            </div>
            <div className={boxCss("dhcp")}>
              <div className="detail-box-desc">{data[time].dhcp}</div>
              <div className="detail-box-title">DHCP</div>
            </div>
            <div className={boxCss("dns")}>
              <div className="detail-box-desc">{data[time].dns}</div>
              <div className="detail-box-title">DNS</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UIDetailBlock;
