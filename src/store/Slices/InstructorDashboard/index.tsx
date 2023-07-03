import { emptySplitApi } from "../../Services";

export const IntructorDashboardApis = emptySplitApi.injectEndpoints({
  endpoints: (builder: any) => ({
    getIntructorDashboard: builder.query({
      query: () => ({
        url: `/instructor-dashboard/enrolled-trainee-per-month`,
        method: "GET",
        keepUnusedDataFor: 1,
      }),
      providesTags: ["IntructorDashboard"],
    }),

    getIntructorDashboardActivities: builder.query({
      query: () => ({
        url: `/activity-report?activityType=course`,
        method: "GET",
        keepUnusedDataFor: 1,
      }),
      providesTags: ["IntructorDashboard"],
    }),
    

    getIntructorDashboardStudent: builder.query({
      query: () => ({
        url: `/instructor-dashboard/total-number-of-student`,
        method: "GET",
        keepUnusedDataFor: 1,
      }),
      providesTags: ["IntructorDashboard"],
    }),
    
    getIntructorDashboardCalendar: builder.query({
      query: () => ({
        url: `/instructor-dashboard/calendar`,
        method: "GET",
        keepUnusedDataFor: 1,
      }),
      providesTags: ["IntructorDashboard"],
    }),


  }),
});

export const {
  useGetIntructorDashboardQuery,
  useGetIntructorDashboardActivitiesQuery,
  useGetIntructorDashboardStudentQuery,
  useGetIntructorDashboardCalendarQuery,
} = IntructorDashboardApis;