import {  Button, Col, Form, Modal, Row, Space } from 'antd';
import InputWrapper from '../../../../../shared/InputWrapper/InputWrapper';
import TextArea from 'antd/es/input/TextArea';
import './AddModal.scss'
import DatePickerWrapper from '../../../../../shared/DatePickerWrapper/DatePickerWrapper';
import { usePutWhistleBlowingRemarksReportsMutation } from '../../../../../store/Slices/Reports';
import dayjs from 'dayjs';

const AddRemarksModal = ({id,isAddOpenRemarksModal,setIsAddOpenRemarksModal,selectedRowRecord}:any) => {

 const [putWhistleBlowingRemarksReports]=usePutWhistleBlowingRemarksReportsMutation()
 const [form] = Form.useForm();
 const onFinish=(values:any)=>{
 
 values && putWhistleBlowingRemarksReports({id:id, payload:values})
 form.resetFields()
  setIsAddOpenRemarksModal(false);
 }
  // const handleOk = () => {

  //   setIsAddOpenRemarksModal(false);
  // };

  const handleCancel = () => {
    setIsAddOpenRemarksModal(false);
  };
  const onFinishFailed = (errorInfo: any) => console.log('Failed:', errorInfo);
  return (
    <>
     
      <Modal title="Meeting" className='candidate-modal' open={isAddOpenRemarksModal} width={800}  onCancel={handleCancel}>
      <Form   name="basic"
 
          onFinish={onFinish}
           form={form}
           onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical">
       
            <Row gutter={[20, 20]} align="bottom">

               <Col xs={24} sm={24} md={12} lg={12} style={{ marginBottom: "0px" }}>
               <Form.Item
                label="Meeting Agenda"
                name="agenda"
                rules={[{ required: true, message: 'Required field' }]}
              >
                <InputWrapper      name="agenda"  placeHolder="Enter here"
                
                   />
                    </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} style={{ marginBottom: "0px" }}>
              <Form.Item
                label="Meeting Minutes"
                name="minutes"
                rules={[{ required: true, message: 'Required field' }]}
              >
                <InputWrapper     name="minutes"      placeHolder="Enter here"
                   />
                   </Form.Item>
              </Col>

              <Col xs={24} sm={24} md={24} lg={24} style={{ marginBottom: "0px" }}>
                <DatePickerWrapper disabledDate={(current:any)=> {return current && current<  dayjs(selectedRowRecord?.dateOfOccurance)}}  name='date' label='Meeting Date' required={true} placeholder='yyyy/mm/dd'
                   />
              </Col>

              <Col xs={24} sm={24} md={24} lg={24}>
                <Form.Item
                  label="Meeting Outcome"
                  name="outcome"
                  rules={[{ required: true, message: 'Required field' }]}
                >
                  <TextArea rows={4} placeholder='Reason'  />
                </Form.Item>
              </Col>
              <Col span={24}>
              <Space size={12} className='modal-buttons'>

                <Button onClick={handleCancel} className="modal-button btn-cancel ">Cancel</Button>
                <Button type="primary"
                  htmlType="submit"  className="modal-button btn-secondary ">Save</Button>
              </Space>
            </Col>
            </Row>
          

        </Form>
      </Modal>
    </>
  );
};

export default AddRemarksModal;