import { emptySplitApi } from "../../Services";
export const AdminDashboard = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCardsData: builder.query({
      query: () => ({
        url: `profile/admin-dashboard`,
        method: "GET",
      }),
    }),
    getShiftComprehensionData: builder.query({
      query: ({ comprehensionType }) => ({
        url: `shifts/insight?type=${comprehensionType}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllCardsDataQuery, useGetShiftComprehensionDataQuery } = AdminDashboard;
