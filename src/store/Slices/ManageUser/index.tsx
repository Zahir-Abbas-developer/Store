import { emptySplitApi } from "../../Services";

export const extendedApi = emptySplitApi.injectEndpoints({
  endpoints: (builder: any) => ({
    getManageUserRequest: builder.query({
      query: ({ pagination, roleId,roleName, query }: any) => ({
        url: `/manage-user?page=${pagination?.page}&limit=${pagination?.limit}${roleId ? `&roleId=${roleId}`:''}${roleName ? `&roleName=${roleName}`:''}${query ? query:''} `,
        method: "GET",
      }),
      providesTags: ["manage-user"],
    }),
    getAuthUserTypeRequest: builder.query({
      query: () => ({
        url: `auth/user-type?page=1&limit=10`,
        method: "GET",
      }),

      providesTags: ["UserType"],
    }),

    postAuthSignupAdminRequest: builder.mutation({
      query: ({ payload }: any) => ({
        url: `auth/signup-admin`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["manage-user"],
    }),
    postAuthSignupClientRequest: builder.mutation({
      query: ({ payload }: any) => ({
        url: `auth/signup-client`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["manage-user"],
    }),
    postAuthOnBoardingRequest: builder.mutation({
      query: ({ payload }: any) => ({
        url: `auth/onboarding`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["manage-user"],
    }),
    UpdateManageUser: builder.mutation({
      query: ({ id, payload }: any) => ({
        url: `manage-user/${id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["manage-user"],
    }),
    ManageUserResetPassword: builder.mutation({
      query: ({ email }: any) => ({
        url: `manage-user/reset?email=${email.email}`,
        method: "PUT",
        body: email,
      }),
      invalidatesTags: ["manage-user"],
    }),
    //UserRights


    getUserRights: builder.query({
      query: ({ roleId, query }: any) => ({
        url: `user-rights?roleId=${roleId}${query}`,
        method: "Get",
      }),
      providesTags: ["UserRights"],
    }),

    postUserRights: builder.mutation({
      query: ({ payload }: any) => ({
        url: `user-rights`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["UserRights"],
    }),
    putUserRights: builder.mutation({
      query: ({ id,payload }: any) => ({
        url: `user-rights/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["UserRights"],
    }),

    UserRightsResetPassword: builder.query({
      query: (roleId: any) => ({
        url: `user-rights/reset/${roleId}`,
        method: "Get",
      }),
      providesTags: ["UserRights"],
    }),
  }),
});

export const {
  useGetManageUserRequestQuery,
  useGetAuthUserTypeRequestQuery,
  usePostAuthSignupAdminRequestMutation,
  usePostAuthSignupClientRequestMutation,
  usePostAuthOnBoardingRequestMutation,
  useUpdateManageUserMutation,
  useManageUserResetPasswordMutation,
  useGetUserRightsQuery,
  usePostUserRightsMutation,
  useUserRightsResetPasswordQuery,
  usePutUserRightsMutation
  
} = extendedApi;
