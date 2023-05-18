import React, { useState, useEffect } from 'react';

import { Line } from '@ant-design/plots';

const ServerDownTimeGraph = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/55424a73-7cb8-4f79-b60d-3ab627ac5698.json')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };
  const COLOR_PLATE_10 = [
    '#30D987',
    '#F7B923',
    '#FD1F9B',

  ];

  const config = {
    data,
    xField: 'year',
    yField: 'value',
    seriesField: 'category',
    yAxis: {
      label: {
        formatter: (v:any) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
      },
    },
    color: COLOR_PLATE_10,
    point: {
      shape: ( category :any) => {
        return category === 'Gas fuel' ? 'square' : 'circle';
      },
      style: (year :any) => {
        return {
          r: Number(year) % 7 ? 0 : 2.5,
        };
      },
    },
  };

  return <Line {...config}  style={{height:"250px"}}/>;
};


export default ServerDownTimeGraph