import { emptySplitApi } from "../../../Services";
export const WebinarHistory = emptySplitApi.injectEndpoints({
  endpoints: (builder: any) => ({
    //Get main course
    getWebinarHistoryData: builder.query({
      query: ({query, pagination}:any) => ({
        url: `/webinar-history?page=${pagination?.page}&limit=7${query}`,
        method: "GET",
        keepUnusedDataFor: 1,
      }),

      providesTags: ["webinar-history"],
    }),

    getWebinarHistoryAttendes: builder.query({
      query: ({id, query}:any) => ({
        url: `/webinar-history/attendees?&webinarId=${id}${query}`,
        method: "GET",
        keepUnusedDataFor: 1,
      }),
      providesTags: ["webinar-history"],
    }),

    getDownloadAttendee: builder.query({
      query: ({id, query}:any) => ({
        url: `webinar-history/download-attendees?webinarId=${id}`,
        method: "GET",
        keepUnusedDataFor: 1,
      }),

      providesTags: ["webinar-history"],
    }),
    


  }),
});

export const {
 useGetWebinarHistoryDataQuery,
 useGetWebinarHistoryAttendesQuery,
 useGetDownloadAttendeeQuery,
} = WebinarHistory;
