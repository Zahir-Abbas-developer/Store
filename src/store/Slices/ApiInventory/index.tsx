import { emptySplitApi } from "../../Services";
export const ApiInventory = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getApisList: builder.query({
      query: (search:any) => ({
        url: `api-inventory${search && `?search=${search}`}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetApisListQuery } = ApiInventory;
