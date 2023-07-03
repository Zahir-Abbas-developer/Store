import { emptySplitApi } from "../../Services";

export const extendedApi = emptySplitApi.injectEndpoints({
  endpoints: (builder: any) => ({
    getCarerRequestDashboard: builder.query({
      query: () => ({
        url: `/carer-request/dashbaord`,
        method: "GET",
      }),

      providesTags: ["carerRequestDashboard"],
    }),
    postCarerRequestDashboard: builder.mutation({
      query: (payload: any) => {
        return {
          url: `/carer-request`,
          method: "POST",
          body: payload
        }
      },

      invalidatesTags: ["carerRequestDashboard"],
    }),
    updateCarerRequestDashboard: builder.mutation({
      query: ({payload,id}: any) => {
        return {
          url: `/carer-request?id=${id}`,
          method: "PUT",
          body: payload
        }
      },

      invalidatesTags: ["carerRequestDashboard"],
    }),
  }),
});

export const {
  useGetCarerRequestDashboardQuery,
  usePostCarerRequestDashboardMutation,
  useUpdateCarerRequestDashboardMutation
} = extendedApi;
