import { Button, Col, Progress, Row, } from 'antd';
import React, { useEffect, useState } from 'react'
import "./ClientRegistration.scss"
import ClientProfileInfoForm from './ClientProfileInfoForm/ClientProfileInfoForm';
import ClientAddressForm from './ClientProfileInfoForm/ClientAddressForm';
import ClientPublicInformationForm from './ClientProfileInfoForm/ClientPublicInformationForm';
import ManageDepartmentsForm from './ClientProfileInfoForm/ManageDepartmentsForm';
import ClientAdminUsersForm from './ClientProfileInfoForm/ClientAdminUsersForm';
import ProfileComments from './ClientProfileInfoForm/ProfileComments';
import UpdatePrimaryEmailAndPhone from './ClientProfileInfoForm/UpdatePrimaryEmailAndPhone';
import DeclarationForm from './ClientProfileInfoForm/DeclarationForm';
import { useLocation } from 'react-router-dom';
import BreadCrumb from '../../../layout/BreadCrumb/BreadCrumb';
import { useGetClientRequestQuery, useGetRequestUserInforByIdQuery } from '../../../store/Slices/ClientManager';



const dataStepsClient = [
    {
        id: 1,
        tabLabel: 'Client Profile Information',
        isAudit: true,
    },
    {
        id: 2,
        tabLabel: 'Client Address',
        isAudit: false,
    },
    {
        id: 3,
        tabLabel: 'Client Public Information',
        isAudit: false,
    },
    {
        id: 4,
        tabLabel: 'Manage Departments',
        isAudit: false,
    },
    {
        id: 5,
        tabLabel: 'Client Admin Users',
        isAudit: false,
    },
    {
        id: 6,
        tabLabel: 'Profile Comments',
        isAudit: false,
    },
    {
        id: 7,
        tabLabel: 'Update Primary Email & Phone',
        isAudit: false,
    },
    {
        id: 8,
        tabLabel: 'Declaration',
        isAudit: false,
    },

]





