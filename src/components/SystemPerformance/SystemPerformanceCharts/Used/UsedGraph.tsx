import React from 'react';

import { RadialBar } from '@ant-design/plots';

const UsedGraph = () => {
  const data = [ 
    {
    name: '',
    star: 478,
  },

  {
    name: 'G2',
    star: 678,
  },
];
const config :any= {
  data,
  xField: 'name',
  yField: 'star',
  maxAngle: 350,
  radius: 0.6,
  innerRadius: 0.7,
  tooltip: {
    formatter: (datum:any) => {
      return {
        name: 'star',
        value: datum.star,
      };
    },
  },
  colorField: 'star',
  color: (star:any) => {
    if (star > 678) {
      return '#FAAD14';
    } else if (star > 678) {
      return '#EE2E7E';
    }

    return '#ff93a7';
  },
  barBackground: {},
  barStyle: {
    lineCap: 'round',
  },
  annotations: [
    {
      type: 'html',
      position: ['50%', '50%'],
      html: (container:any, view:any) => {
        
        return `<div style="transform:translate(-50%,-46%)">
                  <span>92%<span/>
      </div>`;
      },
    },
  ],
 
};
  return <RadialBar {...config} style={{height:"310px",width:'200px'}}/>;
};



export default UsedGraph;
