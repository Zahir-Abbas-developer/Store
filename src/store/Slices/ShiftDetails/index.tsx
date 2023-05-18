import { emptySplitApi } from "../../Services";
export const extendedApi = emptySplitApi.injectEndpoints({
  endpoints: (builder: any) => ({
    getRequestAvailable: builder.query({
      query: () => ({
        url: `/shifts/available`,
        method: "GET",
      }),

      providesTags: ["shiftDetailsData"],
    }),

    getRequest: builder.query({
      query: () => ({
        url: `/shifts/available`,
        method: "GET",
      }),

      providesTags: ["shiftDetailsData"],
    }),
    // upcoming shifts
    getRequestUpComingShift: builder.query({
      query: () => ({
        url: `/shifts/allocate?shiftStatus=ACCEPTED`,
        method: "GET",
      }),

      providesTags: ["shiftDetailsData"],
    }),
    // last shifts details
    getRequestLastShift: builder.query({
      query: () => ({
        url: `/shifts/last-shift-detail`,
        method: "GET",
      }),

      providesTags: ["shiftDetailsData"],
    }),
    getRequestConfirmationShift: builder.query({
      query: () => ({
        url: `/shifts/allocate?shiftStatus=PENDING`,
        method: "GET",
      }),

      providesTags: ["shiftDetailsData"],
    }),
    getRequestCompletedShift: builder.query({
      query: ({query}:any) =>  (
        
        {
        url:  `/shifts/allocate?${query!="&shiftStatus=All" ? query:"&shiftStatus=COMPLETED&shiftStatus=SIGNEDOFF"}`,
        method: "GET",
      }),

      providesTags: ["shiftDetailsData"],
    }),
    getRequestCancelledShift: builder.query({
      query: () => ({
        url: `/shifts/allocate?shiftStatus=CANCELED`,
        method: "GET",
      }),

      providesTags: ["shiftDetailsData"],
    }),

    postAcceptShiftRequest: builder.mutation({
      query: (payload: any) => ({
        url: "shifts/allocate",
        method: "POST",
        body: payload,
      }),

      invalidatesTags: ["shiftDetailsData"],
    }),

    updateCancelUpcomingRequest: builder.mutation({
      query: (payload: any) => ({
        url: `/shifts/allocate/cancel`,
        method: "PUT",
        body: payload,
      }),

      invalidatesTags: ["shiftDetailsData"],
    }),
    updateAcceptShiftRequest: builder.mutation({
      query: (payload: any) => ({
        url: `/shifts/allocate`,
        method: "PUT",
        body: payload,
      }),

      invalidatesTags: ["shiftDetailsData"],
    }),
  }),
});

export const {
  useGetRequestAvailableQuery,
  useGetRequestQuery,
  usePostAcceptShiftRequestMutation,
  useUpdateCancelUpcomingRequestMutation,
  useUpdateAcceptShiftRequestMutation,
  useGetRequestUpComingShiftQuery,
  useGetRequestConfirmationShiftQuery,
  useGetRequestLastShiftQuery,
  useGetRequestCompletedShiftQuery,
  useGetRequestCancelledShiftQuery,
} = extendedApi;
