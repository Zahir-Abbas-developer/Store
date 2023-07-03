import { emptySplitApi } from "../../Services";
export const extendedApi = emptySplitApi.injectEndpoints({
  endpoints: (builder: any) => ({
    getUserOtherInfoRequest: builder.query({
      query: ({userId,detail}:any) => ({
        url: `/users-info/profile?userId=${userId}&detail=${detail}`,
        method: "GET",
      }),

      providesTags: ["userOtherInformation"],
    }),
  
  }),
});

export const {
 useGetUserOtherInfoRequestQuery, 
} = extendedApi;
