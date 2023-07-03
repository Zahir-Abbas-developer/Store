import { emptySplitApi } from "../../../../Services";

export const SettingRegisterationConfigurationApis = emptySplitApi.injectEndpoints({
  endpoints: (builder: any) => ({
    getRegisterationConfiguration: builder.query({
      query: ({ selectedFilterValue }: any) => ({
        url: `/staff-setting/registration-config?userType=${selectedFilterValue}`,
        method: "GET",
        keepUnusedDataFor: 1,
      }),
      providesTags: ["SettingRegisterationConfiguration"],
    }),

    getClients: builder.query({
      query: (data: any) => ({
        url: `/manage-user?${data?.query ? data?.query : ''}roleName=client`,
        method: "GET",
        keepUnusedDataFor: 1,
      }),
      providesTags: ["SettingRegisterationConfiguration"],
    }),

    postRegisterationConfiguration: builder.mutation({
      query: ({ payload }: any) => ({
        url: "/staff-setting/registration-config",
        method: "post",
        body: payload,
      }),
      invalidatesTags: ["SettingRegisterationConfiguration"],
    }),
    deleteRegisterationConfiguration: builder.mutation({
      query: (id: string) => ({
        url: `/staff-setting/registration-config/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SettingRegisterationConfiguration"],
    }),

    updateRegisterationConfiguration: builder.mutation({
      query: ({ payload }: any) => ({
        url: `/staff-setting/registration-config`,
        method: "POST",
        body: payload,
      }),

      invalidatesTags: ["SettingRegisterationConfiguration"],
    }),




  }),
});

export const {
  useGetClientsQuery,
  useGetRegisterationConfigurationQuery,
  usePostRegisterationConfigurationMutation,
  useDeleteRegisterationConfigurationMutation,
  useUpdateRegisterationConfigurationMutation,
} = SettingRegisterationConfigurationApis;