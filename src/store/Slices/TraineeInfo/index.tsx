import { emptySplitApi } from "../../Services";
export const TraineeInfoApi = emptySplitApi.injectEndpoints({
  endpoints: (builder: any) => ({
    //Get main course
    getTraineeInfoData: builder.query({
      query: ({query}:any) => ({
        url: `/trainee-info?page=1&limit=10${query}`,
        method: "GET",
        keepUnusedDataFor: 1,
      }),

      providesTags: ["trainee-info"],
    }),

    getUserEnrolledCourses: builder.query({
      query: (id: any) => ({
        url: `/trainee-info/${id}`,
        method: "GET",
        keepUnusedDataFor: 1,
      }),

      providesTags: ["trainee-info"],
    }),

    getTraineeInfoUserCourse: builder.query({
      query: (userId:any, courseId:any) => ({
        url: `/trainee-info/user/course?userId=${userId}&courseId=${courseId}`,
        method: "GET",
        keepUnusedDataFor: 1,
      }),

      providesTags: ["trainee-info"],
    }),

    getAttendessInfoData: builder.query({
      query: () => ({
        url: `/job-roles`,
        method: "GET",
        keepUnusedDataFor: 1,
      }),

      providesTags: ["trainee-info"],
    }),

    postImportAttendees: builder.mutation({
      query: ({ payload}: any) => ({
        url: `/webinar-history/import-attendees`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["trainee-info"],
    }),

    postSendCertificate: builder.mutation({
      query: ({ payload}: any) => ({
        url: `/webinar-history/send-certificates`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["trainee-info"],
    }),


  }),
});

export const {
  useGetTraineeInfoDataQuery,
  useGetUserEnrolledCoursesQuery,
  usePostImportAttendeesMutation,
  useGetAttendessInfoDataQuery,

  usePostSendCertificateMutation,

} = TraineeInfoApi;
