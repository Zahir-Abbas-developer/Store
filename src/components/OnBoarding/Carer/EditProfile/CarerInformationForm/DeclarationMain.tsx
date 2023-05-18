import { Button, Col,  Form, Radio, Row, Space, Switch } from "antd";
import TextArea from "antd/es/input/TextArea";
import {useState,useEffect} from "react";
import { useLocation } from "react-router-dom";
import { useGetRequestByIdQuery, useUpdateRequestMutation } from "../../../../../store/Slices/OnBoarding";
import './FormMain.scss'
import ApiLoader from "../../../../ApiLoader/ApiLoader";

const DeclarationMain = () => {
  const { pathname } = useLocation();
  const conditionalPath = pathname.includes('carer-profile') || pathname.includes('instructor-profile')
  const userData: any = localStorage.getItem("careUserData");
  const [isAudited ,setIsAudited]=useState(false)
  const [declarativeSwitchValues, setDeclarativeSwitchValues] = useState({
    timeDirectives: false,
    challengingBehaviour: false,
    confidentialAgreement: false,
    pensionOptout: false,
    dataPrivacy: false,
    candidateDeclaration: false,
    rightTOworkUK:false,
    dbacheck:false,
  });
  const [rightTOworkDetails, setRightTOworkDetails] = useState("");

  const {id,role}: any = JSON.parse(userData);
  const { state }: any = useLocation()
  const {data,isSuccess}=useGetRequestByIdQuery({id: state?.editProfile?._id ?? id,detail:"OTHERINFO"})
 
  let profileViewInfoData: any = {};
  useEffect(() => {
    if (isSuccess) {
      profileViewInfoData = data;
      setDeclarativeSwitchValues({
        timeDirectives: profileViewInfoData?.data?.userprofile?.declaration?.timeDirectives || false,
        challengingBehaviour: profileViewInfoData?.data?.userprofile?.declaration?.challengingBehaviour || false,
        confidentialAgreement: profileViewInfoData?.data?.userprofile?.declaration?.confidentialAgreement || false,
        pensionOptout: profileViewInfoData?.data?.userprofile?.declaration?.pensionOptout || false,
        dataPrivacy: profileViewInfoData?.data?.userprofile?.declaration?.dataPrivacy || false,
        candidateDeclaration: profileViewInfoData?.data?.userprofile?.declaration?.candidateDeclaration || false,
        rightTOworkUK: profileViewInfoData?.data?.userprofile?.declaration?.rightTOworkUK || false,
        dbacheck:profileViewInfoData?.data?.userprofile?.declaration?.dbacheck || false
        
      });
      setRightTOworkDetails( profileViewInfoData?.data?.userprofile?.declaration?.rightTOworkDetails)
    }
  }, [data, isSuccess]);
  
  const [updateRequest]=useUpdateRequestMutation()

  const handleTextAreaChange = (e:any) => {
    setRightTOworkDetails(e.target.value);
  };
  
  const handleSwitchChange = (name:any) => (checked:any) => {
    setDeclarativeSwitchValues((prevValues) => ({
      ...prevValues,
      [name]: checked
    }));
  };
  const onFinish = (value: any) => {
    const declarativePayloadValues={...value,...declarativeSwitchValues,rightTOworkDetails:rightTOworkDetails,isAudited}
    updateRequest({id:state?.editProfile?._id ??id,payload:{declaration:declarativePayloadValues}})
  }
  return (
    <> {isSuccess ?   <Form
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      layout="vertical"
      className="declaration-main"
    >

      <Space direction="vertical">
        <span className="fw-600 fs-20" > Declaration</span>
        <span className="fw-600 fs-14">
          The following declaration statements are asked to candidates.
        </span>

        <span className="fw-400 fs-14">
          The information in this application form is true and complete. I agree
          that any deliberate omission, falsification or misrepresentation in the
          application form will be grounds for rejecting this application or
          subsequent dismissal if employed by the Organisation. Where applicable,
          I consent that the organisation can seek clarification regarding
          professional registration details.
        </span>
        <Form.Item name="candidateDeclaration" label="" >
          <Space>
            <Switch checked={declarativeSwitchValues.candidateDeclaration}
        onChange={handleSwitchChange('candidateDeclaration')}/>
            <span className='fw-500 fs-14 '>I agree to the above Declaration</span>
          </Space>
        </Form.Item>


        <Form.Item name="rightTOworkUK" label={<Space size={3} className='fw-600 fs-14'> <div className="onboarding-small-dots"></div>  <span className="title-color">Does your candidate have right to work in Uk?</span> </Space>} >

          <Radio.Group defaultValue={declarativeSwitchValues?.rightTOworkUK}>
            <Radio value={true}>Yes</Radio>
            <Radio value={false}>No</Radio>
          </Radio.Group>
        </Form.Item>



        <Form.Item
          label=""
          name="rightTOworkDetails"
       
          rules={[{ required: false, message: 'Required field' }]}
        >
          <label className='fw-600 fs-14'> If Yes ,please provide more details</label>
          <TextArea rows={4}    value={rightTOworkDetails} onChange={handleTextAreaChange}/>
        </Form.Item>

        <Form.Item name="dbacheck" label={<Space size={3} className='fw-600 fs-14'> <div className="onboarding-small-dots"></div> <span className="title-color">Are you willing to undergo a full enhanced DBA check at a price of $55 ?</span></Space>} >
          <Radio.Group  defaultValue={declarativeSwitchValues?.dbacheck}>
            <Radio value={true}>Yes</Radio>
            <Radio value={false}>No</Radio>
          </Radio.Group>
        </Form.Item>
        <Space size={3}> <div className="onboarding-small-dots"></div> <span className='fw-600 fs-14 title-color'> Working Time Directive</span></Space>

        <span className='fw-400 fs-14'>
          Understand thet I am under no obligation to work than the average of 48
          hours in any week. These hours include hours worked with any other
          company as well as our services. I further understand that I may work
          more than 48 hours per week if I wish. Under the terms of engagement, I
          realise that I may turn down any assignment at any time without any
          reason, without detriment. By signing this declaration, I am
          signifyingthat any hours in excess of an average of 48 hours per week
          are worked by my choice. But also make it clear that this declaration
          does not mean I will work more than 48 hours every week. I understand to
          inform the total number of hours I work in a week from all form of
          employement exceeds 48, in order that we may take this into
          consideration before offering work to me.
        </span>

        <Form.Item name="timeDirectives" label="" >
          <Space>
          <Switch
        checked={declarativeSwitchValues.timeDirectives}
        onChange={handleSwitchChange('timeDirectives')}
      />
            <span className='fw-500 fs-14 '>I agree to the above Declaration</span>
          </Space>
        </Form.Item>
        <Space size={3}> <div className="onboarding-small-dots"></div> <span className='fw-600 fs-14'> Challenging Behaviour</span></Space>

        <span className='fw-400 fs-14'>
          When working in this industry there are hazards associated with the
          industry. I appreciate and accept that one of these hazards is possible
          aggressive behaviour from challenging service users. Service users may
          present challenging and aggressive behavious and this is out of control
          for us. I understand and accept that I am under no obligation as an
          agency worker to accept assignments. I accept that there is this risk
          and accept that this risk is a result of the industry and not our
          services. I understand if I am unhappy with any assignment I can
          withdraw my submission at any time with reasonable notice dictated in my
          contract for service, amd as a result I will not hold our services
          liable for any injury or loss of earnings as an agency worker . I
          understand that if I am injured or affectefd in any other way whilst on
          an assignment that is not my fault or of our services.
        </span>
        <Form.Item name="challengingBehaviour" label="" >
          <Space>
            <Switch   checked={declarativeSwitchValues.challengingBehaviour}
        onChange={handleSwitchChange('challengingBehaviour')}/>
            <span className='fw-500 fs-14 '>I understand and agree the above entirely</span>
          </Space>
        </Form.Item>
        <Space size={3}> <div className="onboarding-small-dots"></div> <span className='fw-600 fs-14'> Confidential Agreement</span></Space>


        <span className='fw-400 fs-14'>
          I can confirm that during every assignment and afterwards. To hold
          information relating to the client in the strictness confidence, ensure
          that it is kept safely and securely when not in use. I acknowledge that
          no information is to be removed from the client’s permises without
          permission of the client.
        </span>

        <Form.Item name="confidentialAgreement" label="" >
          <Space>
          <Switch   checked={declarativeSwitchValues.confidentialAgreement}
        onChange={handleSwitchChange('confidentialAgreement')}/>
            <span className='fw-500 fs-14 '>I agree the above declaration</span>
          </Space>
        </Form.Item>
        <Space size={3}> <div className="onboarding-small-dots"></div> <span className='fw-600 fs-14'>Pension Opt-out</span></Space>

        <span className='fw-400 fs-14'>
          This is to inform that i can choose to : please click your answer
          BE ENROLLED IN PENSION THE NEST PENSION SCHEME OPT OUT FOR PENSION
          ENROLMENT Name : Signed : Date : * Please note we will automatically
          enrol you to our NEST Pension Scheme if we did not receive this form
          back after your qualifying period. Once enrolled, a percentage of your
          salary will be deducted for your pension contribution, it will be
          reflected on your payslips. Please visit NESTPENSION.ORG.UK for more
          information regarding pensions.
        </span>

        <Form.Item name="pensionOptout" label="" >
          <Space>
          <Switch   checked={declarativeSwitchValues.pensionOptout}
        onChange={handleSwitchChange('pensionOptout')}/>
            <span className='fw-500 fs-14'>I agree the above declaration</span>
          </Space>
        </Form.Item>
        <Space size={3}> <div className="onboarding-small-dots"></div> <span className='fw-600 fs-14'> Data Privacy Policy</span></Space>
        <Space style={{ padding: "0px 10px" }} direction="vertical">


          <Space size={3}> <div className="onboarding-mini-dots"></div> <span className='fw-400 fs-14'> PERSONAL INFORMATION WE COLLECT</span></Space>
          <span className='fw-400 fs-14'>
            Personal Information is information that identifies you as an
            inSpaceidual which could also be considered sensitive personal
            information,such as: Name, Date and Place of birth, Contact details,
            Citizenship, Religion, Civil Status, Medical Information and such other
            personally identifiable information in addition to your personal
            information, we will also maintain records of your educational
            background, employment application, history with the company, areas of
            experties, details of salary and benefits, bank details, performance
            appraisals and salary reviews if applicable, working time records and
            other records pertinent to your continued employment.
          </span>

          <Space size={3}> <div className="onboarding-mini-dots"></div> <span> USE OF PERSONAL INFORMATION</span></Space>
          <span className='fw-400 fs-14'>

            we use this information for a variety of personnel administration and
            emplyee, work and general business management purposes, including
            administration of payroll, improvement and providing and maintenance of
            the administration of employee benefits, facilitate the management of
            work and employees, operate performance and salary reviews, operating
            the company’s IT and communication systems comply with record keeping
            and other legal obligations. The company aslo processes information
            information relating to your health which may amount to sensitive
            Personal Information. The particular information that the company holds
            relating to your health are the records of sickness absence, medical
            certificates and any other health and medical records.
          </span>
          <Space size={3} className='fw-400 fs-14'> <div className="onboarding-mini-dots"></div> <span>SECURITY</span></Space>

          <span className='fw-400 fs-14'>
            These information ahall be controlled by our administrative employees
            who can access it electronically. The company has security measures in
            place which will ensure the confidentiality of the information.
          </span>
          <Space size={3}> <div className="onboarding-mini-dots"></div> <span className='fw-400 fs-14'> TO WHOM DO WE SHARE YOUR PERSONAL INFORMATION</span></Space>
          <span className='fw-400 fs-14'>

            In compliance with this Data Privacy Policy, your personal information
            will be disclosed to third party service providers only in compliance
            with our contractual obligation. We will also disclose your personal
            Infromation to comply with our legal obligations, including to various
            law inforcement agencies, regulatory authorities and governments in
            United Kingdom and around the world and their service providers for
            security, customs and immigration purposes, upon their lawful request.
          </span>

          <Space size={3}> <div className="onboarding-mini-dots"></div> <span className='fw-400 fs-14'> RIGHT TO DATA SUBJECT</span></Space>
          <span className='fw-400 fs-14'>

            We respect and value all your rights as data subject. Hence, the
            personal information you have provided in the sites shall be retained
            for as long as necessary to fulfil the purposes for which it was
            collected, to comply with our legal obligations, resolve disputes, and
            enforce on agreements with third parties. You may exercise your
            particular Right to Access, Modify and Delete the persocal information
            and change preferences, by contacting us through the information
            provided below: In the Company’s direction, we may amend, interpret,
            modify or withdraw any portion of this Data Privacy Policy at any time.
          </span>

          <Space size={3}> <div className="onboarding-mini-dots"></div> <span className='fw-400 fs-14'>STAFF DECLARATION</span></Space>

          <span className='fw-400 fs-14'>

            I consent to QBIX processing data relating to you for legal, personnel,
            administrative and management purposes and in particular to the
            processing of any sensitive personal data as defined in the Data
            Protection Act 1998 relating to you including, as appropriate
            information about your physical or mental health condition, and
            information relating to any criminal proceedings in which you have been
            involved for insurance purposes and in order to comply with lgal
            requirements and obligations to third parties.
          </span>
        </Space>

        <Form.Item name="dataPrivacy" label=""  >
          <Space>
          <Switch   checked={declarativeSwitchValues.dataPrivacy}
        onChange={handleSwitchChange('dataPrivacy')}/>
            <span className='fw-500 fs-14 '>I agree the above declaration</span>
          </Space>
        </Form.Item>

        {conditionalPath ? <div className='candidate-wrapper '>
          <button className="candidate-button fw-600 fs-16 cursor-pointer" >
            Submit Declaration
          </button>

        </div> : <Row className='onboarding-send-Email' style={{ padding: '20px 10px' }}>
          <Col xs={24} md={17}>
            <span className="fw-700 fs-14 title-color">
              You have completed the Carer registration process. Click the send email button to send an email with Carer’s credentials and the Carer can sign the declaratio form.
            </span>
          </Col>
          <Col xs={24} md={7} >
            <div className='candidate-wrapper d-flex justify-end  '>
              <Button htmlType='submit' className="candidate-button fw-600 fs-16 cursor-pointer" onClick={()=>{setIsAudited(true)}}>
                Send Email
              </Button>
            </div>
          </Col>
        </Row>
        }

      </Space>

    </Form>:<ApiLoader/>}</>
  


  );
};

export default DeclarationMain;
