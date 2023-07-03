import  { useState, useEffect } from 'react';
import { Line } from '@ant-design/plots';

export const MemoryUsageGraph = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
      asyncFetch();
    }, []);
  
    const asyncFetch = () => {
        fetch('https://gw.alipayobjects.com/os/bmw-prod/e00d52f4-2fa6-47ee-a0d7-105dd95bde20.json')
          .then((response) => response.json())
          .then((json) => {
            const singleLineData = json.filter((d:any) => d.name === 'China');
            setData(singleLineData);
          })
          .catch((error) => {
            console.log('fetch data failed', error);
          });
      };
      const config:any = {
        data,
        xField: 'year',
        smooth:true,
        yField: 'gdp',
        yAxis: {
          label: {
            formatter: (v:any) => `${(v / 10e8).toFixed(1)} B`,
          },
        },
        legend: {
          position: 'top',
        },
        animation: {
          appear: {
            animation: 'path-in',
            duration: 5000,
          },
        },
      };
  
    return <Line {...config} style={{height:"154px"}} />;
  };