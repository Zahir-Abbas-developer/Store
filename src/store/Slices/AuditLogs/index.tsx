import { emptySplitApi } from "../../Services";
export const extendedApi = emptySplitApi.injectEndpoints({
  endpoints: (builder: any) => ({
    getAuditLogsRequest: builder.query({
      query: ({page,limit,query}:any) => ({
        url: `/activity-report?page=${page}&limit=${limit}${query?query:""}`,
        method: "GET",
      }),

      providesTags: ["audit"],
    }),
  
  }),
});

export const {
 useGetAuditLogsRequestQuery, 
} = extendedApi;
