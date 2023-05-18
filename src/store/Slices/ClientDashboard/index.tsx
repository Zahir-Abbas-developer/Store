import { emptySplitApi } from "../../Services";

const getLocalStorage: any | string | null = localStorage.getItem("careUserData");
const { id: getUserId } = JSON.parse(getLocalStorage);

export const ClientDashboard = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getShiftsList: builder.query({
      query: (shiftStatus: any) => ({
        url: `shifts/allocate?careHomeId=${getUserId}${shiftStatus && `&shiftStatus=${shiftStatus}`}`,
        method: "GET",
      }),
    }),
    getAvailableShiftsList: builder.query({
      query: () => ({
        url: `shifts/available`,
        method: "GET",
      }),
    }),
    getLastShiftDetails: builder.query({
      query: () => ({
        url: `shifts/last-shift-detail`,
        method: "GET",
      }),
    }),
    getOverAllRating: builder.query({
      query: () => ({
        url: `ratings/overall-ratings`,
        method: "GET",
      }),
    }),
    getOverAllReviews: builder.query({
      query: () => ({
        url: `ratings/all`,
        method: "GET",
      }),
    }),
    getCarersPerMonth: builder.query({
      query: (currentYear) => ({
        url: `profile/client-dashboard?year=${currentYear}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetShiftsListQuery, useGetLastShiftDetailsQuery, useGetOverAllRatingQuery, useGetOverAllReviewsQuery, useGetCarersPerMonthQuery,useGetAvailableShiftsListQuery } = ClientDashboard;
