import { getCanvasPattern, Pie } from "@ant-design/plots";
import "./Engagements.scss";

export const EngagementsGraph = ({ shiftData=[] }: any) => {
  
  const shifts = shiftData?.map((data: any) => ({ type: data?.clientName??'', value: data?.percentOfTotal }));  

  const pattern = (datum: any, color: any) =>
    getCanvasPattern({
      type: datum.type === "分类一" ? "dot" : "line",
      cfg: {
        backgroundColor: datum.type === "分类一" ? "#d78ab7" : color,
      },
    });
  const config: any = {
    appendPadding: 10,
    data: shifts,
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
    angleField: "value",
    colorField: "type",
    radius: 0.7,
    innerRadius: 0.7,
    label: {
      type: "inner",
      offset: "-50%",
      content: ({ percent }: any) => `${(percent * 100).toFixed(0)}`,
      style: {
        fill: "#fff",
        fontSize: 14,
        textAlign: "center",
      },
    },
    autoFit: true,
    color: ["#65CDF0", "#F7B923", "#FF4D4F"],
    statistic: null,
  };
  return <Pie {...config} style={{ height: "300px" }} />;
};
