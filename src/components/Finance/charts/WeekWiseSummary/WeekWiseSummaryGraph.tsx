
import React, { useState, useEffect } from 'react';
import { Column } from '@ant-design/plots';

const WeekWiseSummaryGraph = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch('https://gw.alipayobjects.com/os/antfincdn/PC3daFYjNw/column-data.json')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };
  const config = {
    data,
    xField: 'city',
    yField: 'value',
    seriesField: 'type',
    isGroup: true,
     columnStyle: {
      
      
    },
   
  };

  return <Column {...config} />;

}

export default WeekWiseSummaryGraph