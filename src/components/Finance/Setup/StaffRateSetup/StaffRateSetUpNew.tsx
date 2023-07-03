import { Col, Collapse, Row } from 'antd'
import React from 'react'
const { Panel }: any = Collapse;

const StaffRateSetUpNew = (props: any) => {
  const { heading, collapseHeader } = props;

  const renderData: any = [
    heading === 'Client Name' ? 'Client Name' : 'Staff Name',
    'category',
    'Week Day',
    'saturday',
    'Sunday', 'Bank Holiday'
  ]

  return (
    <div>
      <Collapse>
        <Panel
          header={
            <Row justify="center" align="middle" gutter={12} className="accordion-header">
              <img src={''} alt="" className="accordianImg" />
              <Col xs={19} sm={21} lg={23}>
                <p className="fs-16 fw-500 accordian-header-title">{heading}</p>
              </Col>
            </Row>
          }
        >
          <div className="d-flex" style={{ gap: "1rem" }}>
            {renderData?.map((head: any, i: number) => (
              <p className="fw-600 m-0" style={{ paddingLeft: ".5rem" }}>
                {head}
              </p>
            ))}
          </div>
        </Panel>
      </Collapse>
    </div>
  )
}

export default StaffRateSetUpNew
