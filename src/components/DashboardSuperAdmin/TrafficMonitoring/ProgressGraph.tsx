import { RingProgress } from '@ant-design/plots';

export const ProgressGraph = () => {
  const config = {
    height: 80,
    width: 80,
    autoFit: false,
    percent: 0.7,
    
    color: ['#7B61FF', '#E8EDF3'],
  };
  return <RingProgress {...config} />;
};