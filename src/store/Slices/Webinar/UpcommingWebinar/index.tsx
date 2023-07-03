import { emptySplitApi } from "../../../Services";
export const UpcomingWebinarApi = emptySplitApi.injectEndpoints({
  endpoints: (builder: any) => ({
    //Get main course
    getUpcomingWebinarData: builder.query({
      query: ({query}:any) => ({
        url: `/upcoming-webinar?${query}`,
        method: "GET",
        keepUnusedDataFor: 1,
      }),
      providesTags: ["upcoming-webinar"],
    }),


    deleteUpcomingWebinar: builder.mutation({
      query: (id: any) => ({
        url: `/upcoming-webinar/${id}`,
        method: "DELETE",
        keepUnusedDataFor: 1,
      }),
      invalidatesTags: ["upcoming-webinar"],
    }),

    postAddWebinarDetails: builder.mutation({
      query: ({ payload }: any) => ({
        url: "/upcoming-webinar/details",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["upcoming-webinar"],
    }),
    

    patchWebinarDetails: builder.mutation({   
      query: ({ payload, id }: any) => ({
        url: `/upcoming-webinar/details/${id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["upcoming-webinar"],
    }),

    patchWebinarAttendes: builder.mutation({   
      query: ({ payload, id }: any) => ({
        url: `/upcoming-webinar/attendees/${id}`,
        method: "PATCH",
        body: payload,
      }),

      invalidatesTags: ["upcoming-webinar"],
    }),

    postAddWebinaAttendees: builder.mutation({
      query: ({ payload, id }: any) => ({
        url: `/upcoming-webinar/attendees?webinarId=${id}`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["upcoming-webinar"],
    }),

    getAttendessData: builder.query({
      query: () => ({
        url: `/job-roles`,
        method: "GET",
        keepUnusedDataFor: 1,
      }),

      providesTags: ["upcoming-webinar"],
    }),

    getUpcomingWebinarByID: builder.query({
      query: ({id}:any) => ({
        url: `/upcoming-webinar/${id}`,
        method: "GET",
        keepUnusedDataFor: 1,
      }),

      providesTags: ["upcoming-webinar"],
    }),

    getRequestedAttendees: builder.query({
      query: ({id, query}:any) => ({
        url: `/upcoming-webinar/requested-attendees?webinarId=${id}${query}`,
        method: "GET",
        keepUnusedDataFor: 1,
      }),

      providesTags: ["upcoming-webinar"],
    }),


    

  }),
});

export const {
  useGetUpcomingWebinarDataQuery,
  usePostAddWebinarDetailsMutation,
  usePatchWebinarDetailsMutation,
  usePostAddWebinaAttendeesMutation,
  useGetAttendessDataQuery,
  useGetUpcomingWebinarByIDQuery,
  usePatchWebinarAttendesMutation,
  useDeleteUpcomingWebinarMutation,

  useGetRequestedAttendeesQuery,

} = UpcomingWebinarApi;
