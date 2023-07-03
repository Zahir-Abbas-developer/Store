import { Col, Progress, Row, Space, Collapse } from "antd";
import "./EditProfile.scss";
import { useState } from "react";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import Icon from "@ant-design/icons/lib/components/Icon";
import { CarerProfilePanel, TrainingInstructorPanel } from "../../../../mock/OnBoarding";
import PhotoForIdBadge from "./CarerInformationForm/PhotoForIdBadge";
import PersonalInfo from "./CarerInformationForm/PersonalInfo";
import AddressDetails from "./CarerInformationForm/AddressDetails";
import Refrences from "./CarerInformationForm/Refrences";
import TraingingCertificates from "./CarerInformationForm/TraingingCertificates";
import Specialities from "./CarerInformationForm/Specialities";
import BackGroundDBS from "./CarerInformationForm/BackGroundDBS";
import AdditionalTrainingDetails from "./CarerInformationForm/AdditionalTrainingDetails";
import NextOfKin from "./CarerInformationForm/NextOfKin";
import RightToWork from "./CarerInformationForm/RightToWork";
import AdditionalDocsFromCandidate from "./CarerInformationForm/AdditionalDocsFromCandidate";
import BankDetails from "./CarerInformationForm/BankDetails";
import Immunisation from "./CarerInformationForm/Immunisation";
import MedicalQuestionnaire from "./CarerInformationForm/MedicalQuestionnaire";
import ContactPreference from "./CarerInformationForm/ContactPreference";
import EqualOpportunityDeclaration from "./CarerInformationForm/EqualOpportunityDeclaration";
import WorkExperience from "./CarerInformationForm/WorkExperience";
import WorkExperienceTabs from "./CarerInformationForm/WorkExperienceTabs";
import EmployementStatus from "./CarerInformationForm/EmployementStatus";
import DeclarationMain from "./CarerInformationForm/DeclarationMain";
import { useLocation } from "react-router-dom";
import IDUploadPassport from "./CarerInformationForm/IDUploadPassport";
import BreadCrumb from "../../../../layout/BreadCrumb/BreadCrumb";
import { useGetRequestByIdQuery } from "../../../../store/Slices/OnBoarding";


const PlusIcon = () => <PlusOutlined />;
const MinusIcon = () => <MinusOutlined />;
const { Panel } = Collapse;
const panelStyle = {
  marginBottom: 24,
  background: "#F5F5F5",
  boxShadow: "inset 0px 0px 1px rgba(0, 0, 0, 0.2)",
  borderRadius: "4px 4px 0px 0px",
  border: "none",
};

