import { emptySplitApi } from "../../Services";

export const staffManager: any = emptySplitApi.injectEndpoints({
  endpoints: (builder: any) => ({
    getStaffManager: builder.query({
      query: (param: any) => ({
        url: `staff/staff-manager-list?page=${param?.pagination}&limit=${param?.limit}&search=${param.search}&userType=${param.filter}`,
        method: "GET",
        keepUnusedDataFor: 1,
      }),
      providesTags: ["staffManager"],
    }),

    getUserType: builder.query({
      query: () => ({
        url: `job-roles?page=1&limit=1000`,
        method: "GET",
        keepUnusedDataFor: 1,
      }),
      providesTags: ["staffManager"],
    }),

    getRequestByWidgets: builder.query({
      query: () => ({
        url: `staff/widget-staff-manager`,
        method: "GET",
        keepUnusedDataFor: 1,
      }),
      providesTags: ["staffManager"],
    }),

    getStaffSummaryData: builder.query({
      query: (id: any) => ({
        url: `staff/staff-summary?id=${id}`,
        method: "GET",
        keepUnusedDataFor: 1,
      }),
      providesTags: ["staffManager"],
    }),

    getStaffSummaryMetricsInfo: builder.query({
      query: (id: any) => ({
        url: `/staff/matrics-info?userId=${id}`,
        method: "GET",
      }),
      providesTags: ["staffSummary"],
    }),

    getStaffWidgetShiftStatus: builder.query({
      query: (id: any) => ({
        url: `staff/widget-shift-status?userId=${id}`,
        method: "GET",
        keepUnusedDataFor: 1,
      }),
      providesTags: ["staffManager"],
    }),

    deleteProfile: builder.mutation({
      query: ({ id }: any) => ({
        url: `/profile/delete-user?userId=${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["staffManager"],
    }),

    getOpenShift: builder.query({
      query: (data: any) => ({
        url: `shifts/available?carerId=${data.caredId}&userType=${data.userType}`,
        method: "GET",
      }),
      providesTags: ["openshift"],
    }),

    postAllocatShift: builder.mutation({
      query: (data: any) => ({
        url: `shifts/allocate`,
        method: "POST",
        body:data
      }),
      invalidatesTags: ["openshift"],
    }),

    getConfirmedShift: builder.query({
      query: (data: any) => ({
        url: `shifts/allocate?page=1&limit=10&staffId=${data.staffId}&shiftStatus=ACCEPTED`,
        method: "GET",
        keepUnusedDataFor: 1,
      }),
      providesTags: ["staffManagerCancelShift"],
    }),

    putCancelShift: builder.mutation({
      query: (data: any) => ({
        url: `/shifts/allocate/cancel`,
        method: "PUT",
        body:data
      }),
      invalidatesTags: ["staffManagerCancelShift"],
    }),

    getCompletedShift: builder.query({
      query: (data: any) => ({
        url: `shifts/allocate?page=1&limit=10&staffId=${data.staffId}&shiftStatus=SIGNEDOFF`,
        method: "GET",
        keepUnusedDataFor: 1,
      }),
      providesTags: ["staffManager"],
    }),

    sendEmail: builder.mutation({
      query: ({ emailId, message, subject }: any) => ({
        url: `staff/send-email?emailId=${emailId}&subject=${subject}&message=${message}`,
        method: "POST",
      }),
      providesTags: ["staffManager"],
    }),

    sendResendEmail: builder.mutation({
      query: (payload: any) => ({
        url: `/auth/resend-invitation`,
        method: "POST",
        body: payload,
      }),
      providesTags: ["staffManager"],
    }),

    getStaffAvailability: builder.query({
      query: ({userId,filterValues}:any) => ({
      url: `staff/staff-availability?userId=${userId}${filterValues?.startDate && `&startDateRange=${filterValues?.startDate}`}${filterValues?.endDate && `&endDateRange=${filterValues?.endDate}`}`,
        method: "GET",
      }),
      providesTags: ["availabilitySheet"],
    }),

    staffAvailabilitysheet: builder.mutation({
      query: (data: any) => ({
        url: `staff/submit-staff-availability?userId=${data.userId}&availabilityDate=${data.availabilityDate}&availableShift=${data?.availableShift}`,
        method: "POST",
      }),
      invalidatesTags: ["availabilitySheet"],
    }),

    getAllClientList: builder.query({
      query: (data: any) => ({
        url: `/staff/dropdown-carehomes?staffId=${data?.staffId}`,
        method: "GET",
        keepUnusedDataFor: 1,
      }),
      providesTags: ["staffManager"],
    }),

    staffAllocateCarers: builder.mutation({
      query: (payload: any) => ({
        url: `staff/allocate-carers`,
        method: "POST",
        body: payload,
      }),
      providesTags: ["staffManager"],
    }),

    getStaffViewCarer: builder.query({
      query: (data: any) => ({
        url: `staff/view-care-homes?page=1&limit=10&userId=${data.userId}&search=${data.search}`,
        method: "GET",
        keepUnusedDataFor: 1,
      }),
      providesTags: ["staffManager"],
    }),

    staffDeleteAllocate: builder.mutation({
      query: (data: any) => {
        return {
          url: `staff/delete-allocate-carer?clientId=${data?.staffId}`,
          method: "DELETE",
          body:data
        }
      },
      providesTags: ["staffManager"],
    }),

    getWorkHistory: builder.query({
      query: ({staffId,filterValues,search,pagination,limit}:any) => ({
        url: `reports/work-history?page=${pagination}&limit=${limit}&search=${search}${filterValues?.clientName ? `&careHomeId=${filterValues?.clientName}` : ''}${staffId ? `&staffId=${staffId}` : ''}${filterValues?.shiftStatus ? `&shiftStatus=${filterValues?.shiftStatus}` : ''}`,
        method: "GET",
        keepUnusedDataFor: 1,
      }),
      providesTags: ["staffManager"],
    }),

  }),
});

export const {
  useGetStaffManagerQuery,
  useGetRequestByWidgetsQuery,
  useGetStaffSummaryDataQuery,
  useGetStaffSummaryMetricsInfoQuery,
  useGetStaffWidgetShiftStatusQuery,
  useDeleteProfileMutation,
  useGetOpenShiftQuery,
  useGetConfirmedShiftQuery,
  useGetCompletedShiftQuery,
  useSendEmailMutation,
  useSendResendEmailMutation,
  useGetStaffAvailabilityQuery,
  useGetAllClientListQuery,
  useStaffAvailabilitysheetMutation,
  useStaffAllocateCarersMutation,
  useGetStaffViewCarerQuery,
  useStaffDeleteAllocateMutation,
  useGetUserTypeQuery,
  useGetWorkHistoryQuery,
  usePutCancelShiftMutation,
  usePostAllocatShiftMutation
  
} = staffManager;
