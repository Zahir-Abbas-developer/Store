import { Col, Row, Select, Switch, Tooltip } from 'antd'
import { Form, Input } from 'antd';
import infoIcon from "../../../../assets/icons/info-icon.svg"
import "./ClientManagerForm.scss"
import FormLowerButtons from './FormLowerButtons/FormLowerButtons';
import { useLocation } from 'react-router-dom';
import { useGetClientRequestQuery, useGetManageGroupDataQuery, useGetRequestUserInforByIdQuery, usePostClientProfileInfoMutation } from '../../../../store/Slices/ClientManager';
import { useEffect, useState } from 'react';
import AppSnackbar from '../../../../utils/AppSnackbar';
import { ROLES } from '../../../../constants/Roles';

const ClientProfileInfoForm = ({ onChildStateChange, selectedStepValue }: any) => {
  const [isEmailNotification, setIsEmailNotification] = useState<boolean>()
  const [isPartOfGroup, setIsPartOfGroup] = useState()
  const [isAuditValue, setIsAuditValue] = useState(false)
  const [postClientProfileInfo] = usePostClientProfileInfoMutation();
  const [pagination, setPagination] = useState({ limit: 10, page: 1 });
  const { state }: any = useLocation();
  const paramsObj: any = {};


  const userData: any = localStorage.getItem("careUserData")
  const { username }: any = JSON.parse(userData);
  const { id, role, roleId }: any = JSON.parse(userData);

  // console.log("id +==>", id)
  if (role === ROLES.client) paramsObj['roleId'] = roleId;
  const query = "&" + new URLSearchParams(paramsObj).toString();


  const { data: isData, isLoading: isloadingData, isSuccess: isSuccessData, isError: iserrorData, } = useGetRequestUserInforByIdQuery({ refetchOnMountOrArgChange: true, id: id, detail: "ABOUT" });
  //  get client name
  let getRecentReviews: any;
  if (isloadingData) {
    getRecentReviews = <p>Loading...</p>;
  } else if (isSuccessData) {
    getRecentReviews = isData;
  } else if (iserrorData) {
    getRecentReviews = <p>Error...</p>;
  }

  // get clieint group api
  const { data, isSuccess, } = useGetManageGroupDataQuery({ refetchOnMountOrArgChange: true });
  let partOfGroupData: any;

  if (isSuccess) {
    partOfGroupData = data
  }

  const { data: isInfoData, isLoading: isloadingInfoData, isError: isErrorInfoData, isSuccess: isSucessInfoData } = useGetClientRequestQuery({ refetchOnMountOrArgChange: true, query: role === ROLES.client ? query : "", pagination: pagination, role: "client" })
  let getClientManagerData: any;
  if (isloadingInfoData) {
    getClientManagerData = <p>Loading...</p>
  }
  else if (isSucessInfoData) {
    getClientManagerData = isInfoData
  }
  else if (isErrorInfoData) {
    getClientManagerData = <p>Error...</p>
  }

  const getResUserData = getClientManagerData?.data?.result?.filter((item: any) => item.email === username);
  const filteredData = getClientManagerData?.data?.result.find((obj: { _id: string; }) => obj._id === state?.editProfile?._id);
  const getCreateGroupData = partOfGroupData?.data?.result ?? [];
  const getGroupNameData = getCreateGroupData?.map((data: any) => ({ value: data._id, label: data.name })) ?? [];

  // Email Validation 
  const emailValidator = (rule: any, value: any, callback: any) => {
    if (!value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      callback();
    } else {
      callback('Please enter a valid email address');
    }
  };

  // switch
  function emailNotificationHandler(checked: any) {
    setIsEmailNotification(checked)
  }
  const handleChange = (value: any) => {
    setIsPartOfGroup(value)
  }

  const getAudits = (audit: any) => {
    setIsAuditValue(audit)

  }

  const onFinish = async (values: any) => {
    console.log('Success:', values);
    let userId = state?.editProfile?._id;
    const formValues = {
      clientName: values.clientName,
      emailNotification: isEmailNotification,
      phone: values.phone,
      addtionalPhone: values.addtionalPhone,
      businessName: values.businessName,
      clientType: values.clientType,
      groupId: isPartOfGroup ?? state?.editProfile?.clientGroups?._id,
      isAudited: isAuditValue
    }
    let payload = { profileInfo: formValues }
    // postClientProfileInfo({ userId: userId || id, payload });
    // AppSnackbar({ type: "success", messageHeading: "Success!", message: "Data added Successfully" });
    // let stepperChange = () => onChildStateChange(selectedStepValue + 1);
    // setTimeout(stepperChange, 1000);

    try {
      const { data, error }: any = await postClientProfileInfo({ userId: userId || id, payload })
      if (error) {
        AppSnackbar({
          type: "error",
          messageHeading: "Error",
          message: error?.data?.message ?? "Something went wrong!"
        });
        return;
      }
      let stepperChange = () => onChildStateChange(selectedStepValue + 1);
      setTimeout(stepperChange, 1000);
    }
    catch (error) {
      console.log("Unexpected error:", error);
    }
    AppSnackbar({ type: "success", messageHeading: "Success!", message: "Data uploaded sucessfully" });

  };

  const payLoadInitialData = {

    clientName: state?.editProfile?.clientName ? state.editProfile.clientName : (getResUserData ? getResUserData[0]?.clientName : "") || getRecentReviews?.data?.userprofile?.clientName,
    email: state?.editProfile?.email ? state.editProfile.email : (getResUserData ? getResUserData[0]?.email : "") || getRecentReviews?.data?.userprofile?.email,
    phone: state?.editProfile?.phone ? state.editProfile.phone : (getResUserData ? getResUserData[0]?.phone : "") || getRecentReviews?.data?.userprofile?.phone,
    addtionalPhone: state?.editProfile?.addtionalPhone ? state.editProfile.addtionalPhone : (getResUserData ? getResUserData[0]?.addtionalPhone : "") || getRecentReviews?.data?.userprofile?.addtionalPhone,
    businessName: state?.editProfile?.businessName ? state.editProfile.businessName : (getResUserData ? getResUserData[0]?.businessName : "") || getRecentReviews?.data?.userprofile?.businessName,
    clientType: state?.editProfile?.clientType ? state.editProfile.clientType : (getResUserData ? getResUserData[0]?.clientType : "") || getRecentReviews?.data?.userprofile?.clientType,
    emailNotification: state?.editProfile?.emailNotification ? state.editProfile.emailNotification : (getResUserData ? getResUserData[0]?.emailNotification : "") || getRecentReviews?.data?.userprofile?.emailNotification,
    cPartOfGroup: state?.editProfile?.clientGroups?._id ? state.editProfile.clientGroups?._id : (getResUserData ? getResUserData[0]?.clientGroups?._id : "") || getRecentReviews?.data?.userprofile?.clientGroups?._id,
    // cPartOfGroup: state?.editProfile?.clientGroups?._id,
  }


  // console.log("getResUserData[0]?.email", getResUserData ? getResUserData[0]?.email : 'null')

  useEffect(() => {
  }, [isInfoData, isData])


  console.log("res=>",
    state?.editProfile?.clientName ? state.editProfile.clientName : (getResUserData ? getResUserData[0]?.clientName : "") || getRecentReviews?.data?.userprofile?.clientName
  )

  return (
    <>
      {
        isSucessInfoData ?
          <>
            < div className='client-manager-information-form-wrapper' >
              <div className='form-heading heading-flex'>Client Profile Information
                <Tooltip
                  placement="bottomLeft"
                  autoAdjustOverflow={true}
                  showArrow={false}
                  color="#65CDF0"
                  overlayInnerStyle={{
                    backgroundColor: "#65CDF0",
                    color: "#ffffff",
                    width: "450px",
                  }}
                  title='You can add basic information about your client here.'
                >
                  <img src={infoIcon} alt="infoIcon" />
                </Tooltip>
              </div>
              <Form
                name="basic"
                initialValues={filteredData ?? payLoadInitialData}
                onFinish={onFinish}
                layout="vertical"
              >
                <Row gutter={[30, 5]} align="bottom">
                  <Col xs={24} sm={24} md={12} lg={10}>
                    <Form.Item
                      label="Client Name"
                      name="clientName"
                      rules={[{ required: true, message: 'Required field' }]}
                    >
                      <Input placeholder="Client Name" style={{ width: '100%', height: '45px' }} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={10}>
                    <Form.Item
                      label="Email"
                      name="email"


                      rules={[
                        { required: true, message: 'Required field' },
                        { validator: emailValidator },]}
                    >
                      <Input disabled placeholder="Email" style={{ width: '100%', height: '45px' }} />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      name="emailNotification"
                      rules={[{ required: false, message: 'Required field' }]}
                    >
                      <div className='form--label'>
                        <label htmlFor="">Email Notification Setting</label>
                        <p className='m--0 d--flex fw-500' style={{ marginTop: '11px' }}>
                          <Switch onChange={emailNotificationHandler} />&nbsp;&nbsp;Do you want Email notification to be turned on for this client? </p>
                      </div>
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={10}>
                    <Form.Item
                      label="Mobile Number"
                      name="phone"
                      rules={[
                        { required: true, message: 'Required field' },
                      ]}
                    >
                      <Input type='number' placeholder="Mobile Number" style={{ width: '100%', height: '45px' }} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={10}>
                    <Form.Item
                      label="Additional Phone"
                      name="addtionalPhone "
                      rules={[{ required: false, message: 'Required field' }]}
                    >
                      <Input placeholder="Additional Phone" style={{ width: '100%', height: '45px' }} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={10}>
                    <Form.Item
                      label="Business Name"
                      name="businessName"
                      rules={[{ required: true, message: 'Required field' }]}
                    >
                      <Input placeholder="Business Name" style={{ width: '100%', height: '45px' }} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={10}>
                    <Form.Item
                      label="Client Type"
                      name="clientType"
                      rules={[{ required: true, message: 'Required field' }]}
                    >
                      <Input placeholder="Client Type" style={{ width: '100%', height: '45px' }} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={10}>
                    <Form.Item
                      label="Part of a group? "
                      name="cPartOfGroup"
                      rules={[{ required: true, message: 'Required field' }]}

                    >

                      <Select
                        placeholder="Select Name"
                        style={{ width: '100%' }}
                        onChange={handleChange}
                        options={getGroupNameData}
                      >
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <FormLowerButtons getAudit={getAudits} />
              </Form>
            </div >
          </>
          :
          <span>loading</span>

      }
    </>

  )
}

export default ClientProfileInfoForm