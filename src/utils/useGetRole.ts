import { NEW_ROLES } from "../constants/Roles"

export const useGetRoleLabel = (role: string) => {
  return NEW_ROLES.find((item: any) => {
    return role === item.name &&
    {
      name: item?.name,
      label: item?.label
    }
  })
}