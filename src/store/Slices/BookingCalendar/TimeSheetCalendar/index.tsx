import { emptySplitApi } from "../../../Services";
export const TimeSheetCalendar = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllClientsList: builder.query({
      query: () => ({
        url: `staff/all-client-list`,
        method: "GET",
      }),
      // providesTags: ["shifts"],
    }),
    getAllocatedShiftsList: builder.query({
      query: ({ careHomeId, staffId, startTime, endTime }) => ({
        url: `shifts/allocate?limit=1000${careHomeId && `&careHomeId=${careHomeId}`}${staffId && `&staffId=${staffId}`}${startTime && `&startTime=${startTime}`}${endTime && `&endTime=${endTime}`}&shiftStatus=PENDING&shiftStatus=ACCEPTED&shiftStatus=INPROCESS&shiftStatus=REJECTED&shiftStatus=COMPLETED&shiftStatus=SIGNEDOFF`,
        method: "GET",
      }),
      // providesTags: ["shifts"],
    }),
  }),
});

export const { useGetAllClientsListQuery, useGetAllocatedShiftsListQuery } = TimeSheetCalendar;
