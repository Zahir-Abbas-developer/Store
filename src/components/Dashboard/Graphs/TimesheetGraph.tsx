import { getCanvasPattern, Pie } from "@ant-design/plots";
import "../../Dashboard/ShiftsInvoiceSheet/ShiftsCard/ShiftsCard.scss";
export const TimeSheetGraph = ({ timesheetGraphStats }: any) => {
  const data = [
    {
      type: 'Total Time Sheet',
      value: timesheetGraphStats?.total,
    },
    {
      type: 'Signed Off',
      value: timesheetGraphStats?.signedoff,
    },
    {
      type: 'Pending Sign Off',
      value: timesheetGraphStats?.pendingSignedoff,
    },
    {
      type: 'Pending Submission',
      value: timesheetGraphStats?.pendingSubmission,
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
  return <>{timesheetGraphStats && <Pie {...config} style={{ height: "300px" }} />}</>;
};
