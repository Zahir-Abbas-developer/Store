import React from "react";
import { staffContacts } from "../../../../mock/StaffManagerMock";
import callIcon from "../../../../assets/images/staffManager/phoneContact.png";
import mailIcon from "../../../../assets/images/staffManager/mailContact.png";
import mapIcon from "../../../../assets/images/staffManager/locationContact.png";
import "./StaffContactCard.scss";

const StaffContactCard = ({ staffData }: any) => {
  return (
    <>
      <div className="staff-contact-card-wrapper">
        <h4 className="fs-20 fw-500 line-height-28 title-color m-0" style={{ paddingTop: "10px" }}>
          Contact
        </h4>
        {staffData?.data?.result?.map((item: any) => (
          <>
            <div className="staff-contact-data d-flex align-center">
              <img src={callIcon} alt="contacts-img" />
              <span>{item.phone}</span>
            </div>
            <div className="staff-contact-data d-flex align-center">
              <img src={mailIcon} alt="contacts-img" />
              <span>{item.email}</span>
            </div>
            <div className="staff-contact-data d-flex align-center">
              <img src={mapIcon} alt="contacts-img" />
              <span>{item.address}</span>
            </div>
          </>
        ))}
      </div>
    </>
  );
};
export default StaffContactCard;