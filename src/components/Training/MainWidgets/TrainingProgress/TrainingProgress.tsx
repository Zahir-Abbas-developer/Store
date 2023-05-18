import { Bar } from "@ant-design/plots";
import { useGetTrainingProgressQuery } from "../../../../store/Slices/Training";
import { useEffect } from "react";

const TrainingProgress = () => {


  const { data:isTrainingData, isLoading:isTrainingLoading, isError:isTrainingError, isSuccess:isTrainingSucess } = useGetTrainingProgressQuery([])
  
  let getTrainingProgress: any;
  if (isTrainingLoading) {
    getTrainingProgress = <p>Loading...</p>
  }
  else if (isTrainingSucess) {
    getTrainingProgress = isTrainingData
  }
  else if (isTrainingError) {
    getTrainingProgress = <p>Error...</p>
  }
  console.log("getTrainingProgress =>>",getTrainingProgress?.data)
  const dataCheck = getTrainingProgress?.data?.length

  const inProgressCarers =  getTrainingProgress?.data?.find((data:any) => data.status === "INPROGRESS")?.carers;
  const enrolledCarers = getTrainingProgress?.data?.find((data:any) => data.status === "ENROLLED")?.carers;
  const pendingCarers = getTrainingProgress?.data?.find((data:any) => data.status === "PENDING")?.carers;
  const completedCarers = getTrainingProgress?.data?.find((data:any) => data.status === "COMPLETED")?.carers;


  console.log("completedCarers", completedCarers)
  console.log("pendingCarers", pendingCarers)

  const data = [
    {
      year: "Enrolled",
      value: parseInt(`${dataCheck ? enrolledCarers : 0}`),
    },
    {
      year: "Inprogress",
      value: parseInt(`${inProgressCarers ? inProgressCarers : 0}`),
    },
    {
      year: "Completed",
      value: parseInt(`${dataCheck ? completedCarers : 0}`),
    },
    {
      year: "Pending",
      value: parseInt(`${dataCheck ? pendingCarers : 0}`),
    },
  ];

  console.log("data", data)
  
  const config: any = {
    data,
    xField: "value",
    yField: "year",
    seriesField: "year",
    legend: {
      position: "top-left",
    },
    barBackground: {
      style: {
        fill: "rgba(0,0,0,0.1)",
      },
    },
    color: ["#65CDF0", "#F7B923", "#52C41A", "#FF4D4F"],
    interactions: [
      {
        type: "active-region",
        enable: false,
      },
    ],
  };

  useEffect(() => {
    
  }, [isTrainingData])


  return (
    <div className="training-progress">
      <h2 className="title fs-20 fw-500 m-0">Carer Training Progress</h2>
      <div className="graph">
        <Bar height={250} {...config} />
      </div>
    </div>
  );
};

export default TrainingProgress;
