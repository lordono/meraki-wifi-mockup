import React, { useState, useEffect } from "react";
import UITableRow from "./TableRow";

const countSuccessPercent = (dt) => {
  const statusTotal =
    parseInt(dt.success, 10) +
    parseInt(dt.association, 10) +
    parseInt(dt.dns, 10) +
    parseInt(dt.authentication, 10) +
    parseInt(dt.dhcp, 10);
  return parseInt(dt.success) / statusTotal;
};

const cmpAttr = (a, b, time, attr) => {
  return parseFloat(a[time][attr]) - parseFloat(b[time][attr]);
};

const UITable = (props) => {
  const { data, time } = props;
  const [tableData, setTableData] = useState([]);
  const [sort, setSort] = useState("");
  useEffect(() => {
    const newData = JSON.parse(JSON.stringify(data));
    if (!sort) {
      setTableData(newData);
    } else if (sort === "uptime-desc") {
      newData.sort((a, b) => cmpAttr(b, a, time, "uptime"));
      setTableData(newData);
    } else if (sort === "uptime-asc") {
      newData.sort((a, b) => cmpAttr(a, b, time, "uptime"));
      setTableData(newData);
    } else if (sort === "latency-desc") {
      newData.sort((a, b) => cmpAttr(b, a, time, "latency"));
      setTableData(newData);
    } else if (sort === "latency-asc") {
      newData.sort((a, b) => cmpAttr(a, b, time, "latency"));
      setTableData(newData);
    } else if (sort === "utilization-desc") {
      newData.sort((a, b) => cmpAttr(b, a, time, "utilization"));
      setTableData(newData);
    } else if (sort === "utilization-asc") {
      newData.sort((a, b) => cmpAttr(a, b, time, "utilization"));
      setTableData(newData);
    } else if (sort === "success-desc") {
      newData.sort(
        (a, b) => countSuccessPercent(b[time]) - countSuccessPercent(a[time])
      );
      setTableData(newData);
    } else if (sort === "success-asc") {
      newData.sort(
        (a, b) => countSuccessPercent(a[time]) - countSuccessPercent(b[time])
      );
      setTableData(newData);
    }
  }, [sort, data, time]);
  return (
    <div className="app-table-content">
      <div className="table-sort-bar">
        <div className="table-sort-label">Sort by:</div>
        <select
          name="sort"
          id="sort-select"
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">--Select one of the following--</option>
          <option value="uptime-desc">Uptime: High to Low</option>
          <option value="uptime-asc">Uptime: Low to High</option>
          <option value="latency-desc">Latency: High to Low</option>
          <option value="latency-asc">Latency: Low to High</option>
          <option value="utilization-desc">Utilization: High to Low</option>
          <option value="utilization-asc">Utilization: Low to High</option>
          <option value="success-desc">
            % Connection Success: High to Low
          </option>
          <option value="success-asc">% Connection Success: Low to High</option>
        </select>
      </div>
      <div className="table-header">
        <div className="table-header-col">AP Name</div>
        <div className="table-header-col">Uptime(%)</div>
        <div className="table-header-col">Latency(ms)</div>
        <div className="table-header-col">Usage(mbps)</div>
        <div className="table-header-col">Success</div>
        <div className="table-header-col">Association</div>
        <div className="table-header-col">Authentication</div>
        <div className="table-header-col">DHCP</div>
        <div className="table-header-col">DNS</div>
      </div>
      <div className="tables-container">
        {tableData.map((i) => (
          <UITableRow key={i.name} time={time} data={i} />
        ))}
      </div>
    </div>
  );
};

export default UITable;
