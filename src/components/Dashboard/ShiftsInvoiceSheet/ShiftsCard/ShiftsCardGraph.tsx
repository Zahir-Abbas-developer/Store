import { getCanvasPattern, Pie } from "@ant-design/plots";
import "./ShiftsCard.scss";
export const ShiftsCardGragh = ({ shiftsGraphStats }: any) => {
  console.log(shiftsGraphStats, "shiftsGraphStats");


  const data = [
    {
      type: 'This Week',
      value: shiftsGraphStats?.shiftsthisWeek,
    },
    {
      type: 'Open Shifts',
      value: shiftsGraphStats?.open,
    },
    {
      type: 'Confirmed Shifts',
      value: shiftsGraphStats?.confirmed,
    },
    {
      type: 'Unpublished',
      value: shiftsGraphStats?.unpublished,
    },
  ];

  const pattern = (datum: any, color: any) =>
    getCanvasPattern({
      type: datum.type === '分类一' ? 'dot' : 'line',
      cfg: {
        backgroundColor: datum.type === '分类一' ? '#d78ab7' : color,
      },
    });
  const config: any = {
    data,
    appendPadding: 0.9,
    legend: {
      marker: (text: any, index: any, item: any) => {
        const color = item.style.fill;
        return {
          style: {
            fill: pattern(
              {
                type: text,
              },
              color
            ),
            r: 8,
          },
        };
      },
    },
    angleField: 'value',
    colorField: 'type',
    columnStyle: {
      stroke: '#63E1A5',
      lineWidth: 1,
    },

    border: 0.4,
    radius: 0.7,
    innerRadius: 0.6,
    outerRadius: 0.2,
    style: {
      borderRadius: '10px',
    },
    interactions: [
      {
        type: 'pie-legend-active',
      },
      {
        type: 'element-active',
      },
    ],
    // columnStyle: {
    //   radius: [4,4,0,0],
    // },
    state: {
      active: {
        style: {
          innerRadius: 0.1,
          fontSize: 7,
        },
      },
    },
    label: {
      type: "inner",
      offset: "-50%",
      content: ({ percent }: any) => `${(percent * 100).toFixed(0)}`,
      style: {
        fill: "#fff",
        fontSize: 14,
        textAlign: 'center',
        borderRadius: 20,
      },
    },
    autoFit: true,
    color: ["#63E1A5", "#EE2E7E", "#F7B923", "#65CDF0"],
    statistic: null,
  };
  return <>{shiftsGraphStats && <Pie {...config} style={{ height: "300px" }} />}</>;
};
