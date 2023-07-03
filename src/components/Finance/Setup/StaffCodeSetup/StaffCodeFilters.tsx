import { Select } from "antd";
import DownArrow from '../../../../assets/icons/finance-setup/downArrow.png'
import "./StaffCodeFilters.scss";

const StaffCodeFilters = () => {
  return (
    <div className="wrapper-fliters">
      <div className="flex-filters">
        <div className='inner-flex-filters'>
          <div className="staff-code-col-box">
            <div className="area-fliters">
              <div className='filters-label fw-600 fs-14'>Staff Name</div>
              <Select
                suffixIcon={<img src={DownArrow} alt="downArrow" />}
                bordered={false}
                className="staff-filters-select"
                style={{ width: "100%" }}
                placeholder={<span style={{ color: '#6E7191' }}>Select Staff Name</span>}
                onChange={(value) => console.log(value)}
                options={[
                  { value: "jack", label: "Jack" },
                  { value: "lucy", label: "Lucy" },
                  { value: "Yiminghe", label: "yiminghe" },
                  { value: "disabled", label: "Disabled", disabled: true },
                ]}
              />
            </div>
          </div>
          <div className="staff-code-col-box">
            <div className="area-fliters">
              <div className='filters-label fw-600 fs-14'>Satff Type</div>
              <Select
                suffixIcon={<img src={DownArrow} alt="downArrow" />}
                bordered={false}
                style={{ width: "100%" }}
                className="staff-filters-select"
                placeholder={<span style={{ color: '#6E7191' }}>Select Staff Type</span>}
                onChange={(value) => console.log(value)}
                options={[
                  { value: "jack", label: "Jack" },
                  { value: "lucy", label: "Lucy" },
                  { value: "Yiminghe", label: "yiminghe" },
                  { value: "disabled", label: "Disabled", disabled: true },
                ]}
              />
            </div>
          </div>
          <div className="staff-code-col-box">
            <div className="area-fliters">
              <div className='filters-label fw-600 fs-14'>Staff Status</div>
              <Select
                suffixIcon={<img src={DownArrow} alt="downArrow" />}
                bordered={false}
                style={{ width: "100%" }}
                placeholder={<span style={{ color: '#6E7191' }}>Select Staff Status</span>}
                onChange={(value) => console.log(value)}
                options={[
                  { value: "jack", label: "Jack" },
                  { value: "lucy", label: "Lucy" },
                  { value: "Yiminghe", label: "yiminghe" },
                  { value: "disabled", label: "Disabled", disabled: true },
                ]}
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default StaffCodeFilters;
