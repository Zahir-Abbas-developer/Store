import { emptySplitApi } from "../../../Services";
export const StaffPaymentDetails = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getStaffPaymentDetails: builder.query({
      query: ({ startDate, endDate, status, searchValue,staffValue }: any) => ({
        url: `finance/staff-payment?startDate=${startDate}&endDate=${endDate}&paymentStatus=${status}${searchValue ? `&search=${searchValue}` : ""}${staffValue ? `&staffId=${staffValue}` : ""}`,
        method: "GET",
      }),
      providesTags: ["staffPaymentDetails"],
    }),
    updateStaffPaymentStatus: builder.mutation({
      query: ({ id, payload }: any) => ({
        url: `finance/staff-payment/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["staffPaymentDetails"],
    }),
  }),
});

export const { useGetStaffPaymentDetailsQuery, useUpdateStaffPaymentStatusMutation } = StaffPaymentDetails;
