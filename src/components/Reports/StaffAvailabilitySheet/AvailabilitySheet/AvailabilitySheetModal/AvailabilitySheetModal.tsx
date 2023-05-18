import { Modal } from "antd";
import dayjs from "dayjs";
import "./AvailabilitySheetModal.scss";
import { usePostStaffAvailabilitySheetModalMutation } from "../../../../../store/Slices/Reports";
import { useState } from "react";
import AppSnackbar from "../../../../../utils/AppSnackbar";
import CloseIcon from "../../../../../assets/icons/close-icon.svg";


const AvailabilitySheetModal = (props: any) => {
  const [isShiftChange, setIsShiftChange] = useState<boolean>(true);
  let [shiftType, setSiftType]: any = useState<any>({});
 
  const [staffAvailabilitySubmit] =
    usePostStaffAvailabilitySheetModalMutation();
  const {
    isAvailability,
    setIsAvailability,
    shiftDate,
    availability,
    staffSummaryDetails,
  } = props;
  let availabilityData: any;
  if (!availabilityData) {
    availability?.includes("LONGDAY") && (shiftType.LONGDAY = "LONGDAY");
    availability?.includes("MORNING") && (shiftType.MORNING = "MORNING");
    availability?.includes("AFTERNOON") && (shiftType.AFTERNOON = "AFTERNOON");
    availability?.includes("NIGHT") && (shiftType.NIGHT = "NIGHT");
    availabilityData = availability;
  }
  const handleShift = (type: string) => {
    const res = shiftType[type]
      ? delete shiftType[type]
      : (shiftType[type] = type);
    setIsShiftChange(!isShiftChange);
    return(res);
  };

  const useHandleSendEmailSubmit = async () => {
    try {
      const availableShift = Object.keys(shiftType).toString();
      await staffAvailabilitySubmit({
        userId: staffSummaryDetails?._id,
        availabilityDate: shiftDate,
        availableShift,
      }).unwrap();
      AppSnackbar({
        type: "success",
        messageHeading: "Sucessfully Updated!",
        message: "Shift availability status updated sucessfully",
      });
      setIsAvailability(false);
    } catch (error: any) {
      AppSnackbar({
        type: "error",
        messageHeading: "Error",
        message: error?.data?.message ?? "Something went wrong!",
      });
    }
  };
  const handleCloseModal = () => {
    setIsAvailability(false);
    setSiftType({});
    availabilityData = undefined;
    setIsShiftChange(!isShiftChange);
  };

  return (
    <Modal
      title={`Select ${staffSummaryDetails?.fullName} Availability`}
      centered
      open={isAvailability}
      onCancel={handleCloseModal}
      onOk={handleCloseModal}
      footer={false}
      width={550}
      className="availability-modal-wrapper"
      closeIcon={<img src={CloseIcon} alt="" />}
    >
      
      <div className="availability-modal-content">
        
        <div
          className="availability-date d-flex align-center"
          style={{ gap: "5px" }}
        >
          
          <h3 className="m-0 fs-14 fw-600 line-height-17">
            
            Availability Date:
          </h3>
          <p className="m-0 fs-14 fw-500 line-height-17">
            
            {dayjs(shiftDate).format("DD-MM-YYYY")}
          </p>
        </div>
        <div className="select-availability-modal">
          
          <h3
            className="m-0 fs-14 fw-600 line-height-17"
            style={{ paddingBlock: "30px" }}
          >
            
            Select Availability
          </h3>
          <div
            className="weather-update-wrapper d-flex align-item-center"
            style={{ gap: "45px", cursor: "pointer" }}
          >
            
            <div>
              
              <div
                onClick={() => handleShift("LONGDAY") }
                className={`${
                  shiftType?.LONGDAY && "long-day-active"
                } long-day`}
              ></div>
              <div>
                <p className="m-0 fs-14 fw-400" style={{ color: "#A0A3BD" }}>
                  Long Day
                </p>
              </div>
            </div>
            <div>
              
              <div
                onClick={() => handleShift("MORNING")}
                className={`am-update d-flex justify-center align-center ${
                  shiftType?.MORNING && "Morning-active"
                }`}
              >
                
                <h3 className="m-0 fs-20 fw-500 line-height-17">A M</h3>
              </div>
              <p className="m-0 fs-14 fw-400" style={{ color: "#A0A3BD" }}>
                Morning
              </p>
            </div>
            <div>
              
              <div
                onClick={() => handleShift("AFTERNOON")}
                className={`pm-update d-flex justify-center align-center ${
                  shiftType?.AFTERNOON && "Afternoon-active"
                }`}
              >
                
                <h3 className="m-0 fs-20 fw-500 line-height-17">P M</h3>
              </div>
              <p className="m-0 fs-14 fw-400" style={{ color: "#A0A3BD" }}>
                Afternoon
              </p>
            </div>
            <div>
              
              <div
                onClick={() => handleShift("NIGHT")}
                className={`${shiftType?.NIGHT && "active-moon"} moon-update`}
              ></div>
              <p className="m-0 fs-14 fw-400" style={{ color: "#A0A3BD" }}>
                Night
              </p>
            </div>
          </div>
        </div>
        <div className="d-flex availability-modal-btn">
          
          <button
            type="button"
            className="cancel-btn cursor-pointer fs-16 line-height-22 white-color fw-600"
          >
            
            Cancel
          </button>
          <button
            type="submit"
            className="save-btn cursor-pointer fs-16 line-height-22 white-color fw-600"
            onClick={useHandleSendEmailSubmit}
          >
            
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AvailabilitySheetModal;