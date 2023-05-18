import { emptySplitApi } from "../../Services";
export const extendedApi = emptySplitApi.injectEndpoints({
  endpoints: (builder: any) => ({
    getReferenceRequest: builder.query({
      query: ({id}:any) => ({
        url: `/user/references?userId=${id}`,
        method: "GET",
      }),

      providesTags: ["onBoarding"],
    }),
    postReferenceRequest: builder.mutation({
        query: ({ id,payload }: any) => ({
          url: `user/reference?userId=${id}`, // use the endpoint URL from the argument
          method: "post",
          body: payload,
        }),
  
        invalidatesTags: ["onBoarding"],
      }),
    deleteReferenceRequest: builder.mutation({
      query: (id: string) => ({
        url: `user/reference/${id}`, // use the endpoint URL from the argument
        method: "DELETE",
      }),
      invalidatesTags: ["onBoarding"],
    }),
    updateReferenceRequest: builder.mutation({
      query: ({ id, payload }: any) => ({
        url: `user/reference/${id}`,
        method: "put",
        body: payload,
      }),

      invalidatesTags: ["onBoarding"],
    }),
    updateReferenceStatusRequest: builder.mutation({
      query: ({ id, payload }: any) => ({
        url: `user/reference/${id}`,
        method: "PATCH",
        body: payload,
      }),

      invalidatesTags: ["onBoarding"],
    }),
    upadteReferenceRequestTableFilter: builder.mutation({
      query: ({ id, payload }: any) => ({
        url: `user/reference/${id}`,
        method: "put",
        body: payload,
      }),

      invalidatesTags: ["onBoarding"],
    }),
    getClientsRequest: builder.query({
      query: ({id,query}:any) => ({
        url: `assign-carehome?page=1&limit=10&careCoordinatorId=${id}${query}`,
        method: "GET",
      }),

      providesTags: ["carerCordinatorClients"],
    }),
  
  }),
});

export const {
 useGetReferenceRequestQuery,
  useDeleteReferenceRequestMutation,
  useUpdateReferenceRequestMutation,
  usePostReferenceRequestMutation,
  useGetClientsRequestQuery,
  useUpdateReferenceStatusRequestMutation
  // useGetRequestViewDetailsQuery
} = extendedApi;
