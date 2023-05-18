import React from 'react'
import { DualAxes } from '@ant-design/plots';
const RevenueComparisonGraph = () => {
  const data = [
    {
      year: 'Jan',
      value: 400,
     
    },
    {
      year: 'Feb',
      value: 300,
    
    },
    {
      year: 'Mar',
      value: 200,
     
    },
    {
      year: 'Apr',
      value: 100,
     
    },
    {
      year: 'May',
      value: 0,
     
    },
    {
      year: 'Jun',
      value: 6,
      
    },
    {
      year: 'Jul',
      value: 7,
     
    },
    {
      year: 'Aug',
      value: 9,
     
    },
    {
      year: 'Sep',
      value: 13,
      
    },
    {
      year: 'Oct',
      value: 13,
      
    },
    {
      year: 'Nov',
      value: 13,
     
    },
    {
      year: 'Dec',
      value: 13,
     
    },
  ];
 
  const config :any= {
    data: [data, data],
    xField: 'year',
    yField: ['value','count'],
  
    geometryOptions: [
      {
        geometry: 'line',
        color: '#EE2E7E',
        point: {
          size: 5,
          shape: 'circle',
          style: {
            fill: 'white',
            stroke: '#EE2E7E',
            lineWidth: 2,
          },
        },
      },
      {
        geometry: 'line',
        color: '#F7B923',
        point: {
          size: 5,
          shape: 'circle',
          style: {
            fill: 'white',
            stroke: '#F7B923',
            lineWidth: 2,
          },
        },
      },
    ],
  };
  return <DualAxes {...config}  style={{height:"280px"}} />
  
}

export default RevenueComparisonGraph