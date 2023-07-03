import { ROLES } from "../../../../constants/Roles";
import { emptySplitApi } from "../../../Services";

export const SettingShiftTimeSettingsApis = emptySplitApi.injectEndpoints({
  endpoints: (builder: any) => ({
    getShifTime: builder.query({
      query: ({ query}:any) => ({
        url: `/shift-time${query}`,
        method: "GET",
        keepUnusedDataFor: 1,
      }),
      providesTags: ["SettingShiftTimeSettings"],
    }),

    getShifTimeFilter: builder.query({
      query: () => ({
        url: `/manage-user?page=1&limit=999&roleName=client`,
        method: "GET",
        keepUnusedDataFor: 1,
      }),
      providesTags: ["SettingShiftTimeSettings"],
    }),

    postShifTime: builder.mutation({
      query: ( {payload, id} : any) => ({
        url: `/shift-time?careHomeId=${id}`,
        method: "post",
        body: payload,
      }),
      invalidatesTags: ["SettingShiftTimeSettings"],
    }),
    deleteShifTime: builder.mutation({
      query: (id: string) => ({
        url: `/shift-time/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SettingShiftTimeSettings"],
    }),

    updateShifTime: builder.mutation({
      query: ({ id, payload }: any) => ({
        url: `/shift-time/${id}`,
        method: "PATCH",
        body: payload,
      }),

      invalidatesTags: ["SettingShiftTimeSettings"],
    }),

    updateCrossAllocation: builder.mutation({
      query: ({ id, payload }: any) => ({
        url: `/shift-time/${id}`,
        method: "PATCH",
        body: { ...payload, crossAllocation: payload?.croosAllocation },
      }),

      invalidatesTags: ["SettingShiftTimeSettings"],
    }),

  }),
});

export const {
  useGetShifTimeQuery,
  useGetShifTimeFilterQuery,
  usePostShifTimeMutation,
  useDeleteShifTimeMutation,
  useUpdateShifTimeMutation,
  useUpdateCrossAllocationMutation,
} = SettingShiftTimeSettingsApis;