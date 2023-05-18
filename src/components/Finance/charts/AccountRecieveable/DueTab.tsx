import React from 'react';
import { Bar } from '@ant-design/plots';

const DueTab = () => {
  const data = [
    {
      type: 'Tall tree',
      sales: 38,
    },
    {
      type: 'Care Uk',
      sales: 52,
    },
    {
      type: 'BUPA',
      sales: 101,
    },
    {
      type: 'Carebase',
      sales: 145,
    },
    {
      type: 'Stanway',
      sales: 48,
    },
    {
      type: 'Care Uk',
      sales: 58,
    },
    {
      type: 'BUPA',
      sales: 38,
    },
    {
      type: 'Carebase',
      sales: 88,
    },
  ];
  const config = {
      
    data,
    xField: 'sales',
    yField: 'type',
    padding:[10,10,60,58], // set marginRatio to 0.2 to reduce the spacing between bars
    legend: {
    },
    autoFit:true,
    barStyle: {
      fill: '#FE6669',
    },
    minBarWidth: 25,
    maxBarWidth: 25,
    interactions: [
      {
        type: 'active-region',
        enable: false,
      },
    ],
  };
  return <Bar {...config} style={{height:"250px"}}/>;
};

export default DueTab;
