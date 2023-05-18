import { Col, Collapse, Input, Row } from "antd";
import Search from "../../assets/images/OnBoarding/Search.svg";
import { ROLES } from "../../constants/Roles";
import { faqsData } from "../../mock/Faqs/FaqsData";
import "./Faqs.scss";

const { Panel } = Collapse;

const Faqs = () => {
  const { role }: any = JSON.parse(localStorage.getItem("careUserData") || "{}");
  return (
    <div className="wrap-faqs">
      {(role === ROLES.admin || role === ROLES.client || role === ROLES.coordinator) && (
        <>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col className="gutter-row" xs={24} sm={24} md={24} lg={24} xxl={24} xl={24}>
              <div className="faqs-tittle ">
                <h5 className="fw-500 fs-30" style={{ lineHeight: "40px" }}>
                  How can we help you ?
                </h5>
                <Input
                  placeholder="Search"
                  prefix={<img src={Search} alt="search icon" className="icon" style={{ marginRight: "10px" }} />}
                  style={{ height: "40px", border: "1px solid #D9DBE9" }}
                />
              </div>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            {faqsData.map((faq: any, index: number) => {
              return (
                <Col key={index} className="gutter-row" sm={12} md={12} lg={8} xl={8} xxl={8}>
                  <div className="wrap-dev" style={{ marginBottom: "55px", margin: "0 auto", width: "70%" }}>
                    <ul className="admin-list">
                      <p className="fw-600 fs-20 form-heading-color " style={{ marginBottom: "15px" }}>
                        {faq.title}
                      </p>
                      {faq.optionsArray.map((option: any) => {
                        return (
                          <li className="fw-400 fs-14 title-color line-height-22" key={option.key} style={{ marginBottom: "5px" }}>
                            {option.list}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </Col>
              );
            })}
          </Row>
        </>
      )}

      {(role === ROLES.superAdmin || role === ROLES.instructor || role === ROLES.carer) && (
        <>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col className="gutter-row" xs={24} sm={17} md={15} lg={15} xxl={24} xl={24}>
              <div className="faqs-super-admin-tittle ">
                <span className="fw-400 fs-12 label-color">FAQs</span>
                <h5 className="fw-500">Ask us anything</h5>
                <h6 className="fw-400 fs-14 label-color">Have any questions? We're here to assist you.</h6>
                <Input
                  placeholder="Search"
                  prefix={<img src={Search} alt="search icon" className="icon" style={{ marginRight: "10px" }} />}
                  style={{ height: "40px", border: "1px solid #D9DBE9" }}
                />
              </div>
            </Col>
          </Row>

          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col className="gutter-row" xs={22} sm={22} md={22} lg={22} xxl={24} xl={23}>
              <div className="wrap-collapse">
                {faqsData.map((faq: any, index) => {
                  return (
                    <Collapse key={index} accordion bordered={false}>
                      <Panel className="fw-600 fs-16 collapse" header={faq.title} key={faq.key} style={{ marginBottom: "15px" }}>
                        <ul>
                          {faq.optionsArray.map((option: any) => {
                            return (
                              <li className="fw-400 fs-14 title-color" style={{ marginBottom: "5px" }}>
                                {option.list}
                              </li>
                            );
                          })}
                        </ul>
                      </Panel>
                    </Collapse>
                  );
                })}
              </div>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default Faqs;
