import { useState } from "react";
import { Button, Col, Row, Slider } from "antd";
import StaffAllocationInnerFilters from "./StaffAllocationInnerFilters/StaffAllocationInnerFilters";
import "./StaffAllocationFilters.scss";
import {
  useAllocateCarersMutation,
  useDeleteStaffMutation,
} from "../../../store/Slices/StaffAllocation";
import AppSnackbar from "../../../utils/AppSnackbar";
import DeleteModal from "../../../shared/DeleteModal/DeleteModal";

const handleStyling: any = {
  color: "blue",
  border: "7px solid white",
  borderRadius: 5,
  height: 29,
  width: 16,
  position: "absolute",
  top: -4,
  boxShadow: "0px 0px 4px 1px rgba(0, 0, 0, 0.25)",
};

const StaffAllocationFilters = (props: any) => {
  const {
    filterValues,
    setFilterValues,
    careHomeOptions,
    userTypeOptions,
    selectedRows,
    careHomeId,
    selectedRowKeys,
    setSelectedRowKeys,
  } = props;

  const [inputValue, setInputValue] = useState(50);
  const [isAllocateCarerModal, setIsAllocateCarerModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const onChange = (newValue: number) => {
    setInputValue(newValue);
  };

  //Allocate Carer
  const [allocateCare] = useAllocateCarersMutation();

  const handleAllocate = async () => {
    const payload = {
      clientId: [careHomeId],
      staffId: selectedRows,
    };
    const { data }: any = await allocateCare(payload);
    if (data) {
      setSelectedRowKeys([]);
      AppSnackbar({ type: "success", message: data?.message });
    }
  };

  //Delete Staff
  const [deleteStaff] = useDeleteStaffMutation();

  const handleDeleteSubmit = async () => {
    const payload: any = {
      staffId: selectedRows,
    };
    const { data }: any = await deleteStaff({ id: careHomeId, payload });
    if (data) {
      setSelectedRowKeys([]);
      AppSnackbar({ type: "success", message: data?.message });
    }
  };

  return (
    <div className="inner-wrap-filters">
      <div className="select-radius-wrapper">
        <Row align="middle" className="sliderbar-wrapper">
          <div className="slider-text">Select Radius:</div>
          <div className="slider-text">0</div>
          <Col style={{ width: "100%", maxWidth: "294px", marginTop: -10 }}>
            <Slider
              className="slider-bar"
              handleStyle={handleStyling}
              trackStyle={{
                background: "linear-gradient(90deg, #6BCAFF 0%, #426BFF 100%)",
                height: 12,
                borderRadius: 6,
              }}
              railStyle={{
                background: "linear-gradient(90deg, #FFFFFF 0%, #EAEAEA 100%)",
                height: 12,
                borderRadius: 6,
              }}
              min={0}
              max={100}
              onChange={onChange}
              value={typeof inputValue === "number" ? inputValue : 0}
            />
          </Col>
          <Col>
            <p className="slider-text">{inputValue}</p>
          </Col>
        </Row>
      </div>
      <div className="bottom-inset-filters d-flex justify-between align-center">
        <StaffAllocationInnerFilters
          careHomeOptions={careHomeOptions}
          userTypeOptions={userTypeOptions}
          filterValues={filterValues}
          setFilterValues={setFilterValues}
        />

        <div className="bottom-filters-buttons">
          <Button className="bottom-filter-btn apply-filter-btn">
            Apply Filter
          </Button>
          <Button
            disabled={selectedRowKeys.length < 1}
            className={`bottom-filter-btn allocate-staff-btn ${selectedRowKeys.length < 1
                ? "bottom-filter-btn allocate-staff-btn disabled-btns"
                : "bottom-filter-btn allocate-staff-btn"
              }`}
            onClick={handleAllocate}
          >
            Allocate Staff
          </Button>
          <Button
            disabled={selectedRowKeys.length < 1}
            onClick={handleDeleteSubmit}
            className={`bottom-filter-btn remove-staff-btn ${selectedRowKeys.length < 1
                ? "bottom-filter-btn allocate-staff-btn disabled-btns"
                : "bottom-filter-btn remove-staff-btn"
              }`}
          >
            Remove Staff
          </Button>
        </div>
      </div>
    
      <DeleteModal deleteModal={deleteModal} title={"Are you sure you want to remove this record?"} submitTitle={"Yes, Remove"} cancelTitle={"Cancel"} setDeleteModal={() => setDeleteModal(false)} />
    </div>
  );
};

export default StaffAllocationFilters;
