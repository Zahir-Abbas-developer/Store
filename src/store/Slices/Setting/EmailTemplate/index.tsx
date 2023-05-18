import { emptySplitApi } from "../../../Services";

export const SettingEmailTemplateApis = emptySplitApi.injectEndpoints({
  endpoints: (builder: any) => ({
    getEmailTemplate: builder.query({
      query: () => ({
        url: `/email-template?page=1&limit=10`,
        method: "GET",
        keepUnusedDataFor: 1,
      }),
      providesTags: ["SettingEmailTemplate"],
    }),

    postEmailTemplate: builder.mutation({
      query: ({ payload }: any) => ({
        url: "/email-template",
        method: "post",
        body: payload,
      }),
      invalidatesTags: ["SettingEmailTemplate"],
    }),
    deleteEmailTemplate: builder.mutation({
      query: (id: string) => ({
        url: `/email-template?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SettingEmailTemplate"],
    }),

    updateEmailTemplate: builder.mutation({
      query: ({ id, payload }: any) => ({
        url: `/email-template?id=${id}`,
        method: "PUT",
        body: payload,
      }),

      invalidatesTags: ["SettingEmailTemplate"],
    }),
  }),
});

export const {
  useGetEmailTemplateQuery,
  usePostEmailTemplateMutation,
  useDeleteEmailTemplateMutation,
  useUpdateEmailTemplateMutation,
} = SettingEmailTemplateApis;