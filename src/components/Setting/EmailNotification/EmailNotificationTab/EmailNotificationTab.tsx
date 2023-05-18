import { useState } from "react";

// Ant Components
import { Button, Input, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";

// Components
import SwitchWrapper from "../../../../shared/SwitchWrapper/SwitchWrapper";
import AppSnackbar from "../../../../utils/AppSnackbar";

// Mock Data
import { DataType } from "../../../../mock/EmailNotification";

// RTK
import { useGetEmailTemplateSettingsQuery, useUpdateEmailTemplateSettingsMutation } from "../../../../store/Slices/Setting/EmailTemplateSettings";

// SCSS
import "./EmailNotificationTab.scss";

// Assets
import searchIcon from "../../../../assets/icons/search.svg";
import { debouncedSearch } from "../../../../utils/utils";

function EmailNotificationTab() {
  const [pagination, setPagination] = useState({ limit: 6, page: 1 });
  const [searchName, setSearchName] = useState<string>("");
  const [switchStates, setSwitchStates] = useState<{ [id: string]: boolean }>({});


  //query parameters of search and filter
  const paramsObj: any = {};
  if (searchName) paramsObj["search"] = searchName;
  // if (selectedFilterValue) paramsObj["applicationStage"] = selectedFilterValue;
  const query = "&" + new URLSearchParams(paramsObj).toString();


  const { data, isLoading, isSuccess } = useGetEmailTemplateSettingsQuery({ refetchOnMountOrArgChange: true, query,  pagination: pagination });
  const [updateEmailTemplateSettings] = useUpdateEmailTemplateSettingsMutation();

  let emailTemplateSettingsData: any;
  if (isSuccess) {
    emailTemplateSettingsData = data
  }


  const handleEmailNoticationChange = async (value: any, userId: string) => {
    setSwitchStates((prevSwitchStates: any) => ({
      ...prevSwitchStates,
      [userId]: value,
    }));



    try {
      await updateEmailTemplateSettings({ payload: { emailNotification: value }, id: userId }).unwrap();
      AppSnackbar({ type: "success", messageHeading: "Updated!", message: "Information updated successfully" });
      
    } catch (error: any) {

      setSwitchStates((prevSwitchStates: any) => ({
        ...prevSwitchStates,
        [userId]: !value,
      }));

      AppSnackbar({
        type: "error",
        messageHeading: "Error",
        message: error?.data?.message ?? "Something went wrong!"
      });
    }
  }

  const EmailNotificationColumns: ColumnsType<DataType> = [
    {
      title: 'Sr. No.',
      dataIndex: '_id',
      key: '_id',
      render: (value: any, record: any, index: any) => {
        return <span>{(index + pagination?.limit * pagination?.page) - pagination?.limit + 1}</span>;
      },
    },

    {
      title: 'Username',
      dataIndex: 'clientName',
      key: 'clientName',
    },

    {
      title: 'Yes / No',
      dataIndex: 'emailNotification',
      key: 'emailNotification',
      render: (_: any, text: any) => (
        <SwitchWrapper name="action"
          // checked={!!text.emailNotification}
          checked={switchStates[text._id]}
          defaultChecked={!!text.emailNotification}
          onChange={(value: any) => handleEmailNoticationChange(value, text?._id)} />
      ),
    },
  ];


  return (
    <div className='registration-configuration'>
      <div className="heading">
        <h1 className="fs-20 fw-500 m-0">Email Notification Settings </h1>
      </div>
      <div className="carer-option">
        <div className="filter-bar input-search-wrapper">
          <Space className='input-export-icons' size={[30, 10]}>
            <Input
              className="search-input"
              placeholder="Search by username"
              prefix={<img src={searchIcon} alt="searchIcon" width={24} height={24} style={{ marginRight: '0.623rem' }} />}
              onChange={(event: any) =>
                debouncedSearch(event.target.value, setSearchName)
              }
            />
          </Space>
        </div>
        <Table
          scroll={{ x: 768 }}
          className="common-setting-table"
          columns={EmailNotificationColumns}
          dataSource={emailTemplateSettingsData?.data?.result}
          locale={{ emptyText: !isLoading ? "No Data" : " " }}
          loading={isLoading}
          pagination={{
            current: pagination.page,
            pageSize: pagination.limit,
            total: emailTemplateSettingsData?.data?.metadata?.total,
            onChange: (page, limit) => setPagination({ page, limit }),
          }}
        />
        {/* <Button className="btn-secondary email-save-btn">Save</Button> */}
      </div>
    </div>
  );
}

export default EmailNotificationTab;
