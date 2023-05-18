import React, { useEffect } from 'react'
import "./NoOfTrainneEnrolledChart.scss"

import { Column } from '@ant-design/plots';
import { useGetIntructorDashboardQuery } from '../../../store/Slices/InstructorDashboard';

import LoadingSvg from "../../../assets/Login/loader-icon.gif";


interface EnrollmentData {
  month: string;
  noOfEnrollment: number;
}

const NoOfTrainneEnrolledChart: React.FC = () => {

  const { data: apiData, isLoading, isSuccess, isError } = useGetIntructorDashboardQuery({ refetchOnMountOrArgChange: true });


  let enrollmentGraphData: any;
  let data: EnrollmentData[];

  if (isLoading) {
    enrollmentGraphData = <p>Loading...</p>
  }
  else if (isSuccess) {
    enrollmentGraphData = apiData;
  }

  else if (isError) {
    enrollmentGraphData = <p>Error...</p>
  }


  data = enrollmentGraphData?.data?.map((item: any) => {
    const monthName = new Date(2022, item?.month - 1, 1).toLocaleString('default', { month: 'long' });
    return {
      month: monthName,
      noOfEnrollment: item?.enrolledTrainees
    }
  })

  const config = {
    data: data ?? [],
    xField: 'month',
    yField: 'noOfEnrollment',
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      month: {
        alias: 'Month',
      },
      noOfEnrollment: {
        alias: 'No of Trainee',
      },
    },
    minColumnWidth: 20,
    maxColumnWidth: 20,
    color: ({ month }: any) => {
      switch (month) {
        case "Jan":
          return "#F4B935"
        case "Feb":
          return "#6ECDEE"
        case "Mar":
          return "#F4B935"
        case "Apr":
          return "#3290FC"
        case "May":
          return "#20A38A"
        case "Jun":
          return "#EA277F"
        case "Jul":
          return "#3290FC"
        case "Aug":
          return "#6ECDEE"
        case "Sep":
          return "#EA277F"
        case "Oct":
          return "#3290FC"
        case "Nov":
          return "#F4B935"
        case "Dec":
          return "#20A38A"
        default:
          return "#e7e7e9"
      }
    },
  };

  // if (isLoading) return <p>Loading . . . </p>

  return (
    <div className='wrapper-main-trainne-enrolled-chart'>
      <div className="header-chart fs-20 fw-500 form-heading-color">No of Trainee Enrolled in Per month</div>
      <div className="chat-wrapper">
        {isLoading ? <img src={LoadingSvg} height={200} width={200}  alt="LoadingSvg" /> : <Column {...config} />}
      </div>
    </div>
  );



};

export default NoOfTrainneEnrolledChart