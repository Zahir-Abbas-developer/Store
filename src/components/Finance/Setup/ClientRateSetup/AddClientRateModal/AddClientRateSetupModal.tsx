import { useState } from "react";
import { Button, Col, Form, InputNumber, Modal, Row } from "antd";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { useGetClientsQuery } from "../../../../../store/Slices/Setting/StaffSettings/RegisterationConfiguration";
import { usePostAddClientRateRequestMutation } from "../../../../../store/Slices/FinanceSetup";
import { useGetJobRequestQuery } from "../../../../../store/Slices/Setting/JobRole";
import Close from '../../../../../assets/images/OnBoarding/Close.svg';
import AppSnackbar from "../../../../../utils/AppSnackbar";
import AddClientSelect from "./ClientNameSelect";
import "./AddClientRateSetupModal.scss";



const AddClientRateSetupModal = (props: any) => {
  const { isAddClientRate, setIsAddClientRate } = props;
  const [clientNameCheckedList, setClientNameCheckedList] = useState<CheckboxValueType[]>();
  const [staffCheckedList, setStaffCheckedList] = useState<CheckboxValueType[]>();

  const [form] = Form.useForm(); 
  const { data: clientsData, isSuccess: clientIsSuccess } = useGetClientsQuery({ refetchOnMountOrArgChange: true,query:`page=1&limit=5000&` })
  const { data: staffData, isSuccess: staffIsSuccess } = useGetJobRequestQuery({ refetchOnMountOrArgChange: true })
  const [postAddClientRateRequest] = usePostAddClientRateRequestMutation()

  let clientsNames: any;
  if (clientIsSuccess) {
    clientsNames = clientsData
  }
  let staffCategory: any;
  if (staffIsSuccess) {
    staffCategory = staffData
  }

  const clientsNameOptions: any = clientsNames?.data?.result?.map((item: any) => ({
    key: item?._id,
    label: item?.clientName,
    value: item?._id
  }))
  const staffCategoryOptions: any = staffCategory?.data?.result?.map((item: any) => ({
    key: item?._id,
    label: item?.shortForm,
    value: item?._id
  }))
  console.log(clientNameCheckedList);

  const onFinish = async (values: any) => {
    const payload = {
      ...values,
      careHomeId: clientNameCheckedList?.map((item: any) => item?.value),
      categoryId: staffCheckedList?.map((item: any) => item?.value),
      rateType: "client_rate"
    }
    const { data: addTicketData, error: addTicketError }: any = await postAddClientRateRequest({ payload })
    if (addTicketData) {
      AppSnackbar({ type: "success", message: "Added Successfully" });
    }
    if (addTicketError) {
      AppSnackbar({ type: "error", message: "Not Added Successfully" });
    }
    setIsAddClientRate(false);
    form.resetFields();
  };

  return (
    <Modal
      title={<span className="fs-16 fw-500">Add Client Rate</span>}
      closeIcon={< img src={Close} alt="close-icon" />}
      open={isAddClientRate}
      onCancel={() => setIsAddClientRate(false)}
      className="add-client-modal-main"
      centered
      footer={false}
      width={717}
    >
      <Form layout="vertical" onFinish={onFinish} form={form} style={{ marginTop: '1rem' }}>
        <Row gutter={[12, 16]}>
          <Col xs={24} md={12}>
            <Form.Item label={<p className="m-0">Client Name<span style={{ marginLeft: '0.3rem', color: '#FF4D4F' }}>*</span></p>} name="careHomeId">
              <AddClientSelect
                options={clientsNameOptions}
                allCheckOption
                checkedList={clientNameCheckedList}
                setCheckedList={setClientNameCheckedList}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label={<p className="m-0">Staff Category<span style={{ marginLeft: '0.3rem', color: '#FF4D4F' }}>*</span></p>} name="categoryId">
              <AddClientSelect options={staffCategoryOptions} checkedList={staffCheckedList} setCheckedList={setStaffCheckedList} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[12, 16]}>
          <Col xs={24} md={6}>
            <Form.Item rules={[{ required: true, message: "Required field" }]} label="Week Day" name="weekDay">
              <InputNumber min={1} max={12} className="d-flex align-center" style={{ height: "45px", width: '100%', border: '1.5px solid #A0A3BD' }} />
            </Form.Item>
          </Col>
          <Col xs={24} md={6}>
            <Form.Item rules={[{ required: true, message: "Required field" }]} label="Saturday" name="saturday">
              <InputNumber min={1} max={12} className="d-flex align-center" style={{ height: "45px", width: '100%', border: '1.5px solid #A0A3BD' }} />
            </Form.Item>
          </Col>
          <Col xs={24} md={6}>
            <Form.Item rules={[{ required: true, message: "Required field" }]} label="Sunday" name="sunday">
              <InputNumber min={1} max={12} className="d-flex align-center" style={{ height: "45px", width: '100%', border: '1.5px solid #A0A3BD' }} />
            </Form.Item>
          </Col>
          <Col xs={24} md={6}>
            <Form.Item rules={[{ required: true, message: "Required field" }]} label="Bank Holiday" name="bankHoliday">
              <InputNumber min={1} max={12} className="d-flex align-center" style={{ height: "45px", width: '100%', border: '1.5px solid #A0A3BD' }} />
            </Form.Item>
          </Col>
        </Row>
        <div style={{ display: "flex", gap: "10px" }}>
          <Button
            onClick={() => setIsAddClientRate(false)}
            style={{ backgroundColor: "#4E132C", padding: "10px 30px", color: "white", borderRadius: 0, height: "46px" }}
          >
            Cancel
          </Button>
          <Button htmlType="submit"
            style={{ backgroundColor: "#65CDF0", padding: "10px 30px", color: "white", borderRadius: 0, height: "46px" }}
          >
            Save
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default AddClientRateSetupModal;
