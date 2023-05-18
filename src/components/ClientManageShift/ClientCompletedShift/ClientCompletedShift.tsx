import React from 'react';
import { Col, Row } from 'antd';
import { ClientCompletedShiftCalculation, ClientCompletedShiftModification, ClientCompletedShiftProfile } from '../ClientManageShift.utils';
import SelectWrapper from '../../../shared/SelectWrapper/SelectWrapper';
import { useGetCompletedShiftQuery } from '../../../store/Slices/ClientShiftManage';
import './ClientCompletedShift.scss';
import BreadCrumb from '../../../layout/BreadCrumb/BreadCrumb';

const ClientCompletedShift = () => {
  const { data: completedShift } = useGetCompletedShiftQuery({});

  const breadCrumbItems = [
    {
      title: "Completed Shifts",
      path: "",
    },
    {
      title: "Dashboard",
      path: "/client-dashboard",
    },
  ];

  const handleChange = () => { }
  return (
    <>
      <BreadCrumb breadCrumbItems={breadCrumbItems} />
      <div className='client-completed-shift-wrapper bg-white'>
        <div className="client-completed-select w-100">
          <p className="fs-14 fw-600 line-height-18 m-0 label-color">Sign off Status</p>
          <SelectWrapper
            size="large"
            name="manageSelect"
            placeHolder="All"
            options={[
              { label: "All", value: 'All' },
              { label: "Signed", value: 'Signed' },
              { label: "Done", value: 'Done' },
            ]}
            defaultValue="All"
            onChange={handleChange}
          />
        </div>
        {completedShift?.data?.shifts.length > 0 ? completedShift?.data?.shifts?.map((item: any) => (
          <>
            {console.log('item', item)}
            <div className='client-item-completed bg-white' style={{ marginBottom: "20px" }} key={item.id}>
              <Row gutter={[20, 20]}>
                <Col lg={5} md={24} sm={24} xs={24}>

                  <div className='client-img d-flex align-center' style={{ gap: "13px", paddingBottom: "25px" }}>
                    <img src={`https://rnd-s3-public-dev-001.s3.eu-west-2.amazonaws.com/${item?.carer?.profilePhoto?.mediaId}.${item?.carer.profilePhoto?.mediaMeta?.extension}`} alt="" />
                    <p className='fs-20 fw-500 title-color line-height-28 m-0'>{`${item.carer?.firstName} ${item.carer?.lastName}`}</p>
                  </div>

                  <div className='client-content-wrapper d-flex flex-column'>
                    {ClientCompletedShiftProfile.map((icon, index) =>
                      <div className='d-flex align-center' style={{ gap: "13px" }} key={index}>
                        <img src={icon.src} alt="" width={24} height={24} />
                        <p className='fs-14 fw-400 title-color line-height-20 m-0 ' style={{ wordWrap: "break-word", width: "240px" }}>{icon.text(item)}</p>
                      </div>
                    )}
                  </div>
                </Col>
                {/* <Divider type='vertical' style={{height: "100%"}} /> */}
                <Col lg={19}>
                  <div className="client-calculation bg-white">
                    <h2 className='fs-16 fw-500 m-0 title-color pb-18'>Shift Calculation</h2>
                    <Row gutter={[10, 10]} >
                      {ClientCompletedShiftCalculation.map((calculation, index) => (
                        <Col xl={6} lg={12} md={12} sm={12} xs={24} key={index}>
                          <div className='calculation d-flex align-center'>
                            <p className='d-flex fs-14 fw-400 m-0 title-color'>{calculation.heading}</p>
                            <h2 className='d-flex fs-14 fw-600 title-color m-0'>{calculation.text(item)}</h2>
                          </div>
                        </Col>
                      ))}
                    </Row>
                  </div>
                  <div className='signed-off bg-white'>
                    <div className='signed-inner-off d-flex justify-between align-center'>
                      {ClientCompletedShiftModification.map((modifiy, index) => (
                        <Col xl={12} lg={12} md={24} sm={24} xs={24} key={index} style={{ paddingLeft: "0" }}>
                          <div className='d-flex justify-between align-center' style={{ gap: " 10px", flexWrap: "wrap" }}>
                            <h2 className='fs-14 fw-600 title-color m-0'>{`${modifiy.heading}:`}</h2>
                            <span className='fs-14 fw-400 line-height-22 title-color'>{modifiy.name(item)}</span>
                            <p className='fs-14 fw-400 m-0 title-color'>{modifiy.text(item)}</p>
                          </div>
                        </Col>
                      ))}
                    </div>
                    <div className='signed-desc d-flex align-center'>
                      <h2 className='fs-16 fw-600 line-height-18 title-color m-0'>Modification Reason:</h2>
                      <p className='fs-14 fw-400 m-0 title-color line-height-22'>{item?.modifyReason}</p>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </>
        )) : <span className='fs-16 fw-600 text-center w-100 d-flex justify-center'>No data found</span>}
      </div>
    </>
  )
}

export default ClientCompletedShift;
