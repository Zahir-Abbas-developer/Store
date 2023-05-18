import { ROLES } from "../constants/Roles";

export const renderDashboard = (role: string) => {
  if (role === ROLES.carer) {
    return "/carer-dashboard";
  } else if (role === ROLES.coordinator) {
    return "/coordinator-dashboard";
  } else if (role === ROLES.client) {
    return "/client-dashboard";
  } else if (role === ROLES.instructor) {
    return "/instructor-dashboard";
  } else if (role === ROLES.superAdmin) {
    return "/super-admin-dashboard";
  }

  // If Non of above condition's true, so return dashboard (Admin)
  return "/dashboard"
}