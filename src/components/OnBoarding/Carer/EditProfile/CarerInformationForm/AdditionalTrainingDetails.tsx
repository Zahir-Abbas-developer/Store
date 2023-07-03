
import { Button, Col, DatePicker, Form, Input, Modal, Row, Space, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import './FormMain.scss'
import Pdf from '../../../../../assets/images/OnBoarding/pdf.svg';
import AddIcon from '../../../../../assets/images/OnBoarding/addIcon.svg'
import infoIcon from "../../../../../assets/icons/info-icon.svg";
import DateIcon from '../../../../../assets/images/OnBoarding/datePicker.svg';
import Edit from '../../../../../assets/icons/OnBoarding/edit.svg';
import '../../../../../shared/DatePickerWrapper/DatePickerWrapper.scss';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { additionalTraining } from '../../../../../mock/OnBoarding';
import UploadImage from '../../../../Setting/SettingKeyInfo/UploadImage/UploadImage';
import {  usePostAddAdditionalDetailsRequestMutation, useUpdateAdditionalDetailsRequestMutation } from '../../../../../store/Slices/WorkExperience';
import { useLocation } from 'react-router-dom';
import dayjs from 'dayjs';
import { useGetRequestByIdQuery } from '../../../../../store/Slices/OnBoarding';
import { isNullOrEmpty } from '../../../../../utils/utils';


interface IAdditionalTraining {
    trainingName: string,
    certificateIssuedDate: string,
    certificateExpiryDate: string,
    certificates: string

}


const AdditionalTrainingDetails = (props: any) => {

    const { handleSelectedStepValue, auditCheck } = props;
    const [certificateId ,setCertificateId]=useState("")
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isErrorMessage, setIsErrorMessage] = useState(false);
    const [editAdditionalDetails ,setEditAdditionalDetails]=useState<any>()
    const [selectedRowData ,setSelectedRowData]=useState<any>({})
    const userData: any = localStorage.getItem("careUserData")
    const {id,role}: any = JSON.parse(userData);
    const { state }: any = useLocation()
    const {data,isLoading: isGetLoading,isSuccess}=useGetRequestByIdQuery({id:state?.editProfile?._id ??id,detail:"TRAININGWORK"})
    const [form] = Form.useForm();
    let additionalDetails:any
    if(isSuccess){
        additionalDetails=data
    }
    const [postAddAdditionalDetailsRequest]=usePostAddAdditionalDetailsRequestMutation()
    const [updateAdditionalDetailsRequest]=useUpdateAdditionalDetailsRequestMutation()
    const uploadCertificateId=(id:any)=>{
        setCertificateId(id)
    }
    const handleReferenceRowData = (record: any) => {
        setSelectedRowData(record)
        setEditAdditionalDetails("Edit")
    }
   
    let payloadAdditionalTrainings={
        trainingName:selectedRowData?.trainingName,
        certificateIssuedDate: selectedRowData?.certificateIssuedDate ? dayjs(selectedRowData?.certificateIssuedDate) : undefined,
        certificateExpiryDate: selectedRowData?.certificateExpiryDate  ? dayjs(selectedRowData?.certificateExpiryDate) : undefined,
        certificates:selectedRowData?.certificates,
    }
   
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
       
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        
        setSelectedRowData({})

    };
    const onFinish = async (values: any) => {
      const payloadAdditionalDetails={...values,certificates:certificateId?certificateId:payloadAdditionalTrainings?.certificates?._id  }
      try {
        if (editAdditionalDetails === "Edit") {
        
          const { error }: any = await  updateAdditionalDetailsRequest({payload:payloadAdditionalDetails,id:selectedRowData?._id})
          setCertificateId("")
          if (error) {
            setIsErrorMessage(error?.data?.message)
            return;
          }
        } else {
          const { error }: any = await   postAddAdditionalDetailsRequest({payload:payloadAdditionalDetails,id:state?.editProfile?._id??id})
    
          if (error) {
            setIsErrorMessage(error?.data?.message)
            return;
          }
        }
    
        setSelectedRowData({});
        setIsModalOpen(false);
        form.resetFields();
      } catch (error) {
        console.log("Unexpected error:", error);
      }
    };
    
   

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
        
    };
    const config = {
        rules: [{ type: 'object' as const, required: true, message: 'Required Field', }],
    };
 
    useEffect(() => {
      form.setFieldsValue(payloadAdditionalTrainings)
     }, [form, selectedRowData?.trainingName,selectedRowData?.certificateIssuedDate ,selectedRowData?.certificateExpiryDate, selectedRowData?.certificates ])

    const columns: ColumnsType<IAdditionalTraining> = [
        {
            title: <span className='fw-600 fs-14'>Training Name</span>,
            dataIndex: 'name',
            key: 'name',
            width: 160,
            render: (_, text) =>

                <span className='fs-14 fw-400 title-color'>
                    {text.trainingName}
                </span>

        },
        {
            title: <span className='fw-600 fs-14'>Certificate Issued</span>,
            dataIndex: 'certificateIssuedDate',
            key: 'certificateIssuedDate',

            render: (_, text) =>

                <span className='fs-14 fw-400 title-color'>
                      { dayjs(text.certificateIssuedDate).format("DD-MM-YYYY")}
                </span>

        },
        {
            title: <span className='fw-600 fs-14'>Certificate Expiry Date</span>,
            dataIndex: 'certificateExpiryDate',
            key: 'certificateExpiryDate',


            render: (_, text) =>
                <span className='fs-14 fw-400 title-color'>
                    { dayjs(text.certificateExpiryDate).format("DD-MM-YYYY")}
                </span>

        },

        {
            title: <span className='fw-600 fs-14' >Attachment</span>,
            dataIndex: 'status',
            key: 'status',


            render: (_, text:any) => <span className='fs-14 fw-400 title-color'> <a href={`https://rnd-s3-public-dev-001.s3.eu-west-2.amazonaws.com/${text.certificates?.mediaId}.${text.certificates?.mediaMeta?.extension}`}> <img src={Pdf} alt="image" /></a> </span> },
        {
            title: <span className='fw-600 fs-14'>Action</span>,
            dataIndex: 'action',
            key: 'action',


            render: (_, text) =>
                <span onClick={showModal} >
                    <img src={Edit} alt="edit" onClick={() => {handleReferenceRowData(text);setCertificateId("")}} />
                </span>

        },


    ];


    return (
        <div>
            <Row gutter={[20, 20]}>
                <Col xs={24}>
                    <span className='fw-600 fs-20' >Additional Training Details</span>
                </Col>
                <Col xs={24}>
                    <button className='add-reference-modal-btn cursor-pointer' onClick={showModal}>
                        <Space>
                            <span className='fw-600 fs-14 title-color' onClick={()=>setSelectedRowData({})}>Add Training Details </span>
                            <img src={AddIcon} alt="AddIcon" className='d-flex align-center' />
                        </Space>
                    </button>
                </Col>
                {isNullOrEmpty(additionalTraining) ?<p>No Data</p> : <Col xs={24}>
                    <span className='fw-600 fs-20' >Additional Training Details</span>
                </Col>}

                 { isNullOrEmpty(additionalTraining) ?<p>No Data</p> : <Col xs={24} className='onboading-table-wrapper'>
                    <Table className="wrapper-table" loading={isGetLoading} columns={columns} dataSource={additionalDetails?.data?.userprofile[0]?.tDetails} scroll={{ x: "max-content" }} pagination={false} />
                </Col>}


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
                            <Button className='edit-module-button   align-center d-flex btn-secondary' htmlType='submit' onClick={() => handleSelectedStepValue('Work Experience')}>Continue</Button>
                        </Space>
                    </div>
                </Col>

            </Row>
            <Modal className='personal-form-wrapper' title={<span style={{ fontWeight: "500px", fontSize: "20px" }}>Additional Training Details </span>} centered open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={800} footer={false} >
                <Form
                    name="basic"
                    initialValues={{...selectedRowData,certificateIssuedDate: selectedRowData?.certificateIssuedDate ? dayjs(selectedRowData?.certificateIssuedDate) : undefined, certificateExpiryDate: selectedRowData?.certificateExpiryDate  ? dayjs(selectedRowData?.certificateExpiryDate) : undefined,}}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    form={form}
                    // autoComplete="off"
                    layout="vertical"
                >
                    <Row gutter={[30, 5]} align="bottom">
                        <Col xs={24} sm={24} md={12} lg={12} className='carer-form-input '>
                            <Form.Item
                                label="Training Name"
                                name="trainingName"

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
                        </Col>

                        <Col xs={24} className='carer-form-input '>
                            <UploadImage uploadCertificateId={uploadCertificateId} fileUrl={payloadAdditionalTrainings?.certificates?.mediaId} />
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} className='date-picker-wrapper'>

                            <Form.Item name="certificateIssuedDate" label="When was the Certificate Issued?" {...config} style={{ maxWidth: '100%' }}>
                                <DatePicker  popupClassName="date-picker-content" suffixIcon={<img src={DateIcon} />} clearIcon={false} placeholder='yyyy-mm-dd' />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} className='date-picker-wrapper'>

                            <Form.Item name="certificateExpiryDate" label="Certificate Expiry Date" {...config} style={{ maxWidth: '100%' }}>
                                <DatePicker   popupClassName="date-picker-content" suffixIcon={<img src={DateIcon} />} clearIcon={false} placeholder='yyyy-mm-dd' />
                            </Form.Item>
                        </Col>
                        <p style={{ color: "red" }}>{isErrorMessage}</p>
                        <Col xs={24} >

                            <Space className='modal-buttons'>
                                <button className='modal-button btn-cancel  ' >Cancel</button>
                                <button className='modal-button btn-secondary' >Save</button>
                            </Space>

                        </Col>
                    </Row>
                </Form>
            </Modal>
        </div>
    )
}

export default AdditionalTrainingDetails