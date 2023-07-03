import { RingProgress } from '@ant-design/plots';

export const DemoRingProgress = () => {
  const config:any = {
    height: 100,
    width: 70,
    autoFit: false,
    percent: 0.7,
    color: ['#80f95b', '#6FBDF8'],
    statistic: {
      content: null, // hide percentage value completely
    },
  };
  return <RingProgress {...config} />;
};
