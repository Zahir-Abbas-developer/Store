// import "../../../../sass/common.scss";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Row, Col, Tooltip, Button, Spin, Form } from "antd";
import "./ProfileMetrics.scss";
import { ProfileMetricsData } from "../../../../mock/ProfileMetricsSetting"
import Counter from "./Counter/Counter";
import { useGetProfileMetricsQuery, usePostProfileMetricsMutation } from "../../../../store/Slices/Setting/StaffSettings/ProfileMetrics";
import { useEffect, useState } from "react";
import AppSnackbar from "../../../../utils/AppSnackbar";
import { useGetRegisterationConfigurationQuery } from "../../../../store/Slices/Setting/StaffSettings/RegisterationConfiguration";


function ProfileMetrics(props: any) {
  const { rowData } = props;
  const [form] = Form.useForm();

  const { data, isLoading, isSuccess, isError } = useGetProfileMetricsQuery({ refetchOnMountOrArgChange: true });
  const { data: registerationConfigApiData, isLoading: isDataLoading, isSuccess: isRegisterationConfigurationSuccess } = useGetRegisterationConfigurationQuery({ refetchOnMountOrArgChange: true, selectedFilterValue: "carer" });

  const [postProfileMetrics] = usePostProfileMetricsMutation();
  let stafMetricsData: any;
  let registerationConfigurationData: any;
  const [requiredPercentage, setRequiredPercentage] = useState<string>(stafMetricsData?.data?.fullProfile);


  if (isSuccess) {
    stafMetricsData = data
  }

  if (isRegisterationConfigurationSuccess) {
    registerationConfigurationData = registerationConfigApiData;
  }




  // filter main array with selected item in Registration Configuration
  // const newArray = rowData.filter((value: any) => {
  //   return ProfileMetricsData.some(obj => obj.profilemetricslist === value);
  // });

  // console.log(newArray);
  //useGetProfileMetricsQuery

  const handleProfileMetrics = async (values: any) => {

    const newPaylaod = {
      "fullProfile": Number(requiredPercentage),
      "personalInfo": Number(values?.personalInfo ?? stafMetricsData?.data?.personalInfo),
      "photoForIdBadge": Number(values?.photoForIdBadge ?? stafMetricsData?.data?.photoForIdBadge),
      "addReference": Number(values?.addReference ?? stafMetricsData?.data?.addReference),
      "additionalTrainingDetail": Number(values?.additionalTrainingDetail ?? stafMetricsData?.data?.additionalTrainingDetail),
      "regulatoryRegistration": Number(values?.regulatoryRegistration ?? stafMetricsData?.data?.regulatoryRegistration),
      "nextOfKin": Number(values?.nextOfKin ?? stafMetricsData?.data?.nextOfKin),
      "employeeStatus": Number(values?.employeeStatus ?? stafMetricsData?.data?.employeeStatus),
      "Immunisation": Number(values?.Immunisation ?? stafMetricsData?.data?.Immunisation),
      "addressDetail": Number(values?.addressDetail ?? stafMetricsData?.data?.addressDetail),
      "IdUpload": Number(values?.IdUpload ?? stafMetricsData?.data?.IdUpload),
      "certificateStatus": Number(values?.certificateStatus ?? stafMetricsData?.data?.certificateStatus),
      "workExperiance": Number(values?.workExperiance ?? stafMetricsData?.data?.workExperiance),
      "rightToWork": Number(values?.rightToWork ?? stafMetricsData?.data?.rightToWork),
      "contactPreference": Number(values?.contactPreference ?? stafMetricsData?.data?.contactPreference),
      "equalOpportunityDeclaration": Number(values?.equalOpportunityDeclaration ?? stafMetricsData?.data?.equalOpportunityDeclaration),
      "medicalQuestionnaire": Number(values?.medicalQuestionnaire ?? stafMetricsData?.data?.medicalQuestionnaire),
    }

    try {
      await postProfileMetrics({ payload: newPaylaod }).unwrap();
      AppSnackbar({ type: "success", messageHeading: "Successfully Updated!", message: "Information Updated successfully" });

    } catch (error: any) {
      AppSnackbar({
        type: "error",
        messageHeading: "Error",
        message: error?.data?.message ?? "Something went wrong!"
      });
    }
  }

  const handleUpdateCount = (value: any) => {
    console.log("count value in profile ", value);
  }


  // ================== Failed form fields ==================
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };



  useEffect(() => {
    setRequiredPercentage(stafMetricsData?.data?.fullProfile)
  }, [stafMetricsData?.data?.fullProfile])



  return (
    <div className='profile-metrics'>
      <div className="heading">

        <h1 className="fs-20 fw-600 m-0">Profile % Required for Activation
          <Tooltip placement="bottomLeft"
            color="#65CDF0"
            overlayInnerStyle={{
              width: "499px",
            }}
            title="This relates to the minimum percentage of candidate profile (in the registration form) required to activate them. Even if the profile percentage is less, you have the ability to force activate them from their ‘Activation & Settings’ menu.">
            <InfoCircleOutlined />
          </Tooltip>

        </h1>
        <input type="text" placeholder="Enter required % for activation" value={requiredPercentage} onChange={(event: any) => setRequiredPercentage(event.target.value)} />
        <h1 className="fs-20 fw-600 m-0">Profile Metrics
          <Tooltip placement="bottomLeft"
            color="#65CDF0"
            overlayInnerStyle={{
              width: "499px",
            }}
            title="This relates to the minimum percentage of candidate profile (in the registration form) required to activate them. Even if the profile percentage is less, you have the ability to force activate them from their ‘Activation & Settings’ menu.">
            <InfoCircleOutlined />
          </Tooltip>

        </h1>
      </div>

      {((isLoading || isDataLoading) && !isError && !isSuccess) ? (
        <Spin size="large" style={{ width: "100%", margin: "auto" }} />
      ) : (
        <div className="profile-metrics">
          <Form form={form} onFinish={handleProfileMetrics} onFinishFailed={onFinishFailed}>
            <Row className="counter-plus-mins align-items-center">
              {registerationConfigurationData?.data?.personalInfo && (
                <Col lg={12} md={12} xs={24}>
                  <Row style={{ marginBottom: "25px" }} className="align-items-center">
                    <Col lg={12} md={12} xs={24}>
                      <div className="profile-metrics-counter d-flex align-items-center">
                        <p className="m-0 fs-16 fw-500">Personal Info</p>
                      </div>
                    </Col>
                    <Form.Item name="personalInfo">
                      <Col lg={12} md={12} xs={24} className="d-flex align-items-center">
                        <Counter countValue={stafMetricsData?.data?.personalInfo && stafMetricsData?.data?.personalInfo} requiredPercentage={requiredPercentage} handleUpdateCount={handleUpdateCount} noLimit={true} />
                        <span className="fs-14" style={{ color: "#6E7191" }}> % </span>
                      </Col>
                    </Form.Item>
                  </Row>
                </Col>
              )}

              {registerationConfigurationData?.data?.clientAddress && (
                <Col lg={12} md={12} xs={24}>
                  <Row style={{ marginBottom: "25px" }} className="align-items-center">
                    <Col lg={12} md={12} xs={24}>
                      <div className="profile-metrics-counter d-flex align-items-center">
                        <p className="m-0 fs-16 fw-500">Address Details</p>
                      </div>
                    </Col>
                    <Form.Item name="addressDetail">
                      <Col lg={12} md={12} xs={24} className="d-flex align-items-center">
                        <Counter countValue={stafMetricsData?.data?.addressDetail && stafMetricsData?.data?.addressDetail} requiredPercentage={requiredPercentage} handleUpdateCount={handleUpdateCount} noLimit={false} />
                        <span className="fs-14" style={{ color: "#6E7191" }}> % </span>
                      </Col>
                    </Form.Item>
                  </Row>
                </Col>
              )}
              {registerationConfigurationData?.data?.photoIDBadge && (
                <Col lg={12} md={12} xs={24}>
                  <Row style={{ marginBottom: "25px" }} className="align-items-center">
                    <Col lg={12} md={12} xs={24}>
                      <div className="profile-metrics-counter d-flex align-items-center">
                        <p className="m-0 fs-16 fw-500">Photo for ID Badge</p>
                      </div>
                    </Col>
                    <Form.Item name="photoForIdBadge">
                      <Col lg={12} md={12} xs={24} className="d-flex align-items-center">
                        <Counter countValue={stafMetricsData?.data?.photoForIdBadge} requiredPercentage={requiredPercentage} handleUpdateCount={handleUpdateCount} noLimit={false} /> <span className="fs-14" style={{ color: "#6E7191" }}> % </span>
                      </Col>
                    </Form.Item>
                  </Row>
                </Col>
              )}

              {registerationConfigurationData?.data?.idUpload && (
                <Col lg={12} md={12} xs={24}>
                  <Row style={{ marginBottom: "25px" }} className="align-items-center">
                    <Col lg={12} md={12} xs={24}>
                      <div className="profile-metrics-counter d-flex align-items-center">
                        <p className="m-0 fs-16 fw-500">ID Upload (Passport/DL)</p>
                      </div>
                    </Col>
                    <Form.Item name="IdUpload">
                      <Col lg={12} md={12} xs={24} className="d-flex align-items-center">
                        <Counter countValue={stafMetricsData?.data?.IdUpload} requiredPercentage={requiredPercentage} handleUpdateCount={handleUpdateCount} noLimit={false} /> <span className="fs-14" style={{ color: "#6E7191" }}> % </span>
                      </Col>
                    </Form.Item>
                  </Row>
                </Col>
              )}

              {registerationConfigurationData?.data?.photoIDBadge && (
                <Col lg={12} md={12} xs={24}>
                  <Row style={{ marginBottom: "25px" }} className="align-items-center">
                    <Col lg={12} md={12} xs={24}>
                      <div className="profile-metrics-counter d-flex align-items-center">
                        <p className="m-0 fs-16 fw-500">Add Reference</p>
                      </div>
                    </Col>
                    <Form.Item name="addReference">
                      <Col lg={12} md={12} xs={24} className="d-flex align-items-center">
                        <Counter countValue={stafMetricsData?.data?.addReference} requiredPercentage={requiredPercentage} handleUpdateCount={handleUpdateCount} noLimit={false} /> <span className="fs-14" style={{ color: "#6E7191" }}> % </span>
                      </Col>
                    </Form.Item>
                  </Row>
                </Col>
              )}

              {/* {registerationConfigurationData?.data?.photoIDBadge && ( */}
              <Col lg={12} md={12} xs={24}>
                <Row style={{ marginBottom: "25px" }} className="align-items-center">
                  <Col lg={12} md={12} xs={24}>
                    <div className="profile-metrics-counter d-flex align-items-center">
                      <p className="m-0 fs-16 fw-500">Certificate Status</p>
                    </div>
                  </Col>
                  <Form.Item name="certificateStatus">
                    <Col lg={12} md={12} xs={24} className="d-flex align-items-center">
                      <Counter countValue={stafMetricsData?.data?.certificateStatus} requiredPercentage={requiredPercentage} handleUpdateCount={handleUpdateCount} noLimit={false} /> <span className="fs-14" style={{ color: "#6E7191" }}> % </span>
                    </Col>
                  </Form.Item>
                </Row>
              </Col>
              {/* )} */}

              {registerationConfigurationData?.data?.trainingAndWorkHistroy && (
                <Col lg={12} md={12} xs={24}>
                  <Row style={{ marginBottom: "25px" }} className="align-items-center">
                    <Col lg={12} md={12} xs={24}>
                      <div className="profile-metrics-counter d-flex align-items-center">
                        <p className="m-0 fs-16 fw-500">Additional Training Details</p>
                      </div>
                    </Col>
                    <Form.Item name="additionalTrainingDetail">
                      <Col lg={12} md={12} xs={24} className="d-flex align-items-center">
                        <Counter countValue={stafMetricsData?.data?.additionalTrainingDetail} requiredPercentage={requiredPercentage} handleUpdateCount={handleUpdateCount} noLimit={false} /> <span className="fs-14" style={{ color: "#6E7191" }}> % </span>
                      </Col>
                    </Form.Item>
                  </Row>
                </Col>
              )}

              {/* {registerationConfigurationData?.data?.photoIDBadge && ( */}
              <Col lg={12} md={12} xs={24}>
                <Row style={{ marginBottom: "25px" }} className="align-items-center">
                  <Col lg={12} md={12} xs={24}>
                    <div className="profile-metrics-counter d-flex align-items-center">
                      <p className="m-0 fs-16 fw-500">Work Experience</p>
                    </div>
                  </Col>
                  <Form.Item name="workExperiance">
                    <Col lg={12} md={12} xs={24} className="d-flex align-items-center">
                      <Counter countValue={stafMetricsData?.data?.workExperiance} requiredPercentage={requiredPercentage} handleUpdateCount={handleUpdateCount} noLimit={false} /> <span className="fs-14" style={{ color: "#6E7191" }}> % </span>
                    </Col>
                  </Form.Item>
                </Row>
              </Col>
              {/* )} */}

              {/* {registerationConfigurationData?.data?.photoIDBadge && ( */}
              <Col lg={12} md={12} xs={24}>
                <Row style={{ marginBottom: "25px" }} className="align-items-center">
                  <Col lg={12} md={12} xs={24}>
                    <div className="profile-metrics-counter d-flex align-items-center">
                      <p className="m-0 fs-16 fw-500">Regulatory Registration</p>
                    </div>
                  </Col>
                  <Form.Item name="regulatoryRegistration">
                    <Col lg={12} md={12} xs={24} className="d-flex align-items-center">
                      <Counter countValue={stafMetricsData?.data?.regulatoryRegistration} requiredPercentage={requiredPercentage} handleUpdateCount={handleUpdateCount} noLimit={false} /> <span className="fs-14" style={{ color: "#6E7191" }}> % </span>
                    </Col>
                  </Form.Item>
                </Row>
              </Col>
              {/* )} */}

              {/* {registerationConfigurationData?.data?.photoIDBadge && ( */}
              <Col lg={12} md={12} xs={24}>
                <Row style={{ marginBottom: "25px" }} className="align-items-center">
                  <Col lg={12} md={12} xs={24}>
                    <div className="profile-metrics-counter d-flex align-items-center">
                      <p className="m-0 fs-16 fw-500">Right to Work</p>
                    </div>
                  </Col>
                  <Form.Item name="rightToWork">
                    <Col lg={12} md={12} xs={24} className="d-flex align-items-center">
                      <Counter countValue={stafMetricsData?.data?.rightToWork} requiredPercentage={requiredPercentage} handleUpdateCount={handleUpdateCount} noLimit={false} /> <span className="fs-14" style={{ color: "#6E7191" }}> % </span>
                    </Col>
                  </Form.Item>
                </Row>
              </Col>
              {/* )} */}


              {/* {registerationConfigurationData?.data?.photoIDBadge && ( */}
              <Col lg={12} md={12} xs={24}>
                <Row style={{ marginBottom: "25px" }} className="align-items-center">
                  <Col lg={12} md={12} xs={24}>
                    <div className="profile-metrics-counter d-flex align-items-center">
                      <p className="m-0 fs-16 fw-500">Next of Kin</p>
                    </div>
                  </Col>
                  <Form.Item name="nextOfKin">
                    <Col lg={12} md={12} xs={24} className="d-flex align-items-center">
                      <Counter countValue={stafMetricsData?.data?.nextOfKin} requiredPercentage={requiredPercentage} handleUpdateCount={handleUpdateCount} noLimit={false} /> <span className="fs-14" style={{ color: "#6E7191" }}> % </span>
                    </Col>
                  </Form.Item>
                </Row>
              </Col>
              {/* )} */}

              {/* {registerationConfigurationData?.data?.photoIDBadge && ( */}
              <Col lg={12} md={12} xs={24}>
                <Row style={{ marginBottom: "25px" }} className="align-items-center">
                  <Col lg={12} md={12} xs={24}>
                    <div className="profile-metrics-counter d-flex align-items-center">
                      <p className="m-0 fs-16 fw-500">Contact Preference</p>
                    </div>
                  </Col>
                  <Form.Item name="contactPreference">
                    <Col lg={12} md={12} xs={24} className="d-flex align-items-center">
                      <Counter countValue={stafMetricsData?.data?.contactPreference} requiredPercentage={requiredPercentage} handleUpdateCount={handleUpdateCount} noLimit={false} /> <span className="fs-14" style={{ color: "#6E7191" }}> % </span>
                    </Col>
                  </Form.Item>
                </Row>
              </Col>
              {/* )} */}

              {/* {registerationConfigurationData?.data?.photoIDBadge && ( */}
              <Col lg={12} md={12} xs={24}>
                <Row style={{ marginBottom: "25px" }} className="align-items-center">
                  <Col lg={12} md={12} xs={24}>
                    <div className="profile-metrics-counter d-flex align-items-center">
                      <p className="m-0 fs-16 fw-500">Employment Status</p>
                    </div>
                  </Col>
                  <Form.Item name="employeeStatus">
                    <Col lg={12} md={12} xs={24} className="d-flex align-items-center">
                      <Counter countValue={stafMetricsData?.data?.employeeStatus} requiredPercentage={requiredPercentage} handleUpdateCount={handleUpdateCount} noLimit={false} /> <span className="fs-14" style={{ color: "#6E7191" }}> % </span>
                    </Col>
                  </Form.Item>
                </Row>
              </Col>
              {/* )} */}


              {/* {registerationConfigurationData?.data?.photoIDBadge && ( */}
              <Col lg={12} md={12} xs={24}>
                <Row style={{ marginBottom: "25px" }} className="align-items-center">
                  <Col lg={12} md={12} xs={24}>
                    <div className="profile-metrics-counter d-flex align-items-center">
                      <p className="m-0 fs-16 fw-500">Equal Opportunity Declaration</p>
                    </div>
                  </Col>
                  <Form.Item name="equalOpportunityDeclaration">
                    <Col lg={12} md={12} xs={24} className="d-flex align-items-center">
                      <Counter countValue={stafMetricsData?.data?.equalOpportunityDeclaration && stafMetricsData?.data?.equalOpportunityDeclaration} requiredPercentage={requiredPercentage} handleUpdateCount={handleUpdateCount} noLimit={false} /> <span className="fs-14" style={{ color: "#6E7191" }}> % </span>
                    </Col>
                  </Form.Item>
                </Row>
              </Col>
              {/* )} */}

              {/* {registerationConfigurationData?.data?.photoIDBadge && ( */}
              <Col lg={12} md={12} xs={24}>
                <Row style={{ marginBottom: "25px" }} className="align-items-center">
                  <Col lg={12} md={12} xs={24}>
                    <div className="profile-metrics-counter d-flex align-items-center">
                      <p className="m-0 fs-16 fw-500">Immunisation</p>
                    </div>
                  </Col>
                  <Form.Item name="Immunisation">
                    <Col lg={12} md={12} xs={24} className="d-flex align-items-center">
                      <Counter countValue={stafMetricsData?.data?.Immunisation} requiredPercentage={requiredPercentage} handleUpdateCount={handleUpdateCount} noLimit={false} /> <span className="fs-14" style={{ color: "#6E7191" }}> % </span>
                    </Col>
                  </Form.Item>
                </Row>
              </Col>
              {/* )} */}

              {/* {registerationConfigurationData?.data?.photoIDBadge && ( */}
              <Col lg={12} md={12} xs={24}>
                <Row style={{ marginBottom: "25px" }} className="align-items-center">
                  <Col lg={12} md={12} xs={24}>
                    <div className="profile-metrics-counter d-flex align-items-center">
                      <p className="m-0 fs-16 fw-500">Medical Questionnaire</p>
                    </div>
                  </Col>
                  <Form.Item name="medicalQuestionnaire">
                    <Col lg={12} md={12} xs={24} className="d-flex align-items-center">
                      <Counter countValue={stafMetricsData?.data?.medicalQuestionnaire} requiredPercentage={requiredPercentage} handleUpdateCount={handleUpdateCount} noLimit={false} /> <span className="fs-14" style={{ color: "#6E7191" }}> % </span>
                    </Col>
                  </Form.Item>
                </Row>
              </Col>
              {/* )} */}

            </Row>
            <Form.Item>
              {stafMetricsData?.data && <Button className="save-btn" htmlType="submit"> Save</Button>}
            </Form.Item>
          </Form>

        </div>
      )}

    </div>

  );
}

export default ProfileMetrics;
