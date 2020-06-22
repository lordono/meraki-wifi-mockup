import { colors } from "./colors";

const { low, mid, high } = colors;

export const legends = {
  uptime: {
    name: "Availability",
    data: [
      { color: low, name: "95%-100%" },
      { color: mid, name: "85%-95%" },
      { color: high, name: "<85%" },
    ],
  },
  latency: {
    name: "Latency",
    data: [
      { color: low, name: "< 70ms" },
      { color: mid, name: "70ms-200ms" },
      { color: high, name: "> 200ms" },
    ],
  },
  utilization: {
    name: "Utilization",
    data: [
      { color: low, name: "<20mbps" },
      { color: mid, name: "20-60mbps" },
      { color: high, name: ">60mbps" },
    ],
  },
};
