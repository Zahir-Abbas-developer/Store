
import Tick from "../../../assets/icons/unpublishedShift/tick.png";
import Cross from "../../../assets/icons/unpublishedShift/cross.png";
import Profile from "../../../assets/icons/unpublishedShift/profile.png";

const BookingCard = ({ card, onConfirm, onAllocate }: any) => {
  const tags: any = [
    { title: "LONGDAY", icon: Tick },
    { title: "MORNING", icon: Cross },
    { title: "AFTERNOON", icon: Cross },
    { title: "NIGHT", icon: Cross },
  ];

  const availAbleShifts = card?.shifts?.map((shift:any) => shift.availableShift)

  return (
    <div className="staff-card">
      <div className="card-header">
        <div className="user-info">
          <img src={Profile} alt="profile" />
          <div style={{ marginLeft: "10px" }}>
            <h2 className="user-name">{card?.userName}</h2>
            <p className="user-role">{card?.userTypeshortForm}</p>
          </div>
        </div>
        <div>
          <p className="total-shift">
            Total Shifts: <span>{card?.total < 10 ? `0${card?.total}` : card?.total}</span>
          </p>
        </div>
      </div>
      <div className="tags">
        {tags?.map((item: any,i:number) => (
          <div className="tag" key={i}>
            <img src={availAbleShifts.includes(item?.title) ? Tick : Cross} alt="" />
            <p>{item?.title}</p>
          </div>
        ))}
      </div>
      <div className="card-btn">
        <button onClick={onConfirm} className="btn confirm">
          Request Confirmation
        </button>
        <button onClick={onAllocate} className="btn allocate">
          Allocate
        </button>
      </div>
    </div>
  );
};

export default BookingCard;
