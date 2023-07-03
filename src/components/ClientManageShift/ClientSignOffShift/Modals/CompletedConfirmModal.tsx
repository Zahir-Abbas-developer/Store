import React, { useState } from "react";
import { Col, Modal, Rate, Row } from "antd";
import ProfileImg from "../../../../assets/images/ClientBookingCalendar/profile-img.png";
import { clientShiftConfirmData, } from "../../ClientManageShift.utils";
import "./Modal.scss";
import TextArea from "antd/es/input/TextArea";
import { useAddSignOffShiftRatingMutation, useGetShiftAllocateMutation } from "../../../../store/Slices/ClientShiftManage";
import AppSnackbar from "../../../../utils/AppSnackbar";

const CompletedConfirmModal = (props: any) => {
  const { isCompletedConfirmModal, setIsCompletedConfirmModal, shiftIdData, onCancel } = props;
  const [ratingValue, setRatingValue] = useState({
    rating: 0,
    review: ''
  })
  const [createConfirm] = useGetShiftAllocateMutation();
  const [addRating] = useAddSignOffShiftRatingMutation();

  const getItemBackgroundColor = (itemId: any) => {
    if (itemId === "Date") {
      return "#AAFFDA";
    } else if (itemId === "Shift Timing") {
      return "#E7CEE7";
    } else if (itemId === "Check In/Check Out Time:") {
      return "#89C1F1";
    } else if (itemId === "Total Shift Hours") {
      return "#FFD0D1";
    } else if (itemId === "Total Shift Pay") {
      return "#FFE7AE";
    } else if (itemId === "Extra Hours Worked") {
      return "#FCC7D3";
    } else if (itemId === "Department") {
      return "#DAEFFF";
    } else {
      return "";
    }
  }

  const handleModalShift = (val: any, type: string) => {
    setRatingValue({ ...ratingValue, [type]: val })
  }

  const handleCompletedShift = async () => {
    try {
      await createConfirm({ staffShiftId: shiftIdData._id, shiftStatus: 'SIGNEDOFF' }).unwrap();
      await addRating({ carerId: shiftIdData?.carer._id, shiftId: shiftIdData._id, rating: ratingValue.rating, feedback: ratingValue.review }).unwrap();
      AppSnackbar({ type: "success", messageHeading: "Successfully Updated!", message: "Information updated successfully" });
      onCancel();


    } catch (error: any) {
      AppSnackbar({
        type: "error",
        messageHeading: "Error",
        message: error?.data?.message ?? "Something went wrong!",
      });
    }
  }


  return (
    <>
      <Modal title="Shift Information" open={isCompletedConfirmModal} onCancel={() => onCancel()} footer={false} className="confirm-modal-wrapper" width={850} centered maskClosable={false}>
        <div className="confirm-modal-content">
          <Row gutter={[20, 20]} align="middle" justify="center">
            <Col xl={8} lg={8} md={24} sm={24} xs={24}>
              <div className="profile-information text-center">
                <img src={`https://rnd-s3-public-dev-001.s3.eu-west-2.amazonaws.com/${shiftIdData?.carer?.profilePhoto?.mediaId}.${shiftIdData?.carer?.profilePhoto?.mediaMeta?.extension}`} alt="" />
                <h2 className="fs-16 fw-500 m-0 title-color">{`${shiftIdData?.carer?.firstName} ${shiftIdData?.carer?.lastName}`}</h2>
                <p className="fs-14 fw-400 m-0 light-grey-color">{shiftIdData?.careHome?.clientType}</p>
              </div>
            </Col>
            <Col xl={16} lg={16} md={16} sm={24} xs={24}>
              {clientShiftConfirmData.map((item) => (
                <div className="shift-info d-flex justify-between">
                  <div className="shift-icon-wrap d-flex align-center">
                    <div
                      className="shift-item-img d-flex align-center justify-center"
                      style={{ background: getItemBackgroundColor(item.label) }}>
                      <img src={item.icon} alt="" />
                    </div>
                    <h2 className="fs-14 fw-600 line-height-18 form-heading-color m-0">{item.label}</h2>
                  </div>
                  <div className="shifts-title">
                    <p className="fs-14 fw-400 title-color m-0">{item?.value(shiftIdData)}</p>
                  </div>
                </div>
              ))}
            </Col>
          </Row>
          <div className="shift-textarea-wrapper shift-textare-content bg-white">
            <div className="shift-rating-wrapper">
              <p className="form-heading-color fs-16 fw-500 line-height-24 m-0">Rate this shift</p>
              <Rate defaultValue={ratingValue.rating} allowHalf style={{ color: "#FABF35" }} onChange={(e) => handleModalShift(e, 'rating')} />
            </div>
            <label className="label-color fs-14 fw-600 m-0">Leave a review</label>
            <TextArea rows={3} placeholder="Type here" onChange={(e) => handleModalShift(e.target.value, 'review')} />
          </div>
          <div className="shift-btn-wrapper d-flex align-center" style={{ paddingTop: "30px" }}>
            <button type="button" className="cancel-btn fs-16 fw-600 white-color m-0 cursor-pointer" onClick={() => onCancel()}>
              Cancel
            </button>
            <button type="submit" className="confirm-btn fs-16 fw-600 white-color m-0 cursor-pointer" onClick={() => handleCompletedShift()}>
              Confirm and Sign Off
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CompletedConfirmModal;
