import { emptySplitApi } from "../../../Services";

export const SettingBreakTimeApis = emptySplitApi.injectEndpoints({
  endpoints: (builder: any) => ({
    getBreakTime: builder.query({
      query: () => ({
        url: `/break?page=1&limit=10`,
        method: "GET",
        keepUnusedDataFor: 1,
      }),
      providesTags: ["SettingBreakTime"],
    }),

    getBreakTimeFilter: builder.query({
      query: ({ filteredValuesss, query, pagination }: any) => ({
        url: `/break?page=${pagination.page}&limit=${pagination.limit}${"&" + filteredValuesss}${query}`,
        method: "GET",
        keepUnusedDataFor: 1,
      }),
      providesTags: ["SettingBreakTime"],
    }),

    postBreakTime: builder.mutation({
      query: ({ payload }: any) => ({
        url: "/break",
        method: "post",
        body: payload,
      }),
      invalidatesTags: ["SettingBreakTime"],
    }),
    deleteBreakTime: builder.mutation({
      query: (id: string) => ({
        url: `/break/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SettingBreakTime"],
    }),

    updateBreakTime: builder.mutation({
      query: ({ id, payload }: any) => ({
        url: `/break/${id}`,
        method: "PATCH",
        body: payload,
      }),

      invalidatesTags: ["SettingBreakTime"],
    }),
  }),
});

export const {
  useGetBreakTimeQuery,
  useGetBreakTimeFilterQuery,
  usePostBreakTimeMutation,
  useDeleteBreakTimeMutation,
  useUpdateBreakTimeMutation,
} = SettingBreakTimeApis;