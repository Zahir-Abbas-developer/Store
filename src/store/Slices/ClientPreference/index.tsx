import { emptySplitApi } from "../../Services";


export const ClientPreference: any = emptySplitApi.injectEndpoints({
  endpoints: (builder: any) => ({
    getJobRoles: builder.query({
      query: () => ({
        url: "/job-roles",
        method: "GET"
      })
    }),

    addPreference: builder.mutation({
      query: (payload: any) => ({
        url: `/preferences`,
        method: "POST",
        body: payload
      }),
      invalidatesTags: ["preference"],
    }),

    getPreference: builder.query({
      query: ({ page }: any) => ({
        url: `/preferences?page=${page.page}&limit=${page.limit}`,
        method: "GET",
      }),
      providesTags: ["preference"],
    }),

    deletePreference: builder.mutation({
      query: ({ id }: any) => ({
        url: `/preferences/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ["preference"],
    }),

    updatePreference: builder.mutation({
      query: ({ id, payload }: any) => ({
        url: `/preferences/${id}`,
        method: "PATCH",
        body: payload
      }),
      invalidatesTags: ["preference"],
    })
  })
})

export const {
  useGetJobRolesQuery,
  useAddPreferenceMutation,
  useGetPreferenceQuery,
  useDeletePreferenceMutation,
  useUpdatePreferenceMutation
} = ClientPreference;