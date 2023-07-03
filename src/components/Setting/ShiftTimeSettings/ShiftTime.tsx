import { useEffect, useState } from "react";

// Ant Component
import { Col, Row, Select, Button, Spin } from 'antd';

// RTK Query
import { useGetShifTimeFilterQuery, useGetShifTimeQuery, usePostShifTimeMutation } from "../../../store/Slices/Setting/ShiftTimeSettings";

// Components
import BreadCrumb from "../../../layout/BreadCrumb/BreadCrumb";
import AppSnackbar from "../../../utils/AppSnackbar";


// Utils and Packages
import { ROLES } from "../../../constants/Roles";
import { renderDashboard } from "../../../utils/useRenderDashboard";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import localizedFormat from 'dayjs/plugin/localizedFormat';

// Assets
import LongDayShift from "../../../assets/images/Setting/LongDayShift.png";
import Afternoon from "../../../assets/images/Setting/Afternoon.png";
import Morningshift from "../../../assets/images/Setting/Morningshift.png";
import NightShift from "../../../assets/images/Setting/NightShift.png";

// SCSS
import "./ShiftTime.scss";


// ------- Neccesary For Dayjs for Time Zone and Format -------
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localizedFormat);



interface shiftTimeInterface {
  longDayShiftStart: {
    longDayShiftStartTime: string,
    longDayShiftFormat: string,
  },
  longDayShiftEnd: {
    longDayShiftEndTime: string,
    longDayShiftFormat: string,
  },
  morningShiftStart: {
    morningShiftStartTime: string,
    longDayShiftFormat: string,
  },
  morningShiftEnd: {
    morningShiftEndTime: string,
    longDayShiftFormat: string,
  },
  afternoonShiftStart: {
    afternoonShiftStartTime: string,
    longDayShiftFormat: string,
  },
  afternoonShiftEnd: {
    afternoonShiftEndTime: string,
    longDayShiftFormat: string,
  },
  nightShiftStart: {
    nightShiftStartTime: string,
    longDayShiftFormat: string,
  },
  nightShiftEnd: {
    nightShiftEndTime: string,
    longDayShiftFormat: string,
  }
}


