import { TAGS, emptySplitApi } from "../../Services";
export const extendedApi = emptySplitApi.injectEndpoints({
  endpoints: (builder: any) => ({
    signInPostRequest: builder.mutation({
      query: ({ payload }: any) => ({
        url: "/auth/login",
        method: "post",
        body: payload,
      }),

      invalidatesTags: ["signin"],
    }),
  
    resetPasswordRequest: builder.mutation({
      query: ({ payload }: any) => ({
        url: "/auth/new-password",
        method: "post",
        body: payload,
      }),

      invalidatesTags: ["signin"],
    }),
    forgetPasswordRequest: builder.mutation({
      query: ({ payload }: any) => ({
        url: "/auth/password-reset",
        method: "post",
        body: payload,
      }),

      invalidatesTags: ["signin"],
    }),
    newPasswordRequest: builder.mutation({
      query: ({ payload }: any) => ({
        url: "/auth/password-reset/confirm",
        method: "post",
        body: payload,
      }),

      invalidatesTags: ["signin"],
    }),
    logout: builder.mutation({
      queryFn: () => ({ data: null }),

      invalidatesTags: TAGS,
    }),
  }),
});

export const { useSignInPostRequestMutation, useResetPasswordRequestMutation ,useLogoutMutation,useForgetPasswordRequestMutation ,useNewPasswordRequestMutation } =
  extendedApi;
