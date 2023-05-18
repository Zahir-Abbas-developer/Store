import React, { useEffect, useState } from 'react'

import { Button, Checkbox, Col, DatePicker, Dropdown, MenuProps, message, Row, Select, Switch, Tooltip, UploadProps } from 'antd'
import { Form, Input } from 'antd';
import infoIcon from "../../../../assets/icons/info-icon.svg"
import arrowDown from "../../../../assets/icons/arrow-down-icon.svg"
import DateIcon from "../../../../assets/icons/calender-icon.svg"
import bgUpload from "../../../../assets/images/Webinar/bg-upload.svg"

import uploadCloudIcon from "../../../../assets/icons/AddCourse/upload-cloud.svg"


import './Attendees.scss'
import TextArea from 'antd/es/input/TextArea';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { useLocation } from 'react-router-dom';
import { useGetAttendessDataQuery, useGetUpcomingWebinarByIDQuery, usePatchWebinarAttendesMutation, usePostAddWebinaAttendeesMutation } from '../../../../store/Slices/Webinar/UpcommingWebinar';
import { useForm } from 'antd/es/form/Form';

import type { SelectProps } from 'antd';
import AppSnackbar from '../../../../utils/AppSnackbar';


const { Option } = Select;

const Attendees = ({ webinarDetailsResponse, upcommingWebinarByIdData }: any) => {


  const location = useLocation();
  const path = location.pathname;
  console.log('path', path)

  const { state }: any = useLocation()
  console.log("state", state?.editDetails)

  const { pathname } = useLocation()
  const route = pathname.split('/')
  const isEditWebinar = route[2]
  const id = route[3]

  const viewerMode = route[2] === 'view-webinar'


  const { data, isLoading, isError, isSuccess } = useGetAttendessDataQuery([])

  let getAttendeesData: any;
  if (isLoading) {
    getAttendeesData = <p>Loading...</p>
  }
  else if (isSuccess) {
    getAttendeesData = data
  }
  else if (isError) {
    getAttendeesData = <p>Error...</p>
  }
  console.log("getAttendeesData", getAttendeesData?.data?.result)








  const [form] = useForm()
  const [postAddWebinaAttendees] = usePostAddWebinaAttendeesMutation()
  const [patchWebinarAttendes] = usePatchWebinarAttendesMutation()


  const [isViewWebinar, setisViewWebinar] = useState(false)
  const [additionalDetailsFields, setadditionalDetailsFields] = useState()
  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>();
  const [isRegisterOutsider, setisRegisterOutsider] = useState(false);
  const [reminderNotification, setreminderNotification] = useState(false);
  const [thankyouEmail, setthankyouEmail] = useState(false);

  const [toggleAddEmail, settoggleAddEmail] = useState(false);

  const [attendeDefaultValue, setAttendeDefaultValue] = useState()

  console.log('attendeDefaultValue', attendeDefaultValue)
  // const options: any[] = [];

  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);

  const handleEmailsChange = (value: string[]) => {
    // console.log(`selected emails: ${value}`);
    setSelectedEmails(value);
  };

  const options: any[] = [];

  console.log("selectedEmailsSCD ==> ", selectedEmails)


  const handleIsRegisterOutsiderChange = (checked: any) => {
    setisRegisterOutsider(checked);
    // console.log('Switch 1:', checked);
  };
  const handleReminderNotificationChange = (checked: any) => {
    setreminderNotification(checked);
    // console.log('Switch 2:', checked);
  };
  const handleThankyouEmailChange = (checked: any) => {
    setthankyouEmail(checked);
    // console.log('Switch 3:', checked);
  };
  const handleIsToggleAddEmailOutsiderChange = (checked: any) => {
    settoggleAddEmail(checked);
  };


  const handleChange = (value: string) => {
    // console.log(`AttendeSelected ${value}`);
  }

  const onFinish = async(values: any) => {
    // console.log('Success:', values);

    makePayloadForAdditionalFields(values)
    const additionalFields = makePayloadForAdditionalFields(values);
    setadditionalDetailsFields(additionalFields);

    const payload =
    {
      "webinarId": webinarDetailsResponse,
      "requiredAttendees": values?.requireAttendees,
      "registerOutsider": isRegisterOutsider,
      "outsidersEmails": selectedEmails,
      "webinarSize": values?.webinarSize,
      "reminderNotification": reminderNotification,
      "thankyouEmail": thankyouEmail
    }

    const updatePayload =
    {
      "requiredAttendees": values?.requireAttendees,
      "registerOutsider": isRegisterOutsider,
      "outsidersEmails": selectedEmails,
      "webinarSize": values?.webinarSize,
      "reminderNotification": reminderNotification,
      "thankyouEmail": thankyouEmail
    }
   

    if (isEditWebinar === 'edit-webinar') {
      const id = state?.editDetails[0]?._id
      patchWebinarAttendes({ payload:updatePayload, id:id })
    } else {
      // postAddWebinaAttendees({ payload, id: webinarDetailsResponse })

      try {
        const { data, error }: any = await postAddWebinaAttendees({ payload, id: webinarDetailsResponse })
        if (error) {
          AppSnackbar({
            type: "error",
            messageHeading: "Error",
            message: error?.data?.message ?? "Something went wrong!"
          });
          return;
        }
      }
      catch (error) {
        console.log("Unexpected error:", error);
      }
      AppSnackbar({ type: "success", messageHeading: "Success!", message: "Data uploaded sucessfully" });

    }
    
  };

  // console.log("additionalDetailsFields", additionalDetailsFields)
  function makePayloadForAdditionalFields(valuesObject: any) {
    const { requireAttendees, webinarSize, firstName, lastName, email, ...rest } = valuesObject;
    return rest;
  }


  const onFinishFailed = (errorInfo: any) => {
    // console.log('Failed:', errorInfo);
  };
  const handelSelectChange = (checkedValues: any) => {
    setCheckedList(checkedValues);
  };

  // console.log("checkedList", checkedList)

  const [selectedValues, setSelectedValues] = useState<any>({});

  function handleCheckboxChange(checkedValues: any) {
    // console.log("checkedValues", checkedValues)
    const newSelectedValues: any = {};
    checkedValues.forEach((value: any) => {
      newSelectedValues[value] = '';
    });
    setSelectedValues(newSelectedValues);
  }

  console.log(Object.keys(selectedValues))

  // console.log("selectedValues", selectedValues)


  useEffect(() => {
    if (viewerMode) {
      setisViewWebinar(true)
    } else {
      setisViewWebinar(false)
    }
    if (isEditWebinar === 'edit-webinar') {
      setisRegisterOutsider(upcommingWebinarByIdData?.registerOutsider)
      setreminderNotification(upcommingWebinarByIdData?.reminderNotification)
      setthankyouEmail(upcommingWebinarByIdData?.thankyouEmail)
      setSelectedEmails(upcommingWebinarByIdData?.outsidersEmails)

      const responseId = upcommingWebinarByIdData?.attendees;

      const user = getAttendeesData?.data?.result && getAttendeesData?.data?.result?.find((u: any) => u._id === responseId);

      if (user) {
        const userRole = user.userRole;
        console.log("userRole", userRole);
        setAttendeDefaultValue(userRole)
      }

    }
  }, [path, attendeDefaultValue, id])


  return (
    <div className='attendees-wrapper-main'>
      <Form
        name="basic"
        initialValues={{
          webinarSize: upcommingWebinarByIdData?.webinarSize
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        // autoComplete="off"
        layout="vertical"
      >
        <Row gutter={[150, 5]} align="bottom">
          <Col xs={24} sm={24} md={12} lg={10}>
            <Form.Item
              label="Require Attendees"
              name="requireAttendees"
              rules={[{ required: true, message: 'Required field' }]}
            >
              <Select placeholder="Select an option" defaultValue={upcommingWebinarByIdData?.requiredAttendees} onChange={handleChange} suffixIcon={<img src={arrowDown} />} disabled={isViewWebinar}>
                {isEditWebinar === 'edit-webinar' && upcommingWebinarByIdData?.requiredAttendees && <Option selected value={upcommingWebinarByIdData?.requiredAttendees}>{attendeDefaultValue}</Option>}
                {getAttendeesData?.data?.result.map((item: any, index: any) => (
                  <Option key={item?._id} value={item?._id}>
                    {item?.userRole}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={10}>
            <Form.Item
              label="Webinar Size"
              name="webinarSize"
              rules={[{ required: true, message: 'Required field' }]}
            >
              <Select placeholder="Select an option" onChange={handleChange} suffixIcon={<img src={arrowDown} />} disabled={isViewWebinar}>
                <Option value={20}>20</Option>
                <Option value={30}>30</Option>
                <Option value={40}>40</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24}>
            <div className="d-flex" style={{ gap: '10px' }}><Switch checked={isRegisterOutsider} onChange={handleIsRegisterOutsiderChange} disabled={isViewWebinar} /> <span className='fs-14 fw-600 label-color'>Registration Form: Want your outsider trainee to register for this webinar?</span></div>
          </Col>

          {/* <Col xs={24} sm={24} md={24} lg={24}>
            <div className="d-flex" style={{ gap: '10px', marginTop:'10px' }}><Switch checked={toggleAddEmail} onChange={handleIsToggleAddEmailOutsiderChange} disabled={isViewWebinar} /> <span className='fs-14 fw-600'>Add outsiders to webinar</span></div>
          </Col> */}

          {isRegisterOutsider && 
          <Col xs={24} sm={24} md={12} lg={10} style={{ marginTop: '10px' }}>  
            <Select
              mode="tags"
              style={{ width: '100%'}}
              placeholder={<div style={{ marginLeft:'5px'}}>Type email here</div>}
              onChange={handleEmailsChange}
              value={selectedEmails}

            >
              {options.map((option) => (
                <Option key={option} value={option}>
                  {option}
                </Option>
              ))}
            </Select>
          </Col>
          }

          <Col xs={24} sm={24} md={24} lg={24}>
            <div className="d-flex" style={{ gap: '10px', marginTop: "10px" }}>
              <> <Switch checked={reminderNotification} onChange={handleReminderNotificationChange} disabled={isViewWebinar} /> <span className='fs-14 fw-600 label-color'>Send Reminder Notification to all Attendees </span></>
            </div>
            <div className="d-flex" style={{ gap: '10px', marginTop: "20px" }}><Switch checked={thankyouEmail} onChange={handleThankyouEmailChange} disabled={isViewWebinar} /> <span className='fs-14 fw-600 label-color'>Send Thankyou email to attendees after event has ended</span></div>
          </Col>
        </Row>
        {!isViewWebinar && <Button className='save-and-next-button fs-16 fw-600' htmlType='submit'>Schedule</Button>}
      </Form>
    </div>
  )
}

export default Attendees