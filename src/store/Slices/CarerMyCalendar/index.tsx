import { emptySplitApi } from "../../Services";

export const CarerMyCalendar: any = emptySplitApi.injectEndpoints({
  endpoints: (builder: any) => ({
    getCarerCalendarData: builder.query({
      query: (query: any) => {
        const url = `/shifts/allocate?shiftStatus=${"PENDING"}&shiftStatus=${"ACCEPTED"}&shiftStatus=${"INPROCESS"}&shiftStatus=${"SIGNEDOFF"}&shiftStatus=${"COMPLETED"}`;
        return {
          url: `${url}${query}`,
          method: "GET",
          keepUnusedDataFor: 1,
        }
      }
    }),
  }),
});

export const { useGetCarerCalendarDataQuery } = CarerMyCalendar;
