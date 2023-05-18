import React, { useState } from "react";
import { Col, Modal, Rate, Row, Select } from "antd";
import ProfileImg from "../../../../assets/images/ClientBookingCalendar/profile-img.png";
import { clientShiftSignOffData, } from "../../ClientManageShift.utils";
import "./Modal.scss";
import TextArea from "antd/es/input/TextArea";
import ConfirmAndSignOffModal from "./ConfirmAndSignOffModal";
import TimePickerWrapper from "../../../../shared/TimePickerWrapper/TimePickerWrapper";
import dayjs from "dayjs";
import { useAddSignOffShiftRatingMutation, useGetShiftAllocateMutation } from "../../../../store/Slices/ClientShiftManage";
import AppSnackbar from "../../../../utils/AppSnackbar";

const CompletedConfirmModal = (props: any) => {
  const { isCompletedModifyModal, setIsCompletedModifyModal, shiftIdData, onCancel } = props;
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [createConfirm] = useGetShiftAllocateMutation();
  const [addRating] = useAddSignOffShiftRatingMutation();
  const [shiftInformation, setShiftInformation] = useState({
    checkInTime: '',
    checkIn: '',
    checkOutTime: '',
    checkOut: '',
    modifyReason: '',
    rating: 0,
    review: ''
  });

  const getBackgroundColor = (item: any) => {
    if (item.label === "Check in Sign off") {
      return "#DAEFFF";
    } else if (item.label === "Date") {
      return "#AAFFDA";
    } else if (item.label === "Check In" || item.label === "Check Out") {
      return "#89C1F1";
    } else if (item.label === "Shift Timing") {
      return "#E7CEE7";
    } else if (item.label === "Total Shift Hours") {
      return "#FFD0D1";
    } else if (item.label === "Total Shift Pay") {
      return "#FFE7AE";
    } else if (item.label === "Extra Hours Worked") {
      return "#FCC7D3";
    } else if (item.label === "Department") {
      return "#DAEFFF";
    } else {
      return "";
    }
  }

  const handleShiftInformation = (val: any, type: string) => {
    setShiftInformation({ ...shiftInformation, [type]: val })
  }

  const handleCompletedConfirmShift = async () => {
    try {
      await createConfirm({
        staffShiftId: shiftIdData._id,
        modifyReason: shiftInformation.modifyReason,
        modifiedStart: `${dayjs(shiftIdData.shift.shiftDate).format('YYYY-MM-DD')}T${shiftInformation.checkInTime}`,
        modifiedEnd: `${dayjs(shiftIdData.shift.shiftDate).format('YYYY-MM-DD')}T${shiftInformation.checkOutTime}`,
        shiftStatus: 'SIGNEDOFF',
      }).unwrap();

      await addRating({
        carerId: shiftIdData?.carer._id,
        shiftId: shiftIdData._id,
        rating: shiftInformation.rating,
        feedback: shiftInformation.review
      }).unwrap();

      AppSnackbar({ type: "success", messageHeading: "Successfully Updated!", message: "Information updated successfully" });
      onCancel();
    } catch (error:any) {
      AppSnackbar({
        type: "error",
        messageHeading: "Error",
        message: error?.data?.message ?? "Something went wrong!",
      });
    }
   
  }

  const handleFirstModal = () => {
    setIsConfirmModalOpen(false);
    setIsCompletedModifyModal(true);
  }

  return (
    <>
      <Modal title="Shift Information" open={isCompletedModifyModal} onCancel={() => onCancel()} footer={false} className="confirm-modal-wrapper" width={850} centered>
        <div className="confirm-modal-content">
          <Row gutter={[20, 20]} align="middle" justify="center">
            <Col xl={8} lg={8} md={24} sm={24} xs={24}>
              <div className="profile-information text-center">
                <img src={`https://rnd-s3-public-dev-001.s3.eu-west-2.amazonaws.com/${shiftIdData?.carer?.profilePhoto?.mediaId}.${shiftIdData?.carer?.profilePhoto?.mediaMeta?.extension}`} alt="" />
                <h2 className="fs-16 fw-500 m-0 title-color">{`${shiftIdData?.carer?.firstName} ${shiftIdData?.carer?.lastName}`}</h2>
                <p className="fs-14 fw-400 m-0 light-grey-color">Health Care Assistant</p>
              </div>
            </Col>
            <Col xl={16} lg={16} md={16} sm={24} xs={24}>
              {clientShiftSignOffData.map((item) => (
                <div className="shift-info d-flex justify-between">
                  <div className="shift-icon-wrap d-flex align-center">
                    <div
                      className="shift-item-img d-flex align-center justify-center"
                      style={{ background: getBackgroundColor(item) }}
                    >
                      <img src={item.icon} alt="" />
                    </div>
                    <h2 className="fs-14 fw-600 line-height-18 form-heading-color m-0">{`${item.label}:`}</h2>
                  </div>
                  <div className="shifts-title">
                    {item.label === "Check In" && (
                      <div className="shift-modify-value d-flex align-center">
                        <TimePickerWrapper placeholder="00:00:00" size="small" format="hh:mm:ss" onChange={(e: any) => handleShiftInformation(dayjs(e).format('hh:mm:ss'), 'checkInTime')} />
                        <Select
                          size="small"
                          defaultValue={['AM']}
                          options={[
                            { id: "1", label: "PM", value: "PM" },
                            { id: "2", label: "AM", value: "AM" },
                          ]}
                          onChange={(e: any) => handleShiftInformation(e, 'checkIn')}
                        />
                      </div>
                    )}
                    {item.label === "Check Out" && (
                      <div className="shift-modify-value d-flex align-center">
                        <TimePickerWrapper placeholder="00:00:00" size="small" format="hh:mm:ss" onChange={(e: any) => handleShiftInformation(dayjs(e).format('hh:mm:ss'), 'checkOutTime')} />
                        <Select
                          size="small"
                          defaultValue={['PM']}
                          options={[
                            { id: "1", label: "PM", value: "PM" },
                            { id: "2", label: "AM", value: "AM" },
                          ]}
                          onChange={(e: any) => handleShiftInformation(e, 'checkOut')}
                        />
                      </div>
                    )}
                    <p className="fs-14 fw-400 title-color m-0">{item?.value(shiftIdData)}</p>
                  </div>
                </div>
              ))}
            </Col>
          </Row>
          <div className="shift-textarea-wrapper shift-textare-content bg-white">
            <div className="shift-modify-wrap">
              <label className="label-color fs-14 fw-600 m-0">Check in Modify Reason</label>
              <TextArea rows={3} placeholder="Type here" onChange={(e: any) => handleShiftInformation(e.target.value, 'modifyReason')} />
            </div>
            <div className="shift-rating-wrapper">
              <p className="form-heading-color fs-16 fw-500 line-height-24 m-0">Rate this shift</p>
              <Rate defaultValue={shiftInformation?.rating} allowHalf style={{ color: "#FABF35" }} onChange={(e: any) => handleShiftInformation(e, 'rating')} />
            </div>
            <div>
              <label className="label-color fs-14 fw-600 m-0">Leave a review</label>
              <TextArea rows={3} placeholder="Type here" onChange={(e: any) => handleShiftInformation(e.target.value, 'review')} />
            </div>
          </div>
          <div className="shift-btn-wrapper d-flex align-center" style={{ paddingTop: "30px" }}>
            <button type="button" className="cancel-btn fs-16 fw-600 white-color m-0 cursor-pointer" onClick={() => onCancel()}>
              Cancel
            </button>
            <button type="submit" className="confirm-btn fs-16 fw-600 white-color m-0 cursor-pointer" onClick={() => {
              setIsConfirmModalOpen(true);
              setIsCompletedModifyModal(false)
            }}>
              Confirm and Sign Off
            </button>
          </div>
        </div>
      </Modal>
      <ConfirmAndSignOffModal open={isConfirmModalOpen} onCancel={() => handleFirstModal()} ConfirmButton={handleCompletedConfirmShift} heading={'Are you sure you want to sign off this shift’s (Modified) Check in and Check out time'} CancelButton={() => handleFirstModal()} />
    </>
  );
};

export default CompletedConfirmModal;
