import { emptySplitApi } from "../../Services";
export const extendedApi = emptySplitApi.injectEndpoints({
  endpoints: (builder: any) => ({
    shiftsBookingStatus: builder.query({
      query: () => ({
        url: `/shifts/manage-days`,
        method: "GET",
        keepUnusedDataFor: 1,
      }),

      providesTags: ["bookingStatus"],
    }),

    getShifts: builder.query({
      query: ({ careHomeId, query,pagination }: any) => {
        const url = `/shifts?page=${pagination.page}&limit=${pagination.limit}&careHomeId=${careHomeId}`
        return {
          url:  `${url}${query}`,
          method: "GET",
        }
      },

      providesTags: ["shifts"],
    }),

    getConfirmShifts: builder.query({
      query: ({pagination,query}:any) => {
        const url = `/shifts/allocate?page=${pagination.page}&limit=${pagination.limit}&shiftStatus=ACCEPTED`
        return {
          url: `${url}${query}`,
          method: "GET",
          keepUnusedDataFor: 1,
        }
      },

      providesTags: ["confirmShifts"],
    }),

    getUnfilledShifts: builder.query({
      query: ({pagination,query}:any) => {
        const url = `/shifts?page=${pagination.page}&limit=${pagination.limit}&shiftStatus=PUBLISHED&shiftStatus=PARTIALLY`
        return {
          url: `${url}${query}`,
          method: "GET",
          keepUnusedDataFor: 1,
        }
      },
      providesTags: ["unfilledShifts"],
    }),

    getUnpublishedShifts: builder.query({
      query: ({pagination,query}:any) => {
        const url = `/shifts?page=${pagination.page}&limit=${pagination.limit}&shiftStatus=UNPUBLISHED`
        return {
          url: `${url}${query}`,
          method: "GET",
          keepUnusedDataFor: 1,
        }
      },
      providesTags: ["unpublishedShifts"],
    }),

    deleteShift: builder.mutation({
      query: (id: string) => ({
        url: `shifts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["unpublishedShifts"],
    }),

    publishShift: builder.mutation({
      query: ({ id, payload }: any) => ({
        url: `shifts/${id}`,
        method: "PUT",
        body: payload,
      }),

      invalidatesTags: ["unpublishedShifts"],
    }),

    addNewShift: builder.mutation({
      query: (payload: any) => ({
        url: `shifts`,
        method: 'POST',
        body: payload
      }),
      invalidatesTags: ['shifts']
    }),

    directBookStaff: builder.mutation({
      query: (payload: any) => ({
        url: `shifts/direct-allocate`,
        method: 'POST',
        body: payload
      }),
      invalidatesTags: ['shifts']
    }),

    modifyShiftStaff: builder.mutation({
      query: ({ id, payload }: any) => ({
        url: `shifts/${id}`,
        method: "PUT",
        body: payload,
      }),

      invalidatesTags: ["shifts"],
    }),

    cancelShift: builder.mutation({
      query: ({ id, payload }: any) => ({
        url: `shifts/cancel/${id}`,
        method: "PUT",
        body: payload,
      }),

      invalidatesTags: ["shifts"],
    }),

    modifyConfirmShiftStaff: builder.mutation({
      query: ({ id, payload }: any) => ({
        url: `shifts/${id}`,
        method: "PUT",
        body: payload,
      }),

      invalidatesTags: ["confirmShifts"],
    }),

    cancelConfirmShift: builder.mutation({
      query: (payload: any) => ({
        url: `shifts/allocate/cancel`,
        method: "PUT",
        body: payload,
      }),

      invalidatesTags: ["confirmShifts"],
    }),

    reallocateStaff: builder.mutation({
      query: (payload: any) => ({
        url: `shifts/reallocate`,
        method: "PUT",
        body: payload,
      }),

      invalidatesTags: ["confirmShifts"],
    }),

    modifyUnfilledShiftStaff: builder.mutation({
      query: ({ id, payload }: any) => ({
        url: `shifts/${id}`,
        method: "PUT",
        body: payload,
      }),

      invalidatesTags: ["unfilledShifts"],
    }),

    cancelUnfilledShift: builder.mutation({
      query: ({ id, payload }: any) => ({
        url: `shifts/cancel/${id}`,
        method: "PUT",
        body: payload,
      }),

      invalidatesTags: ["unfilledShifts"],
    }),

    allocateShift: builder.mutation({
      query: (payload: any) => ({
        url: `shifts/direct-allocate`,
        method: 'POST',
        body: payload
      }),
      invalidatesTags: ['shifts']
    }),

    getStaffDetails: builder.query({
      query: ({ id,searchTerm,date }: any) => ({
        url: `staff/unpublished-shift-allocation?page=1&limit=100&clientId=${id}&availabilityDate=${date}&search=${searchTerm}`,
        method: 'GET'
      }),

      invalidatesTags: ["staffDetails"],
    }),

    requestConfirmation: builder.mutation({
      query: (payload: any) => ({
        url: `/shifts/allocate`,
        method: 'POST',
        body: payload
      }),
      invalidatesTags: ['staffDetails']
    }),

    advanceStaffSearch: builder.query({
      query: ({query}:any) => {
        const url = `/reports/staff-search?`
        return {
          url: `${url}${query}`,
          method: "GET",
          keepUnusedDataFor: 1,
        }
      },
    }),

    getUserTypesList: builder.query({
      query: () => ({
        url: 'job-roles',
        method: 'GET'
      })
    }),

    getStaffList: builder.query({
      query: () => ({
        url: '/manage-user?page=1&limit=1000&roleName=carer',
        method: 'GET'
      })
    }),

    getDepartments: builder.query({
      query: ({ id }: any) => ({
        url: `profile/client-departments?userId=${id}`,
        method: 'GET'
      })
    }),
  }),
});

export const {
  useShiftsBookingStatusQuery,
  useGetShiftsQuery,
  useCancelShiftMutation,
  useModifyShiftStaffMutation,
  useGetDepartmentsQuery,
  useGetUserTypesListQuery,
  useAddNewShiftMutation,
  useDirectBookStaffMutation,
  useGetStaffListQuery,
  useGetConfirmShiftsQuery,
  useGetUnfilledShiftsQuery,
  useCancelConfirmShiftMutation,
  useModifyConfirmShiftStaffMutation,
  useModifyUnfilledShiftStaffMutation,
  useCancelUnfilledShiftMutation,
  useGetUnpublishedShiftsQuery,
  useDeleteShiftMutation,
  usePublishShiftMutation,
  useReallocateStaffMutation,
  useGetStaffDetailsQuery,
  useRequestConfirmationMutation,
  useAdvanceStaffSearchQuery
} = extendedApi;