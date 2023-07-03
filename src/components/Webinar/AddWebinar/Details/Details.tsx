import React, { useEffect, useState } from 'react'

import { Button, Checkbox, Col, DatePicker, message, Row, Select, Switch, Tooltip, UploadProps } from 'antd'
import { Form, Input } from 'antd';

import './Details.scss'
import TextArea from 'antd/es/input/TextArea';
import Dragger from 'antd/es/upload/Dragger';
import { useLocation } from 'react-router-dom';
import DatePickerWrapper from '../../../../shared/DatePickerWrapper/DatePickerWrapper';
import SelectWrapper from '../../../../shared/SelectWrapper/SelectWrapper';
import InputWrapper from '../../../../shared/InputWrapper/InputWrapper';
import { useGetUpcomingWebinarByIDQuery, usePatchWebinarDetailsMutation, usePostAddWebinarDetailsMutation } from '../../../../store/Slices/Webinar/UpcommingWebinar';
import UploadImage from '../../../Setting/SettingKeyInfo/UploadImage/UploadImage';
import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import AppSnackbar from '../../../../utils/AppSnackbar';
import { useForm } from 'antd/es/form/Form';
import ApiLoader from '../../../ApiLoader/ApiLoader';

import arrowDownSmall from '../../../../assets/icons/arrow-small-down.svg'

dayjs.extend(utc);
dayjs.extend(timezone);

const { Option } = Select;

const options = [
  { label: "Q&A : Participant Questions", value: "Q&A" },
  { label: "Webinar : Presentation Mode", value: "Presentation" },
];



