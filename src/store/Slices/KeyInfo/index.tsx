import { emptySplitApi } from "../../Services";
export const extendedApi = emptySplitApi.injectEndpoints({
  endpoints: (builder: any) => ({
    keyInfoUpdateRequest: builder.mutation({
      query: ({ payload }: any) => ({
        url: "/key-info",
        method: "PUT",
        body: payload,
      }),

    }),
  }),
});

export const { 
useKeyInfoUpdateRequestMutation 
} = extendedApi;
