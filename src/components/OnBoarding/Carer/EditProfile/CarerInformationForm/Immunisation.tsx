import { Button, Col, Row, Space, Switch, Tooltip } from 'antd'
import TextArea from 'antd/es/input/TextArea';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import infoIcon from "../../../../../assets/icons/info-icon.svg";
import { useGetRequestByIdQuery, useUpdateRequestMutation } from '../../../../../store/Slices/OnBoarding';
import UploadImage from '../../../../Setting/SettingKeyInfo/UploadImage/UploadImage';
import './FormMain.scss'
import ApiLoader from '../../../../ApiLoader/ApiLoader';


const ImmunisationDetails = [
    {
        title: 'Tetanus',
        switch: false,
        value:"tetanus"
    },
    {
        title: 'Hepatitis B',
        switch: false,
        value:"hepatitisB"
    },
    {
        title: 'Polio',
        switch: false,
        value:"polio"
    },
    {
        title: 'Varicella (Chickenpox)',
        switch: false,
        value:"varicella"
    },
    {
        title: 'Measles,mumps and rubella (MMR)',
        switch: false,
        value:"measles"
    },
    {
        title: ' Annual Influenza Vaccine',
        switch: false,
        value:"influenza"
    },
    {
        title: 'Covid Vaccination',
        switch: false,
        value:"covidVaccination"
    },
    {
        title: 'Bacillus Calmette-Guerin (BCG)',
        switch: false,
        value:"bacillus"
    },
    {
        title: 'Willing to do personal care tasks',
        switch: false,
        value:"isAudited"
    },


]
const Immunisation = (props: any) => {
    const { handleSelectedStepValue, auditCheck } = props;
    const [specialities, setSpecialities] = useState(ImmunisationDetails);
    const [certificateId ,setCertificateId]=useState("")  
     const [isAudited ,setIsAudited]=useState(false)
    const [immunisationUploadCertificates ,setImmunisationUploadCertificates]=useState("")
    const [updateRequest]=useUpdateRequestMutation()
    const { state }: any = useLocation();
    const uploadCertificateId=(id:any)=>{
        setCertificateId(id)
    }
    const userData: any = localStorage.getItem("careUserData");
    const {id,role}: any = JSON.parse(userData);

    let trainingCertificates:any

    const {data,isLoading,isSuccess,isError}=useGetRequestByIdQuery({id: state?.editProfile?._id ?? id,detail:"OTHERINFO"})
    
    useEffect(() => {
 
   
      if (isSuccess && data ) {
         trainingCertificates = data;
        const updatedSpecialities = JSON.parse(JSON.stringify(specialities));
        const updatedKeys = Object.keys(trainingCertificates?.data?.userprofile?.immunisation ?? {});
        setImmunisationUploadCertificates(trainingCertificates?.data?.userprofile?.immunisation?.certificate) 
        console.log(immunisationUploadCertificates)
        updatedKeys.forEach((item) => {
          const findIndex = updatedSpecialities.findIndex(
            (specialitiesValue:any) => specialitiesValue?.value === item
          );
          if (findIndex !== -1) {
            updatedSpecialities[findIndex].switch =
              trainingCertificates?.data?.userprofile?.immunisation[item];
          }
        });
        setSpecialities(updatedSpecialities);
       
      }
    }, [isSuccess,data,immunisationUploadCertificates]); 
    
      const handleSwitchChange = (index: any, checked: any) => {
          const newSpecialities = [...specialities]; // create a new copy of the array
          newSpecialities[index].switch = checked; // update the switch value for the corresponding item
          setSpecialities(newSpecialities); // update the state with the new array
      };
      const specialitiesObject:any = {};
      specialities.forEach(item => {
          specialitiesObject[item.value] = item.switch;
      });
    const immunisationObject:any = {};
    specialities.forEach(item => {
      immunisationObject[item.value] = item.switch;
    });
  const handleImmunisation=()=>{
    updateRequest({id:state?.editProfile?._id ??id,payload:{immunisation:{...immunisationObject,certificate:certificateId ??immunisationUploadCertificates,isAudited}}})
  }

    return (
      <>
       {isSuccess?  <div className='personal-form-wrapper'>
      <Row gutter={[20, 20]}>
          <Col xs={24}>
              <span className='fw-600 fs-20' > Immunisation</span>
          </Col>

          {specialities.map((item, index) =>
              <Col lg={12} xs={24}>
                  <Space key={index}>
                      <Switch checked={item.switch} onChange={(checked) => handleSwitchChange(index, checked)} />
                      <span className='fw-400 fs-14 label-color'>{item.title}</span>
                  </Space>
              </Col>
          )}
          <Col xs={24}>
              <span className='fw-600 fs-20' > Upload Certificates</span>
          </Col>

          <Col xs={24}>
              <UploadImage uploadCertificateId={uploadCertificateId}  fileUrl={immunisationUploadCertificates }/>
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

                          <Button className='edit-module-button  audit-button  align-center d-flex' onClick={()=>{setIsAudited(true)}}>Audit</Button>
                      </Tooltip>}

                      <Button className='edit-module-button bg-orange-color  align-center d-flex ' htmlType='submit' onClick={handleImmunisation}>Save</Button>
                      <Button className='edit-module-button   align-center d-flex btn-secondary' htmlType='submit' onClick={() => handleSelectedStepValue('Medical Questionnaire')}>Continue</Button>
                  </Space>
              </div>
          </Col>

      </Row>

  </div>  :<ApiLoader/>}
      </>
     
       
    )
}

export default Immunisation