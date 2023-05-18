import { Col, Modal, Row } from 'antd';
import MainLogo from "../../../../../assets/brand/Logo.png";
import Print from "../../../../../assets/icons/finance-setup/print.png";
import Download from "../../../../../assets/icons/finance-setup/download.png";
import Close from '../../../../../assets/images/OnBoarding/Close.svg';
import TableComponent from './CarerTimeSheetTable';
import "./CarerTimeSheetModal.scss"

function CarerTimeSheetModal(props:any) {
  const {isOpenTimeSheetModal, setIsOpenTimeSheetModal,timePeriodDates} = props;

  const tableHeaderDetails =[
    {heading:"Time Period",details:timePeriodDates?.startDate +" to " + timePeriodDates?.endDate },
    {heading:"Week No",details:`Week ${timePeriodDates?.weekNumber}`},
    {heading:"Care Home",details:"Risby Park"}
  ]
  const tableFooterDetails=[
    {heading:"Total Hours",details:Math.round(props?.financeCarerTimeSheetReports?.data?.totalHours)  },
    {heading:"Total Receivable",details:`£${props?.financeCarerTimeSheetReports?.data?.totalAmount}`},
  ]

  return (
      <Modal className='invoice-modal' title={<img src={MainLogo} alt="main-logo"/>} closeIcon={< img src={Close} alt="close-icon" />}
       footer={false} open={isOpenTimeSheetModal} onOk={()=>{setIsOpenTimeSheetModal(false)}} onCancel={()=>{setIsOpenTimeSheetModal(false)}}
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
              <TableComponent financeCarerTimeSheetReports={props?.financeCarerTimeSheetReports?.data?.result} />
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
      </Modal>
  )
}

export default CarerTimeSheetModal
