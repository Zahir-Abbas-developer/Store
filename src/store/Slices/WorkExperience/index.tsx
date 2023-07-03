import { emptySplitApi } from "../../Services";
export const extendedApi = emptySplitApi.injectEndpoints({
  endpoints: (builder: any) => ({
    getWorkExperienceRequestById: builder.query({
      query: ({id}:any) => ({
        url: `user/experience?Id=${id}`,
        method: "GET",
      }),

      providesTags: ["onBoarding"],
    }),
    getUnEmploymentRequestById: builder.query({
      query: ({id}:any) => ({
        url: `user/un-employee?Id=${id}`,
        method: "GET",
      }),

      providesTags: ["onBoarding"],
    }),
    postUnEmployementRequest: builder.mutation({
      query: ({ payload ,id}: any) => ({
        url: `user/un-employement?userId=${id}`, // use the endpoint URL from the argument
        method: "post",
        body: payload,
      }),

      invalidatesTags: ["onBoarding"],
    }),
    updateUnEmployementRequest: builder.mutation({
      query: ({ id, payload }: any) => ({
        url: `user/un-employee?unEmployeeId=${id}`,
        method: "put",
        body: payload,
      }),

      invalidatesTags: ["onBoarding"],
    }),
    postWorkExperienceRequest: builder.mutation({
        query: ({ payload ,id}: any) => ({
          url: `user/experience?userId=${id}`, // use the endpoint URL from the argument
          method: "post",
          body: payload,
        }),
  
        invalidatesTags: ["onBoarding"],
      }),
      postTrainingCertificatesRequest: builder.mutation({
        query: ({ payload ,id}: any) => ({
          url: `user/certificates?userId=${id}`, // use the endpoint URL from the argument
          method: "post",
          body: payload,
        }),
  
        invalidatesTags: ["onBoarding"],
      }),
      getAddAdditionalDetailsRequest: builder.query({
        query: ({ id}: any) => ({
          url: `user/training-detail?Id=${id}`, // use the endpoint URL from the argument
          method: "GET",
          
        }),
  
        providesTags: ["onBoarding"],
      }),
      postAddAdditionalDetailsRequest: builder.mutation({
        query: ({ payload ,id}: any) => ({
          url: `user/training-details?userId=${id}`, // use the endpoint URL from the argument
          method: "post",
          body: payload,
        }),
  
        invalidatesTags: ["onBoarding"],
      }),
      updateAdditionalDetailsRequest: builder.mutation({
        query: ({ payload ,id}: any) => ({
          url: `user/training-detail?TrainingId=${id}`, // use the endpoint URL from the argument
          method: "put",
          body: payload,
        }),
  
        invalidatesTags: ["onBoarding"],
      }),
    deleteWorkExperienceRequest: builder.mutation({
      query: (id: string) => ({
        url: `user/reference/${id}`, // use the endpoint URL from the argument
        method: "DELETE",
      }),
      invalidatesTags: ["onBoarding",],
    }),
    updateWorkExperienceRequest: builder.mutation({
      query: ({ id, payload }: any) => ({
        url: `user/experience?experienceId=${id}`,
        method: "put",
        body: payload,
      }),

      invalidatesTags: ["onBoarding"],
    }),
    updateSpecialitiesRequest: builder.mutation({
      query: ({ id, payload }: any) => ({
        url: `user/specialities?userId=${id}`,
        method: "put",
        body: payload,
      }),

      invalidatesTags: ["onBoarding"],
    }),
  
  }),
});

export const {
  useUpdateSpecialitiesRequestMutation,
  usePostAddAdditionalDetailsRequestMutation,
useGetWorkExperienceRequestByIdQuery,
  useDeleteWorkExperienceRequestMutation,
  useUpdateWorkExperienceRequestMutation,
  usePostWorkExperienceRequestMutation,
  usePostTrainingCertificatesRequestMutation,
  useGetAddAdditionalDetailsRequestQuery,
  useUpdateAdditionalDetailsRequestMutation,
  useGetUnEmploymentRequestByIdQuery,
  usePostUnEmployementRequestMutation,
  useUpdateUnEmployementRequestMutation
  
  
  // useGetRequestViewDetailsQuery
} = extendedApi;
