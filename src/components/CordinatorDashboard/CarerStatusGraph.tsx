import { Card } from "antd";
import { Pie } from "@ant-design/plots";
import { useGetCoordinatorDashboardCarersQuery } from "../../store/Slices/CoordinatorDashboard";
import LoadingSvg from "../../assets/Login/loader-icon.gif";


const CarerStatusGraph = () => {

  const { data: apiData, isLoading, isSuccess, isError } = useGetCoordinatorDashboardCarersQuery({ refetchOnMountOrArgChange: true });


  let coordinatorDashboardData: any;

  if (isLoading) {
    coordinatorDashboardData = <p>Loading...</p>
  }

  else if (isSuccess) {
    coordinatorDashboardData = apiData;
  }

  else if (isError) {
    coordinatorDashboardData = <p>Error...</p>
  }


  const DemoPie = ({ graphData }: any) => {
    const data = [
      {
        type: "Active",
        value: graphData?.activeCarerStatus,
      },
      {
        type: "In-Active",
        value: graphData?.inActiveCarerStatus,
      },
    ];
    const ActitveColor = "#5DD3A9";
    const InActiveColor = "#65CDF0";


    const config: any = {
      appendPadding: 0,
      data: data ?? [],
      angleField: "value",
      colorField: "type",
      radius: 1,
      innerRadius: 0.6,
      minColumnWidth: 20,
      maxColumnWidth: 20,

      color: ({ type }: any) => {
        if (type === "Active") {
          return ActitveColor;
        }
        return InActiveColor;
      },
      legend: {
        marker: () => {
          return {
            style: {
              r: 8,
            },
          };
        },
      },
      label: {
        content: "",
      },
      interactions: [
        {
          type: "element-selected",
        },
        {
          type: "element-active",
        },
      ],
      statistic: {
        title: false,
        content: {
          style: {
            whiteSpace: "pre-wrap",
            overflow: "hidden",
            display: "none",
            textOverflow: "ellipsis",
          },
        },
      },
    };

    return <Pie height={190} {...config} />;

  };

  return (
    <Card>
      <h3 className="fs-20 m-0 line-height-28 fw-500 title-color">
        Carers Status
      </h3>
      {isLoading ? (<div className="text-center">
        <img src={LoadingSvg} height={200} width={200} alt="LoadingSvg" />
      </div>) : (
          <>
            <div className="carer">
              <h3 className="fs-16 m-0 fw-500 title-color">Total Carers</h3>
              <button>{coordinatorDashboardData?.data?.totalCareer}</button>
            </div>
            <DemoPie graphData={coordinatorDashboardData?.data} />
          </>
      )}
     
    </Card>
  );
};

export default CarerStatusGraph;
