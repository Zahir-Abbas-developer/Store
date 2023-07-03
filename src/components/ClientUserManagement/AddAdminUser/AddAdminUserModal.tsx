import { Form, Modal, Row, Col, Button } from 'antd';
import SelectWrapper from '../../../shared/SelectWrapper/SelectWrapper';
import InputWrapper from '../../../shared/InputWrapper/InputWrapper';
import { useAddClientUserMutation, useUpdateClientUserMutation } from '../../../store/Slices/UserManagement';
import { useGetShiftDepartmentQuery } from '../../../store/Slices/ClientShiftManage';
import '../../ClientUserManagement/ClientUserManagement.scss';
import AppSnackbar from '../../../utils/AppSnackbar';

const AddAdminUserModal = (props: any) => {
  const { actionType, userData, addUserModalOpen, setAddUserModalOpen, setUserData } = props;
  const [form] = Form.useForm();
  const { data: departmentValue } = useGetShiftDepartmentQuery({});
  const [addAdminUser] = useAddClientUserMutation();
  const [updateAdminUser] = useUpdateClientUserMutation();

  const departmentListOptions = departmentValue?.data?.map((userTypeDetails: any, i: number) => {
    return { key: `${i}`, value: userTypeDetails?._id, label: userTypeDetails?.name, }
  })


  if (actionType === 'edit') {
    form.setFieldsValue({ firstName: userData?.firstName });
    form.setFieldsValue({ lastName: userData?.lastName });
    form.setFieldsValue({ phone: userData?.phone });
    form.setFieldsValue({ email: userData?.email });
    form.setFieldsValue({ type: userData?.type });
    form.setFieldsValue({ department: userData?.department?._id });
  }


  const handleAddUser = async (values: any) => {
    const updateValues: any = {
      firstName: values.firstName,
      lastName: values.lastName,
      phone: values.phone,
      type: values.type,
      department: values.department
    }
    try {
      if (actionType === 'add') {
        await addAdminUser(values).unwrap();
        AppSnackbar({ type: "success", messageHeading: "Successfully Added!", message: "Information added successfully" });

      } else if (actionType === 'edit') {
        await updateAdminUser({ payload: updateValues, id: userData?._id }).unwrap();
        AppSnackbar({ type: "success", messageHeading: "Successfully Updated!", message: "Information updated successfully" });

      }
      handleFormClear();

    } catch (error: any) {
      AppSnackbar({
        type: "error",
        messageHeading: "Error",
        message: error?.data?.message ?? "Something went wrong!",
      });
    }



  }

  // const initialValues = {
  //   firstName: userData?.firstName,
  //   lastName: userData?.lastName,
  //   phone: userData?.phone,
  //   type: userData?.type,
  //   department: userData?.department?.name
  // }



  const handleFormClear = () => {
    setAddUserModalOpen(false);
    form.resetFields();
    setUserData({})
  }



  return (
    <>
      <Modal title={`${actionType === 'add' ? "Add" : "Edit"} Admin Details`} open={addUserModalOpen} onCancel={() => handleFormClear()} footer={false} centered className='client-user-managment-modal' width={800} maskClosable={false}>
        <div className='care-booking-content'>
          <div className='cancel-shift-modal-content'>
            <Form layout="vertical" onFinish={handleAddUser} form={form}>
              <Row gutter={[30, 20]} align="middle">
                <Col xl={12} lg={12} md={12} sm={24} xs={24} className="request-shift-fields">
                  <InputWrapper
                    label='First Name'
                    name="firstName"
                    placeHolder='Type here'
                    required={true}
                  />
                </Col>
                <Col xl={12} lg={12} md={12} sm={24} xs={24} className="request-shift-fields">
                  <InputWrapper
                    label='Last Name'
                    name="lastName"
                    placeHolder='Type here'
                    required={true}
                  />
                </Col>
                <Col xl={12} lg={12} md={12} sm={24} xs={24} className="request-shift-fields">
                  <InputWrapper
                    label='Phone No.'
                    name="phone"
                    type='text'
                    placeHolder='Type here'
                    required={true}
                  />
                </Col>
                <Col xl={12} lg={12} md={12} sm={24} xs={24} className="request-shift-fields">
                  <InputWrapper
                    label='Email ID'
                    name="email"
                    placeHolder='Type here'
                    required={true}
                    disabled={actionType === 'edit' && true}
                    type="email"
                  />
                </Col>
                <Col xl={12} lg={12} md={12} sm={24} xs={24} className="request-shift-fields">
                  <InputWrapper
                    name="type"
                    label="Admin Type"
                    placeHolder='Type here'
                    required={true}
                  />
                </Col>
                <Col xl={12} lg={12} md={12} sm={24} xs={24} className="request-shift-fields">
                  <SelectWrapper
                    label="Department"
                    name="department"
                    required={true}
                    placeHolder="Selected Option"
                    options={departmentListOptions}
                  />
                </Col>
              </Row>
              <div className="request-shift-btn d-flex align-center">
                <Button type='primary' className='cancel-btn' onClick={() => handleFormClear()}>Cancel</Button>
                <Button type='primary' htmlType='submit'>{`${actionType === 'add' ? "Save" : "Update"}`}</Button>
              </div>
            </Form>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default AddAdminUserModal