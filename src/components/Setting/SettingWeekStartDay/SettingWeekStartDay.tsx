// Ant Components
import { ColumnsType } from "antd/es/table";

// Components
import BreadCrumb from "../../../layout/BreadCrumb/BreadCrumb";

// Utils
import { renderDashboard } from "../../../utils/useRenderDashboard";

// Mock Data
import { DataType} from "../../../mock/WeekStartDay";

// SCSS
import "./SettingWeekStartDay.scss";

import "../AgencyTermsCondition/AgencyTermsCondition.scss";

function SettingWeekStartDay() {

  const { role }: any = JSON.parse(localStorage.getItem("careUserData") || "{}");

  const WeekStartDayColumns: ColumnsType<DataType> = [
    {
      title: 'Sr. No.',
      dataIndex: 'SNo',
      key: 'SNo',
      
    },
    {
      title: 'Start Day',
      dataIndex: 'StartDay',
      key: 'StartDay',
    },
    {
      title: 'Action',
      dataIndex: 'Action',
      key: 'Action',
      render: () => (
        <label className="week-start-day-checkbox">
          <input type="checkbox" name="option" value="checked" />
          <span className="radio"></span>
        </label>

      ),
    }
  ];

  return (
    <>
      <BreadCrumb breadCrumbItems={[
        {
          title: "Week Start Day",
          path: "",
        },
        {
          title: "Dashboard",
          path: renderDashboard(role),
        },
        {
          title: "Settings",
          path: "/settings",
        }
      ]} />
    
    {/* <div className='week-start-day'>
      <div className="heading">
        <h1 className="fs-16 fw-600">Choose Your Week Start Day
        </h1>
      </div>

      <div>
        <Table
          className="common-setting-table"
          columns={WeekStartDayColumns}
          dataSource={WeekStartDayData}
          scroll={{ x: 768 }}
        />
      </div>

      <Button className="savebtn" type="primary" htmlType="submit">
        Save
      </Button>
    </div> */}
      <div className="page-wrapper">
        <div className="page-found-wrapper d-flex align-center justify-center flex-column construction">
          <div className="page-found-heading text-center">
            <h2 className="title-color m-0 under">
              <span className="primary-color">
                Under <span className="secondary-color">Construction</span>
              </span>
            </h2>
          </div>
          <h2 className="title-color fs-32 m-0 text-center coming">
            Coming <span className="title-color">Soon</span>
          </h2>
          <p className="title-color fs-16 m-0 text-center d-block">
            We are preparing something amazing and exciting for you.
          </p>
        </div>
      </div>
    </>

  );
}

export default SettingWeekStartDay;