const ShiftTime = () => {
  const paramsObj: any = {};

  const { role, id }: any = JSON.parse(localStorage.getItem("careUserData") || "{}");

  const [time, setTime] = useState<shiftTimeInterface>({
    longDayShiftStart: {
      longDayShiftStartTime: '',
      longDayShiftFormat: '',
    },
    longDayShiftEnd: {
      longDayShiftEndTime: '',
      longDayShiftFormat: '',
    },
    morningShiftStart: {
      morningShiftStartTime: '',
      longDayShiftFormat: '',
    },
    morningShiftEnd: {
      morningShiftEndTime: '',
      longDayShiftFormat: '',
    },
    afternoonShiftStart: {
      afternoonShiftStartTime: '',
      longDayShiftFormat: '',
    },
    afternoonShiftEnd: {
      afternoonShiftEndTime: '',
      longDayShiftFormat: '',
    },
    nightShiftStart: {
      nightShiftStartTime: '',
      longDayShiftFormat: '',
    },
    nightShiftEnd: {
      nightShiftEndTime: '',
      longDayShiftFormat: '',
    },
  });


  const [selectedFilterValue, setSelectedFilterValue] = useState<string>('');


  // -------------- Query Parameters of Filter --------------
  const { data, isSuccess } = useGetShifTimeFilterQuery({ refetchOnMountOrArgChange: true });

  if (role === ROLES.client) {
    paramsObj["careHomeId"] = id
  }

  if (role !== ROLES.client && selectedFilterValue) paramsObj["careHomeId"] = selectedFilterValue;

  // &careHomeId=
  // role === ROLES.client ? id : selectedFilterValue

  const query = "?" + new URLSearchParams(paramsObj).toString();
  const { data: filterData, isLoading: isFilterLoading } = useGetShifTimeQuery({ query });
  const [postShifTime] = usePostShifTimeMutation();
  const timeZone = "Asia/Karachi";


  let shiftTimeData: any;
  let unchangeUserData: any;
  let optimizedUserRoleDropdown: any;

  if (isSuccess) {
    unchangeUserData = data;
    shiftTimeData = filterData;

    // Making new array for dropdown from data
    let userRoleDropdown = unchangeUserData?.data?.result?.map((item: any) => ({ value: item?._id, label: item?.clientName }));

    // removing duplicates from dropdowns
    optimizedUserRoleDropdown = Array.from(new Set(userRoleDropdown?.map((option: any) => option?.label))).map((label: any) => userRoleDropdown?.find((option: any) => option.label === label));
  }

  // -------------------- Time Format Handler for Shift Time  --------------------
  const timeHandler = (time: any) => {
    return dayjs(dayjs().format('YYYY-MM-DD') + ' ' + time, 'YYYY-MM-DD hh:mm:ss').tz(timeZone).format()
  }





  const handleShiftTimeSubmit = async () => {

    // console.log(dayjs().format('YYYY-MM-DD') + ' ' + time.afternoonShiftEnd.afternoonShiftEndTime);
    // console.log(dayjs(dayjs().format('YYYY-MM-DD') + ' ' + time.afternoonShiftEnd.afternoonShiftEndTime, 'YYYY-MM-DD hh:mm:ss').tz(timeZone).format());
    let longDayStartCombinedDate = `${time?.longDayShiftStart?.longDayShiftStartTime}:00`;
    let longDayEndCombinedDate = `${time?.longDayShiftEnd?.longDayShiftEndTime}:00`;

    let morningShiftStartCombinedDate = `${time?.morningShiftStart?.morningShiftStartTime}:00`;
    let morningShiftEndCombinedDate = `${time?.morningShiftEnd?.morningShiftEndTime}:00`;

    let afternoonShiftStartCombinedDate = `${time?.afternoonShiftStart?.afternoonShiftStartTime}:00`;
    let afternoonShiftEndCombinedDate = `${time?.afternoonShiftEnd?.afternoonShiftEndTime}:00`;

    let nightShiftStartCombinedDate = `${time?.nightShiftStart?.nightShiftStartTime}:00`;
    let nightShiftEndCombinedDate = `${time?.nightShiftEnd?.nightShiftEndTime}:00`;




    const newFormattedPayload = {
      longDay: {
        startTime: timeHandler(longDayStartCombinedDate),
        endTime: timeHandler(longDayEndCombinedDate)
      },
      morningShift: {
        startTime: timeHandler(morningShiftStartCombinedDate),
        endTime: timeHandler(morningShiftEndCombinedDate)
      },
      afterNoon: {
        startTime: timeHandler(afternoonShiftStartCombinedDate),
        endTime: timeHandler(afternoonShiftEndCombinedDate),
      },
      nightShift: {
        startTime: timeHandler(nightShiftStartCombinedDate),
        endTime: timeHandler(nightShiftEndCombinedDate)
      },
    }

    try {
      await postShifTime({ payload: newFormattedPayload, id: role === ROLES.client ? id : selectedFilterValue }).unwrap();
      AppSnackbar({ type: "success", messageHeading: "Successfully Updated!", message: "Information Updated successfully" });

    } catch (error: any) {
      AppSnackbar({
        type: "error",
        messageHeading: "Error",
        message: error?.data?.message ?? "Something went wrong!"
      });
    }
  }




  useEffect(() => {
    if (shiftTimeData?.data !== null) {
      setTime(
        {
          longDayShiftStart: {
            longDayShiftStartTime: dayjs.utc(shiftTimeData?.data?.longDay?.startTime).tz(timeZone).format('HH:mm A').split(' ')[0],
            longDayShiftFormat: dayjs.utc(shiftTimeData?.data?.longDay?.startTime).tz(timeZone).format('HH:mm A').split(' ')[1]
          },
          longDayShiftEnd: {
            longDayShiftEndTime: dayjs.utc(shiftTimeData?.data?.longDay?.endTime).tz(timeZone).format('HH:mm A').split(' ')[0],
            longDayShiftFormat: dayjs.utc(shiftTimeData?.data?.longDay?.endTime).tz(timeZone).format('HH:mm A').split(' ')[1]
          },
          morningShiftStart: {
            morningShiftStartTime: dayjs.utc(shiftTimeData?.data?.morningShift?.startTime).tz(timeZone).format('HH:mm A').split(' ')[0],
            longDayShiftFormat: dayjs.utc(shiftTimeData?.data?.morningShift?.startTime).tz(timeZone).format('HH:mm A').split(' ')[1]
          },
          morningShiftEnd: {
            morningShiftEndTime: dayjs.utc(shiftTimeData?.data?.morningShift?.endTime).tz(timeZone).format('HH:mm A').split(' ')[0],
            longDayShiftFormat: dayjs.utc(shiftTimeData?.data?.morningShift?.endTime).tz(timeZone).format('HH:mm A').split(' ')[1]
          },
          afternoonShiftStart: {
            afternoonShiftStartTime: dayjs.utc(shiftTimeData?.data?.afterNoon?.startTime).tz(timeZone).format('HH:mm A').split(' ')[0],
            longDayShiftFormat: dayjs.utc(shiftTimeData?.data?.afterNoon?.startTime).tz(timeZone).format('HH:mm A').split(' ')[1]
          },
          afternoonShiftEnd: {
            afternoonShiftEndTime: dayjs.utc(shiftTimeData?.data?.afterNoon?.endTime).tz(timeZone).format('HH:mm A').split(' ')[0],
            longDayShiftFormat: dayjs.utc(shiftTimeData?.data?.afterNoon?.endTime).tz(timeZone).format('HH:mm A').split(' ')[1]
          },
          nightShiftStart: {
            nightShiftStartTime: dayjs.utc(shiftTimeData?.data?.nightShift?.startTime).tz(timeZone).format('HH:mm A').split(' ')[0],
            longDayShiftFormat: dayjs.utc(shiftTimeData?.data?.nightShift?.startTime).tz(timeZone).format('HH:mm A').split(' ')[1]
          },
          nightShiftEnd: {
            nightShiftEndTime: dayjs.utc(shiftTimeData?.data?.nightShift?.endTime).tz(timeZone).format('HH:mm A').split(' ')[0],
            longDayShiftFormat: dayjs.utc(shiftTimeData?.data?.nightShift?.endTime).tz(timeZone).format('HH:mm A').split(' ')[1]
          }
        }
      )
    }

    // If not else, it will take the current date time of your pc
    else {
      setTime({
        longDayShiftStart: {
          longDayShiftStartTime: "",
          longDayShiftFormat: ""
        },
        longDayShiftEnd: {
          longDayShiftEndTime: "",
          longDayShiftFormat: ""
        },
        morningShiftStart: {
          morningShiftStartTime: "",
          longDayShiftFormat: ""
        },
        morningShiftEnd: {
          morningShiftEndTime: "",
          longDayShiftFormat: ""
        },
        afternoonShiftStart: {
          afternoonShiftStartTime: "",
          longDayShiftFormat: ""
        },
        afternoonShiftEnd: {
          afternoonShiftEndTime: "",
          longDayShiftFormat: ""
        },
        nightShiftStart: {
          nightShiftStartTime: "",
          longDayShiftFormat: ""
        },
        nightShiftEnd: {
          nightShiftEndTime: "",
          longDayShiftFormat: ""
        }
      });
    }

  }, [shiftTimeData?.data, unchangeUserData])


  return (
    <>
      <BreadCrumb breadCrumbItems={[
        {
          title: "Shift Time",
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
      <div className='Shift-Time-Settings'>
        {role !== ROLES.client && (
          <div className="header bg-white border-radius-8">
            <>
              <label className="fs-14 fw-600">Care Home</label><br />
              <Select
                style={{ marginTop: "5px" }}
                className="d-flex"
                placeholder="Select care home"
                onChange={(value: string, event: any) => setSelectedFilterValue(value)}
                value={!selectedFilterValue ? undefined : selectedFilterValue}
                options={optimizedUserRoleDropdown}
                dropdownStyle={{ textTransform: 'capitalize' }}
              />
            </>

          </div>
        )}
        {!isFilterLoading ? (
          (selectedFilterValue || role === ROLES.client) && (
            <div className="shift-slots bg-white border-radius-8">
              <Row className="shift-row border-radius-10 align-items-center">
                <Col xxl={6} xl={6} lg={6} md={6} xs={24}>
                  <div className="start-time d-flex align-items-center">
                    <img src={LongDayShift} alt="shiftImg" width="50px" height="50px" />
                    <h6 className="m-0 fs-16 fw-500">Long Day Shift</h6>
                  </div>
                </Col>
                <Col xxl={14} xl={16} lg={18} md={16} xs={24}>
                  <Row>
                    <Col xxl={12} xl={12} lg={12} md={12} xs={24}>
                      <div className="start-time d-flex align-items-center">
                        <p className="m-0 fs-16 fw-500">Start Time :</p>
                        <input type="time" value={time.longDayShiftStart.longDayShiftStartTime} onChange={(event: any) => setTime({
                          ...time, longDayShiftStart: {
                            ...time.longDayShiftStart,
                            longDayShiftStartTime: event.target.value
                          }
                        })} />
                        <Select
                          className="d-flex"
                          value={time?.longDayShiftStart?.longDayShiftFormat}
                          style={{ width: 60 }}
                          onChange={(value: any) => setTime({ ...time, longDayShiftStart: { ...time.longDayShiftStart, longDayShiftFormat: value } })}
                          options={[
                            { value: 'PM', label: 'PM' },
                            { value: 'AM', label: 'AM' },
                          ]}
                        />
                      </div>
                    </Col>
                    <Col xxl={12} xl={12} lg={12} md={12} xs={24}>
                      <div className="start-time d-flex align-items-center">
                        <p className="m-0 fs-16 fw-500">End Time :</p>
                        <input type="time" value={time.longDayShiftEnd.longDayShiftEndTime ? time.longDayShiftEnd.longDayShiftEndTime : "----"} onChange={(event: any) => setTime({
                          ...time, longDayShiftEnd: {
                            ...time.longDayShiftEnd,
                            longDayShiftEndTime: event.target.value
                          }
                        })} />
                        <Select
                          className="d-flex"
                          style={{ width: 60 }}
                          value={time?.longDayShiftEnd?.longDayShiftFormat || "--"}
                          onChange={(value: any) => setTime({ ...time, longDayShiftEnd: { ...time.longDayShiftEnd, longDayShiftFormat: value } })}
                          options={[
                            { value: 'PM', label: 'PM' },
                            { value: 'AM', label: 'AM' },
                          ]}
                        />
                      </div>
                    </Col>
                  </Row>
                </Col>

              </Row>
              <Row className="shift-row border-radius-10 align-items-center">
                <Col xxl={6} xl={6} lg={6} md={6} xs={24}>
                  <div className="start-time d-flex align-items-center">
                    <img src={Morningshift} alt="shiftImg" width="50px" height="50px" />
                    <h6 className="m-0 fs-16 fw-500">Morning Shift</h6>
                  </div>
                </Col>
                <Col xxl={14} xl={16} lg={18} md={16} xs={24}>
                  <Row>
                    <Col xxl={12} xl={12} lg={12} md={12} xs={24}>
                      <div className="start-time d-flex align-items-center">
                        <p className="m-0 fs-16 fw-500">Start Time :</p>
                        <input type="time" value={time.morningShiftStart.morningShiftStartTime} onChange={(event: any) => setTime({
                          ...time, morningShiftStart: {
                            ...time.morningShiftStart,
                            morningShiftStartTime: event.target.value
                          }
                        })} />
                        <Select
                          className="d-flex"
                          value={time?.morningShiftStart?.longDayShiftFormat}
                          onChange={(value: any) => setTime({ ...time, morningShiftStart: { ...time.morningShiftStart, longDayShiftFormat: value } })}
                          style={{ width: 60 }}
                          options={[
                            { value: 'PM', label: 'PM' },
                            { value: 'AM', label: 'AM' },
                          ]}
                        />
                      </div>
                    </Col>
                    <Col xxl={12} xl={12} lg={12} md={12} xs={24}>
                      <div className="start-time d-flex align-items-center">
                        <p className="m-0 fs-16 fw-500">End Time :</p>
                        <input type="time" value={time.morningShiftEnd.morningShiftEndTime} onChange={(event: any) => setTime({
                          ...time, morningShiftEnd: {
                            ...time.morningShiftEnd,
                            morningShiftEndTime: event.target.value
                          }
                        })} />
                        <Select
                          className="d-flex"
                          value={time?.morningShiftEnd?.longDayShiftFormat}
                          onChange={(value: any) => setTime({ ...time, morningShiftEnd: { ...time.morningShiftEnd, longDayShiftFormat: value } })}
                          style={{ width: 60 }}
                          options={[
                            { value: 'PM', label: 'PM' },
                            { value: 'AM', label: 'AM' },
                          ]}
                        />
                      </div>
                    </Col>
                  </Row>
                </Col>

              </Row>
              <Row className="shift-row border-radius-10 align-items-center">
                <Col xxl={6} xl={6} lg={6} md={6} xs={24}>
                  <div className="start-time d-flex align-items-center">
                    <img src={Afternoon} alt="shiftImg" width="50px" height="50px" />
                    <h6 className="m-0 fs-16 fw-500">Afternoon Shift</h6>
                  </div>
                </Col>
                <Col xxl={14} xl={16} lg={18} md={16} xs={24}>
                  <Row>
                    <Col xxl={12} xl={12} lg={12} md={12} xs={24}>
                      <div className="start-time d-flex align-items-center">
                        <p className="m-0 fs-16 fw-500">Start Time :</p>
                        <input type="time" value={time.afternoonShiftStart.afternoonShiftStartTime} onChange={(event: any) => setTime({
                          ...time, afternoonShiftStart: {
                            ...time.afternoonShiftStart,
                            afternoonShiftStartTime: event.target.value
                          }
                        })} />
                        <Select
                          className="d-flex"
                          value={time?.afternoonShiftStart?.longDayShiftFormat}
                          onChange={(value: any) => setTime({ ...time, afternoonShiftStart: { ...time.afternoonShiftStart, longDayShiftFormat: value } })}
                          style={{ width: 60 }}
                          options={[
                            { value: 'PM', label: 'PM' },
                            { value: 'AM', label: 'AM' },
                          ]}
                        />
                      </div>
                    </Col>
                    <Col xxl={12} xl={12} lg={12} md={12} xs={24}>
                      <div className="start-time d-flex align-items-center">
                        <p className="m-0 fs-16 fw-500">End Time :</p>
                        <input type="time" value={time.afternoonShiftEnd.afternoonShiftEndTime} onChange={(event: any) => setTime({
                          ...time, afternoonShiftEnd: {
                            ...time.afternoonShiftEnd,
                            afternoonShiftEndTime: event.target.value
                          }
                        })} />
                        <Select
                          className="d-flex"
                          value={time?.afternoonShiftEnd?.longDayShiftFormat}
                          onChange={(value: any) => setTime({ ...time, afternoonShiftEnd: { ...time.afternoonShiftEnd, longDayShiftFormat: value } })}
                          style={{ width: 60 }}
                          options={[
                            { value: 'PM', label: 'PM' },
                            { value: 'AM', label: 'AM' },
                          ]}
                        />
                      </div>
                    </Col>
                  </Row>
                </Col>

              </Row>
              <Row className="shift-row border-radius-10 align-items-center">
                <Col xxl={6} xl={6} lg={6} md={6} xs={24}>
                  <div className="start-time d-flex align-items-center">
                    <img src={NightShift} alt="shiftImg" width="50px" height="50px" />
                    <h6 className="m-0 fs-16 fw-500">Night Shift</h6>
                  </div>
                </Col>
                <Col xxl={14} xl={16} lg={18} md={16} xs={24}>
                  <Row>
                    <Col xxl={12} xl={12} lg={12} md={12} xs={24}>
                      <div className="start-time d-flex align-items-center">
                        <p className="m-0 fs-16 fw-500">Start Time :</p>
                        <input type="time" value={time?.nightShiftStart?.nightShiftStartTime} onChange={(event: any) => setTime({
                          ...time, nightShiftStart: {
                            ...time.nightShiftStart,
                            nightShiftStartTime: event.target.value
                          }
                        })} />
                        <Select
                          className="d-flex"
                          value={time?.nightShiftStart?.longDayShiftFormat}
                          onChange={(value: any) => setTime({ ...time, nightShiftStart: { ...time?.nightShiftStart, longDayShiftFormat: value } })}
                          style={{ width: 60 }}
                          options={[
                            { value: 'PM', label: 'PM' },
                            { value: 'AM', label: 'AM' },
                          ]}
                        />
                      </div>
                    </Col>
                    <Col xxl={12} xl={12} lg={12} md={12} xs={24}>
                      <div className="start-time d-flex align-items-center">
                        <p className="m-0 fs-16 fw-500">End Time :</p>
                        <input type="time" value={time?.nightShiftEnd?.nightShiftEndTime} onChange={(event: any) => setTime({
                          ...time, nightShiftEnd: {
                            ...time.nightShiftEnd,
                            nightShiftEndTime: event.target.value
                          }
                        })} />
                        <Select
                          className="d-flex"
                          value={time?.nightShiftEnd?.longDayShiftFormat}
                          onChange={(value: any) => setTime({ ...time, nightShiftEnd: { ...time?.nightShiftEnd, longDayShiftFormat: value } })}
                          style={{ width: 60 }}
                          options={[
                            { value: 'PM', label: 'PM' },
                            { value: 'AM', label: 'AM' },
                          ]}
                        />
                      </div>
                    </Col>
                  </Row>
                </Col>

              </Row>
              <Button type="primary" onClick={handleShiftTimeSubmit}> Save</Button>
            </div>
          )
        ) : role === ROLES.client ? <Spin size="large" style={{ width: "100%", margin: "auto" }} /> : ""
        }
      </div>
    </>


  )
}

export default ShiftTime