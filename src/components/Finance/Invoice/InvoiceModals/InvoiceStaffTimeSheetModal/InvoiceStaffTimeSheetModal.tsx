import { Col, Modal, Row } from 'antd';
import MainLogo from "../../../../../assets/brand/Logo.jpg";
import Print from "../../../../../assets/icons/finance-setup/print.png";
import Download from "../../../../../assets/icons/finance-setup/download.png";
import Close from '../../../../../assets/images/OnBoarding/Close.svg';
import TableComponent from './InvoiceStaffTimeSheetTable';
import "./InvoiceStaffTimeSheetModal.scss"

function InvoiceStaffTimeSheetModal(props: any) {
  const { isOpenTimeSheetModal, setIsOpenTimeSheetModal, InvoiceTimeSheet,isOpenWorkSummaryModal,weekNumber,CareHomeName } = props;

  return (
    <Modal className='invoice-modal' title={<img src={MainLogo} alt="main-logo" />} closeIcon={< img src={Close} alt="close-icon" />}
      footer={false} open={isOpenTimeSheetModal} onOk={() => { setIsOpenTimeSheetModal(false) }} onCancel={() => { setIsOpenTimeSheetModal(false) }}
      width={1653}
    > 
     {isOpenWorkSummaryModal &&  <h1>Work Summary</h1>}
      <Row gutter={[25, 10]} style={{ marginTop: "2rem" }}>   
        <Col xs={24} md={12}>
        {isOpenWorkSummaryModal && 
         <Row className='details-wrapper'>
        <Col xs={12} md={3}><p className='fs-14 fw-600 m-0'>Date</p></Col>
              <Col xs={12} md={6}><p className='fs-14 fw-400 m-0'>{props.startDate}</p></Col>
            </Row>
        }
       
        <Row className='details-wrapper'>
        <Col xs={12} md={3}><p className='fs-14 fw-600 m-0'>Time Period</p></Col>
              <Col xs={12} md={6}><p className='fs-14 fw-400 m-0'>{props.startDate} to {props.endDate}</p></Col>
            </Row>
            <Row className='details-wrapper'>
              <Col xs={12} md={3}><p className='fs-14 fw-600 m-0'>Week No</p></Col>
              <Col xs={12} md={6}><p className='fs-14 fw-400 m-0'>Week-{weekNumber}</p></Col>
            </Row>
            {!isOpenWorkSummaryModal && 
             <Row className='details-wrapper'>
              <Col xs={12} md={3}><p className='fs-14 fw-600 m-0'>Care Home</p></Col>
              <Col xs={12} md={6}><p className='fs-14 fw-400 m-0'>{CareHomeName}</p></Col>
            </Row>
            }
        </Col>
        <Col xs={24} md={12} className="icon-wrapper d-flex justify-end">
          <img className="cursor-pointer" src={Print} height={24} width={24} alt="print" />
          <img className="cursor-pointer" src={Download} height={24} width={25} alt="cloud" />
        </Col>
        <Col xs={24} md={24} style={{ margin: "1rem 0" }}>
          <div className="table-wrapper">
            <TableComponent InvoiceTimeSheet={InvoiceTimeSheet} isOpenWorkSummaryModal={isOpenWorkSummaryModal}/>
          </div>
        </Col>
        <Col xs={24} md={24}>
          <Row className='details-wrapper'>
            <Col xs={12} md={2}><p className='fs-14 fw-600 m-0'>{isOpenWorkSummaryModal ? "Shift Total Pay" :"Total Hours" }</p></Col>
            <Col xs={12} md={4}><p className='fs-14 fw-400 m-0'>{isOpenWorkSummaryModal && '£'} {Math.round(InvoiceTimeSheet?.totalHours)}</p></Col>
          
          </Row>
          <Row className='details-wrapper'>
        
            <Col xs={12} md={2}><p className='fs-14 fw-600 m-0'>{isOpenWorkSummaryModal ? "Total Pay for the Week" :"Total Receivable" } </p></Col>
            <Col xs={12} md={4}><p className='fs-14 fw-400 m-0'> £ {Math.round(InvoiceTimeSheet?.totalAmount)}</p></Col>
          </Row>
        </Col>

      </Row>
    </Modal>
  )
}

export default InvoiceStaffTimeSheetModal
