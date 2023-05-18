import { emptySplitApi } from "../../../Services";

export const SettingFestivalApis = emptySplitApi.injectEndpoints({
  endpoints: (builder: any) => ({
    getFestival: builder.query({
      query: () => ({
        url: `/festival?page=1&limit=10`,
        method: "GET",
        keepUnusedDataFor: 1,
      }),
      providesTags: ["SettingFestival"],
    }),

    postFestival: builder.mutation({
      query: ({ payload }: any) => ({
        url: "/festival",
        method: "post",
        body: payload,
      }),
      invalidatesTags: ["SettingFestival"],
    }),
    deleteFestival: builder.mutation({
      query: (id: string) => ({
        url: `/festival?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SettingFestival"],
    }),

    updateFestival: builder.mutation({
      query: ({ id, payload }: any) => ({
        url: `/festival?id=${id}`,
        method: "PUT",
        body: payload,
      }),

      invalidatesTags: ["SettingFestival"],
    }),
  }),
});

export const {
  useGetFestivalQuery,
  usePostFestivalMutation,
  useDeleteFestivalMutation,
  useUpdateFestivalMutation,
} = SettingFestivalApis;