import ractangleIcon from "../../../../assets/icons/carerDashboard/Rectangle.png";

const skillsData = [
  {
    icon: ractangleIcon,
    title: "Strong Communication Skill",
  },
  {
    icon: ractangleIcon,
    title: "Manage Digital Information",
  },
];

const Skills = () => {
  return (
    <div className="skills-card">
      <h2 className="title">Skills</h2>
      <div className="skills">
        {skillsData.map((item: any) => (
          <div className="item">
            <img src={item?.icon} alt="" />
            <p>{item?.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
