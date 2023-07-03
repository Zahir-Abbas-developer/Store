

import { Button, Col, Dropdown, Form, Input, Modal, Row, Select, Space, Switch, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import './FormMain.scss'
import Arrow from '../../../../../assets/images/OnBoarding/arrow.svg';
import Close from '../../../../../assets/images/OnBoarding/Close.svg';
import AddIcon from '../../../../../assets/images/OnBoarding/addIcon.svg'
import infoIcon from "../../../../../assets/icons/info-icon.svg";
import { Option } from '../../../CareCordinator/ClientDetails/AllocateNewCareHomeModal';
import Dots from '../../../../../assets/images/OnBoarding/dots.png';
import Edit from '../../../../../assets/icons/OnBoarding/edit.svg';

import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {  ICandidateReference, } from '../../../../../mock/OnBoarding';
import DeleteModal from '../../../../../shared/DeleteModal/DeleteModal';
import { useLocation } from 'react-router-dom';
import { useDeleteReferenceRequestMutation, useGetReferenceRequestQuery, usePostReferenceRequestMutation, useUpdateReferenceRequestMutation, useUpdateReferenceStatusRequestMutation } from '../../../../../store/Slices/References';
import dayjs from 'dayjs';



const Refrences = (props: any) => {
    const { handleSelectedStepValue, setActivePanelKey, auditCheck } = props;
    const [IsModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModal, setIsDeleteModal] = useState(false);
    const [selectedTableRowDataId, setSelectedTableRowDataId] = useState("")
    const [selectedDropdownOption ,setSelectedDropdownOption]=useState("")
    const [isErrorMessage, setIsErrorMessage] = useState(false);   
    const [selectedRowData ,setSelectedRowData]=useState<any>({})
    const [isAudited, setIsAudited]=useState(false)
    const { state }: any = useLocation()
    const [form] = Form.useForm();
    const userData: any = localStorage.getItem("careUserData")
    const {id,role}: any = JSON.parse(userData);
    const [postReferenceRequest] = usePostReferenceRequestMutation()
    const [updateReferenceRequest]=useUpdateReferenceRequestMutation()
    const { data,  isSuccess } = useGetReferenceRequestQuery({id:state?.editProfile?._id ??id})
    const [deleteReferenceRequest] = useDeleteReferenceRequestMutation()
    const [updateReferenceStatusRequest]=useUpdateReferenceStatusRequestMutation()


    let referenceTableData: any
    if (isSuccess) {
        referenceTableData = data
    }
    const handleReferenceRowData = (record: any) => {
        setSelectedRowData(record)
        setSelectedTableRowDataId(record?._id)
    }
    const handleDeleteSubmit = () => {

        setIsDeleteModal(false);
    };
    const handleCancelSubmit = () => {
        deleteReferenceRequest(selectedTableRowDataId)
        setIsDeleteModal(false);
    };

    const showModal = () => {
        setIsModalOpen(true);
        
    };

    const handleOk = () => {
        setIsModalOpen(false);
        
    };
    const defaultValues={ 
        refType:selectedRowData?.refType,
        refFullName:selectedRowData?.refFullName,
        refContact:selectedRowData?.refContact,

    }
    useEffect(() => {
        form.setFieldsValue(defaultValues)
       }, [form, defaultValues])

    const handleCancel = () => {
        setIsModalOpen(false);
        setSelectedRowData({})
    };
const handleChangeStatus=(value:any ,text:any)=>{

  updateReferenceStatusRequest({ id:text?._id, payload:{"approvalStatus":value,"refCompletedOn":text?.createdAt}})
}

const onFinish = async (values: any) => {
  try {
    if (selectedDropdownOption === "Edit") {
      const { error }: any = await updateReferenceRequest({ id: selectedRowData._id , payload: { ...values, refRequest: true, approvalStatus: "PENDING" } })

      if (error) {
        // handle the error here
        setIsErrorMessage(error?.data?.message)
        return;
      }
    } else {
      const { error }: any = await postReferenceRequest({ id: state?.editProfile?._id ??id, payload: { ...values, refRequest: true, approvalStatus: "PENDING" } })

      if (error) {
        // handle the error here
        setIsErrorMessage(error?.data?.message)
        return;
      }
    }

    setSelectedRowData({});
    setIsModalOpen(false);
  } catch (error) {
    // handle any unexpected errors here
    console.log("Unexpected error:", error);
  }
};
 

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
 
    const actionDropDowns = [
       
        {
            dropDownOption: "Edit",
            key: "2",
            openModals: ()=>{ setIsModalOpen(true)},
            icon:Edit,
        },
       
    ]
    const items = actionDropDowns.map((action) => {
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

    const columns: ColumnsType<ICandidateReference> = [
        {
            title: <span >Reference Type</span>,
            dataIndex: 'Reference Type ',
            key: 'refType',
            width: 100,
            render: (_, text) =>
                <span className='fs-14 fw-400 title-color'>
                    {text.refType}
                </span>
        },
        {
            title: <span>Full name of the referee </span>,
            dataIndex: 'fullName',
            key: 'refFullName',
            width: 130,
            render: (_, text) =>
                <Space >
                    <span className='fs-14 fw-400 title-color'>
                        {text.refFullName}
                    </span>
                </Space>,
        },
        {
            title: <span >Contact No. of the referee</span>,
            dataIndex: 'contactNo ',
            key: 'contactNo',
            width: 130,
            render: (_, text) =>
                <div >
                    <span className='fs-14 fw-400 title-color'>
                        {text.refContact}
                    </span>
                </div>
        },
        {
            title: 'Email ID of the referee',
            dataIndex: 'email',
            key: 'email',
            width: 130,
            render: (_, text) =>

                <span className='fs-14 fw-400 title-color'>
                    {text.refEmail}
                </span>
        },
        {
            title: 'Approval Status',
            dataIndex: 'approvalStatus',
            key: 'approvalStatus',
            width: 100,
            render: (_, text:any) =>
                <div>
                    <Select
                        defaultValue={text?.approvalStatus ?text?.approvalStatus :"Select Category"}
                        className="select-onboarding"
                        style={{ width: "170px" }}
                        onChange={(value:any)=>handleChangeStatus(value,text)}
                        suffixIcon={<img src={Arrow} />}
                        options={[
                            { value: 'PENDING', label: 'Pending' },
                            { value: 'SUCCESS', label: 'Success' },
                            { value: 'REJECTED', label: 'Rejected' },
                        ]}
                    />
                </div>
        },
        {
            title: <span>Ref. completed on </span>,
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: 130,
            render: (_, text) =>
                <Space >
                    <span className='fs-14 fw-400 title-color'>
                        { dayjs(text.createdAt).format("DD-MM-YYYY")}
                    </span>
                </Space>
        },
        {
            title: "Action",
            dataIndex: "action",
            key: "action",
            width: 100,

            render: (_: any, record: any) => (
                <Dropdown
                    menu={{ items }}
                    placement="bottomRight"
                    trigger={["click"]}
                    className="actionDropDown"
                    overlayStyle={{ width: '150px' }}
                >
                    <div className="border-color cursor-pointer d-flex algin-center  justify-center" onClick={() => handleReferenceRowData(record)}>
                        <img src={Dots} alt="menu" />
                    </div>
                </Dropdown>
            ),
        },
    ];

    return (
        <div >

            <Row gutter={[20, 20]}>
                <Col xs={24}>
                    <Space>
                        <div className='tooltip-text'>
                            <span className='fw-600 fs-20 inner-text' >Add Reference</span>
                            &nbsp;
                            <span className='fw-600 fs-14'>
                                (Framework Ready Reference Multi )
                            </span>
                        </div>
                        <Tooltip placement="bottomLeft" color="#65CDF0" overlayInnerStyle={{
                            width: "499px",
                        }} title="The  candidate is asked to collect references by clicking on Email or Whastapp button while they register. 2 references in total are taken in general but you can change this from Settings > Staff Settings > Reference Settings.">
                            <img src={infoIcon} alt="infoIcon" className='d-flex align-center' />
                        </Tooltip>
                    </Space>
                </Col>
                <Col xs={24}>
                    <button className='add-reference-modal-btn' onClick={()=>{showModal();setSelectedDropdownOption("Add")}}>
                        <Space >
                            <span className='fw-600 fs-14 title-color'> Add Reference </span>
                            <img src={AddIcon} alt="AddIcon" className='d-flex align-center' />
                        </Space>
                    </button>
                </Col>


                <Col xs={24}>
                    <Space>
                        <div className='tooltip-text'>
                            <span className='fw-600 fs-20 inner-text' >Candidate Reference</span>
                            &nbsp;
                            <span className='fw-600 fs-14'>
                                (Framework Ready Reference Multi )
                            </span>
                        </div>
                        <Tooltip placement="bottomLeft" color="#65CDF0" overlayInnerStyle={{
                            width: "499px",
                        }} title="Here you can see the status of all the references. When the system receives references, they will appear here. If the status is still “Awaiting”, please resend the reference request from the previous section.">
                            <img src={infoIcon} alt="infoIcon" className='d-flex align-center' />
                        </Tooltip>
                    </Space>
                </Col>

                <Col xs={24} className='onboading-table-wrapper'>
                     <Table columns={columns} dataSource={referenceTableData?.data} scroll={{ x: "max-content" }} pagination={{ pageSize: 7 }} />

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

                                <Button className='edit-module-button  audit-button  align-center d-flex' onClick={()=>setIsAudited(true)} >Audit</Button>
                            </Tooltip>}
                            <Button className='edit-module-button bg-orange-color  align-center d-flex '>Save</Button>
                            <Button className='edit-module-button   align-center d-flex btn-secondary' onClick={() => { handleSelectedStepValue('Training Certificate'); setActivePanelKey('Training & Work History') }}  >Continue</Button>
                        </Space>
                    </div>
                </Col>
            </Row>
          
            <Modal className='personal-form-wrapper' title={<span style={{ fontWeight: "500px", fontSize: "20px" }}> {selectedDropdownOption=="Add" ?   "Add Reference":"Edit Reference"}</span>} centered open={IsModalOpen} onOk={handleOk}    onCancel={handleCancel} width={800} footer={false} closeIcon={<img src={Close} alt="" />}>
                <Form
                    name="basic"
                   form={form}
                    initialValues={selectedRowData}
                    onFinish={onFinish}
                  
                    onFinishFailed={onFinishFailed}
                    // autoComplete="off"
                    layout="vertical"
                >

                    <Row gutter={[30, 5]} align="bottom">

                        <Col xs={24} sm={24} md={12} lg={12} className='carer-form-input '>
                            <Form.Item
                                label="Reference Type "
                                name="refType"
                                rules={[{ required: true, message: 'Required field' }]}
                                className='allocate-select'
                            >
                                <Select placeholder="Selected option" suffixIcon={<img src={Arrow} />}>
                                    <Option value="Character">Character</Option>
                                    <Option value="Employeement">Employeement</Option>
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={24} md={12} lg={12} className='carer-form-input '>
                            <Form.Item
                                label="Full name of the referee"
                                name="refFullName"

                                rules={[{ required: true, message: 'Required field' }]}
                            >
                                <Input placeholder="Type here" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} className='carer-form-input '>
                            <Form.Item
                                label="Contact nummber of the referee"
                                name="refContact"
                                rules={[{ required: true, message: 'Required field' }]}
                            >
                                <Input placeholder="Type here" />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={24} md={12} lg={12} className='carer-form-input '>
                            <Form.Item
                                label="Email ID of the referee"
                                name="refEmail"
                                rules={[
                                    { required: true, message: 'Required field' },
                                    { validator: emailValidator },]}

                            >
                                <Input placeholder="Type here" />
                            </Form.Item>
                        </Col>

                        <Col xs={24} >
                            <Form.Item name="switch" label="" >
                                <Space>

                                    <Switch />
                                    <span className='fw-600 fs-14 label-color'>Can we request reference from this contact now?</span>
                                </Space>
                               
                            </Form.Item>
                        </Col>
                        <p style={{ color: "red" }}>{isErrorMessage}</p>
                        <Col xs={24} >
                        <Form.Item name="switch" label="" >
                            <Space className='modal-buttons'>
                                <Button className='modal-button btn-cancel  '>Cancel</Button>
                                <Button className='modal-button btn-secondary' htmlType='submit' >Save</Button>
                            </Space>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>


            <DeleteModal
                setDeleteModal={setIsDeleteModal}
                deleteModal={isDeleteModal}
                submitTitle='Cancel'

                cancelTitle='Delete'
                title='Do you want to delete this row'
                onSubmit={handleDeleteSubmit}
                onCancel={handleCancelSubmit}
            />


        </div>

    )
}

export default Refrences