import { emptySplitApi } from "../../Services";


export const extendedApi = emptySplitApi.injectEndpoints({
    endpoints: (builder: any) => ({
      getAllProducts: builder.query({
        query: ({page,limit,query}:any) => ({
          url: `/products${query}`,
          method: "GET",
        }),
  
        providesTags: ["products"],
      }),
      getAllCategoriess: builder.query({
        query: ({page,limit,query}:any) => ({
          url: `/categories`,
          method: "GET",
        }),
  
        providesTags: ["categories"],
      }),
      getAllMaterials: builder.query({
        query: ({page,limit,query}:any) => ({
          url: `/material`,
          method: "GET",
        }),
  
        providesTags: ["material"],
      }),
      getAllColors: builder.query({
        query: ({page,limit,query}:any) => ({
          url: `/colors`,
          method: "GET",
        }),
  
        providesTags: ["colors"],
      }),
    
    }),
  });
  
  export const {
   useGetAllProductsQuery,
   useGetAllCategoriessQuery,useGetAllColorsQuery,useGetAllMaterialsQuery
  } = extendedApi;
  