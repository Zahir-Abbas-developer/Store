import { FC, lazy, LazyExoticComponent, Suspense } from "react";
import { Navigate } from "react-router-dom";


import Login from "./components/Authentication/Login";
import NotFound from "./components/Authentication/NotFound";
import SignUp from "./components/Authentication/SignUp";
import Unathorized from "./components/Authentication/Unathorized";
import ResetPassword from "./components/Authentication/ResetPassword";

import SystemPerformancePage from "./pages/SystemPerformance";
import RequireAuth from "./components/Authentication/RequireAuth";
import LoadingSvg from "../src/assets/Login/loader-icon.gif";
import { ROLES } from "./constants/Roles";
import path from "path";
import AddStyles from "./components/Admin/AddStyles/AddStyles";
import OurCollectionTabDetails from "./components/ClientTabs/OurCollectionTabDetails/OurCollectionTabDetails";
import OurCustomOrderDetails from "./components/ClientTabs/CustomOrderTabDetails/CustomOrderTabDetails";
import DashboardLayout from "./layout/Header/dashboard.layout";


const Loadable = (Component: LazyExoticComponent<FC>) => (props: any) =>
  (
    <Suspense
      fallback={
        <div
          className="d-flex justify-center align-center"
          style={{ height: "80vh" }}
        >
          <img src={LoadingSvg} height={200} width={200} alt="LoadingSvg" /> 
        </div>
      }
    >
      <Component {...props} />
    </Suspense>
  );



const ApiInventoryPage = Loadable(lazy(() => import("./pages/ApiInventory")));
const ReviewCareHomesPage = Loadable(lazy(() => import("./pages/Ratings")));


const DashboardPage = Loadable(lazy(() => import("./pages/Dashboard")));
const JacketDetailsPage = Loadable(lazy(() => import("./pages/JacketDetails")));
const CarerDashboardPage = Loadable(
  lazy(() => import("./pages/CarerDashboard"))
);
const OverAllRatingsPage = Loadable(
  lazy(() => import("./pages/OverAllRatings"))
);
const ClientManagerPage = Loadable(lazy(() => import("./pages/ClientManager")));
const ClientRegistration = Loadable(
  lazy(() => import("./pages/ClientManager/ClientRegisteration"))
);
const ManageGroups = Loadable(
  lazy(() => import("./pages/ClientManager/ManageGroups"))
);
const ProductDetailsPage = Loadable(
  lazy(() => import("./pages/ProductDetails"))
);
const BillingDetailsPage = Loadable(
  lazy(() => import("./pages/BillingDetails"))
);

//Cart Details
const CartDetailsPage=Loadable(
  lazy(() => import("./pages/CartDetails"))
);


const ClientProfilePage = Loadable(lazy(() => import("./pages/ClientProfile")));



//staff manager
const StaffManagerPage = Loadable(lazy(() => import("./pages/StaffManager")));
const AvailabilityCalendar = Loadable(
  lazy(() => import("./pages/StaffManager/AvailabilityCalendar"))
);
const StaffManagerSummary = Loadable(
  lazy(() => import("./pages/StaffManager/StaffManagerSummary"))
);
const StaffManagerOpenShift = Loadable(
  lazy(() => import("./pages/StaffManager/ShiftStatus/OpenShiftStatus"))
);
const StaffManagerTotalHours = Loadable(
  lazy(() => import("./pages/StaffManager/ShiftStatus/TotalHoursLifeTime"))
);
const StaffManagerConfirmedShift = Loadable(
  lazy(() => import("./pages/StaffManager/ShiftStatus/ConfirmedShift"))
);
const StaffManagerTotalHoursMonth = Loadable(
  lazy(() => import("./pages/StaffManager/ShiftStatus/TotalHoursThisMonth"))
);
const StaffManagerCompletedShift = Loadable(
  lazy(() => import("./pages/StaffManager/ShiftStatus/CompletedShift"))
);
const StaffAllocationPage = Loadable(
  lazy(() => import("./pages/StaffAllocation"))
);


