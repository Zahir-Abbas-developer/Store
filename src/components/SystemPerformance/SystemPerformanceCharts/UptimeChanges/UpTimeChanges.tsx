import React from 'react'
import { Row ,Col,Card,Table} from 'antd'
import '../ServerDownTime/ServerDownTime.scss'
import { ColumnsType } from 'antd/es/table';
import {systemPerformanceData} from '../../../../mock/SystemPerformance/SystemPerformanceData'


const UpTimeChanges = () => {
  const columnsSystemPerformance: ColumnsType<any> = [
    {
      title: 'From',
      dataIndex: 'from',
      key: 'from',
      render: (_, item) =>
                <div className="cursor-pointer d-flex align-center "  >
                    <img src={item.ArrowUpIcon} alt={item.arrowUpIconAlt} />
                    <img src={item.ArrowDownIcon} alt={item.arrowDownIconAlt} />
                    <span className='fs-14 fw-400 title-color line-height-22' style={{ marginLeft: "30px" }}>
                      {item.from}
                    </span>
                   
                </div>
    },
    {
      title: 'To',
      dataIndex: 'to',
      key: 'to',
      
    },
    {
      title: 'Response Time',
      dataIndex: 'responseTime',
      key: 'responseTime',
    },
   
  ];
  return (
    <Row  gutter={[23,23]}>
    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
   <Card className='wrap-system-performance-up-time-change-card border-radius-8 bg-white card-box-shadow'>
      <Table columns={columnsSystemPerformance} dataSource={systemPerformanceData}
        title={() => <span className='fw-600 fs-14 line-height-17 title-color'>Uptime Changes</span>}
      pagination={false}
      scroll={{ x: "max-content" }}
      />
   </Card>
   </Col>
   </Row>
  )
}

export default UpTimeChanges