import { Select } from "antd";
import arrowDownSmall from "../../../../assets/icons/arrow-small-down.svg";
import "../../../ClientManager/ClientManagerFilters/ClientManagerFilters.scss";

const ShiftManageFilters = ({ setShiftStatus,careHome }: any) => {

  const handleChange = (value: string) => {
    setShiftStatus(value)
  };

  return (
    <>
      <div className="wrapper-fliters" style={{ paddingBottom: "20px" }}>
        <div className="flex-filters">
          <div className="inner-flex-filters">
            <div className="col-box">
              <div className="area-fliters">
                <div className="filters-label fw-600 fs-14 label-color">Care Home</div>
                <Select
                  style={{ width: "100%" }}
                  disabled
                  defaultValue={careHome}
                  suffixIcon={null}
                />
              </div>
            </div>
            <div className="col-box">
              <div className="area-fliters">
                <div className="filters-label fw-600 fs-14 label-color">Shift Status</div>
                <Select
                  placeholder="All"
                  style={{ width: "100%" }}
                  onChange={handleChange}
                  suffixIcon={<img src={arrowDownSmall} alt="" />}
                  options={[
                    { value: "All", label: "ALL" },
                    { value: "PUBLISHED", label: "PUBLISHED" },
                    { value: "UNPUBLISHED", label: "UNPUBLISHED" },
                    { value: "COMPLETED", label: "COMPLETED" },
                    { value: "BOOKED", label: "BOOKED" },
                    { value: "CANCELED", label: "CANCELED" },
                    { value: "PARTIALLY", label: "PARTIALLY" },
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShiftManageFilters;
