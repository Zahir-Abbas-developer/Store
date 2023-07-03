import { Button, Table, Space, Input, Col, Form, Row, } from "antd";
import { InfoCircleOutlined } from '@ant-design/icons';
import { useState } from "react";
import "./SettingResetEmailPhone.scss";
import { ColumnsType } from "antd/es/table";
import editIcon from "../../../assets/icons/edit-blue.svg";
import searchIcon from "../../../assets/icons/search.svg";
import { DataType } from "../../../mock/ResetEmailPhone";
import { useGetResetEmailAndPhoneQuery, usePostResetEmailAndPhoneMutation } from "../../../store/Slices/Setting/ResetEmailAndPhone";
import AppSnackbar from "../../../utils/AppSnackbar";
import BreadCrumb from "../../../layout/BreadCrumb/BreadCrumb";
import { renderDashboard } from "../../../utils/useRenderDashboard";
import { ROLES } from "../../../constants/Roles";


import "../AgencyTermsCondition/AgencyTermsCondition.scss";


function SettingResetEmailPhone() {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [editModeValues, setEditModeValues] = useState<any>({});
  const [pagination, setPagination] = useState({ limit: 6, page: 1 });
  const [form] = Form.useForm();
  const { role, username, id }: any = JSON.parse(localStorage.getItem("careUserData") || "{}");

  const { data, isLoading, isSuccess } = useGetResetEmailAndPhoneQuery({ refetchOnMountOrArgChange: true, id });
  const [postResetEmailAndPhone] = usePostResetEmailAndPhoneMutation();

  let adminUsersData: any;

  if (isSuccess) {
    adminUsersData = data;
  }

  const onFinish = async (values: any) => {
    console.log('Finish:', values);
    console.log('Finish:', editModeValues?.firstName + " " + editModeValues?.lastName);
    const { newEmail, newPhone } = values;


    const payloaddd = {
      newEmail,
      newPhone,
      ...(role === ROLES.coordinator && { oldEmail: username, userId: editModeValues?._id }),
    }

    try {
      await postResetEmailAndPhone({ payload: payloaddd }).unwrap();
      AppSnackbar({
        type: "success",
        messageHeading: "Updated!",
        message: "Information updated successfully",
      });

      setEditModeValues({});
      form.resetFields();
      setIsEditMode(false);

    } catch (error: any) {
      AppSnackbar({
        type: "error",
        messageHeading: "Error",
        message: error?.data?.message ?? "Something went wrong!",
      });
    }
  };


  const CareHomeColumns: ColumnsType<DataType> = [
    {
      title: 'S.No.',
      dataIndex: '_id',
      key: '_id',
      render: (value: any, record: any, index: any) => {
        return <span>{(index + pagination?.limit * pagination?.page) - pagination?.limit + 1}</span>;
      },
    },
    {
      title: 'Username',
      dataIndex: 'firstName',
      key: 'name',
      render: (text: any, record: any) =>
        <span className='fs-14 fw-400 m-0 line-height-22' style={{ textTransform: "capitalize" }}>{record.firstName} {record.lastName}</span>
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Action',
      dataIndex: 'edit',
      key: 'edit',
      render: (_, text: any) => (
        <Space onClick={() => { setEditModeValues(text); setIsEditMode(true) }}>
          <img src={editIcon} alt="edit" className="d-flex align-center cursor-pointer" height={24} width={24} />
        </Space>),
    }
  ];


  return (
    <>
      <BreadCrumb breadCrumbItems={[
        {
          title: "Set",
          path: "",
        },
        {
          title: "Dashboard",
          path: renderDashboard(role),
        },
        {
          title: "Settings",
          path: "/settings",
        }
      ]} />

      {/* <div className='reset-email-phone'>
        <div className="heading">
          <h1 className="fs-16 fw-600">Set Email and Phone
            {!isEditMode && <InfoCircleOutlined />}
          </h1>
        </div>
        {!isEditMode ?
          <>
            <div className="filter-bar input-search-wrapper">
              <Space className='input-export-icons' size={[30, 10]}>
                <Input
                  className="search-input"
                  placeholder="Search"
                  prefix={<img src={searchIcon} alt="searchIcon" width={24} height={24} style={{ marginRight: '0.623rem' }} />}
                />
              </Space>
            </div>
            <div>
              <Table
                className="common-setting-table"
                columns={CareHomeColumns}
                dataSource={adminUsersData?.data?.result}
                pagination={{
                  current: pagination.page,
                  pageSize: pagination.limit,
                  total: adminUsersData?.data?.metadata?.total,
                  onChange: (page, limit) => setPagination({ page, limit }),
                }}
                loading={isLoading}
                onChange={(pagination: any) => setPagination(pagination)}
                scroll={{ x: 768 }}
              />
            </div>
          </>
          :
          <div className="user-detail">
            <Form layout="vertical" onFinish={onFinish} form={form}>

              <Row gutter={24} style={{ marginBottom: "35px" }}>
                <Col xs={24} md={12} lg={6}>
                  <label className="fs-14 fw-600">User Name</label>
                  <Input
                    placeholder="Enter user name"
                    disabled
                    value={editModeValues?.firstName + " " + editModeValues?.lastName}
                    style={{ marginTop: "2px", height: "40px", borderColor: "#DEDEDE", textTransform: "capitalize" }}
                  />
                </Col>

              </Row>

              <Row gutter={24}>
                <Col xs={24} md={12} lg={6}>

                  <Row className="user-email-phone">
                    <Col xs={24} md={12} lg={12}>
                      <label className="fs-14 fw-600">Primary Email:</label>
                    </Col>
                    <Col xs={24} md={12} lg={12}>
                      <span>{editModeValues?.email}</span>
                    </Col>
                  </Row>

                </Col>
                <Col xs={24} md={12} lg={{ span: 6, offset: 3 }}>
                  <Row className="user-email-phone">
                    <Col xs={24} md={12} lg={12}>
                      <label className="fs-14 fw-600">Primary Phone:</label>
                    </Col>
                    <Col xs={24} md={12} lg={12}>
                      <span>{editModeValues?.phone}</span>
                    </Col>
                  </Row>
                </Col>
              </Row>

              <Row gutter={24}>
                <Col xs={24} md={12} lg={6}>

                  <Row className="user-email-phone">
                    <Col xs={24} md={12} lg={12}>
                      <label className="fs-14 fw-600">Secondary Email:</label>
                    </Col>
                    <Col xs={24} md={12} lg={12}>
                      <span>{editModeValues?.email}</span>
                    </Col>
                  </Row>

                </Col>
                <Col xs={24} md={12} lg={{ span: 6, offset: 3 }}>
                  <Row className="user-email-phone">
                    <Col xs={24} md={12} lg={12}>
                      <label className="fs-14 fw-600">Secondary Phone:</label>
                    </Col>
                    <Col xs={24} md={12} lg={12}>
                      <span>{editModeValues?.phone}</span>
                    </Col>
                  </Row>
                </Col>
              </Row>

              <Row gutter={24}>
                <Col xs={24} md={12} lg={6}>
                  <label className="fs-14 fw-600">New Primary Email</label>
                  <Form.Item
                    name="newEmail"
                    rules={[{ type: 'email', message: 'Enter valid email address' }, { required: true, message: "Required field" }]}
                    className="mb-10"
                  >
                    <Input
                      placeholder="Enter new primary email"
                      id="newEmail"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12} lg={{ span: 6, offset: 3 }}>
                  <label className="fs-14 fw-600">New Primary Phone</label>
                  <Form.Item name="newPhone" rules={[{ required: true, message: "Required field" }]} className="mb-10">
                    <Input className="input-field" placeholder="Enter new primary phone" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={24}>
                <Col xs={24} md={12} lg={6}>
                  <label className="fs-14 fw-600">New Secondary Email</label>
                  <Form.Item name="secondaryEmail" rules={[{ type: 'email', message: 'Enter valid email address' }, { required: true, message: "Required field" }]} className="mb-10">
                    <Input className="input-field" placeholder="Enter secondary email" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12} lg={{ span: 6, offset: 3 }}>
                  <label className="fs-14 fw-600">New Secondary Phone</label>
                  <Form.Item name="secondaryPhone" rules={[{ required: true, message: "Required field" }]} className="mb-10">
                    <Input className="input-field" placeholder="Enter secondary phone" />
                  </Form.Item>
                </Col>
              </Row>

              <Col md={24} style={{ display: "flex" }}>
                <Form.Item>

                  <Button className="btn-secondary savebtn" htmlType="submit">
                    Save
                  </Button>
                </Form.Item>
              </Col>
            </Form>
          </div>
        }

      </div> */}

      <div className="page-wrapper">
        <div className="page-found-wrapper d-flex align-center justify-center flex-column construction">
          <div className="page-found-heading" style={{ textAlign: "center" }}>
            {/* <img
              src={UnderConstruction}
              alt="underConst"
              width={400}
            /> */}
            <h2 className="title-color m-0 under">
              <span className="primary-color">
                Under <span className="secondary-color">Construction</span>
              </span>
            </h2>
          </div>
          <h2 className="title-color fs-32 m-0 text-center coming">
            Coming <span className="title-color">Soon</span>
          </h2>
          <p className="title-color fs-16 m-0 text-center d-block">
            We are preparing something amazing and exciting for you.
          </p>
        </div>
      </div>
    </>

  );
}

export default SettingResetEmailPhone;
