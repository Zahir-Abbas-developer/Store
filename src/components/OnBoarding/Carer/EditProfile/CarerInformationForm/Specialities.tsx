import { Button, Col, Row, Space, Switch, Tooltip } from 'antd'
import TextArea from 'antd/es/input/TextArea';
import { useState,useEffect } from 'react'
import { useLocation } from 'react-router';
import infoIcon from "../../../../../assets/icons/info-icon.svg";
import { useUpdateSpecialitiesRequestMutation } from '../../../../../store/Slices/WorkExperience';
import './FormMain.scss'
import { useGetRequestByIdQuery } from '../../../../../store/Slices/OnBoarding';
import ApiLoader from '../../../../ApiLoader/ApiLoader';

const SpecialitiesDetails = [
    {
        title: 'Able to follow instructions & procedures',
        switch: false,
        value:"followInstructions"
    },
    {
        title: 'Able to work in a team but use own initiative ',
        switch: true,
        value:"workInATeam"
    },
    {
        title: 'Caring and kind ',
        switch: true,
        value:"caringKind"
    },
    {
        title: 'Communication skills, including listening',
        switch: false,
        value:"communicationListeningSkills"
    },
    {
        title: 'Moving and handling',
        switch: false,
        value:"movingHandling"
    },
    {
        title: ' Observational skills',
        switch: true,
        value:"observationalSkills"
    },
    {
        title: 'Organising skills',
        switch: false,
        value:"organisingSkills"
    },
    {
        title: 'Willing to be hands-on with patients',
        switch: true,
        value:"handsonWithPatients"
    },
    {
        title: 'Willing to do personal care tasks',
        switch: false,
        value:"personalCareTasks"
    },


]
const Specialities = (props: any) => {
  const { handleSelectedStepValue, setActivePanelKey, auditCheck } = props;
  const [specialities, setSpecialities] = useState(SpecialitiesDetails);
  const [updateSpecialitiesRequest] = useUpdateSpecialitiesRequestMutation();
  const userData: any = localStorage.getItem("careUserData")
  const {id,role}: any = JSON.parse(userData);
  const { state }: any = useLocation();
  let trainingCertificates:any
  const { data, isSuccess } = useGetRequestByIdQuery({
    id: state?.editProfile?._id ?? id,
    detail: "TRAININGWORK",
  });
  if(isSuccess){
    trainingCertificates=data
  }
  const [othersText, setOthersText] = useState("");
  useEffect(() => {
    if (isSuccess && data) {
       trainingCertificates = data;
      const updatedSpecialities = JSON.parse(JSON.stringify(specialities));
      const updatedKeys = Object.keys(trainingCertificates?.data?.userprofile[0]?.specialities ?? {});

      updatedKeys.forEach((item) => {
        const findIndex = updatedSpecialities.findIndex(
          (specialitiesValue:any) => specialitiesValue?.value === item
        );
        if (findIndex !== -1) {
          updatedSpecialities[findIndex].switch =
            trainingCertificates?.data?.userprofile[0]?.specialities[item];
        }
      });
      setSpecialities(updatedSpecialities);
      setOthersText(trainingCertificates?.data?.userprofile[0]?.specialities?.others)
    }
  }, [isSuccess,data]); 
    const handleSwitchChange = (index: any, checked: any) => {
        const newSpecialities = [...specialities]; // create a new copy of the array
        newSpecialities[index].switch = checked; // update the switch value for the corresponding item
        setSpecialities(newSpecialities); // update the state with the new array
    };
    const specialitiesObject:any = {};
    specialities.forEach(item => {
        specialitiesObject[item.value] = item.switch;
    });
    
    const onFinish = (values: any) => {
        console.log('Success:', values);
        updateSpecialitiesRequest({id:state?.editProfile?._id??id,payload:{...specialitiesObject,others:othersText}})

    };


    return (
      <> {isSuccess ?   <div className='personal-form-wrapper'>
      <Row gutter={[20, 20]}>
          <Col xs={24}>
              <Space>
                  <span className='fw-600 fs-20' >Specialities</span>
                  <Tooltip placement="bottomLeft" color="#65CDF0" overlayInnerStyle={{
                      width: "499px",
                  }} title="This will be helpful to filter candidates based on their special skills. You can change these from Settings> Staff Settings> Define Staff Specialities.">
                      <img src={infoIcon} alt="infoIcon" className='d-flex align-center' />
                  </Tooltip>
              </Space>
          </Col>

          {specialities.map((item, index) =>
              <Col lg={12} xs={24}>
                  <Space key={index}>
                      <Switch checked={item.switch} onChange={(checked) => handleSwitchChange(index, checked)} />
                      <span className='fw-400 fs-14 label-color'>{item.title}</span>
                  </Space>
              </Col>
          )}

          <Col xs={13}>
              <span className='fw-600 fs-14 label-color'>Other</span>
              <TextArea value={othersText} rows={4} onChange={(e)=>{setOthersText(e.target.value)}}/>
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
                      <Button className='edit-module-button bg-orange-color  align-center d-flex ' htmlType='submit' onClick={onFinish}>Save</Button>
                      <Button className='edit-module-button   align-center d-flex btn-secondary' htmlType='submit' onClick={()=>{ setActivePanelKey('Background Checks');
            handleSelectedStepValue('DBS')}} >Continue</Button>
                  </Space>
              </div>
          </Col>

      </Row>

  </div>:<ApiLoader/>}</>
      
    )
}

export default Specialities