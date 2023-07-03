import { Button, Col, Dropdown, Form, Input, Modal, Row, Select, Space, Tooltip } from 'antd';
import { useState,useEffect } from 'react';
import View from '../../../../../assets/images/OnBoarding/View.svg';
import './FormMain.scss'
import Arrow from '../../../../../assets/images/OnBoarding/SelectArrow.svg';
import Close from '../../../../../assets/images/OnBoarding/Close.svg';
import AddIcon from '../../../../../assets/images/OnBoarding/addIcon.svg'
import { Option } from '../../../CareCordinator/ClientDetails/AllocateNewCareHomeModal';
import Dots from '../../../../../assets/images/OnBoarding/dots.png';
import Edit from '../../../../../assets/icons/OnBoarding/edit.svg';
import '../../../../../shared/DatePickerWrapper/DatePickerWrapper.scss';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useGetRequestByIdQuery,  usePostOtherInformationRequestMutation, useUpdateBankDetailsRequestMutation } from '../../../../../store/Slices/OnBoarding';
import { useLocation } from 'react-router-dom';


interface IBankDetails {
    accountUsername: string,
    bankName: string,
    sortCode: string,
    accountNumber: string,
    accountPreference: string
}

const BankDetails = (props: any) => {
    const { handleSelectedStepValue, setActivePanelKey, conditionalPath, auditCheck } = props;
    const [selectedDropdownOption ,setSelectedDropdownOption]=useState("")
    const [isErrorMessage, setIsErrorMessage] = useState(false);
    const [updateBankDetailsRequest]=useUpdateBankDetailsRequestMutation()
    const [form] = Form.useForm();
    const { state }: any = useLocation();
    const userData: any = localStorage.getItem("careUserData")

const {id,role}: any = JSON.parse(userData);
    const {data,isLoading: isGetLoading,isSuccess}=useGetRequestByIdQuery({id:state?.editProfile?._id ??id,detail:"OTHERINFO"})
    let profileViewInfoData:any;
    
     if(isSuccess){
      profileViewInfoData=data
    }
    

    const [postOtherInformationRequest, { isLoading: isPostLoading }]=usePostOtherInformationRequestMutation()
    const [IsModalOpen, setIsModalOpen] = useState(false);
    const [selectedTableData, setSelectedRowData] = useState<any>({})
   
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
    const handleProfileViewById = (record: any) => {

        setSelectedRowData(record)
    };
    const onFinish = async (values: any) => {
      try {
        if (selectedDropdownOption === "Edit") {
          const { error }: any = await updateBankDetailsRequest({
            payload: {...values,userId:state?.editProfile?._id ?? id},
            id: selectedTableData?._id,
            
          });
    
          if (error) {
            setIsErrorMessage(error?.data?.message)
            return;
          }
        } else {
          const { error }: any = await postOtherInformationRequest({
            payload: { bankDetails: values },
            id: state?.editProfile?._id ?? id
          });
    
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

    const payloadWorkExperience={
      accountUsername:selectedTableData?.accountUsername,
      bankName:selectedTableData?.bankName,
      sortCode:selectedTableData?.sortCode,
      accountNumber:selectedTableData?.accountNumber,
      accountType:selectedTableData?.accountType,
      accountPreference:selectedTableData?.accountPreference
    }
    useEffect(() => {
      form.setFieldsValue(payloadWorkExperience)
     }, [form,payloadWorkExperience])
    const newTabHandler = () => {
        conditionalPath ? handleSelectedStepValue("Declaration") : handleSelectedStepValue('Immunisation');
        setActivePanelKey(conditionalPath ? "Declaration" : 'Medical History')
    }

    const actionDropDowns = [
      {
          dropDownOption: "View",
          key: "1",
          openModals: ()=>{ setIsModalOpen(true);form.resetFields()},
          icon:View,
      },
      {
          dropDownOption: "Edit",
          key: "2",
          openModals: ()=>{ setIsModalOpen(true);form.resetFields()},
          icon:Edit,
      },
     
  ]

  const items:any = actionDropDowns.map((action) => {
    return {
      label: (
        <div >
          <Space size={15} onClick={()=>{setSelectedDropdownOption(action?.dropDownOption);action?.openModals();}}>
            <img src={action.icon} alt={action.dropDownOption} className="d-flex align-center" width={24} height={24} />
            <span className='fw-400 fs-14'>{action.dropDownOption} </span>
          </Space>
        </div>
      ),
      key: action.key,
    }
  })
    
  
    const columns: ColumnsType<IBankDetails> = [
        {
            title: <span className='fw-600 fs-14'>Account User Name</span>,
            dataIndex: 'name',
            key: 'name',
            render: (_, text) =>
                <span className='fs-14 fw-400 title-color'>
                    {text.accountUsername}
                </span>
        },
        {
            title: <span className='fw-600 fs-14'>Name of the Bank</span>,
            dataIndex: 'bankName',
            key: 'bankName',
            render: (_, text) =>
                <span className='fs-14 fw-400 title-color'>
                    {text.bankName}
                </span>
        },
        {
            title: <span className='fw-600 fs-14'>Sort Code</span>,
            dataIndex: 'Sort Code',
            key: 'sortCode',
            render: (_, text) =>

                <span className='fs-14 fw-400 title-color'>
                    {text.sortCode}
                </span>
        },
        {
            title: <span className='fw-600 fs-14'>Account Number</span>,
            dataIndex: 'accountNumber',
            key: 'accountNumber',
            render: (_, text) =>

                <span className='fs-14 fw-400 title-color'>
                    {text.accountNumber}
                </span>
        },
        {
            title: <span className='fw-600 fs-14'>Account Preference</span>,
            dataIndex: 'accountPreference',
            key: 'accountPreference',
            render: (_, text) =>
                <span className='fs-14 fw-400 title-color'>
                    {text.accountPreference}
                </span>
        },
        {
            title: <span className='fw-600 fs-14'>Action</span>,
            dataIndex: 'action',
            key: 'action',
            render: (_, text) =>

                <Dropdown
                    menu={{ items }}
                    placement="bottomRight"
                    trigger={["click"]}
                    className="actionDropDown"
                    overlayStyle={{ width: '150px' }}
                >
                    <div className="border-color cursor-pointer d-flex algin-center  justify-center" onClick={() => handleProfileViewById(text)}>
                        <img src={Dots} alt="edit" />
                    </div>
                </Dropdown>
        },
    ];
    return (
        <div>
            <Row gutter={[20, 20]}>
                <Col xs={24}>
                    <span className='fw-600 fs-20' >Bank Details</span>
                </Col>
                <Col xs={24}>
                    <button className='add-reference-modal-btn cursor-pointer' onClick={showModal}>
                        <Space>
                            <span className='fw-600 fs-14 title-color'>Add Bank Details </span>
                            <img src={AddIcon} alt="AddIcon" className='d-flex align-center' />
                        </Space>
                    </button>
                </Col>


                <Col xs={24}>
                    <Table className='onboading-table-wrapper' loading={isGetLoading} columns={columns} dataSource={profileViewInfoData?.data?.userprofile?.bankDetails} scroll={{ x: "max-content" }} pagination={false} />
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
                            <Button className='edit-module-button bg-orange-color  align-center d-flex '>Save</Button>
                            <Button className='edit-module-button   align-center d-flex btn-secondary' onClick={newTabHandler}  >Continue</Button>
                        </Space>
                    </div>
                </Col>

            </Row>
            <Modal className='personal-form-wrapper' title={<span style={{ fontWeight: "500px", fontSize: "20px" }}> {selectedDropdownOption==="Edit"? "Edit Bank Details": selectedDropdownOption==="View"? "View Bank Details": "Add Bank Details"}</span>} centered open={IsModalOpen} onOk={handleOk} onCancel={handleCancel} width={800} footer={false} closeIcon={<img src={Close} alt="" />}>
                <Form
                    name="basic"
                    initialValues={selectedTableData}
                    onFinish={onFinish}
                    form={form}
                    onFinishFailed={onFinishFailed}
                    // autoComplete="off"
                    layout="vertical"
                >
                    <Row gutter={[30, 5]} align="bottom">
                        <Col xs={24} sm={24} md={12} lg={12} className='carer-form-input '>
                            <Form.Item
                                label="Account User Name"
                                name="accountUsername"

                                rules={[{ required: true, message: 'Required field' }]}
                            >
                                <Input placeholder="Type here" disabled={selectedDropdownOption === "View"} />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={24} md={12} lg={12} className='carer-form-input '>
                            <Form.Item
                                label="Name of the Bank"
                                name="bankName"

                                rules={[{ required: true, message: 'Required field' }]}
                            >
                                <Input placeholder="Type here" disabled={selectedDropdownOption === "View" } />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} className='carer-form-input '>
                            <Form.Item
                                label="Sort Code"
                                name="sortCode"
                                  
                                rules={[{ required: true, message: 'Required field' }]}
                            >
                                <Input placeholder="Type here" disabled={selectedDropdownOption === "View" || selectedDropdownOption === "Edit"} />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={24} md={12} lg={12} className='carer-form-input '>
                            <Form.Item
                                label="Account Number"
                                name="accountNumber"

                                rules={[{ required: true, message: 'Required field' }]}
                            >
                                <Input placeholder="Type here" disabled={selectedDropdownOption === "View" || selectedDropdownOption === "Edit"} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={12} className='carer-form-input '>
                            <Form.Item
                                label="Account Type "
                                name="accountType"
                                rules={[{ required: true, message: 'Required field' }]}
                                className='allocate-select'
                            >
                                <Select placeholder="Selected option" disabled={selectedDropdownOption === "View"} suffixIcon={<img src={Arrow} />}>
                                    <Option value="personal">Personal</Option>
                                    <Option value="business">Business</Option>
                                    <Option value="none">none</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={12} className='carer-form-input '>
                            <Form.Item
                                label="Account Preference "
                                name="accountPreference"
                                rules={[{ required: true, message: 'Required field' }]}
                                className='allocate-select'
                            >
                                <Select placeholder="Selected option" disabled={selectedDropdownOption === "View"} suffixIcon={<img src={Arrow} />}>
                                    <Option value="primary">Primary</Option>
                                    <Option value="secondary">Secondary</Option>
                                    <Option value="none">none</Option>


                                </Select>
                            </Form.Item>
                        </Col>
                        <p style={{ color: "red" }}>{isErrorMessage}</p>
                 {selectedDropdownOption!=="View" &&    <Col xs={24} >
                            <Space className='modal-buttons'>
                                <Button  className='modal-button btn-cancel  ' >Cancel</Button>
                                <Button   type="primary"
                  htmlType="submit"  loading={isPostLoading} className='modal-button btn-secondary' >Save</Button>
                            </Space>
                        </Col>}
                    </Row>
                </Form>
            </Modal>
        </div>
    )
}

export default BankDetails