import { Button, Col, Divider, Row, Space, Switch, Tooltip } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState ,useEffect} from "react";
import { useLocation } from "react-router-dom";
import infoIcon from "../../../../../assets/icons/info-icon.svg";
import { useGetRequestByIdQuery, useUpdateRequestMutation } from "../../../../../store/Slices/OnBoarding";
import "./FormMain.scss";

const MedicalQuestionnaireDetails = [
    {
        title:
            "Bronchitis, Asthma, Persistent Cough, TB, Pleurisy, Infection of the lungs or Throat",
        switch: false,
        value:"bronchitis"
    },
    {
        title: "Rheumatism, Arthritis, Gout, Rheumatic Fever ",
        switch: false,
        value:"rheumatism"
    },
    {
        title:
            "Blood Pressure, Palpitations, Shortness of Breath, Chest Pains, Infection of the Heart ",
        switch: false,
        value:"bloodpressure"
    },
    {
        title: "Fits, Fainting, Blackouts, Any disease of the nervous system?",
        switch: false,
        value:"fits"
    },
    {
        title:
            "Chronic or persistent indigestion, Gastric or duodenal ulcer, Any other infection of the abdominal organs?",
        switch: false,
        value:"chronic"
    },
    {
        title:
            "Any infection of the liver, Prostate, Kidneys, Urinary system, Reproductive system?",
        switch: false,
        value:"infectionLiver"
    },
    {
        title: "Enlarged glands, Tumours?",
        switch: false,
        value:"enlargedGlands"
    },
    {
        title: "Mental breakdown, Anxiety, Depression?",
        switch: false,
        value:"mentalBreakdown"
    },
    {
        title: "Diabetes, Thyroid disease, Any other glandular disturbance?",
        switch: false,
        value:"diabetes"
    },
    {
        title: "Any accident, Physical defect, Disc or back trouble, Hernia?",
        switch: false,
        value:"accident"
    },
    {
        title: "Have you ever suffered from AIDS, An AIDS related virus?",
        switch: false,
        value:"aids"
    },
    {
        title: "Any illness or condition not already mentioned?",
        switch: false,
        value:"illness"
    },
    {
        title:
            "Do you or have you suffered from dermatitis, Skin allergies, Other skin diseases (eczema, psoriasis, etc.)?",
        switch: false,
        value:"dermatitis"
    },
    {
        title:
            "Are you currently receiving any medical treatment or taking any medication?",
        switch: false,
        value:"medicalTreatment"
    },
];


