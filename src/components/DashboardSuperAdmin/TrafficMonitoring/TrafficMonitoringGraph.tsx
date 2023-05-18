import  { useState, useEffect } from 'react';
import { Line } from '@ant-design/plots';

export const TrafficMonitoringGraph = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };
  const config:any = {
    data,
    padding: 'auto',
    xField: 'Date',
    yField: 'scales',
    lineStyle: { stroke: '#A31D99' },
    // xAxis: {
    //   tickCount: 5,
    // },
    // slider: {
    //   start: 0.1,
    //   end: 0.5,
    // },
  };

  return <Line {...config} style={{height:"220px"}} />;
};