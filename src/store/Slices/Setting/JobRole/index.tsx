import { emptySplitApi } from "../../../Services";

export const SettingJobRoleApis = emptySplitApi.injectEndpoints({
  endpoints: (builder: any) => ({
    getJobRequest: builder.query({
      query: () => ({
        url: `/job-roles?page=1&limit=999`,
        method: "GET",
        keepUnusedDataFor: 1,
      }),
      providesTags: ["SettingJobRole"],
    }),

    getJobRequestFilter: builder.query({
      query: ({ query, pagination }: any) => ({
        url: `/job-roles?page=${pagination.page}&limit=${pagination.limit}${query}`,
        method: "GET",
        keepUnusedDataFor: 1,
      }),
      providesTags: ["SettingJobRole"],
    }),

    postJobRequest: builder.mutation({
      query: ({ payload }: any) => ({
        url: "/job-roles",
        method: "post",
        body: payload,
      }),
      invalidatesTags: ["SettingJobRole"],
    }),
    deleteJobRequest: builder.mutation({
      query: (id: string) => ({
        url: `/job-roles/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SettingJobRole"],
    }),

    updateJobRequest: builder.mutation({
      query: ({ id, payload }: any) => ({
        url: `/job-roles/${id}`,
        method: "PATCH",
        body: payload,
      }),

      invalidatesTags: ["SettingJobRole"],
    }),

    updateCrossAllocation: builder.mutation({
      query: ({ id, payload }: any) => ({
        url: `/job-roles/${id}`,
        method: "PATCH",
        body: payload,
      }),

      invalidatesTags: ["SettingJobRole"],
    }),

  }),
});

export const {
  useGetJobRequestQuery,
  useGetJobRequestFilterQuery,
  usePostJobRequestMutation,
  useDeleteJobRequestMutation,
  useUpdateJobRequestMutation,
  useUpdateCrossAllocationMutation,
} = SettingJobRoleApis;