const CarerEditProfile = () => {
  const [selectedStepValue, setselectedStepValue] = useState('Personal Info');
  const [activePanelKey, setActivePanelKey] = useState('About the Candidate');
  const { pathname } = useLocation();
  const { state }: any = useLocation();
  const conditionalPath = pathname.includes('training-instructor') || pathname.includes('instructor-profile')
  const auditCheck = pathname.includes('carer')
  const userData: any = localStorage.getItem("careUserData")
  const {id}: any = JSON.parse(userData);
  const {data,isSuccess}=useGetRequestByIdQuery({id,detail:"ABOUT"})
  let userProfileInfo:any
  if (isSuccess){
    userProfileInfo=data
  }
  function handleSelectedStepValue(panelChilds: string) {
    const selectedPanelChild = componentsMap[panelChilds];
    setselectedStepValue(panelChilds)
    setSelectedComponent(selectedPanelChild);
  }


  // TrainingInstructorPanel
  const componentsMap: any = {
    "Personal Info": <PersonalInfo handleSelectedStepValue={handleSelectedStepValue} auditCheck={auditCheck} />,
    "Address Details": <AddressDetails handleSelectedStepValue={handleSelectedStepValue} auditCheck={auditCheck} />,
    "Photo for ID Badge": <PhotoForIdBadge handleSelectedStepValue={handleSelectedStepValue} auditCheck={auditCheck} />,
    "Add References": <Refrences handleSelectedStepValue={handleSelectedStepValue} setActivePanelKey={setActivePanelKey} auditCheck={auditCheck} />,
    "Training Certificate": <TraingingCertificates handleSelectedStepValue={handleSelectedStepValue} auditCheck={auditCheck} />,
    "Addtional Training Details": <AdditionalTrainingDetails handleSelectedStepValue={handleSelectedStepValue} auditCheck={auditCheck} />,
    "Work Experience": < WorkExperienceTabs handleSelectedStepValue={handleSelectedStepValue} auditCheck={auditCheck} />,
    "Specialities": <Specialities handleSelectedStepValue={handleSelectedStepValue} setActivePanelKey={setActivePanelKey} auditCheck={auditCheck} />,
    "DBS": <BackGroundDBS handleSelectedStepValue={handleSelectedStepValue} auditCheck={auditCheck} />,
    "Right to Work": <RightToWork handleSelectedStepValue={handleSelectedStepValue} setActivePanelKey={setActivePanelKey} conditionalPath={conditionalPath} auditCheck={auditCheck} />,
    "Next Of Kin": <NextOfKin handleSelectedStepValue={handleSelectedStepValue} auditCheck={auditCheck} />,
    "Contact Prefrence": <ContactPreference handleSelectedStepValue={handleSelectedStepValue} auditCheck={auditCheck} />,
    "Employment Status": <EmployementStatus handleSelectedStepValue={handleSelectedStepValue} conditionalPath={conditionalPath} auditCheck={auditCheck} />,
    "Equal Opportunity Declaration": <EqualOpportunityDeclaration handleSelectedStepValue={handleSelectedStepValue} auditCheck={auditCheck} />,
    "Additional Docs": <AdditionalDocsFromCandidate handleSelectedStepValue={handleSelectedStepValue} auditCheck={auditCheck} />,
    "Bank Details": <BankDetails handleSelectedStepValue={handleSelectedStepValue} setActivePanelKey={setActivePanelKey} conditionalPath={conditionalPath} auditCheck={auditCheck} />,
    "Immunisation": <Immunisation handleSelectedStepValue={handleSelectedStepValue} auditCheck={auditCheck} />,
    "Medical Questionnaire": <MedicalQuestionnaire handleSelectedStepValue={handleSelectedStepValue} setActivePanelKey={setActivePanelKey} auditCheck={auditCheck} />,
    "Declaration": <DeclarationMain />,
    "ID Upload (Passport/DL)": <IDUploadPassport handleSelectedStepValue={handleSelectedStepValue} setActivePanelKey={setActivePanelKey} auditCheck={auditCheck} />
  };
  const [selectedComponent, setSelectedComponent] = useState<JSX.Element | null>(componentsMap["Personal Info"]);

  //BreadCrumb Items
  const breadCrumbItems = [
    {
      title: "Profile",
      path: "",
    },
    {
      title: "Dashboard",
      path: "/dashboard",
    },
    {
      title: window?.location?.pathname === '/onboarding/carer/edit-profile' || window?.location?.pathname === '/onboarding/care-coordinator/edit-profile' || window?.location?.pathname === '/onboarding/training-instructor/edit-profile'? "Onboarding" :"",
      path: "/onboarding/carer",
    },
    {
      title: window?.location?.pathname === '/onboarding/carer/edit-profile' ? "Carer" : window?.location?.pathname === '/onboarding/care-coordinator/edit-profile' ? "Care Coordinator" : window?.location?.pathname === '/onboarding/training-instructor/edit-profile'?"Training Instructor":"",
      path: window?.location?.pathname === '/onboarding/carer/edit-profile' ? "/onboarding/carer" : window?.location?.pathname === '/onboarding/care-coordinator/edit-profile' ? "/onboarding/care-coordinator" : window?.location?.pathname === '/onboarding/training-instructor/edit-profile'?"/onboarding/training-instructor":"",
    },
  ];

  return (
    <>
      <BreadCrumb breadCrumbItems={breadCrumbItems} />
      <div className="edit-profile-wrapper">
        <Row
          gutter={[0, 20]}
          className="d-flex align-center edit-profile-cards"
          style={{ padding: "20px 10px" }}
        >
          <Col sm={12}>
            <Space size={30}>
              <div>
                <span className="fw-600 fs-14 dark-brown-color">
                  User Status:
                </span>

                <span className="fw-400 fs-14"> {state?.editProfile?.status ?? userProfileInfo?.data?.status} </span>
              </div>
              <div>
                <span className="fw-600 fs-14 dark-brown-color">User Type:</span>
                <span className="fw-400 fs-14"> {state?.editProfile?.userType?.shortForm ?? userProfileInfo?.data?.userType?.name} </span>
              </div>
            </Space>
          </Col>
          <Col sm={12} className="d-flex justify-end">
            <div style={{ width: 250 }}>
              <div
                className="fs-14 fw-400 title-color"
                style={{ minWidth: "70px" }}
              >
                <span className="fw-700 fs-14">{state?.editProfile?.percentageComplete ?? userProfileInfo?.data?.percentageComplete}%</span>
                <span style={{ marginLeft: "5px" }} className="fw-600 fs-14">
                  Done
                </span>
              </div>
              <Progress
                percent={state?.editProfile?.percentageComplete  ?? userProfileInfo?.data?.percentageComplete}
                strokeColor="#F7B923"
                strokeWidth={10}
                showInfo={false}
              />
            </div>
          </Col>

        </Row>

        <Row gutter={[30, 30]} className="card-padding ">
          <Col lg={7} xs={24} md={24} >
            <div className="edit-profile-cards" style={{ padding: "12px", height: '690px', overflow: 'scroll' }}>
              {conditionalPath ? (TrainingInstructorPanel.map((panelData: any) => (
                <Collapse
                  expandIcon={({ isActive }) => (
                    <Icon
                      className="fw-600 fs-14 title-color"
                      component={isActive ? MinusIcon : PlusIcon}
                    />
                  )}
                  onChange={() => {
                    setActivePanelKey(panelData.title);
                    setselectedStepValue(panelData.panelData[0].panelChilds);
                    const component = componentsMap[panelData.panelData[0].panelChilds];
                    setSelectedComponent(component);
                  }}
                  activeKey={activePanelKey}
                >
                  <Panel
                    className="fs-14 fw-400 completed-tags-wk"
                    header={
                      <span className="fw-600 fs-14 title-color">
                        {panelData.title}
                      </span>
                    }
                    key={panelData.title}
                    style={panelStyle}
                  >
                    {panelData.panelData.map((item: any) => (
                      <div
                        key={item.title}
                        className="steps-flex"
                        onClick={() => handleSelectedStepValue(item.panelChilds)}
                      >
                        <div className="rounded">
                          {selectedStepValue === item.panelChilds && (
                            <div className="inner--selected"></div>
                          )}
                        </div>
                        <div className="steps-content">
                          <span className='steps-text fs-14 fw-400 dark-brown-color'>{item.panelChilds}</span>
                          <div className="area-right">
                            <div className="rounded-bx">P</div>
                            {auditCheck && <div className="rounded-bx">A</div>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </Panel>
                </Collapse>
              ))) :
                (CarerProfilePanel.map((panelData: any) => (
                  <Collapse
                    expandIcon={({ isActive }) => (
                      <Icon
                        className="fw-600 fs-14 title-color"
                        component={isActive ? MinusIcon : PlusIcon}
                      />
                    )}
                    onChange={() => {
                      setActivePanelKey(panelData.title);
                      setselectedStepValue(panelData.panelData[0].panelChilds);
                      const component = componentsMap[panelData.panelData[0].panelChilds];
                      setSelectedComponent(component);
                    }}
                    activeKey={activePanelKey}
                  >
                    <Panel
                      className="fs-14 fw-400 completed-tags-wk"
                      header={
                        <span className="fw-600 fs-14 title-color">
                          {panelData.title}
                        </span>
                      }
                      key={panelData.title}
                      style={panelStyle}
                    >
                      {panelData.panelData.map((item: any) => (
                        <div
                          key={item.title}
                          className="steps-flex"
                          onClick={() => handleSelectedStepValue(item.panelChilds)}
                        >
                          <div className="rounded">
                            {selectedStepValue === item.panelChilds && (
                              <div className="inner--selected"></div>
                            )}
                          </div>
                          <div className="steps-content">
                            <span className='steps-text fs-14 fw-400 dark-brown-color'>{item.panelChilds}</span>
                            <div className="area-right">
                              <div className="rounded-bx">P</div>
                              {auditCheck && <div className="rounded-bx">A</div>}

                            </div>
                          </div>
                        </div>
                      ))}
                    </Panel>
                  </Collapse>
                )))}
            </div>
          </Col>
          <Col lg={17} xs={24} md={24}>
            <Row className="edit-profile-cards" style={{ padding: "20px", height: '690px', overflow: 'scroll' }}>
              <Col xs={24}>
                <div className="user-card">
                  {selectedComponent}
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default CarerEditProfile;
