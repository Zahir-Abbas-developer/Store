import { Col, Input, Row } from "antd";

import SearchIcon from "../../../assets/icons/Search.png";
import BookingCard from "./BookingCard";
import "../UnpublishedShifts.scss";
import { useLocation } from "react-router";
import {
  useGetStaffDetailsQuery,
  useRequestConfirmationMutation,
} from "../../../store/Slices/ShiftManager";
import { useState } from "react";
import { debouncedSearch } from "../../../utils/utils";
import dayjs from "dayjs";
import AppSnackbar from "../../../utils/AppSnackbar";
import BreadCrumb from "../../../layout/BreadCrumb/BreadCrumb";

const BookStaff = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { state }: any = useLocation();
  const byDate = dayjs(state?.selectedShift?.shiftDate).format("YYYY-MM-DD");
  const date = dayjs(state?.selectedShift?.shiftDate).format("dddd MMMM D YYYY");

  const debouncedResults: any = (event: any) => {
    const { value } = event.target;
    debouncedSearch(value, setSearchTerm);
  };

  //Get Staff Lists
  const { data: staffList }: any = useGetStaffDetailsQuery({
    date: byDate || dayjs(state?.shiftDate).format("YYYY-MM-DD"),
    searchTerm,
    id: state?.selectedShift?.careHome?._id || state?.careHomeId,
  });

  const [confirmRequest] = useRequestConfirmationMutation();

  const handleConfirmRequest = async (staffId: string) => {
    const payload = {
      staffId,
      shiftId: state?.selectedShift?._id || state?.shiftId,
      confirmationReq: true,
    };
    const {error }: any = await confirmRequest(payload);
    if (error) {
      AppSnackbar({
        type: "error",
        message: error?.data?.error,
      })
    } else {
      AppSnackbar({
        type: "success",
        message: "Request Sent Successfully",
      })
    }
  };

  const handleAllocateStaff = async (staffId: string) => {
    const payload = {
      staffId,
      shiftId: state?.selectedShift?._id || state?.shiftId,
      confirmationReq: false,
    };
    const { error }: any = await confirmRequest(payload);
    if (error) {
      AppSnackbar({
        type: "error",
        message: error?.data?.error,
      })
    } else {
      AppSnackbar({
        type: "success",
        message: "Shift Allocated Successfully",
      })
    }
  };

  //BreadCrumb Items
  const breadCrumbItems = [
    {
      title: "Staff Availability",
      path: "",
    },
    {
      title: "Dashboard",
      path: "/dashboard",
    },
    {
      title: "Unpublished Shift",
      path: "/unpublished-shift",
    },
  ];

  return (
    <>
      <BreadCrumb breadCrumbItems={breadCrumbItems} />
      <div className="booking-staff-wrapper">
        <div className="header">
          <p className="date">
            <span>Date :</span> {date}
          </p>
          <div className="input-search-wrapper">
            <Input
              onChange={debouncedResults}
              placeholder="search"
              prefix={<img src={SearchIcon} alt="search icon" className="icon" />}
            />
          </div>
        </div>
        {staffList?.data?.response?.length > 0 ? (
          <div className="staff-details">
            <p className="title">Staff Details</p>
            <div className="content">
              <Row gutter={[24, 16]}>
                {staffList?.data?.response?.map((card: any) => (
                  <Col xs={24} md={12} lg={12} xl={8}>
                    <BookingCard
                      onConfirm={() => handleConfirmRequest(card?._id)}
                      onAllocate={() => handleAllocateStaff(card?._id)}
                      card={card}
                    />
                  </Col>
                ))}
              </Row>
            </div>
          </div>
        ) : (
          <h2 className="text-center fw-22 label-color">No Record</h2>
        )}
      </div>
    </>
  );
};

export default BookStaff;
