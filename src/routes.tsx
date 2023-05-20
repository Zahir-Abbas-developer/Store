import { FC, lazy, LazyExoticComponent, Suspense } from "react";
import { Navigate } from "react-router-dom";
import DashboardLayout from "./layout/DashboardLayout";

import Login from "./components/Authentication/Login";
import NotFound from "./components/Authentication/NotFound";
import SignUp from "./components/Authentication/SignUp";
import Unathorized from "./components/Authentication/Unathorized";
import ResetPassword from "./components/Authentication/ResetPassword";

import SystemPerformancePage from "./pages/SystemPerformance";
import RequireAuth from "./components/Authentication/RequireAuth";
import LoadingSvg from "../src/assets/Login/loader-icon.gif";
import { ROLES } from "./constants/Roles";

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

const ClientDetailsPage = Loadable(
  lazy(() => import("./pages/Onboarding/CareCoordinator/ClientDetails"))
);

const ApiInventoryPage = Loadable(lazy(() => import("./pages/ApiInventory")));
const ManageUsersPage = Loadable(lazy(() => import("./pages/ManageUsers")));
const ReviewCareHomesPage = Loadable(lazy(() => import("./pages/Ratings")));
const ManageUsersTypesPage = Loadable(
  lazy(() => import("./pages/ManageUserTypes"))
);

const SuperAdminDashboardPage = Loadable(
  lazy(() => import("./pages/SuperAdminDashboard"))
);
const DashboardPage = Loadable(lazy(() => import("./pages/Dashboard")));
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

//Onboarding
const CarerPage = Loadable(lazy(() => import("./pages/Onboarding/Carer")));
const CareCoordinatorPage = Loadable(
  lazy(() => import("./pages/Onboarding/CareCoordinator"))
);
const TrainingInstructorPage = Loadable(
  lazy(() => import("./pages/Onboarding/TrainingInstructor"))
);

const CarerEditProfilePage = Loadable(
  lazy(() => import("./pages/Onboarding/Carer/EditProfile"))
);
const CareCoordinatorEditProfilePage = Loadable(
  lazy(() => import("./pages/Onboarding/CareCoordinator/EditProfile"))
);
const TraingingInstructorEditProfilePage = Loadable(
  lazy(() => import("./pages/Onboarding/TrainingInstructor/EditProfile"))
);

//profile

const InstructorProfilePage = Loadable(
  lazy(() => import("./pages/InstructorProfile"))
);

const CarerProfilePage = Loadable(lazy(() => import("./pages/CarerProfile")));
const CarerCoordinatorProfilePage = Loadable(
  lazy(() => import("./pages/CareCoordinatorProfile"))
);
const ClientProfilePage = Loadable(lazy(() => import("./pages/ClientProfile")));

const InvoiceCareHomePage = Loadable(
  lazy(() => import("./pages/Finance/Invoice/InvoiceCareHome"))
);
const InvoiceWeeksPage = Loadable(
  lazy(() => import("./pages/Finance/Invoice/InvoiceWeeks"))
);
const InvoiceWeeksDetailPage = Loadable(
  lazy(() => import("./pages/Finance/Invoice/InvoiceWeeksDetails"))
);
const InvoiceStaffDetailPage = Loadable(
  lazy(() => import("./pages/Finance/Invoice/InvoiceStaffDetails"))
);

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

//staff booking
const StaffBookingPage = Loadable(lazy(() => import("./pages/StaffBooking")));
const AvailableShift = Loadable(
  lazy(() => import("./pages/StaffBooking/AvailableShift"))
);
const UpComingShift = Loadable(
  lazy(() => import("./pages/StaffBooking/UpComingShift"))
);
const CompletedShift = Loadable(
  lazy(() => import("./pages/StaffBooking/CompletedShift"))
);
const WorkHistory = Loadable(
  lazy(() => import("./pages/StaffBooking/WorkHistory"))
);

const BookingCalenderPage = Loadable(
  lazy(() => import("./pages/BookingCalender"))
);
const StaffAvailabilityPage = Loadable(
  lazy(
    () =>
      import("./components/BookingCalander/StaffAvailability/StaffAvailability")
  )
);
const ShiftManagerPage = Loadable(lazy(() => import("./pages/ShiftManager")));
const ShiftManagerDetails = Loadable(
  lazy(() => import("./pages/ShiftManager/ShiftBooking"))
);
const ShiftManagerConfirmedShift = Loadable(
  lazy(() => import("./pages/ShiftManager/ShiftBooking/ConfirmedShift"))
);
const ShiftManagerUnfilledShift = Loadable(
  lazy(() => import("./pages/ShiftManager/ShiftBooking/UnfilledShift"))
);
const ShiftManagerUnPublishedShift = Loadable(
  lazy(() => import("./pages/ShiftManager/ShiftBooking/UnPublishedShift"))
);
const ShiftManagerBookStaff = Loadable(
  lazy(
    () => import("./pages/ShiftManager/ShiftBooking/UnPublishedShift/BookStaff")
  )
);
const UnpublishedShiftPage = Loadable(
  lazy(() => import("./pages/UnpublishedShift"))
);
const BookStaffPage = Loadable(
  lazy(() => import("./pages/UnpublishedShift/BookStaff"))
);
const FinancePage = Loadable(lazy(() => import("./pages/Finance/Finance")));
const SetupPage = Loadable(lazy(() => import("./pages/Finance/Setup")));
const FinanceReportsPage = Loadable(
  lazy(() => import("./pages/Finance/Reports"))
);
const FinanceReportsStaffHoursPage = Loadable(
  lazy(() => import("./pages/Finance/Reports/StaffHours"))
);
const FinanceReportsNIPaymentPage = Loadable(
  lazy(() => import("./pages/Finance/Reports/NIPayment"))
);
const FinanceReportsNonNIPaymentPage = Loadable(
  lazy(() => import("./pages/Finance/Reports/NonNiPayment"))
);
const FinanceReportsLimitedPage = Loadable(
  lazy(() => import("./pages/Finance/Reports/Limited"))
);
const FinanceReportsShiftSummaryPage = Loadable(
  lazy(() => import("./pages/Finance/Reports/ShiftSummary"))
);
const FinanceReportsShiftSummaryDatilPage = Loadable(
  lazy(() => import("./pages/Finance/Reports/ShiftSummaryDetail"))
);
const FinanceReportsContractorPaymentPage = Loadable(
  lazy(() => import("./pages/Finance/Reports/ContractorPayment"))
);
const InvoicePage = Loadable(lazy(() => import("./pages/Finance/Invoice")));
const StaffPaymentDetailsPage = Loadable(
  lazy(() => import("./pages/Finance/StaffPaymentDetails"))
);
const ClientPaymentDetailsPage = Loadable(
  lazy(() => import("./pages/Finance/ClientPaymentDetails"))
);

