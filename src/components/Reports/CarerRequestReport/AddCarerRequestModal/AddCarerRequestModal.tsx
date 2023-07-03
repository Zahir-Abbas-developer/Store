import  { useState } from 'react'
import dayjs from 'dayjs';
import { Modal, Row, Col, Space, Button, Form,   } from 'antd'
import TextArea from 'antd/es/input/TextArea';
import { useGetCarerDashboardCalanderRequestQuery } from '../../../../store/Slices/CarerDashboardCalander';
import { usePostReportsCarerRequestMutation,  } from '../../../../store/Slices/Reports';
import SelectWrapper from '../../../../shared/SelectWrapper/SelectWrapper';
import DatePickerWrapper from '../../../../shared/DatePickerWrapper/DatePickerWrapper';
import InputWrapper from '../../../../shared/InputWrapper/InputWrapper';
import './AddModal.scss'
import { useGetClientsQuery } from '../../../../store/Slices/Setting/StaffSettings/RegisterationConfiguration';

const AddModal = (props: any) => {
  const { IsOpenIncidentAddModal, IsCancelIncidentAddModal, title } = props;
  const [postReportsCarerRequest]=usePostReportsCarerRequestMutation()
  const [selectTypeRange ,setSelectTimeRange]=useState("")

  const [form] = Form.useForm();
  const userData: any = localStorage.getItem("careUserData")
  const {id}: any = JSON.parse(userData);
  const onFinish=async (values:any)=>{
    await postReportsCarerRequest({payload:{...values,  status: "PENDING",}})
    IsCancelIncidentAddModal()
  }
  const onFinishFailed = () => {
    form.resetFields();
  };
const handleSelectRequestType=(requestTypeValue:any)=>{
  setSelectTimeRange(requestTypeValue)
}
//Allowed Values
const allowedValues = ["emergencyShiftOff", "changeCheckInTime", "changeCheckOutTime"];
//Labels Values
const typeRangeLabels:any = {
  emergencyShiftOff: "Shift off Time",
  changeCheckInTime: "Auto Check-In Time",
  changeCheckOutTime: "Auto Check-Out Time",
};

const { data: shiftDetial, isSuccess: shiftIsSucess } = useGetCarerDashboardCalanderRequestQuery({
});
 //*****************************get clients details */ 
 const { data: clientsDetial, isSuccess: clientsIsSucess } = useGetClientsQuery({});

let carerClientsData: any;

if (clientsIsSucess) {
  carerClientsData = clientsDetial;
}
let carerCalanderData: any;

if (shiftIsSucess) {
  carerCalanderData = shiftDetial;
}
const carerClientsOptions = carerClientsData?.data?.result?.map((item: any) => {
  return {
    label: item?.clientName,
    value: item?._id
  }
})
const carerShiftsOptions = carerCalanderData?.data?.shifts?.map((item: any) => {
  return {
    label: `${item?.shift?.shiftType} ${dayjs(item?.shift?.startTime).format('HH:mm a')}-${dayjs(item?.shift?.endTime).format('HH:mm a')}`,
    value: item?.shift?._id
  }
}) 
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
        {
          <Row gutter={[20, 20]} align="bottom">

            <Col xs={24} sm={24} md={12} lg={12}>
              <SelectWrapper onChange={handleSelectRequestType} name='requestType' label='Request Type' placeHolder="Select option" defaultValue="" options={[
                { label: 'Out of Office', value: "outOfOffice" },
                { label: 'Emergency Shift off', value: "emergencyShiftOff" },
                { label: 'Change Check-In time', value: "changeCheckInTime" },
                { label: 'Change Check-Out time', value: "changeCheckOutTime" },
                { label: 'Other', value: "Other" },

              ]}
              

              />
            </Col>
            <Col xs={24} md={12}>
              <SelectWrapper
                label="Shift Name"
                required={true}
                placeHolder="Select Shift"
                options={carerShiftsOptions}
                name="ShiftId"
              />
            </Col>
            <Col xs={24} md={12}>
              <SelectWrapper
                label="Client Name"
                required={true}
                placeHolder="Select Client Name"
                options={carerClientsOptions}
                name="careHomeId"
              />
            </Col>
            <Col xs={24} md={12}>
                            <InputWrapper
                                name="reason"
                                label='Reason'
                                size="large"
                                type="text"
                                placeHolder="Reason"
                            />
                        </Col>
            <Col xs={24} sm={24} md={12} lg={12} style={{ marginBottom: "0px" }}>
              <DatePickerWrapper name='date' label='Date' placeholder='yyyy/mm/dd'
                 />
            </Col>
            {selectTypeRange==="outOfOffice"  &&
           <> <Col xs={12} sm={12} md={6} lg={6} className="time-picker">
           <label className="fs-16 fw-600">Time Range</label>
           <DatePickerWrapper name='checkIn'  required={true} placeholder='yyyy/mm/dd' />
         
         </Col>
         <Col xs={12} sm={12} md={6} lg={6} className="time-picker">
         <DatePickerWrapper name='checkOut'  required={true} placeholder='yyyy/mm/dd'/>
         </Col></>
}
{allowedValues.includes(selectTypeRange) && (
  <Col xs={12} sm={12} md={6} lg={6} className="time-picker">
    <label className="fs-16 fw-600">
    {`${typeRangeLabels[selectTypeRange] || ""}`}

    </label>
    <br />
    <DatePickerWrapper name='checkIn' label='Shift Off Time' required={true} placeholder='yyyy/mm/dd'/>
  </Col>
)}
            <Col xs={24} sm={24} md={12} lg={12}>
              <Form.Item
                label="Description"
                name="discription"
            
              >
                <TextArea rows={4} placeholder='discription'  />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Space size={12} className='modal-buttons'>

                <Button onClick={IsCancelIncidentAddModal} className="modal-button btn-cancel ">Cancel</Button>
                <Button type="primary"
                  htmlType="submit" className="modal-button btn-secondary ">Save</Button>
              </Space>
            </Col>
          
          </Row>
        }
        
        </Form>
      </Modal>
    </div>
  )
}

export default AddModal