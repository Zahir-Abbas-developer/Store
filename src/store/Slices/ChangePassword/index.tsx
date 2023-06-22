import { emptySplitApi } from "../../Services";
export const extendedApi = emptySplitApi.injectEndpoints({
  endpoints: (builder: any) => ({
    changePasswordPostRequest: builder.mutation({
      query: ({ payload }: any) => ({
        url: "/auth/password-change",
        method: "post",
        body: payload,
      }),

    }),
  }),
});

export const { 
  useChangePasswordPostRequestMutation, 
} = extendedApi;
