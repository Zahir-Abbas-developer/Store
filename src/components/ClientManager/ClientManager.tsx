import { Button, Col, Dropdown, Form, Input, Modal, Progress, Row, Select, Space, Switch, Table } from 'antd'
import React, { useState } from 'react'
import "./ClientManager.scss"
import CloseIcon from "../../assets/icons/close-icon.svg"
import arrowDown from "../../assets/icons/arrow-down-icon.svg"
import { useForm } from 'antd/es/form/Form'
import viewIcon from "../../assets/icons/view-icon.svg"
import editIcon from "../../assets/icons/edit-outlined-blue.svg"
import threeDots from "../../assets/icons/three-dots.svg"
import searchIcon from "../../assets/icons/search.svg";
import { ColumnsType } from 'antd/es/table'
import ClientManagerFilters from './ClientManagerFilters/ClientManagerFilters'
import { useNavigate } from 'react-router-dom'
import { ClientManagerTableData } from '../../mock/ClientManagerData'
import ClientViewProfileModal from './ClientViewProfileModal/ClientViewProfileModal'
import { useGetManageGroupDataQuery, usePostAddNewClientMutation } from '../../store/Slices/ClientManager';
import { useGetClientRequestQuery } from '../../store/Slices/ClientManager';
import { debouncedSearch, isNullOrEmpty } from '../../utils/utils'
import AppSnackbar from '../../utils/AppSnackbar'
import BreadCrumb from '../../layout/BreadCrumb/BreadCrumb'

