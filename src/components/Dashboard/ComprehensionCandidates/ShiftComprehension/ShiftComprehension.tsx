import { useState } from 'react';
import { Card, Col, Layout, Row, Spin } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import '../../../../sass/common.scss';
import "./ShiftComprehension.scss";
import { shiftComprehensionCards } from '../../../../mock/Dashboard';
import { useGetShiftComprehensionDataQuery } from '../../../../store/Slices/AdminDashboard';
import ShiftCompensation from "../../../../assets/icons/Dashboard/shifts-comprehension.svg"
import { LoadingOutlined } from '@ant-design/icons';

export const ShiftComprehension = () => {
  const [selectedShiftComprehension, setSelectedShiftComprehension] = useState('day');

  const { data, isSuccess, isLoading } = useGetShiftComprehensionDataQuery({ comprehensionType: selectedShiftComprehension })

  let shiftComprehensionData;
  if (isSuccess) {
    shiftComprehensionData = data?.data
  }
  //Shift Comprehension Card Filter values 
  const filterValuesArray = [
    { id: 'day', label: 'Days' },
    { id: 'week', label: 'Weeks' },
    { id: 'month', label: 'Months' },
  ];
  //Get Filter values deponding upon on which filter value we want i.e Days ,Week and Month 
  const handleChangeFilterValues = (id: any) => {
    setSelectedShiftComprehension(id);
  };
  //getColor Function it will change border color of card deponding upon card id
  const getColor = (id: any) => {
    return selectedShiftComprehension === id ? '#4E132C' : '#C4C4C4';
  };

  const shiftComprehensionCards = [
    { text: 'Shifts Created', borderStyle: 'solid', borderColor: '#65CDF0', img: ShiftCompensation, shiftComprehensionText: shiftComprehensionData?.createdShifts },
    { text: 'Vacant Shifts', borderStyle: 'solid', borderColor: '#65CDF0', img: ShiftCompensation, shiftComprehensionText: shiftComprehensionData?.unfilledShifts },
    { text: 'Shifts Booked', borderStyle: 'solid', borderColor: '#F0488E', img: ShiftCompensation, shiftComprehensionText: shiftComprehensionData?.bookedShifts },
    { text: 'Directly Booked & Awaiting', borderStyle: 'solid', borderColor: '#F0488E', img: ShiftCompensation, shiftComprehensionText: shiftComprehensionData?.directlyBookAwaiting },
    { text: 'Directly Booked & Confirmed', borderStyle: 'solid', borderColor: '#F7B923', img: ShiftCompensation, shiftComprehensionText: shiftComprehensionData?.directlyBookConfimed },
    { text: 'Directly Booked', borderStyle: 'solid', borderColor: '#F7B923', img: ShiftCompensation, shiftComprehensionText: Number(shiftComprehensionData?.directlyBookAwaiting + shiftComprehensionData?.directlyBookConfimed) },
  ];
  //Main
  return (
    <Layout className='admin-dashboard '>
      <Card className="overallscore comprehension overallscroe-card border-radius-8 card-bg-color" bordered={false} style={{ boxShadow: "0px 12px 23px rgba(62, 73, 84, 0.04)", minHeight: "504px" }}>
        <div className="shift-comprehension-card">
          <p className="fw-500 fs-20 shift-comprehension" style={{ color: '#65CDF0', marginTop: "0px" }}>
            Shift Comprehension
          </p>
          <div >
            <Row>
              {filterValuesArray.map((item) => (
                <Col key={item.id} sm={24} lg={24} xl={8} md={24} style={{ borderRight: item.id === 'day' || item.id === 'week' ? '1px solid #a0acbb' : 'none' }}>
                  <span
                    className={`lowest fw-400 fs-16 cursor-pointer ${selectedShiftComprehension === item.id ? 'active' : ''}`}
                    onClick={() => handleChangeFilterValues(item.id)}
                    style={{ color: getColor(item.id), margin: "0px 10px" }}
                  >
                    {item.label}
                  </span>
                </Col>
              ))}
            </Row>
          </div>
        </div>
        {!data && <div style={{ textAlign: "center", paddingTop: "30px" }}><Spin indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />} /></div>}
        {data && <Row gutter={[23, 23]} style={{ paddingTop: "20px" }}>
          {selectedShiftComprehension === "day" &&
            shiftComprehensionCards.slice(0, 8)?.map((card, index) => {
              return (
                <Col lg={24} xl={12} sm={24} md={24} xs={24} key={uuidv4()}>
                  <Card
                    className='border-radius-10 shift-comprehension'
                    key={index}
                    style={{ borderLeft: `10px ${card.borderStyle} ${card.borderColor}`, borderTop: "none", boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.13)" }}
                  >
                    <div className='d-flex align-center justify-between'>
                      <span className='fw-600 fs-14' style={{ color: "#3E4954" }}>{card.text}</span>
                      <img src={card.img} style={{ background: card.borderColor, borderRadius: '50%', padding: "7px" }} alt={`Image for ${card.text}`} />
                    </div>
                    <span className='fw-600 fs-32 comprehension-button'>{card?.shiftComprehensionText}</span>

                  </Card>
                </Col>
              );
            })}
        </Row>}
        {data && <Row gutter={[23, 23]} >
          {selectedShiftComprehension === "week" &&
            shiftComprehensionCards.slice(0, 8)?.map((card, index) => {
              return (
                <Col lg={24} xl={12} sm={24} md={24} xs={24} key={uuidv4()}>
                  <Card
                    className='border-radius-10 shift-comprehension'
                    key={index}
                    style={{ borderLeft: `10px ${card.borderStyle} ${card.borderColor}`, borderTop: "none", boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.13)" }}
                  >
                    <div className='d-flex align-center justify-between'>
                      <span className='fw-600 fs-14'>{card.text}</span>
                      <img src={card.img} style={{ background: card.borderColor, borderRadius: '50%', padding: "7px" }} alt={`Image for ${card.text}`} />
                    </div>
                    <span className='fw-600 fs-32 comprehension-button'>{card?.shiftComprehensionText}</span>

                  </Card>
                </Col>

              );
            })}
        </Row>}
        {data && <Row gutter={[23, 23]} >
          {selectedShiftComprehension === "month" &&
            shiftComprehensionCards.slice(0, 8)?.map((card, index) => {
              return (
                <Col lg={24} xl={12} sm={24} md={24} xs={24} key={uuidv4()}>
                  <Card
                    className='border-radius-10 shift-comprehension'
                    key={index}
                    style={{ borderLeft: `10px ${card.borderStyle} ${card.borderColor}`, borderTop: "none", boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.13)" }}
                  >
                    <div className='d-flex align-center justify-between'>
                      <span className='fw-600 fs-14'>{card.text}</span>
                      <img src={card.img} style={{ background: card.borderColor, borderRadius: '50%', padding: "7px" }} alt={`Image for ${card.text}`} />
                    </div>
                    <span className='fw-600 fs-32 comprehension-button'>{card?.shiftComprehensionText}</span>

                  </Card>
                </Col>

              );
            })}
        </Row>}
      </Card>
    </Layout>

  );
};