// Reports and its Child Routes Starts Here
const ReportsMainPage = Loadable(lazy(() => import("./pages/Reports")));
const ActivityReport = Loadable(
  lazy(() => import("./pages/Reports/ActivityReport"))
);
const CarerReport = Loadable(lazy(() => import("./pages/Reports/CarerReport")));
const ClientWork = Loadable(lazy(() => import("./pages/Reports/ClientWork")));
const DailyShift = Loadable(lazy(() => import("./pages/Reports/DailyShift")));
const ExtraHoursReport = Loadable(
  lazy(() => import("./pages/Reports/ExtraHourReport"))
);
const GrossProfitLoss = Loadable(
  lazy(() => import("./pages/Reports/GrossProfitLoss"))
);
const PaymentData = Loadable(lazy(() => import("./pages/Reports/PaymentData")));
const ShiftBooked = Loadable(lazy(() => import("./pages/Reports/ShiftBooked")));
const ShiftBooking = Loadable(
  lazy(() => import("./pages/Reports/ShiftBooking"))
);
const ShiftCancelled = Loadable(
  lazy(() => import("./pages/Reports/ShiftCancelled"))
);
const StaffData = Loadable(lazy(() => import("./pages/Reports/StaffData")));
const ShiftRateSetting = Loadable(
  lazy(() => import("./pages/Reports/ShiftRateSetting"))
);
const StaffAttendance = Loadable(
  lazy(() => import("./pages/Reports/StaffAttendance"))
);
const StaffAvailability = Loadable(
  lazy(() => import("./pages/Reports/StaffAvailability"))
);
const StaffCompliance = Loadable(
  lazy(() => import("./pages/Reports/StaffCompliance"))
);
const StaffReport = Loadable(lazy(() => import("./pages/Reports/StaffReport")));
const StaffShiftHours = Loadable(
  lazy(() => import("./pages/Reports/StaffShiftHours"))
);
const StaffWork = Loadable(lazy(() => import("./pages/Reports/StaffWork")));
const TerminatedStaff = Loadable(
  lazy(() => import("./pages/Reports/TerminatedStaff"))
);
const Vaccination = Loadable(lazy(() => import("./pages/Reports/Vaccination")));
const TraineesInfo = Loadable(
  lazy(() => import("./pages/Reports/TraineesInfo"))
);
const WebinarsReport = Loadable(
  lazy(() => import("./pages/Reports/WebinarsReport"))
);
const CertificateReport = Loadable(
  lazy(() => import("./pages/Reports/CertificateReport"))
);
const Finance = Loadable(lazy(() => import("./pages/Reports/Finance")));
// const FinanceWeeksPage= Loadable(lazy(() => import("./pages/Reports/Finance/FinanceWeeks")));
const FinanceWeeksDetailPage = Loadable(
  lazy(() => import("./pages/Reports/Finance/FinanceWeeksDetail"))
);
const FinanceCarerDetailPage = Loadable(
  lazy(() => import("./pages/Reports/Finance/FinanceWeeksDetail"))
);

const IncidentReport = Loadable(
  lazy(() => import("./pages/Reports/IncidentReport"))
);
const RatingsReport = Loadable(
  lazy(() => import("./pages/Reports/RatingsReport"))
);
const WhistleBlowing = Loadable(
  lazy(() => import("./pages/Reports/WhistleBlowing"))
);
const TrainingPage = Loadable(lazy(() => import("./pages/Training")));
const MyCoursesPage = Loadable(
  lazy(() => import("./pages/Training/MyCourses"))
);
const CourseDetailsPage = Loadable(
  lazy(() => import("./pages/Training/CourseDetails"))
);
const MyNotesPage = Loadable(lazy(() => import("./pages/Training/MyNotes")));
const MyResultsPage = Loadable(
  lazy(() => import("./pages/Training/MyResults"))
);
const CertificatePage = Loadable(
  lazy(() => import("./pages/Training/CourseCertificate"))
);
const AllCoursesPage = Loadable(
  lazy(() => import("./pages/Training/AllCourses"))
);
const CarerTrainingPage = Loadable(
  lazy(() => import("./pages/Training/CarerTraining"))
);
const InstructorDashboard = Loadable(
  lazy(() => import("./pages/InstructorDashboard"))
);
const ManageCourses = Loadable(lazy(() => import("./pages/ManageCourses")));
const CoursesDetail = Loadable(
  lazy(() => import("./pages/ManageCourses/CourseDetails"))
);
const AddCourses = Loadable(
  lazy(() => import("./pages/ManageCourses/AddCourse"))
);
const TraineeInfo = Loadable(lazy(() => import("./pages/TraineeInfo")));
const TraineeCourses = Loadable(
  lazy(() => import("./pages/TraineeInfo/TraineeCourses"))
);

