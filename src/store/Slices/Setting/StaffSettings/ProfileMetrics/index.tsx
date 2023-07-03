import { emptySplitApi } from "../../../../Services";

export const SettingProfileMetricsApis = emptySplitApi.injectEndpoints({
  endpoints: (builder: any) => ({
    getProfileMetrics: builder.query({
      query: () => ({
        url: `/staff-setting/profile-metrics?page=1&limit=10`,
        method: "GET",
        keepUnusedDataFor: 1,
      }),
      providesTags: ["SettingProfileMetrics"],
    }),

    postProfileMetrics: builder.mutation({
      query: ({ payload }: any) => ({
        url: "/staff-setting/profile-metrics",
        method: "post",
        body: payload,
      }),
      invalidatesTags: ["SettingProfileMetrics"],
    }),
    deleteProfileMetrics: builder.mutation({
      query: (id: string) => ({
        url: `/staff-setting/profile-metrics/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SettingProfileMetrics"],
    }),

    updateProfileMetrics: builder.mutation({
      query: ({ id, payload }: any) => ({
        url: `/staff-setting/profile-metrics/${id}`,
        method: "PATCH",
        body: payload,
      }),

      invalidatesTags: ["SettingProfileMetrics"],
    }),
  }),
});

export const {
  useGetProfileMetricsQuery,
  usePostProfileMetricsMutation,
  useDeleteProfileMetricsMutation,
  useUpdateProfileMetricsMutation,
} = SettingProfileMetricsApis;