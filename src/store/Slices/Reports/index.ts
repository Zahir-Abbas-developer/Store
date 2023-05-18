import { availabilitySheetData } from './../../../mock/StaffManagerMock';
import pagination from "antd/es/pagination";
import { emptySplitApi } from "../../Services";
import dayjs from 'dayjs';

export const extendedApi: any = emptySplitApi.injectEndpoints({
  endpoints: (builder: any) => ({
    getReportsDailyShift: builder.query({
      query: ({query}:any) => ({
        url: `/reports/daily-shift${query}`,
        method: "GET",
      }),
    }),
    getReportsProftGrossProfit: builder.query({
      query: ({query,pagination}: any) => {
        return {
          url: `/reports/gross-profit-loss?page=${pagination?.page}&limit=${pagination?.limit}${query}`,
          method: "GET",
        };
      },
    }),
    getIncidentReports: builder.query({
      query: ({query,pagination}:any) => ({
        url: `/incedent?page=${pagination?.page}&limit=${pagination?.limit}${query}`,
        method: "GET",
      }),
      providesTags: ["incidentReports"],
    }),
    postIncidentReports: builder.mutation({
      query: ({ payload }: any) => ({
        url: `/incedent`,
        method: "post",
        body: payload,
      }),

      invalidatesTags: ["incidentReports"],
    }),
    changeStatusIncedent: builder.mutation({
      query: ({ payload ,id }: any) => ({
        url: `/incedent?incedentId=${id}`,
        method: "PUT",
        body: payload,
      }),

      invalidatesTags: ["incidentReports"],
    }),
    getReportsShiftHours: builder.query({
      query: ({query,pagination}: any) => {
        return {
          url: `/shifts/shiftHours?page=${pagination?.page}&limit=${pagination?.limit}${query}`,
          method: "GET",
        };
      },
    }),
    getWhistleBlowingReports: builder.query({
      query: ({query,pagination}:any) => ({
        url: `/whistle-blowing/all?page=${pagination?.page}&limit=${pagination?.limit}${query}`,
        method: "GET",
      }),
      providesTags: ["WhistleBlowing"],
    }),
    postWhistleBlowingReports: builder.mutation({
      query: ({ payload }: any) => ({
        url: `/whistle-blowing/add`,
        method: "post",
        body: payload,
      }),

      invalidatesTags: ["WhistleBlowing"],
    }),
    putWhistleBlowingRemarksReports: builder.mutation({
      query: ({ id, payload }: any) => ({
        url: `/whistle-blowing/remarks?id=${id}`,
        method: "PUT",
        body: payload,
      }),

      invalidatesTags: ["WhistleBlowing"],
    }),
    deleteWhistleBlowingReports: builder.mutation({
      query: ({ id }: any) => ({
        url: `/whistle-blowing?id=${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["WhistleBlowing"],
    }),
    getReportsExtraHours: builder.query({
      query: ({query,pagination}: any) => ({
        url: `/reports/extra-hours?page=${pagination?.page}&limit=${pagination?.limit}${query}`,
        method: "GET"
      })
    }),

    getReportsComplience: builder.query({
      query: ({query}:any) => ({
        url: `/reports/complience${query}`,
        method: "GET",
      }),
    }),

    getReportsRateSetting: builder.query({
      query: ({query,pagination}: any) => {    
        return {
          url: `/reports/rate-setting?page=${pagination?.page}&limit=${pagination?.limit}${query}`,
          method: "GET",
        };
      },
    }),
    getReportsTerminated: builder.query({
      query: ({query,pagination}: any) => {
        return {
          url: `/reports/terminated${query}`,
          method: "GET",
        };
      },
      provideTags: ["TerminatedReport"],
    }),
    getReportsCarerRequest: builder.query({
      query: ({query,pagination}:any) => ({
        url: `/carer-request?page=${pagination?.page}&limit=${pagination?.limit}${query}`,
        method: "GET",
      }),
      provideTags: ["carerRequestReports"],
    }),
    postReportsCarerRequest: builder.mutation({
      query: ({ payload }: any) => ({
        url: `/carer-request`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["carerRequestReports"],
    }),
    reactivateTerminatedReport: builder.mutation({
      query: ({ id, payload }: any) => ({
        url: `manage-user/${id}`,
        method: "PATCH",
        body: payload,
      }),

      invalidatesTags: ["TerminatedReport"],
    }),

    getReportsVaccination: builder.query({
      query: ({query,pagination}:any) => {
    
        return {
          url: `/reports/vaccination?page=${pagination?.page}&limit=${pagination?.limit}${query}`,
          method: "GET",
      
        };
      },
    }),
    getReportsBookedShift: builder.query({
      query: ({query,pagination}: any) => {
    
        return {
          url: `/reports/booked-shift?page=${pagination?.page}&limit=${pagination?.limit}${query}`,
          method: "GET",
          keepUnusedDataFor: 1,
        };
      },
    }),
    getReportsWorkedHistory: builder.query({
      query: ({query,pagination}: any) => {
        
        return {
          url: `/reports/work-history?page=${pagination?.page}&limit=${pagination?.limit}${query}`,
          method: "GET",
          keepUnusedDataFor: 1,
        };
      },
    }),

    getReportsCancelShift: builder.query({
      query: ({query,pagination}: any) => {
    
        return {
          url: `/reports/cancel-shift?page=${pagination?.page}&limit=${pagination?.limit}${query}`,
          method: "GET",
         
        };
      },
    }),
    getReportsStaffData: builder.query({
      query: ({query,pagination}:any) => ({
        url: `/reports/staff-data${query}`,
        method: "GET",
      }),
      invalidatesTags: ["staffData"],
    }),
    getReportsStaffAttendance: builder.query({
      query: ({query,pagination}:any) => {
        const url = `/reports/staff-attendance?page=${pagination?.page}&limit=${pagination?.limit}`;
        return {
          url: `${url}${query}`,
          method: "GET",
        };
      },
      invalidatesTags: ["attendanceReport"],
    }),
    getReportsPaymentData: builder.query({
      query: ({query,pagination}:any) => ({
        url: `/reports/payment-data?page=${pagination?.page}&limit=${pagination?.limit}${query}`,
        method: "GET",
      }),
    }),
    getReportsFinanceReport: builder.query({
      query: () => ({
        url: `/reports/finance-report`,
        method: "GET",
      }),
    }),
    getReportsTraineeInfo: builder.query({
      query: ({query,pagination}:any) => ({
        url: `instructor-report/trainee-info-report?page=${pagination?.page}&limit=${pagination?.limit}${query}&courseType=ALL&type=no'`,
        method: "get",
      }),
    }),
    getReportsWebinarInfo: builder.query({
      query: ({query,pagination}:any) => ({
        url: `instructor-report/webinar-report?page=${pagination?.page}&limit=${pagination?.limit}${query}&type=no`,
        method: "get",
      }),
    }),
    getReportsClientsRatings: builder.query({
      query: ({query,pagination}:any) => ({
        url: `/ratings/clients-report?page=${pagination?.page}&limit=${pagination?.limit}${query}`,
        method: "get",
      }),
    }),
    getReportsCarersRatings: builder.query({
      query: ({query,pagination}:any) => ({
        url: `/ratings/carers-report?page=${pagination?.page}&limit=${pagination?.limit}${query}`,
        method: "get",
      }),
    }),
    getFinanceWeekReports: builder.query({
      query: ({ id }: any) => ({
        url: `/invoices/weeks?page=1&limit=10&careHomeId=${id}`,
        method: "get",
      }),
    }),
    getFinanceDetailsReports: builder.query({
      query: ({ startDate, endDate }: any) => ({
        url: `/reports/finance-report?page=1&limit=10&startDate=${startDate}&endDate=${endDate}`,
        method: "get",
      }),
    }),
    getReportsCertificateInfo: builder.query({
      query: ({query,pagination}: any) => ({
        url: `instructor-report/certificate-report?page=${pagination?.page}&limit=${pagination?.limit}${query}&type=no`,
        method: "GET",
      }),
    }),
    getActivityReports: builder.query({
      query: ({query,pagination,id }: any) => {
        return {
          url: `/activity-report?page=${pagination?.page}&limit=${pagination?.limit}${query}`,
          method: "GET",
        };
      }
    }),
    getBookingShitReports: builder.query({
      query: ({ query ,pagination}: any) => ({
        url: `/shifts?page=${pagination?.page}&limit=${pagination?.limit}&shiftStatus=BOOKED${query}`,
        method: "GET",
      }),
    }),
    //filter
    getStaffName: builder.query({
      query: () => ({
        url: `/manage-user?roleName=${"carer"}&fetch=staff&limit=1000`,
        method: "GET",
      }),
    }),

    getClientName: builder.query({
      query: () => ({
        url: `/manage-user?roleName=${"client"}&limit=1000`,
        method: "GET",
      }),
    }),

    getManageUser: builder.query({
      query: () =>({
        url: `/manage-user?roleName=${"all"}&limit=1000`,
        method: "GET"
      })
    }),

    getJobRole: builder.query({
      query: () =>({
        url: `/job-roles`,
        method: "GET"
      })
    }),

    getManageUserAdmin: builder.query({
      query: () =>({
        url: `/manage-user?roleName=${"admin"}&limit=1000`,
        method: "GET"
      })
    }),
    getActivityType: builder.query({
      query: () => ({
        url: `/activity-report/types`,
        method: "GET"
      })
    }),
    getStaffWeekAvailability: builder.query({ query: ({pagination,limit,filterValues,query}:any) => 
      ({ url: `/staff/all-staff-week-availability?page=${pagination}&limit=${limit}&startDateRange=${dayjs(filterValues?.startDate).format("YYYY-MM-DD")}&endDateRange=${dayjs(filterValues?.endDate).format("YYYY-MM-DD")}${query}`,
       method: "GET",
       }), 
 }),
 getStaffDayAvailability: builder.query({
  query: ({pagination,limit,dayDate}:any) => ({
    url: `/staff/all-staff-day-availability?page=${pagination}&limit=${limit}&availabilityDate=${dayDate}`,
    method: "GET",
  }),
}), 
getStaffAvailabilitySheet: builder.query({
  query: ({pagination,limit,filterValues,query}:any) => ({
    url:  `/staff/all-staff-availability?page=${pagination}&limit=${limit}&startDateRange=${dayjs(filterValues?.startDate).format("YYYY-MM-DD")}&endDateRange=${dayjs(filterValues?.endDate).format("YYYY-MM-DD")}${query}`,
    method: "GET",
  }),
}),
postStaffAvailabilitySheetModal:builder.mutation({
  query: ({ payload }: any) => ({
    url: `/staff/submit-staff-availability?userId=642f8900c36541ddf5ccd3f0&availabilityDate=2023-03-24&availableShift='LONGDAY'`,
    method: "POST",
    body:payload
  }),
}),
  }),
});

