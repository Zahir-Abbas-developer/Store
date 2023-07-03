import React from 'react'
import { Pie } from '@ant-design/plots';

const StaffCategoriesGraph = () => {
  const data = [
    {
      type: 'Dependent',
      value: 5,
    },
    {
      type: 'Student',
      value: 45,
    },
    {
      type: 'Contractor',
      value: 30,
    },
    {
      type: 'Limited',
      value: 20,
    },
  ];
  const config:any = {
    appendPadding: 30,
    data,
   
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    innerRadius: 0.64,
    label: {
      type: 'inner',
      offset: '-50%',
      content: ({ percent }:any) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fill: '#fff',
        fontSize: 14,
        textAlign: 'center',
      },
    },
     autoFit:true,
    color: ['#63E1A5', "#EE2E7E", "#65CDF0", "#F7B923"],
    statistic: null,
  };
  return (
 
      <Pie {...config} style={{height:"300px"}}  />
  )
}

export default StaffCategoriesGraph
