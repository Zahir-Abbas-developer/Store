import { emptySplitApi } from "../../../../Services";

export const SettingStaffStatusApis = emptySplitApi.injectEndpoints({
  endpoints: (builder: any) => ({
    getStaffStatus: builder.query({
      query: () => ({
        url: `/staff-setting/staff-status?page=1&limit=999`,
        method: "GET",
        keepUnusedDataFor: 1,
      }),
      providesTags: ["SettingStaffStatus"],
    }),

    postStaffStatus: builder.mutation({
      query: ({ payload }: any) => ({
        url: "/staff-setting/staff-status",
        method: "post",
        body: payload,
      }),
      invalidatesTags: ["SettingStaffStatus"],
    }),
    deleteStaffStatus: builder.mutation({
      query: (id: string) => ({
        url: `/staff-setting/staff-status/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SettingStaffStatus"],
    }),

    updateStaffStatus: builder.mutation({
      query: ({ id, payload }: any) => ({
        url: `/staff-setting/staff-status?id=${id}`,
        method: "PUT",
        body: payload,
      }),

      invalidatesTags: ["SettingStaffStatus"],
    }),
  }),
});

export const {
  useGetStaffStatusQuery,
  usePostStaffStatusMutation,
  useDeleteStaffStatusMutation,
  useUpdateStaffStatusMutation,
} = SettingStaffStatusApis;