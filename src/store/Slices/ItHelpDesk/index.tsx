import { emptySplitApi } from "../../Services";

export const extendedApi = emptySplitApi.injectEndpoints({
  endpoints: (builder: any) => ({
    getTicketSummaryRequest: builder.query({
      query: () => ({
        url: `/helpdesk/ticket-summary`,
        method: "GET",
        keepUnusedDataFor: 1,
      }),

      providesTags: ["helpDesk"],
    }),
    getTaskSummaryRequest: builder.query({
      query: () => ({
        url: `/helpdesk/task-summary`,
        method: "GET",
        keepUnusedDataFor: 1,
      }),

      providesTags: ["helpDesk"],
    }),
    getMyTicketsRequest: builder.query({
      query: (filter: any) => ({
        url: `/helpdesk/my-tickets?filter=${filter}`,
        method: "GET",
        keepUnusedDataFor: 1,
      }),

      providesTags: ["helpDesk"],
    }),
    getHelpDeskDetailsRequest: builder.query({
      query: (data: any) => ({
        url: `/helpdesk/all${data.getHelpDeskDetailsQuery}`,
        method: "GET",
        keepUnusedDataFor: 1,
      }),

      providesTags: ["helpDesk"],
    }),
    getHelpDeskByTicketIdRequest: builder.query({
      query: (data: any) => {
        return {
          url: `/helpdesk/ticket/${data?.id}`,
          method: "GET",
          keepUnusedDataFor: 1,
        };
      },
      providesTags: ["helpDesk"],
    }),
    getAssignToRequest: builder.query({
      query: () => {
        return {
          url: `/helpdesk/assign`,
          method: "GET",
          keepUnusedDataFor: 1,
        };
      },
      providesTags: ["helpDesk"],
    }),

    patchCommentsRequest: builder.mutation({
      query: (data: any) => {
        return {
          url: `/helpdesk/comment/${data?.commentId}`, // use the endpoint URL from the argument
          method: "PATCH",
          body: data?.payload,
        };
      },

      invalidatesTags: ["helpDesk"],
    }),
    patchChangeStatusRequest: builder.mutation({
      query: ({ payload }: any) => ({
        url: "/helpdesk/change-status", // use the endpoint URL from the argument
        method: "PATCH",
        body: payload,
      }),

      invalidatesTags: ["helpDesk"],
    }),
    patchReopenTicketRequest: builder.mutation({
      query: (payload: any) => {
        return {
          url: `/helpdesk/reopen/${payload}`, // use the endpoint URL from the argument
          method: "PATCH",
          // body: payload,
        };
      },

      invalidatesTags: ["helpDesk"],
    }),
    patchAssignToRequest: builder.mutation({
      query: (payload: any) => {
        return {
          url: "/helpdesk/assign", // use the endpoint URL from the argument
          method: "PATCH",
          body: payload,
        };
      },

      invalidatesTags: ["helpDesk"],
    }),
    postTicketRequest: builder.mutation({
      query: ({ payload }: any) => ({
        url: "/helpdesk/add", // use the endpoint URL from the argument
        method: "POST",
        body: payload,
      }),

      invalidatesTags: ["helpDesk"],
    }),
    patchTicketUpdateRequest: builder.mutation({
      query: (data: any) => {
        return {
          url: `/helpdesk/update/${data.ticketId}`, // use the endpoint URL from the argument
          method: "PATCH",
          body: data.payload,
        };
      },

      invalidatesTags: ["helpDesk"],
    }),
    deleteHelpDeskRequest: builder.mutation({
      query: (id: string) => ({
        url: `/helpdesk/delete/${id}`, // use the endpoint URL from the argument
        method: "DELETE",
      }),
      invalidatesTags: ["helpDesk"],
    }),
    postMediaRequest: builder.mutation({
      query: (payload: any) => {
        return {
          url: "/media/upload", // use the endpoint URL from the argument
          method: "POST",
          body: payload,
        };
      },

      invalidatesTags: ["helpDesk"],
    }),
  }),
});

export const {
  useGetTicketSummaryRequestQuery,
  useGetTaskSummaryRequestQuery,
  useGetMyTicketsRequestQuery,
  useGetHelpDeskDetailsRequestQuery,
  useGetHelpDeskByTicketIdRequestQuery,
  useGetAssignToRequestQuery,
  useDeleteHelpDeskRequestMutation,
  usePostTicketRequestMutation,
  usePatchTicketUpdateRequestMutation,
  usePatchChangeStatusRequestMutation,
  usePatchReopenTicketRequestMutation,
  usePatchAssignToRequestMutation,
  usePatchCommentsRequestMutation,
  usePostMediaRequestMutation,
} = extendedApi;
