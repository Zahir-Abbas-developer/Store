import { useState, useEffect } from "react";

// Ant Components
import { Modal, Table } from "antd";
import { ColumnsType } from "antd/es/table";

// Components
import SwitchWrapper from "../../../shared/SwitchWrapper/SwitchWrapper";

// RTK Query
import { useUpdateCrossAllocationMutation } from "../../../store/Slices/Setting/JobRole";

// Utils and Constants
import AppSnackbar from "../../../utils/AppSnackbar";
import { ROLES } from "../../../constants/Roles";

// SCSS
import "./SettingJobRole.scss";


function CrossAllocationModal(props: any) {
  const { showCrossAllocation, setShowCrossAllocation, getTableRowValues, setGetFieldValues, role, crossAllocationRecord, handleResetFormValues } = props;
  const [checkedCrossAllocation, setCheckedCrossAllocation] = useState<any>(getTableRowValues.crossAllocation || []);
  const [switchStates, setSwitchStates] = useState<{ [id: string]: boolean }>({});

  const [updateCrossAllocation] = useUpdateCrossAllocationMutation();

  // ============================== Cross Allocation Switch ==============================
  const handleSwitchChange = (record: any, checked: any) => {
    if (checked) {
      setCheckedCrossAllocation((prevCheckedCrossAllocation: any) => {
        const newCheckedCrossAllocation = [...prevCheckedCrossAllocation, record];
        handleUpdateCrossAllocation(newCheckedCrossAllocation, record, checked);
        return newCheckedCrossAllocation;
      });

    } else {
      setCheckedCrossAllocation((prevCheckedCrossAllocation: any) => {
        const newCheckedCrossAllocation = prevCheckedCrossAllocation.filter((value: any) => value !== record);
        handleUpdateCrossAllocation(newCheckedCrossAllocation, record, checked);
        return newCheckedCrossAllocation;
      })
    };
  }

  // ============================== Calling this function immediately after the above function to pass the updated state value for swtich statement ==============================
  const handleUpdateCrossAllocation = async (newCheckedCrossAllocation: any, record: any, checked:any) => {



    setSwitchStates((prevSwitchStates: any) => ({
      ...prevSwitchStates,
      [record]: checked,
    }));


    const newPayload = {
      name: getTableRowValues?.name,
      shortForm: getTableRowValues?.shortForm,
      userRole: getTableRowValues?.userRole,
      crossAllocation: newCheckedCrossAllocation
    };
    try {
      await updateCrossAllocation({ id: getTableRowValues?._id, payload: newPayload }).unwrap();
      setGetFieldValues({ ...getTableRowValues, crossAllocation: newCheckedCrossAllocation })
      AppSnackbar({ type: "success", messageHeading: "Successfully Updated!", message: "Information updated successfully" });
    } catch (error: any) {

      setSwitchStates((prevSwitchStates: any) => ({
        ...prevSwitchStates,
        [record]: !checked,
      }));


      AppSnackbar({
        type: "error",
        messageHeading: "Error",
        message: error?.data?.message ?? "Something went wrong!"
      });
    }
  };


  // ============================== Resetting Values and States ==============================
  const handleCrossAllocationReset = () => {
    handleResetFormValues({});
    setShowCrossAllocation(false);
  }


  useEffect(() => {
    setCheckedCrossAllocation(getTableRowValues?.crossAllocation)
  }, [getTableRowValues?.crossAllocation])


// ============================== Cross Allocation Table Headers ==============================
  const columns: ColumnsType<any> = [
    {
      title: "S.No",
      dataIndex: "_id",
      key: "_id",
      render: (value: any, record: any, index: any) => {
        return <span>{index + 1}</span>;
      },
    },
    {
      title: "Job Roles",
      dataIndex: "name",
    },


    {
      title: "Enable Cross-Allocation",
      dataIndex: "crossAllocation",
      key: 'crossAllocation',
      render: (_: any, record: any) => {
        return (
          <SwitchWrapper
            // checked={getTableRowValues.crossAllocation.includes(record?._id)}
            name="crossAllocation"
            onChange={(checked: any) => handleSwitchChange(record._id, checked)}
            checked={switchStates[record._id]}
            defaultChecked={!!getTableRowValues.crossAllocation.includes(record?._id)}
            // onChange={(checked: any) => handleSwitchChange(record, checked)}
          />
        )
      },
    },

    ...(role === ROLES.client ? [
      {
        title: "With Same Rates",
        dataIndex: "withSameRates",
        render: (_: any, text: any) => (
          <SwitchWrapper
            // checked={!!text?.crossAllocation.includes(text?._id)}
            name="withSameRates"
          // onChange={(checked: any) => handleSwitchChange(text._id, checked)}
          />
        ),
      }
    ] : []
    )
  ];


  return (
    <Modal
      title="Cross Allocation"
      open={showCrossAllocation}
      onOk={() => handleCrossAllocationReset()}
      onCancel={() => handleCrossAllocationReset()}
      centered
      className="cross-allocation"
      footer={false}
      width="888px"
      maskClosable={false}
    >
      {/* ============================== Cross Allocation Table ============================== */}
      <Table scroll={{ x: 768 }} columns={columns} dataSource={crossAllocationRecord} pagination={false} className="common-setting-table" style={{ marginTop: "20px", marginBottom: "50px" }} />
    </Modal>

  );
}

export default CrossAllocationModal;
