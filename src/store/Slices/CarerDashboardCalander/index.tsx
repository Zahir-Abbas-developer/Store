import { emptySplitApi } from "../../Services";

export const extendedApi = emptySplitApi.injectEndpoints({
  endpoints: (builder: any) => ({
    getCarerDashboardCalanderRequest: builder.query({
      query: (data: any) => {
        return {
          url: `/shifts/allocate?shiftStatus=${'ACCEPTED'}&shiftStatus=${'INPROCESS'}${!data?.checkIn ? `&shiftStatus=${'PENDING'}&shiftStatus=${'SIGNEDOFF'}&shiftStatus=${'COMPLETED'}` : ''}${data?.query ? data?.query : ""}`,
          method: "GET",
        }
      },

      providesTags: ["carerCalander"],
    }),
    putAllocateShiftRequest: builder.mutation({
      query: (payload: any) => {
        console.log(payload);

        return {
          url: "/shifts/allocate", // use the endpoint URL from the argument
          method: "PUT",
          body: payload,
        }
      },

      invalidatesTags: ["carerCalander"],
    }),

  }),
});

export const {
  useGetCarerDashboardCalanderRequestQuery,
  usePutAllocateShiftRequestMutation
} = extendedApi;