const Webinars = Loadable(
  lazy(() => import("./pages/Webinars/UpcomingWebinar"))
);

const RequestedAttendees = Loadable(
  lazy(() => import("./pages/Webinars/UpcomingWebinar/RequestedAttendees"))
);

const WebinarHistory = Loadable(
  lazy(() => import("./pages/Webinars/WebinarHistory"))
);
const ViewDetails = Loadable(
  lazy(() => import("./pages/Webinars/WebinarHistory/ViewDetails"))
);
const AddWebinar = Loadable(lazy(() => import("./pages/Webinars/AddWebinar")));

// Reports and its Child Routes Ends Here

const SettingsPage = Loadable(lazy(() => import("./pages/Settings")));
const FAQsPage = Loadable(lazy(() => import("./pages/Help/FAQs")));
const BackUp = Loadable(lazy(() => import("./pages/BackUp")));
const AuditLogs = Loadable(lazy(() => import("./pages/AuditLogs")));
const ManageNotifications = Loadable(
  lazy(() => import("./pages/ManageNotifications/ManageNotifications"))
);
const RatingsFeedback = Loadable(
  lazy(() => import("./pages/RatingAndFeedback"))
);
const CoordinatorDashboard = Loadable(
  lazy(() => import("./pages/CareCoordinatorDashboard"))
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

// client
const ClientBookingCalendar = Loadable(
  lazy(() => import("./pages/ClientBookingCalendar"))
);
const ClientCalendarShiftDetails = Loadable(
  lazy(() => import("./pages/ClientBookingCalendar/BookingShiftDetails"))
);
const ClientUserManagement = Loadable(
  lazy(() => import("./pages/ClientUserManagement"))
);
const ClientPreferences = Loadable(
  lazy(() => import("./pages/ClientPreferences"))
);
const ClientDashboard = Loadable(lazy(() => import("./pages/ClientDashboard")));

const AvailableShifts = Loadable(
  lazy(() => import("./pages/ShiftDetails/AvailableShifts"))
);
const UpcomingShifts = Loadable(
  lazy(() => import("./pages/ShiftDetails/UpcomingShifts"))
);
const CompletedShifts = Loadable(
  lazy(() => import("./pages/ShiftDetails/CompletedShifts"))
);
const CancelledShifts = Loadable(
  lazy(() => import("./pages/ShiftDetails/CancelledShifts"))
);
const CarerMyCalendarPage = Loadable(
  lazy(() => import("./pages/CarerMyCalendar"))
);

// Client Manage Shift
const ClientRequestedShifts = Loadable(
  lazy(() => import("./pages/ClientManageShift/ClientRequestedShift"))
);
const ClientUpcomingShifts = Loadable(
  lazy(() => import("./pages/ClientManageShift/ClientUpcomingShift"))
);
const ClientCompletedShifts = Loadable(
  lazy(() => import("./pages/ClientManageShift/ClientCompletedShift"))
);
const ClientSignOffShifts = Loadable(
  lazy(() => import("./pages/ClientManageShift/ClientSignOffShift"))
);

const SystemPerformance = Loadable(
  lazy(() => import("./pages/SystemPerformance"))
);

export const routes: any = [
  { path: "/", element: <Navigate to="dashboard" /> },
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
    element: <SignUp />,
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
        path: "super-admin-dashboard",
        element: (
          <RequireAuth allowedRoles={[ROLES.superAdmin]}>
            <SuperAdminDashboardPage />
          </RequireAuth>
        ),
      },
      {
        path: "dashboard",
        element: (
          
            <DashboardPage />
         
        ),
      },
      {
        path:"productDetails",
        element:<ProductDetailsPage/>
      },
      {
        path: "coordinator-dashboard",
        element: (
          <RequireAuth allowedRoles={[ROLES.coordinator]}>
            <CoordinatorDashboard />
          </RequireAuth>
        ),
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
        path: "",
        children: [
          {
            path: "shift-details/available-shifts",
            element: (
              <RequireAuth allowedRoles={[ROLES.carer]}>
                <AvailableShifts />
              </RequireAuth>
            ),
          },

          {
            path: "shift-details/upcoming-shifts",
            element: (
              <RequireAuth allowedRoles={[ROLES.carer]}>
                <UpcomingShifts />
              </RequireAuth>
            ),
          },

          {
            path: "shift-details/completed-shifts",
            element: (
              <RequireAuth allowedRoles={[ROLES.carer]}>
                <CompletedShifts />
              </RequireAuth>
            ),
          },

          {
            path: "shift-details/cancelled-shifts",
            element: (
              <RequireAuth allowedRoles={[ROLES.carer]}>
                <CancelledShifts />
              </RequireAuth>
            ),
          },
        ],
      },
      // SystemPerformance

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
        path: "",
        children: [
          {
            path: "manage-user",
            element: (
              <RequireAuth allowedRoles={[ROLES.superAdmin]}>
                <ManageUsersTypesPage />
              </RequireAuth>
            ),
          },
          {
            path: "manage-user/manage-user-tabs",
            element: (
              <RequireAuth allowedRoles={[ROLES.superAdmin]}>
                <ManageUsersPage />
              </RequireAuth>
            ),
          },
          // {
          //   path: "manage-user/carer",
          //   element: (
          //     <RequireAuth allowedRoles={[ROLES.superAdmin]}>
          //       <InvoicePage />
          //     </RequireAuth>
          //   ),
          // },
          // {
          //   path: "manage-user/carer-cordinator",
          //   element: (
          //     <RequireAuth allowedRoles={[ROLES.admin]}>
          //       <StaffPaymentDetailsPage />
          //     </RequireAuth>
          //   ),
          // },
          // {
          //   path: "manage-user/client",
          //   element: (
          //     <RequireAuth allowedRoles={[ROLES.admin]}>
          //       <ClientPaymentDetailsPage />
          //     </RequireAuth>
          //   ),
          // },
          // {
          //   path: "manage-user/agency-admin",
          //   element: (
          //     <RequireAuth allowedRoles={[ROLES.admin]}>
          //       <FinanceReportsPage />
          //     </RequireAuth>
          //   ),
          // },
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
        path: "instructor-profile",
        element: (
          <RequireAuth allowedRoles={[ROLES.instructor]}>
            <InstructorProfilePage />
          </RequireAuth>
        ),
      },

      {
        path: "client-profile",
        element: (
          <RequireAuth allowedRoles={[ROLES.client]}>
            <ClientProfilePage />
          </RequireAuth>
        ),
      },
      {
        path: "carer-profile",
        element: (
          <RequireAuth allowedRoles={[ROLES.carer]}>
            <CarerProfilePage />
          </RequireAuth>
        ),
      },
      {
        path: "care-coordinator-profile",
        element: (
          <RequireAuth allowedRoles={[ROLES.coordinator]}>
            <CarerCoordinatorProfilePage />
          </RequireAuth>
        ),
      },

      {
        path: "",
        children: [
          {
            path: "onboarding/carer",
            element: (
              <RequireAuth allowedRoles={[ROLES.admin]}>
                <CarerPage />
              </RequireAuth>
            ),
          },
          {
            path: "onboarding/carer/edit-profile",
            element: (
              <RequireAuth allowedRoles={[ROLES.admin]}>
                <CarerEditProfilePage />
              </RequireAuth>
            ),
          },
          {
            path: "onboarding/care-coordinator/edit-profile",
            element: (
              <RequireAuth allowedRoles={[ROLES.admin]}>
                <CareCoordinatorEditProfilePage />
              </RequireAuth>
            ),
          },
          {
            path: "onboarding/training-instructor/edit-profile",
            element: (
              <RequireAuth allowedRoles={[ROLES.admin]}>
                <TraingingInstructorEditProfilePage />
              </RequireAuth>
            ),
          },

          {
            path: "onboarding/care-coordinator/client-details",
            element: (
              <RequireAuth allowedRoles={[ROLES.admin]}>
                <ClientDetailsPage />
              </RequireAuth>
            ),
          },
          {
            path: "onboarding/care-coordinator",
            element: (
              <RequireAuth allowedRoles={[ROLES.admin]}>
                <CareCoordinatorPage />
              </RequireAuth>
            ),
          },
          {
            path: "onboarding/training-instructor",
            element: (
              <RequireAuth allowedRoles={[ROLES.admin]}>
                <TrainingInstructorPage />
              </RequireAuth>
            ),
          },
        ],
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
        path: "staff-allocation",
        element: (
          <RequireAuth allowedRoles={[ROLES.admin,ROLES.coordinator]}>
            <StaffAllocationPage />
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
        path: "notifications",
        element: (
          <RequireAuth allowedRoles={[ROLES.superAdmin]}>
            <ManageNotifications />
          </RequireAuth>
        ),
      },
      {
        path: "staff-booking",
        element: (
          <RequireAuth allowedRoles={[ROLES.admin]}>
            <StaffBookingPage />
          </RequireAuth>
        ),
      },
      {
        path: "staff-booking/available-shift/:id",
        element: (
          <RequireAuth allowedRoles={[ROLES.admin]}>
            <AvailableShift />
          </RequireAuth>
        ),
      },
      {
        path: "staff-booking/UpComing-shift/:id",
        element: (
          <RequireAuth allowedRoles={[ROLES.admin]}>
            <UpComingShift />
          </RequireAuth>
        ),
      },
      {
        path: "staff-booking/completed-shift/:id",
        element: (
          <RequireAuth allowedRoles={[ROLES.admin]}>
            <CompletedShift />
          </RequireAuth>
        ),
      },
      {
        path: "staff-booking/work-history/:id",
        element: (
          <RequireAuth allowedRoles={[ROLES.admin]}>
            <WorkHistory />
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
        path: "manage-courses",
        element: (
          <RequireAuth allowedRoles={[ROLES.instructor]}>
            <ManageCourses />
          </RequireAuth>
        ),
      },
      {
        path: "manage-courses/courses-detail/:id",
        element: (
          <RequireAuth allowedRoles={[ROLES.instructor]}>
            <CoursesDetail />
          </RequireAuth>
        ),
      },
      {
        path: "manage-courses/courses-detail/view-course/:id",
        element: (
          <RequireAuth allowedRoles={[ROLES.admin, ROLES.instructor, ROLES.coordinator, ROLES.carer]}>
            <CourseDetailsPage />
          </RequireAuth>
        ),
      },
      {
        path: "manage-courses/add-courses",
        element: (
          <RequireAuth allowedRoles={[ROLES.instructor]}>
            <AddCourses />
          </RequireAuth>
        ),
      },
      {
        path: "manage-courses/edit-course/:id",
        element: (
          <RequireAuth allowedRoles={[ROLES.instructor]}>
            <AddCourses />
          </RequireAuth>
        ),
      },
      {
        path: "webinar/upcomming-webinar",
        element: (
          <RequireAuth allowedRoles={[ROLES.instructor]}>
            <Webinars />
          </RequireAuth>
        ),
      },
      {
        path: "webinar/upcoming-webninar/requested-attendees/:id",
        element: (
          <RequireAuth allowedRoles={[ROLES.instructor]}>
            <RequestedAttendees />
          </RequireAuth>
        ),
      },
      {
        path: "webinar/webinar-history",
        element: (
          <RequireAuth allowedRoles={[ROLES.instructor]}>
            <WebinarHistory />
          </RequireAuth>
        ),
      },
      {
        path: "webinar/webinar-history/view-details/:id",
        element: (
          <RequireAuth allowedRoles={[ROLES.instructor]}>
            <ViewDetails />
          </RequireAuth>
        ),
      },
      {
        path: "webinar/add-webinar",
        element: (
          <RequireAuth allowedRoles={[ROLES.instructor]}>
            <AddWebinar />
          </RequireAuth>
        ),
      },
      {
        path: "webinar/edit-webinar/:id",
        element: (
          <RequireAuth allowedRoles={[ROLES.instructor]}>
            <AddWebinar />
          </RequireAuth>
        ),
      },
      {
        path: "webinar/view-webinar/:id",
        element: (
          <RequireAuth allowedRoles={[ROLES.instructor]}>
            <AddWebinar />
          </RequireAuth>
        ),
      },
      {
        path: "webinar/:mode",
        element: (
          <RequireAuth allowedRoles={[ROLES.instructor]}>
            <AddWebinar />
          </RequireAuth>
        ),
      },
      {
        path: "",
        children: [
          {
            path: "training",
            element: (
              <RequireAuth allowedRoles={[ROLES.carer,ROLES.coordinator]}>
                <TrainingPage />
              </RequireAuth>
            ),
          },
          {
            path: "training/my-courses",
            element: (
              <RequireAuth allowedRoles={[ROLES.carer,ROLES.coordinator]}>
                <MyCoursesPage />
              </RequireAuth>
            ),
          },
          {
            path: "training/my-courses/:id",
            element: (
              <RequireAuth allowedRoles={[ROLES.carer,ROLES.coordinator]}>
                <CourseDetailsPage />
              </RequireAuth>
            ),
          },
          {
            path: "training/all-courses",
            element: (
              <RequireAuth allowedRoles={[ROLES.carer,ROLES.coordinator]}>
                <AllCoursesPage />
              </RequireAuth>
            ),
          },
          {
            path: "training/courses/:category",
            element: (
              <RequireAuth allowedRoles={[ROLES.carer,ROLES.coordinator]}>
                <AllCoursesPage />
              </RequireAuth>
            ),
          },
          {
            path: "training/all-courses/:id",
            element: (
              <RequireAuth allowedRoles={[ROLES.carer,ROLES.coordinator]}>
                <CoursesDetail />
              </RequireAuth>
            ),
          },
          {
            path: "training/carer-training",
            element: (
              <RequireAuth allowedRoles={[ROLES.carer,ROLES.coordinator]}>
                <CarerTrainingPage />
              </RequireAuth>
            ),
          },
          {
            path: "training/carer-training/certificate/:id",
            element: (
              <RequireAuth allowedRoles={[ROLES.carer,ROLES.coordinator]}>
                <CertificatePage />
              </RequireAuth>
            ),
          },
          {
            path: "training/my-notes",
            element: (
              <RequireAuth allowedRoles={[ROLES.carer,ROLES.coordinator]}>
                <MyNotesPage />
              </RequireAuth>
            ),
          },
          {
            path: "training/my-results",
            element: (
              <RequireAuth allowedRoles={[ROLES.carer,ROLES.coordinator]}>
                <MyResultsPage />
              </RequireAuth>
            ),
          },
          {
            path: "training/my-results/certificate/:id",
            element: (
              <RequireAuth allowedRoles={[ROLES.carer,ROLES.coordinator]}>
                <CertificatePage />
              </RequireAuth>
            ),
          },
        ],
      },
      {
        path: "booking-calendar",
        element: (
          <RequireAuth allowedRoles={[ROLES.admin,ROLES.coordinator]}>
            <BookingCalenderPage />
          </RequireAuth>
        ),
      },
      {
        path: "booking-calendar/staff-availability",
        element: (
          <RequireAuth allowedRoles={[ROLES.admin]}>
            <StaffAvailabilityPage />
          </RequireAuth>
        ),
      },
      {
        path: "shift-manager",
        element: (
          <RequireAuth allowedRoles={[ROLES.admin,ROLES.coordinator]}>
            <ShiftManagerPage />
          </RequireAuth>
        ),
      },
      {
        path: "shift-manager/:id",
        element: (
          <RequireAuth allowedRoles={[ROLES.admin,ROLES.coordinator]}>
            <ShiftManagerDetails />
          </RequireAuth>
        ),
      },
      {
        path: "shift-manager/:id/confirmed-shift",
        element: (
          <RequireAuth allowedRoles={[ROLES.admin,ROLES.coordinator]}>
            <ShiftManagerConfirmedShift />
          </RequireAuth>
        ),
      },
      {
        path: "shift-manager/:id/unfilled-shift",
        element: (
          <RequireAuth allowedRoles={[ROLES.admin,ROLES.coordinator]}>
            <ShiftManagerUnfilledShift />
          </RequireAuth>
        ),
      },
      {
        path: "shift-manager/:id/unpublished-shift",
        element: (
          <RequireAuth allowedRoles={[ROLES.admin,ROLES.coordinator]}>
            <ShiftManagerUnPublishedShift />
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
        path: "unpublished-shift/book-staff",
        element: (
          <RequireAuth allowedRoles={[ROLES.admin,ROLES.coordinator]}>
            <ShiftManagerBookStaff />
          </RequireAuth>
        ),
      },
      {
        path: "",
        children: [
          {
            path: "finance",
            element: (
              <RequireAuth allowedRoles={[ROLES.admin,ROLES.coordinator]}>
                <FinancePage />
              </RequireAuth>
            ),
          },
          {
            path: "finance/setup",
            element: (
              <RequireAuth allowedRoles={[ROLES.admin,ROLES.coordinator]}>
                <SetupPage />
              </RequireAuth>
            ),
          },
          {
            path: "finance/invoice",
            element: (
              <RequireAuth allowedRoles={[ROLES.admin,ROLES.coordinator]}>
                <InvoicePage />
              </RequireAuth>
            ),
          },
          {
            path: "finance/invoice/invoice-coordinator/:id",
            element: (
              <RequireAuth allowedRoles={[ROLES.admin,ROLES.coordinator]}>
                <InvoiceCareHomePage />
              </RequireAuth>
            ),
          },
          {
            path: "finance/invoice/invoice-coordinator/week/:id",
            element: (
              <RequireAuth allowedRoles={[ROLES.admin,ROLES.coordinator]}>
                <InvoiceWeeksPage />
              </RequireAuth>
            ),
          },
          {
            path: "finance/invoice/invoice-coordinator/week/detail/:id",
            element: (
              <RequireAuth allowedRoles={[ROLES.admin,ROLES.coordinator]}>
                <InvoiceWeeksDetailPage />
              </RequireAuth>
            ),
          },
          {
            path: "finance/invoice/invoice-coordinator/week/detail/staff-detail/:id",
            element: (
              <RequireAuth allowedRoles={[ROLES.admin,ROLES.coordinator]}>
                <InvoiceStaffDetailPage />
              </RequireAuth>
            ),
          },
          {
            path: "finance/staff-payment-details",
            element: (
              <RequireAuth allowedRoles={[ROLES.admin,ROLES.coordinator]}>
                <StaffPaymentDetailsPage />
              </RequireAuth>
            ),
          },
          {
            path: "finance/client-payment-details",
            element: (
              <RequireAuth allowedRoles={[ROLES.admin,ROLES.coordinator]}>
                <ClientPaymentDetailsPage />
              </RequireAuth>
            ),
          },
          {
            path: "",
            children: [
              {
                path: "finance/reports",
                element: (
                  <RequireAuth allowedRoles={[ROLES.admin,ROLES.coordinator]}>
                    <FinanceReportsPage />
                  </RequireAuth>
                ),
              },
              {
                path: "finance/reports/staff-hours-report",
                element: (
                  <RequireAuth allowedRoles={[ROLES.admin,ROLES.coordinator]}>
                    <FinanceReportsStaffHoursPage />
                  </RequireAuth>
                ),
              },
              {
                path: "finance/reports/ni-payment",
                element: (
                  <RequireAuth allowedRoles={[ROLES.admin,ROLES.coordinator]}>
                    <FinanceReportsNIPaymentPage />
                  </RequireAuth>
                ),
              },
              {
                path: "finance/reports/non-ni-payment",
                element: (
                  <RequireAuth allowedRoles={[ROLES.admin,ROLES.coordinator]}>
                    <FinanceReportsNonNIPaymentPage />
                  </RequireAuth>
                ),
              },
              {
                path: "finance/reports/limited",
                element: (
                  <RequireAuth allowedRoles={[ROLES.admin,ROLES.coordinator]}>
                    <FinanceReportsLimitedPage />
                  </RequireAuth>
                ),
              },
              {
                path: "",
                children: [
                  {
                    path: "finance/reports/shift-summary",
                    element: (
                      <RequireAuth allowedRoles={[ROLES.admin,ROLES.coordinator]}>
                        <FinanceReportsShiftSummaryPage />
                      </RequireAuth>
                    ),
                  },
                  {
                    path: "finance/reports/shift-summary/shift-summary-detail",
                    element: (
                      <RequireAuth allowedRoles={[ROLES.admin,ROLES.coordinator]}>
                        <FinanceReportsShiftSummaryDatilPage />
                      </RequireAuth>
                    ),
                  },
                ],
              },
              {
                path: "finance/reports/contractor-payment",
                element: (
                  <RequireAuth allowedRoles={[ROLES.admin,ROLES.coordinator]}>
                    <FinanceReportsContractorPaymentPage />
                  </RequireAuth>
                ),
              },
            ],
          },
        ],
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
        path: "trainee-info",
        element: (
          <RequireAuth allowedRoles={[ROLES.instructor]}>
            <TraineeInfo />
          </RequireAuth>
        ),
      },
      {
        path: "trainee-info/trainee-courses/:id",
        element: (
          <RequireAuth allowedRoles={[ROLES.instructor]}>
            <TraineeCourses />
          </RequireAuth>
        ),
      },
      {
        path: "trainee-info/trainee-courses/course-content/:id",
        element: (
          <RequireAuth allowedRoles={[ROLES.instructor]}>
            <CourseDetailsPage />
          </RequireAuth>
        ),
      },
      {
        path: "",
        children: [
          {
            path: "reports",
            element: (
              <RequireAuth
                allowedRoles={[
                  ROLES.client,
                  ROLES.carer,
                  ROLES.instructor,
                  ROLES.admin,
                  ROLES.superAdmin,
                  ROLES.coordinator
                ]}
              >
                <ReportsMainPage />
              </RequireAuth>
            ),
          },
          {
            path: "reports/extra-hours-report",
            element: (
              <RequireAuth allowedRoles={[ROLES.admin,ROLES.client,ROLES.coordinator,ROLES.superAdmin]}>
                <ExtraHoursReport />
              </RequireAuth>
            ),
          },
          {
            path: "reports/advance-staff-search",
            element: (
              <RequireAuth allowedRoles={[ROLES.admin,ROLES.coordinator,ROLES.superAdmin]}>
                <StaffReport />
              </RequireAuth>
            ),
          },
          {
            path: "reports/attendance-report",
            element: (
              <RequireAuth allowedRoles={[ROLES.admin,ROLES.carer,ROLES.client,ROLES.coordinator,ROLES.superAdmin]}>
                <StaffAttendance />
              </RequireAuth>
            ),
          },
          {
            path: "reports/client-work-history",
            element: (
              <RequireAuth allowedRoles={[ROLES.admin,ROLES.coordinator,ROLES.superAdmin]}>
                <ClientWork />
              </RequireAuth>
            ),
          },
          {
            path: "reports/staff-work-history",
            element: (
              <RequireAuth allowedRoles={[ROLES.admin,ROLES.client,ROLES.coordinator,ROLES.superAdmin,ROLES.carer]}>
                <StaffWork />
              </RequireAuth>
            ),
          },
          {
            path: "reports/gross-profit&loss",
            element: (
              <RequireAuth allowedRoles={[ROLES.admin,ROLES.coordinator,ROLES.superAdmin]}>
                <GrossProfitLoss />
              </RequireAuth>
            ),
          },
          {
            path: "reports/activity-report",
            element: (
              <RequireAuth allowedRoles={[ROLES.admin,ROLES.client,ROLES.coordinator,ROLES.instructor,ROLES.superAdmin]}>
                <ActivityReport />
              </RequireAuth>
            ),
          },
          {
            path: "",
            children: [
              {
                path: "reports/staff-availability-sheet",
                element: (
                  <RequireAuth allowedRoles={[ROLES.admin,ROLES.coordinator,ROLES.superAdmin]}>
                    <StaffAvailability />
                  </RequireAuth>
                ),
              },
              {
                path: "reports/weekly-availability-sheet",
                element: (
                  <RequireAuth allowedRoles={[ROLES.admin,ROLES.coordinator,ROLES.superAdmin]}>
                    <StaffAvailability />
                  </RequireAuth>
                ),
              },
              {
                path: "reports/daily-availability-sheet",
                element: (
                  <RequireAuth allowedRoles={[ROLES.admin,ROLES.coordinator,ROLES.superAdmin]}>
                    <StaffAvailability />
                  </RequireAuth>
                ),
              },
            ],
          },
          {
            path: "reports/client-shift-details",
            element: (
              <RequireAuth allowedRoles={[ROLES.admin,ROLES.client,ROLES.coordinator,ROLES.superAdmin]}>
                <ShiftRateSetting />
              </RequireAuth>
            ),
          },
          {
            path: "reports/shift-booking-report",
            element: (
              <RequireAuth allowedRoles={[ROLES.admin,ROLES.carer,ROLES.client,ROLES.coordinator,ROLES.superAdmin]}>
                <ShiftBooking />
              </RequireAuth>
            ),
          },
          {
            path: "reports/terminated-staff-list",
            element: (
              <RequireAuth allowedRoles={[ROLES.admin,ROLES.superAdmin]}>
                <TerminatedStaff />
              </RequireAuth>
            ),
          },
          {
            path: "reports/staff-report",
            element: (
              <RequireAuth allowedRoles={[ROLES.admin,ROLES.client,ROLES.coordinator,ROLES.superAdmin]}>
                <StaffShiftHours />
              </RequireAuth>
            ),
          },
          {
            path: "reports/compliance-report",
            element: (
              <RequireAuth allowedRoles={[ROLES.admin,ROLES.coordinator,ROLES.superAdmin]}>
                <StaffCompliance />
              </RequireAuth>
            ),
          },
          {
            path: "reports/payment-data",
            element: (
              <RequireAuth allowedRoles={[ROLES.admin,ROLES.carer,ROLES,ROLES.coordinator,ROLES.superAdmin,ROLES.client]}>
                <PaymentData />
              </RequireAuth>
            ),
          },
          {
            path: "reports/vaccination-report",
            element: (
              <RequireAuth allowedRoles={[ROLES.admin,ROLES.carer,ROLES,ROLES.client,ROLES.coordinator,ROLES.superAdmin]}>
                <Vaccination />
              </RequireAuth>
            ),
          },
          {
            path: "reports/carer-request",
            element: (
              <RequireAuth allowedRoles={[ROLES.admin,ROLES.client,ROLES.coordinator,ROLES.carer]}>
                <CarerReport />
              </RequireAuth>
            ),
          },
          {
            path: "reports/incidents-report",
            element: (
              <RequireAuth allowedRoles={[ROLES.coordinator,ROLES.carer]}>
                <IncidentReport />
              </RequireAuth>
            ),
          },
          {
            path: "reports/ratings-report",
            element: (
              <RequireAuth allowedRoles={[ROLES.coordinator]}>
                <RatingsReport />
              </RequireAuth>
            ),
          },
          {
            path: "reports/whistle-blowing",
            element: (
              <RequireAuth allowedRoles={[ROLES.carer,ROLES.coordinator]}>
                <WhistleBlowing />
              </RequireAuth>
            ),
          },
          {
            path: "reports/shift-cancelled-report",
            element: (
              <RequireAuth allowedRoles={[ROLES.admin,ROLES.client,ROLES.coordinator,ROLES.superAdmin]}>
                <ShiftCancelled />
              </RequireAuth>
            ),
          },
          {
            path: "reports/shift-booked-report",
            element: (
              <RequireAuth allowedRoles={[ROLES.admin,ROLES.coordinator,ROLES.superAdmin]}>
                <ShiftBooked />
              </RequireAuth>
            ),
          },
          {
            path: "reports/staff-data-report",
            element: (
              <RequireAuth allowedRoles={[ROLES.admin,ROLES.coordinator,ROLES.superAdmin]}>
                <StaffData />
              </RequireAuth>
            ),
          },
          {
            path: "reports/daily-shift-report",
            element: (
              <RequireAuth allowedRoles={[ROLES.admin,ROLES.client,ROLES.coordinator,ROLES.superAdmin]}>
                <DailyShift />
              </RequireAuth>
            ),
          },
          {
            path: "reports/trainees-info",
            element: (
              <RequireAuth allowedRoles={[ROLES.instructor]}>
                <TraineesInfo />
              </RequireAuth>
            ),
          },
          {
            path: "reports/webinars-report",
            element: (
              <RequireAuth allowedRoles={[ROLES.instructor]}>
                <WebinarsReport />
              </RequireAuth>
            ),
          },
          {
            path: "reports/certificate-report",
            element: (
              <RequireAuth allowedRoles={[ROLES.instructor]}>
                <CertificateReport />
              </RequireAuth>
            ),
          },
          {
            path: "reports/finance-report",
            element: (
              <RequireAuth allowedRoles={[ROLES.carer]}>
                <Finance />
              </RequireAuth>
            ),
          },
          // {
          //   path: "reports/finance-report/finance-week/:id",
          //   element: (
          //     <RequireAuth allowedRoles={[ROLES.admin]}>
          //       <FinanceWeeksPage />
          //     </RequireAuth>
          //   ),
          // },
          {
            path: "reports/finance-report/finance-week-detail/:id",
            element: (
              <RequireAuth allowedRoles={[ROLES.carer]}>
                <FinanceWeeksDetailPage />
              </RequireAuth>
            ),
          },
          {
            path: "reports/finance-report/finance-week-detail/carer-detail/:id",
            element: (
              <RequireAuth allowedRoles={[ROLES.carer]}>
                <FinanceCarerDetailPage />
              </RequireAuth>
            ),
          },
        ],
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
              <RequireAuth allowedRoles={[ROLES.client]}>
                <ClientBookingCalendar />
              </RequireAuth>
            ),
          },
          {
            path: "client-booking-calendar/:id",
            element: (
              <RequireAuth allowedRoles={[ROLES.client]}>
                <ClientCalendarShiftDetails />
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
      {
        path: "client-dashboard",
        element: (
          <RequireAuth allowedRoles={[ROLES.client]}>
            <ClientDashboard />
          </RequireAuth>
        ),
      },
      // client manage shift
      {
        path: "",
        children: [
          {
            path: "client-requested-shift",
            element: (
              <RequireAuth allowedRoles={[ROLES.client]}>
                <ClientRequestedShifts />
              </RequireAuth>
            ),
          },
          {
            path: "client-upcoming-shift",
            element: (
              <RequireAuth allowedRoles={[ROLES.client]}>
                <ClientUpcomingShifts />
              </RequireAuth>
            ),
          },
          {
            path: "client-completed-shift",
            element: (
              <RequireAuth allowedRoles={[ROLES.client]}>
                <ClientCompletedShifts />
              </RequireAuth>
            ),
          },
          {
            path: "client-signoff-shift",
            element: (
              <RequireAuth allowedRoles={[ROLES.client]}>
                <ClientSignOffShifts />
              </RequireAuth>
            ),
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
