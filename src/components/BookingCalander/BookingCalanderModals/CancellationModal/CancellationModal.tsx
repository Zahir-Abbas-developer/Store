import { Button, Col, Form, Input, Modal, Row } from "antd";
import Close from '../../../../assets/images/OnBoarding/Close.svg';
import "./Cancellation.scss";

function CancellationModal(props: any) {
  const { isCancellationModalOpen, setIsCancellationModalOpen, handleCancelShift,isLoading,errorMsg,isSuccess, setIsInfoModalOpen } = props

  return (
    <Modal
      centered
      width={890}
      title={<span className="fs-20 fw-600">Cancellation Reason</span>}
      footer={false}
      className="cancellation-modal"
      closeIcon={< img src={Close} alt="close" />}
      open={isCancellationModalOpen}
      onOk={() => { setIsCancellationModalOpen(isSuccess) }}
      onCancel={() => { setIsCancellationModalOpen(false) }}>
      <Form
        layout="vertical"
        onFinish={(values) => { handleCancelShift(values) }}
        onFinishFailed={(errorInfo) => { console.log("Failed:", errorInfo) }}>
        <Row>
          <Col xs={24} style={{ margin: "2rem 0 0 0" }}>
            <Form.Item label="Specify reason for Cancelling Shift" name="textArea" rules={[{ required: true, message: 'Required field' }]}>
              <Input.TextArea placeholder="Staff are not Avaliable" rows={5} />
            </Form.Item>
          </Col>
          {errorMsg && <span style={{color:"red",marginBottom:"10px"}}>{errorMsg}</span>}
          <Col xs={24} className="btn-wrapper d-flex">
            <Button type="primary" className="warning-btn fs-14 fw-600" onClick={() => { setIsCancellationModalOpen(false) }}>Close</Button>
            <Button loading={isLoading} type="primary" className="cancel-btn  fs-14 fw-600" htmlType="submit" >Cancel Shift</Button>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

export default CancellationModal;
