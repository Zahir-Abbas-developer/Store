import { emptySplitApi } from "../../Services";
export const BookingCalander = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getShiftLists: builder.query({
      query: ({ careHomeId, startTime, endTime }) => ({
        url: `shifts?limit=100${careHomeId && `&careHomeId=${careHomeId}`}${startTime && `&startTime=${startTime}`}${endTime && `&endTime=${endTime}`}&shiftStatus=UNPUBLISHED&shiftStatus=PUBLISHED&shiftStatus=BOOKED&shiftStatus=COMPLETED&shiftStatus=INPROCESS&shiftStatus=PARTIALLY`,
        method: "GET",
      }),
      providesTags: ["shifts"],
    }),
    getClientsList: builder.query({
      query: () => ({
        url: "manage-user?roleName=client&limit=1000000",
        method: "GET",
      }),
    }),
    getUserTypesList: builder.query({
      query: () => ({
        url: "job-roles?limit=1000",
        method: "GET",
      }),
    }),
    getDepartmentsList: builder.query({
      query: ({ id }: any) => ({
        url: `profile/client-departments${id && `?userId=${id}`}`,
        method: "GET",
      }),
    }),
    getStaffList: builder.query({
      query: () => ({
        url: "/manage-user?roleName=carer&limit=1000000",
        method: "GET",
      }),
    }),
    getShiftDetails: builder.query({
      query: ({ id }: any) => ({
        url: `shifts/${id}`,
        method: "GET",
      }),
    }),
    addNewShift: builder.mutation({
      query: (payload: any) => ({
        url: `shifts`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["shifts"],
    }),
    directBookStaff: builder.mutation({
      query: (payload: any) => ({
        url: `shifts/direct-allocate`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["shifts"],
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
    reallocateShift: builder.mutation({
      query: (payload: any) => ({
        url: `shifts/reallocate`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["shifts"],
    }),
    updateShiftTime: builder.mutation({
      query: ({ id, payload }: any) => ({
        url: `shifts/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["shifts"],
    }),
  }),
});

export const { useGetShiftListsQuery, useGetClientsListQuery, useGetUserTypesListQuery, useGetDepartmentsListQuery, useAddNewShiftMutation, useGetStaffListQuery, useDirectBookStaffMutation, useModifyShiftStaffMutation, useCancelShiftMutation, useGetShiftDetailsQuery, useReallocateShiftMutation, useUpdateShiftTimeMutation } = BookingCalander;
