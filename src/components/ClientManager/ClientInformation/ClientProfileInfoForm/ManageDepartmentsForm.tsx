import { Button, Col, Dropdown, Modal, Row, Space, Table, Tooltip } from 'antd'
import { Form, Input } from 'antd';
import infoIcon from "../../../../assets/icons/info-icon.svg"
import plusIcon from "../../../../assets/icons/plus-icon.svg"
import CloseIcon from "../../../../assets/icons/close-icon.svg"
import threeDots from "../../../../assets/icons/three-dots.svg"
import editIcon from "../../../../assets/icons/edit-outlined-blue.svg"
import deleteIcon from "../../../../assets/icons/delete-icon.svg"
import { useEffect, useState } from 'react';
import TextArea from 'antd/es/input/TextArea';
import "./ClientManagerForm.scss"
import DeleteModal from '../../../../shared/DeleteModal/DeleteModal';
import { usePostManageDepartmentMutation } from '../../../../store/Slices/ClientManager';
import { useGetManageDepartmentQuery } from '../../../../store/Slices/ClientManager';
import { useDeleteManageDepartmentRequestMutation } from '../../../../store/Slices/ClientManager';
import { useLocation } from 'react-router-dom';
import { useForm } from 'antd/es/form/Form';
import AppSnackbar from '../../../../utils/AppSnackbar';




