import { Fragment, useState } from "react";
import { Button, Col, Modal, Row } from "antd";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import ChangeShiftModal from "../ChangeShiftModal/ChangeShiftModal";
import CancellationModal from "../CancellationModal/CancellationModal";
import MockUser from "../../../../assets/BookingCalander/images/mock-user.png";
import DateIcon from "../../../../assets/BookingCalander/images/date.png";
import Ribbon from "../../../../assets/BookingCalander/images/ribbon.png";
import Close from '../../../../assets/images/OnBoarding/Close.svg';
import ReallocateModal from "../ReallocateModal/ReallocateModal";
import ModifyStaffRequirement from "../../../ShiftManager/ShiftBooking/ShiftsModals/ModifyStaffRequirement/ModifyStaffRequirement";
import { useCancelShiftMutation, useModifyShiftStaffMutation } from "../../../../store/Slices/BookingCalendar";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import "./ShiftInfo.scss";
import AppSnackbar from "../../../../utils/AppSnackbar";

function ShiftInfo(props: any) {
  const { isInfoModalOpen, setIsInfoModalOpen } = props;
  const eventStatus = isInfoModalOpen?.data?.event?._def?.extendedProps?.status;
  const navigate = useNavigate();
  dayjs.extend(utc)

  const shiftDetails = isInfoModalOpen?.data?.event?._def?.extendedProps;

  const [isReallocateModalOpen, setIsReallocateModalOpen] = useState(false);
  const [isChangeShiftTimeOpen, setIsChangeShiftTimeOpen] = useState(false);
  const [isCancellationModalOpen, setIsCancellationModalOpen] = useState(false);
  const [isModifyStaffModalOpen, setIsModifyStaffModalOpen] = useState<boolean>(false);
  const [cancellationErrorMsg, setCancellationErrorMsg] = useState("");
  const [count, setCount] = useState<any>(shiftDetails?.staffRequired);

  const [modifyShift, { isLoading: loading }] = useModifyShiftStaffMutation()
  const [cancelShift, { isLoading, isSuccess }] = useCancelShiftMutation()

  const shiftInfoMock = [
    { heading: "Posted At", detail: dayjs(shiftDetails?.createdAt)?.utc().format('DD/MM/YYYY') },
    { heading: "Requested by", detail: shiftDetails?.requestedBy },
    { heading: "Entered by", detail: shiftDetails?.requestedBy },
    { heading: "Start Time", detail: dayjs(shiftDetails?.shiftStartTime)?.utc().format('hh:mm a') },
    { heading: "End Time", detail: dayjs(shiftDetails?.shiftEndTime)?.utc().format('hh:mm a') },
    { heading: "Staff List", detail: shiftDetails?.shiftStaff },
  ];

  const handleModifyShift = async () => {
    const { data }: any = await modifyShift({
      id: shiftDetails?._id,
      payload: { staffRequired: count },
    });
    if (data) setIsModifyStaffModalOpen(loading)
  }


  //Cancel Shift function

  const handleCancelShift = async (reason: any) => {
    const { error }: any = await cancelShift({
      id: isInfoModalOpen?.data?.event?._def?.extendedProps?._id,
      reason,
    });
    if (error) setCancellationErrorMsg(error?.data?.message)
    if (!error) setIsCancellationModalOpen(false); setIsInfoModalOpen(false) 
    AppSnackbar({ type: "success", messageHeading: "Success!", message: "Shift  sucessfully" });
  }

  return (
    <>
      <Modal
        closeIcon={< img src={Close} alt="close" />}
        centered
        width={791}
        title={<span className="fs-20 fw-600">Shift Information</span>}
        footer={false}
        className="shift-info"
        open={isInfoModalOpen}
        onCancel={() => {
          setIsInfoModalOpen(false);
        }}
      >
        <Row>
          <Col xs={24} sm={24} md={12} className="main-content">
            <img src={MockUser} alt="mock_user" />
            <h3 className="fs-20 fw-500 m-0">{shiftDetails?.careHome?.clientName}</h3>
            <div className="detail-wrapper d-flex">
              <img src={Ribbon} alt="ribbon" />
              <span className="fs-12 fw-500">{shiftDetails?.shiftType}</span>
            </div>
            <div className="detail-wrapper d-flex align-items-center">
              <img src={DateIcon} alt="date" />
              <span className="fs-12 fw-500">{dayjs(shiftDetails?.shiftDate).format('DD/MM/YYYY')}</span>
            </div>
          </Col>
          <Col xs={24} sm={24} md={12} >
            <Row className="details-content">
              {shiftInfoMock.map((data) => {
                return (
                  <Fragment key={uuidv4()}>
                    <Col xs={12} md={10} className="fs-14 fw-600 text-left">
                      {data.heading}:
                    </Col>
                    <Col style={{textTransform:"capitalize"}} title={data.heading === 'Staff List' ? data?.detail?.map((user: any) => (`${user?.staff?.firstName} ${user?.staff?.lastName}`)) : data.detail} xs={12} md={10} className='text-end'>
                      {data.heading === 'Staff List' ? data?.detail?.slice(0, 3)?.map((user: any) => (`${user?.staff?.firstName} ${user?.staff?.lastName}, `)) : data.detail}
                    </Col>
                  </Fragment>
                );
              })}
            </Row>
          </Col>
        </Row>
        <Row>
          {eventStatus !== "COMPLETED" && (
            <Col xs={24} className="btn-wrapper d-flex">
              {(eventStatus === "UNPUBLISHED" || eventStatus === "PUBLISHED") ? <Button type="primary" onClick={() => navigate(`/unpublished-shift/book-staff`, { state: { careHomeId: shiftDetails?.careHomeId, shiftDate: shiftDetails?.shiftDate, shiftId: shiftDetails?._id } })} className="alocate-shift-btn fs-14 fw-600">Allocate Shift</Button> :
                <Button
                  type="primary"
                  className="relocate-shift-btn fs-14 fw-600"
                  onClick={() => {
                    setIsReallocateModalOpen(true);
                  }}
                >
                  Reallocate Shift
                </Button>}
              {
                <Button
                  type="primary"
                  className="modify-num-btn  fs-14 fw-600"
                  onClick={() => {
                    setIsModifyStaffModalOpen(true);
                  }}
                >
                  Modify Number
                </Button>
              }
              {
                <Button
                  type="primary"
                  className="change-shift-btn  fs-14 fw-600"
                  onClick={() => {
                    setIsChangeShiftTimeOpen(true);
                  }}
                >
                  Change Shift Time
                </Button>
              }
              {eventStatus !== "UNPUBLISHED" &&
                <Button
                  type="primary"
                  className="cancel-shift-btn  fs-14 fw-600"
                  onClick={() => {
                    setIsCancellationModalOpen(true);
                  }}
                >
                  Cancel Shift
                </Button>
              }
            </Col>
          )}
        </Row>
      </Modal>
      {isReallocateModalOpen && (
        <ReallocateModal
          isReallocateModalOpen={isReallocateModalOpen}
          setIsReallocateModalOpen={setIsReallocateModalOpen}
          shiftDetails={shiftDetails}
        />
      )}
      {isChangeShiftTimeOpen && (
        <ChangeShiftModal
          isChangeShiftTimeOpen={isChangeShiftTimeOpen}
          setIsChangeShiftTimeOpen={setIsChangeShiftTimeOpen}
          shiftDetails={shiftDetails}
        />
      )}
      {isCancellationModalOpen && (
        <CancellationModal
          isCancellationModalOpen={isCancellationModalOpen}
          setIsCancellationModalOpen={setIsCancellationModalOpen}
          handleCancelShift={handleCancelShift}
          isLoading={isLoading}
          errorMsg={cancellationErrorMsg}
          isSuccess={isSuccess}
          setIsInfoModalOpen={setIsInfoModalOpen}
        />
      )}
      {isModifyStaffModalOpen && (
        <ModifyStaffRequirement
          open={isModifyStaffModalOpen}
          onCancel={() => setIsModifyStaffModalOpen(false)}
          counter={count}
          setCounter={setCount}
          onSave={handleModifyShift}
        />
      )}
      {/* {isCancelShiftModalOpen && 
      <DeleteModal deleteModal={isCancelShiftModalOpen} title="Are you sure you want to Cancel this Shift" 
      submitTitle="Yes" cancelTitle="No" setDeleteModal={setIsCancelShiftModalOpen} 
      onSubmit={()=>setIsCancelShiftModalOpen(false)} onCancel={()=>setIsCancelShiftModalOpen(false)}/>} */}
    </>
  );
}

export default ShiftInfo;
