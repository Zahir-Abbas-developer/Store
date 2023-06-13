import { InfoCircleOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Select, Tooltip } from "antd";
import arrowDown from "../../../../assets/icons/arrow-down-icon.svg"
import "./BussinessDetials.scss";
import "../../../../sass/common.scss";
import { usePostKeyInfoMutation } from "../../../../store/Slices/Setting/KeyInfo";
import AppSnackbar from "../../../../utils/AppSnackbar";
import { data } from "../../../../mock/SettingJobRole.ts";

const BussinessDetials = () => {

  const [postKeyInfo] = usePostKeyInfoMutation();



  const [form] = Form.useForm();

  const onFinish = (payload: any) => {

    console.log("payload C_+++++++++++", { payload });
    // const { data }: any = postKeyInfo({
    //   payload,
    // });
    postKeyInfo({
      payload,
    });
    // console.log("Key Info API ======>:", data);

    AppSnackbar({ type: "success", messageHeading: "Success!", message: "Key Info Created Successfully" });
  };

  return (
    <div className="setting-bussiness-detials">
      <div className="heading">
        <h1 className="fs-20 fw-500">Business Details
          <Tooltip placement="bottomLeft" color="#65CDF0" title="Agency's customer support number (for tap to 'Call' feature on mobile apps).">
            <InfoCircleOutlined />
          </Tooltip>

        </h1>
      </div>
      <Form layout="vertical" onFinish={onFinish} form={form}>

        <Row gutter={14} className="dateTime">
          <Col xs={24} md={12} lg={10}>
            <Form.Item name="BusinessName" rules={[{ required: false, message: "Required field" }]} label={"Business Name"} className="mb-10">
              <Input className="input-field" placeholder="Solace Leather" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={10}>
            <Form.Item name="supportNumber" rules={[{ required: false, message: "Required field" }]} label={"Support number"} className="mb-10">
              <Input className="input-field" placeholder="00735257829" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={14} className="dateTime">
          <Col xs={24} md={12} lg={10}>
            <Form.Item name="country" rules={[{ required: false, message: "Required field" }]} label={"Country"} className="mb-10">
              <Select
                suffixIcon={<img src={arrowDown} />}
                placeholder="Slough"
                options={[
                  { value: 'Conutry 1', label: 'Conutry 1' },
                  { value: 'Country 2', label: 'Country 2' },
                ]}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={10}>
            <Form.Item name="county" rules={[{ required: false, message: "Required field" }]} label={"County"} className="mb-10">
              <Select
                suffixIcon={<img src={arrowDown} />}
                placeholder="Slough"
                options={[
                  { value: 'County 1', label: 'County 1' },
                  { value: 'County 2', label: 'County 2' },
                ]}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={14} className="dateTime">
          <Col xs={24} md={12} lg={10}>
            <Form.Item name="towncity" rules={[{ required: false, message: "Required field" }]} label={"Town/City"} >
              <Select
                suffixIcon={<img src={arrowDown} />}
                placeholder="Slough"
                options={[
                  { value: 'City 1', label: 'City 1' },
                  { value: 'City 2', label: 'City 2' },
                ]}
              />
            </Form.Item>

          </Col>
          <Col xs={24} md={12} lg={10}>
            <Form.Item name="postCode" rules={[{ required: false, message: "Required field" }]} label={"Post Code"} className="mb-10">
              <Input className="input-field" placeholder="SLF BH2" />
            </Form.Item>
          </Col>

        </Row>

        <Row gutter={14} className="dateTime">
          <Col xs={24} md={12} lg={10}>
            <Form.Item name="address1" rules={[{ required: false, message: "Required field" }]} label={"Address 1"} className="mb-10">
              <Input className="input-field" placeholder="Unit 25,The Business Village" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={10}>
            <Form.Item name="address2" rules={[{ required: false, message: "Required field" }]} label={"Address 2"} className="mb-10">
              <Input className="input-field" placeholder="Unit 25,The Business Village" />
            </Form.Item>
          </Col>
        </Row>

        <Col md={24} style={{ display: "flex" }}>
          <Form.Item>

            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Col>
      </Form>



    </div>


  )
}

export default BussinessDetials