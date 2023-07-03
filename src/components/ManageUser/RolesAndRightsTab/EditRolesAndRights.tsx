import {
  Button,
  Card,
  Col,
  Collapse,
  Form,
  Input,
  Row,
  Select,
  Space,
} from "antd";
import { useEffect, useState } from "react";
import { Checkbox } from "antd";
import { v4 as uuidv4 } from "uuid";
import RolesandRightsArrow from "../../../assets/icons/ManageUser/roles-and-rights-arrow.svg";
import SearchIcon from "../../../assets/images/OnBoarding/Search.svg";
import "./RolesAndRightsTabs.scss";
import "../../../sass/common.scss";
import dayjs from "dayjs";
import SelectWrapper from "../../../shared/SelectWrapper/SelectWrapper";
import arrowDownSmall from "../../../assets/icons/ShiftManger/down-arrow-icon.png";
import {
  usePostUserRightsMutation,
  usePutUserRightsMutation,
} from "../../../store/Slices/ManageUser";
const { Panel } = Collapse;

const EditRolesAndRights = ({
  setIsEditRole,
  permissions,
  id,
  name,
  ManageUser,
  tableRowRecord,
  ResetToDefaultSuccessHandler,
  type,
}: any) => {
  const permissionsValues = tableRowRecord?.permissions.map((ele: any) => {
    return {
      name: ele.name,
      types: ele.types,
    };
  });
  console.log(permissionsValues, "permissionsValues");

  const [checkedValues, setCheckedValues] = useState<any[]>(
    type === "add" ? [] : permissionsValues || []
  );
  const handleOk = () => {
    setIsEditRole(false);
  };

  const [form] = Form.useForm();
  const [postUserRights] = usePostUserRightsMutation();
  const [putUserRights] = usePutUserRightsMutation();

  const handleFinish = (values: any) => {
    const formValues = {
      name: values?.name,
      roleId: id,
      assignedTo: values?.assignedTo,
      permissions: checkedValues,
    };

    if (type === "add") {
      postUserRights({ payload: formValues });
      setIsEditRole(false);
    } else {
      putUserRights({
        payload: { permissions: checkedValues },
        id: tableRowRecord._id,
      });
      setIsEditRole(false);
    }
  };

  const handleChange = ({ ele, typeName, types }: any) => {
    if (typeName === "Parent") {
      let exists = checkedValues.some((item: any) => item?.name === ele);
      if (exists) {
        setCheckedValues(checkedValues.filter((val: any) => val?.name !== ele));
      } else {
        setCheckedValues([...checkedValues, { name: ele, types: [types] }]);
      }
    } else {
      let permissionIndex = checkedValues?.findIndex(
        (item: any) => item?.name === ele
      );
      if (permissionIndex !== -1) {
        let updatedPermissions: any[] = [...checkedValues]; // create a new array
        let typesIndex =
          updatedPermissions[permissionIndex].types?.indexOf(types);
        if (typesIndex !== -1) {
          updatedPermissions[permissionIndex].types = updatedPermissions[
            permissionIndex
          ].types.filter((type: any) => type !== types); // remove types value from array
        } else {
          updatedPermissions[permissionIndex].types = [
            ...updatedPermissions[permissionIndex].types,
            types,
          ]; // add types value to array
        }
        setCheckedValues(updatedPermissions);
      }
    }
  };
  return (
    <Form
      form={form}
      onFinish={handleFinish}
      initialValues={{
        userType: name,

        assignedTo:
          type === "add"
            ? null
            : tableRowRecord?.assignedUser?.firstName +
              " " +
              tableRowRecord?.assignedUser?.lastName,

        name: type === "add" ? null : tableRowRecord?.name,
      }}
      style={{ padding: "24px" }}
    >
      <Row gutter={[30, 30]}>
        <Col
          xxl={6}
          xl={24}
          md={24}
          xs={24}
          sm={24}
          lg={24}
          className="onBoarding-input"
        >
          <label className=" fw-600 fs-14" style={{ color: "#6E7191" }}>
            Role Title
          </label>
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Required field" }]}
          >
            {/* <Input placeholder="Type here" /> */}
            <Input
              placeholder="Type here"
              disabled={type === "add" ? false : true}
            />
          </Form.Item>
        </Col>
        <Col xxl={6} xl={24} md={24} xs={24} sm={24} lg={24}>
          <label className=" fw-600 fs-14" style={{ color: "#6E7191" }}>
            User Name
          </label>
          <Form.Item
            name="assignedTo"
            rules={[{ required: true, message: "Required field" }]}
          >
            <Select
              suffixIcon={<img src={arrowDownSmall} alt="down-arrow" />}
              className="onBoarding-select"
              style={{ width: "100%" }}
              placeholder="Select User Name"
              disabled={type === "add" ? false : true}
            >
              {ManageUser?.data?.result?.map((text: any) => (
                <option value={text?._id}>
                  {text?.firstName &&
                    text?.lastName &&
                    text?.firstName + " " + text?.lastName}
                  {text?.clientName && text?.clientName}
                </option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col xxl={6} xl={24} md={24} xs={24} sm={24} lg={24}>
          <label className=" fw-600 fs-14" style={{ color: "#6E7191" }}>
            User Type
          </label>
          <Form.Item
            name="userType"
            rules={[{ required: true, message: "Required field" }]}
          >
            {/* <SelectWrapper
              disabled={true}
              placeHolder="Selected User Name"
              name="userType"
              size="large"
            /> */}
            <Input placeholder="Type here" value={name} disabled={true} />
          </Form.Item>
        </Col>
        <Col
          xxl={{ span: 5, offset: 1 }}
          xl={24}
          md={24}
          xs={24}
          sm={24}
          lg={24}
          style={{ paddingBottom: "30px" }}
        >
          <label style={{ color: "white" }}>User Type</label>

          <div className="input-search-wrapper">
            <Input
              placeholder="search"
              prefix={
                <img src={SearchIcon} alt="search icon" className="icon" />
              }
            />
          </div>
        </Col>
      </Row>

      <Card className="roles-and-rights" style={{ padding: "24px" }}>
        <p
          className="fw-500 fs-20 "
          style={{ color: "#4E4B66", marginTop: "0px" }}
        >
          Edit Roles Access Rights
        </p>
        {permissions?.map((parentEle: any, parentIndex: any) => (
          <Row style={{ marginTop: "13px" }} key={uuidv4()}>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Checkbox
                className="edit-roles-rights-checkboxes"
                key={parentEle?.name}
                value={parentEle?.name}
                checked={checkedValues.some(
                  (item: any) => item.name === parentEle.name
                )}
                onChange={() =>
                  handleChange({
                    ele: parentEle?.name,
                    typeName: "Parent",
                    types: parentEle.types[0],
                  })
                }
              >
                <span className="fw-400 fs-14" style={{ color: "#4E4B66" }}>
                  {parentEle?.name}
                </span>
              </Checkbox>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <img
                src={RolesandRightsArrow}
                alt="RolesandRightsArrow"
                width={10}
                height={16}
              />
            </Col>
            {checkedValues.some((item: any) => item.name === parentEle.name) &&
              parentEle.types.map((ele: any, childIndex: any) => (
                <Checkbox
                  className="edit-roles-rights-checkboxes"
                  key={ele}
                  value={ele}
                  checked={checkedValues.some(
                    (item: any) =>
                      item.name === parentEle.name && item.types.includes(ele)
                  )}
                  onChange={() => {
                    handleChange({
                      ele: parentEle?.name,
                      typeName: "child",
                      types: ele,
                    });
                  }}
                >
                  <span className="fw-400 fs-14" style={{ color: "#4E4B66" }}>
                    {ele}
                  </span>
                </Checkbox>
              ))}
          </Row>
        ))}

        <Col span={24} style={{ paddingTop: "76px", paddingBottom: "45px" }}>
          <Space size={12}>
            <Button
              type="primary"
              style={{ backgroundColor: "#FF4D4F" }}
              onClick={() => {
                ResetToDefaultSuccessHandler();
                setIsEditRole(false);
              }}
            >
              Reset To Default Setting
            </Button>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Space>
        </Col>
      </Card>
    </Form>
  );
};
export default EditRolesAndRights;
