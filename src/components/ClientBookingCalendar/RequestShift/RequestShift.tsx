import React, { useState } from 'react'
import { Form, Modal, Row, Col, } from 'antd';
import SelectWrapper from '../../../shared/SelectWrapper/SelectWrapper';
import SwitchWrapper from '../../../shared/SwitchWrapper/SwitchWrapper';
import InputWrapper from '../../../shared/InputWrapper/InputWrapper';
import DatePickerWrapper from '../../../shared/DatePickerWrapper/DatePickerWrapper';
import TimePickerWrapper from '../../../shared/TimePickerWrapper/TimePickerWrapper';
import { useAddRequestShiftMutation, useGetCarerTypeQuery, useGetShiftDepartmentQuery } from '../../../store/Slices/ClientBookingCalendar';
import './RequestShift.scss';
import dayjs from 'dayjs';
import AppSnackbar from '../../../utils/AppSnackbar';
import { error } from 'console';

const RequestShift = (props: any) => {
  const { isRequestShiftModalOpen, setIsRequestShiftModalOpen } = props;
  const [isPreferenceToggle, setIsPreferenceToggle] = useState<boolean>(false);
  const [addRequestShift] = useAddRequestShiftMutation();
  const { data: getCarerType } = useGetCarerTypeQuery({});
  const { data: getDepartment } = useGetShiftDepartmentQuery({});

  const departmentListOptions = getDepartment?.data?.map((departmentDetails: any) => ({
    key: departmentDetails?._id,
    value: departmentDetails?._id,
    label: departmentDetails?.name,
  }));

  const carerTypeOptions = getCarerType?.data?.result?.map((carerTypeDetails: any) => ({
    key: carerTypeDetails?._id,
    value: carerTypeDetails?._id,
    label: carerTypeDetails?.name,
  }));

  const [form] = Form.useForm();

  const postShift = async (values: any) => {

    try {
  
      const {error}: any = await addRequestShift(values)
  
      if (error) {
        AppSnackbar({ type: "error", messageHeading: "Error!", message: error.data.message });
        return;
      }
    }
    catch (error) {
      AppSnackbar({ type: "error", messageHeading: "Error!", message: "Error occured" });
    }
    setIsRequestShiftModalOpen(false)    
    AppSnackbar({ type: "success", messageHeading: "Success!", message: "Shift Added Successfully" });
    form.resetFields();
  }

  const onFinish = async (values: any) => {
    const payload: any = {
      shiftDate: dayjs(values?.shiftDate).format('YYYY-MM-DD'),
      carerType: values?.carerType,
      department: values?.department,
      shiftType: values?.shift,
      staffRequired: Number(values?.staff),
      startTime: `${dayjs(values.shiftDate).format('YYYY-MM-DD')}T${dayjs(values.startTime).format('HH:mm:ss')}`,
      endTime: `${dayjs(values.shiftDate).format('YYYY-MM-DD')}T${dayjs(values.endTime).format('HH:mm:ss')}`,
      preferences: isPreferenceToggle
    }
    postShift(payload);
  }
  return (
    <>
      <Modal title="Request Shift" open={isRequestShiftModalOpen} onCancel={() => setIsRequestShiftModalOpen(false)} footer={false} centered className='booking-request-shift-modal' width={800}>
        <div className='care-booking-content'>
          <div className='cancel-shift-modal-content'>
            <Form layout="vertical" onFinish={onFinish} form={form}>
              <Row gutter={[30, 20]} align="middle">
                <Col xl={12} lg={12} md={12} sm={24} xs={24} className="request-shift-fields">
                  <DatePickerWrapper
                    label="Select Shift Date"
                    name="shiftDate"
                    required={true}
                    placeholder="Selected Option"
                  />
                </Col>
                <Col xl={12} lg={12} md={12} sm={24} xs={24} className="request-shift-fields">
                  <SelectWrapper
                    label="Select Carer type"
                    name="carerType"
                    required={true}
                    placeHolder="Selected Option"
                    options={carerTypeOptions}
                  />
                </Col>
                <Col xl={12} lg={12} md={12} sm={24} xs={24} className="request-shift-fields">
                  <SelectWrapper
                    label="Department"
                    name="department"
                    required={true}
                    placeHolder="Selected Option"
                    options={departmentListOptions}
                  />
                </Col>
                <Col xl={12} lg={12} md={12} sm={24} xs={24} className="request-shift-fields">
                  <SelectWrapper
                    label="Select Shift "
                    name="shift"
                    required={true}
                    placeHolder="Selected Option"
                    options={[
                      { label: 'Morning', value: 'MORNING' },
                      { label: 'Afternoon', value: 'AFTERNOON' },
                      { label: 'Longday', value: 'LONGDAY' },
                      { label: 'Night', value: 'NIGHT' },
                    ]}
                  />
                </Col>
                <Col xl={12} lg={12} md={12} sm={24} xs={24} className="request-shift-fields">
                  <InputWrapper
                    label="Number of Staff Requied"
                    name="staff"
                    type='number'
                    required={true}
                    placeHolder="Selected Option"
                  />
                </Col>
                <Col xl={24} lg={24} md={24} sm={24} xs={24} className="request-shift-fields">
                  <div className='shift-duration'>
                    <h2 className='fs-14 fw-600 line-height-17 m-0 label-color'>Shift Duration:</h2>
                  </div>
                </Col>
                <Col xl={12} lg={12} md={12} sm={24} xs={24} className="request-shift-fields">
                  <TimePickerWrapper
                    label="Start Time"
                    name="startTime"
                    required={true}
                    placeHolder="Select Time"
                  />
                </Col>
                <Col xl={12} lg={12} md={12} sm={24} xs={24} className="request-shift-fields">
                  <TimePickerWrapper
                    label="End Time"
                    name="endTime"
                    required={true}
                    placeHolder="Select Time"
                  />
                </Col>
                <Col xl={24} lg={24} md={24} sm={24} xs={24} className="request-shift-fields">
                  <div className='turn-preferences'>
                    <SwitchWrapper
                      name="preferences"
                      label="Turn on Preferences"
                      onChange={(e: any) => setIsPreferenceToggle(e)}
                    />
                  </div>
                </Col>
              </Row>
              <div className="request-shift-btn d-flex align-center">
                <button
                  type="button"
                  className="cancel-btn cursor-pointer fs-16 line-height-22 white-color fw-600"
                  onClick={() => {
                    form.resetFields();
                    setIsRequestShiftModalOpen(false)
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="save-btn cursor-pointer fs-16 line-height-22 white-color fw-600">
                  Save
                </button>
              </div>
            </Form>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default RequestShift