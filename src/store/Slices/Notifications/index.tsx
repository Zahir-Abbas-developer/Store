import { emptySplitApi } from "../../Services";
export const extendedApi = emptySplitApi.injectEndpoints({
  endpoints: (builder: any) => ({
    getOverAllNotifications: builder.query({
      query: () => ({
        url: `/notification/get`,
        method: "GET",
      }),
    }),
  
  }),
});

export const {
 useGetOverAllNotificationsQuery
} = extendedApi;
