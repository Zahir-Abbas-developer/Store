import medalIcon from "../../../../assets/icons/carerDashboard/medal.png";

const accomplishmentData = [
  {
    icon: medalIcon,
    title: "Health & Safeguarding",
  },
  {
    icon: medalIcon,
    title: "First Aid Training",
  },
  {
    icon: medalIcon,
    title: "First Aid Training",
  },
];

const Accomplishment = () => {
  return (
    <div className="accomplishment-card">
      <h1 className="title">Accomplishment</h1>
      <div className="accomplishment-list">
        {accomplishmentData.map((item: any) => (
          <div className="item">
            <img src={item?.icon} alt="" />
            <p>{item?.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accomplishment;
