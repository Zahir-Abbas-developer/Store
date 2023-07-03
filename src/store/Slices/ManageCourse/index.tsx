import { emptySplitApi } from "../../Services";
export const ManageCourseApi = emptySplitApi.injectEndpoints({
  endpoints: (builder: any) => ({
    //Get main course
    getCourses: builder.query({
      query: ({query}:any) => ({
        url: `/manage-courses?${query}`,
        method: "GET",
        keepUnusedDataFor: 1,
      }),

      providesTags: ["manage-courses"],
    }),

    deleteCourse: builder.mutation({
      query: (id: any) => ({
        url: `/manage-courses/${id}`,
        method: "DELETE",
        keepUnusedDataFor: 1,
      }),
      invalidatesTags: ["manage-courses"],
    }),

    deleteCourseSection: builder.mutation({
      query: ({id}: any) => ({
        url: `/manage-courses/create-content/section/${id}`,
        method: "DELETE",
        keepUnusedDataFor: 1,
      }),
      invalidatesTags: ["manage-courses"],
    }),
    deleteSectionsLectures: builder.mutation({
      query: ({id}: any) => ({
        url: `/manage-courses/create-content/lectures/${id}`,
        method: "DELETE",
        keepUnusedDataFor: 1,
      }),
      invalidatesTags: ["manage-courses"],
    }),

    postPlanYourCourseRequest: builder.mutation({
      query: ({ payload }: any) => ({
        url: "/manage-courses/plan-course",
        method: "post",
        body: payload,
      }),

      invalidatesTags: ["manage-courses"],
    }),

    postCreateYourContentRequest: builder.mutation({
      query: ({ payload }: any) => ({
        url: "/manage-courses/create-content/sections",
        method: "post",
        body: payload,
      }),

      invalidatesTags: ["manage-courses"],
    }),


    patchPlanYourCourseRequest: builder.mutation({        //TODO Update Plan your course
      query: ({ id, payload }: any) => ({
        url: `/manage-courses/plan-course/${id}`,
        method: "PATCH",
        body: payload,
      }),

      invalidatesTags: ["manage-courses"],
    }),


    getCoursesDetails: builder.query({
      query: ({id, routeCheck}:any) => ({
        
        url: `${routeCheck === "all-courses" ? `/view-courses/${id}` : `/manage-courses/${id}`}`,
        method: "GET",
        keepUnusedDataFor: 1,
      }),

      providesTags: ["manage-courses"],
    }),


    //create your content =>

    getCoursesDetailsSections: builder.query({
      query: (id: any) => ({
        url: `/manage-courses/section/${id}`,
        method: "GET",
        keepUnusedDataFor: 1,
      }),
      providesTags: ["manage-courses"],
    }),

    getSections: builder.query({
      query: (id: any) => ({
        url: `/manage-courses/create-content/sections?courseId=${id}`,
        method: "GET",
        keepUnusedDataFor: 1,
      }),
      providesTags: ["manage-courses"],
    }),

    postCourseSectionRequest: builder.mutation({
      query: ({ payload }: any) => ({
        url: "/manage-courses/create-content/sections",
        method: "post",
        body: payload,
      }),

      invalidatesTags: ["manage-courses"],
    }),

    patchCourseSectionRequest: builder.mutation({
      query: ({ id, payload }: any) => ({
        url: `/manage-courses/create-content/sections/${id}`,
        method: "PATCH",
        body: payload,
      }),

      invalidatesTags: ["manage-courses"],
    }),

    getSectionsLectures: builder.query({
      query: ({sectionId, routeCheck}:any) => ({
        // url: `/manage-courses/create-content/lectures?sectionId=${sectionId}`,
        url: `${routeCheck === "all-courses" ? `/view-courses/course/section/${sectionId}` : `/manage-courses/create-content/lectures?sectionId=${sectionId}`}`,
        method: "GET",
        keepUnusedDataFor: 1,
      }),
      providesTags: ["manage-courses"],
    }),

    postContentLectureRequest: builder.mutation({
      query: ({ payload }: any) => ({
        url: "/manage-courses/create-content/lectures",
        method: "post",
        body: payload,
      }),

      invalidatesTags: ["manage-courses"],
    }),

    patchContentLectureRequest: builder.mutation({
      query: ({ id, payload }: any) => ({
        url: `/manage-courses/create-content/lectures/${id}`,
        method: "PATCH",
        body: payload,
      }),

      invalidatesTags: ["manage-courses"],
    }),
    patchPublishCourseRequest: builder.mutation({
      query: ({ id, payload }: any) => ({
        url: `/manage-courses/publish-course/${id}`,
        method: "PATCH",
        body: payload,
      }),

      invalidatesTags: ["manage-courses"],
    }),

    putPublishCourseRequest: builder.mutation({
      query: ({payload }: any) => ({
        url: `/manage-courses/publish-course`,
        method: "POST",
        body: payload,
      }),

      invalidatesTags: ["manage-courses"],
    }),


    getJobRolesRequest: builder.query({
      query: () => ({
        url: `job-roles`,
        method: "GET",
        keepUnusedDataFor: 1,
      }),
      providesTags: ["manage-courses"],
    }),
    getManageCourseDetailData: builder.query({
      query: ({id}:any) => ({
        url: `/manage-courses/get-course/${id}`,
        method: "GET",
        keepUnusedDataFor: 1,
      }),
      providesTags: ["manage-courses"],
    }),

    postPublishPhotoRequest: builder.mutation({
      query: ( payload : any) => {
        let formData = new FormData();
        formData.append("file", payload?.file);
        return {  url: `media/upload`,
        method: "post",
        body: formData}
      },
      invalidatesTags: ["manage-courses"],
    }),

    postPublishFileRequest: builder.mutation({
      query: ( payload : any) => {
        let formData = new FormData();
        formData.append("file", payload?.file);
        return {  url: `media/upload`,
        method: "post",
        body: formData}
      },
      invalidatesTags: ["manage-courses"],
    }),


  }),
});

export const {
  useGetCoursesQuery,
  useDeleteCourseMutation,
  useGetCoursesDetailsQuery,
  useGetCoursesDetailsSectionsQuery,
  usePostPlanYourCourseRequestMutation,
  usePatchPlanYourCourseRequestMutation,
  usePostCreateYourContentRequestMutation,
  usePostCourseSectionRequestMutation,
  usePatchCourseSectionRequestMutation,
  usePostContentLectureRequestMutation,
  usePatchContentLectureRequestMutation,
  usePutPublishCourseRequestMutation,
  useGetJobRolesRequestQuery,
  useGetSectionsLecturesQuery,
  useGetSectionsQuery,
  useDeleteCourseSectionMutation,
  useDeleteSectionsLecturesMutation,
  usePostPublishPhotoRequestMutation,
  usePatchPublishCourseRequestMutation,
  useGetManageCourseDetailDataQuery,

  usePostPublishFileRequestMutation,


} = ManageCourseApi;
