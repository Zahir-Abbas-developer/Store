import { Form, Modal, Row, Col, } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import DatePickerWrapper from '../../../../shared/DatePickerWrapper/DatePickerWrapper';
import InputWrapper from '../../../../shared/InputWrapper/InputWrapper';
import SelectWrapper from '../../../../shared/SelectWrapper/SelectWrapper';
import SwitchWrapper from '../../../../shared/SwitchWrapper/SwitchWrapper';
import TimePickerWrapper from '../../../../shared/TimePickerWrapper/TimePickerWrapper';
import { useGetShiftCarerTypeQuery, useGetShiftDepartmentQuery, useRequestNewShiftMutation } from '../../../../store/Slices/ClientShiftManage';
import AppSnackbar from '../../../../utils/AppSnackbar';
import form from 'antd/es/form';

type IRequestType = {
  isRequestNewShift: boolean;
  setIsRequestNewShift: React.Dispatch<React.SetStateAction<boolean>>
}

const RequestNewShift = (props: IRequestType) => {
  const [form] = Form.useForm();
  const { isRequestNewShift, setIsRequestNewShift } = props;
  const [isSwitchBtn, setIsSwitchBtn] = useState<boolean>(false)
  const { data: departmentValue } = useGetShiftDepartmentQuery({});
  const { data: shiftCarerData } = useGetShiftCarerTypeQuery({})
  const [createNewRequest, { isSuccess: addNewRequestSuccess }] = useRequestNewShiftMutation();


  const [time1, setTime1] = useState(null);
  const [time2, setTime2] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");


  const departmentListOptions = departmentValue?.data?.map((userTypeDetails: any) => {
    return { value: userTypeDetails?._id, label: userTypeDetails?.name, }
  })

  const carertypeOptions = shiftCarerData?.data?.result?.map((userTypeDetails: any) => {
    return { value: userTypeDetails?._id, label: userTypeDetails?.name, id: userTypeDetails?._id }
  })

  const onFinish = async (values: any) => {
    if (!errorMsg) {
      const payload: any = {
        shiftDate: dayjs(values?.shiftDate).format('YYYY-MM-DD'),
        carerType: values?.carerType,
        department: values?.department,
        shiftType: values?.selectShift,
        staffRequired: Number(values?.staffNumber),
        startTime: `${dayjs(values.shiftDate).format('YYYY-MM-DD')}T${dayjs(values.startTime).format('HH:mm:ss')}`,
        endTime: `${dayjs(values.shiftDate).format('YYYY-MM-DD')}T${dayjs(values.endTime).format('HH:mm:ss')}`,
        preferences: isSwitchBtn
      }
      try {
        await createNewRequest(payload).unwrap();
        AppSnackbar({ type: "success", messageHeading: "Successfully Added!", message: "Information added successfully" });
        handleResetForm();
      } catch (error: any) {
        AppSnackbar({
          type: "error",
          messageHeading: "Error",
          message: error?.data?.message ?? "Something went wrong!"
        });
      }
    }
  }


  const handleResetForm = () => {
    form.resetFields();
    setIsRequestNewShift(false)
  }


  const handleTime1Change = (value:any) => {
    setTime1(value);
    checkForError(time2, value);
  };




  const handleTime2Change = (value:any) => {
    setTime2(value);
    checkForError(time1, value);
  };


  const checkForError = (value1: any, value2: any) => {
    const newValue1 =  `${dayjs(value1).format('YYYY-MM-DD')}T${dayjs(value1).format('HH:mm:ss')}`;
    const newValue2 = `${dayjs(value2).format('YYYY-MM-DD')}T${dayjs(value2).format('HH:mm:ss')}`;
    
    if (value1 && value2 && newValue1 === newValue2) {
      setErrorMsg("Both times cannot be equal");
    } else {
      setErrorMsg("");
    }
  };



  useEffect(() => {
    if (addNewRequestSuccess === true) {
      setIsRequestNewShift(false);
      AppSnackbar({ type: "success", messageHeading: "Success!", message: "New Client Added Successfully" });
    }
  }, [addNewRequestSuccess]);



  return (
    <>
      <Modal title="Request Shift" open={isRequestNewShift} onCancel={() => handleResetForm()} className="request-new-shift-wrapper" width={800} footer={false} centered>
        <div className='care-booking-content'>
          <div className='cancel-shift-modal-content'>
            <Form layout="vertical" onFinish={onFinish} form={form}>
              <Row gutter={[30, 20]} align="middle">
                <Col xl={12} lg={12} md={12} sm={24} xs={24} className="request-shift-fields">
                  <DatePickerWrapper
                    name="shiftDate"
                    label="Shift Date"
                    required={true}
                  />
                </Col>
                <Col xl={12} lg={12} md={12} sm={24} xs={24} className="request-shift-fields">
                  <SelectWrapper
                    label="Select Carer type"
                    name="carerType"
                    required={true}
                    placeHolder="Selected Option"
                    options={carertypeOptions}
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
                    name="selectShift"
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
                    name="staffNumber"
                    type="number"
                    placeHolder='Selected Option'
                    label="Number of Staff Requied"
                    required={true}
                  />
                </Col>
                <Col xl={24} lg={24} md={24} sm={24} xs={24} className="request-shift-fields">
                  <div className='shift-duration'>
                    <h2 className='fs-14 fw-600 line-height-17 m-0 label-color'>Shift Duration:</h2>
                  </div>
                </Col>
                <Col xl={12} lg={12} md={12} sm={24} xs={24} className="request-shift-fields" style={{position:"relative"}}>
                  <TimePickerWrapper
                    label="Start Time"
                    name="startTime"
                    required={true}
                    placeHolder="hh:mm:ss"
                    onChange={handleTime1Change}
                  />
                  {errorMsg && <div style={{ color: "red", position:"absolute", top:"80%" }}>{errorMsg}</div>}

                </Col>
                <Col xl={12} lg={12} md={12} sm={24} xs={24} className="request-shift-fields">
                  <TimePickerWrapper
                    label="End Time"
                    name="endTime"
                    required={true}
                    placeHolder="hh:mm:ss"
                    onChange={handleTime2Change}

                  />
                </Col>

                <Col xl={24} lg={24} md={24} sm={24} xs={24} className="request-shift-fields">
                  <div className='turn-preferences'>
                    <SwitchWrapper
                      name="preference"
                      label="Turn on Preferences"
                      onChange={(e: any) => setIsSwitchBtn(e)}
                    />
                  </div>
                </Col>

              </Row>
              <div className="request-shift-btn d-flex align-center">
                <button
                  type="button"
                  className="cancel-btn cursor-pointer fs-16 line-height-22 white-color fw-600"
                  onClick={() => handleResetForm()}
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

export default RequestNewShift