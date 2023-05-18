
import { LoadingOutlined } from '@ant-design/icons';
import { Column } from '@ant-design/plots';
import { Spin } from 'antd';


const CarersGraph = ({ carersGraphData, isLoading }: any) => {


  const data: any = carersGraphData?.map((item: any) => {
    return {
      month: item?.month,
      count: item?.count
    }
  })

  const config: any = {
    data,
    xField: 'month',
    yField: 'count',
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
      count: {
        alias: 'No of Trainee',
      },
    },
    minColumnWidth: 26,
    maxColumnWidth: 26,
    color: ({ month }: any) => {
      switch (month) {
        case "Jan":
          return "#3CCC4A"
        case "Feb":
          return "#6B849B"
        case "Mar":
          return "#FF9900"
        case "Apr":
          return "#FF5252"
        case "May":
          return "#3CCC4A"
        case "Jun":
          return "#6B849B"
        case "Jul":
          return "#FF9900"
        case "Aug":
          return "#FF5252"
        case "Sep":
          return "#3CCC4A"
        case "Oct":
          return "#6B849B"
        case "Nov":
          return "#FF9900"
        case "Dec":
          return "#FF5252"
        default:
          return "#e7e7e9"
      }
    },
  };

  return (
    <div className='carers-main-trainne-enrolled-chart bg-white'>
      <h2 className="header-chart fs-20 fw-500 title-color m-0">Carers per Month</h2>
      <div className="chat-wrapper">
        {isLoading ? <div style={{ textAlign: "center", paddingTop: "30px" }}><Spin indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />} /></div> : <Column {...config} />}
      </div>
    </div>
  );
};

export default CarersGraph