import { emptySplitApi } from "../../../Services";

export const SettingBankHolidayApis = emptySplitApi.injectEndpoints({
  endpoints: (builder: any) => ({
    getBankHoliday: builder.query({
      query: ({query,pagination}:any) => ({
        url: `/bank-holiday?page=${pagination.page}&limit=${pagination.limit}${query}`,
        method: "GET",
      }),
      providesTags: ["SettingBankHoliday"],
    }),

    postBankHoliday: builder.mutation({
      query: ({ payload }: any) => ({
        url: "/bank-holiday",
        method: "post",
        body: payload,
      }),
      invalidatesTags: ["SettingBankHoliday"],
    }),
    
    deleteBankHoliday: builder.mutation({
      query: (id: string) => ({
        url: `/bank-holiday/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SettingBankHoliday"],
    }),

    updateBankHoliday: builder.mutation({
      query: ({ id, payload }: any) => ({
        url: `/bank-holiday/${id}`,
        method: "PATCH",
        body: payload,
      }),

      invalidatesTags: ["SettingBankHoliday"],
    }),
  }),
});

export const {
  useGetBankHolidayQuery,
  usePostBankHolidayMutation,
  useDeleteBankHolidayMutation,
  useUpdateBankHolidayMutation,
} = SettingBankHolidayApis;