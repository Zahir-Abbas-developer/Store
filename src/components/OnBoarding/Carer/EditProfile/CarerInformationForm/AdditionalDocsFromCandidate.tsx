
import { Button, Col, Form, Input, Modal, Row, Space, Tooltip } from 'antd';
import { useState ,useEffect} from 'react';
import './FormMain.scss'
import Close from '../../../../../assets/images/OnBoarding/Close.svg';
import AddIcon from '../../../../../assets/images/OnBoarding/addIcon.svg'
import Edit from '../../../../../assets/icons/OnBoarding/edit.svg';
import '../../../../../shared/DatePickerWrapper/DatePickerWrapper.scss';
import Pdf from '../../../../../assets/images/OnBoarding/pdf.svg';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { additionalTraining } from '../../../../../mock/OnBoarding';
import UploadImage from '../../../../Setting/SettingKeyInfo/UploadImage/UploadImage';
import { useGetRequestByIdQuery,  usePostOtherInformationRequestMutation, useUpdateAdditionalDocsRequestMutation } from '../../../../../store/Slices/OnBoarding';
import { useLocation } from 'react-router';
import form from 'antd/es/form';

interface IAdditionalTraining {
  trainingName: string,
    certificateIssued: string,
    certificateExpiry: string,
    image: string
}
const AdditionalDocsFromCandidate = (props: any) => {

    const { handleSelectedStepValue, auditCheck } = props;
    const { state }: any = useLocation()
    const userData: any = localStorage.getItem("careUserData")
    const {id,role}: any = JSON.parse(userData);
    const {data,isSuccess,isError}=useGetRequestByIdQuery({id:state?.editProfile?._id ??id,detail:"OTHERINFO"})
    const [postOtherInformationRequest,{isLoading}]=usePostOtherInformationRequestMutation()
    const [selectedDropdownOption ,setSelectedDropdownOption]=useState("")
    const [updateAdditionalDocsRequest]=useUpdateAdditionalDocsRequestMutation()
    const [isErrorMessage, setIsErrorMessage] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTableData, setSelectedRowData] = useState<any>({})
    const [certificateId ,setCertificateId]=useState("")
     
    const [form] = Form.useForm();
    let profileViewInfoData:any;
    
     if(isSuccess){
      profileViewInfoData=data
    }
    const showModal = () => {
        setIsModalOpen(true);
       

    };
    const handleOk = () => {
        setIsModalOpen(false);
        setSelectedRowData({})

    };
    const handleCancel = () => {
        setIsModalOpen(false);
        setSelectedRowData({})
    };
    const payloadWorkExperience={
      trainingName:selectedTableData?.trainingName,
      attachment:selectedTableData?.attachment?.mediaId
    }
    useEffect(() => {
      form.setFieldsValue(payloadWorkExperience)
    }, [form, selectedTableData?.trainingName, selectedTableData?.attachment?.mediaId])
    const onFinish = async (values: any) => {
      try {
        if (selectedDropdownOption === "Edit") {
          const { error }: any = await updateAdditionalDocsRequest({
            payload: {...values,userId:state?.editProfile?._id ??id},
            id: selectedTableData?._id,
            
          });
    
          if (error) {
            setIsErrorMessage(error?.data?.message)
            return;
          }
        } else {
       
          const { error }: any = await  postOtherInformationRequest({payload:{additionalDocs:{...values,attachment:certificateId }},id:state?.editProfile?._id ??id})
    
          if (error) {
            setIsErrorMessage(error?.data?.message)
            return;
          }
        }
    
        setSelectedRowData({});
        setIsModalOpen(false);
      
      } catch (error) {
        console.log("Unexpected error:", error);
      }
    };
    // const onFinish = (values: any) => {
    //     postOtherInformationRequest({payload:{additionalDocs:{...values,attachment:certificateId }},id:state?.editProfile?._id})
    // };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const uploadCertificateId=(id:any)=>{
        setCertificateId(id)
    }
    const handleAdditionalDocsById = (record: any) => {

      setSelectedRowData(record)
  };

    const columns: ColumnsType<IAdditionalTraining> = [
        {
            title: <span className='fw-600 fs-14'>Training Name</span>,
            dataIndex: 'name',
            key: 'name',

            render: (_, text) =>

                <span className='fs-14 fw-400 title-color'>
                    {text.trainingName}
                </span>

        },


        {
            title: <span className='fw-600 fs-14' >Attachment</span>,
            dataIndex: 'status',
            key: 'status',


            render: (_, text:any) => (
              
                <span className='fs-14 fw-400 title-color'>
                {text.attachment?  <a href={`https://rnd-s3-public-dev-001.s3.eu-west-2.amazonaws.com/${text.attachment
?.mediaId}.${text.attachment
?.mediaMeta?.extension}`}> <img src={Pdf} alt="image" /></a>  :"No Attachment"}
              
                </span>

       ) },
        {
            title: <span className='fw-600 fs-14'>Action</span>,
            dataIndex: 'action',
            key: 'action',


            render: (_, text) =>
                <span onClick={showModal} className='cursor-pointer' >
                    <img src={Edit} alt="edit"  onClick={() =>{ handleAdditionalDocsById(text);setSelectedDropdownOption("Edit");setCertificateId("")}}/>
                </span>
        },


    ];

    return (
        <div>
            <Row gutter={[20, 20]}>
                <Col xs={24}>
                    <span className='fw-600 fs-20' >Additional Document From the Candidate</span>
                </Col>
                <Col xs={24}>
                    <button className='add-reference-modal-btn cursor-pointer' onClick={ ()=>{showModal();setCertificateId("") }}>
                        <Space>
                            <span className='fw-600 fs-14 title-color'> Add Document </span>
                            <img src={AddIcon} alt="AddIcon" className='d-flex align-center' />
                        </Space>
                    </button>
                </Col>
                {additionalTraining.length > 0 && <Col xs={24}>
                    <span className='fw-600 fs-20' >Document Details</span>
                </Col>}

                {additionalTraining.length > 0 && <Col xs={24}>
                    <Table className='onboading-table-wrapper' columns={columns} dataSource={profileViewInfoData?.data?.userprofile?.additionalDocs} scroll={{ x: "max-content" }} pagination={false} />
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
                            <Button className='edit-module-button bg-orange-color  align-center d-flex '>Save</Button>
                            <Button className='edit-module-button   align-center d-flex btn-secondary' onClick={() => handleSelectedStepValue('Bank Details')}  >Continue</Button>
                        </Space>
                    </div>
                </Col>

            </Row>
            <Modal className='personal-form-wrapper' title={<span style={{ fontWeight: "500px", fontSize: "20px" }}>Additonal Document</span>} centered open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={800} footer={false} closeIcon={<img src={Close} alt="" />}>
                <Form
                    name="basic"
                    initialValues={selectedTableData}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    form={form}
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

                        <Col xs={24} className='carer-form-input '>
                            <UploadImage uploadCertificateId={uploadCertificateId}  fileUrl={selectedTableData?.attachment?.mediaId} />
                        </Col>

                        <Col xs={24} >
                          <p className='error-color'>{isErrorMessage}</p>
                            <Space className='modal-buttons'>
                            <Button  className="modal-button btn-cancel ">Cancel</Button>
                <Button type="primary"
                  htmlType="submit" loading={isLoading} className="modal-button btn-secondary ">Save</Button>
              </Space>
                               
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </div>
    )
}

export default AdditionalDocsFromCandidate