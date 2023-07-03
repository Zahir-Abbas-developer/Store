import { emptySplitApi } from "../../Services";
export const TrainingApi = emptySplitApi.injectEndpoints({
  endpoints: (builder: any) => ({
    //Get main course
    getCoursesStats: builder.query({
      query: ({query}:any) => ({
        url: `/trainings/courses-stats`,
        method: "GET",
        keepUnusedDataFor: 1,
      }),

      providesTags: ["trainings"],
    }),

    getCararTrainingStats: builder.query({
      query: ({query}:any) => ({
        url: `/trainings/carer-trainings-stats`,
        method: "GET",
        keepUnusedDataFor: 1,
      }),

      providesTags: ["trainings"],
    }),

    getCourseCompletion: builder.query({
      query: ({query}:any) => ({
        url: `/trainings/competion-progress`,
        method: "GET",
        keepUnusedDataFor: 1,
      }),

      providesTags: ["trainings"],
    }),

    getTrainingProgress: builder.query({
      query: ({query}:any) => ({
        url: `/trainings/carer-training-progress`,
        method: "GET",
        keepUnusedDataFor: 1,
      }),

      providesTags: ["trainings"],
    }),

    getMandatoryProgress: builder.query({
      query: ({query}:any) => ({
        url: `/trainings/self-mandatory-course`,
        method: "GET",
        keepUnusedDataFor: 1,
      }),

      providesTags: ["trainings"],
    }),

    // Carer Training  

    getCarerInfo: builder.query({
      query: ({query}:any) => ({
        url: `/trainings/carer-trainings/carer`,
        method: "GET",
        keepUnusedDataFor: 1,
      }),

      providesTags: ["trainings"],
    }),

    getCarerCourses: builder.query({
      query: ({carerId, status}:any) => ({
        url: `/trainings/carer-trainings/carer-courses?carerId=${carerId}&status=${status}`,
        method: "GET",
        keepUnusedDataFor: 1,
      }),

      providesTags: ["trainings"],
    }),

    getCarerCoursesCompleted: builder.query({
      query: ({courseId, carerId, id, isResult}:any) => ({
        // url: `/trainings/carer-trainings/carer-courses/completed/{id}?courseId=${courseId}&carerId=${carerId}`,
        url: `${isResult ? `/my-results/${id}` : `/trainings/carer-trainings/carer-courses/completed/{id}?courseId=${courseId}&carerId=${carerId}`}`,
        method: "GET",
        keepUnusedDataFor: 1,
      }),

      providesTags: ["trainings"],
    }),


    patchMyResultRating: builder.mutation({
      query: ({ id, payload}: any) => ({
        url: `/my-results/rating/${id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["trainings"],
    }),

    postMyResultRating: builder.mutation({
      query: ({ id, payload}: any) => ({
        url: `/my-results/rating`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["trainings"],
    }),

    getViewAllCoursesByCategory: builder.query({
      query: ({courseType, query}:any) => ({
        url: `view-courses?courseType=${courseType}${query}`,
        method: "GET",
        keepUnusedDataFor: 1,
      }),

      providesTags: ["trainings"],
    }),

    getCoursesDetailsTraining: builder.query({
      query: ({id, routeCheck}:any) => ({
        url: `/view-courses/${id}`,
        method: "GET",
        keepUnusedDataFor: 1,
      }),

      providesTags: ["trainings"],
    }),

    getMyCourses: builder.query({
      query: ({status}:any) => ({
        url: `/my-courses?status=${status}`,
        method: "GET",
        keepUnusedDataFor: 1,
      }),

      providesTags: ["trainings"],
    }),


    // apis for get course view sections 

    getMyCoursesById: builder.query({
      query: ({id, isInstructor, createdBy, courseId }:any) => ({
        // url: `/my-courses/${id}`,
        url: `${!isInstructor ? `/my-courses/get-course/${courseId}` || `/trainee-info/user/course?createdBy=${createdBy}&courseId=${courseId}` : `/trainee-info/user/course?createdBy=${createdBy}&courseId=${courseId}`}`,
        method: "GET",
        keepUnusedDataFor: 1,
      }),

      providesTags: ["trainings"],
    }),

    getMyCoursesSectionLectures: builder.query({
      query: ({courseId, sectionId, isInstructor, createdBy}:any) => ({
        // url: `/my-courses/section/lectures?courseId=${courseId}&sectionId=${sectionId}`,
        url: `${isInstructor ? `trainee-info/user/course/section/lectures?courseId=${courseId}&sectionId=${sectionId}&createdBy=${createdBy}` : `/my-courses/get-course/${courseId}`}`,
        method: "GET",
        keepUnusedDataFor: 1,
      }),

      providesTags: ["trainings"],
    }),

    //mark as completed

    postMarkasCompleted: builder.mutation({
      query: ({ payload, isInstructor }: any) => ({
        // url: `/my-courses/section/lecture/mark-lecture-complete`,
        url: `${isInstructor ? `trainee-info/user/course/makelectureComplete` : `/my-courses/section/lecture/mark-lecture-complete`}`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["trainings"],
    }),


    enrollUser: builder.mutation({
      query: ({ payload }: any) => ({
        url: `/view-courses/enroll-user`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["trainings"],
    }),


    // My Notes Requests

    getMyNotesData: builder.query({
      query: ({query}:any) => ({
        url: `/my-notes?${query}`,
        method: "GET",
        keepUnusedDataFor: 1,
      }),

      providesTags: ["trainings"],
    }),
    getNewsAndActivities: builder.query({
      query: ({courseId, sectionId}:any) => ({
        url: `activity-report?activityType=course`,
        method: "GET",
        keepUnusedDataFor: 1,
      }),

      providesTags: ["trainings"],
    }),
    getMyNotesByID: builder.query({
      query: ({id}:any) => ({
        url: `/my-notes/${id}`,
        method: "GET",
        keepUnusedDataFor: 1,
      }),

      providesTags: ["trainings"],
    }),

    postNotes: builder.mutation({
      query: ({ payload }: any) => ({
        url: `/my-notes`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["trainings"],
    }),
   
    patchNotes: builder.mutation({
      query: ({id, payload }: any) => ({
        url: `/my-notes/${id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["trainings"],
    }),
    deleteNote: builder.mutation({
      query: ({id }: any) => ({
        url: `/my-notes/${id}`,
        method: "DELETE",
        keepUnusedDataFor: 1,
      }),
      invalidatesTags: ["trainings"],
    }),

    


    // My notes

    getMyResultsData: builder.query({
      query: ({query}:any) => ({
        url: `/my-results?${query}`,
        method: "GET",
        keepUnusedDataFor: 1,
      }),

      providesTags: ["trainings"],
    }),


  }),
});

export const {
  useGetCoursesStatsQuery,
  useGetCourseCompletionQuery,
  useGetTrainingProgressQuery,
  useGetMandatoryProgressQuery,

  useGetCarerInfoQuery,
  useGetCarerCoursesQuery,
  useGetCarerCoursesCompletedQuery,

  usePatchMyResultRatingMutation,
  useGetCararTrainingStatsQuery,

  usePostMyResultRatingMutation,

  useGetViewAllCoursesByCategoryQuery,
  useGetCoursesDetailsTrainingQuery,
  useGetMyCoursesQuery,

  useGetMyCoursesByIdQuery,
  useGetMyCoursesSectionLecturesQuery,

  usePostMarkasCompletedMutation,

  useGetMyNotesDataQuery,
  usePostNotesMutation,
  useGetMyNotesByIDQuery,
  usePatchNotesMutation,
  useDeleteNoteMutation,

  useGetMyResultsDataQuery,


  useEnrollUserMutation,

  useGetNewsAndActivitiesQuery,



} = TrainingApi;
