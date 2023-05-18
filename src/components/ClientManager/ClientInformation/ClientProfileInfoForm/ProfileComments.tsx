import { Button, Col, Row, Select, Switch, Tooltip } from 'antd'
import { Form, Input } from 'antd';
import infoIcon from "../../../../assets/icons/info-icon.svg"
import TextArea from 'antd/es/input/TextArea';
import "./ClientManagerForm.scss"
import FormLowerButtons from './FormLowerButtons/FormLowerButtons';
import { useGetClientRequestQuery, useGetRequestUserInforByIdQuery, usePostClientCommentMutation } from '../../../../store/Slices/ClientManager';
import { useLocation } from 'react-router-dom';
import AppSnackbar from '../../../../utils/AppSnackbar';
import { useState } from 'react';




const ProfileComments = (props: any) => {
  const { state }: any = useLocation()
  const [postClientComment] = usePostClientCommentMutation();
  const [pagination, setPagination] = useState({ limit: 10, page: 1 });
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
  const filteredData = getClientManagerData?.data?.result.find((obj: { _id: string; }) => obj._id === state?.editProfile?._id);


  

  const onFinish = async(values: any) => {
    console.log('Success:', values);
    let userId = state?.editProfile?._id;
    // postClientComment({ userId : userId ? userId : id , payload: values });
    // AppSnackbar({ type: "success", messageHeading: "Success!", message: "Profile comment edited Successfully" });
    // let stepperChange = () => props.onChildStateChange(props.selectedStepValue + 1);
    // setTimeout(stepperChange, 1000);


    try {
      const { data, error }: any = await postClientComment({ userId : userId ? userId : id , payload: values });;
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
    // comments: state?.editProfile?.comments ? state?.editProfile?.comments : getResUserData ? getResUserData[0]?.comments : '',
    comments: state?.editProfile?.address?.comments ? state?.editProfile?.comments : (getResUserData ? getResUserData[0]?.comments : "") || getRecentReviews?.data?.userprofile?.comments,
  }

  return (
    <>
    {
      isSucessInfoData ? 
      <div className='client-manager-information-form-wrapper'>
      <div className='form-heading heading-flex'>Profile Comments
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
          title='Any notes and comments, log of communications etc can be added here to retrieve and review in future.'
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
              label="Please write your comments here"
              name="comments"
              rules={[{ required: true, message: 'Required field' }]}
            >
              <TextArea rows={4} />
            </Form.Item>
          </Col>
        </Row>
        <FormLowerButtons />
      </Form>
    </div>
      : <span>Loading</span>
    }
    </>
    
  )
}

export default ProfileComments