const ClientRegistration = () => {


  const { state }: any = useLocation()
  const [pagination, setPagination] = useState({ limit: 10, page: 1 });

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
  

  const userData: any = localStorage.getItem("careUserData")
  const {username,id}: any = JSON.parse(userData);
  
  const getResUserData = getClientManagerData?.data?.result?.filter((item:any) => item.email === username);
  
  console.log("filteredData => ", getResUserData)
  // console.log("username => ", username)

  

  // console.log("progress bar is",state?.editProfile?.percentageComplete)

  const { data: isData, isLoading: isloadingData, isSuccess: isSuccessData, isError: iserrorData,} = useGetRequestUserInforByIdQuery({ refetchOnMountOrArgChange: true, id:id, detail: "ABOUT" });
  //  get client name
  let getRecentReviews: any;
  if (isloadingData) {
   getRecentReviews = <p>Loading...</p>;
 } else if (isSuccessData) {
   getRecentReviews = isData;
 } else if (iserrorData) {
   getRecentReviews = <p>Error...</p>;
 }

    const [selectedStepValue, setselectedStepValue] = useState<number>(1)
    const [isActivationSettings, setisActivationSettings] = useState(false)

    const handelSelectedStepValue = (ele: any) => {
        setselectedStepValue(ele.id)
    }
    const handelNextStep = (ele: any) => {
        setselectedStepValue(selectedStepValue + 1)
    }

    const handleChildStateChange = (childState: any) => {
        setselectedStepValue(childState);
    };

    //BreadCrumb Items 
    const breadCrumbItems = 
    [
    { title: "Client Registration", path: "", },
     { title: "Dashboard", path: "/dashboard", }, 
     { title: "Client Manager", path: "/client-manager", }, 
    ];


    useEffect(() => {
      
    }, [isInfoData])
    

    return (
        <div className="main-wrapper-clients-manager">
          <BreadCrumb breadCrumbItems={breadCrumbItems} />
            <div className="header-clients-wrapper d-flex justify-between align-items-center">
                <div className='d-flex align-center' style={{gap:'20px'}}>
                   {isActivationSettings && <Button type='primary'>Activation Settings</Button>}
                    <div className="user-status fs-14">
                        <label className='dark--brown fw-600'>User Status</label> : <span className='grey--color-body'>{state?.editProfile?.status ? state?.editProfile?.status : (getResUserData ? getResUserData[0]?.status : "") || getRecentReviews?.data?.userprofile?.status}</span>
                    </div>
                </div>
                <div className="form-progress">
                    <div>
                        <div className='fs-14 fw-400 title-color' style={{ minWidth: "70px" }}>
                            {/* <span className='fw-700 fs-14'>{state?.editProfile?.percentageComplete ? state?.editProfile?.percentageComplete : getResUserData ? getResUserData[0]?.percentageComplete : '' }%</span> */}
                            <span className='fw-700 fs-14'>{state?.editProfile?.percentageComplete ? state?.editProfile?.percentageComplete: (getResUserData ? getResUserData[0]?.percentageComplete : "") || getRecentReviews?.data?.percentageComplete }%</span>
                            <span style={{ marginLeft: "5px" }} className='fw-600 fs-14'>Done</span>
                        </div>
                        <Progress percent={state?.editProfile?.percentageComplete ? state?.editProfile?.percentageComplete: (getResUserData ? getResUserData[0]?.percentageComplete : "") || getRecentReviews?.data?.percentageComplete } strokeColor='#F7B923' strokeWidth={9} width={50} showInfo={false} /></div>
                </div>
            </div>
            <div className='wrapper-clients-manager'>
                <Row gutter={[32, 32]} >
                    <Col xs={24} sm={24} md={24} lg={24} xl={7}>
                        <div className='content-card side-bar-steps'>
                            {dataStepsClient.map((item: any, index: any) => (
                                <div className='steps-flex' key={index} onClick={() => handelSelectedStepValue(item)}>
                                    <div className="rounded">{selectedStepValue === item.id && <div className="inner--selected"></div>}</div>
                                    <div className="steps-content">
                                        <span className='steps-text fs-14 fw-400 dark-brown-color'>{item.tabLabel}</span>
                                        <div className="area-right">
                                            <div className={`rounded-bx ${!item.isAudit ? "rounded-bx" : "is-audit"}`}>P</div>
                                            <div className={`rounded-bx ${!item.isAudit ? "rounded-bx" : "is-audit"}`}>A</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={17}>
                        <div className='content-card'>
                            {(() => {
                                switch (selectedStepValue) {
                                    case 1:
                                        return (
                                            <ClientProfileInfoForm  onChildStateChange={handleChildStateChange} selectedStepValue={selectedStepValue} />
                                        );
                                    case 2:
                                        return (
                                            <ClientAddressForm onChildStateChange={handleChildStateChange} selectedStepValue={selectedStepValue} />
                                        );
                                    case 3:
                                        return (
                                            <ClientPublicInformationForm onChildStateChange={handleChildStateChange} selectedStepValue={selectedStepValue} />
                                        );
                                    case 4:
                                        return (
                                            <ManageDepartmentsForm onChildStateChange={handleChildStateChange} selectedStepValue={selectedStepValue} />
                                        );
                                    case 5:
                                        return (
                                            <ClientAdminUsersForm onChildStateChange={handleChildStateChange} selectedStepValue={selectedStepValue} />
                                        );
                                    case 6:
                                        return (
                                            <ProfileComments onChildStateChange={handleChildStateChange} selectedStepValue={selectedStepValue} />
                                        );
                                    case 7:
                                        return (
                                            <UpdatePrimaryEmailAndPhone onChildStateChange={handleChildStateChange} selectedStepValue={selectedStepValue} />
                                        );
                                    case 8:
                                        return (
                                            <DeclarationForm />
                                        );
                                    default:
                                        return null;
                                }
                            })()}
                            {/* {selectedStepValue !== 8 &&
                            <div className="form-lower-buttons">
                                <Button className='inner-button inner-form-buttons-audit'>Audit</Button>
                                <Button className='inner-button inner-form-buttons-save'>Save</Button>
                                <Button className='inner-button inner-form-buttons-continue' onClick={handelNextStep}>Continue</Button>
                            </div>
                        } */}


                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default ClientRegistration