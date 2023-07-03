import { useEffect, useState } from 'react';

// Ant Components
import TextArea from 'antd/es/input/TextArea';
import { Modal, Row, Col, Space, Button, Form, Input, } from 'antd'

// Components
import DatePickerWrapper from '../../../../../shared/DatePickerWrapper/DatePickerWrapper';
import InputWrapper from '../../../../../shared/InputWrapper/InputWrapper';
import UploadImage from '../../../../Setting/SettingKeyInfo/UploadImage/UploadImage';

// RTK Hook
import { usePostIncidentReportsMutation } from '../../../../../store/Slices/Reports';





const AddModal = (props: any) => {
  const { IsOpenIncidentAddModal, IsCancelIncidentAddModal, title,incidentRecord  } = props;
  const [certificateId ,setCertificateId]=useState("")
  const [form] = Form.useForm();


  // ====================================== RTK HOOKS ======================================
  const [postIncidentReports] = usePostIncidentReportsMutation();


  // ====================================== Incident Form Failed ======================================
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  const userData: any = localStorage.getItem("careUserData")
  const {roleId ,id}: any = JSON.parse(userData);
  const onFinish = (values: any) => {
    postIncidentReports({payload:{...values,reportedBy:id ,userRole:roleId,document:certificateId}})
    form.resetFields()
    IsCancelIncidentAddModal()
  };


  const uploadCertificateId = (id: any) => {
    setCertificateId(id)
  }


  const handleClearForm = () => {
    form.resetFields();
    IsCancelIncidentAddModal();

  }



  useEffect(() => {
    form.setFieldsValue(incidentRecord)
   }, [form,incidentRecord])


  return (
    // <div className='incident-report-modal-wrapper'>
    <Modal centered
      open={IsOpenIncidentAddModal}
      title={title}
      onCancel={handleClearForm}
      footer={false}
      width={880}
      // style={{height: "100%" ,overflow:"hidden"}}
      wrapClassName='incident-report-modal-wrapper'
      maskClosable={false}
    >
      <div className='incident-report-inner' >
        <Form
          name="basic"
          initialValues={incidentRecord}
          onFinish={onFinish}
          form={form}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <Row gutter={[16, 16]} >
            <Col xs={24} sm={24} md={12} lg={12}>
              <InputWrapper defaultValue={roleId} name='reportedby' label='Reported by' placeHolder='Type here' type='text' disabled={true}
              />
            </Col>

            <Col xs={24} sm={24} md={12} lg={12}>
              <InputWrapper disabled={true} defaultValue={id} name='userRole' label='User Role' placeHolder="Select  option"   />
            </Col>

            <Col xs={24} sm={24} md={12} lg={12} >
              <Form.Item
                label="Nature of Incident"
                name="natureOfIncident"
                rules={[{ required: true, message: 'Required field' }]}
              >
                <Input placeholder='Type here' type='text' disabled={props.disabled} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} >
              <DatePickerWrapper name='dateOfOccurence' label='Date of Occurence' required={true} placeholder='yyyy/mm/dd'
                disabled={props.disabled} />
            </Col>

            <Col xs={24} sm={24} md={12} lg={12}>
              <DatePickerWrapper name='reportedDate' label='Reported Date' required={true} placeholder='yyyy/mm/dd'
                disabled={props.disabled} />

            </Col>
            <Col xs={24} sm={24} md={12} lg={12}>
              <DatePickerWrapper name='reviewDate' label='Review Date' required={true} placeholder='yyyy/mm/dd'
                disabled={props.disabled} />

            </Col>

            <Col xs={24} sm={24} md={12} lg={12}>
              <Form.Item
                label="Details of Incident"
                name="detailOfIncident"
                rules={[{ required: true, message: 'Required field' }]}
              >
                <TextArea rows={4} placeholder='Type here' disabled={props.disabled} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12}>
              <Form.Item
                label="Action Taken"
                name="actionTaken"
                rules={[{ required: true, message: 'Required field' }]}
              >
                <TextArea rows={4} placeholder='Type here' disabled={props.disabled} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12}>
              <Form.Item
                label="Outcome of Incident"
                name="outComeOfIncident"
                rules={[{ required: true, message: 'Required field' }]}
              >
                <TextArea rows={4} placeholder='Type here' disabled={props.disabled} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12}>
              <Form.Item
                label="Follow up Plan"
                name="followUpPlan"
                rules={[{ required: true, message: 'Required field' }]}
              >
                <TextArea rows={4} placeholder='Type here' disabled={props.disabled} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12}>
              <DatePickerWrapper name='closureDate' label='Clousere Date' required={true} placeholder='yyyy/mm/dd'
                disabled={props.disabled} />

            </Col>

            <Col xs={24} sm={24} md={24} lg={24}>
              <Form.Item
                label="Attach Document (if any)"
                name="attachment">
                <UploadImage uploadCertificateId={uploadCertificateId} disabled={props.disabled}  fileUrl={incidentRecord?.fileUrl}/>
              </Form.Item>
            </Col>
          </Row>

          <Col span={24}>
            <Space size={12} className='modal-buttons'>

              <Button onClick={IsCancelIncidentAddModal} className="modal-button btn-cancel " disabled={props.disabled}>Cancel</Button>
              <Button type="primary"
                htmlType="submit" className="modal-button btn-secondary " disabled={props.disabled}>Save</Button>
            </Space>
          </Col>
        </Form>
      </div>
    </Modal>
    // </div>
  )
}

export default AddModal