const AddProductsPage = Loadable(
  lazy(() => import("./pages/AddProducts"))
);
const AddCategoriesPage = Loadable(
  lazy(() => import("./pages/AddCategories"))
);
const AddColorsPage = Loadable(
  lazy(() => import("./pages/AddColors"))
);
const AddStylesPage = Loadable(
  lazy(() => import("./pages/AddStyles"))
);
const AddOrdersPage = Loadable(
  lazy(() => import("./pages/AddOrders"))
);

const UnpublishedShiftPage = Loadable(
  lazy(() => import("./pages/UnpublishedShift"))
);
const BookStaffPage = Loadable(
  lazy(() => import("./pages/UnpublishedShift/BookStaff"))
);


const InstructorDashboard = Loadable(
  lazy(() => import("./pages/InstructorDashboard"))
);


// Reports and its Child Routes Ends Here

const SettingsPage = Loadable(lazy(() => import("./pages/Settings")));
const FAQsPage = Loadable(lazy(() => import("./pages/Help/FAQs")));
const BackUp = Loadable(lazy(() => import("./pages/BackUp")));
const AuditLogs = Loadable(lazy(() => import("./pages/AuditLogs")));

const RatingsFeedback = Loadable(
  lazy(() => import("./pages/RatingAndFeedback"))
);

const ItHelpDeskPage = Loadable(lazy(() => import("./pages/Help/ItHelpDesk")));
const ItHelpDeskAllTicketsPage = Loadable(
  lazy(() => import("./pages/Help/ItHelpDesk/AllTickets/AllTickets"))
);
// const ItHelpDeskPendingTicketsPage = Loadable(
//   lazy(() => import("./pages/Help/ItHelpDesk/PendingTickets/PendingTickets"))
// );
// const ItHelpDeskOnHoldTicketsPage = Loadable(
//   lazy(() => import("./pages/Help/ItHelpDesk/OnHoldTickets/OnHoldTickets"))
// );
// const ItHelpDeskClosedTicketsPage = Loadable(
//   lazy(() => import("./pages/Help/ItHelpDesk/ClosedTickets/ClosedTickets"))
// );
// const ItHelpDeskResolvedTicketsPage = Loadable(
//   lazy(() => import("./pages/Help/ItHelpDesk/ResolvedTickets/ResolvedTickets"))
// );
const ItHelpDeskSupportDashboard = Loadable(
  lazy(
    () => import("./pages/Help/ItHelpDesk/SupportDashboard/SupportDashboard")
  )
);
const KeyInfo = Loadable(lazy(() => import("./pages/Settings/KeyInfo")));
const JobRole = Loadable(lazy(() => import("./pages/Settings/JobRole")));
const ShiftTimeSettings = Loadable(
  lazy(() => import("./pages/Settings/ShiftTimeSettings"))
);
const Services=Loadable(
  lazy(() => import("./components/ClientTabs/Services/Services"))
);
const StaffSettings = Loadable(
  lazy(() => import("./pages/Settings/StaffSettings"))
);
const BankHolidays = Loadable(
  lazy(() => import("./pages/Settings/BankHolidays"))
);
const DBSConfiguration = Loadable(
  lazy(() => import("./pages/Settings/DBSConfiguration"))
);
const EmailNotification = Loadable(
  lazy(() => import("./pages/Settings/EmailNotification"))
);
const ResetEmailPhone = Loadable(
  lazy(() => import("./pages/Settings/ResetEmailPhone"))
);
const WeekStartDay = Loadable(
  lazy(() => import("./pages/Settings/WeekStartDay"))
);
const AgencyTermsCondition = Loadable(lazy(() => import("./pages/Settings/AgencyTermsConditionPage")));
const ClientTermsCondition = Loadable(lazy(() => import("./pages/Settings/ClientTermsConditionPage")));
const FestivalDayGreeting = Loadable(
  lazy(() => import("./pages/Settings/FestivalDayGreeting"))
);
const BreakTime = Loadable(lazy(() => import("./pages/Settings/BreakTime")));
const ChangePassword = Loadable(
  lazy(() => import("./pages/Settings/ChangePassword"))
);
const ElectronicAttendanceMonitoring = Loadable(
  lazy(() => import("./pages/Settings/ElectronicAttendanceMonitoring"))
);


