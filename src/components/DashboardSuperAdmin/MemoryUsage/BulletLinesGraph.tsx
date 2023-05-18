import { Progress } from 'antd';

export const BulletLines = () => (
  <>
    <Progress percent={30} status="active" showInfo={false} style={{height:"2px"}}/>
    <Progress percent={50} status="active" showInfo={false} style={{height:"2px"}}/>
    <Progress percent={70} status="active"  showInfo={false} style={{height:"2px"}}/>
    <Progress percent={100} status="active" showInfo={false} style={{height:"2px"}}/>
    <Progress percent={50} status="active" showInfo={false} style={{height:"2x"}}/>
  </>
);