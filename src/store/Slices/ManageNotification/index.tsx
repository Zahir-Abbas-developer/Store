import { emptySplitApi } from "../../Services";
export const SuperAdminNotifications = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getNoticationsList: builder.query({
      query: ({searchValue,pagination}) => ({
        url: `notification${searchValue && `&search=${searchValue}`}`,
        method: "GET",
      }),
      providesTags: ["notifications"],
    }),
    getAllUsersList: builder.query({
      query: () => ({
        url: "manage-user?limit=1000&roleName=all",
        method: "GET",
      }),
    }),
    getAllUsersRolesList: builder.query({
      query: () => ({
        url: "auth/user-type?limit=10000",
        method: "GET",
      }),
    }),
    addNotification: builder.mutation({
      query: (payload) => ({
        url: "notification",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["notifications"],
    }),
    editNotification: builder.mutation({
      query: ({ id, payload }) => ({
        url: `notification/${id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["notifications"],
    }),
    deleteNotification: builder.mutation({
      query: (id) => ({
        url: `notification/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["notifications"],
    }),
  }),
});

export const { useGetNoticationsListQuery, useAddNotificationMutation, useEditNotificationMutation, useDeleteNotificationMutation, useGetAllUsersListQuery,useGetAllUsersRolesListQuery } = SuperAdminNotifications;