const ClientUserManagement = Loadable(
  lazy(() => import("./pages/ClientUserManagement"))
);
const ClientPreferences = Loadable(
  lazy(() => import("./pages/ClientPreferences"))
);


const CarerMyCalendarPage = Loadable(
  lazy(() => import("./pages/CarerMyCalendar"))
);


const ContactDetailsPage=Loadable((lazy(()=>import("./pages/ContactDetails"))))


const SystemPerformance = Loadable(
  lazy(() => import("./pages/SystemPerformance"))
);

export const routes: any = [
  { path: "/", element: <Navigate to="services" /> },
  
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "change-password",
    element: <Login />,
  },
  {
    path: "sign-up",
    element: <Login />,
  },
  {
    path: "unauthorized",
    element: <Unathorized />,
  },
  {
    path: "reset-password",
    element: <ResetPassword />,
  },
  
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        path: "services",
        element: (
          // <RequireAuth allowedRoles={[ROLES.superAdmin]}>
            <Services />
          // </RequireAuth>
        ),
      },
      {
        path: "admin-dashboard",
        element: (
          <RequireAuth allowedRoles={[ROLES.admin]}>
            <StaffAllocationPage />
          </RequireAuth>
        ),
      },
      {
        path: "dashboard",
        element: (
          // <RequireAuth allowedRoles={[ROLES.user]}>
            <DashboardPage />
          //  </RequireAuth>
        ),
      },
      {
        path:"contact-details",
        element:<ContactDetailsPage/>
      },
      {
        path:"productDetails",
        element:<ProductDetailsPage/>
      },
      {
   
        path:"/productDetails/cart-details/checkout-details",
            
        element:(  <RequireAuth allowedRoles={[ROLES.user]}><BillingDetailsPage/>
         </RequireAuth>)
      },
      {
        path:"/add-products",
        element: (<RequireAuth allowedRoles={[ROLES.admin]}> <AddProductsPage/></RequireAuth>)  
      },
      {
        path:"/jacket-details",
        element:(<JacketDetailsPage/>)
      },
      {
        path:"/add-categories",
        element:(<RequireAuth allowedRoles={[ROLES.admin]}><AddCategoriesPage/></RequireAuth> )
      },
      {
        path:"/add-orders",
        element:(<RequireAuth allowedRoles={[ROLES.admin]}><AddOrdersPage/></RequireAuth> )
      },
      {
        path:"/add-colors",
        element:(<RequireAuth allowedRoles={[ROLES.admin]}><AddColorsPage/></RequireAuth> )
      },
      {
        path:"/add-styles",
        element:(<RequireAuth allowedRoles={[ROLES.admin]}><AddStyles/></RequireAuth> )
      },
      
      {
        path: "carer-dashboard",
        element: (
          <RequireAuth allowedRoles={[ROLES.carer]}>
            <CarerDashboardPage />
          </RequireAuth>
        ),
      },
      {
        path: "carer-my-calendar",
        element: (
          <RequireAuth allowedRoles={[ROLES.carer]}>
            <CarerMyCalendarPage />
          </RequireAuth>
        ),
      },
     
      {
        path: "system-performance",
        children: [
          {
            path: "",
            element: (
              <RequireAuth allowedRoles={[ROLES.superAdmin]}>
                <SystemPerformance />
              </RequireAuth>
            ),
          },
        ],
      },

     
      {
        path: "client-manager",
        element: (
          <RequireAuth allowedRoles={[ROLES.admin]}>
            <ClientManagerPage />
          </RequireAuth>
        ),
      },
      {
        path:"productDetails/cart-details",
        element:<CartDetailsPage/>
      },
      {
        path: "client-manager/client-registration/:id",
        element: (
          <RequireAuth allowedRoles={[ROLES.admin]}>
            <ClientRegistration />
          </RequireAuth>
        ),
      },
      {
        path: "client-manager/manage-groups",
        element: (
          <RequireAuth allowedRoles={[ROLES.admin]}>
            <ManageGroups />
          </RequireAuth>
        ),
      },
    

      {
        path: "client-profile",
        element: (
          <RequireAuth allowedRoles={[ROLES.user]}>
          
            <OurCollectionTabDetails/>
          </RequireAuth>
        ),
      },
     

      
      {
        path: "staff-manager",
        element: (
          <RequireAuth allowedRoles={[ROLES.admin]}>
            <StaffManagerPage />
          </RequireAuth>
        ),
      },
      {
        path: "staff-manager/:id/staff-summary",
        element: (
          <RequireAuth allowedRoles={[ROLES.admin]}>
            <StaffManagerSummary />
          </RequireAuth>
        ),
      },
      {
        path: "staff-manager/:id/staff-summary/availability-calendar",
        element: (
          <RequireAuth allowedRoles={[ROLES.admin]}>
            <AvailabilityCalendar />
          </RequireAuth>
        ),
      },
      {
        path: "staff-manager/:id/staff-summary/open-shift",
        element: (
          <RequireAuth allowedRoles={[ROLES.admin]}>
            <StaffManagerOpenShift />
          </RequireAuth>
        ),
      },
      {
        path: "staff-manager/:id/staff-summary/total-hours-life-time",
        element: (
          <RequireAuth allowedRoles={[ROLES.admin]}>
            <StaffManagerTotalHours />
          </RequireAuth>
        ),
      },
      {
        path: "staff-manager/:id/staff-summary/confirmed-shift",
        element: (
          <RequireAuth allowedRoles={[ROLES.admin]}>
            <StaffManagerConfirmedShift />
          </RequireAuth>
        ),
      },
      {
        path: "staff-manager/:id/staff-summary/total-hours-month",
        element: (
          <RequireAuth allowedRoles={[ROLES.admin]}>
            <StaffManagerTotalHoursMonth />
          </RequireAuth>
        ),
      },
      {
        path: "staff-manager/:id/staff-summary/completed-shift",
        element: (
          <RequireAuth allowedRoles={[ROLES.admin]}>
            <StaffManagerCompletedShift />
          </RequireAuth>
        ),
      },
     
      {
        path: "backup",
        element: (
          <RequireAuth allowedRoles={[ROLES.superAdmin]}>
            <BackUp />
          </RequireAuth>
        ),
      },
      {
        path: "audit-logs",
        element: (
          <RequireAuth allowedRoles={[ROLES.superAdmin]}>
            <AuditLogs />
          </RequireAuth>
        ),
      },
      {
        path: "ratings",
        element: (
          <RequireAuth allowedRoles={[ROLES.superAdmin]}>
            <RatingsFeedback />
          </RequireAuth>
        ),
      },
      
  
      {
        path: "instructor-dashboard",
        element: (
          <RequireAuth allowedRoles={[ROLES.instructor]}>
            <InstructorDashboard />
          </RequireAuth>
        ),
      },
    
     
  
      {
        path: "unpublished-shift",
        element: (
          <RequireAuth allowedRoles={[ROLES.admin,ROLES.coordinator]}>
            <UnpublishedShiftPage />
          </RequireAuth>
        ),
      },
      {
        path: "unpublished-shift/book-staff",
        element: (
          <RequireAuth allowedRoles={[ROLES.admin,ROLES.coordinator]}>
            <BookStaffPage />
          </RequireAuth>
        ),
      },

      
     
      {
        path: "api-inventory",
        element: (
          <RequireAuth allowedRoles={[ROLES.superAdmin]}>
            <ApiInventoryPage />
          </RequireAuth>
        ),
      },
      {
        path: "performance",
        element: (
          <RequireAuth allowedRoles={[ROLES.superAdmin]}>
            <SystemPerformancePage />
          </RequireAuth>
        ),
      },
     
    
   
      {
        path: "",
        children: [
          {
            path: "ratings/reviewed",
            element: (
              <RequireAuth allowedRoles={[ROLES.carer,ROLES.client,ROLES.coordinator]}>
                <OverAllRatingsPage />
              </RequireAuth>
            ),
          },
          {
            path: "ratings/review-care-homes",
            element: (
              <RequireAuth allowedRoles={[ROLES.carer,ROLES.client,ROLES.coordinator]}>
                <ReviewCareHomesPage />
              </RequireAuth>
            ),
          },
        ],
      },
      {
        path: "",
        children: [
          {
            path: "settings",
            element: (
              <RequireAuth
                allowedRoles={[ROLES.admin, ROLES.coordinator, ROLES.client]}
              >
                <SettingsPage />
              </RequireAuth>
            ),
          },
          {
            path: "settings/Key-info",
            element: (
              <RequireAuth
                allowedRoles={[ROLES.admin,ROLES.client]}
              >
                <KeyInfo />
              </RequireAuth>
            ),
          },
          {
            path: "settings/job-role",
            element: (
              <RequireAuth
                allowedRoles={[ROLES.admin, ROLES.coordinator, ROLES.client]}
              >
                <JobRole />
              </RequireAuth>
            ),
          },
          {
            path: "settings/shift-time-settings",
            element: (
              <RequireAuth
                allowedRoles={[ROLES.admin,ROLES.client]}
              >
                <ShiftTimeSettings />
              </RequireAuth>
            ),
          },
          {
            path: "settings/staff-settings",
            element: (
              <RequireAuth
                allowedRoles={[ROLES.admin,ROLES.client]}
              >
                <StaffSettings />
              </RequireAuth>
            ),
          },
          {
            path: "settings/bank-holidays",
            element: (
              <RequireAuth
                allowedRoles={[ROLES.admin,ROLES.client]}
              >
                <BankHolidays />
              </RequireAuth>
            ),
          },
          {
            path: "settings/dbs-configuration",
            element: (
              <RequireAuth
                allowedRoles={[ROLES.admin]}
              >
                <DBSConfiguration />
              </RequireAuth>
            ),
          },
          {
            path: "settings/email-notification",
            element: (
              <RequireAuth
                allowedRoles={[ROLES.admin]}
              >
                <EmailNotification />
              </RequireAuth>
            ),
          },
          {
            path: "settings/set-email-Phone",
            element: (
              <RequireAuth
                allowedRoles={[ROLES.admin,ROLES.client]}
              >
                <ResetEmailPhone />
              </RequireAuth>
            ),
          },
          {
            path: "settings/week-start-day",
            element: (
              <RequireAuth
                allowedRoles={[ROLES.admin, ROLES.coordinator, ROLES.client]}
              >
                <WeekStartDay />
              </RequireAuth>
            ),
          },
          {
            path: "settings/festival-day-greeting",
            element: (
              <RequireAuth
                allowedRoles={[ROLES.admin,ROLES.client]}
              >
                <FestivalDayGreeting />
              </RequireAuth>
            ),
          },
          {
            path: "settings/client-terms-condition",
            element: (
              <RequireAuth allowedRoles={[ROLES.admin, ROLES.coordinator]}>
                <ClientTermsCondition />
              </RequireAuth>
            ),
          },
          {
            path: "settings/agency-terms-condition",
            element: (
              <RequireAuth allowedRoles={[ROLES.admin]}>
                <AgencyTermsCondition />
              </RequireAuth>
            ),
          },
          {
            path: "settings/break-time-settings",
            element: (
              <RequireAuth
                allowedRoles={[ROLES.admin, ROLES.coordinator, ROLES.client]}
              >
                <BreakTime />
              </RequireAuth>
            ),
          },
          {
            path: "settings/change-password",
            element: (
              <RequireAuth
                allowedRoles={[ROLES.coordinator]}
              >
                <ChangePassword />
              </RequireAuth>
            ),
          },
          {
            path: "settings/electronic-attendance-monitoring",
            element: (
              <RequireAuth
                allowedRoles={[ROLES.client]}
              >
                <ElectronicAttendanceMonitoring />
              </RequireAuth>
            ),
          },
        ],
      },
      {
        path: "",
        children: [
          {
            path: "help/FAQs",
            element: (
              <RequireAuth allowedRoles={[ROLES.admin,ROLES.carer,ROLES.client,ROLES.coordinator,ROLES.instructor,ROLES.superAdmin]}>
                <FAQsPage />
              </RequireAuth>
            ),
          },
          {
            path: "",
            // element: (
            //   <RequireAuth>
            //     <ItHelpDeskPage />
            //   </RequireAuth>
            // ),
            children: [
              {
                path: "help/it-help-desk",
                element: (
                  <RequireAuth allowedRoles={[ROLES.admin,ROLES.carer,ROLES.client,ROLES.coordinator,ROLES.instructor,ROLES.superAdmin]}>
                    <ItHelpDeskPage />
                  </RequireAuth>
                ),
              },
              {
                path: "help/it-help-desk/all-tickets/:id",
                element: (
                  <RequireAuth allowedRoles={[ROLES.admin,ROLES.carer,ROLES.client,ROLES.coordinator,ROLES.instructor,ROLES.superAdmin]}>
                    <ItHelpDeskAllTicketsPage />
                  </RequireAuth>
                ),
              },
              // {
              //   path: "help/it-help-desk/pending-tickets",
              //   element: (
              //     <RequireAuth allowedRoles={[ROLES.admin]}>
              //       <ItHelpDeskPendingTicketsPage />
              //     </RequireAuth>
              //   ),
              // },
              // {
              //   path: "help/it-help-desk/hold-tickets",
              //   element: (
              //     <RequireAuth allowedRoles={[ROLES.admin]}>
              //       <ItHelpDeskOnHoldTicketsPage />
              //     </RequireAuth>
              //   ),
              // },
              // {
              //   path: "help/it-help-desk/closed-tickets",
              //   element: (
              //     <RequireAuth allowedRoles={[ROLES.admin]}>
              //       <ItHelpDeskClosedTicketsPage />
              //     </RequireAuth>
              //   ),
              // },
              // {
              //   path: "help/it-help-desk/resolved-tickets",
              //   element: (
              //     <RequireAuth allowedRoles={[ROLES.admin]}>
              //       <ItHelpDeskResolvedTicketsPage />
              //     </RequireAuth>
              //   ),
              // },
              {
                path: "help/it-help-desk/support-dashbaord",
                element: (
                  <RequireAuth allowedRoles={[ROLES.admin,ROLES.carer,ROLES.client,ROLES.coordinator,ROLES.instructor,ROLES.superAdmin]}>
                    <ItHelpDeskSupportDashboard />
                  </RequireAuth>
                ),
              },
            ],
          },
        ],
      },
      //client
      {
        path: "",
        children: [
          {
            path: "client-booking-calendar",
            element: (
              <RequireAuth allowedRoles={[ROLES.user]}>
                 <OurCustomOrderDetails /> 
              </RequireAuth>
            ),
          },
          
        ],
      },
      {
        path: "client-user-management",
        element: (
          <RequireAuth allowedRoles={[ROLES.client]}>
            <ClientUserManagement />
          </RequireAuth>
        ),
      },
      {
        path: "client-preferences",
        element: (
          <RequireAuth allowedRoles={[ROLES.client]}>
            <ClientPreferences />
          </RequireAuth>
        ),
      },
      
     
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
