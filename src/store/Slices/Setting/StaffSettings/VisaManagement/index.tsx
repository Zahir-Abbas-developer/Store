import { emptySplitApi } from "../../../../Services";

export const SettingVisaManagementApis = emptySplitApi.injectEndpoints({
  endpoints: (builder: any) => ({
    getVisaManagement: builder.query({
      query: () => ({
        url: `/staff-setting/visa`,
        method: "GET",
        keepUnusedDataFor: 1,
      }),
      providesTags: ["SettingVisaManagement"],
    }),

    postVisaManagement: builder.mutation({
      query: ({ payload }: any) => ({
        url: "/staff-setting/visa-management",
        method: "post",
        body: payload,
      }),
      invalidatesTags: ["SettingVisaManagement"],
    }),
    deleteVisaManagement: builder.mutation({
      query: (id: string) => ({
        url: `/staff-setting/visa-management/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SettingVisaManagement"],
    }),

    updateVisaManagement: builder.mutation({
      query: ({payload}:any) => ({
        url: `/staff-setting/visa-management`,
        method: "PUT",
        body: payload,
      }),

      invalidatesTags: ["SettingVisaManagement"],
    }),
  }),
});

export const {
  useGetVisaManagementQuery,
  usePostVisaManagementMutation,
  useDeleteVisaManagementMutation,
  useUpdateVisaManagementMutation,
} = SettingVisaManagementApis;