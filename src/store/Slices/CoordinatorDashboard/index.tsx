import { emptySplitApi } from "../../Services";

export const CoordinatorDashboardApis = emptySplitApi.injectEndpoints({
  endpoints: (builder: any) => ({
    getCoordinatorDashboardCarers: builder.query({
      query: () => ({
        url: `/profile/carecoordinator-dashboard/`,
        method: "GET",
      }),
      providesTags: ["CoordinatorDashboard"],
    }),

    getCoordinatorShiftInsights: builder.query({
      query: ({query}:any) => ({
        url: `/shifts/insight?${query}`,
        method: "GET",
      }),
      providesTags: ["CoordinatorDashboard"],
    }),

    getCoordinatorCareHomeRequests: builder.query({
      query: ({ query }: any) => ({
        url: `/profile/carecoordinator-dashboard${query}`,
        method: "GET",
      }),
      providesTags: ["CoordinatorDashboard"],
    }),


    getCoordinatorShiftBooking: builder.query({
      query: () => ({
        url: `/shifts/manage-days`,
        method: "GET",
      }),
      providesTags: ["CoordinatorDashboard"],
    }),

    getCoordinatorShift: builder.query({
      query: () => ({
        url: `/shifts?shiftStatus=PUBLISHED`,
        method: "GET",
      }),
      providesTags: ["CoordinatorDashboard"],
    }),


    getCoordinatorWhistleBlowsing: builder.query({
      query: () => ({
        url: `/whistle-blowing/carehomes`,
        method: "GET",
      }),
      providesTags: ["CoordinatorDashboard"],
    }),


    postStaffSendEmail: builder.mutation({
      query: ({ query }: any) => ({
        url: `/staff/send-email${query}`,
        method: "POST",
        // body: payload,
      }),

      invalidatesTags: ["CoordinatorDashboard"],
    }),


  }),
});

export const {
  useGetCoordinatorDashboardCarersQuery,
  useGetCoordinatorShiftInsightsQuery,
  useGetCoordinatorCareHomeRequestsQuery,
  useGetCoordinatorShiftBookingQuery,
  useGetCoordinatorShiftQuery,
  useGetCoordinatorWhistleBlowsingQuery,
  usePostStaffSendEmailMutation,
} = CoordinatorDashboardApis;