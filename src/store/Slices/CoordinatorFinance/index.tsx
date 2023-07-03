import { emptySplitApi } from "../../Services";
export const CoordinatorFinance = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
  
    getInvoiceUser: builder.query({
      query: ({userType,careCoordinatorId}:any) => ({
        url: `invoices/users?page=1&limit=10&userType=${userType}&careCoordinatorId=${careCoordinatorId ? `${careCoordinatorId}` : ''}`,
        method: 'GET'
      }),
      providesTags: ["financeinvoice"],
    }),
    getWeekInvoiceUser: builder.query({
      query: ({careHomeId}:any) => ({
        url: `invoices/weeks?page=1&limit=10&careHomeId=${careHomeId}`,
        method: 'GET'
      }),
      providesTags: ["financeweekinvoice"],
    }),

    getTimeSheet: builder.query({
      query: ({careHomeId,userType,startDate,endDate,carerId}:any) => ({
        url: `invoices/timesheet?careHomeId=${careHomeId}&userType=${userType}&carerId=${carerId ? `${carerId}` : ''}&startDate=${startDate}&endDate=${endDate}`,
        method: 'GET'
      }),
      providesTags: ["invoiceTimeSheet"],
    }),

    getInvoicesCarers: builder.query({
      query: ({careHomeId}:any) => ({
        url: `invoices/carers?careHomeId=${careHomeId}`,
        method: 'GET'
      }),
      providesTags: ["invoicesCarers"],
    }),

  })
})

export const { useGetInvoiceUserQuery,useGetWeekInvoiceUserQuery,useGetTimeSheetQuery,useGetInvoicesCarersQuery} = CoordinatorFinance
