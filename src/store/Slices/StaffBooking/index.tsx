import { emptySplitApi } from "../../Services";

export const staffBooking: any = emptySplitApi.injectEndpoints({
  endpoints: (builder: any) => ({
    getStaffBooking: builder.query({
      query: (param: any) => ({
        url: `manage-user?page=${param?.pagination}&limit=${param?.limit}&search=${param.search}${param.filter && `&userType=${param.filter}`}&roleName=carer`,
        method: "GET",
      }),
      providesTags: ["staffBooking"],
    }),

    getUserType: builder.query({
      query: () => ({
        url: `job-roles?page=1&limit=10`,
        method: "GET",
      }),
      providesTags: ["staffBooking"],
    }),

    getAvailableShift: builder.query({
      query: (data: any) => ({
        url: `shifts/available?carerId=${data.caredId}${data.userType ? `&userType=${data.userType}` : ""}`,
        method: "GET",
      }),
      providesTags: ["staffBooking"],
    }),

    getUpComingShift: builder.query({
      query: (data: any) => ({
        url: `shifts/allocate?page=1&limit=10&staffId=${data.staffId}&shiftStatus=ACCEPTED`,
        method: "GET",
      }),
      providesTags: ["staffBooking"],
    }),

    putCancelShift: builder.mutation({
      query: (data: any) => ({
        url: `/shifts/allocate/cancel`,
        method: "PUT",
        body: data
      }),
      providesTags: ["staffBooking"],
    }),

    getCompletedShift: builder.query({
      query: (data: any) => ({
        url: `shifts/allocate?page=1&limit=10&staffId=${data.staffId}&shiftStatus=COMPLETED&shiftStatus=SIGNEDOFF`,
        method: "GET",
      }),
      providesTags: ["staffBooking"],
    }),

    getStaffWorkHistory: builder.query({
      query: ({ staffId, filterValues, search,pagination,limit }: any) => ({
        url: `reports/work-history?page=${pagination}&limit=${limit}&search=${search}${filterValues?.clientName ? `&careHomeId=${filterValues?.clientName}` : ''}${staffId ? `&staffId=${staffId}` : ''}${filterValues?.shiftStatus ? `&shiftStatus=${filterValues?.shiftStatus}` : ''}`,
        method: "GET",
      }),
      providesTags: ["staffBooking"],
    }),
  }),
});

export const { useGetStaffBookingQuery, useGetAvailableShiftQuery, useGetUpComingShiftQuery, useGetStaffWorkHistoryQuery, useGetUserTypeQuery, useGetCompletedShiftQuery, usePutCancelShiftMutation } = staffBooking;
