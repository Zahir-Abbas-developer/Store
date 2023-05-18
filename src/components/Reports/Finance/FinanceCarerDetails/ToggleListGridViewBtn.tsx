import ListIcon from "../../../../assets/icons/finance-setup/listIcon.png";
import GroupIcon from "../../../../assets/icons/finance-setup/groupIcon.png";

const ToggleListGridViewBtn = ({ toggle, setToggle }: any) => {
  return (
    <div className="invoice-grid-button">
    <button
      className="d-flex align-center cursor-pointer"
      style={{ maxWidth: "60px", backgroundColor: "#FAAD14", padding: "8px 20px", border: "none", borderRadius: "4px" }}
      onClick={() => setToggle(!toggle)}
    >
      <img src={toggle ? GroupIcon : ListIcon} alt="listIcon" height={20} width={20} />
    </button>
    </div>
  );
};

export default ToggleListGridViewBtn;
