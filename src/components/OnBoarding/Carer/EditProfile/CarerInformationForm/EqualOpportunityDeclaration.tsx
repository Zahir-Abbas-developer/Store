import { Button, Col, Form, Radio, Row, Select, Space, Tooltip } from "antd";
import { useState } from "react";
import { Option } from "../../../CareCordinator/ClientDetails/AllocateNewCareHomeModal";
import "./FormMain.scss";
import Arrow from "../../../../../assets/images/OnBoarding/SelectArrow.svg";
import { useGetRequestByIdQuery, usePostOtherInformationRequestMutation } from "../../../../../store/Slices/OnBoarding";
import { useLocation } from "react-router-dom";
import ApiLoader from "../../../../ApiLoader/ApiLoader";

interface ImmunisationItem {
  value: string;
  title: string;
}

interface ImmunisationData {

  whiteEthnicity: ImmunisationItem[];

  ReligionBelief: ImmunisationItem[];
  SexialOrientation: ImmunisationItem[];

  disabilityEquality: ImmunisationItem[];

}

const whiteEthnicity = [
  {
    title: "English / Welsh / Scottish / Northern Irish / British",
    value: "English",
  },
  {
    title: "Irish",
    value: "Irish",
  },
  {
    title: "Gypsy or Irish Traveller",
    value: "Gypsy",
  },
  {
    title: "Any other White Background",
    value: "Anyother",
  },

  {
    title: "White and Black Caribbean",
    value: "White",
  },
  {
    title: "White and Black African",

    value: "BlackAfrican",
  },
  {
    title: "White and Asian",

    value: "Asian",
  },
  {
    title: "Any Other Mixed / Multiple ethnic background",
    value: "AnyOtherMixed",
  },

  {
    title: "African",
    value: "African",
  },
  {
    title: "Caribbean",

    value: "Caribbean",
  },
  {
    title: "Any other Black / African / Caribben Background",
    value: "AnyotherBlack/African/CaribbenBackground",
  },
  {
    title: "Any Other Mixed / Multiple ethnic background",
    value: "AnyOtherMixed/Multipleethnicbackground",
  },

  {
    title: "Arab",
    value: "Arab",
  },
  {
    title: "Any other Ehnic Group",
    value: "AnyotherEhnicGroup",
  },
];

const ReligionBelief = [
  {
    title: "Islam",
    value: "Islam",
  },
  {
    title: "Bahai",
    value: "Bahai",
  },
  {
    title: "Buddist",
    value: "Buddist",
  },
  {
    title: "Cathonic",
    value: "Cathonic",
  },
];

const SexialOrientation = [
  {
    title: "Bisexual",
    value: "Bisexual",
  },
  {
    title: "Homosexual woman",
    value: "Homosexualwoman",
  },
  {
    title: "Homosexual man",
    value: "Homosexualman",
  },
  {
    title: "Heterosexual",
    value: "Heterosexual",
  },
];

const AsianEthnicity = [
  {
    title: "Indian",
    value: "Indian",
  },
  {
    title: "Pakistani",

    value: "Pakistani",
  },
  {
    title: "Bangladeshi",

    value: "Bangladeshi",
  },
  {
    title: "Chinese",
    value: "Chinese",
  },
  {
    title: "Any other Asian Background",
    value: "AnyotherAsianBackground",
  },
];

const disabilityEquality = [
  {
    title: "Yes",
    value: true,
  },
  {
    title: "No",
    value: false,
  },
  {
    title: "Prefer Not to say",
    value: "PreferNottosay",
  },
];

