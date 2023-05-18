import { Col, Modal, Row } from "antd";
import Close from '../../../../../assets/images/OnBoarding/Close.svg';
import { Button, Form, Input, InputNumber } from 'antd';
import MainLogo from "../../../../../assets/brand/Logo.png";
import "./OtpVerificationModal.scss";
import Print from "../../../../../assets/icons/finance-setup/print.png";
import Download from "../../../../../assets/icons/finance-setup/download.png";
import { c } from "@fullcalendar/core/internal-common";
import InvoiceTimeSheetTable from "./WorkSummaryTable";
import { useState } from "react";

const WorkSummaryModal = (props: any) => {
  const { isOpenSummaryModal, setIsOpenSummaryModal } = props;
  const [isOpenWorkSummaryModal ,setIsOpenWorkSummaryModal]=useState(false)

  const { setIsOpenTimeSheetModal,timePeriodDates} = props;

  const tableHeaderDetails =[
    {heading:"Time Period",details:timePeriodDates?.startDate +" to " + timePeriodDates?.endDate },
    {heading:"Week No",details:`Week ${timePeriodDates?.weekNumber}`},
    {heading:"Care Home",details:"Risby Park"}
  ]
  const tableFooterDetails=[
    {heading:"Total Hours",details:Math.round(props?.financeCarerTimeSheetReports?.data?.totalHours)  },
    {heading:"Total Receivable",details:`£${props?.financeCarerTimeSheetReports?.data?.totalAmount}`},
  ]

  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };
  /* eslint-enable no-template-curly-in-string */

  const onFinish = (values: any) => {
    console.log(values);
  };


  return (
    <>
    <Modal
      className="work-summary"
      title={<h3 className="fs-24 fw-500 m-0 text-center">OTP Verification</h3>}
      closeIcon={< img src={Close} alt="close-icon" />}
      footer={false}
      open={isOpenSummaryModal}
      onOk={() => {
        setIsOpenSummaryModal(false);
      }}
      onCancel={() => {
        setIsOpenSummaryModal(false);
      }}
      width={500}
      centered
    >
      <Row gutter={[25, 10]} style={{ marginTop: "2rem" }}>
        <Col xs={24} md={12} xl={24} xxl={24}>
          <p className="fs-14 fw-600 m-0 text-center"style={{ marginBottom: "2rem" }}>We Have Send you a  Verification code to your  email- johndoe@co.uk</p>

          <Form
            // {...layout}
            name="nest-messages"
            onFinish={onFinish}
            validateMessages={validateMessages}
            layout="vertical"
          >
            <Form.Item name={['user', 'name']} label="Verification Code" rules={[{ required: true }]} style={{width:"350px",margin:"0 auto",marginBottom:"35px"}}>
              <Input  placeholder="Type here"/>
            </Form.Item>
            <Form.Item style={{textAlign:"center"}}>
              <Button type="primary" htmlType="submit" onClick={()=>setIsOpenWorkSummaryModal(true)}>
                Submit
              </Button>
            </Form.Item>
          </Form>



        </Col>

      </Row>
    </Modal>
    {isOpenWorkSummaryModal &&   <Modal className='invoice-modal' title={<img src={MainLogo} alt="main-logo"/>} closeIcon={< img src={Close} alt="close-icon" />}
       footer={false} open={isOpenWorkSummaryModal} onOk={()=>{setIsOpenWorkSummaryModal(false)}} onCancel={()=>{setIsOpenWorkSummaryModal(false)}}
        width={1653}
      >
        <Row gutter={[25,10]}  style={{marginTop:"2rem"}}>
          <Col xs={24} md={12}>
            {tableHeaderDetails.map((data)=>{
              return <Row className='details-wrapper'>
                <Col xs={12} md={3}><p className='fs-14 fw-600 m-0'>{data.heading}</p></Col>
                <Col xs={12} md={6}><p className='fs-14 fw-400 m-0'>{data.details}</p></Col>
              </Row>
            })}
          </Col>
          <Col xs={24} md={12} className="icon-wrapper d-flex justify-end">
            <img className="cursor-pointer" src={Print} height={24} width={24} alt="print" />
            <img className="cursor-pointer" src={Download} height={24} width={25} alt="cloud" />
          </Col>
          <Col xs={24} md={24} style={{margin:"1rem 0"}}>
            <div className="table-wrapper">
              <InvoiceTimeSheetTable financeCarerTimeSheetReports={props?.financeCarerTimeSheetReports?.data?.result} />
            </div>
          </Col>
          <Col xs={24} md={24}>
            {tableFooterDetails.map((data)=>{
              return <Row className='details-wrapper'>
              <Col xs={12} md={2}><p className='fs-14 fw-600 m-0'>{data.heading}</p></Col>
              <Col xs={12} md={2}><p className='fs-14 fw-400 m-0'>{data.details}</p></Col>
            </Row>
            })}
          </Col>
          
        </Row>
      </Modal>}
  
    </>
  );
};

export default WorkSummaryModal;
