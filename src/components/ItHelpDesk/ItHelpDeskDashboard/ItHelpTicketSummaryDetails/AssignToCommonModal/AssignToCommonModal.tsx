import { Button, Modal } from "antd";
import CrossIcon from "../../../../../assets/icons/ManageUser/cross-icon.svg";
import "./AssignToCommonModal.scss";

const AssignToCommonModal = ({
  assignToModal,
  setAssignToModal,
  assignList,
  setAssignList,
  handleAssignTo,
  assignToListData,
}: any) => {

  return (
    <Modal
      className="wrap-assign-to"
      wrapClassName="wrap-assign"
      title={<span style={{ fontWeight: "600px", fontSize: "20px", color: "#6E7191" }}>Assign To</span>}
      open={assignToModal}
      width={693}
      centered
      onCancel={() => {
        setAssignToModal(false);
        setAssignList({});
      }}
      footer={null}
      closeIcon={<img src={CrossIcon} alt="CrossIcon" height={16} width={16} />}
    >
      <div style={{ padding: "10px", marginBottom: "30px", border: " 1.5px solid #D9DBE9", color: assignList ? "#000" : "rgb(110, 113, 145)" }}>
        {assignList ? `${assignList?.firstName} ${assignList?.lastName}` : "No Item selected"}
      </div>
      <ul style={{ height: "30rem", overflowY: "scroll" }}>
        {assignToListData &&
          assignToListData?.data?.map((item: any, index: number) => {
            return (
              <li
                key={index}
                className="fs-14 fw-400 title-color assign-list-hover"
                style={{ marginBottom: "15px", cursor: "pointer" }}
                onClick={() => setAssignList(item)}
              >
                {item?.firstName + " " + item?.lastName}
              </li>
            );
          })}
      </ul>
      <div className="d-flex" style={{ marginTop: "30px", gap: "3px", flexWrap: "wrap" }}>
        <Button
          className="assign-btn"
          style={{ backgroundColor: "#4E132C", color: "white" }}
          onClick={() => {
            setAssignToModal(false);
            setAssignList({});
          }}
        >
          Cancel
        </Button>
        <Button className="assign-btn" style={{ backgroundColor: "#4AD1FE", color: "white" }} onClick={handleAssignTo}>
          Assign
        </Button>
      </div>
    </Modal>
  );
};

export default AssignToCommonModal;
