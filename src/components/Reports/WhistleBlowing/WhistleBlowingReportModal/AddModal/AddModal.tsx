import { Modal, Row, Col, Space, Button, Form,  TimePicker, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import type { ColumnsType } from 'antd/es/table';
import DatePickerWrapper from '../../../../../shared/DatePickerWrapper/DatePickerWrapper';
import SelectWrapper from '../../../../../shared/SelectWrapper/SelectWrapper';
import InputWrapper from '../../../../../shared/InputWrapper/InputWrapper';
import './AddModal.scss'
import TextArea from 'antd/es/input/TextArea';
import UploadImage from '../../../../Setting/SettingKeyInfo/UploadImage/UploadImage';
import { whistleblowingMeetingDetailsReportMockDataInterface } from '../../../../../types/ReportsInterface';
import blueEyeIcon from "../../../../../assets/icons/Report/blue-eye.png";
import { useGetWhistleBlowingReportsQuery, usePostWhistleBlowingReportsMutation } from '../../../../../store/Slices/Reports';
import dayjs from 'dayjs';
import { useGetAllUsersListQuery } from '../../../../../store/Slices/ManageNotification';

const AddModal = (props: any) => {
  const { IsOpenIncidentAddModal, IsCancelIncidentAddModal, title,isOpenMeetingDetailsModal ,setIsOpenMeetingDetailsModal,setIsOpenIncidentAddModal } = props;

  const {data ,isSuccess}=useGetWhistleBlowingReportsQuery({})
  const {data:allUsersData ,isSuccess:allUsersSuccess}=useGetAllUsersListQuery({})
  const [selectedValue,setSelectedValue]=useState("")
  const [selectedComplaintType ,setSelectedComplaintType]=useState("")
  const [selectedRowData ,setIsSelectedRowData]=useState({date:undefined})
  const [form] = Form.useForm();
  let whistleBlowingMeetingsData:any
  let allUsers:any
  if(isSuccess){
    whistleBlowingMeetingsData=data
  }
  if(allUsersSuccess){
    allUsers=allUsersData
  }
  // const whistleBlowingData={
  //   complaintType:props?.selectedRowRecord?.complaintType,
  //   dateOfOccurance:props?.selectedRowRecord?.dateOfOccurance ?dayjs(props?.selectedRowRecord?.dateOfOccurance) : undefined ,
  //   status:props?.selectedRowRecord?.status,
  //   reason:props?.selectedRowRecord?.reason,
  // }
  // useEffect(() => {
  //   form.setFieldsValue(whistleBlowingData)
  //  }, [form,whistleBlowingData])

  const [postWhistleBlowingReports] =usePostWhistleBlowingReportsMutation()
  const [certificateId ,setCertificateId]=useState("")
const uploadCertificateId=(id:any)=>{
  setCertificateId(id)
  
}
const handleComplaintType=(selectedValueComplaint:any)=>{

  setSelectedValue(selectedValueComplaint)
}
const handleComplaintTypeValue=(value:any)=>{
  setSelectedComplaintType(value)
}
  const onFinish=async (values:any)=>{
   
    await postWhistleBlowingReports({payload:{...values,attachments:[certificateId],complaintType:selectedComplaintType}})
    setSelectedComplaintType("")
    setSelectedValue("")
    form.resetFields()
    IsCancelIncidentAddModal()
    
  }
  const onFinishFailed = (values: any) => {
    console.log('Failed:', values);

    form.resetFields();
  };
  const handleSelectedRowData=(record:any)=>{

    setIsOpenMeetingDetailsModal(true)
    setIsSelectedRowData(record)
  }
  const [selectedTime, setSelectedTime] = useState(null);

  const handleTimeChange = (time:any) => {
    setSelectedTime(time);
  };

  // Default value for the TimePicker
  const defaultValue = selectedTime ? selectedTime : undefined;
  const IncidentReportTableHeader: ColumnsType<whistleblowingMeetingDetailsReportMockDataInterface> = [
    {
      title: 'Sr #',
      dataIndex: 'key',
      key: 'key',
      render: (key: React.Key) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{key}</span>,
    },
    {
      title: 'Meeting Agenda',
      dataIndex: 'agenda',
      key: 'agenda',
      render: (_, item: any) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{item?.agenda}</span>,
    },
    {
      title: 'Meeting Minutes',
      dataIndex: 'minutes',
      key: 'minutes',
      render: (_, item: any) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{item?.minutes}</span>,
    },

    {
      title: 'Meeting Date',
      dataIndex: 'date',
      key: 'date',
      render: (_, item: any) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{item?.date}</span>,
    },
    {
      title: 'Meeting Outcome',
      dataIndex: 'MeetingOutcome',
      key: 'outcome',
      render: (_, item: any) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{item?.outcome}</span>,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: 'action',
      render: (_, item: any) => (
        <div className="fs-12 fw-400 line-height-22">
          <img src={blueEyeIcon} alt='Delete' className='cursor-pointer' onClick={() => handleSelectedRowData(item)} />
        </div>

      ),
    },
  ];

console.log(props?.selectedRowRecord)
  return (
    <div className='whistle-blowing-report-modal-wrapper'>
      <Modal centered
        open={IsOpenIncidentAddModal}
        title={title}
        onCancel={IsCancelIncidentAddModal}
        footer={false}
        width={888}
        className='modal-whistle-blowing-report'
      >
        <Form
          name="basic"
          initialValues={props?.selectedRowRecord}
          onFinish={onFinish}
           form={form}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
        {!isOpenMeetingDetailsModal && 
          <Row gutter={[20, 20]} align="bottom">

            <Col xs={24} sm={24} md={12} lg={12}>
              <SelectWrapper  value={selectedComplaintType}  onChange={(value:any) => handleComplaintTypeValue(value)} name='complaintType' label='Complaint Type' placeHolder="Select option"  options={[
                { label: 'Miss behavior', value: "Miss behavior" },
                { label: 'Miss Conduct', value: "Miss Conduct" },
                { label: 'Bullying', value: "Bullying" },
                { label: 'Abuse', value: "Abuse" },
                { label: 'Other', value: "Other" },

              ]}
                disabled={props.disabled}

              />
            </Col>
            <Col xs={24} sm={24} md={12} lg={12}>
              <SelectWrapper value={selectedValue} onChange={(value:any)=>handleComplaintType(value)} name='raisedAgainst' label='Raised Against' placeHolder="Select option" 
               options={  allUsers?.data?.result?.map((users:any)=>{return {label: users?.clientName, value: users?._id }})}
                disabled={props.disabled}

              />
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} style={{ marginBottom: "0px" }}>
              <DatePickerWrapper name='dateOfOccurance' label='Date of Occurence' placeholder='yyyy/mm/dd'
                disabled={props.disabled} />
            </Col>

            <Col xs={24} sm={24} md={12} lg={12} className="time-picker">
              <label className="fs-16 fw-600">Time of Occurence</label><br />
              <TimePicker  
        
      
        disabled={props.disabled}
        value={defaultValue}
        onChange={handleTimeChange} name="timeOfOcuurance"   />
            </Col>
            <Col xs={24} sm={24} md={12} lg={12}>
              <SelectWrapper name='freqOfOccurance' label='Frequency of Occurance' placeHolder="Select option" defaultValue="" options={[
                { label: 1, value: 1 },
                { label: 2, value: 2 },
                { label: 3, value: 3 },

              ]}
                disabled={props.disabled}

              />
            </Col>


            <Col xs={24} sm={24} md={12} lg={12}>
              <Form.Item
                label="Reason for Complaint"
                name="reason"
            
              >
                <TextArea rows={4} placeholder='Reason' disabled={props.disabled} />
              </Form.Item>
            </Col>


            <Col xs={24} sm={24} md={24} lg={24}>
              <Form.Item
                label="Upload Supporting Documentation"
                name="attachments"
              >

                <UploadImage uploadCertificateId={uploadCertificateId} disabled={props.disabled}   fileUrl={ props?.selectedRowRecord?.attachments?.length>0?`${props?.selectedRowRecord?.attachments[0]?.mediaId}${props?.selectedRowRecord?.attachments[0]?.extension}` :""}  />
              </Form.Item>
            </Col>
          </Row>
        }
          {props.disabled && !isOpenMeetingDetailsModal && <>
            <p className="fs-18 fw-600"> Meeting Details</p>
            <Table columns={IncidentReportTableHeader} dataSource={props?.selectedRowRecord?.meetingDetails} />
          </>
          }
          {!props.disabled &&
            <Col span={24}>
              <Space size={12} className='modal-buttons'>

                <Button onClick={IsCancelIncidentAddModal} className="modal-button btn-cancel ">Cancel</Button>
                <Button type="primary"
                  htmlType="submit" className="modal-button btn-secondary ">Save</Button>
              </Space>
            </Col>
          }

     
        </Form>
        {isOpenMeetingDetailsModal &&
        
        <Form   name="basic"
          initialValues={{...selectedRowData,date:dayjs(selectedRowData?.date)}}
          onFinish={onFinish}
           form={form}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical">
       
            <Row gutter={[20, 20]} align="bottom">

               <Col xs={24} sm={24} md={12} lg={12} style={{ marginBottom: "0px" }}>
               <Form.Item
                label="Meeting Agenda"
                name="agenda"
              >
                <InputWrapper      name="agenda" required={false}  placeHolder="Enter here"
                  disabled={props.disabled} />
                    </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} style={{ marginBottom: "0px" }}>
              <Form.Item
                label="Meeting Minutes"
                name="minutes"
              >
                <InputWrapper     name="minutes"  required={false}  placeHolder="Enter here"
                  disabled={props.disabled} />
                   </Form.Item>
              </Col>

              <Col xs={24} sm={24} md={24} lg={24} style={{ marginBottom: "0px" }}>
                <DatePickerWrapper name='date' label='Meeting Date' required={false} placeholder='yyyy/mm/dd'
                  disabled={props.disabled} />
              </Col>

              <Col xs={24} sm={24} md={24} lg={24}>
                <Form.Item
                  label="Meeting Outcome"
                  name="outcome"
                  rules={[{ required: false, message: 'Required field' }]}
                >
                  <TextArea rows={4} placeholder='Reason' disabled={props.disabled} />
                </Form.Item>
              </Col>
              
            </Row>
          

        </Form>
        }
      </Modal>
    </div>
  )
}

export default AddModal