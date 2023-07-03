import React, { useState, useEffect } from 'react';
import { Line } from '@ant-design/plots';


const MemoryUsageGraph = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json')
      .then((response) => response.json())
      .then((json) => {
        const reducedData = json.filter((item:any, index:any) => index % 10 === 0); // take every 10th data point
        setData(reducedData);
      })
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };
  const config :any = {
    data,
    padding: 'auto',
    xField: 'Date',
    yField: 'scales',
    point: {
      size: 5,
      shape: 'circle',
      style: {
        fill: 'white',
        stroke: '#FF4D4F',
        lineWidth: 2,
      },
    },
    xAxis: {
      tickCount: 5,
    },
    style: {
      line: {
        stroke: '#65CDF0',
        fill:"#65CDF0",
     },
    },
   
  };

 


  return <Line {...config} style={{height:"250px"}}/>;
  
};

export default MemoryUsageGraph

