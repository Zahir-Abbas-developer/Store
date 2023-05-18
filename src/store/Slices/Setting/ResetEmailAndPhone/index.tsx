import { emptySplitApi } from "../../../Services";

export const SettingResetEmailAndPhoneApis = emptySplitApi.injectEndpoints({
  endpoints: (builder: any) => ({
    getResetEmailAndPhone: builder.query({
      query: ({id }: any) => ({
        url: `/profile/admin-users?page=1&limit=10&userId=${id}`,
        method: "get",
        keepUnusedDataFor: 1,
      }),
      invalidatesTags: ["SettingResetEmailAndPhone"],
    }),

    postResetEmailAndPhone: builder.mutation({
      query: ( {payload} : any) => ({
        url: "/profile/change-email-phone",
        method: "post",
        body: payload,
      }),
      invalidatesTags: ["SettingResetEmailAndPhone"],
    }),

    updateResetEmailAndPhone: builder.mutation({
      query: ({ payload }: any) => ({
        url: `/profile`,
        method: "PATCH",
        body: payload,
      }),

      invalidatesTags: ["SettingResetEmailAndPhone"],
    }),

  }),
});

export const {
  useGetResetEmailAndPhoneQuery,
  usePostResetEmailAndPhoneMutation,
  useUpdateResetEmailAndPhoneMutation,
} = SettingResetEmailAndPhoneApis;