import { useState } from 'react';
import { Button, Col, Row, Select, Switch, Tooltip } from 'antd'
import { Form, Input } from 'antd';
import arrowDown from "../../../../assets/icons/arrow-down-icon.svg"
import TextArea from 'antd/es/input/TextArea';
import "./ClientManagerForm.scss"
import FormLowerButtons from './FormLowerButtons/FormLowerButtons';
import { useLocation } from 'react-router-dom';
import { useGetClientRequestQuery, useGetRequestUserInforByIdQuery, usePostClientProfileInfoMutation } from '../../../../store/Slices/ClientManager';
import AppSnackbar from '../../../../utils/AppSnackbar';
import { ukCities } from './UkCitiesName';

const { Option } = Select;

const ClientAddressForm = (props: any) => {
  // state start
  const { state }: any = useLocation()
  const [isAdditionalPhone, setIsAdditionalPhone] = useState(false)
  const [isAuditValue, setIsAuditValue] = useState(false)
  const [pagination, setPagination] = useState({ limit: 10, page: 1 });
  const [postClientProfileInfo] = usePostClientProfileInfoMutation();

  const userData: any = localStorage.getItem("careUserData")
  const { username }: any = JSON.parse(userData);
  const { id }: any = JSON.parse(userData);


  const { data: isData, isLoading: isloadingData, isSuccess: isSuccessData, isError: iserrorData,} = useGetRequestUserInforByIdQuery({ refetchOnMountOrArgChange: true, id:id, detail: "ABOUT" });
  //  get client name
  let getRecentReviews: any;
  if (isloadingData) {
   getRecentReviews = <p>Loading...</p>;
 } else if (isSuccessData) {
   getRecentReviews = isData;
 } else if (iserrorData) {
   getRecentReviews = <p>Error...</p>;
 }


  const { data: isInfoData, isLoading: isloadingInfoData, isError: isErrorInfoData, isSuccess: isSucessInfoData } = useGetClientRequestQuery({ refetchOnMountOrArgChange: true, query:"",pagination:pagination,role:"client" })
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


  //  onchange handler start here
  const onChange = (checked: boolean) => {
    setIsAdditionalPhone(checked)
  };
  const getAudits = (audit: any) => {
    setIsAuditValue(audit)

  }
  const onFinish = async(values: any) => {
    console.log('Success:', values);
    let userId = state?.editProfile?._id;
    const formValues = {
      country: values.country,
      city: values.TownCity,
      line1: values.address,
      postCode: values.postCode,
      typedAddress: values.manualAddress,
      isAudited: isAuditValue
    }

    let payload = { address: formValues }
    // postClientProfileInfo({ userId: userId ? userId : id, payload: payload });
    // AppSnackbar({ type: "success", messageHeading: "Success!", message: "Client Address edited Successfully" });
    // let stepperChange = () => props.onChildStateChange(props.selectedStepValue + 1);
    // setTimeout(stepperChange, 1000);



    try {
      const { data, error }: any = await postClientProfileInfo({ userId: userId ? userId : id, payload: payload })
      if (error) {
        AppSnackbar({
          type: "error",
          messageHeading: "Error",
          message: error?.data?.message ?? "Something went wrong!"
        });
        return;
      }
      let stepperChange = () => props.onChildStateChange(props.selectedStepValue + 1);
      setTimeout(stepperChange, 1000);
    }
    catch (error) {
      console.log("Unexpected error:", error);
    }
    AppSnackbar({ type: "success", messageHeading: "Success!", message: "Data uploaded sucessfully" });


  };

  // initial values
  const payLoadInitialData = {
    // country: state?.editProfile?.address?.country ? state?.editProfile?.address?.country : getResUserData ? getResUserData[0]?.address?.country : '',
    // TownCity: state?.editProfile?.address?.city ? state?.editProfile?.address?.city : getResUserData ? getResUserData[0]?.address?.city : '', 
    // address: state?.editProfile?.address?.line1 ? state?.editProfile?.address?.line1 : getResUserData ? getResUserData[0]?.address?.line1 : '',
    // postCode: state?.editProfile?.address?.postCode ? state?.editProfile?.address?.postCode : getResUserData ? getResUserData[0]?.address?.postCode : '',
    // manualAddress: state?.editProfile?.address?.typedAddress ? state?.editProfile?.address?.typedAddress : getResUserData ? getResUserData[0]?.address?.typedAddress : '',
    country: state?.editProfile?.address?.country ? state?.editProfile?.address?.country : (getResUserData ? getResUserData[0]?.address?.country : "") || getRecentReviews?.data?.userprofile?.address?.country,
    TownCity: state?.editProfile?.address?.city ? state?.editProfile?.address?.city : (getResUserData ? getResUserData[0]?.address?.city : "") || getRecentReviews?.data?.userprofile?.address?.city, 
    address: state?.editProfile?.address?.line1 ? state?.editProfile?.address?.line1 : (getResUserData ? getResUserData[0]?.address?.line1 : "") || getRecentReviews?.data?.userprofile?.address?.line1,
    postCode: state?.editProfile?.address?.postCode ? state?.editProfile?.address?.postCode : (getResUserData ? getResUserData[0]?.address?.postCode : "") || getRecentReviews?.data?.userprofile?.address?.postCode,
    manualAddress: state?.editProfile?.address?.typedAddress ? state?.editProfile?.address?.typedAddress : (getResUserData ? getResUserData[0]?.address?.typedAddress : "") || getRecentReviews?.data?.userprofile?.address?.typedAddress,
  }
  console.log("citry is", payLoadInitialData)
  return (
    <>
      {
        isSucessInfoData ?
          <div className='client-manager-information-form-wrapper'>
            <div className='form-heading heading-flex'>Client Address</div>
            <Form
              name="basic"
              initialValues={payLoadInitialData}
              onFinish={onFinish}
              layout="vertical"
            >
              <Row gutter={[30, 5]} align="bottom">
                <Col xs={24} sm={24} md={12} lg={10}>
                  <Form.Item
                    label="Country"
                    name="country"
                    rules={[{ required: true, message: 'Required field' }]}
                  >
                    <Select placeholder="Select country" suffixIcon={<img src={arrowDown} />}>
                      <Option value="uk">uk</Option>

                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={10}>
                  <Form.Item
                    label="Town/City"
                    name="TownCity"
                    rules={[{ required: true, message: 'Required field' }]}
                  >
                    {/* <Select placeholder="Select Town/City"  suffixIcon={<img src={arrowDown} />}>
                    <Option value="Birmingham">Birmingham</Option>
                    <Option value="Bradford">Bradford</Option>
                    <Option value="Bristol">Bristol</Option>
                </Select> */}
                    <Select placeholder="Select Address">
                      {ukCities.map((item) => (
                        <Option value={item}>{item}</Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={20}>
                  <Form.Item
                    label="Address"
                    name="address"
                    rules={[{ required: false, message: 'Required field' }]}
                  >
                    
                    <Input placeholder="Select Address" style={{ width: '100%', height: '45px' }} />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={10}>
                  <Form.Item
                    label="Post Code"
                    name="postCode"
                    rules={[{ required: true, message: 'Required field' }]}
                  >
                    <Input placeholder="Enter Post Code" style={{ width: '100%', height: '45px' }} />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    // label="Additional Phone "
                    name="additionalPhone "
                    rules={[{ required: false, message: 'Required field' }]}
                  >
                    <div>
                      <Switch onChange={onChange} /> &nbsp; Add address manually?
                    </div>
                  </Form.Item>
                </Col>

                {isAdditionalPhone && <Col span={20}>
                  <Form.Item
                    label="Enter address"
                    name="manualAddress"
                    rules={[{ required: false, message: 'Required field' }]}
                  >
                    <TextArea rows={4} />
                  </Form.Item>
                </Col>}

              </Row>
              <FormLowerButtons getAudit={getAudits} />

            </Form>
          </div>
          : <span>Loading</span>
      }
    </>

  )
}

export default ClientAddressForm