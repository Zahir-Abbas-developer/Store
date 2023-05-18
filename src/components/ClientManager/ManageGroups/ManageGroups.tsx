import {
  Button,
  Checkbox,
  Col,
  Dropdown,
  Form,
  Input,
  MenuProps,
  Modal,
  Row,
  Space,
  Table,
} from "antd";
import React, { useEffect, useState } from "react";

import plusIcon from "../../../assets/icons/plus-icon.svg";
import editIcon from "../../../assets/icons/edit-icon.svg";
import CloseIcon from "../../../assets/icons/close-icon.svg";

import { DownOutlined } from "@ant-design/icons";

import "./ManageGroups.scss";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { usePostCreateGroupMutation, useUpdateManageGroupRequestMutation } from "../../../store/Slices/ClientManager";
import {
  useGetClientRequestQuery,
  useGetManageGroupDataQuery,
} from "../../../store/Slices/ClientManager";
import { useForm } from 'antd/es/form/Form'
import form from "antd/es/form";
import AppSnackbar from "../../../utils/AppSnackbar";
import BreadCrumb from "../../../layout/BreadCrumb/BreadCrumb";

const ManageGroups = () => {
  const [isCreateGroupModal, setisCreateGroupModal] = useState(false);
  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>();
  const [isOpenDropdown, setisOpenDropdown] = useState(false);
  const [isEditMode, setisEditMode] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<any>();
  const [pagination, setPagination] = useState({ limit: 1000, page: 1 });

  const [form] = useForm();

  const validateDrp = checkedList ? "names" : ''

  // api start
  const [postRequest] = usePostCreateGroupMutation();
  const [updateManageGroup] = useUpdateManageGroupRequestMutation();


  // get table data start
  const { data, isLoading, isSuccess, isError } = useGetClientRequestQuery({ refetchOnMountOrArgChange: true, query: "", pagination: pagination, role: "client" });
  const { data: isData, isLoading: isloadingData, isSuccess: isSuccessData, isError: iserrorData, } = useGetManageGroupDataQuery({ refetchOnMountOrArgChange: true });
  let getClientName: any;
  let getCreateGroup: any;

  //  get client name
  if (isLoading) {
    getClientName = <p>Loading...</p>;
  } else if (isSuccess) {
    getClientName = data;
  } else if (isError) {
    getClientName = <p>Error...</p>;
  }

  //  get create group
  if (isloadingData) {
    getCreateGroup = <p>Loading...</p>;
  } else if (isSuccessData) {
    getCreateGroup = isData;
  } else if (iserrorData) {
    getCreateGroup = <p>Error...</p>;
  }

  //  post api there
  const createGroupPostData = async (payload: any) => {
    try {
      const { dataUpdated }: any = await postRequest({
        payload,
      });
    } catch (error) {
      console.log("Error updating data:", error);
    }
  };
  //
  //
  //

  const handleCancel = async () => {
    // Reset the form fields when modal is closed

  };


  const idToNameMap = new Map(getClientName?.data?.result.map((obj: any) => [obj._id, obj.clientName]));
  // console.log(idToNameMap)

  const names = checkedList?.map(id => idToNameMap.get(id) || []);

  const onFinish = (values: any) => {

    const payload = {
      // ...values,
      clients: checkedList,
      name: values.name
    };
    isEditMode ? updateManageGroup({ id: selectedRecord._id, payload }) : createGroupPostData({
      // ...values,
      name: values.name,
      clients: checkedList
    })

    // setisCreateGroupModal(false);
    // setisEditMode(false)
    handleReset()
    AppSnackbar({
      type: "success",
      messageHeading: "Success!",
      message: isEditMode ? "Group Edited Successfully" : "Information Added Successfully"
    });

  };

  const manageGroupsColumns = [
    {
      title: "Sr. #",
      dataIndex: "sNo",
      key: "sNo",
      render: (text: any, record: any, index: any) => index + 1,
    },
    {
      title: "Group Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Care Homes",
      dataIndex: "clientData",
      key: "clientData",
      render: (clientData: any) => (
        <div className="d-flex">
          {clientData?.map((item: any, index: number) => {
            return (
              <>
                {item?.clientName}
                {clientData.length > index + 1 ? ", " : ""}
              </>
            );
          })}
        </div>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_: any, text: any) => (
        <div className="border-color cursor-pointer">
          <img
            src={editIcon}
            onClick={() => {
              setisCreateGroupModal(true);
              setisEditMode(true);
              setSelectedRecord(text);

              // setCheckedList(initialDataForm?.selectCareHome);
            }}
            style={{ width: "17px", height: "17px" }}
            alt="edit"
          />
        </div>
      ),
    },
  ];



  const listHomesColumns = [
    {
      title: "Sr. #",
      dataIndex: "sNo",
      key: "sNo",
      render: (text: any, record: any, index: any) => index + 1,
    },
    {
      title: "Care Homes",
      dataIndex: "clientName",
      key: "clientName",
    },
  ];
  // initialDataForm?.selectCareHome
  const onChange = (checkedValues: CheckboxValueType[]) => {
    setCheckedList(checkedValues);
    // const temp = {
    //   name: selectedRecord?.name,
    //   ...(!isEditMode ? {
    //     selectCareHome: checkedValues?.join(", "),
    //   } : {
    //     selectCareHome: names?.join(", "),
    //   })

    // }

    form.setFieldsValue({selectCareHome: checkedList});

  };


  const checkboxOptions = getClientName?.data?.result.map((option: any) => ({
    value: option._id,
    label: option.clientName ? option.clientName : 'nan',
  }));
  console.log(checkboxOptions, "checkboxOptions")

  const items: MenuProps["items"] = [
    {
      label: (
        // {isEditMode && }
        <Checkbox.Group
          options={checkboxOptions}
          onChange={onChange}
          className="group-checkbox-flex"
          value={checkedList}
        />
      ),
      key: "1",
    },
  ];



  const temp = {
    name: selectedRecord?.name,
    selectCareHome: checkedList ? checkedList[0] : '',
  }

  useEffect(() => {
    if (isEditMode && selectedRecord?.clients) {
      setCheckedList(selectedRecord?.clients);
    }
    form.setFieldsValue(temp);
  }, [selectedRecord])

  console.log("checkedList", checkedList ? checkedList[0] : '')

  const handleReset = () => {
    setisCreateGroupModal(false);
    setisEditMode(false);
    form.resetFields()
    setCheckedList([]);
    setSelectedRecord({})
  }

  //BreadCrumb Items
  const breadCrumbItems =
    [
      { title: "Manager Groups", path: "", },
      { title: "Dashboard", path: "/dashboard", },
      { title: "Client Manager", path: "/client-manager", },
    ];



  return (
    <div>
      <BreadCrumb breadCrumbItems={breadCrumbItems} />

      <div className="manage-groups-wrapper">
        <div style={{ fontWeight: "500", fontSize: "20px" }}>Manage Groups</div>

        <div
          className="create-groups-button form--label"
          style={{ margin: "30px 0px 22px 0px" }}
        >
          <span>Create Group</span>{" "}
          <img
            src={plusIcon}
            onClick={() => setisCreateGroupModal(true)}
            alt="add"
          />
        </div>

        <div className="manage-groups-table-wrapper">
          {getCreateGroup && (
            <Table
              dataSource={getCreateGroup?.data?.result}
              columns={manageGroupsColumns}
              pagination={{ pageSize: 7 }}
              loading={isLoading}
            />
          )}
        </div>
        <Modal
          centered
          title={
            <div style={{ fontSize: "20px", fontWeight: "500" }}>
              Client Information
            </div>
          }
          open={isCreateGroupModal}
          onCancel={() => {
            handleReset()
          }}
          wrapClassName="create-group-modal-form"
          footer={false}
          closeIcon={<img src={CloseIcon} alt="closeIcon" />}
        >
          <Form
            name="basic"
            onFinish={onFinish}
            layout="vertical"
            form={form}
          >
            <Row gutter={[30, 0]} align="bottom">
              <Col xs={24} sm={24} md={12} lg={12}>
                <Form.Item
                  label="Group Name"
                  name="name"
                  rules={[{ required: true, message: "Required field" }]}

                >
                  <Input
                    placeholder="Type here"
                    style={{ width: "100%", height: "45px" }}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12}>
                <Form.Item
                  label="Select Care Home"
                  name="selectCareHome"
                  rules={[{ required: true }]}
                  className="care-home-class"
                >
                  <>
                    {/* <Input name="selectCareHome"/> */}
                    <Dropdown
                      menu={{ items }}
                      trigger={["click"]}
                      open={isOpenDropdown}
                      onOpenChange={setisOpenDropdown}

                    >
                      <div
                        id="selectCareHome"
                        onClick={(e) => {
                          e.preventDefault();
                        }}
                        style={{ height: "39px" }}
                        className="select-dropdown-btn fs-14 fw-400 border-radius-4"
                      >
                        {/* <Space style={{ height: "39px" }}> */}
                        {names?.length ? (<p className='text-ellipsis'>{names?.join(", ")}</p>) : "Select Status"}

                        <DownOutlined />
                        {/* </Space> */}
                      </div>
                    </Dropdown>
                  </>
                </Form.Item>
              </Col>
            </Row>

            {isEditMode && (
              <div
                className="list-homes-table-wrapper"
                style={{ marginBottom: "20px" }}
              >
                <Table
                  dataSource={names?.map(el => ({ clientName: el }))}
                  columns={listHomesColumns}
                  pagination={false}
                />
              </div>
            )}
            <Form.Item>
              <div className="cus-footer-buttons">
                <Button
                  className="inner-cus-footer-btn btn--cancel"
                  onClick={() => {
                    setisCreateGroupModal(false);
                    // form.resetFields()
                  }}
                >
                  Cancel
                </Button>
                <Button
                  className="inner-cus-footer-btn btn--save"
                  htmlType="submit"
                >
                  Save
                </Button>
              </div>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default ManageGroups;
