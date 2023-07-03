import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Col, Collapse, Row } from "antd";

import ExperienceIcon from "../../../../../assets/icons/ShiftManger/experienceIcon.svg";
import LanguageIcon from "../../../../../assets/icons/ShiftManger/languageIcon.svg";
import RadiusIcon from "../../../../../assets/icons/ShiftManger/radiusIcon.svg";
import GenderIcon from "../../../../../assets/icons/ShiftManger/genderIcon.svg";

const { Panel } = Collapse;

const ViewPreferences = ({ preferences }: any) => {
  const viewPreferencesData = [
    {
      id: "1",
      icon: ExperienceIcon,
      title: "Experience",
      desc: `${0} Years`,
    },
    {
      id: "2",
      icon: RadiusIcon,
      title: "Radius",
      desc: `${0} Miles`,
    },
    {
      id: "3",
      icon: LanguageIcon,
      title: "Language",
      desc: 0,
    },
    {
      id: "4",
      icon: GenderIcon,
      title: "Gender",
      desc: "Male",
    },
  ];
  return (
    <>
      <Collapse
        defaultActiveKey={["0"]}
        bordered={false}
        expandIconPosition="end"
        expandIcon={({ isActive }) => {
          return (
            <>
              {isActive && <MinusOutlined />}
              {!isActive && <PlusOutlined />}
            </>
          );
        }}
      >
        <Panel header="View Preferences" key="1">
          <div className="view-preference">
            <Row gutter={[20, 20]}>
              {viewPreferencesData.map((item: any) => (
                <Col xl={12} lg={12} md={12} sm={24} xs={24} key={item.id}>
                  <div
                    className="view-preference-content d-flex justify-between align-center"
                    style={{
                      background:
                        item.id === "1"
                          ? "rgba(101, 205, 240, 0.25)"
                          : item.id === "2"
                          ? "rgba(43, 193, 85, 0.25)"
                          : item.id === "3"
                          ? "rgba(247, 185, 35, 0.25)"
                          : item.id === "4"
                          ? "rgba(238, 46, 126, 0.25)"
                          : "transparent",
                    }}
                  >
                    <div className="view-preference-icon d-flex align-center">
                      <img src={item.icon} alt="" />
                      <h2 className="fs-16 fw-600 line-height-22 m-0">{item.title}</h2>
                    </div>
                    <p className="fs-16 fw-400 line-height-22 m-0">{item.desc}</p>
                  </div>
                </Col>
              ))}
              <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                <div className="view-preference-btn">
                  <button
                    type="button"
                    className="fs-16 fw-600 line-height-22 white-color m-0 cursor-pointer"
                    style={{}}
                  >
                    Find Match
                  </button>
                </div>
              </Col>
            </Row>
          </div>
        </Panel>
      </Collapse>
    </>
  );
};

export default ViewPreferences;
