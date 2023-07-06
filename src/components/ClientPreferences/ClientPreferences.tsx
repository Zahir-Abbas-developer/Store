import { useState } from "react";


//  ============================ Ant Components ============================
import { ColumnsType } from "antd/es/table";
import { Avatar, Col, Dropdown, MenuProps, Row, Select, Table } from "antd";


// ============================ Components ============================
import DeleteModal from "../../shared/DeleteModal/DeleteModal";
import SelectWrapper from "../../shared/SelectWrapper/SelectWrapper";
import SwitchWrapper from "../../shared/SwitchWrapper/SwitchWrapper";


// ============================ RTK Hooks ============================
import { useAddPreferenceMutation, useDeletePreferenceMutation, useGetJobRolesQuery, useGetPreferenceQuery, useUpdatePreferenceMutation } from "../../store/Slices/ClientPreference";


// ============================ Utils ============================ 
import AppSnackbar from "../../utils/AppSnackbar";


// ============================ Assets ============================
import ActionIcon from "../../assets/icons/ShiftManger/action-icon.svg";
import EditIcon from "../../assets/icons/edit-blue.svg";
import DeleteIcon from "../../assets/icons/delete-icon-outlined.svg";
import RangerWrapper from "../../shared/RangeWrapper/RangerWrapper";


// ============================ Styling ============================ 
import "./ClientPreferences.scss";


// ============================ Language Preference Dropdown Data ============================ 
const staffCategoryOptions = [
  {
    id: "01",
    label: "English",
    value: "English"
  },
  {
    id: "02",
    label: "Polish",
    value: "Polish"
  },
  {
    id: "03",
    label: "Urdu",
    value: "Urdu"
  },
  {
    id: "04",
    label: "French",
    value: "French"
  },
  {
    id: "05",
    label: "Spanish",
    value: "Spanish"
  },
  {
    id: "06",
    label: "Italian",
    value: "Italian"
  },
  {
    id: "07",
    label: "Portuguese",
    value: "Portuguese"
  },
];

