import { useState } from "react";
// import "../../../../sass/common.scss";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Select, Spin, Switch, Table, Tooltip } from "antd";
import "./RegistrationConfiguration.scss";
import arrowDown from "../../../../assets/icons/arrow-down-icon.svg"
import { ColumnsType } from "antd/es/table";
import SwitchWrapper from "../../../../shared/SwitchWrapper/SwitchWrapper";
import { DataType } from "../../../../mock/SettingRegistrationConfiguration";
import { useGetRegisterationConfigurationQuery, useUpdateRegisterationConfigurationMutation } from "../../../../store/Slices/Setting/StaffSettings/RegisterationConfiguration";
import AppSnackbar from "../../../../utils/AppSnackbar";



function RegistrationConfiguration(props: any) {
  const { switchState, onSwitchToggle } = props;

  const [showTable, setShowTable] = useState(false);
  const [selectedFilterValue, setSelectedFilterValue] = useState<string | undefined>();
  const [switchStates, setSwitchStates] = useState<{ [id: string]: boolean }>({});

  const [pagination, setPagination] = useState({ limit: 999, page: 1 });
  const { data: registerationConfigApiData, isLoading: isDataLoading, isSuccess } = useGetRegisterationConfigurationQuery({ refetchOnMountOrArgChange: true, selectedFilterValue });
  const [updateRegisterationConfiguration] = useUpdateRegisterationConfigurationMutation();


  let registerationConfigData: any;
  let filteredRegisterationConfigTableArray: any;
  let registerationConfigTableArray: any;
  if (isSuccess) {
    registerationConfigData = registerationConfigApiData;

    if (registerationConfigData?.data) {
      // Create array for table of the registeration config data
      filteredRegisterationConfigTableArray = registerationConfigData?.data && Object?.entries(registerationConfigData?.data).slice(6).map(([key, value], index) => ({
        index,
        property: key,
        value
      }));

      // // Capitalize key values and add spaces after each capitalword
      // registerationConfigTableArray = filteredRegisterationConfigTableArray.map((obj:any, index:any) => {
      //   const formattedProperty = obj.property
      //     .split(/(?=[A-Z])/)
      //     .map((word:any) => word.charAt(0).toUpperCase() + word.slice(1))
      //     .join(' ');

      //   return { index, property: formattedProperty, value: obj.value };
      // });
    }
  }

  const handleSwitchToggle = async (index: any, value: any) => {

    setSwitchStates((prevSwitchStates: any) => ({
      ...prevSwitchStates,
      [index]: value,
    }));

    const newPayload = {
      userType: selectedFilterValue,
      aboutCandidate: index === "aboutCandidate" ? value : registerationConfigData?.data?.aboutCandidate,
      addressDetail: index === "addressDetail" ? value : registerationConfigData?.data?.addressDetail,
      backgroundChecks: index === "backgroundChecks" ? value : registerationConfigData?.data?.backgroundChecks,
      clientAddress: index === "clientAddress" ? value : registerationConfigData?.data?.clientAddress,
      clientAdminUsers: index === "clientAdminUsers" ? value : registerationConfigData?.data?.clientAdminUsers,
      clientProfileInfo: index === "clientProfileInfo" ? value : registerationConfigData?.data?.clientProfileInfo,
      clientPublicInformation: index === "clientPublicInformation" ? value : registerationConfigData?.data?.clientPublicInformation,
      declaration: index === "declaration" ? value : registerationConfigData?.data?.declaration,
      fullRecruitmentMadule: index === "fullRecruitmentMadule" ? value : registerationConfigData?.data?.fullRecruitmentMadule,
      idUpload: index === "idUpload" ? value : registerationConfigData?.data?.idUpload,
      manageDepartment: index === "manageDepartment" ? value : registerationConfigData?.data?.manageDepartment,
      medicalHistory: index === "medicalHistory" ? value : registerationConfigData?.data?.medicalHistory,
      otherInformation: index === "otherInformation" ? value : registerationConfigData?.data?.otherInformation,
      personalInfo: index === "personalInfo" ? value : registerationConfigData?.data?.personalInfo,
      photoIDBadge: index === "photoIDBadge" ? value : registerationConfigData?.data?.photoIDBadge,
      trainingAndWorkHistroy: index === "trainingAndWorkHistroy" ? value : registerationConfigData?.data?.trainingAndWorkHistroy,
      updatePrimeryEmailPhone: index === "updatePrimeryEmailPhone" ? value : registerationConfigData?.data?.updatePrimeryEmailPhone,
    };

    try {
      await updateRegisterationConfiguration({ payload: newPayload }).unwrap();
      AppSnackbar({ type: "success", messageHeading: "Successfully Updated!", message: "Information updated successfully" });
    } catch (error: any) {

      // If the API call fails, roll back the switch state
      setSwitchStates((prevSwitchStates: any) => ({
        ...prevSwitchStates,
        [index]: !value,
      }));

      AppSnackbar({
        type: "error",
        messageHeading: "Error",
        message: error?.data?.message ?? "Something went wrong!"
      });
    }
  };

  const handleFullRecruitmentModule = async (checked: any) => {

    const newPayload = {
      userType: selectedFilterValue,
      fullRecruitmentMadule: checked,
      aboutCandidate: registerationConfigData?.data?.aboutCandidate,
      personalInfo: registerationConfigData?.data?.personalInfo,
      addressDetail: registerationConfigData?.data?.addressDetail,
      photoIDBadge: registerationConfigData?.data?.photoIDBadge,
      idUpload: registerationConfigData?.data?.idUpload,
      trainingAndWorkHistroy: registerationConfigData?.data?.trainingAndWorkHistroy,
      backgroundChecks: registerationConfigData?.data?.backgroundChecks,
      otherInformation: registerationConfigData?.data?.otherInformation,
      medicalHistory: registerationConfigData?.data?.medicalHistory,
      declaration: registerationConfigData?.data?.declaration,
      clientProfileInfo: registerationConfigData?.data?.clientProfileInfo,
      clientAddress: registerationConfigData?.data?.clientAddress,
      clientPublicInformation: registerationConfigData?.data?.clientPublicInformation,
      manageDepartment: registerationConfigData?.data?.manageDepartment,
      clientAdminUsers: registerationConfigData?.data?.clientAdminUsers,
      updatePrimeryEmailPhone: registerationConfigData?.data?.updatePrimeryEmailPhone
    };
    
    try {
      await updateRegisterationConfiguration({ payload: newPayload }).unwrap();
      // setGetFieldValues({ ...getTableRowValues, crossAllocation: newCheckedCrossAllocation })
      AppSnackbar({ type: "success", messageHeading: "Successfully Updated!", message: "Information updated successfully" });

    } catch (error: any) {
      AppSnackbar({
        type: "error",
        messageHeading: "Error",
        message: error?.data?.message ?? "Something went wrong!"
      });
    }


  };


  const RegistrationConfigurationColumns: ColumnsType<DataType> = [
    {
      title: 'Sr. No.',
      dataIndex: '_id',
      key: '_id',
      render: (value: any, record: any, index: any) => {
        return <span>{(index + pagination?.limit * pagination?.page) - pagination?.limit + 1}</span>;
      },

    },
    {
      title: 'Menu Name',
      dataIndex: 'property',
      key: 'property',
      render: (_: any, text: any) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color' style={{ textTransform: "capitalize" }}>
          {/* TO add space and make it upper */}
          {/* {text.property.replace(/([a-z])([A-Z])/g, "$1 $2").toLowerCase().replace(/\b\w/g, (l:any) => l.toUpperCase())}   */}
          {text.property.replace(/([a-z])([A-Z])/g, '$1 $2')}
        </span>,
    },
    {
      title: 'Action',
      dataIndex: 'value',
      key: 'value',
      render: (value: any, record: any, index: any) => (
        <Switch
          // checked={value}
          checked={switchStates[record.property]}
          defaultChecked={!!value}
          onChange={(checked: any) => handleSwitchToggle(record.property, checked)}
          disabled={isDataLoading} // disable the switch while the API call is in progress
        />
      ),
    },
  ];

  return (
    <div className='registration-configuration'>
      <div className="heading">
        <h1 className="fs-20 fw-600 m-0">Registration Configuration
          <Tooltip placement="bottomLeft"
            color="#65CDF0"
            overlayInnerStyle={{
              width: "499px",
            }}
            title="You can shorten your candidate registration form by turning off some of these sections if they are not needed.">
            <InfoCircleOutlined />
          </Tooltip>

        </h1>

      </div>
      <div className="select-filter">
        <label className="fs-14 fw-600">Select User Type</label><br />
        <Select
          // onChange={selectedValue(value)}
          // onChange={(value) => handleSelectChange(value)}
          suffixIcon={<img src={arrowDown} alt="arrow down" />}
          popupClassName="app-select-popup-wrap-class"
          placeholder="Select user type"
          value={selectedFilterValue}
          onChange={(value: string) => setSelectedFilterValue(value)}
          options={[{
            value: "client",
            label: "Client",
          },
          {
            value: "carer",
            label: "Carer",
          },

          {
            value: "coordinator",
            label: "Care Coordinator",
          },
          {
            value: "instructor",
            label: "Instructor",
          },
          {
            value: "admin",
            label: "Admin",
          },
          ]}
        />
      </div>
      {isDataLoading ? (<Spin size="large" style={{ width: "100%", margin: "auto" }} />) : (
        !!selectedFilterValue &&
        <div className="carer-option">
          <div className="show-table d-flex align-items-center">
            <p className="m-0 fs-14 fw-600">Show Full Recruitment Module </p>
            <SwitchWrapper
              onChange={(checked: any) => handleFullRecruitmentModule(checked)}
              name="RecruitmentModule"
              checked={registerationConfigData?.data?.fullRecruitmentMadule}
            />
          </div>
          {!registerationConfigData?.data?.fullRecruitmentMadule &&
            <Table
              className="common-setting-table"
              columns={RegistrationConfigurationColumns}
              // dataSource={[registerationConfigData?.data]}
              dataSource={filteredRegisterationConfigTableArray && filteredRegisterationConfigTableArray}
              locale={{ emptyText: !isDataLoading ? "No Data" : " " }}
              loading={isDataLoading}
              pagination={false}
              scroll={{ x: 768 }}
            />
          }
        </div>
      )
      }
    </div>
  );
}

export default RegistrationConfiguration;
