import { ROLES } from "../constants/Roles";

export const renderDashboard = (role: string) => {
  if (role === ROLES.carer) {
    return "/admin-dashboard";
  } else if (role === ROLES.coordinator) {
    return "/admin-dashboard";
  } else if (role === ROLES.client) {
    return "/admin-dashboard";
  } else if (role === ROLES.instructor) {
    return "/admin-dashboard";
  } else if (role === ROLES.superAdmin) {
    return "/admin-dashboard";
  }

  // If Non of above condition's true, so return dashboard (Admin)
  return "/admin-dashboard"
}