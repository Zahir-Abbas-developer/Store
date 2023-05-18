import { useState } from "react";
import { Column } from "@ant-design/plots";
import { Card, Select } from "antd";
import Selection from "../../assets/images/CordinatorDashboard/selection.png";
import { useGetCoordinatorCareHomeRequestsQuery } from "../../store/Slices/CoordinatorDashboard";
import LoadingSvg from "../../assets/Login/loader-icon.gif";


const ShiftRequestedGraph = () => {
  const [selectedFilterValue, setSelectedFilterValue] = useState<string | undefined>();


  const paramsObj: any = {};
  if (selectedFilterValue) paramsObj["type"] = selectedFilterValue;
  const query = "?" + new URLSearchParams(paramsObj).toString();

  const { data, isLoading, isSuccess, isError } = useGetCoordinatorCareHomeRequestsQuery({ refetchOnMountOrArgChange: true, query });


  let coordinatorCareHomeData: any;

  if (isLoading) {
    coordinatorCareHomeData = <p>Loading...</p>
  }

  else if (isSuccess) {
    coordinatorCareHomeData = data;
  }

  else if (isError) {
    coordinatorCareHomeData = <p>Error...</p>
  }


  const DemoColumn = () => {
    const data = coordinatorCareHomeData?.data?.shiftsRequested.map((item: any) => {
      return {
        type: item?.careHomeName,
        value: item?.total,
      }
    })
    const paletteSemanticRed = "#3CCC4A";
    const warningColor = "#FF9900";
    const redColor = "#FF5252";
    const brandColor = "#6B849B";

    const config: any = {
      data: data ?? [],
      xField: "type",
      yField: "value",
      seriesField: "",
      minColumnWidth: 26,
      maxColumnWidth: 26,

      color: ({ type }: any) => {
        if (type === "Tall Tree" || type === "Bury" || type === "Bishops") {
          return paletteSemanticRed;
        }
        if (type === "Mews" || type === "Careuk") {
          return warningColor;
        }
        if (type === "CareC" || type === "Grove") {
          return redColor;
        }

        return brandColor;
      },
      label: {
        content: (originData: any) => {
          const val = parseFloat(originData.value);

          if (val < 0.05) {
            return (val * 100).toFixed(1) + "%";
          }
        },
        offset: 15,
      },
      legend: false,
      xAxis: {
        label: {
          autoHide: false,
          autoRotate: false,
        },
      },
    };
    return (
      isLoading ? (
        <div className="text-center">
          <img src={LoadingSvg} height={200} width={200} alt="LoadingSvg" />
        </div>
      ) : (<Column height={220} {...config} />)
    );
  };

  return (
    <Card className="shiftRequested" style={{height:"100%"}}>
      <div className="d-flex shifts-hold">
        <h3 className="fs-20 m-0 line-height-28 fw-500 title-color">
          Shifts Requested by Care Home
        </h3>
        <Select
          defaultValue="This Month"
          style={{ alignItems: "center" }}
          bordered={false}
          suffixIcon={<img src={Selection} alt="selectImg" width={15} />}
          onChange={(value: string) =>
            value
              ? setSelectedFilterValue(value)
              : setSelectedFilterValue("")
          }
          value={selectedFilterValue}
          options={[
            // { value: dayjs().format('YYYY-MM'), label: "This Week" },
            // { value: dayjs().format('YYYY-MM'), label: "This Month" },
            // { value: dayjs().format('YYYY'), label: "This Year" },
            { value: "week", label: "This week" },
            { value: "month", label: "This month" },
            { value: "year", label: "This Year" },
          ]}
        />
      </div>
      <DemoColumn />
    </Card>
  );
};

export default ShiftRequestedGraph;
