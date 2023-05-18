import { Form, Modal, Row, Col, Button } from 'antd';
import InputWrapper from '../../../shared/InputWrapper/InputWrapper';
import '../../ClientUserManagement/ClientUserManagement.scss'
import dayjs from 'dayjs';

const ViewUserDetailsModal = (props: any) => {
    const { viewUserDetailsModal, setViewUserDetailsModal, userData } = props;
    const [form] = Form.useForm();
    const onFinish = () => { }
    return (
        <>
            <Modal title="Admin Details" open={viewUserDetailsModal} onCancel={() => setViewUserDetailsModal(false)} footer={false} centered className='client-user-managment-modal' width={800}>
                <div className='care-booking-content'>
                    <div className='cancel-shift-modal-content'>
                        <Form layout="vertical" onFinish={onFinish} form={form}>
                        <Row gutter={[30, 20]} align="middle">
                                <Col xl={12} lg={12} md={12} sm={24} xs={24} className="request-shift-fields">
                                    <InputWrapper
                                        label='First Name'
                                        name="searchClients"
                                        disabled={true}
                                        defaultValue={`${userData?.firstName}`}
                                    />
                                </Col>
                                <Col xl={12} lg={12} md={12} sm={24} xs={24} className="request-shift-fields">
                                    <InputWrapper
                                        label='Last Name'
                                        name="searchClients"
                                        disabled={true}
                                        defaultValue={`${userData?.lastName}`}
                                    />
                                </Col>
                                <Col xl={12} lg={12} md={12} sm={24} xs={24} className="request-shift-fields">
                                    <InputWrapper
                                        label='Phone No.'
                                        name="searchClients"
                                        disabled={true}
                                        defaultValue={`${userData?.phone}`}
                                    />
                                </Col>
                                <Col xl={12} lg={12} md={12} sm={24} xs={24} className="request-shift-fields">
                                    <InputWrapper
                                        label='Email ID'
                                        name="searchClients"
                                        disabled={true}
                                        defaultValue={`${userData?.email}`}
                                    />
                                </Col>
                                <Col xl={12} lg={12} md={12} sm={24} xs={24} className="request-shift-fields">
                                    <InputWrapper
                                        label='Admin Type'
                                        name="searchClients"
                                        disabled={true}
                                        defaultValue={`${userData?.type}`}
                                    />
                                </Col>
                                <Col xl={12} lg={12} md={12} sm={24} xs={24} className="request-shift-fields">
                                    <InputWrapper
                                        label='Department'
                                        name="searchClients"
                                        disabled={true}
                                        defaultValue={`${userData?.department?.name}`}
                                    />
                                </Col>
                                <Col xl={12} lg={12} md={12} sm={24} xs={24} className="request-shift-fields">
                                    <InputWrapper
                                        label='Date of Joining'
                                        name="searchClients"
                                        disabled={true}
                                        defaultValue={`${dayjs(userData.createdAt).format('DD-MM-YYYY')}`}
                                    />
                                </Col>
                                
                            </Row>
                            <div className="request-shift-btn d-flex align-center">
                                <Button type='primary' className='cancel-btn' onClick={() => setViewUserDetailsModal(false)}>Cancel</Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default ViewUserDetailsModal