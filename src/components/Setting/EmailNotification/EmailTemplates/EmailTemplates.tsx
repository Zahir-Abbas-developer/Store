// import "../../../../sass/common.scss";
import { Button, Table, Space, Dropdown, MenuProps } from "antd";
import { PlusCircleOutlined } from '@ant-design/icons';
import { useState } from "react";
import "./EmailTemplates.scss";
import AddModal from "./AddModal";
import { ColumnsType } from "antd/es/table";
import editIcon from "../../../../assets/icons/edit-blue.svg";
import actionImg from "../../../../assets/icons/Setting/actionImg.svg";
import deleteIcon from "../../../../assets/icons/delete-icon-outlined.svg";
import DeleteModal from "../../../../shared/DeleteModal/DeleteModal";
import { DataType } from "../../../../mock/EmailTemplates";
import { useGetEmailTemplateQuery, useDeleteEmailTemplateMutation } from "../../../../store/Slices/Setting/EmailTemplate";
import AppSnackbar from "../../../../utils/AppSnackbar";

function EmailTemplates() {
  const [openEmailTemplateModal, setOpenEmailTemplateModal] = useState<string>('');
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [deleteEmailTemplate] = useDeleteEmailTemplateMutation();
  const [editModalFieldValues, setEditModalFieldValues] = useState({});
  const [emailTemplateId, setEmailTemplateId] = useState<string>('');
  
  // Integration
  const { data, isLoading, isSuccess } = useGetEmailTemplateQuery({ refetchOnMountOrArgChange: true });

  let emailTemplateData: any;
  if (isSuccess) {
    emailTemplateData = data
  }
  const handleDeleteSubmit = async () => {

    try {
      await deleteEmailTemplate(emailTemplateId).unwrap();
      AppSnackbar({ type: "success", messageHeading: "Deleted!", message: "Information deleted successfully" });
      handleClearForm()

    } catch (error: any) {
      AppSnackbar({
        type: "error",
        messageHeading: "Error",
        message: error?.data?.message ?? "Something went wrong!"
      });
    }
  };


  const items: MenuProps["items"] = [
    {
      label: (
        <Space
          onClick={() => setOpenEmailTemplateModal('Edit')}
        >
          <img src={editIcon} alt="edit" className="d-flex align-center" height={18} width={16} />
          <span className="m-0">Edit Details</span>
        </Space>),
      key: "1",
    },
    {
      label: (
        <Space onClick={() => setIsDeleteModal(true)}>
          <img src={deleteIcon} className="d-flex align-center" alt="delete" height={18} width={16} />
          <span>Delete</span>
        </Space>),
      key: "3",
    },
  ];


  const handleResetFormValues = () => {
    setIsDeleteModal(false);
    setEditModalFieldValues({})
  }




  const TemplateColumns: ColumnsType<DataType> = [
    {
      title: 'Sr. No.',
      dataIndex: '_id',
      key: '_id',
      render: (value: any, record: any, index: any) => {
        return <span>{index + 1}</span>;
      },
    },
    {
      title: 'Template Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Body',
      dataIndex: 'discription',
      key: 'discription',
      render: (_: any, text: any) => (
        <span dangerouslySetInnerHTML={{ __html: text.discription }}></span>
      )
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_: any, text: any) => (
        <div>
          <Dropdown
            menu={{ items }}
            placement="bottomLeft"
            trigger={["click"]}
            overlayClassName="actionDropDownBlocking my-dropdown-blocking"
            overlayStyle={{ borderRadius: '4px' }}
            onOpenChange={(visible) => {
              if (!visible) {
                // Do something when the dropdown is closed
                handleResetFormValues()
              }
            }}
          >
            <Space>
              <div className="border-color cursor-pointer" onClick={() => { setEmailTemplateId(text._id); setEditModalFieldValues(text) }}>
                <img src={actionImg} alt="ElpiseIcon" />
              </div>
            </Space>
          </Dropdown>
        </div>
      ),
    },
  ];


  const handleClearForm = () => {
    setEditModalFieldValues({})
    setIsDeleteModal(false);
  }



  return (
    <div className='email-templates'>

      <Button className="add-visa-type-btn fs-14 fw-600 border-radius-10 d-flex justify-center align-items-center" onClick={() => { handleClearForm(); setOpenEmailTemplateModal('Add') }}>
        Create Template
        <PlusCircleOutlined />
      </Button>
      <div>
        <Table
          className="common-setting-table"
          columns={TemplateColumns}
          dataSource={emailTemplateData?.data}
          locale={{ emptyText: !isLoading ? "No Data" : " " }}
          loading={isLoading}
          pagination={false}
          scroll={{ x: 768 }}
        />
      </div>

      <AddModal openEmailTemplateModal={openEmailTemplateModal} setOpenEmailTemplateModal={setOpenEmailTemplateModal} editModalFieldValues={editModalFieldValues} setEditModalFieldValues={setEditModalFieldValues} />
      <DeleteModal
        setDeleteModal={setIsDeleteModal}
        deleteModal={isDeleteModal}
        submitTitle='Yes'
        cancelTitle='No'
        title='Do you want to discard this ?'
        onSubmit={handleDeleteSubmit}
        onCancel={() => handleClearForm()}
      />
    </div>

  );
}

export default EmailTemplates;
