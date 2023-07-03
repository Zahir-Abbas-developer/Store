import { Line } from "@ant-design/plots";
import { useGetTaskSummaryRequestQuery } from "../../../store/Slices/ItHelpDesk";

const TaskSummaryGraph = () => {
  const { data, isSuccess } = useGetTaskSummaryRequestQuery({ refetchOnMountOrArgChange: true });
  let taskSummaryData: any;
  if (isSuccess) {
    taskSummaryData = data;
  }

  const config = {
    data: taskSummaryData?.data ?? [],
    xField: "month",
    yField: "count",
    seriesField: "status",
    xAxis: {
      type: "time",
    },
    smooth: true,
    yAxis: {
      label: {
        formatter: (v: any) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
      },
    },
  };
  return <Line style={{ height: "250px" }} {...config} />;
};
export default TaskSummaryGraph;