const ManageDepartmentsForm = (props: any) => {

  // use state
  const [manageDepartmentRowRecord, setManageDepartmentRowRecord] = useState<any>({})
  const [isManageDepartmentModal, setIsManageDepartmentModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);

  // for integration
  const [deleteJobRequest] = useDeleteManageDepartmentRequestMutation()
  const { state }: any = useLocation()
  const [form] = useForm()

  const userData: any = localStorage.getItem("careUserData")
  const { username }: any = JSON.parse(userData);
  const { id }: any = JSON.parse(userData);

  // api start
  const { data, isLoading, isSuccess, isError, } = useGetManageDepartmentQuery({ userId: state?.editProfile?._id || id })  // get table data
  const [postManageDepartments] = usePostManageDepartmentMutation();

   // initial values
   const payLoadInitialData = {
    name: manageDepartmentRowRecord?.name,
    description: manageDepartmentRowRecord?.description,
    departmentId: manageDepartmentRowRecord?._id,
  }
  

  // handle start here
  const handleDeleteSubmit = () => {
    deleteJobRequest(manageDepartmentRowRecord._id)
    setIsDeleteModal(false);
  };
  const handleCancelSubmit = () => {
    setIsDeleteModal(false);
  };

  const onFinish = async(values: any) => {
    console.log('Success:', values);
    let userId = state?.editProfile?._id;
    const formValues = {
      name: values.name,
      description: values.description,
      departmentId: manageDepartmentRowRecord?._id,
    }
    // postManageDepartments({ userId: userId ? userId : id, payload: formValues });
    // AppSnackbar({ type: "success", messageHeading: "Success!", message: isEdit? "Manage Departments Edit Successfully":"Manage Departments Added Successfully" });
    


    try {
      const { data, error }: any = await postManageDepartments({ userId: userId ? userId : id, payload: formValues })
      if (error) {
        AppSnackbar({
          type: "error",
          messageHeading: "Error",
          message: error?.data?.message ?? "Something went wrong!"
        });
        return;
      }
      setIsManageDepartmentModal(false)
    setIsEdit(false)
    let stepperChange = () => props.onChildStateChange(props.selectedStepValue + 1);
      setTimeout(stepperChange, 1000);
    }
    catch (error) {
      console.log("Unexpected error:", error);
    }
    AppSnackbar({ type: "success", messageHeading: "Success!", message: isEdit? "Manage Departments Edit Successfully":"Manage Departments Added Successfully" });


  };
 
  
  useEffect(() => {
    form.setFieldsValue(payLoadInitialData)

  }, [isManageDepartmentModal])


  //  get create group
  let getManageDepartment: any;
  if (isLoading) {
    getManageDepartment = <p>Loading...</p>;
  } else if (isSuccess) {
    getManageDepartment = data;
  } else if (isError) {
    getManageDepartment = <p>Error...</p>;
  }






  const items: any = [
    {
      label: (
        <div onClick={() =>{ setIsManageDepartmentModal(true);setIsEdit(true)}} style={{ display: "flex", alignItems: 'center', gap: '10px' }}>
          <img src={editIcon} alt="editIcon" /> Edit
        </div>
      ),
      key: "1",
    },
    {
      label: (
        <div onClick={() => setIsDeleteModal(true)} style={{ display: "flex", alignItems: 'center', gap: '10px' }}>
          <img src={deleteIcon} alt="editIcon" /> Delete
        </div>
      ),
      key: "2",
    },
  ];

  

  const columns = [
    {
      title: "Sr. No",
      dataIndex: "sNo",
      key: "sNo",
      width: "170px",
      render: (text: any, record: any, index: any) => index + 1,
    },
    {
      title: 'Department Name',
      dataIndex: 'name',
      key: 'name',
      width: "320px",
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: "360px",
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      key: 'action',
      render: (_: any, text: any) => (
        <Dropdown
          menu={{ items }}
          placement="bottomRight"
          trigger={["click"]}
          className="actionDropDown"
        >
          <Space>
            <div className="border-color cursor-pointer">
              <img src={threeDots} alt="menu" onClick={() => setManageDepartmentRowRecord(text)} />
            </div>
          </Space>
        </Dropdown>
      ),
    },

  ];


  return (
    <>
      <div className='client-manager-information-form-wrapper'>
        <div className='form-heading heading-flex'>Manage Departments
          <Tooltip
            placement="bottomLeft"
            autoAdjustOverflow={true}
            //   arrow={false}
            showArrow={false}
            color="#65CDF0"
            overlayInnerStyle={{
              backgroundColor: "#65CDF0",
              color: "#ffffff",
              width: "499px",
            }}
            title='You can create a department(For example Ward, A-Wing etc) within the client. This will give you the ability to manage shifts, rates, users etc specific to the department.'
          >
            <img src={infoIcon} alt="infoIcon" />
          </Tooltip>
        </div>
        <div className="add-department-button form--label">
          <span>Department Name</span> <img onClick={() => {setIsManageDepartmentModal(true);setManageDepartmentRowRecord({})}} src={plusIcon} alt="add" />
        </div>
        <div className="department-table-wrapper">
          {getManageDepartment && <Table dataSource={getManageDepartment?.data} columns={columns} pagination={{ pageSize: 5 }} scroll={{ x: "max-content" }} />}
        </div>
       <Modal
          centered
          title={<div style={{ fontSize: '24px', fontWeight: "500" }}>Manage Departments</div>}
          open={isManageDepartmentModal}
          onCancel={() => setIsManageDepartmentModal(false)}
          wrapClassName="add-department-form"
          footer={false}
          closeIcon={<img src={CloseIcon} alt="" />}>
          <Form
            form={form}
            name="basic"

            onFinish={onFinish}
            // autoComplete="off"
            layout="vertical"
          >
            <Row gutter={[30, 0]} align="bottom">
              <Col xs={24} sm={24} md={12} lg={12}>
                <Form.Item
                  label="Department Name"
                  name="name"
                  rules={[{ required: true, message: 'Required field' }]}
                >
                  <Input placeholder="Enter Department Name" style={{ width: '100%', height: '45px' }} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Enter description here"
                  name="description"
                  rules={[{ required: false, message: 'Required field' }]}
                >
                  <TextArea rows={4} style={{ width: '830px' }} />
                </Form.Item>
              </Col>
            </Row>
            <div className='cus-footer-buttons' style={{ flexWrap: "wrap" }}>
              <Button className='inner-cus-footer-btn btn--cancel' onClick={() => setIsManageDepartmentModal(false)}>Cancel</Button>
              <Button className='inner-cus-footer-btn btn--save' htmlType='submit'>Save</Button>
            </div>
          </Form>
        </Modal>
        <div className="form-lower-buttons">
          <Button className='inner-button inner-form-buttons-audit'>Audit</Button>
          <Button className='inner-button inner-form-buttons-save'>Save</Button>
          <Button className='inner-button inner-form-buttons-continue' onClick={() => props.onChildStateChange(props.selectedStepValue + 1)}>Continue</Button>
        </div>
      </div>
      <DeleteModal
        setDeleteModal={setIsDeleteModal}
        deleteModal={isDeleteModal}
        submitTitle='Delete'
        cancelTitle='Cancel'
        title='Do you want to delete this ticket'
        onSubmit={handleDeleteSubmit}
        onCancel={handleCancelSubmit}
      />
    </>
  )
}

export default ManageDepartmentsForm