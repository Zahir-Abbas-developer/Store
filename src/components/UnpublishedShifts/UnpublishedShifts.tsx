import { Col, Input, Row } from "antd";

import UnpublishedTable from "./Table/UnpublishedTable";
import SearchIcon from "../../assets/icons/Search.png";
import "./UnpublishedShifts.scss";
import { useState } from "react";
import { debouncedSearch } from "../../utils/utils";
import BreadCrumb from "../../layout/BreadCrumb/BreadCrumb";

const UnpublishedShifts = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedResults: any = (event: any) => {
    const { value } = event.target;
    debouncedSearch(value, setSearchTerm);
  };

  //BreadCrumb Items
  const breadCrumbItems = [
    {
      title: "Unpublished Shifts",
      path: "",
    },
    {
      title: "Dashboard",
      path: "/dashboard",
    },
  ];

  return (
    <>
    <BreadCrumb breadCrumbItems={breadCrumbItems} />
      <div className="unpublished-wrapper">
        <p className="description fs-14 fw-400">
          This Section captures and lists all the shift requests from your clients (shifts that are
          not yet posted to allocated staff) so you can decide to directly assign them to your
          preferred staff, or post to all allocated staff from this page
        </p>
        <Row className="search-bar">
          <Col xs={24} md={6}>
            <div className="input-search-wrapper">
              <Input
                onChange={debouncedResults}
                placeholder="Search by client name"
                prefix={<img src={SearchIcon} alt="search icon" className="icon" />}
              />
            </div>
          </Col>
        </Row>
        <div className="unpublished-table">
          <UnpublishedTable searchTerm={searchTerm} />
        </div>
      </div>
    </>
  );
};

export default UnpublishedShifts;
