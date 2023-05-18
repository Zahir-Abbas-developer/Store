import { useEffect, useRef } from 'react';
import { Gauge } from '@ant-design/plots';

export const AvailableServerSpace = () => {
  const graphRef = useRef<any>(null);
  useEffect(() => {
    if (graphRef.current) {
      let data = 0.7;
      const interval = setInterval(() => {
        if (data >= 1.5) {
          clearInterval(interval);
        }
        data += 0.005;
        graphRef.current.changeData(data > 1 ? data - 1 : data);
      }, 100);
    }
  }, [graphRef]);

  const config = {
    percent: 0,
    range: {
      ticks: [0, 1],
      color: ['l(0) 0:#F4664A'],
    },
    axis: {
      label: null, // remove label values
    },
    indicator: {
      pointer: {
        style: {
          stroke: '#D0D0D0',
        },
      },
      pin: {
        style: {
          stroke: '#D0D0D0',
        },
      },
    },
    statistic: {
      content: {
        offsetY: 36,
        formatter: ({ percent }: any) => `${Math.round(percent * 100)}%`,
        style: {
          fontSize: '36px',
          color: '#4B535E',
        },
      },
    },
    
    onReady: (plot: any) => {
      graphRef.current = plot;
    },
  };

  return <Gauge {...config} style={{ height: "80px", width:"180px",marginTop:"40px",marginLeft:"10px" }} />;
};
