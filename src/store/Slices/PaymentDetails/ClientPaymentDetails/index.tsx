import { emptySplitApi } from "../../../Services";
export const ClientPaymentDetails = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getClientPaymentDetails: builder.query({
      query: ({ startDate, endDate, status, searchValue,clientValue }: any) => ({
        url: `finance/client-payment?startDate=${startDate}&endDate=${endDate}&paymentStatus=${status}${searchValue ? `&search=${searchValue}` : ""}${clientValue ? `&clientId=${clientValue}` : ""}`,
        method: "GET",
      }),
      providesTags: ["clientPaymentDetails"],
    }),
    updateClientPaymentStatus: builder.mutation({
      query: ({ id, payload }: any) => ({
        url: `finance/client-payment/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["clientPaymentDetails"],
    }),
  }),
});

export const { useGetClientPaymentDetailsQuery, useUpdateClientPaymentStatusMutation } = ClientPaymentDetails;