const EqualOpportunityDeclaration = (props: any) => {
  const { handleSelectedStepValue, auditCheck } = props;
  const [isShowDate, setIsShowDate] = useState(false);
  const onChange = (checked: boolean) => {
    setIsShowDate(checked);
  };
  const [postOtherInformationRequest] =
    usePostOtherInformationRequestMutation();
  const { state }: any = useLocation();
  const userData: any = localStorage.getItem("careUserData");
  const {id,role}: any = JSON.parse(userData);

  const {data,isSuccess,}=useGetRequestByIdQuery({id: state?.editProfile?._id ?? id,detail:"OTHERINFO"})
  let equalOpportunityDeclarationData:any;
if(isSuccess){
    equalOpportunityDeclarationData=data
  }

  const [immunisationData, setImmunisationData] = useState<ImmunisationData>({
    whiteEthnicity: equalOpportunityDeclarationData?.data?. userprofile?.opportunityDeclaration?.ethnicity ?? whiteEthnicity,
    ReligionBelief:equalOpportunityDeclarationData?.data?. userprofile?.opportunityDeclaration?.religion    ?? ReligionBelief,
    SexialOrientation: equalOpportunityDeclarationData?.data?. userprofile?.opportunityDeclaration?.sexualOrientation ??SexialOrientation,
    disabilityEquality: equalOpportunityDeclarationData?.data?. userprofile?.opportunityDeclaration?.disclose ??disabilityEquality,
  });

  const handleRadioOrientation = (e: any, groupName: any) => {
    setImmunisationData({
      ...immunisationData,
      [groupName]:e.target.value,
    });
  };

  const onFinish = (values: any) => {
    const payloadOpportunityDeclaration = {
      ...values,
      ethnicity: immunisationData?.whiteEthnicity,
      religion: immunisationData?.ReligionBelief,
      sexualOrientation: immunisationData?.SexialOrientation,
    };
    postOtherInformationRequest({
      payload: { opportunityDeclaration: payloadOpportunityDeclaration },
      id: state?.editProfile?._id ??id,
    });
    values && handleSelectedStepValue("Additional Docs");
  };

  return (
    <>
    {isSuccess ?   <div className="personal-form-wrapper">
      <Form
        name="basic"
        initialValues={{ remember: true, "disclose-status": false }}
        onFinish={onFinish}
        layout="vertical"
      >
        <Row gutter={[20, 20]}>
          <Col xs={24}>
            <Space direction="vertical" size={20}>
              <div>
                <span className="fw-500 fs-20">
                  Equal Opportunity Declaration
                </span>{" "}
                &nbsp;
                <span className="fw-600 fs-14">
                  (Equal Opportunity Policy Displayed for the candidate while
                  registering)
                </span>
              </div>
              <span>
                All information given will be treated in the strictest
                confidenceand not used for any other purpose. We are an equal
                opportunity employer. The aim of our policy is to ensure no job
                applicant or employee receives less favourable treatment on the
                grounds of gender, age, disability/ handicap, marital status,
                sexual orientation, careed, colour, race, or ethnic origin, or
                is disadvantaged by conditions or requirements which cannot be
                shown as justifiable.
              </span>
              <span>
                Selection criteria and procedures are frequently reviewed to
                ensure that individuals are selected, promoted and treated on
                the basis of their relevant merits and abilities.
              </span>
              <span>
                All employees are given equal opportunity and encouraged to
                progress within the organisation.
              </span>
              <span>
                We are commited to an ongoing programme of action to make this
                policy fully effective. To ensure that this policy is fully and
                fairly implemented and monitored, and for no other reason, would
                you please the relevant options below?
              </span>
              <Form.Item
                label=""
                name="disclose-status"
                className="allocate-select"
              >
                <Space>
                  <span className="fw-400 fs-14 title-color">
                    {" "}
                    I do not wish to disclose this.
                  </span>
                </Space>
              </Form.Item>
            </Space>
          </Col>
          {!isShowDate && (
            <Col xs={24}>
              <Row gutter={[10, 15]}>
                <Col xs={10}>
                  <Form.Item
                    label="Marital Status "
                    name="maritalStatus"
                    className="allocate-select"
                  >
                    <Select
                     defaultValue={equalOpportunityDeclarationData?.data?.userprofile?.opportunityDeclaration?.maritalStatus}
                      placeholder="Selected option"
                      suffixIcon={<img src={Arrow} />}
                    >
                      <Option value="unmarried">Single</Option>
                      <Option value="married">Married</Option>
                      <Option value="divorced">Divorced</Option>
                      <Option value="none">None</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Space direction="vertical">
                    <span className="form-heading-color fw-500 fs-16 ">
                      Your Ethnicity
                    </span>
                    <span className="title-color fs-14  fw-600">White</span>
                  </Space>
                </Col>
                {whiteEthnicity.map((item: any, index: any) => (
                  <Col xs={24}>
                    <Space key={index}>
                      <Radio.Group
                        onChange={(e) =>
                          handleRadioOrientation(e, "whiteEthnicity")
                        }
                        value={immunisationData.whiteEthnicity}
                      >
                        <Space direction="vertical">
                          <Radio value={item.value}>{item?.title}</Radio>
                        </Space>
                      </Radio.Group>
                    </Space>
                  </Col>
                ))}
              
                <Col xs={24}>
                  <span className="title-color fs-14  fw-600">
                    {" "}
                    Do you consider yourself to have a disability within the
                    meaning of the Equality Act 2021{" "}
                  </span>
                </Col>
                {disabilityEquality.map((item: any, index: any) => (
                  <Col xs={24}>
                    <Space key={index} direction="vertical">
                      <Radio.Group
                        onChange={(e) =>
                          handleRadioOrientation(e, "disabilityEquality")
                        }
                        value={immunisationData.disabilityEquality}
                      >
                        <Space direction="vertical">
                          <Radio value={item.value}>{item?.title}</Radio>
                        </Space>
                      </Radio.Group>
                    </Space>
                  </Col>
                ))}

                {/* <Col xs={24}>
                  <span className="title-color fs-14  fw-600">
                    {" "}
                    Other Ethnic Group
                  </span>
                </Col> */}

            

                <Col xs={24}>
                  <span className="title-color fs-14  fw-600">
                    {" "}
                    Your Religion and Belief{" "}
                  </span>
                </Col>
                {ReligionBelief.map((item: any, index: any) => (
                  <Col xs={24}>
                    <Space key={index} direction="vertical">
                      <Radio.Group
                        onChange={(e) =>
                          handleRadioOrientation(e, "ReligionBelief")
                        }
                        value={immunisationData.ReligionBelief}
                      >
                        <Space direction="vertical">
                          <Radio value={item.value}>{item?.title}</Radio>
                        </Space>
                      </Radio.Group>
                    </Space>
                  </Col>
                ))}

                <Col xs={24}>
                  <span className="title-color fs-14  fw-600">
                    {" "}
                    Your Sexual Orientation
                  </span>
                </Col>
                {SexialOrientation.map((item: any, index: any) => (
                  <Col xs={24}>
                    <Space key={index} direction="vertical">
                      <Radio.Group
                        onChange={(e) =>
                          handleRadioOrientation(e, "SexialOrientation")
                        }
                        value={immunisationData.SexialOrientation}
                      >
                        <Space direction="vertical">
                          <Radio value={item.value}>{item?.title}</Radio>
                        </Space>
                      </Radio.Group>
                    </Space>
                  </Col>
                ))}
              </Row>
            </Col>
          )}

          <Col xs={24}>
            <div>
              <Space className="carer-buttons">
                {(auditCheck && role==="admin") && (
                  <Tooltip
                    autoAdjustOverflow={true}
                    showArrow={false}
                    placement="bottomLeft"
                    color="#65CDF0"
                    title="Click to mark as audit"
                  >
                    <Button className="edit-module-button  audit-button  align-center d-flex">
                      Audit
                    </Button>
                  </Tooltip>
                )}
                <Button
                  className="edit-module-button bg-orange-color  align-center d-flex "
                  htmlType="submit"
                >
                  Save
                </Button>
                <Button
                  className="edit-module-button   align-center d-flex btn-secondary"
                  htmlType="submit"
                >
                  Continue
                </Button>
              </Space>
            </div>
          </Col>
        </Row>
      </Form>
    </div>:<ApiLoader/>}    
    </>
  
  );
};

export default EqualOpportunityDeclaration;
