import { Col, Row, Tooltip } from 'antd'
import { Form } from 'antd';
import "./ClientManagerForm.scss"
import infoIcon from "../../../../assets/icons/info-icon.svg"
import TextArea from 'antd/es/input/TextArea';
import FormLowerButtons from './FormLowerButtons/FormLowerButtons';
import { usePostClientProfileInfoMutation, useGetClientRequestQuery, useGetRequestUserInforByIdQuery } from '../../../../store/Slices/ClientManager';
import { useLocation } from 'react-router-dom';
import AppSnackbar from '../../../../utils/AppSnackbar';
import { useState } from 'react';
import UploadImage from '../../../Setting/SettingKeyInfo/UploadImage/UploadImage';
import { useKeyInfoUpdateRequestMutation } from '../../../../store/Slices/KeyInfo';

const ClientPublicInformationForm = (props: any) => {

  const userData: any = localStorage.getItem("careUserData")
  const { username, role }: any = JSON.parse(userData);
  const { id }: any = JSON.parse(userData);
  const [pagination, setPagination] = useState({ limit: 10, page: 1 });
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

 

  const [postClientProfileInfo] = usePostClientProfileInfoMutation();
  const [isAuditValue, setIsAuditValue] = useState(false)
  const [certificateId ,setCertificateId]=useState("")
  const { state }: any = useLocation()
  const getAudits = (audit: any) => {
    setIsAuditValue(audit)

  }
  const uploadCertificateId=(id:any)=>{
    setCertificateId(id)
}
  const { data: isInfoData, isLoading: isloadingInfoData, isError: isErrorInfoData, isSuccess: isSucessInfoData } = useGetClientRequestQuery({ pagination, role, query:"" })
  // Update Business Logo
    const [keyInfoUpdateRequest]= useKeyInfoUpdateRequestMutation()
  
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

console.log()

  const onFinish = async(values: any) => {
    let userId = state?.editProfile?._id;
    const formValues = {
      publicInfo: values.publicInfo,
      isAudited: isAuditValue
    }
    keyInfoUpdateRequest({payload:{logo:certificateId}})
    // postClientProfileInfo({ userId: userId ? userId : id, payload: formValues, });
    // AppSnackbar({ type: "success", messageHeading: "Success!", message: "Profile comment edited Successfully" });
    // let stepperChange = () => props.onChildStateChange(props.selectedStepValue + 1);
    // setTimeout(stepperChange, 1000);


    try {
      const { data, error }: any = await postClientProfileInfo({ userId: userId ? userId : id, payload: formValues, })
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
  const payLoadInitialData = {
    // publicInfo: state?.editProfile?.publicInfo ? state?.editProfile?.publicInfo : getResUserData ? getResUserData[0]?.publicInfo : '',
    publicInfo: state?.editProfile?.publicInfo? state?.editProfile?.publicInfo: (getResUserData ? getResUserData[0]?.publicInfo : "") || getRecentReviews?.data?.userprofile?.publicInfo,
  }

  return (
    <>
      {
        
          isSucessInfoData ?
          <div className='client-manager-information-form-wrapper'>
            <div className='form-heading heading-flex'>Client Public Information
              <Tooltip
                placement="bottomLeft"
                autoAdjustOverflow={true}
                showArrow={false}
                color="#65CDF0"
                overlayInnerStyle={{
                  backgroundColor: "#65CDF0",
                  color: "#ffffff",
                  width: "499px",
                }}
                title='Up to 265 characters of text can be entered here which is visible to staff mobile apps when shifts are posted through the apps.'
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
                <Col span={20}>
                  <Form.Item
                    label="Enter information here"
                    name="publicInfo"
                    rules={[{ required: false, message: 'Required field' }]}
                  >
                    <TextArea rows={4} />
                  </Form.Item>
                </Col>
                <Col xs={24} lg={21}>
                    <label className="fw-600 fs-14" style={{color:"#6E7191"}}>Business Logo</label>
                        <UploadImage  uploadCertificateId={uploadCertificateId} fileUrl={`${getRecentReviews?.data?.userprofile?.uploadLogo?.mediaId}${getRecentReviews?.data?.userprofile?.uploadLogo?.mediaMeta?.extension}`} />
                    </Col>
              </Row>

              <FormLowerButtons getAudit={getAudits} />

            </Form>



          </div>
          :
          <span>loading..</span>
      }
    </>
  )
}

export default ClientPublicInformationForm