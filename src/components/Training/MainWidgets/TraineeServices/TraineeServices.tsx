import myResults from "../../../../assets/icons/training/my-results.png";
import myNotes from "../../../../assets/icons/training/my-notes.png";
import myCourses from "../../../../assets/icons/training/my-courses.png";
import { Link } from "react-router-dom";

const myServices: any = [
  { icon: myResults, title: "My Results", link: "/training/my-results" },
  { icon: myNotes, title: "My Notes", link: "/training/my-notes" },
  { icon: myCourses, title: "My Courses", link: "/training/my-courses" },
];

const TraineeServices = () => {
  return (
    <div className="trainee-services-card">
      <h1 className="title fs-20 fw-500">Trainee Services</h1>
      <div className="services">
        {myServices.map((service: any) => (
          <Link to={service.link} key={service.title} className="service">
            <img src={service.icon} alt="" />
            <p>{service.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TraineeServices;
