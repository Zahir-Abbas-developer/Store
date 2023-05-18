import { emptySplitApi } from "../../Services";

export const extendedApi = emptySplitApi.injectEndpoints({
  endpoints: (builder: any) => ({
    getRequest: builder.query({
      query: ({ pagination, query, role }: any) => ({
        url: `/manage-user?page=${pagination?.page}&limit=10&roleName=${role}${query}`,
        method: "GET",
      }),

      providesTags: ["onBoarding"],
    }), 
    getAllCareHomesRequest: builder.query({
      query: ({  role }: any) => ({
        url: `/manage-user?page=1&limit=1000&roleName=${role}`,
        method: "GET",
      }),

      providesTags: ["onBoarding"],
    }), 
    getRequestById: builder.query({
      query: ({ id, detail }: any) => ({
        url: `/users-info/profile?userId=${id}&detail=${detail}`,
        method: "GET",
      }),
      providesTags: ["onBoarding"],
    }),

    postClientsRequest: builder.mutation({
      query: ({ payload }: any) => ({
        url: `assign-carehome`,
        method: "post",
        body: payload,
      }),

      invalidatesTags: ["carerCordinatorClients"],
    }),
    deleteClientsRequest: builder.mutation({
      query: ({ id }: any) => ({
        url: `assign-carehome?careHomeId=${id}`,
        method: "delete",
      }),

      invalidatesTags: ["carerCordinatorClients"],
    }),
    postBckgroundChecksRequest: builder.mutation({
      query: ({ payload, id }: any) => ({
        url: `profile/bg-checks/${id}`, // use the endpoint URL from the argument
        method: "post",
        body: payload,
      }),

      invalidatesTags: ["onBoarding"],
    }),

    postOtherInformationRequest: builder.mutation({
      query: ({ payload, id }: any) => ({
        url: `users-info/profile?userId=${id}`, // use the endpoint URL from the argument
        method: "put",
        body: payload,
      }),

      invalidatesTags: ["onBoarding"],
    }),
    postAdditionalDocumentsRequest: builder.mutation({
      query: ({ payload, id }: any) => ({
        url: `users-info/additional-docs/{docId}?docId=${id}`, // use the endpoint URL from the argument
        method: "put",
        body: payload,
      }),

      invalidatesTags: ["onBoarding"],
    }),

    updateBankDetailsRequest: builder.mutation({
      query: ({ payload, id }: any) => ({
        url: `users-info/bank-details/${id}`, // use the endpoint URL from the argument
        method: "put",
        body: payload,
      }),

      invalidatesTags: ["onBoarding"],
    }),
    updateAdditionalDocsRequest: builder.mutation({
      query: ({ payload, id }: any) => ({
        url: `users-info/additional-docs/${id}`, // use the endpoint URL from the argument
        method: "put",
        body: payload,
      }),

      invalidatesTags: ["onBoarding"],
    }),

    postphotoRequest: builder.mutation({
      query: ( payload : any) => {
        let formData = new FormData();
        formData.append("file", payload?.file);
        return {  url: `media/upload`,
        method: "post",
        body: formData}
      
      },

      invalidatesTags: ["onBoarding"],
    }),
    postRequest: builder.mutation({
      query: ({ payload }: any) => ({
        url: "auth/onboarding", // use the endpoint URL from the argument
        method: "post",
        body: payload,
      }),

      invalidatesTags: ["onBoarding"],
    }),

    deleteRequest: builder.mutation({
      query: (id: string) => ({
        url: `onBoarding/${id}`, // use the endpoint URL from the argument
        method: "DELETE",
      }),
      invalidatesTags: ["onBoarding"],
    }),
    updateRequest: builder.mutation({
      query: ({ id, payload }: any) => ({
        url: `profile/update-personalInfo?userId=${id}`,
        method: "PATCH",
        body: payload,
      }),

      invalidatesTags: ["onBoarding"],
    }),
  }),
});

export const {
  usePostAdditionalDocumentsRequestMutation,
  usePostBckgroundChecksRequestMutation,
  useGetRequestQuery,
  useGetRequestByIdQuery,
  useDeleteClientsRequestMutation,
  usePostRequestMutation,
  useDeleteRequestMutation,
  useUpdateRequestMutation,
  usePostphotoRequestMutation,
  usePostOtherInformationRequestMutation,
  usePostClientsRequestMutation,
  useUpdateBankDetailsRequestMutation,
  useUpdateAdditionalDocsRequestMutation,
  useGetAllCareHomesRequestQuery

  // useGetRequestViewDetailsQuery
} = extendedApi;
