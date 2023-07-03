import React from 'react';
import { Bar } from '@ant-design/plots';

const OverDueTab = () => {
  const data = [
    {
      type: 'Tall tree',
      sales: 108,
    },
    {
      type: 'Care Uk',
      sales: 72,
    },
    {
      type: 'BUPA',
      sales: 69,
    },
    {
      type: 'Carebase',
      sales: 155,
    },
    {
      type: 'Stanway',
      sales: 78,
    },
    {
      type: 'Care Uk',
      sales: 38,
    },
    {
      type: 'BUPA',
      sales: 50,
    },
    {
      type: 'Carebase',
      sales: 38,
    },
  ];
  const config = {
      
    data,
    xField: 'sales',
    yField: 'type',
    padding:[10,10,60,58], // set marginRatio to 0.2 to reduce the spacing between bars
    legend: {
      // position: 'top-left',
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

export default OverDueTab;
