import { emptySplitApi } from "../../../Services";

export const SettingChangePasswordApis = emptySplitApi.injectEndpoints({
  endpoints: (builder: any) => ({
    postChangePassword: builder.mutation({
      query: ({ newPayload }: any) => ({
        url: `/auth/change-password`,
        method: "POST",
        body: newPayload,
      }),

      invalidatesTags: ["SettingChangePassword"],
    }),
  }),
});

export const {
  usePostChangePasswordMutation,
} = SettingChangePasswordApis;