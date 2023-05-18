import React from 'react'
import { DualAxes } from '@ant-design/plots';

const ClientAverageProfitGraph = () => {

  //   {
  //     time: 'Tall Tree',
  //     value: 450,
  //     count: 700,
  //   },
  //   {
  //     time: 'Care UK',
  //     value: 900,
  //     count: 600,
  //   },
  //   {
  //     time: 'BUPA',
  //     value: 300,
  //     count: 400,
  //   },
  //   {
  //     time: 'Tall Tree',
  //     value: 450,
  //     count: 380,
  //   },
  //   {
  //     time: 'Carebase',
  //     value: 470,
  //     count: 220,
  //   },
  //   {
  //     time: 'Tall Tree',
  //     value: 470,
  //     count: 220,
  //   },
  //   {
  //     time: 'Stanway',
  //     value: 470,
  //     count: 220,
  //   },
  //   {
  //     time: 'Care UK',
  //     value: 470,
  //     count: 220,
  //   },
  //   {
  //     time: 'Novela',
  //     value: 470,
  //     count: 220,
  //   },
   
  // ];
  const data = [
    {
      time: 'Tall Tree',
      value: 350,
      count: 800,
    },
    {
      time: 'Care UK',
      value: 900,
      count: 600,
    },
    {
      time: 'BUPA',
      value: 300,
      count: 400,
    },
    {
      time: 'Tall Tree',
      value: 450,
      count: 380,
    },
    {
      time: 'Carebase',
      value: 470,
      count: 220,
    },
    {
      time: 'Tall Tree',
      value: 450,
      count: 380,
    },
   
  ];
  const config = {
    data: [data, data],
    xField: 'time',
    yField: ['value', 'count'],
    autoFit:true,
   
    geometryOptions: [
      {
        geometry: 'column',
        columnWidthRatio: 0.8,
      
        columnStyle: {
          fill: '#65CDF0',
          
        },
          minColumnWidth: 70,
          maxColumnWidth: 70,
        label: {
  
          style: {
            fill: '#FFFFFF', // Set the font color of the label
          },
        },
      },
      {
        geometry: 'line',
        point: {
          size: 5,
          shape: 'circle',
          style: {
            fill: 'white',
            stroke: '#EE2E7E',
            lineWidth: 2,
          },
        },
        lineStyle: {
          lineWidth: 1.5,
          stroke:"#EE2E7E",
          
        },
      },
    ],
   
  };
  return (
    <DualAxes {...config} style={{height:"350px"}}/>
  )
}

export default ClientAverageProfitGraph
