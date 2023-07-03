import { Fragment, useState } from "react";
import { Button, Col, Input, Row, Select } from "antd";
import StaffCodeFilters from "./StaffCodeFilters";
import StaffCodeTable from "./StaffCodeTable";
import ImportStaffCodeModal from "./ImportStaffCodeModal";
import DownArrowSmall from "../../../../assets/icons/finance-setup/downArrowSmall.png";
import Search from "../../../../assets/icons/Search.png";
import "./StaffCodeSetup.scss";

const filterNumberOptions = [
  { value: "10", label: "10" },
  { value: "20", label: "20" },
  { value: "30", label: "30" },
  { value: "40", label: "40" },
  { value: "50", label: "50" },
  { value: "60", label: "60" },
  { value: "70", label: "70" },
  { value: "80", label: "80" },
  { value: "90", label: "90" },
  { value: "100", label: "100" },
];

const StaffCodeSetup = () => {
  const [isImportStaff, setIsImportStaff] = useState(false);
  return (
    <Fragment>
      <div className="staff-code-setup">
          <Button
            type="primary"
            className="border-radius-2"
            onClick={() => setIsImportStaff(true)}
          >
            Import Staff Code
          </Button>
          <div
            style={{
              background: "white",
              borderRadius: "8px",
              padding: "4rem 15px 2.5rem",
              marginBlock: "20px",
              boxShadow: "0px 12px 23px rgba(62, 73, 84, 0.04)",
            }}
          >
            <Row>
              <Col xs={24} md={20}  xl={16}>
                <StaffCodeFilters />
              </Col>
            </Row>
          </div>
          <div className="staff-code-search-bar">
            <Select
              suffixIcon={
                <img src={DownArrowSmall} style={{ borderLeft: "1px solid rgba(98, 93, 102, 0.2)", paddingLeft: "5px", color: "#888888" }} />
              }
              bordered={false}
              placement={"bottomLeft"}
              className="staff-filters-number-select"
              style={{ width: "73px", background: "white", border: "1px solid #D9DBE9", boxShadow: "0px 1px 6px rgba(0, 0, 0, 0.15)" }}
              defaultValue="100"
              onChange={(value) => console.log(value)}
              options={filterNumberOptions}
            />
            <div className="input-search-wrapper">
              <Input placeholder="search" className="staff-code-search" prefix={<img src={Search} alt="search icon" className="icon" />} />
            </div>
          </div>
          <div
            style={{
              background: "white",
              borderRadius: "8px",
              padding: "20px",
              marginBlock: "20px",
              boxShadow: "0px 12px 23px rgba(101, 205, 240, 0.1)",
            }}
          >
            <StaffCodeTable />
          </div>
      </div>
      {isImportStaff && <ImportStaffCodeModal isImportStaff={isImportStaff} setIsImportStaff={setIsImportStaff} />}
    </Fragment>
  );
};

export default StaffCodeSetup;
