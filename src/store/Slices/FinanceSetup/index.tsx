import { emptySplitApi } from "../../Services";
export const FinanceSetup = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getStaffRate: builder.query({
      query: (data: any) => {
        return {
          url: `/staff-rate?page=1&limit=10${data?.query ? data?.query : ''}`,
          method: "GET",
          keepUnusedDataFor: 1,
        }
      },
    }),
    postAddClientRateRequest: builder.mutation({
      query: ({ payload }: any) => {  
        return {
          url: "/staff-rate/client",
          method: "POST",
          body: payload,
        }
      },
    }),
    postAddStaffRateRequest: builder.mutation({
      query: ({ payload }: any) => {
        console.log(payload);

        return {
          url: "/staff-rate/staff",
          method: "POST",
          body: payload,
        }
      },
    }),
    postAddStaffCategoryRequest: builder.mutation({
      query: ({ payload }: any) => {
        console.log(payload);

        return {
          url: "/staff-rate/staff-category",
          method: "POST",
          body: payload,
        }
      },
    }),
  }),
});

export const { useGetStaffRateQuery, usePostAddClientRateRequestMutation,usePostAddStaffRateRequestMutation,usePostAddStaffCategoryRequestMutation } = FinanceSetup;