const Details = ({ handelWebinarDetailsResponse, handleTabsValueChange }: any) => {

  const location = useLocation();
  const path = location.pathname;
  // console.log('path', path)

  const { state }: any = useLocation()
  // console.log("state",state?.editDetails)

  const { pathname } = useLocation()
  const route = pathname.split('/')
  const isEditWebinar = route[2]

  const viewerMode = route[2] === 'view-webinar'


  const id = route[3]
  // console.log("upcomingWebinarDataById?.data", upcomingWebinarDataById?.data)






  const [postAddWebinarDetails] = usePostAddWebinarDetailsMutation()
  const [patchWebinarDetails] = usePatchWebinarDetailsMutation()




  const { data, isLoading, isError, isSuccess } = useGetUpcomingWebinarByIDQuery({ id: state?.editDetails[0]?._id })

  let upcomingWebinarDataById: any;
  if (isLoading) {
    upcomingWebinarDataById = <p>Loading...</p>
  }
  else if (isSuccess) {
    upcomingWebinarDataById = data
  }
  else if (isError) {
    upcomingWebinarDataById = <p>Error...</p>
  }
  // console.log("upcomingWebinarDataById", upcomingWebinarDataById?.data)


  const dateObj = dayjs(upcomingWebinarDataById?.data?.date);
  // console.log(dateObj);
  const formattedDate = dateObj.locale('en').format('YYYY-MM-DD');
  // console.log("formattedDate", formattedDate)



  const [isViewWebinar, setisViewWebinar] = useState(false)
  const [checkboxValues, setCheckboxValues] = useState<string[]>([]);
  const [detailsAttachmentId, setDetailsAttachmentId] = useState(upcomingWebinarDataById?.data?.image?._id)

  const [startTime, setStartTime] = useState<dayjs.Dayjs | null>(null);
  const [endTime, setEndTime] = useState<dayjs.Dayjs | null>(null);
  const [timeDuration, settimeDuration] = useState<any>()

  const [getDateObj, setgetDateObj] = useState<any>()
  const formattedDateNew = getDateObj?.locale('en').format('YYYY-MM-DD');

  const [uploadImageMessage, setuploadImageMessage] = useState('')



  // console.log("formattedDateNew", formattedDateNew)

  console.log(timeDuration, 'timeDuration');


  const handleTimeChange = (values: any) => {


    const [start, end] = values;
    if (start && end) {
      const updatedStartTime = dayjs(formattedDateNew).hour(dayjs(start).hour()).minute(dayjs(start).minute());
      const updatedEndTime = dayjs(formattedDateNew).hour(dayjs(end).hour()).minute(dayjs(end).minute());
      setStartTime(updatedStartTime);
      setEndTime(updatedEndTime);
      const durationInMinutes = updatedEndTime.diff(updatedStartTime, 'minute');
      // settimeDuration(durationInMinutes);
      form.setFieldsValue({ duration: durationInMinutes });
    }
    else {
      setStartTime(null);
      setEndTime(null);
      settimeDuration(null);
    }
  };
  const formattedStartTime = startTime ? dayjs(startTime).toISOString() : null;
  const formattedEndTime = endTime ? dayjs(endTime).toISOString() : null;

  const handleCheckboxChange = (checkedValues: any) => {
    setCheckboxValues(checkedValues);
  };
  const uploadDetailsAttachmentId = (id: any) => {
    setDetailsAttachmentId(id)
    if (id) {
      setuploadImageMessage('')
    }
  }
  const handleDurationChange = (value: number) => {
    if (startTime) {
      const newEndTime = startTime.add(value, 'minute');
      setEndTime(newEndTime);
    }
  }

  const onFinish = async (values: any) => {
    if (detailsAttachmentId) {

      // upload func
      setgetDateObj(values.date)
      const payload = {
        title: values.title,
        date: dayjs(values.date).utc().format(),
        startTime: formattedStartTime,
        endTime: formattedEndTime,
        duration: values.duration || timeDuration,
        timeZone: values.timeZone,
        venue: values.venue,
        agenda: values.agenda,
        mode: checkboxValues,
        attachment: detailsAttachmentId ? detailsAttachmentId : upcomingWebinarDataById?.data?.image?._id,
      }
      // console.log('payload', payload)

      if (isEditWebinar === 'edit-webinar') {
        // patchWebinarDetails({ payload, id })

        try {
          const { data, error }: any = await patchWebinarDetails({ payload, id })
          if (error) {
            AppSnackbar({
              type: "error",
              messageHeading: "Error",
              message: error?.data?.message ?? "Something went wrong!"
            });
            return;
          }
          handelWebinarDetailsResponse(data?.data?._id)
        }
        catch (error) {
          // console.log("Unexpected error:", error);
        }
        AppSnackbar({ type: "success", messageHeading: "Success!", message: "Data Updated sucessfully" });

      } else {
        try {
          const { data, error }: any = await postAddWebinarDetails({ payload })
          if (error) {
            AppSnackbar({
              type: "error",
              messageHeading: "Error",
              message: error?.data?.message ?? "Something went wrong!"
            });
            return;
          }
          handelWebinarDetailsResponse(data?.data?._id)
        }
        catch (error) {
          // console.log("Unexpected error:", error);
        }
        AppSnackbar({ type: "success", messageHeading: "Success!", message: "Information uploaded sucessfully" });
        handleTabsValueChange('2')
      }
    } else {
      setuploadImageMessage('Required field')
      // console.log(uploadImageMessage);
    }

  };

  const onFinishFailed = (errorInfo: any) => {
    // console.log('Failed:', errorInfo);
    if (detailsAttachmentId) {
      // console.log("true")
    } else {
      setuploadImageMessage('Required field')
      // console.log(uploadImageMessage);

    }
  };

  // console.log("timeDuration=> ", timeDuration)


  const validateCustomRule = (_: any, value: any) => {
    if (!value) {
      return Promise.reject(new Error('Please enter an ID'));
    }
    return Promise.resolve();
  };

  const [form] = useForm()



  const defaultStartTime = dayjs(upcomingWebinarDataById?.data?.startTime, 'HH:mm');
  const defaultEndTime = dayjs(upcomingWebinarDataById?.data?.endTime, 'HH:mm');

  console.log("startTime", startTime)
  console.log("defaultEndTime", defaultEndTime)


  const initialValues = {
    title: upcomingWebinarDataById?.data?.title,
    date: dayjs(upcomingWebinarDataById?.data?.date),
    time: [dayjs(startTime, 'HH:mm'), dayjs(endTime, 'HH:mm')],
    duration: timeDuration ? timeDuration : upcomingWebinarDataById?.data?.duration,
    timeZone: upcomingWebinarDataById?.data?.timeZone,
    venue: upcomingWebinarDataById?.data?.venue,
    agenda: upcomingWebinarDataById?.data?.agenda,
    mode: upcomingWebinarDataById?.data?.mode,
  }

  console.log("initialValues", initialValues)

  useEffect(() => {
    if (viewerMode) {
      setisViewWebinar(true)
    } else {
      setisViewWebinar(false)
    }
    if (isEditWebinar === 'edit-webinar' || viewerMode) {
      setCheckboxValues(upcomingWebinarDataById?.data?.mode)
      setStartTime(dayjs(upcomingWebinarDataById?.data?.startTime))
      setEndTime(dayjs(upcomingWebinarDataById?.data?.endTime))
      form.setFieldsValue(initialValues)
    }
    // settimeDuration(timeDuration)
  }, [id, path, data, form, state, upcomingWebinarDataById, detailsAttachmentId])

  return (
    <>{<div className='details-wrapper-main'>
      {timeDuration}
      <Form
        name="basic"
        onFinish={onFinish}
        // initialValues={{ 'duration': timeDuration }}
        form={form}
        onFinishFailed={onFinishFailed}
        layout="vertical"
      >
        <Row gutter={[150, 35]} align="bottom">
          <Col xs={24} sm={24} md={12} lg={10}>
            <Form.Item label='Title' name='title' rules={[{ message: "Required Field", required: true }]} style={{ marginBottom: "0px" }}>
              <Input
                placeholder='Type here'
                // defaultValue={isEditWebinar ? upcomingWebinarDataById?.data?.title : ''}
                name='title'
                disabled={isViewWebinar}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={10}>
            <DatePickerWrapper name='date' label='Date' required={true} disabled={isViewWebinar} placeholder='yyyy/mm/dd'
              onChange={(e: any) => setgetDateObj(e)} />
          </Col>
          <Col xs={24} sm={24} md={12} lg={10}>
            <Form.Item
              label="Time"
              name="time"
              rules={[{ required: true, message: 'Required field' }]}
            >
              <TimePicker.RangePicker
                // defaultValue={[defaultStartTime, defaultEndTime]}
                format="HH:mm"
                className='start-and-end-time-picker' onChange={handleTimeChange}
                disabled={isViewWebinar} />
            </Form.Item>

          </Col>

          {/* <Col xs={24} sm={24} md={12} lg={10}>
            <InputWrapper name='duration' label='Duration' placeHolder='Type here' required={true} disabled={isViewWebinar} type='text' />
          </Col> */}

          <Col xs={24} sm={24} md={12} lg={10}>
            <Form.Item
              label="duration"
              name="duration"

            rules={[{ required: true, message: 'Required field' }]}
            >
              <Input disabled={isViewWebinar} />
            </Form.Item>
          </Col>


          <Col xs={24} sm={24} md={12} lg={10}>
            {/* <SelectWrapper name='timeZone' label='Time Zone' placeHolder="Select an option" required={true} disabled={isViewWebinar} options={[
              { label: 'UK Standard Time', value: 'UK Standard Time' },
            ]} /> */}
            <Form.Item
              label="Time Zone"
              name="timeZone"
              rules={[{ required: true, message: 'Required field' }]}
            >
            <Select
                placeholder="Select an option"
                disabled={isViewWebinar}
                style={{ width: '100%' }}
                suffixIcon={<img src={arrowDownSmall} alt="" />}
                options={[
                  { value: 'UK Standard Time', label: 'UK Standard Time' },
                ]}
              />
              </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={10}>
            <InputWrapper name='venue' label='Venue' placeHolder='Type here' required={true} disabled={isViewWebinar} type='text' />
          </Col>

          <Col xs={24} sm={24} md={12} lg={10}>
            <Form.Item
              label="Webinar Agenda"
              name="agenda"
              rules={[{ required: true, message: 'Required field' }]}
            >
              <TextArea rows={4} disabled={isViewWebinar} placeholder='Type here' />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12} lg={10}>
            <Form.Item
              label="Audio mode"
              name="mode"
              rules={[{ required: true, message: 'Required field' }]}
            >
              <div className="wrp-checkbox-grp">
                <Checkbox.Group
                  className="cus-checkbox-group"
                  options={options}
                  onChange={handleCheckboxChange}
                defaultValue={checkboxValues}
                />
              </div>
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={24} lg={20}>
            {/* <Form.Item
              label={<div style={{ display: 'flex', }}><span>Attachment</span><span style={{ color: '#ff4d4f', marginLeft: '5px' }}>*</span></div>}
              name="attachment"
              rules={[{ required: false, message: 'Required field' }]}
            > */}
            <div style={{ display: 'flex', }}><span>Attachment</span><span style={{ color: '#ff4d4f', marginLeft: '5px' }}>*</span></div>
            <UploadImage uploadCertificateId={uploadDetailsAttachmentId} fileUrl={upcomingWebinarDataById?.data?.image?.mediaId + upcomingWebinarDataById?.data?.image?.mediaMeta?.extension} />
            {uploadImageMessage && <span style={{ color: '#ff4d4f' }}>{uploadImageMessage}</span>}
            {/* </Form.Item> */}
          </Col>
        </Row>
        {!isViewWebinar && <Button className='save-and-next-button fs-16 fw-600' htmlType='submit'>Save & Next</Button>}
      </Form>
    </div>}</>

  )
}



export default Details