const ClientPreferences = () => {

  const [showPreference, setShowPreference] = useState({ locationRadius: false, experience: false, language: false });
  const [languageCheckedList, setLanguageCheckedList] = useState<any>();
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [pagination, setPagination] = useState({ limit: 10, page: 1 });
  const [preferenceValue, setPreferenceValue] = useState<any>({});
  const [actionType, setActionType] = useState("add");
  const [preferenceFilter, setPreferenceFilter] = useState({
    jobRole: "",
    locationRadius: 0,
    experience: "",
  });


  // ============================ RTK HOOKS ============================
  const { data: getJobRolesQuery } = useGetJobRolesQuery({});
  const { data: getPrefernceData, isLoading } = useGetPreferenceQuery({ page: pagination });
  const [deletePreference] = useDeletePreferenceMutation();
  const [createPreference] = useAddPreferenceMutation();
  const [updatePreference] = useUpdatePreferenceMutation();

  const getJobRole = getJobRolesQuery?.data?.result?.map((role: any) => {
    return { value: role?._id, label: role?.userRole };
  });


  // ====================================================================================
  const handlePreferenceFilter = (value: any, type: string) => {
    setPreferenceFilter({ ...preferenceFilter, [type]: value });
  };

  //  ============================ ADD Preference Handler ============================
  const handleAddPreference = async () => {
    const payload = {
      jobRole: preferenceFilter.jobRole,
      location: preferenceFilter.locationRadius.toString(),
      experience: preferenceFilter.experience,
      language: languageCheckedList?.map((item: any) => item?.value)?.join(", "),
    };

    try {
      if (actionType === "add") {
        await createPreference(payload).unwrap();
        AppSnackbar({ type: "success", messageHeading: "Successfully Added!", message: "Information added successfully" });
        setPreferenceFilter({
          jobRole: "",
          locationRadius: 0,
          experience: "",
        });
        setLanguageCheckedList([]);


      } else if (actionType === "edit") {
        await updatePreference({ id: preferenceValue?._id, payload }).unwrap();
        AppSnackbar({ type: "success", messageHeading: "Successfully Updated!", message: "Information updated successfully" });
        setPreferenceValue({});
      }

      setShowPreference({ locationRadius: false, experience: false, language: false });

    } catch (error: any) {
      AppSnackbar({
        type: "error",
        messageHeading: "Error",
        message: error?.data?.message ?? "Something went wrong!"
      });
    }

  };

  //  ============================ Delete Preference Handler ============================
  const handleDeletePreference = async () => {
    try {
      await deletePreference({ id: preferenceValue?._id }).unwrap();
      AppSnackbar({
        type: "success",
        messageHeading: "Deleted!",
        message: "Information deleted successfully",
      });
      setIsDeleteModal(false);

    } catch (error: any) {
      AppSnackbar({
        type: "error",
        messageHeading: "Error",
        message: error?.data?.message ?? "Something went wrong!",
      });
    }
  };


  //  ============================ Preference Table Action Dropdown Items ============================
  const items: MenuProps["items"] | undefined = [
    {
      label: (
        <div
          className="d-flex align-center"
          style={{ gap: "18px", padding: "12px" }}
          onClick={() => {
            setShowPreference({ locationRadius: true, experience: true, language: true });
            setPreferenceFilter({
              jobRole: preferenceValue?.jobRoleData?._id,
              locationRadius: Number(preferenceValue?.location),
              experience: preferenceValue?.experience
            })
            const newFormattedLanguages = preferenceValue?.language.split(", ")?.map((singleLanguage: any, index: any) => ({
              id: `${index + 1}`,
              label: singleLanguage,
              value: singleLanguage,
            }));
            // setLanguageCheckedList(preferenceValue.language.split());
            setLanguageCheckedList(newFormattedLanguages)
            setActionType("edit");
          }}
        >
          <img width={23} src={EditIcon} alt="AllocateStaff" />
          <span className="fs-14 fw-400 line-height-22 title-color">Edit</span>
        </div>
      ),
      key: "1",
    },
    {
      label: (
        <div className="d-flex align-center" style={{ gap: "18px", padding: "0 12px 12px 12px" }} onClick={() => setIsDeleteModal(true)}>
          <img width={20} src={DeleteIcon} alt="ModifyStaff" />
          <span className="fs-14 fw-400 line-height-22 title-color">Delete</span>
        </div>
      ),
      key: "2",
    },
  ];

  //  ============================ Preference Table ============================
  const columns: ColumnsType<any> = [
    {
      title: "",
      dataIndex: "jobRole",
      key: "jobRole",
      render: (_: any, data: any) => (
        <Avatar style={{ backgroundColor: "#65CDF0", verticalAlign: "middle" }} size="large">
          {data?.jobRoleData?.userRole}
        </Avatar>
      ),
    },
    {
      title: "Job Role",
      dataIndex: "role",
      key: "role",
      render: (_: any, data: any) => <span className="fs-14 fw-400 m-0 line-height-22 title-color">{data?.jobRoleData?.userRole}</span>,
    },
    {
      title: "Location Radius",
      dataIndex: "location",
      key: "location",
      render: (text: any) => <span className="fs-14 fw-400 m-0 line-height-22 title-color">{text}</span>,
    },
    {
      title: "Experience",
      dataIndex: "experience",
      key: "experience",
      render: (text: any) => <span className="fs-14 fw-400 m-0 line-height-22 title-color">{text}</span>,
    },
    {
      title: "Language Preference",
      dataIndex: "language",
      key: "language",
      render: (text: any) => <span className="fs-14 fw-400 m-0 line-height-22 title-color">{text}</span>,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, data: any) => (
        <div>
          <Dropdown menu={{ items }} placement="bottomRight" trigger={["click"]} overlayClassName="distraction-alerts-dropdown" className="actionDropDown ">
            <div className="border-color cursor-pointer" onClick={() => setPreferenceValue(data)}>
              <img src={ActionIcon} alt="" />
            </div>
          </Dropdown>
        </div>
      ),
    },
  ];

  //  ============================ Handle Switch Case for Different Preferences ============================
  const handleChangeSwitch = (value: any, type: string) => {
    switch (type) {
      case "location":
        setShowPreference({ locationRadius: !showPreference.locationRadius, experience: false, language: false });
        break;
      case "experience":
        setShowPreference({ experience: !showPreference.experience, locationRadius: false, language: false });
        break;
      case "language":
        setShowPreference({ experience: false, locationRadius: false, language: !showPreference.language });
        break;
      default:
        break;
    }
  };


  return (
    <div className="client-preferences-wrapper">
      <div className="client-preferences-wrap bg-white">
        <div className="client-preferences-select d-flex flex-column">
          <label>Job Role</label>
          <Select
            options={getJobRole}
            placeholder="Select Option"
            onChange={(e: any) => handlePreferenceFilter(e, "jobRole")}
            value={actionType === "add" ? (preferenceFilter.jobRole || "Selected Option") : preferenceValue?.jobRoleData?._id}
          />
        </div>
        <Row gutter={20}>
          <Col lg={8} md={12} sm={24} xs={24}>
            <SwitchWrapper checked={showPreference.locationRadius} label="Location Radius" name="locationRadius" onChange={(e: any) => handleChangeSwitch(e, "location")} />
            {showPreference.locationRadius && (
              <div style={{ margin: "15px 0 0 5px" }}>
                <RangerWrapper value={preferenceFilter?.locationRadius} onChange={(val: any) => handlePreferenceFilter(val, "locationRadius")} text="100" />
              </div>
            )}
          </Col>
          <Col lg={8} md={12} sm={24} xs={24}>
            <div>
              <SwitchWrapper checked={showPreference.experience} label="Experience Preference" name="experiencePreference" onChange={(e: any) => handleChangeSwitch(e, "experience")} />
              {showPreference.experience && (
                <div className="client-preferences-select" style={{ marginTop: "15px" }}>
                  <SelectWrapper
                    name="experience"
                    options={[
                      { value: "1-year", label: "0-1 Year" },
                      { value: "2-year", label: "1-2 Years" },
                      { value: "5-year", label: "2-5 Years" },
                      { value: "10-year", label: "5-10 Years" },
                      { value: "10+year", label: "10 Year +" },
                    ]}
                    label=""
                    required={false}
                    onChange={(e: any) => handlePreferenceFilter(e, "experience")}
                    placeHolder="Select Option"
                    defaultValue={actionType === "add" ? (preferenceFilter.experience || "Selected Option") : preferenceValue?.experience}
                  />
                </div>
              )}
            </div>
          </Col>
          
        </Row>
        {Object.values(showPreference).includes(true) && (
          <Row>
            <div className="care-booking-btn" style={{ marginTop: "30px" }}>
              <button
                type="button"
                className="cursor-pointer fs-16 line-height-22 white-color fw-600"
                onClick={() => {
                  // setShowPreference({ locationRadius: false, experience: false, language: false });
                  handleAddPreference();
                }}
              >
                Save
              </button>
            </div>
          </Row>
        )}
      </div>
      <div className="client-preferences-table">
        <Table
          columns={columns}
          dataSource={getPrefernceData?.data?.result}
          loading={isLoading}
          className="client-preferences-table-content"
          scroll={{ x: "max-content" }}
          pagination={{
            current: pagination.page,
            pageSize: pagination.limit,
            total: getPrefernceData?.data?.metadata?.total,
            onChange: (page, limit) => setPagination({ page, limit }),
          }}
        />
      </div>
      <DeleteModal
        setDeleteModal={setIsDeleteModal}
        deleteModal={isDeleteModal}
        submitTitle="Delete"
        cancelTitle="Cancel"
        title="Do you want to delete this preference"
        onSubmit={() => {
          handleDeletePreference();
        }}
        onCancel={() => setIsDeleteModal(false)}
      />
    </div>
  );
};

export default ClientPreferences;
