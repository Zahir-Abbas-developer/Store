import { Button, Radio, RadioChangeEvent, Switch, Form } from 'antd'
import TextArea from 'antd/es/input/TextArea';
import { useEffect, useState } from 'react';
import "./ClientManagerForm.scss"
import "./DeclarationForm.scss"
import { useGetClientRequestQuery, useGetRequestUserInforByIdQuery, useUpdateDeclarationRequestMutation } from '../../../../store/Slices/ClientManager';
import { useLocation } from 'react-router-dom';
import AppSnackbar from '../../../../utils/AppSnackbar';

const DeclarationForm = () => {
  const { state }: any = useLocation()
  console.log(state, "hkjfdshskjdhf")

  // state start here


  // const [IscandidateDeclartion,setIsCandidateDeclartion] = useState<Boolean>()
  // const [IsWorkingTime,setIsWorkingTime] = useState<Boolean>()
  // const [IsCallengingBehaviour,setIsChallengingBehaviour] = useState<Boolean>()
  // const [IsConfidentialAgreement,setIsConfidentialAgreement] = useState<Boolean>()
  // const [IsPensionChange,setIsPensionChange] = useState<Boolean>()
  // const [IsDataPrivacyChangeHandler,setIsDataPrivacyChangeHandler] = useState<Boolean>()
  // const [rightToWork, setRightToWork] = useState('');
  // const [dbaCheck, setDbaCheck] = useState('');
  // const [detail, setDetail] = useState('');


  const userData: any = localStorage.getItem("careUserData")
  const { username }: any = JSON.parse(userData);
  const { id }: any = JSON.parse(userData);
  const [pagination, setPagination] = useState({ limit: 10, page: 1 });
  const { role }: any = JSON.parse(userData);

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


  const [declarativeSwitchValues, setDeclarativeSwitchValues] = useState({
    timeDirectives: false,
    challengingBehaviour: false,
    confidentialAgreement: false,
    pensionOptout: false,
    dataPrivacy: false,
    candidateDeclaration: false,
    rightTOworkUK: false,
    dbacheck: false,
  });
  const [rightTOworkDetails, setRightTOworkDetails] = useState("");





  // state end here

  // api start
  const [updateDeclarationRequest] = useUpdateDeclarationRequestMutation();
  const { data, isSuccess } = useGetRequestUserInforByIdQuery({ id: state?.editProfile?._id ? state?.editProfile?._id : id, detail: "OTHERINFO" })
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
        dbacheck: profileViewInfoData?.data?.userprofile?.declaration?.dbacheck || false

      });
      setRightTOworkDetails(profileViewInfoData?.data?.userprofile?.declaration?.rightTOworkDetails)
    }
  }, [data, isSuccess]);

  // console.log("data ===>", data)

  const handleTextAreaChange = (e: any) => {
    setRightTOworkDetails(e.target.value);
  };

  const handleSwitchChange = (name: any) => (checked: any) => {
    setDeclarativeSwitchValues((prevValues) => ({
      ...prevValues,
      [name]: checked
    }));
  };

  const onFinish = async (value: any) => {
    console.log("values is", value)
    const declarativePayloadValues = { ...value, ...declarativeSwitchValues, rightTOworkDetails: rightTOworkDetails }
    updateDeclarationRequest({ id: state?.editProfile?._id ? state?.editProfile?._id : id, payload: { declaration: declarativePayloadValues } })


    try {
      const { data, error }: any = await updateDeclarationRequest({ id: state?.editProfile?._id ? state?.editProfile?._id : id, payload: { declaration: declarativePayloadValues } })
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


  // api start

  // function sendEmailHandler(){
  // const payload = {
  // candidateDeclaration:IscandidateDeclartion,
  // challengingBehaviour:IsCallengingBehaviour,
  // confidentialAgreement:IsConfidentialAgreement,
  // dataPrivacy:IsDataPrivacyChangeHandler,
  // pensionOptout:IsPensionChange,
  // rightTOworkDetails:detail,
  // rightTOworkUK:rightToWork,
  // dbacheck:dbaCheck,
  // timeDirectives:true,
  // isAudited: true  
  // };
  // updateDeclarationRequest({ id: state?.editProfile?._id, payload:{declaration:payload}  })
  // }





  // api end

  return (
    <>
      <Form
        name="basic"
        // initialValues={{ remember: true }}
        onFinish={onFinish}
        layout="vertical"
        className="declaration-main"
      >
        <div className='client-manager-information-form-wrapper decleration-form-styles'>
          <div className='form-heading heading-flex'>Declaration</div>
          <div className='grey-scale-body'>
            <p className='form--label'>The following declaration statements are asked to candidates.</p>
            <span style={{ fontSize: '14px', fontWeight: '400px' }}>The information in this application form is true and complete. I agree that any deliberate omission, falsification or misrepresentation in the
              application form will be grounds for rejecting this application or subsequent dismissal if employed by the Organisation. Where applicable,
              I consent that the organisation can seek clarification regarding professional registration details.</span>

            <div className="form-check-group">
              <Form.Item name="candidateDeclaration" label="" >
                <Switch checked={declarativeSwitchValues.candidateDeclaration} onChange={handleSwitchChange('candidateDeclaration')} /> &nbsp; <span> I agree to the above Declaration.</span>
              </Form.Item>
            </div>

          </div>
          <hr className='br-line' />
          <div className='grey-scale-body'>
            <div className="bullet-label form--label">
              Does the candidate have the right to work in UK?
            </div>
            <Form.Item name="rightTOworkUK" label="" >
              <Radio.Group defaultValue={declarativeSwitchValues?.rightTOworkUK} className='form-radio-group'>
                <Radio value={true}>Yes</Radio>
                <Radio value={false}>No</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item name="rightTOworkDetails" label="" >
              <div style={{ margin: '20px 0px 6px 0px' }} className='form--label grey-scale-label'>If Yes, please provide more details</div>
              <TextArea rows={4} placeholder="Type here" value={rightTOworkDetails} onChange={handleTextAreaChange} />
            </Form.Item>
          </div>

          <div style={{ marginTop: '20px' }} className='grey-scale-body'>
            <div className="bullet-label form--label">
              Are you willing to undergo a full enhanced DBA check at a price of £55 ?
            </div>
            <Form.Item name="dbacheck" label="" >
              <Radio.Group defaultValue={declarativeSwitchValues?.dbacheck} className='form-radio-group'>
                <Radio value={true}>Yes</Radio>
                <Radio value={false}>No</Radio>
              </Radio.Group>
            </Form.Item>
          </div>

          <div style={{ marginTop: '20px' }}>
            <div className="bullet-label form--label" style={{ marginBottom: '10px' }}>
              Woking Time Directives
            </div>
            <span className='className="grey-scale-body"'>Understand thet I am under no obligation to work than the average of 48 hours in any week. These hours include hours worked with any
              other company as well as our services. I further understand that I may work more than 48 hours per week if I wish. Under the terms of
              engagement, I realise that I may turn down any assignment at any time without any reason, without detriment. By signing this declaration,
              I am signifyingthat any hours in excess of an average of 48 hours per week are worked by my choice. But also make it clear that this
              declaration does not mean I will work more than 48 hours every week. I understand to inform the total number of hours I work in a week
              from all form of  employement exceeds 48, in order that we may take this into consideration before offering work to me.</span>
            <Form.Item name="timeDirectives" label="" >
              <div className="form-check-group">
                <Switch checked={declarativeSwitchValues.timeDirectives}
                  onChange={handleSwitchChange('timeDirectives')}
                /> &nbsp; <span className="grey-scale-body"> I agree to the above Declaration.</span>
              </div>
            </Form.Item>
          </div>

          <div style={{ marginTop: '20px' }}>
            <div className="bullet-label form--label" style={{ marginBottom: '10px' }}>
              Challenging Behaviour
            </div>
            <span className='className="grey-scale-body"'>When working in this industry there are hazards associated with the industry. I appreciate and accept that one of these hazards is
              possible aggressive behaviour from challenging service users. Service users may present challenging and aggressive behavious
              and this is out of control for us. I understand and accept that I am under no obligation as an agency worker to accept assignments.
              I accept that there is this risk and accept that this risk is a result of the industry and not our services. I understand if I am unhappy
              with any assignment I can withdraw my submission at any time with reasonable notice dictated in my contract for service, amd as
              a result I will  not hold our services liable for any injury or loss of earnings as an agency worker . I understand that if I am injured or
              affectefd in any other way whilst on an assignment that is not my fault or of our services.</span>
            <Form.Item name="challengingBehaviour" label="" >
              <div className="form-check-group">
                <Switch checked={declarativeSwitchValues.challengingBehaviour}
                  onChange={handleSwitchChange('challengingBehaviour')} /> &nbsp; <span className="grey-scale-body"> I agree to the above Declaration.</span>
              </div>
            </Form.Item>
          </div>

          <div style={{ marginTop: '20px' }}>
            <div className="bullet-label form--label" style={{ marginBottom: '10px' }}>
              Confidential Agreement
            </div>
            <span className='className="grey-scale-body"'>I can confirm that during every assignment and afterwards. To hold information relating to the client in the strictness confidence,
              ensure that it is kept safely and securely when not in use. I acknowledge that no information is to be removed from the client’s
              permises without permission of the client.</span>
            <Form.Item name="confidentialAgreement" label="" >
              <div className="form-check-group">
                <Switch checked={declarativeSwitchValues.confidentialAgreement}
                  onChange={handleSwitchChange('confidentialAgreement')} /> &nbsp; <span className="grey-scale-body"> I agree to the above Declaration.</span>
              </div>
            </Form.Item>
          </div>

          <div style={{ marginTop: '20px' }}>
            <div className="bullet-label form--label" style={{ marginBottom: '10px' }}>
              Pension Opt-out
            </div>
            <span className='className="grey-scale-body"'>This is to inform that i can choose to : (please click your answer) BE ENROLLED IN PENSION THE NEST PENSION SCHEME OPT OUT FOR
              PENSION ENROLMENT Name : Signed : Date : * Please note we will automatically enrol you to our NEST Pension Scheme if we did not
              receive this form back after your qualifying period. Once enrolled, a percentage of your salary will be deducted for your pension
              contribution, it will be reflected on your payslips. Please visit NESTPENSION.ORG.UK for more information regarding pensions.</span>
            <Form.Item name="pensionOptout" label="" >
              <div className="form-check-group">
                <Switch checked={declarativeSwitchValues.pensionOptout}
                  onChange={handleSwitchChange('pensionOptout')} /> &nbsp; <span className="grey-scale-body"> I agree to the above Declaration.</span>
              </div>
            </Form.Item>
          </div>

          <div style={{ marginTop: '20px' }}>
            <div className="bullet-label form--label" style={{ marginBottom: '10px' }}>
              Data Privacy Policy
            </div>
            <span className='className="grey-scale-body"'>
              <div className='bullet-label-light'>PERSONAL INFORMATION WE COLLECT</div>
              Personal Information is information that identifies you as an individual which could also be considered sensitive personal information,
              such as: Name, Date and Place of birth, Contact details, Citizenship, Religion,  Civil Status, Medical Information and such other personally
              identifiable information in addition to your personal information, we will also maintain records of your educational background,
              employment application, history with the company, areas of experties, details of salary and benefits, bank details, performance
              appraisals and salary reviews if applicable, working time records and other records pertinent to your continued employment.
              <div className='bullet-label-light'>USE OF PERSONAL INFORMATION</div>
              we use this  information for a variety of personnel administration and emplyee, work and general business management purposes,
              including administration of payroll, improvement and providing and maintenance of the administration of employee benefits, facilitate
              the management of work and employees, operate performance and salary reviews, operating the company’s IT and communication
              systems comply with record keeping and other legal obligations. The company aslo processes information information relating to your
              health which may amount to sensitive Personal Information. The particular information that the company holds relating to your health
              are the records of sickness absence, medical certificates and any other health and medical records.
              <div className='bullet-label-light'>SECURITY</div>
              These information ahall be controlled by  our administrative employees who can access it electronically. The company has security
              measures in place which will ensure the confidentiality of the information.
              <div className='bullet-label-light'>TO WHOM DO WE SHARE YOUR PERSONAL INFORMATION</div>
              In compliance with this Data Privacy Policy, your personal information will be disclosed to third party service providers only in compliance
              with our contractual obligation. We will also disclose your personal Infromation to comply with our legal obligations, including to various
              law inforcement agencies, regulatory authorities and governments in United Kingdom and around the world and their service providers
              for security, customs and immigration purposes, upon their lawful request.
              <div className='bullet-label-light'>RIGHT TO DATA SUBJECT</div>
              We respect and value all your rights as data subject. Hence, the personal information you have provided in the sites shall be retained for
              as long as necessary to fulfil the purposes for which it was collected, to comply with our legal obligations, resolve disputes, and enforce
              on agreements with third parties. You may exercise your particular Right to Access, Modify and Delete the persocal information and
              change preferences, by contacting us through the information provided below: In the Company’s direction, we may amend, interpret,
              modify or withdraw any portion of this Data Privacy Policy at any time.
              <div className='bullet-label-light'>STAFF DECLARATION</div>
              I consent to QBIX processing data relating to you for legal, personnel, administrative and management purposes and in particular to the
              processing of any sensitive personal data (as defined in the Data Protection Act 1998) relating to you including, as appropriate information
              about your physical or mental health condition, and information relating to any criminal proceedings in which you have been involved for
              insurance purposes and in order to comply with lgal requirements and obligations to third parties.</span>
            <Form.Item name="dataPrivacy" label="" >
              <div className="form-check-group">
                <Switch checked={declarativeSwitchValues.dataPrivacy}
                  onChange={handleSwitchChange('dataPrivacy')} /> &nbsp; <span className="grey-scale-body"> I agree to the above Declaration.</span>
              </div>
            </Form.Item>
          </div>
          {/* <Form.Item name="candidateDeclaration" label="" > */}

          {/* </Form.Item> */}



          {role === "client" 
          ?
            <Button type='primary' htmlType='submit'>Submit Declaration</Button>
            :
            <div className="form-confirmation-wrapper">
              <span style={{ fontSize: '14px', fontWeight: "700", width: '85%', textAlign: "center" }}>You have completed the Carer registration process. Click the send email button to send an email with Carer’s credentials and the Carer can sign the declaratio form.</span>
              <Button className='send-email-btn' htmlType='submit'>Send Email</Button>
            </div>
          }

        </div>
      </Form>
    </>
  )
}

export default DeclarationForm