const MedicalQuestionnaire = (props: any) => {
    const { handleSelectedStepValue, setActivePanelKey, auditCheck } = props;
    const [MedicalQuestionnaire, setMedicalQuestionnaire] = useState(
        MedicalQuestionnaireDetails
    );
    const MedicalSurvey = [
      {
          title: "Have you been refused to employment because of your Health Care",
          switch: false,
          textArea: "",
          value: "refusedEmployment",
      },
      {
          title: "Have you ever had a surgical operation?",
          switch: false,
          textArea: "",
          value: "surgicalOperation",
      },
      {
          title: "Are you the allergic to any drugs?",
          switch: false,
          textArea: "",
          value: "allergicDrugs",
      },
      {
          title: "Have you ever had a sustined an industrial injury ?",
          switch: false,
          textArea: "",
          value: "industrialInjury",
      },
      {
          title: "Have you ever claimed against your employer?",
          switch: false,
          textArea: "",
          value: "claimAgainstEmployer",
      },
  ];
    
     const [isAudited ,setIsAudited]=useState(false)
    const [updateRequest]=useUpdateRequestMutation()
    const { state }: any = useLocation();
    const [medicalSurvey, setMedicalSurvey] = useState(MedicalSurvey);
  
    const userData: any = localStorage.getItem("careUserData");
    const {id,role}: any = JSON.parse(userData);

    let trainingCertificates:any
    const {data,isSuccess}=useGetRequestByIdQuery({id: state?.editProfile?._id ?? id,detail:"OTHERINFO"})
    const [absenceDays ,setAbsenceDays]=useState(trainingCertificates?.data?.userprofile?.medicalQuestionnaire?.absenceDays)

    const handleCheckboxChange = (index: any, checked: any) => {
        setMedicalSurvey((prevSurvey) => {
            const updatedSurvey = [...prevSurvey];
            updatedSurvey[index].switch = checked;
            return updatedSurvey;
        });
    };

    const handleTextAreaChange = (index: any, value: any) => {
        setMedicalSurvey(prevSurvey => {
            const updatedSurvey = [...prevSurvey];
            if (updatedSurvey[index].switch) {
                updatedSurvey[index].textArea = value;
            }
            return updatedSurvey;
        });
    };
    useEffect(() => {
      if (isSuccess && data) {
        setAbsenceDays(trainingCertificates?.data?.userprofile?.medicalQuestionnaire?.absenceDays)
         trainingCertificates = data;
        const updatedSpecialities = JSON.parse(JSON.stringify(MedicalQuestionnaire));
        const updatedKeys = Object.keys(trainingCertificates?.data?.userprofile?.medicalQuestionnaire
          ?? {});
  
        updatedKeys.forEach((item) => {
          const findIndex = updatedSpecialities.findIndex(
            (specialitiesValue:any) => specialitiesValue?.value === item
          );
          if (findIndex !== -1) {
            updatedSpecialities[findIndex].switch =
              trainingCertificates?.data?.userprofile?.medicalQuestionnaire[item];
          }
        });
        // Update the switch value of each item in the MedicalSurvey array
        const updatedTextareasValue = JSON.parse(JSON.stringify(MedicalSurvey));
       
        updatedKeys.forEach((item) => {
          const findIndex = updatedTextareasValue.findIndex(
            (specialitiesValue:any) => specialitiesValue?.value === item
          );

          if (findIndex !== -1) {
            updatedTextareasValue[findIndex].textArea =
              trainingCertificates?.data?.userprofile?.medicalQuestionnaire[item];
              updatedTextareasValue[findIndex].switch =
              trainingCertificates?.data?.userprofile?.medicalQuestionnaire[item];
          }
          
        });
        console.log(updatedTextareasValue)
    // Update the state variable with the new array
    setMedicalSurvey(updatedTextareasValue);
        setMedicalQuestionnaire(updatedSpecialities);
      }
    }, [isSuccess,data]); 
      const handleSwitchChange = (index: any, checked: any) => {
          const newSpecialities = [...MedicalQuestionnaire]; // create a new copy of the array
          newSpecialities[index].switch = checked; // update the switch value for the corresponding item
          setMedicalQuestionnaire(newSpecialities); // update the state with the new array
      };
  
      

    const medicalInfoObject:any = {};
    MedicalQuestionnaire.forEach(item => {
        medicalInfoObject[item.value] = item.switch;
    });


 const medicalSurayTextAreaInfo:any={}   
 medicalSurvey.forEach(item => {
    medicalSurayTextAreaInfo[item.value] = item.textArea;
  });
  const medicalQuestionnaire={...medicalInfoObject,...medicalSurayTextAreaInfo,isAudited,absenceDays}

  const handleImmunisation=()=>{
    updateRequest({id:state?.editProfile?._id??id,payload:{medicalQuestionnaire:medicalQuestionnaire}})
    handleSelectedStepValue('Declaration'); setActivePanelKey('Declaration')
  }
    return (
        <div className="personal-form-wrapper">
            <Row gutter={[20, 20]}>
                <Col xs={24}>
                    <Space direction="vertical">
                        <span className="fw-600 fs-20"> Medical Questionnaire</span>
                        <span className="fw-400 fs-14">All information given will be treated in the strictest confidence and not used for any other purpose.</span>
                        <span className="fw-600 fs-14">Please state whether you have ever suffered from or had any symptoms of the following complaints</span>

                    </Space>
                </Col>

                {MedicalQuestionnaire.map((item, index) => (
                    <Col xs={24}>
                        <Space key={index}>
                            <Switch
                                checked={item.switch}
                                onChange={(checked) => handleSwitchChange(index, checked)}
                            />
                            <span className="fw-400 fs-14 label-color">{item.title}</span>
                        </Space>
                    </Col>
                ))}
                <Divider style={{ borderColor: "#D9DBE9" }} />

                {medicalSurvey.map((item, index) => (
                    <Col lg={13} xs={24} key={index}>
                        <Space >
                            <Switch
                                checked={item.switch}
                                onChange={(checked) => handleCheckboxChange(index, checked)}
                            />
                            <span className="fw-400 fs-14 label-color">{item.title}</span>
                        </Space>
                        {item.switch && (
                            <TextArea
                                rows={4}
                                value={item.textArea}
                                onChange={(e) => handleTextAreaChange(index, e.target.value)}
                                placeholder='Provide Details'
                                style={{ marginTop: '10px' }}
                            />
                        )}
                    </Col>
                ))}


                <Col lg={19} md={24}>
                    <span className="fs-14 fw-400">Approximately how many days absences have you had from work,school or university for health reasons during last
                        5 years? No of days and please give details of periods of absence due to sickness of five days or  more</span>
                </Col>
                <Col lg={13} xs={24}>
                    <TextArea
                        rows={4}
                        value={absenceDays}
                        placeholder='Provide Details'
                        onChange={(e:any)=>setAbsenceDays(e.target.value)}
                    />
                </Col>
                <Col xs={24}>
                    <div>
                        <Space className='carer-buttons'>
                            {(auditCheck && role==="admin") && <Tooltip
                                        autoAdjustOverflow={true}
                                        showArrow={false}
                                        placement="bottomLeft" color="#65CDF0"
                                        title='Click to mark as audit'
                                    >

                                        <Button className='edit-module-button  audit-button  align-center d-flex' onClick={()=>{setIsAudited(true)}}>Audit</Button>
                                    </Tooltip>}
                            <Button
                                className="edit-module-button bg-orange-color  align-center d-flex "
                                htmlType="submit" onClick={handleImmunisation}
                            >
                                Save
                            </Button>
                            <Button
                                className="edit-module-button   align-center d-flex btn-secondary"
                                htmlType='submit'
                                onClick={() => { handleSelectedStepValue('Declaration'); setActivePanelKey('Declaration') }}

                            >
                                Continue
                            </Button>
                        </Space>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default MedicalQuestionnaire;
