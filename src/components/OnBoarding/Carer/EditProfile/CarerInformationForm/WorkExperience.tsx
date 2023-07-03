import {
  Button,
  Col,
  DatePicker,
  Dropdown,
  Form,
  Input,
  Modal,
  Row,
  Space,
  Tooltip,
} from "antd";
import { useState ,useEffect} from "react";
import "./FormMain.scss";
import Close from "../../../../../assets/images/OnBoarding/Close.svg";
import AddIcon from "../../../../../assets/images/OnBoarding/addIcon.svg";
import infoIcon from "../../../../../assets/icons/info-icon.svg";
import Dots from "../../../../../assets/images/OnBoarding/dots.png";
import Delete from "../../../../../assets/images/OnBoarding/Delete.svg";
import Edit from "../../../../../assets/images/OnBoarding/edit.svg";
import View from "../../../../../assets/images/OnBoarding/View.svg";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import TextArea from "antd/es/input/TextArea";
import DateIcon from "../../../../../assets/images/OnBoarding/datePicker.svg";
import "../../../../../shared/DatePickerWrapper/DatePickerWrapper.scss";
import DeleteModal from "../../../../../shared/DeleteModal/DeleteModal";
import {  useGetWorkExperienceRequestByIdQuery, usePostWorkExperienceRequestMutation, useUpdateWorkExperienceRequestMutation } from "../../../../../store/Slices/WorkExperience";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";
import form from "antd/es/form";

