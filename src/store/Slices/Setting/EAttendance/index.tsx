import { emptySplitApi } from "../../../Services";

export const SettingEAttendanceApis = emptySplitApi.injectEndpoints({
  endpoints: (builder: any) => ({
    getEAttendance: builder.query({
      query: () => ({
        url: `/e-attendance`,
        method: "GET",
        keepUnusedDataFor: 1,
      }),
      providesTags: ["SettingEAttendance"],
    }),

    postEAttendance: builder.mutation({
      query: ({ payload }: any) => ({
        url: "/e-attendance",
        method: "post",
        body: payload,
      }),
      invalidatesTags: ["SettingEAttendance"],
    }),
   
  }),
});

export const {
  useGetEAttendanceQuery,
  usePostEAttendanceMutation,
} = SettingEAttendanceApis;