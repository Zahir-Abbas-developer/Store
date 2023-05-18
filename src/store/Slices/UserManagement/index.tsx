import { emptySplitApi } from "../../Services";

const getLocalStorage: any | string | null = localStorage.getItem("careUserData");
const { id: getUserId } = JSON.parse(getLocalStorage);

export const UserManagement: any = emptySplitApi.injectEndpoints({
  endpoints: (builder: any) => (({
    addClientUser: builder.mutation({
      query: (payload: any) => ({
        url: `/profile/admin-user/${getUserId}`,
        method: "POST",
        body: payload
      }),
      invalidatesTags: ["userManagement"],
    }),

    getClientUser: builder.query({
      query: ({ department, search, page }: any) => ({
        url: `/profile/admin-users?userId=${getUserId}&departmentId=${department}&search=${search}&page=${page.page}&limit=${page.limit}`,
        method: "GET"
      }),
      providesTags: ["userManagement"],
    }),

    deleteClientUser: builder.mutation({
      query: (userId: any) => ({
        url: `/profile/delete-admin-user?adminId=${userId}`,
        method: 'DELETE'
      }),
      invalidatesTags: ["userManagement"],
    }),

    updateClientUser: builder.mutation({
      query: ({ payload, id }: any) => ({
        url: `/profile/update-admin-user?adminId=${id}`,
        method: "PATCH",
        body: payload
      }),
      invalidatesTags: ["userManagement"],
    })
  }))
})

export const { useAddClientUserMutation, useGetClientUserQuery, useDeleteClientUserMutation, useUpdateClientUserMutation } = UserManagement;