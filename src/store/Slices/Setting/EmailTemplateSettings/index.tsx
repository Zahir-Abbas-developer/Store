import { emptySplitApi } from "../../../Services";

export const SettingEmailTemplateSettingsApis = emptySplitApi.injectEndpoints({
  endpoints: (builder: any) => ({
    getEmailTemplateSettings: builder.query({
      query: ({ query, pagination }: any) => ({
        url: `/manage-user?page=${pagination.page}&limit=${pagination.limit}&roleName=client${query}`,
        method: "GET",
        // keepUnusedDataFor: 1,
      }),
      providesTags: ["SettingEmailTemplateSettings"],
    }),

    postEmailTemplateSettings: builder.mutation({
      query: ({ payload }: any) => ({
        url: "/manage-user",
        method: "post",
        body: payload,
      }),
      invalidatesTags: ["SettingEmailTemplateSettings"],
    }),
    deleteEmailTemplateSettings: builder.mutation({
      query: (id: string) => ({
        url: `/manage-user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SettingEmailTemplateSettings"],
    }),

    updateEmailTemplateSettings: builder.mutation({
      query: ({ payload, id }: any) => ({
        url: `/email-template/notification?id=${id}`,
        method: "PUT",
        body: payload,
      }),

      invalidatesTags: ["SettingEmailTemplateSettings"],
    }),
  }),
});

export const {
  useGetEmailTemplateSettingsQuery,
  usePostEmailTemplateSettingsMutation,
  useDeleteEmailTemplateSettingsMutation,
  useUpdateEmailTemplateSettingsMutation,
} = SettingEmailTemplateSettingsApis;