import { emptySplitApi } from "../../Services";
export const extendedApi = emptySplitApi.injectEndpoints({
  endpoints: (builder: any) => ({
    getOverAllRatingsRequest: builder.query({
      query: ({id}:any) => ({
        url: `/ratings/overall-ratings`,
        method: "GET",
      }),

      providesTags: ["ratings"],
    }),
  
  }),
});

export const {
 useGetOverAllRatingsRequestQuery, 
} = extendedApi;
