import { useEffect, useState } from 'react';
import { Col, RadioChangeEvent, Row, Tooltip } from 'antd';
import { Radio } from 'antd';
import { Button, DatePicker, Space, Switch, Form, Input } from 'antd'
import "./FormMain.scss";
import DateIcon from '../../../../../assets/images/OnBoarding/datePicker.svg';
import '../../../../../shared/DatePickerWrapper/DatePickerWrapper.scss'
import infoIcon from "../../../../../assets/icons/info-icon.svg";
import UploadImage from '../../../../Setting/SettingKeyInfo/UploadImage/UploadImage';
import { useGetRequestByIdQuery, usePostOtherInformationRequestMutation } from '../../../../../store/Slices/OnBoarding';
import { useLocation } from 'react-router-dom';
import dayjs from 'dayjs';
import ApiLoader from '../../../../ApiLoader/ApiLoader';



interface IStatementApplies {
    title: string,
    type: string,
    switch: boolean,
    Rules?: string[]
}
const statementApplies: IStatementApplies[] = [
    {
        title: 'Do not choose this statement if you’re in receipt of a State, works or private pension. Choose this statement if the following applies. This is my first job since 6 April and since the 6 April I’ve not received payments from any of the following:',
        type: 'A',
        switch: false,
        Rules: ['Jobseeker’s Allowance', "Employement and Support Allowance ", " Incapacity Benefit"]
    },
    {
        title: "Do not choose this statement if you’re in receipt of a State, works or private pension. Choose this statement if the following applies. Since 6 April i have had another P45. And/or since the 6 April I’ve not received payments from any ofthe following :",
        switch: true,
        type: 'B',
        Rules: ['Jobseeker’s Allowance', "Employement and Support Allowance ", " Incapacity Benefit"]

    },
    {
        title: "Choose this statement if you have have another job and/or you’re in receipt of a State, works or private pension.",
        switch: true,
        type: 'C',


    },

]

