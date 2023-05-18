import { emptySplitApi } from "../../../Services";

export const SettingDbsConfigurationApis = emptySplitApi.injectEndpoints({
  endpoints: (builder: any) => ({
    getDbsConfiguration: builder.query({
      query: ({ query,pagination}:any) => ({
        url: `/dbs?page=${pagination.page}&limit=${pagination.limit}${query}`,
        method: "GET",
        keepUnusedDataFor: 1,
      }),
      providesTags: ["SettingDbsConfiguration"],
    }),

    postDbsConfiguration: builder.mutation({
      query: ({ payload }: any) => ({
        url: "/dbs",
        method: "post",
        body: payload,
      }),
      invalidatesTags: ["SettingDbsConfiguration"],
    }),
    
    deleteDbsConfiguration: builder.mutation({
      query: (id: string) => ({
        url: `/dbs?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SettingDbsConfiguration"],
    }),

    updateDbsConfiguration: builder.mutation({
      query: ({ id, payload }: any) => ({
        url: `/dbs?id=${id}`,
        method: "PUT",
        body: payload,
      }),

      invalidatesTags: ["SettingDbsConfiguration"],
    }),
  }),
});

export const {
  useGetDbsConfigurationQuery,
  usePostDbsConfigurationMutation,
  useDeleteDbsConfigurationMutation,
  useUpdateDbsConfigurationMutation,
} = SettingDbsConfigurationApis;