const WorkExperience = (props: any) => {

  const { handleSelectedStepValue, auditCheck } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDropdownOption ,setSelectedDropdownOption]=useState("")
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [selectedRowData ,setSelectedRowData]=useState<any>({})
  const [isErrorMessage, setIsErrorMessage] = useState(false);  
  const { state }: any = useLocation();
  const userData: any = localStorage.getItem("careUserData")
  const {id,role}: any = JSON.parse(userData);
    const {data,isLoading,isSuccess}=useGetWorkExperienceRequestByIdQuery({id:state?.editProfile?._id??id})
    const [postWorkExperienceRequest]=usePostWorkExperienceRequestMutation()
    const [updateWorkExperienceRequest]=useUpdateWorkExperienceRequestMutation()
    const [form] = Form.useForm();
    let workExperienceTableData:any
    if(isSuccess){
      workExperienceTableData=data
    }
    const handleWorkExperienceRowData = (record: any) => {
      
      setSelectedRowData(record)
      
  }
  const handleDeleteSubmit = () => {
    setIsDeleteModal(false);
  };
  const handleCancelSubmit = () => {
   
    setIsDeleteModal(false);
    
  };


  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
   
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedRowData({})
  };
 
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const payloadWorkExperience={
    nameEmployer:selectedRowData?.nameEmployer,
    positionEmployer:selectedRowData?.positionEmployer,
    experience:selectedRowData?.experience,
    leavingReason:selectedRowData?.leavingReason,
    startDate: selectedRowData?.startDate  ? dayjs(selectedRowData?.startDate) : undefined,
    endDate: selectedRowData?.endDate ? dayjs(selectedRowData?.endDate) : undefined,

  }
  useEffect(() => {
    form.setFieldsValue(payloadWorkExperience)
   }, [form,payloadWorkExperience])
  const actionDropDowns = [
    {
        dropDownOption: "View",
        key: "1",
        openModals:  showModal,
        icon:View,
    },
    {
        dropDownOption:"Edit",
        key: "2",
        openModals:  showModal,
        icon:Edit,
    },
    // {
    //     dropDownOption: "Delete",
    //     key: "3",
    //     openModals: () => setIsDeleteModal(true),
    //     icon:Delete,
    // }
]
const items = actionDropDowns.map((action) => {
    return {
      label: (
        <div >
          <Space size={15} onClick={()=>{setSelectedDropdownOption(action?.dropDownOption);action?.openModals();}}>
            <img src={action.icon} alt={action.dropDownOption} className="d-flex align-center" width={24} height={24} />
            <span className='fw-400 fs-14'>{action.dropDownOption} </span>
          </Space>
        </div>
      ),
      key: action.key,
    }
  })


  interface IWorkExperience {
    nameEmployer: string;
    positionEmployer: string;
    experience: string;
    startDate: string;
    endDate: string;
    leavingReason: string;
  }
  const onFinish = async (values: any) => {
    try {
      if (selectedDropdownOption =="Edit") {
        const payload={...values,currentlyWorkingHere:true}
        const { error }: any = await updateWorkExperienceRequest({id:selectedRowData?._id??id,payload:payload})
  
        if (error) {
          // handle the error here
          setIsErrorMessage(error?.data?.message)
          return;
        }
      }
      if (selectedDropdownOption =="Add") {
        const payload={...values,currentlyWorkingHere:true}
        const { error }: any = await   postWorkExperienceRequest({id:state?.editProfile?._id??id,payload:payload})
  
        if (error) {
          // handle the error here
          setIsErrorMessage(error?.data?.message)
          return;
        }
      }
  
      setSelectedRowData({});
      setIsModalOpen(false);
    } catch (error) {
      // handle any unexpected errors here
      console.log("Unexpected error:", error);
    }
  };

  const columns: ColumnsType<IWorkExperience> = [
    {
      title: <span>Name of Employer</span>,
      dataIndex: "nameEmployer",
      key: "nameEmployer",

      render: (_, text) => (
        <span className="fs-14 fw-400 title-color">{text.nameEmployer}</span>
      ),
    },
    {
      title: <span>Position </span>,
      dataIndex: "Position",
      key: "Position",

      render: (_, text) => (
        <Space>
          <span className="fs-14 fw-400 title-color">{text.positionEmployer}</span>
        </Space>
      ),
    },
    {
      title: <span>Experience</span>,
      dataIndex: "Experience ",
      key: "Experience",

      render: (_, text) => (
        <div>
          <span className="fs-14 fw-400 title-color">{text.experience}</span>
        </div>
      ),
    },
    {
      title: "Reason for Leaving",
      dataIndex: "leavingReason",
      key: "leavingReason",

      render: (_, text) => (
        <span className="fs-14 fw-400 title-color">{text.leavingReason}</span>
      ),
    },

    {
      title: <span>Start Date </span>,
      dataIndex: "startDate",
      key: "startDate",

      render: (_, text) => (
        <Space>
          <span className="fs-14 fw-400 title-color">{dayjs(text.startDate).format("DD-MM-YYYY")}</span>
        </Space>
      ),
    },
    {
      title: <span>End Date </span>,
      dataIndex: "endDate",
      key: "endDate",

      render: (_, text) => (
        <Space>
          <span className="fs-14 fw-400 title-color">{dayjs(text.endDate).format("DD-MM-YYYY")}</span>
        </Space>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",

      render: (_: any, record: any) => (
        <Dropdown
          menu={{ items }}
          placement="bottomRight"
          trigger={["click"]}
          className="actionDropDown"
          overlayStyle={{ width: "150px" }}
        >
          <div className="border-color cursor-pointer d-flex algin-center  justify-center" onClick={() => handleWorkExperienceRowData(record)}>
            <img src={Dots} alt="menu" />
          </div>
        </Dropdown>
      ),
    },
  ];

  const config = {
    rules: [
      {
        type: "object" as const,
        required: true,
        message: "Please select Date!",
      },
    ],
  };

  return (
    <div>
      <Row gutter={[20, 20]}>
        <Col xs={24}>
          <button className="add-reference-modal-btn cursor-pointer"  onClick={()=>{showModal();setSelectedDropdownOption("Add")}}>
            <Space  onClick={()=>setSelectedRowData({})}>
              <span className="fw-600 fs-14 title-color">
              Add Work Experience
              </span>
              <img src={AddIcon} alt="AddIcon" className='d-flex align-center' />
            </Space>
          </button>
        </Col>

        <Col xs={24}>
          <Space>
            <div className="tooltip-text">
              <span className="fw-600 fs-20 inner-text">Candidate Reference</span>
              &nbsp;
              <span className="fw-600 fs-14">
                (Framework Ready Reference Multi )
              </span>
            </div>
            <Tooltip
              placement="bottomLeft"
              color="#65CDF0"
              overlayInnerStyle={{
                width: "499px",
              }}
              title="Here you can see the status of all the references. When the system receives references, they will appear here. If the status is still “Awaiting”, please resend the reference request from the previous section."
            >
              <img
                src={infoIcon}
                alt="infoIcon"
                className="d-flex align-center"
              />
            </Tooltip>
          </Space>
        </Col>
       
        <Col xs={24}>
          <Table
            className='onboading-table-wrapper'
            columns={columns}
            loading={isLoading}
            dataSource={workExperienceTableData?.data?.workExperience}
            scroll={{ x: "max-content" }}
            pagination={false}
          />
        </Col>

        <Col xs={24} >
          <div >
            <Space className='carer-buttons'>
              {(auditCheck && role==="admin") && <Tooltip
                autoAdjustOverflow={true}
                showArrow={false}
                placement="bottomLeft" color="#65CDF0"
                title='Click to mark as audit'
              >

                <Button className='edit-module-button  audit-button  align-center d-flex' >Audit</Button>
              </Tooltip>}
              <Button className='edit-module-button bg-orange-color  align-center d-flex '>Save</Button>
              <Button className='edit-module-button   align-center d-flex btn-secondary' onClick={() => handleSelectedStepValue('Specialities')}>Continue</Button>
            </Space>
          </div>
        </Col>
      </Row>
      <Modal
        className="personal-form-wrapper"
        title={
          <span style={{ fontWeight: "500px", fontSize: "20px" }}>
            {selectedDropdownOption==="Add" ?   "Add Work Experience": selectedDropdownOption ==="View"?  "View Work Experience":"Edit Work Experience"}
          </span>
        }
        centered
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
        footer={false}
        closeIcon={<img src={Close} alt="" />}
      >
        <Form
          name="basic"
          initialValues={{...selectedRowData, startDate: selectedRowData?.startDate  ? dayjs(selectedRowData?.startDate) : undefined,endDate: selectedRowData?.endDate ? dayjs(selectedRowData?.endDate) : undefined}}
          onFinish={onFinish}
          form={form}
          onFinishFailed={onFinishFailed}
          // autoComplete="off"
          layout="vertical"
        >
          <Row gutter={[30, 5]} align="bottom">
            <Col xs={24} sm={24} md={12} lg={12} className="carer-form-input ">
              <Form.Item
                label="Name of Employer"
                name="nameEmployer"
                rules={[{ required: true, message: "Required field" }]}
              >
                <Input placeholder="Type here" disabled={selectedDropdownOption === "View"} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} className="carer-form-input ">
              <Form.Item
                label="Position with the Employer"
                name="positionEmployer"
                rules={[{ required: true, message: "Required field" }]}
              >
                <Input placeholder="Type here" disabled={selectedDropdownOption === "View"}/>
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item rules={[{ required: true, message: "Required field" }]}  label="Experience" name="experience">
                <TextArea rows={4}    disabled={selectedDropdownOption === "View"}/>
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item rules={[{ required: true, message: "Required field" }]} label="Reason of Leaving" name="leavingReason">
                <TextArea rows={4}   disabled={selectedDropdownOption === "View"}/>
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={12} className="date-picker-wrapper">
              <Form.Item
                name="startDate"
                label="Start Date"
                {...config}
                style={{ maxWidth: "100%" }}
              >
                <DatePicker disabled={selectedDropdownOption === "View"}
                  popupClassName="date-picker-content"
                  suffixIcon={<img src={DateIcon} />}
                  clearIcon={false}
                />
              </Form.Item>
            </Col>
           
            <Col xs={24} sm={24} md={12} className="date-picker-wrapper">
              <Form.Item
                name="endDate"
                label="End Date"
                {...config}
                style={{ maxWidth: "100%" }}
              >
                <DatePicker disabled={selectedDropdownOption === "View"}
                  popupClassName="date-picker-content"
                  suffixIcon={<img src={DateIcon} />}
                  clearIcon={false}
                />
              </Form.Item>
            </Col>

      {selectedDropdownOption!=="View" &&      <Col xs={24}>
            <p className="error-color">{isErrorMessage}</p>
              <Space className='modal-buttons'>
                <Button className='modal-button btn-cancel  ' >Cancel</Button>
                <Button className='modal-button btn-secondary' htmlType='submit'>Save</Button>
              </Space>

            </Col>}
          </Row>
        </Form>
      </Modal>

      <DeleteModal
        setDeleteModal={setIsDeleteModal}
        deleteModal={isDeleteModal}
        submitTitle='Cancel'
        cancelTitle='Delete'
        title='Do you want to delete this row'
        onSubmit={handleDeleteSubmit}
        onCancel={handleCancelSubmit}
      />
    </div>
  );
};

export default WorkExperience;