const EmployementStatus = (props: any) => {
    const { handleSelectedStepValue, conditionalPath, auditCheck } = props;
    const [value, setValue] = useState('paye');
    const userData: any = localStorage.getItem("careUserData")
    const {id,role}: any = JSON.parse(userData);
    const { state }: any = useLocation()
    const {data,isSuccess}=useGetRequestByIdQuery({id: state?.editProfile?._id ??id,detail:"OTHERINFO"})
    let profileViewInfoData:any;
    if(isSuccess){
      profileViewInfoData=data
    }
    
    const [certificateId ,setCertificateId]=useState("")  
    const [previousEmployer, setPreviousEmployer] = useState(profileViewInfoData?.data?.userprofile?.employmentStatus?.empDetails?.p45TaxYear);
    const [studentLoan, setStudentLoan] = useState(profileViewInfoData?.data?.userprofile?.employmentStatus?.empDetails?.studentLoan);
    const [repaidLoan, setRepaidLoad] = useState(profileViewInfoData?.data?.userprofile?.employmentStatus?.empDetails?.postGraduateLoan)
    const [postOtherInformationRequest]=usePostOtherInformationRequestMutation()
  const payloadEmployeeStatusPaye={
    payTaxCode:profileViewInfoData?.data?.userprofile?.employmentStatus?.empDetails?.payTaxCode,
    insuranceNo:profileViewInfoData?.data?.userprofile?.employmentStatus?.empDetails?.insuranceNo,
    
    FromDate:profileViewInfoData?.data?.userprofile?.employmentStatus?.empDetails?.FromDate?dayjs(profileViewInfoData?.data?.userprofile?.employmentStatus?.empDetails?.FromDate):undefined,
    ToDate:profileViewInfoData?.data?.userprofile?.employmentStatus?.empDetails?.ToDate?dayjs(profileViewInfoData?.data?.userprofile?.employmentStatus?.empDetails?.ToDate):undefined,
  }
   const payloadEmployeeStatusumbrella={
    umbrellaCompanyEmail:profileViewInfoData?.data?.userprofile?.employmentStatus?.empDetails?.umbrellaCompanyEmail,
    umbrellaCompanyName:profileViewInfoData?.data?.userprofile?.employmentStatus?.empDetails?.umbrellaCompanyName,
    umbrellaCompanyPhone:profileViewInfoData?.data?.userprofile?.employmentStatus?.empDetails?.umbrellaCompanyPhone,
  }
   const payloadEmployeeStatusLimited={
    companyName:profileViewInfoData?.data?.userprofile?.employmentStatus?.empDetails?.companyName,
    companyNo:profileViewInfoData?.data?.userprofile?.employmentStatus?.empDetails?.companyNo,
    nationalInsuranceNo:profileViewInfoData?.data?.userprofile?.employmentStatus?.empDetails?.nationalInsuranceNo,
    utr:profileViewInfoData?.data?.userprofile?.employmentStatus?.empDetails?.utr,

  }
  const payloadSelfEmployed={
    nationalInsuranceNo:profileViewInfoData?.data?.userprofile?.employmentStatus?.empDetails?.nationalInsuranceNo,
    utr:profileViewInfoData?.data?.userprofile?.employmentStatus?.empDetails?.utr,
   
  }
  
    const onChange = (e: RadioChangeEvent) => {
        setValue(e.target.value);
    };
  

    const handlePreviousEmployer = (e: RadioChangeEvent) => {
        setPreviousEmployer(e.target.value)
    }
   useEffect(()=>{
    setValue(profileViewInfoData?.data?.userprofile?.employmentStatus?.empType)
   },[])
    const [specialities, setSpecialities] = useState(statementApplies);
console.log(profileViewInfoData?.data?.userprofile?.employmentStatus?.empType  )
    const handleSwitchChange = (index: any, checked: any) => {
        const newSpecialities = [...specialities]; // create a new copy of the array
        newSpecialities[index].switch = checked; // update the switch value for the corresponding item
        setSpecialities(newSpecialities); // update the state with the new array
    };
    const onFinishPaye = (values: any) => {

        const payloadEmployeeStatus={
            empType:value,
            empDetails:{...values, certificates:certificateId ?certificateId:profileViewInfoData?.data?.userprofile?.employmentStatus?.empDetails?.certificates},
           
        }
        postOtherInformationRequest({payload:{employmentStatus:payloadEmployeeStatus },id:state?.editProfile?._id??id})
        // props.onChildStateChange(props.selectedStepValue + 1)
        values && (conditionalPath ? handleSelectedStepValue('Additional Docs') : handleSelectedStepValue('Equal Opportunity Declaration'))

    };
    const onFinishLimitedCompany = (values: any) => {
        const payloadEmployeeStatus={
            empType:value,
            empDetails:{...values, certificates:certificateId ?certificateId:profileViewInfoData?.data?.userprofile?.employmentStatus?.empDetails?.certificates},
        }
        postOtherInformationRequest({payload:{employmentStatus:payloadEmployeeStatus},id:state?.editProfile?._id??id})
        // props.onChildStateChange(props.selectedStepValue + 1)
        values && (conditionalPath ? handleSelectedStepValue('Additional Docs') : handleSelectedStepValue('Equal Opportunity Declaration'))

    };
    const onFinishSelfEmployed=(values: any)=>{
        const payloadEmployeeStatus={
            empType:value,
            empDetails:{...values, certificates:certificateId ?certificateId:profileViewInfoData?.data?.userprofile?.employmentStatus?.empDetails?.certificates},
        }
        postOtherInformationRequest({payload:{employmentStatus:payloadEmployeeStatus},id:state?.editProfile?._id??id})
        // props.onChildStateChange(props.selectedStepValue + 1)
        values && (conditionalPath ? handleSelectedStepValue('Additional Docs') : handleSelectedStepValue('Equal Opportunity Declaration'))
    }
const onFinishUmberellaCompany=(values: any)=>{
    const payloadEmployeeStatus={
        empType:value,
        empDetails:{...values, certificates:certificateId ?certificateId:profileViewInfoData?.data?.userprofile?.employmentStatus?.empDetails?.certificates},
    }
    postOtherInformationRequest({payload:{employmentStatus:payloadEmployeeStatus},id:state?.editProfile?._id??id})
    // props.onChildStateChange(props.selectedStepValue + 1)
    values && (conditionalPath ? handleSelectedStepValue('Additional Docs') : handleSelectedStepValue('Equal Opportunity Declaration'))
}
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const emailValidator = (rule: any, value: any, callback: any) => {
        if (!value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            callback();
        } else {
            callback('Please enter a valid email address');
        }
    };

    const config = {
        rules: [{ type: 'object' as const, required: true, message: 'Please select time!' }],
    };
    const uploadCertificateId=(id:any)=>{
        setCertificateId(id)
    }
    const employementStatus = [
        { label: 'PAYE', value: 'paye' },
        { label: 'Limited Company', value: 'limited' },
        { label: 'Self Employed (Sole Trader)', value: 'self' },
        { label: 'Umbrella Company', value: 'umbrella' },
    ]


    const studentLoanDetails = [
        {
            title: `You'll have a plan 1 student Loan if`,
            Rules: [

                ' You lived in Scotland or Northern Ireland when you started your course ( undergraduate or post graduate ) You lived in England or Wales and started your undergraduate course before 1 September 2012.',
                ` You lived in England or Wales and started your undergraduate course on or after 1 September 2012. Your loan is a part time maintenance loan.`,
                ` Your loan is an advanced learner loan. Your loan is a postgraduate healthcare loan.`

            ]
        }
    ]
    
    return (
      <>
      {isSuccess ?   <div className='personal-form-wrapper '>
            <Row gutter={[20, 20]} style={{ paddingBottom: "20px" }}>
                <Col xs={24}>
                    <Space direction='vertical'>
                        <span className='fw-500 fs-20 form-heading-color'> Employment Status</span>
                        <span className='fw-600 fs-14'>Select Candidate’s employment status</span>
                        <Radio.Group onChange={onChange} value={value} >
                            {employementStatus.map((option) => (
                                <Radio key={option.value} name="group" value={option.value}>
                                    {option.label}
                                </Radio>
                            ))}
                        </Radio.Group>
                    </Space>

                </Col>
            </Row>



            {
                value === 'paye' && <Form
                    name="basic"
                    initialValues={payloadEmployeeStatusPaye}
                    onFinish={onFinishPaye}
                    onFinishFailed={onFinishFailed}

                    layout="vertical"
                >
                    <Row gutter={[30, 5]} align="bottom">
                        <Col xs={24} sm={24} md={12} lg={10} className='carer-form-input '>
                            <Form.Item
                                label="Pay Tax Code"
                                name="payTaxCode"

                                rules={[{ required: true, message: 'Required field' }]}
                            >
                                <Input placeholder="Type here" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={10} className='carer-form-input '>
                            <Form.Item
                                label="National Insurance No."
                                name="insuranceNo"
                                rules={[{ required: true, message: 'Required field' }]}
                            >
                                <Input placeholder="Type here" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} >
                            <Form.Item
                                label="Do you have a P45 from a previous employer within the current tax year? "
                                name="p45TaxYear"
                            >
                                <Radio.Group onChange={handlePreviousEmployer} defaultValue={previousEmployer} value={previousEmployer}>
                                    <Radio value={true}> Yes</Radio>
                                    <Radio value={false}>No</Radio>

                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        {previousEmployer && <Col xs={24} >
                            <span className='fw-500 fs-20 form-heading-color'>P45 Upload File</span>
                        </Col>}
                        {previousEmployer && <Col xs={24} lg={21}  >
                            <UploadImage uploadCertificateId={uploadCertificateId} fileUrl={value === profileViewInfoData?.data?.userprofile?.employmentStatus?.empType? profileViewInfoData?.data?.userprofile?.employmentStatus?.empDetails?.certificates :""}/>
                        </Col>}

                        {!previousEmployer && <Col xs={24}>
                            <Space direction='vertical' >
                                <span className='fw-600 fs-14 title-color' >Tax year runs from April  6 to Apr 5 following year.</span>
                                <span className='fw-400 fs-14 title-color'>Choose the statement that applies that applies to you, either A,B or C, and turn on the appropriate toggle</span>
                                <span className='fw-600 fs-14 title-color' >Please choose which statemnet applies to you </span>
                                {
                                    studentLoanDetails.map((item) =>
                                        <Space direction='vertical'>
                                            <span className='fw-600 fs-14 title-color'>{item.title}</span>
                                            <ul>{item.Rules.map((ele) => <li>{ele} </li>)}</ul>
                                        </Space>)
                                }
                            </Space>
                        </Col>}


                        {previousEmployer &&
                            <Col xs={24}>
                                <Space direction='vertical' >
                                    <span className='fw-600 fs-14 title-color'>Tax year runs from April  6 to Apr 5 following year.</span>
                                    {
                                        studentLoanDetails.map((item) =>
                                            <Space direction='vertical'>
                                                <span className='fw-600 fs-14 title-color'>{item.title}</span>
                                                <ul>{item.Rules.map((ele) => <li>{ele} </li>)}</ul>
                                            </Space>)
                                    }
                                </Space>
                            </Col>}

                        <Col xs={24}>
                            {previousEmployer && (
                                <>
                                    {statementApplies.map((item: IStatementApplies, index: number) => (
                                        <Row key={index} >
                                            <Col xs={2}>
                                                <div>
                                                    <Switch checked={item.switch} onChange={(checked) => handleSwitchChange(index, checked)} />
                                                </div>
                                            </Col>

                                            <Col xs={19}>
                                                <div>
                                                    <Space direction="vertical">
                                                        <span>
                                                            {item.type}. {item.title}
                                                        </span>
                                                        {item?.Rules && (
                                                            <ul>
                                                                {item.Rules.map((ele: string, index: number) => (
                                                                    <li key={index}>{ele}</li>
                                                                ))}
                                                            </ul>
                                                        )}
                                                    </Space>
                                                </div>
                                            </Col>
                                        </Row>
                                    ))}
                                </>
                            )}
                        </Col>

                        <Col xs={24}>
                            {studentLoanDetails.map((item) =>
                                <Space direction='vertical'>
                                    <span className='fw-600 fs-14 title-color'>{item.title}</span>
                                    <ul>{item.Rules.map((ele) => <li>{ele} </li>)}</ul>
                                </Space>)}
                        </Col>

                        <Col xs={24} >
                            <Form.Item
                                label="Do you have one of the Student Loans?"
                                name="studentLoan"

                            >
                                <Radio.Group defaultValue={studentLoan} onChange={(ele: RadioChangeEvent) => setStudentLoan(ele.target.value)} value={studentLoan}>
                                    <Radio value={true}>  Yes</Radio>
                                    <Radio value={false}>No</Radio>

                                </Radio.Group>
                            </Form.Item>
                        </Col>


                        {studentLoan  && <Col xs={24} >
                            <Form.Item
                                label=" Did you complete or leave your studies before 6th April?"
                                name="statementA"

                            >
                                <Radio.Group defaultValue={profileViewInfoData?.data?.userprofile?.employmentStatus?.empDetails?.statementA}>
                                    <Radio value={true}>  Yes</Radio>
                                    <Radio value={false}>No</Radio>

                                </Radio.Group>
                            </Form.Item>
                        </Col>}
                        {studentLoan && <Col xs={24} >
                            <Form.Item
                                label=" Are you repaying your student loan directly to the student loans company by direct debit?"
                                name="statementB"
                            >
                                <Radio.Group defaultValue={profileViewInfoData?.data?.userprofile?.employmentStatus?.empDetails?.statementB}>
                                    <Radio value={true}>  Yes</Radio>
                                    <Radio value={false}>No</Radio>

                                </Radio.Group>
                            </Form.Item>
                        </Col>}

                        {studentLoan  && <Col xs={24} >
                            <Form.Item
                                label="What type of student Loan do you have?"
                                name="statementC"
                            >
                                <Radio.Group defaultValue={profileViewInfoData?.data?.userprofile?.employmentStatus?.empDetails?.statementC}>
                                    <Radio value={true}> Plan 1</Radio>
                                    <Radio value={false}>Plan 2</Radio>

                                </Radio.Group>
                            </Form.Item>
                        </Col>}

                        <Col xs={24}>
                            <Space direction='vertical' >
                                <span className='fw-600 fs-14 title-color' >Post Graduate Loan</span>
                                {
                                    studentLoanDetails.map((item) =>
                                        <Space direction='vertical'>
                                            <span className='fw-600 fs-14'>{item.title}</span>
                                            <ul>{item.Rules.map((ele) => <li>{ele} </li>)}</ul>
                                        </Space>)
                                }
                            </Space>
                        </Col>



                        <Col xs={24} >
                            <Form.Item
                                label="Do you have a postgraduate Loan  which is not fully repaid?"
                                name="postGraduateLoan"
                            >
                                <Radio.Group onChange={(e) => setRepaidLoad(e.target.value)} defaultValue={repaidLoan} >
                                    <Radio value={true}>  Yes</Radio>
                                    <Radio value={false}>No</Radio>

                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        {/* {repaidLoan  && <Col xs={24} >
                            <Form.Item
                                label=" Did you complete or leave your studies before 6th April?"
                                name="studiesStatuss"

                            >
                                <Radio.Group >
                                    <Radio value={1}>  Yes</Radio>
                                    <Radio value={2}>No</Radio>

                                </Radio.Group>
                            </Form.Item>
                        </Col>}
                        {repaidLoan  && <Col xs={24} >
                            <Form.Item
                                label=" Are you repaying your student loan directly to the student loans company by direct debit?"
                                name="directs-debit"
                            >
                                <Radio.Group >
                                    <Radio value={1}>  Yes</Radio>
                                    <Radio value={2}>No</Radio>

                                </Radio.Group>
                            </Form.Item>
                        </Col>} */}

                        <Col xs={24} >
                            <Space>
                                <span className='fw-600 fs-20' >Required Document </span>
                                <Tooltip placement="bottomLeft" color="#65CDF0" overlayInnerStyle={{
                                    width: "499px",
                                }} title="These are extra documents (that may not be included in any of the above sections). You can customise this from Settings> Staff Settings> Define Required Documents.">
                                    <img src={infoIcon} alt="infoIcon" className='d-flex align-center' />
                                </Tooltip>
                            </Space>
                            <div className='fw-500 fs-16'>NI Reference</div>
                        </Col>
                        <Col xs={24} lg={21}  >

                            <UploadImage uploadCertificateId={uploadCertificateId}    fileUrl={ value===profileViewInfoData?.data?.userprofile?.employmentStatus?.empType? profileViewInfoData?.data?.userprofile?.employmentStatus?.empDetails?.certificates:""}/>

                        </Col>


                        <Col xs={24} sm={24} md={12} lg={10} className='date-picker-wrapper'>
                            <Form.Item name="FromDate" label="From Date" {...config} style={{ maxWidth: '100%' }}>
                                <DatePicker popupClassName="date-picker-content" suffixIcon={<img src={DateIcon} />} clearIcon={false} />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={24} md={12} lg={10} className='date-picker-wrapper'>
                            <Form.Item name="ToDate" label="To Date" {...config} style={{ maxWidth: '100%' }}>
                                <DatePicker popupClassName="date-picker-content" suffixIcon={<img src={DateIcon} />} clearIcon={false} />
                            </Form.Item>

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
                                    <Button className='edit-module-button bg-orange-color  align-center d-flex ' htmlType='submit'>Save</Button>
                                    <Button className='edit-module-button   align-center d-flex btn-secondary' htmlType='submit'>Continue</Button>
                                </Space>
                            </div>
                        </Col>
                    </Row>
                </Form>
            }

            {
                value === 'limited' && <Form
                    name="basic"
                    initialValues={payloadEmployeeStatusLimited}
                    onFinish={onFinishLimitedCompany}
                    onFinishFailed={onFinishFailed}
                    // autoComplete="off"
                    layout="vertical"
                >
                    <Row gutter={[30, 5]} align="bottom">
                        <Col xs={24} sm={24} md={12} lg={10} className='carer-form-input '>
                            <Form.Item
                                label="Company Name"
                                name="companyName"

                                rules={[{ required: true, message: 'Required field' }]}
                            >
                                <Input placeholder="Type here" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={10} className='carer-form-input '>
                            <Form.Item
                                label="Company NO"
                                name="companyNo"

                                rules={[{ required: true, message: 'Required field' }]}
                            >
                                <Input placeholder="Type here" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={10} className='carer-form-input '>
                            <Form.Item
                                label="National Insurance No"
                                name="nationalInsuranceNo"

                                rules={[{ required: true, message: 'Required field' }]}
                            >
                                <Input placeholder="Type here" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={10} className='carer-form-input '>
                            <Form.Item
                                label="UTR"
                                name="utr"
                                rules={[{ required: true, message: 'Required field' }]}
                            >
                                <Input placeholder="Type here" />
                            </Form.Item>
                        </Col>

                        <Col xs={24} >
                            <Space>
                                <span className='fw-600 fs-20' >Required Document </span>
                                <Tooltip placement="bottomLeft" color="#65CDF0" overlayInnerStyle={{
                                    width: "499px",
                                }} title="These are extra documents (that may not be included in any of the above sections). You can customise this from Settings> Staff Settings> Define Required Documents.">
                                    <img src={infoIcon} alt="infoIcon" className='d-flex align-center' />
                                </Tooltip>
                            </Space>
                            <div className='fw-500 fs-16'>NI Reference</div>
                        </Col>
                        <Col xs={24} lg={21}  >

                            <UploadImage uploadCertificateId={uploadCertificateId} fileUrl={  value === profileViewInfoData?.data?.userprofile?.employmentStatus?.empType?profileViewInfoData?.data?.userprofile?.employmentStatus?.empDetails?.certificates:""} />

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
                                    <Button className='edit-module-button bg-orange-color  align-center d-flex ' htmlType='submit'>Save</Button>
                                    <Button className='edit-module-button   align-center d-flex btn-secondary' htmlType='submit'>Continue</Button>
                                </Space>
                            </div>
                        </Col>
                    </Row>
                </Form>
            }

            {
                value === 'umbrella' && <Form
                    name="basic"
                    initialValues={payloadEmployeeStatusumbrella}
                    onFinish={onFinishUmberellaCompany}
                    onFinishFailed={onFinishFailed}
                    // autoComplete="off"
                    layout="vertical"
                >
                    <Row gutter={[30, 5]} align="bottom">
                        <Col xs={24} sm={24} md={12} lg={10} className='carer-form-input '>
                            <Form.Item
                                label="Umbrella Company Name"
                                name="umbrellaCompanyName"

                                rules={[{ required: true, message: 'Required field' }]}
                            >
                                <Input placeholder="Type here" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={10} className='carer-form-input '>
                            <Form.Item
                                label="Umbrella Company Phone"
                                name="umbrellaCompanyPhone"

                                rules={[{ required: true, message: 'Required field' }]}
                            >
                                <Input placeholder="Type here" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={10} className='carer-form-input '>
                            <Form.Item
                                label="Umbrella Company Email"
                                name="umbrellaCompanyEmail"
                                rules={[
                                    { validator: emailValidator, required: true, message: 'Required field' },]}
                            >
                                <Input placeholder="Type here" />
                            </Form.Item>
                        </Col>

                        <Col xs={24} >
                            <Space>
                                <span className='fw-600 fs-20' >Required Document </span>
                                <Tooltip placement="bottomLeft" color="#65CDF0" overlayInnerStyle={{
                                    width: "499px",
                                }} title="These are extra documents (that may not be included in any of the above sections). You can customise this from Settings> Staff Settings> Define Required Documents.">
                                    <img src={infoIcon} alt="infoIcon" className='d-flex align-center' />
                                </Tooltip>
                            </Space>
                            <div className='fw-500 fs-16'>NI Reference</div>
                        </Col>
                        <Col xs={24} lg={21}  >

                            <UploadImage uploadCertificateId={uploadCertificateId}  fileUrl={ value===profileViewInfoData?.data?.userprofile?.employmentStatus?.empType? profileViewInfoData?.data?.userprofile?.employmentStatus?.empDetails?.certificates:""} />

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
                                    <Button className='edit-module-button bg-orange-color  align-center d-flex ' htmlType='submit'>Save</Button>
                                    <Button className='edit-module-button   align-center d-flex btn-secondary' htmlType='submit'>Continue</Button>
                                </Space>
                            </div>
                        </Col>
                    </Row>
                </Form>
            }

            {
                value === 'self' && <Form
                    name="basic"
                    initialValues={payloadSelfEmployed}
                    onFinish={onFinishSelfEmployed}
                    onFinishFailed={onFinishFailed}
                    // autoComplete="off"
                    layout="vertical"
                >
                    <Row gutter={[30, 5]} align="bottom">
                        <Col xs={24} sm={24} md={12} lg={10} className='carer-form-input '>
                            <Form.Item
                                label="National Insurance No"
                                name="nationalInsuranceNo"

                                rules={[{ required: true, message: 'Required field' }]}
                            >
                                <Input placeholder="Type here" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={10} className='carer-form-input '>
                            <Form.Item
                                label="UTR"
                                name="utr"
                                rules={[{ required: true, message: 'Required field' }]}
                            >
                                <Input placeholder="Type here" />
                            </Form.Item>
                        </Col>

                        <Col xs={24} >
                            <Space>
                                <span className='fw-600 fs-20' >Required Document </span>
                                <Tooltip placement="bottomLeft" color="#65CDF0" overlayInnerStyle={{
                                    width: "499px",
                                }} title="These are extra documents (that may not be included in any of the above sections). You can customise this from Settings> Staff Settings> Define Required Documents.">
                                    <img src={infoIcon} alt="infoIcon" className='d-flex align-center' />
                                </Tooltip>
                            </Space>
                            <div className='fw-500 fs-16'>NI Reference</div>
                        </Col>
                        <Col xs={24} lg={21}  >

                            <UploadImage uploadCertificateId={uploadCertificateId} fileUrl={value === profileViewInfoData?.data?.userprofile?.employmentStatus?.empType? profileViewInfoData?.data?.userprofile?.employmentStatus?.empDetails?.certificates :""} />

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
                                    <Button className='edit-module-button bg-orange-color  align-center d-flex ' htmlType='submit'>Save</Button>
                                    <Button className='edit-module-button   align-center d-flex btn-secondary' htmlType='submit'>Continue</Button>
                                </Space>
                            </div>
                        </Col>
                    </Row>
                </Form>
            }



            `   `
            {/* <span>rggrft</span> */}



        </div >:<ApiLoader/>}
      </>
      
    )
}

export default EmployementStatus