const { Option } = Select;
const ClientManagerMain = () => {

const [postRequest] = usePostAddNewClientMutation()
// state hooks start here
  const [isAddNewClientModal, setIsAddNewClientModal] = useState(false);
  const [isPartOfGroup, setIsPartOfGroup] = useState(false)
  const [filterValue ,setFilterValue]=useState("")
  const [isGroupName, setIsGroupName] = useState("")
  const [groupNameSearch, setGroupNameSearch] = useState("")
  const [apiResponseError, setApiResponseError] = useState("")
  const [viewClientModal, setviewClientModal] = useState(false)
  const [tableRowRecord, setTableRowRecord] = useState(null)
  const [form] = useForm();
  const [pagination, setPagination] = useState({ limit: 10, page: 1 });
  
// get hooks  start here

//query parameters of search and filter
  const paramsObj: any = {};
  if (groupNameSearch) paramsObj["search"] = groupNameSearch;
  if (filterValue) paramsObj["groupId"] = filterValue;
  const query = "&" + new URLSearchParams(paramsObj).toString();
  const { data, isLoading, isSuccess, isError, refetch } = useGetClientRequestQuery({ refetchOnMountOrArgChange: true, query,pagination:pagination,role:"client" })  // get table data
  const { data: isData, isLoading: isloadingData, isSuccess: isSuccessData, isError: iserrorData, } = useGetManageGroupDataQuery({ refetchOnMountOrArgChange: true });  // get create group data
  // get hooks  send here

  //  get create group
  let getCreateGroup: any;
  if (isloadingData) {
    getCreateGroup = <p>Loading...</p>;
  } else if (isSuccessData) {
    getCreateGroup = isData;
  } else if (iserrorData) {
    getCreateGroup = <p>Error...</p>;
  }

  const onFinish = async (values: any) => {
    console.log('Success:', values);
    const payload = {
      ...values,
      group: isPartOfGroup,
      ...(isPartOfGroup ? { groupId: isGroupName } : {})
    };

    try {
      await postRequest({ payload }).unwrap();
      AppSnackbar({ type: "success", messageHeading: "Success!", message: "New Client Added Successfully" });
      setApiResponseError('');
      setIsAddNewClientModal(false)
      form.resetFields();
      refetch();

    } catch (error: any) {

      setApiResponseError(error?.data?.message)
      AppSnackbar({
        type: "error",
        messageHeading: "Error",
        message: error?.data?.message ?? "Something went wrong!"
      });
    }

  };
  const onChange = (checked: boolean) => {
    setIsPartOfGroup(checked)
  };
  

  const groupIdHandleChange = (value: string) => {
    setIsGroupName(value)
  }

  const emailValidator = (rule: any, value: any, callback: any) => {
    if (!value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      callback();
    } else {
      callback('Enter a valid email address');
    }
  };

  const validatePhone = (_:any, value:any) => {
    const phoneRegex = /^[0-9]{10}$/; // regular expression for a 10-digit phone number
    if (!value || phoneRegex.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('Enter a valid phone number.'));
  };

  // get table data start here
  let clientManagerTableDatas: any;
  let totalRecords: any = 0;
  if (isLoading) {
    clientManagerTableDatas = <p>Loading...</p>
  }
  else if (isSuccess) {
    clientManagerTableDatas = data;
    totalRecords = data;
  }
  else if (isError) {
    clientManagerTableDatas = <p>Error...</p>
  }

  totalRecords = totalRecords?.data?.metadata?.total;
  // get table data end here 

  // search function
  const debouncedResults = async (event: any) => {
    const { value } = event.target;
    debouncedSearch(value, setGroupNameSearch);
  };

  const navigate = useNavigate()
  const items: any = [
    {
      label: (
        <div onClick={() => setviewClientModal(true)}>
          <Space >
            <img src={viewIcon} alt="Edit" className="d-flex align-center" width={20} height={20} />
            <span >View</span>
          </Space>
        </div>
      ),
      key: "1",
    },
    {
      label: (
        <Space onClick={() => navigate(`/client-manager/client-registration/${tableRowRecord}`, { state: { editProfile: tableRowRecord } })}>
          <img src={editIcon} alt="Delete" className="d-flex align-center" width={20} height={20} />
          <span>Edit</span>
        </Space>
      ),
      key: "2",
    },

  ];



  const columns: ColumnsType<any> = [
 
    {
      title: <span>Display Name</span>,
      dataIndex: 'displayName',
      key: 'clientName',
      ellipsis: true,
      width: 270,
      render: (_, text) =>
        <div className="cursor-pointer d-flex align-center "  >
          <img  src={ isNullOrEmpty(text?.uploadLogo)? `https://ui-avatars.com/api/?rounded=true&name=${text.clientName}` :  `https://rnd-s3-public-dev-001.s3.eu-west-2.amazonaws.com/${text?.uploadLogo?.mediaId}.${text?.uploadLogo?.mediaMeta?.extension}`} height={30} width={30} style={{borderRadius:"50%"}} alt="img"
          onError={(e:any) => {
          e.target.onerror = null; 
           e.target.src = `https://ui-avatars.com/api/?rounded=true&name=${text.clientName}`;
          }}
        />

          <span className='fs-14 fw-400 title-color' style={{ marginLeft: "30px" }}>
            {text.clientName}
          </span>
        </div>
    },
    {
      title: <span>Group Name </span>,
      dataIndex: 'clientGroups',
      key: 'clientGroups',
      width: 300,
      render: (_, text) =>
        <Space >
          <span className='fs-14 fw-400 title-color'>
            {text?.clientGroups?.name}
          </span>
        </Space>,
    },
    // {
    //   title: <span>Type</span>,
    //   dataIndex: 'type',
    //   key: 'clientType',
    //   width: 300,
    //   render: (_, text) =>
    //     <Space >
    //       <span className='fs-14 fw-400 title-color'>
    //         {text.clientType}
    //       </span>
    //     </Space>,
    // },
    {
      title: 'Profile Status',
      dataIndex: 'percentageComplete',
      key: 'percentageComplete',
      width: 300,
      render: (_, text) =>
        <div>
          <div className='fs-14 fw-400 title-color' style={{ minWidth: "70px" }}>
            <span className='fw-700 fs-14'>{text?.percentageComplete}%</span>   <span style={{ marginLeft: "5px" }} className='fw-600 fs-14'>Done</span>
          </div>
          <Progress percent={text?.percentageComplete} strokeColor='#F7B923' strokeWidth={11} width={50} showInfo={false} />
        </div>
    },
    {
      title: <div className='equal--width-tb'>Actions</div>,
      dataIndex: "actions",
      key: "actions",
      width: 150,
      render: (_, text) => (
        <Dropdown
          menu={{ items }}
          placement="bottomRight"
          trigger={["click"]}
          className="actionDropDown"
        >
          <div className="equal--width-tb">
            <img className='cursor-pointer' src={threeDots} alt="menu" onClick={() => setTableRowRecord(text)} />
          </div>
        </Dropdown>
      ),
    },
  ];

//BreadCrumb Items
 const breadCrumbItems = 
 [ 
  { title: "Client Manager", path: "", },
  { title: "Dashboard", path: "/dashboard", }, 
];
  return (
    <div className='client-manager-wrapper-main'>
      <BreadCrumb breadCrumbItems={breadCrumbItems} />
      <div className="wrapper-search-and-filters">
        <div className="inner-main-head">
          <div className="upper-level-buttons d-flex">
            <Button className='upper-level-btn btn-secondary white-color' onClick={() => setIsAddNewClientModal(true)}>Add New Client</Button>
            <Button className='upper-level-btn btn-secondary btn--orange white-color' onClick={() => navigate(`/client-manager/manage-groups`)}>Create Group</Button>
          </div>
          <div className="search-and-filters">
            <ClientManagerFilters setFilterValue={setFilterValue}/>
          </div>
        </div>
        <Input
          className="search-input"
          onChange={debouncedResults}
          placeholder="Search by group name"
          prefix={<img src={searchIcon} alt="searchIcon" width={24} height={24} style={{ marginRight: '0.623rem' }} />}
        />
      </div>

      <div className="client-main-table-wrapper">
        {clientManagerTableDatas && <Table className="wrapper-table"
         columns={columns}
          loading={isLoading}
           dataSource={clientManagerTableDatas?.data?.result}
            scroll={{ x: "max-content" }} 
            pagination={{
              current: pagination.page,
              pageSize: pagination.limit,
              total: clientManagerTableDatas?.data?.metadata?.total,
              onChange: (page, limit) => setPagination({ page, limit }),
            }}
            />
        }
      </div>


      <Modal
        centered
        title={<div className='fs-20 fw-500'>Client Information</div>}
        open={isAddNewClientModal}
        onCancel={() => { setIsAddNewClientModal(false); form.resetFields() }}
        wrapClassName="add-client-info-form"
        footer={false}
        closeIcon={<img src={CloseIcon} alt="" />}>

        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
          form={form}
        >
          <Row gutter={[30, 0]} align="bottom">
            <Col xs={24} sm={24} md={12} lg={12}>
              <Form.Item
                label="Client Name"
                name="clientName"
                rules={[{ required: true, message: 'Required field' }]}
              >
                <Input placeholder="Type here" style={{ width: '100%', height: '45px' }} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Required field' },{ validator: emailValidator }]}
              >
                <Input placeholder="Type here" style={{ width: '100%', height: '45px' }} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12}>
              <Form.Item
                label="Contact"
                name="phone"
                rules={[{ required: true, message: 'Required field' },{ validator: validatePhone }]}
              >
                <Input placeholder="Type here" style={{ width: '100%', height: '45px' }} />
              </Form.Item>
            </Col>
          </Row>

          <h4 className='fs-20 fw-500' style={{ marginTop: "0px", marginBottom: '15px' }}>Group Information</h4>
          <div className="form-check-group">
            <Switch onChange={onChange} /> &nbsp; <span>Part of a group?</span>
          </div>

          {isPartOfGroup && <Row gutter={[30, 0]} align="bottom">
            <Col xs={24} sm={24} md={12} lg={12}>
              <Form.Item
                label="Group Name"
                name="groupId"
                rules={[{ required: true, message: 'Required field' }]}
              >
                <Select placeholder="Selected Option" onChange={groupIdHandleChange} suffixIcon={<img src={arrowDown} />}>
                  {getCreateGroup?.data?.result.map((option: any) => {
                    return (
                      <Option value={option?._id}>{option?.name}</Option>
                    )
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12}>
              <Form.Item
                label="Copy Settings From?"
                name="copySettingFrom"
                rules={[{ required: true, message: 'Required field' }]}
              >
                <Select placeholder="Selected Option"  suffixIcon={<img src={arrowDown} />}>
                  <Option value="Staff Setting">Staff Setting</Option>
                  <Option value="Shift Time Settings">Shift Time Settings</Option>
                  <Option value="Bank Holiday">Bank Holiday</Option>
                  <Option value="Job Role">Job Role</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12}>
              <Form.Item
                label="Settings To Copy"
                name="settingToCopy"
                rules={[{ required: true, message: 'Required field' }]}
              >
                <Select placeholder="Selected Option"  suffixIcon={<img src={arrowDown} />}>
                  <Option value="Staff Setting">Staff Setting</Option>
                  <Option value="Shift Time Settings">Shift Time Settings</Option>
                  <Option value="Bank Holiday">Bank Holiday</Option>
                  <Option value="Job Role">Job Role</Option>
                </Select>
              </Form.Item>
            </Col>

          </Row>}
          <Col><p style={{color:"red"}}>{apiResponseError}</p></Col>
          <div className='cus-footer-buttons'>
            <Button className='inner-cus-footer-btn btn--cancel' onClick={() => { setIsAddNewClientModal(false); form.resetFields() }}>Cancel</Button>
            <Button className='inner-cus-footer-btn btn--save' htmlType='submit'>Save</Button>
          </div>


        </Form>
      </Modal>

      <ClientViewProfileModal viewClientModal={viewClientModal} setviewClientModal={setviewClientModal} profileViewData={tableRowRecord} />
    </div>
  )
}

export default ClientManagerMain