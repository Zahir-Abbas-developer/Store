
import { Button, Checkbox, Col, Row, Space, Tooltip } from 'antd';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import RangeIcon from '../../../../../assets/icons/OnBoarding/time-range.svg'
import React, { useState } from 'react';
import './FormMain.scss';
import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import { useGetRequestByIdQuery, usePostOtherInformationRequestMutation } from '../../../../../store/Slices/OnBoarding';
import { useLocation } from 'react-router-dom';
import ApiLoader from '../../../../ApiLoader/ApiLoader';
import { async } from 'q';
import AppSnackbar from '../../../../../utils/AppSnackbar';


const format = 'HH:mm';
const ContactPreference = (props: any) => {
    const { handleSelectedStepValue, auditCheck } = props;  
    const [timeToCall, setTimeToCall] = useState<string[]>([]);
    const [selectedTimeRange, setSelectedTimeRange] = useState<any>([]);

  

    const parseTimeRange = (timeRange: any) => {
      if (!timeRange) {
        return [null, null];
      }
    
      const [startTime, endTime] = timeRange.split('-').map((time: any) => {
        return dayjs(`2023-05-05T${time?.trim()}:00`);
      });
    
      return [startTime, endTime];
    };
  const formatTimeRange = (timeRange:any) => {
    return timeRange?.map((time:any) => {
      return time?.format('HH:mm:ss A');
    });
  };

 


    const [postOtherInformationRequest]=usePostOtherInformationRequestMutation()
    const userData: any = localStorage.getItem("careUserData");
    const {id,role}: any = JSON.parse(userData);
    const { state }: any = useLocation()
    const {data,isSuccess}=useGetRequestByIdQuery({id: state?.editProfile?._id ?? id,detail:"OTHERINFO"})
    let profileViewInfoData:any;
    if(isSuccess){
      profileViewInfoData=data
    }
    const [selectedOption, setSelectedOption] = useState<string | null>(profileViewInfoData?.data?.userprofile?.contactPreference
      ?.notificationPreference);
      const [preferenceContactInfo ,setPreferenceContactInfo]=useState<any>(profileViewInfoData?.data?.userprofile?.contactPreference
        ?.contactPreference)
    const handleOptionChange = (optionValue: string) => {
        setSelectedOption(optionValue);
    };
    const timeRangeString = profileViewInfoData?.data?.userprofile?.contactPreference
    ?.timeToCall;
    const [startTime, endTime] = parseTimeRange(timeRangeString);
    const formattedTimeRange = formatTimeRange([startTime, endTime]);
    const handleContactInfo=async()=>{
      const conatctInfo={
        contactPreference:preferenceContactInfo,
        notificationPreference:selectedOption,
        timeToCall:formatTimeToCall(timeToCall)
      }
     try{
      if(selectedOption!==undefined){
      await postOtherInformationRequest({payload:{contactPreference:conatctInfo},id:state?.editProfile?._id??id}).unwrap()
      AppSnackbar({ type: "success", messageHeading: "Successfully Updated!", message: "Information updated successfully" }); handleSelectedStepValue('Employment Status')
     }
     else{ AppSnackbar({ type: "error", messageHeading: "Error", message: "Notication Preference Required!" }); }
    }
     catch (error: any) { AppSnackbar({ type: "error", messageHeading: "Error", message: error?.data?.message ?? "Notication Preference Required!", }); }
    }
    const formatTimeToCall = (timeToCall:any) => {
      const startTime = dayjs(timeToCall[0]).format('HH:mm:ss');
      const endTime = dayjs(timeToCall[1]).format('HH:mm:ss');
      return `${startTime}-${endTime}`;
    };
    const handleTimeToCallChange = (value:any) => {
    
      setTimeToCall(value);
      setSelectedTimeRange(value);
    };
    
    const options = [
        {
            value: "email",
            label: "Email",
        },
        {
            value: "mobile",
            label: "Mobile Notification",
        },
        {
            value: "both",
            label: "Both",
        },
        {
            value: "none",
            label: "None of Above",
        },
    ];

    const contactPrefrences = [
        {
            value: "Phone",
            label: "Phone",
        },
        {
            value: "Whatsapp",
            label: "Whatsapp",
        },
        {
            value: "sms",
            label: "SMS",
        },

    ];
    
  
    return (
      <>
      {isSuccess ? <div className='personal-form-wrapper '>
            <Row gutter={[20, 20]}>
            <Col xs={24}>
  <Space direction='vertical' size={15}>
    <label className='fw-500 fs-20 form-heading-color'>Contact Preference</label>
    <Checkbox.Group
      options={contactPrefrences}
      defaultValue={preferenceContactInfo}
      onChange={(checkedValues)=>{setPreferenceContactInfo(checkedValues)}}
      className='d-flex flex-column'
    />
    
  </Space>
</Col>
                <Col md={16} sm={20} lg={12} xs={24}>
                    <label className='label-color fw-600 fs-14'>Time To Call</label>
                    <Row>
                        <Col xs={12}>
                        <TimePicker.RangePicker  disabled={preferenceContactInfo?.includes("sms") && preferenceContactInfo?.length===1} onChange={handleTimeToCallChange}   defaultValue={selectedTimeRange?.length > 0 ? selectedTimeRange : [startTime, endTime]}
        format={'HH:mm A'} suffixIcon={<img src={RangeIcon} alt='dd' />} />
                            
                        </Col>
                       
                    </Row>
                </Col>

                <Col xs={24}>
                    <Space direction='vertical' size={15}
                    >
                        <label className='fw-500 fs-20 form-heading-color' >Notification Preference</label>
                        <div>
                            {options.map((option) => (
                                <div className='d-flex flex-column'>
                                    <Checkbox
                                        value={option.value}
                                        checked={selectedOption === option.value}
                                        onChange={() => handleOptionChange(option.value)}
                                    >
                                        {option.label}
                                    </Checkbox>

                                </div>

                            ))}
                        </div>
                    </Space>
                </Col>
                <Col xs={24} >
                    <div >
                        <Space className='carer-buttons'>
                            {(auditCheck && role==="admin") && <Tooltip
                                autoAdjustOverflow={true}
                                showArrow={false}
                                placement="bottomLeft" color="#65CDF0"
                                title='Click to mark as audit'
                            >

                                <Button className='edit-module-button  audit-button  align-center d-flex' >Audit</Button>
                            </Tooltip>}
                            <Button className='edit-module-button bg-orange-color  align-center d-flex ' htmlType='submit' onClick={handleContactInfo}>Save</Button>
                            <Button className='edit-module-button   align-center d-flex btn-secondary'
                                onClick={() => handleSelectedStepValue('Employment Status')} htmlType='submit' >Continue</Button>
                        </Space>
                    </div>
                </Col>
            </Row>

        </div>:<ApiLoader/>}
      </>
        
    )
}

export default ContactPreference