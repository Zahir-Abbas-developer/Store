import { emptySplitApi } from "../../Services";
export const PaymentDetails = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getPaymentHistoryWeeks: builder.query({
      query: () => ({
        url: `finance/weeks`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetPaymentHistoryWeeksQuery } = PaymentDetails;
