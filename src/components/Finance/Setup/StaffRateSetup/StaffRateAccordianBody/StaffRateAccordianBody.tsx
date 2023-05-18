import { useState } from "react";
import { Avatar, Button, Form, Input, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { StaffStatus } from "../StaffRateSetupData";
import AppSnackbar from "../../../../../utils/AppSnackbar";
import AvatarImg from "../../../../../assets/images/finance-setup/avatar.png";
import { usePostAddStaffCategoryRequestMutation, usePostAddStaffRateRequestMutation } from "../../../../../store/Slices/FinanceSetup";
import DownArrow from "../../../../../assets/icons/finance-setup/down-arrow.png";
import { useGetClientsQuery } from "../../../../../store/Slices/Setting/StaffSettings/RegisterationConfiguration";
import { useGetJobRequestQuery } from "../../../../../store/Slices/Setting/JobRole";
import "./StaffRateAccordianBody.scss";

interface Props {
  accordianName: string;
  staffRateData: any
}
const StaffRateAccordiansBody = (props: Props) => {
  const { accordianName, staffRateData } = props;
  const [userData, setUserData] = useState<any>([]);
  const [userDataArray, setUserDataArray] = useState<any>([]);

  const [postStaffRate] = usePostAddStaffRateRequestMutation()
  const [postStaffCategoryRate] = usePostAddStaffCategoryRequestMutation()
  const { data: clientsData, isSuccess: clientIsSuccess } = useGetClientsQuery({ refetchOnMountOrArgChange: true, query: `page=1&limit=5000&` })
  const { data: staffData, isSuccess: staffIsSuccess } = useGetJobRequestQuery({ refetchOnMountOrArgChange: true })

  let clientsNames: any;
  if (clientIsSuccess) {
    clientsNames = clientsData
  }
  let staffCategory: any;
  if (staffIsSuccess) {
    staffCategory = staffData
  }

  const clientsNameOptions: any = clientsNames?.data?.result?.map((item: any) => ({
    key: item?._id,
    label: item?.clientName,
    value: item?._id
  }))
  const staffCategoryOptions: any = staffCategory?.data?.result?.map((item: any) => ({
    key: item?._id,
    label: item?.shortForm,
    value: item?._id
  }))



  const handleUserCategory = async (values: any, userId: string) => {
    const clientBasedRate = accordianName === 'client_based_rate'
    const staffRatePayload = {
      data: [{
        ...clientBasedRate && {
          careHomeId: userId ? userId : values.staffName,
        },
        ...clientBasedRate && {
          userId: userId ? userId : values.staffName,
        },
        categoryId: values?.category,
        weekDay: values?.weekDay,
        saturday: values?.saturday,
        sunday: values?.sunday,
        bankHoliday: values?.bankHoliday,
        rateType: clientBasedRate ? 'client_based_rate' : 'staff_rate',
      }]
    }
    const staffCategoryRatePayload = {
      categoryId: values?.category,
      staffStatus: values?.status,
      weekDay: values?.weekDay,
      saturday: values?.saturday,
      sunday: values?.sunday,
      bankHoliday: values?.bankHoliday,
      rateType: "staff_category_rate"
    }
    if (accordianName === 'staff_category_rate') {
      const { data: addStaffCategoryData, error: addStaffCategoryError }: any = await postStaffCategoryRate({ payload: staffCategoryRatePayload });
      if (addStaffCategoryData) {
        setUserData([])
        setUserDataArray([])
        AppSnackbar({ type: "success", message: "Added Successfully" });
      }
      if (addStaffCategoryError) {
        setUserData([])
        setUserDataArray([])
        AppSnackbar({ type: "error", message: "Not Added Successfully" });
      }
    } else {
      const { data: addStaffData, error: addStaffError }: any = await postStaffRate({ payload: staffRatePayload });
      if (addStaffData) {
        setUserData([])
        setUserDataArray([])
        AppSnackbar({ type: "success", message: "Added Successfully" });
      }
      if (addStaffError) {
        setUserData([])
        setUserDataArray([])
        AppSnackbar({ type: "error", message: "Not Added Successfully" });
      }
    }

  }

  const categoryObj = { category: "", weekDay: "", saturday: "", sunday: "", bankHoliday: "" };

  const handleAddSubItem = (id: string) => {
    setUserData([...userData, categoryObj]);
  };

  const handleAddNewStaff = () => {
    setUserDataArray([...userDataArray, { user: '', ...categoryObj }])
  };

  const handleAddSubItemCategory = () => {
    setUserData([...userData, categoryObj])
  }
  return (
    <div className="staff-rate-accordian">
      {staffRateData?.data?.result?.map((users: any, index: number) => {
        return <div style={{ paddingBottom: "1rem" }}>
          <div className="d-flex" style={{ alignItems: 'baseline' }}>
            {accordianName !== "staff_category_rate" && (
              <div style={{ minHeight: "100%", position: 'relative' }}>
                {index === 0 && <p className="fw-600 m-0" style={{ paddingLeft: ".5rem" }}>
                  {accordianName === "client_based_rate" ? "Client" : "Staff"} Name
                </p>}
                <div
                  className="d-flex align-center"
                  style={{
                    height: "47px",
                    border: "1px solid #D9DBE9",
                    borderLeft: "5px solid #65CDF0",
                    width: "268px",
                    paddingLeft: "1rem",
                    position: 'inherit',
                    top: '10px',
                  }}
                >
                  {accordianName !== "client_based_rate" && (
                    <Avatar size="small" style={{ height: "29.27px", width: "29.27px" }} icon={<img src={AvatarImg} alt="avatar-img" />} />
                  )}
                  {accordianName !== "client_based_rate" && <p className="m-0" style={{ paddingLeft: '10px' }}>{users?.carer?.clientName ?? `${users?.carer?.firstName} ${users?.carer?.lastName}`}</p>}
                  {accordianName === "client_based_rate" && <p className="m-0" style={{ paddingLeft: '10px' }}>{users?.careHome?.clientName ?? `-`}</p>}
                </div>
              </div>
            )}
            <div style={{ height: "100%", marginLeft: accordianName === "staff_category_rate" ? "0" : "20px" }}>
              <div className="right-wrapper">
                {accordianName === "staff_category_rate" && <div className="d-flex" style={{ gap: "1rem" }}>
                  <div>
                    {index === 0 && <p className="fw-600 m-0" style={{ paddingLeft: ".5rem" }}>
                      Staff Category
                    </p>}
                    <div className="fs-16 fw-500 d-flex align-center render-user-data" >
                      {users?.category?.shortForm}
                    </div>
                  </div>
                  {accordianName === "staff_category_rate" && (
                    <div>
                      {index === 0 && <p className="fw-600 m-0" style={{ paddingLeft: ".5rem" }}>
                        Staff Status
                      </p>}
                      <div className="fs-16 fw-500 d-flex align-center render-user-data" >
                        {users?.staffStatus}
                      </div>
                    </div>
                  )}
                  <div>
                    {index === 0 && <p className="fw-600 m-0" style={{ paddingLeft: ".5rem" }}>
                      Week Day
                    </p>}
                    <div className="fs-16 fw-500 d-flex align-center render-user-data" >
                      {users?.weekDay}
                    </div>
                  </div>
                  <div>
                    {index === 0 && <p className="fw-600 m-0" style={{ paddingLeft: ".5rem" }}>
                      Saturday
                    </p>}
                    <div className="fs-16 fw-500 d-flex align-center render-user-data" >
                      {users?.saturday}
                    </div>
                  </div>
                  <div>
                    {index === 0 && <p className="fw-600 m-0" style={{ paddingLeft: ".5rem" }}>
                      Sunday
                    </p>}
                    <div className="fs-16 fw-500 d-flex align-center render-user-data" >
                      {users?.sunday}
                    </div>
                  </div>
                  <div>
                    {index === 0 && <p className="fw-600 m-0" style={{ paddingLeft: ".5rem" }}>
                      Bank Holiday
                    </p>}
                    <div className="fs-16 fw-500 d-flex align-center render-user-data" >
                      {users?.bankHoliday}
                    </div>
                  </div>
                </div>}
                {accordianName !== "staff_category_rate" && users?.rates?.map((item: any, i: number) => {
                  return <div className="d-flex" style={{ gap: "1rem" }}>
                    <div>
                      {index === 0 && <p className="fw-600 m-0" style={{ paddingLeft: ".5rem" }}>
                        Staff Category
                      </p>}
                      <div className="fs-16 fw-500 d-flex align-center render-user-data" >
                        {item?.category?.shortForm}
                      </div>
                    </div>
                    {accordianName === "staff_category_rate" && (
                      <div>
                        {index === 0 && <p className="fw-600 m-0" style={{ paddingLeft: ".5rem" }}>
                          Staff Status
                        </p>}
                        <div className="fs-16 fw-500 d-flex align-center render-user-data" >
                          {item?.staffStatus}
                        </div>
                      </div>
                    )}
                    <div>
                      {index === 0 && <p className="fw-600 m-0" style={{ paddingLeft: ".5rem" }}>
                        Week Day
                      </p>}
                      <div className="fs-16 fw-500 d-flex align-center render-user-data" >
                        {item?.weekDay}
                      </div>
                    </div>
                    <div>
                      {index === 0 && <p className="fw-600 m-0" style={{ paddingLeft: ".5rem" }}>
                        Saturday
                      </p>}
                      <div className="fs-16 fw-500 d-flex align-center render-user-data" >
                        {item?.saturday}
                      </div>
                    </div>
                    <div>
                      {index === 0 && <p className="fw-600 m-0" style={{ paddingLeft: ".5rem" }}>
                        Sunday
                      </p>}
                      <div className="fs-16 fw-500 d-flex align-center render-user-data" >
                        {item?.sunday}
                      </div>
                    </div>
                    <div>
                      {index === 0 && <p className="fw-600 m-0" style={{ paddingLeft: ".5rem" }}>
                        Bank Holiday
                      </p>}
                      <div className="fs-16 fw-500 d-flex align-center render-user-data" >
                        {item?.bankHoliday}
                      </div>
                    </div>
                  </div>
                })}

                {accordianName !== "staff_category_rate" && userData.map((obj: any, i: number) => (
                  <Form onFinish={(values) => handleUserCategory(values, users?._id)} style={{ marginTop: '1rem' }}>
                    <div className="d-flex" style={{ gap: "1rem" }}>
                      <Form.Item name="category" >
                        <Select
                          options={staffCategoryOptions}
                          suffixIcon={<img src={DownArrow} alt="select-arrow" />}
                          className={`staff-select`}
                          style={{ borderRadius: "0px", width: "100%", marginBottom: "1rem" }}
                          placeholder={<span style={{ color: '#A0A3BD' }}>Select Category</span>}
                        />
                      </Form.Item>
                      {accordianName === "staff_category_rate" && (
                        <Form.Item name="status" >
                          <Select
                            options={StaffStatus}
                            suffixIcon={<img src={DownArrow} alt="select-arrow" />}
                            className={`staff-select`}
                            style={{ borderRadius: "0px", width: "100%", marginBottom: "1rem" }}
                            placeholder={<span style={{ color: '#A0A3BD' }}>Select Status</span>}
                          />
                        </Form.Item>
                      )}
                      <Form.Item name="weekDay" >
                        <Input style={{ borderRadius: "0", height: "47px", width: "268px", border: '1px solid #D9DBE9' }} />
                      </Form.Item>
                      <Form.Item name="saturday" >
                        <Input style={{ borderRadius: "0", height: "47px", width: "268px", border: '1px solid #D9DBE9' }} />
                      </Form.Item>
                      <Form.Item name="sunday" >
                        <Input style={{ borderRadius: "0", height: "47px", width: "268px", border: '1px solid #D9DBE9' }} />
                      </Form.Item>
                      <Form.Item name="bankHoliday" >
                        <Input style={{ borderRadius: "0", height: "47px", width: "268px", border: '1px solid #D9DBE9' }} />
                      </Form.Item>
                      <Button type="primary" htmlType="submit" style={{ height: "47px" }}>Save</Button>
                    </div>
                  </Form>
                ))}
              </div>
            </div>
          </div>
          {(accordianName === "staff_rate" && staffRateData?.data?.result) && (
            <Button
              className="d-flex align-center fs-14 fw-400"
              style={{ width: "100%", marginTop: userData.length === 0 ? '1rem' : '', height: "47px", paddingLeft: '10px', borderLeft: "5px solid #65CDF0", color: "#A0A3BD", borderRadius: 0 }}
              onClick={() => handleAddSubItem(users.id)}
              block
              icon={<PlusOutlined style={{ color: "#A0A3BD" }} />}
            >
              Add SubItems
            </Button>
          )}
        </div>
      })}
      {accordianName === "staff_category_rate" && userData.map((obj: any, i: number) => (
        <Form onFinish={(values) => handleUserCategory(values, '')} style={{ marginTop: '1rem' }}>
          <div className="d-flex" style={{ gap: "1rem" }}>
            <Form.Item name="category" >
              <Select
                options={staffCategoryOptions}
                suffixIcon={<img src={DownArrow} alt="select-arrow" />}
                className={`staff-select`}
                style={{ borderRadius: "0px", width: "100%", marginBottom: "1rem" }}
                placeholder={<span style={{ color: '#A0A3BD' }}>Select Category</span>}
              />
            </Form.Item>
            {accordianName === "staff_category_rate" && (
              <Form.Item name="status" >
                <Select
                  options={StaffStatus}
                  suffixIcon={<img src={DownArrow} alt="select-arrow" />}
                  className={`staff-select`}
                  style={{ borderRadius: "0px", width: "100%", marginBottom: "1rem" }}
                  placeholder={<span style={{ color: '#A0A3BD' }}>Select Status</span>}
                />
              </Form.Item>
            )}
            <Form.Item name="weekDay" >
              <Input style={{ borderRadius: "0", height: "47px", width: "268px", border: '1px solid #D9DBE9' }} />
            </Form.Item>
            <Form.Item name="saturday" >
              <Input style={{ borderRadius: "0", height: "47px", width: "268px", border: '1px solid #D9DBE9' }} />
            </Form.Item>
            <Form.Item name="sunday" >
              <Input style={{ borderRadius: "0", height: "47px", width: "268px", border: '1px solid #D9DBE9' }} />
            </Form.Item>
            <Form.Item name="bankHoliday" >
              <Input style={{ borderRadius: "0", height: "47px", width: "268px", border: '1px solid #D9DBE9' }} />
            </Form.Item>
            <Button type="primary" htmlType="submit" style={{ height: "47px" }}>Save</Button>
          </div>
        </Form>
      ))}
      {(accordianName === "staff_category_rate" && staffRateData?.data?.result) && (
        <Button
          className="d-flex align-center fs-14 fw-400"
          style={{ width: "100%", marginBottom: '1rem', marginTop: userData.length === 0 ? '1rem' : '', height: "47px", paddingLeft: '10px', borderLeft: "5px solid #65CDF0", color: "#A0A3BD", borderRadius: 0 }}
          onClick={handleAddSubItemCategory}
          block
          icon={<PlusOutlined style={{ color: "#A0A3BD" }} />}
        >
          Add SubItems
        </Button>
      )}
      {userDataArray.map((data: any, i: number) => (
        <div style={{ paddingBottom: "1rem" }}>
          <div className="d-flex" style={{ alignItems: 'baseline' }}>
            <Form onFinish={(values) => handleUserCategory(values, '')} style={{ marginTop: '1rem' }}>
              <div className="d-flex" style={{ alignItems: 'baseline', gap: '1rem' }}>
                <div style={{ minHeight: "100%", position: 'relative' }}>
                  <div
                    className="d-flex align-center"
                    style={{
                      height: "47px",
                      border: "1px solid #D9DBE9",
                      borderLeft: "5px solid #65CDF0",
                      width: "268px",
                      paddingLeft: "1rem",
                      position: 'inherit',
                      top: '10px',
                    }}
                  >
                    {accordianName !== "client_based_rate" && (
                      <Avatar size="small" style={{ height: "29.27px", width: "29.27px" }} icon={<img src={AvatarImg} alt="avatar-img" />} />
                    )}
                    <Form.Item name="staffName">
                      <Select
                        suffixIcon={<img src={DownArrow} alt="select-arrow" />}
                        showArrow={accordianName === "client_based_rate" ? true : false}
                        bordered={false}
                        options={clientsNameOptions}
                        style={{ borderRadius: "0px", width: "100%" }}
                        placeholder={<span style={{ color: "#A0A3BD" }}>Select Name</span>}
                      />
                    </Form.Item>
                  </div>
                </div>
                <div className="d-flex" style={{ gap: "1rem" }}>

                  <Form.Item name="category" >
                    <Select
                      options={staffCategoryOptions}
                      suffixIcon={<img src={DownArrow} alt="select-arrow" />}
                      className={`staff-select`}
                      style={{ borderRadius: "0px", width: "100%", marginBottom: "1rem" }}
                      placeholder={<span style={{ color: '#A0A3BD' }}>Select Category</span>}
                    />
                  </Form.Item>
                  {accordianName === "staff_category_rate" && (
                    <Form.Item name="status" >
                      <Select
                        options={StaffStatus}
                        suffixIcon={<img src={DownArrow} alt="select-arrow" />}
                        className={`staff-select`}
                        style={{ borderRadius: "0px", width: "100%", marginBottom: "1rem" }}
                        placeholder={<span style={{ color: '#A0A3BD' }}>Select Status</span>}
                      />
                    </Form.Item>
                  )}
                  <Form.Item name="weekDay" >
                    <Input style={{ borderRadius: "0", height: "47px", width: "268px", border: '1px solid #D9DBE9' }} />
                  </Form.Item>
                  <Form.Item name="saturday" >
                    <Input style={{ borderRadius: "0", height: "47px", width: "268px", border: '1px solid #D9DBE9' }} />
                  </Form.Item>
                  <Form.Item name="sunday" >
                    <Input style={{ borderRadius: "0", height: "47px", width: "268px", border: '1px solid #D9DBE9' }} />
                  </Form.Item>
                  <Form.Item name="bankHoliday" >
                    <Input style={{ borderRadius: "0", height: "47px", width: "268px", border: '1px solid #D9DBE9' }} />
                  </Form.Item>
                  <Button type="primary" htmlType="submit" style={{ height: "47px" }}>Save</Button>
                </div>
              </div>
            </Form>
          </div>
          {/* <Button
            className="d-flex align-center fs-14 fw-400"
            style={{ width: "100%", height: "47px", paddingLeft: '10px', borderLeft: "5px solid #65CDF0", color: "#A0A3BD", borderRadius: 0 }}
            // onClick={() => handleAddSubItem(users.id)}
            block
            icon={<PlusOutlined style={{ color: "#A0A3BD" }} />}
          >
            Add SubItems
          </Button> */}
        </div>
      ))}
      {accordianName !== "staff_category_rate" && (
        <Button type="primary" htmlType="submit" className="border-radius-4 fs-16 fw-600" onClick={handleAddNewStaff} style={{ marginBlock: "1rem" }}>
          Add New {accordianName === "client_based_rate" ? "Client" : "Staff"}
        </Button>
      )}
    </div>
  );
};

export default StaffRateAccordiansBody;
