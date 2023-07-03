import React from 'react'
import { Pie } from '@ant-design/plots';
import "./NumberOfStudents.scss"
import { useGetIntructorDashboardStudentQuery } from '../../../store/Slices/InstructorDashboard';
import LoadingSvg from "../../../assets/Login/loader-icon.gif";


const NumberOfStudents = () => {


  const { data: apiData, isLoading, isSuccess, isError } = useGetIntructorDashboardStudentQuery({ refetchOnMountOrArgChange: true });


  let studentGraphData: any;

  if (isLoading) {
    studentGraphData = <p>Loading...</p>
  }

  else if (isSuccess) {
    studentGraphData = apiData;
  }

  else if (isError) {
    studentGraphData = <p>Error...</p>
  }




  const data = studentGraphData?.data?.map((item: any) => {
    return {
      type: item?.status,
      value: item?.totalStudent
    }
  })

  const config: any = {
    appendPadding: 40,
    data: data ?? [],
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    innerRadius: 0.64,
    label: {
      type: 'inner',
      offset: '-50%',
      content: ({ percent }: any) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fill: '#fff',
        fontSize: 14,
        textAlign: 'center',
      },
    },
    autoFit: true,
    color: ["#F7B923", "#65CDF0", "#EE2E7E",],
    statistic: null,
  };


  return (
    <div className='wrapper-main-number-students-chart'>
      <div className="header-chart fs-20 fw-500 form-heading-color">Total Number Of Students</div>
      <div className="chat-wrapper">
        {isLoading ? <img src={LoadingSvg} height={200} width={200} alt="LoadingSvg" /> : <Pie {...config} style={{ height: "300px" }} /> }
      </div>
    </div>
  )
}

export default NumberOfStudents