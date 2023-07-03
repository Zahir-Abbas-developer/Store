import { emptySplitApi } from "../../../Services";

export const SettingKeyInfoApis = emptySplitApi.injectEndpoints({
  endpoints: (builder: any) => ({

    postKeyInfo: builder.mutation({
      query: ({ payload }: any) => ({
        url: "/key-info",
        method: "post",
        body: payload,
      }),
      invalidatesTags: ["SettingKeyInfo"],
      providesTags: ["SettingKeyInfo"],
    }),

    postImageUpload: builder.mutation({
      query: ({ payload }: any) => ({
        url: "/media/upload",
        method: "post",
        body: payload,
      }),
      invalidatesTags: ["SettingKeyInfo"],
      providesTags: ["SettingKeyInfo"],
    }),

    updateKeyInfo: builder.mutation({
      query: ({ id, payload }: any) => ({
        url: `/key-info/${id}`,
        method: "PATCH",
        body: payload,
      }),

      invalidatesTags: ["SettingKeyInfo"],
    }),
  }),
});

export const {
  usePostKeyInfoMutation,
  usePostImageUploadMutation,
  useUpdateKeyInfoMutation,
} = SettingKeyInfoApis;