export const {
  useGetReportsPaymentDataQuery,
  useGetReportsDailyShiftQuery,
  useGetReportsComplienceQuery,
  useGetReportsCancelShiftQuery,
  
  useGetBookingShitReportsQuery,
  useGetReportsRateSettingQuery,
  useGetReportsStaffDataQuery,
  useGetReportsStaffAttendanceQuery,
  useGetReportsCarerRequestQuery,
  useGetReportsExtraHoursQuery,
  useReactivateTerminatedReportMutation,
  useGetReportsTerminatedQuery,
  useGetReportsProftGrossProfitQuery,
  useGetReportsShiftHoursQuery,
  useGetReportsFinanceReportQuery,
  useGetReportsBookedShiftQuery,
  useGetReportsWorkedHistoryQuery,
  useGetActivityReportsQuery,
  useGetReportsVaccinationQuery,
  //filter
  useGetStaffNameQuery,
  useGetClientNameQuery,
  useGetManageUserQuery,
  useGetJobRoleQuery,
  useGetManageUserAdminQuery,
  useGetActivityTypeQuery,
  //
  useGetReportsTraineeInfoQuery,
  useGetReportsWebinarInfoQuery,
  useGetReportsCertificateInfoQuery,
  useGetIncidentReportsQuery,
  usePostIncidentReportsMutation,
  useGetWhistleBlowingReportsQuery,
  usePostWhistleBlowingReportsMutation,
  useGetReportsClientsRatingsQuery,
  useGetReportsCarersRatingsQuery,
  useGetFinanceWeekReportsQuery,
  useDeleteWhistleBlowingReportsMutation,
  useGetFinanceDetailsReportsQuery,
  usePutWhistleBlowingRemarksReportsMutation,
  usePostReportsCarerRequestMutation,
  useChangeStatusIncedentMutation,
  useGetStaffWeekAvailabilityQuery,
  useGetStaffDayAvailabilityQuery,
  useGetStaffAvailabilitySheetQuery,
  usePostStaffAvailabilitySheetModalMutation,

  
} = extendedApi;
