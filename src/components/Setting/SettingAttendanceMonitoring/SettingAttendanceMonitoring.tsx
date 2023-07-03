import { InfoCircleOutlined } from "@ant-design/icons";
import { Button, Col, Row, Spin } from "antd";
import SwitchWrapper from "../../../shared/SwitchWrapper/SwitchWrapper";
import Counter from "../SettingsStaff/ProfileMetrics/Counter/Counter";
import "./SettingAttendanceMonitoring.scss";
import { useState, useEffect } from "react";
import { useGetEAttendanceQuery, usePostEAttendanceMutation } from "../../../store/Slices/Setting/EAttendance";
import AppSnackbar from "../../../utils/AppSnackbar";
import BreadCrumb from "../../../layout/BreadCrumb/BreadCrumb";
import { renderDashboard } from "../../../utils/useRenderDashboard";
import path from "path";

function SettingAttendanceMonitoring() {

  const [eAttendanceData, setEAttendanceData] = useState({
    checkInRadius: "",
    activate: false,
  })
  const { role }: any = JSON.parse(localStorage.getItem("careUserData") || "{}");


  const { data, isLoading, isSuccess, isError } = useGetEAttendanceQuery({ refetchOnMountOrArgChange: true });
  const [postEAttendance] = usePostEAttendanceMutation();


  let EAttendanceData: any;

  if (isSuccess) {
    EAttendanceData = data
  }


  const handleEAttendanceSubmit = async () => {
    const payload = {
      checkInRadius: eAttendanceData?.checkInRadius,
      activate: eAttendanceData?.activate
    }
    try {
      await postEAttendance({ payload }).unwrap();
      AppSnackbar({
        type: "success",
        messageHeading: "Success!",
        message: "Information created successfully",
      });

    } catch (error: any) {
      AppSnackbar({
        type: "error",
        messageHeading: "Error",
        message: error?.data?.message ?? "Something went wrong!",
      });
    }
  }

  const handleUpdateCount = (value: any) => {
    setEAttendanceData({
      ...eAttendanceData,
      checkInRadius: value,
    })
  }


  useEffect(() => {
    setEAttendanceData({
      checkInRadius: EAttendanceData?.data?.checkInRadius,
      activate: EAttendanceData?.data?.activate
    })
  }, [EAttendanceData?.data?.checkInRadius, EAttendanceData?.data?.activate])


  return (
    <>
        <BreadCrumb breadCrumbItems={[
        {
          title: "E-Sign Monitoring",
          path: "",
        },
        {
          title: "Dashboard",
          path: renderDashboard(role),
        },
        {
          title: "Settings",
          path: "/settings",
        }
      ]} />
    
    <div className="setting-attendance-monitoring border-radius-8">
      <div className="heading">
        <h1 className="fs-16 fw-500 m-0">Electronic Attendance Monitoring
          <InfoCircleOutlined />
        </h1>
      </div>

      {(isLoading && !isError) ? (
        <Spin size="large" style={{ width: "100%", margin: "auto" }} />
      ) : (
        <div className="counting-meters">
          <Row>
            <Col lg={8} xs={24} className="mx-30">
              <div className="counter-plus-mins d-flex align-items-center">
                <p className="m-0 fs-12 fw-600 from-text">Check-in Radius:</p>
                <Counter countValue={eAttendanceData?.checkInRadius} noLimit handleUpdateCount={handleUpdateCount} />
                <p className="m-0">Meters</p>
              </div>
            </Col>
          </Row>

          <Row>
            <Col lg={12} xs={24}>
              <div className="d-flex align-items-center">
                <p className="m-0 fs-12 fw-600">Turn this on if you wanted to activate Electronic Attendance Monitoring ? </p>
                <SwitchWrapper name="ActivateElectronicAttendance" checked={!!eAttendanceData?.activate} onChange={(value: any) => setEAttendanceData({ ...eAttendanceData, activate: value })} />
              </div>

            </Col>
          </Row>

        </div>
      )
      }


      <Button className="btn-secondary" onClick={handleEAttendanceSubmit}>Save</Button>

    </div>
    </>

  );
}

export default SettingAttendanceMonitoring;
