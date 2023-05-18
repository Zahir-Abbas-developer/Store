import { Modal } from "antd";
import UndoWhiteIcon from "../../../../../assets/images/manageShift/undoWhiteIcon.png";
import UndoGreyIcon from "../../../../../assets/images/manageShift/undoGreyIcon.png";
import IncrementIcon from "../../../../../assets/icons/ShiftManger/incrementIcon.svg";
import DecrementIcon from "../../../../../assets/icons/ShiftManger/decrement-icon.svg";
import DecrementGreyIcon from "../../../../../assets/icons/ShiftManger/decrement-grey-icon.svg";
import Close from "../../../../../assets/images/OnBoarding/Close.svg";
import "./ModifyStaffRequirement.scss";
import { useRef } from "react";

const ModifyStaffRequirement = (props: any) => {
  const { open, onCancel, counter, setCounter, onSave } = props;
  const getInitialCounterValue = useRef(counter);
  
  

  return (
    <>
      <Modal
        className="modify-staff-requirement-modal"
        open={open}
        onCancel={onCancel}
        width={500}
        footer={false}
        closeIcon={<img src={Close} alt="close" />}
      >
        <div className="modify-staff-content">
          <h2 className="fs-24 fw-600 m-0 line-height-32 text-center">Modify staff requirements</h2>
          <div className="modify-staff-counter w-100 d-flex align-center justify-between">
            <div
              className={`${
                counter > 0 ? "modify-decrement-count" : "modify-decrement-count-hover"
              } modify-count d-flex align-center justify-center cursor-pointer`}
              onClick={() => (counter > 0 ? setCounter(counter - 1) : "")}
            >
              <img src={`${counter > 0 ? DecrementGreyIcon : DecrementIcon}`} alt="" />
            </div>
            <h2 className="m-0">{counter}</h2>
            <div
              className="modify-increment-count modify-count d-flex align-center justify-center cursor-pointer"
              onClick={() => setCounter(counter + 1)}
            >
              <img src={IncrementIcon} alt="" />
            </div>
          </div>
          <div className="modify-staff-btn d-flex flex-column text-center">
            <button
              type="button"
              className="d-flex align-center justify-center fs-20 fw-400 line-height-22 cursor-pointer reset-btn"
              style={{
                backgroundColor: counter > 0 ? "#65CDF0" : "#EFF0F7",
                color: counter > 0 ? "#fff" : "#C7C7C7",
              }}
              onClick={() => setCounter(getInitialCounterValue.current)}
            >
              {" "}
              <img src={`${counter > 0 ? UndoWhiteIcon : UndoGreyIcon}`} alt="" /> Reset
            </button>
            <button onClick={onSave} type="submit" className="fs-16 fw-500 line-height-22 cursor-pointer save-btn">
              Save
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModifyStaffRequirement;
