import { useState } from "react";
import { useNavigate } from "react-router";


// Ant Components
import { Avatar, Popover, Space } from "antd";
import { CaretDownOutlined, MenuOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";


// Components
import NotificationsPopup from "./Notifications";
import ViewProfile from "../../components/OnBoarding/Carer/ViewProfile/ViewProfile";
import ClientViewProfileModal from "../../components/ClientManager/ClientViewProfileModal/ClientViewProfileModal";


// RTK Hooks
import { useGetRequestByIdQuery } from "../../store/Slices/OnBoarding";


// Utils and Packages
import { v4 as uuidv4 } from "uuid";


// Assets
import SearchImg from "../../assets/images/sidebar/Search.png";
import { ReactComponent as User } from "../../assets/icons/sidebar/user.svg";
import { ReactComponent as Logout } from "../../assets/icons/sidebar/logout.svg";
import { ReactComponent as ChangePassword } from "../../assets/icons/sidebar/changePassword.svg";
import { Badge } from 'antd';

// Styles
import "./Header.scss";
import { ROLES } from "../../constants/Roles";
import { useGetRoleLabel } from "../../utils/useGetRole";
import { useLogoutMutation } from "../../store/Slices/Signin";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../store";
import { openDrawer } from "../../store/Slices/OpenDrawerSlice";
import { Link } from "react-router-dom";



const TopHeader = ({ setIsOpen }: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { products }: any = useAppSelector((state) => state.products);
  const [open, setOpen] = useState<boolean>(false);
  const [isProfileModal, setIsProfileModal] = useState<boolean>(false);
  const [isExpandedSEarchbar, setIsExpandedSearchbar] = useState<boolean>(false);
  const [viewClientModal, setviewClientModal] = useState<boolean>(false)

  // ========================== CONSTANTS ==========================
  const { role, id }: any = JSON.parse(localStorage.getItem("careUserData") || "{}");
  let roleName: { name: string, label: string } | undefined;
  roleName = useGetRoleLabel(role);
  


  const handleExpand = () => {
    const search: any = document.querySelector(".search-input");
    search.classList.toggle("search-expanded");
    setIsExpandedSearchbar(!isExpandedSEarchbar);
  };

  // ========================== RTK Query ==========================
  const { data, isSuccess } = useGetRequestByIdQuery({ id, detail: "ABOUT" })
  const [logOutUser]:any=useLogoutMutation()

  let carerProfile: any;
  if (isSuccess) {
    carerProfile = data
  }

  // ========================== Profile Dropdown ==========================
  const profileDropdown = [
    
    {
      title: "Change Password",
      icon: <ChangePassword />,
    },
    {
      title: "Logout",
      icon: <Logout />,
    },
  ];

const handleOpenDrawer=()=>{
  dispatch(openDrawer())
}
  return (
    <div
      className="header"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "end",
        gap: "20px",
        marginRight: "20px",
        background: "transparent"
      }}
    >

      <div className={`container ${isExpandedSEarchbar && "expand-container"}`}>
        <input className="search-input" type="text" placeholder="Type here" />
        <button className="search-wrapper" onClick={handleExpand}>
          {/* <img src={SearchImg} alt="searchImg" /> */}
        </button>
       
      </div>
      <Badge   count={products?.products?.length} showZero style={{color:"white"}}>
          <ShoppingCartOutlined style={{ fontSize: '24px' }} onClick={handleOpenDrawer} />
        </Badge>
      {/* <NotificationsPopup /> */}
      
      <div className="adminDetail">
        <Popover
          rootClassName="profile-dropdown"
          content={
            <div>
              {profileDropdown.map((item) => (
                <div
                  key={uuidv4()}
                  onClick={() => {
                    if (item?.title === "Logout") {
                      localStorage.removeItem("careUserData");
                      localStorage.clear();
                      navigate("/login");
                      logOutUser()
                      
                    }
                    if (item?.title === "Change Password") {
                      navigate("/change-password");
                    }
                    if (item?.title === "Profile Preview") {
                      setIsProfileModal(true);
                      setviewClientModal(true);
                    }
                  }}
                  className='profile-item'
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "15px",
                    marginBlock: "10px",
                  }}
                >
                  {item.icon}
                  <span className="fs-14 title-color cursor-pointer">{item.title}</span>
                </div>
              ))}
            </div>
          }
          trigger="click"
          open={open}
          onOpenChange={() => setOpen(false)}
        >
          <Space onClick={() => setOpen(!open)}>
            {!role ? <Link to="/login"><UserOutlined style={{fontSize: '24px'}} /></Link>:
            <Avatar style={{ verticalAlign: "middle" }} size="large">
              <img src={
                carerProfile?.data?.userprofile?.profilePhoto
                  ? `https://rnd-s3-public-dev-001.s3.eu-west-2.amazonaws.com/${carerProfile?.data?.userprofile?.profilePhoto?.mediaId}.${carerProfile?.data?.userprofile?.profilePhoto?.mediaMeta?.extension}`
                  : `https://ui-avatars.com/api/?rounded=true&name=${carerProfile?.data?.userprofile?.firstName} ${carerProfile?.data?.userprofile?.firstName}`
              } alt="userimg" width={40} />
            </Avatar>}
            <div
              className="details"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <p
                className="m-0 label-color fw-600 fs-14 cursor-pointer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
               {role && <> <span style={{ height: "20px" }}>
                  {
                    carerProfile?.data?.userprofile?.firstName ? (carerProfile?.data?.userprofile?.firstName + " " + carerProfile?.data?.userprofile?.lastName) : carerProfile?.data?.userprofile?.clientName
                  }
                  <CaretDownOutlined className="fs-16" style={{fontSize: '24px'}} />
                </span>
                <span
                  className="fs-12 fw-400"
                  style={{ textTransform: "capitalize" }}
                >
                {role==="admin"? <p  style={{marginTop:"0px",color:"white"}}>Admin</p> :<p style={{marginTop:"0px",color:"white"}}>User</p>}  
                </span></>}
              </p>
            </div>
          </Space>
        </Popover>
      </div>

      <div className="togglebar" onClick={() => setIsOpen(true)}>
        <MenuOutlined className="fs-18  text-white" />
      </div>

      {role === ROLES.client ? <ClientViewProfileModal viewClientModal={viewClientModal} setviewClientModal={setviewClientModal} />
        : <ViewProfile
          selectedTableData={id}
          IsProfileModal={isProfileModal}
          setIsProfileModal={setIsProfileModal}
        />
      }
    </div>

  );
};

export default TopHeader;
