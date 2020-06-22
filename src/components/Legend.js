import React from "react";
import { legends } from "../legends";

const UILegend = (props) => {
  const { type = "uptime" } = props;
  const content = legends[type];
  return (
    <div className="legend">
      <div className="title">Legend</div>
      <div className="content">
        {content.data.map((i) => (
          <div className="legend-row" key={i.name}>
            <div className="block" style={{ backgroundColor: i.color }}></div>
            <div className="text">{i.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UILegend;
