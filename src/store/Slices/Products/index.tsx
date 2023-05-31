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
      postProducts: builder.mutation({
        query: ({ payload ,id }: any) => ({
          url: `products`,
          method: "POST",
          body: payload,
        }),
  
        invalidatesTags: ["products"],
      }),
      deleteProducts: builder.mutation({
        query: ({ payload ,id }: any) => ({
          url: `products/${id}`,
          method: "DELETE",
        }),
  
        invalidatesTags: ["products"],
      }),
      updateProducts: builder.mutation({
        query: ({ payload ,id }: any) => ({
          url: `products/${id}`,
          method: "PUT",
          body: payload,
        }),
  
        invalidatesTags: ["products"],
      }),
      getAllCategoriess: builder.query({
        query: ({page,limit,query}:any) => ({
          url: `/categories`,
          method: "GET",
        }),
  
        providesTags: ["categories"],
      }),
      postCategories: builder.mutation({
        query: ({ payload ,id }: any) => ({
          url: `categories`,
          method: "POST",
          body: payload,
        }),
  
        invalidatesTags: ["categories"],
      }),
      deleteCategories: builder.mutation({
        query: ({ payload ,id }: any) => ({
          url: `categories/${id}`,
          method: "DELETE",
        }),
  
        invalidatesTags: ["categories"],
      }),
      updateCategories: builder.mutation({
        query: ({ payload ,id }: any) => ({
          url: `categories/${id}`,
          method: "PUT",
          body: payload,
        }),
  
        invalidatesTags: ["categories"],
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
      postColors: builder.mutation({
        query: ({ payload ,id }: any) => ({
          url: `colors`,
          method: "POST",
          body: payload,
        }),
  
        invalidatesTags: ["colors"],
      }),
      deleteColors: builder.mutation({
        query: ({ payload ,id }: any) => ({
          url: `colors/${id}`,
          method: "DELETE",
        }),
  
        invalidatesTags: ["colors"],
      }),
      updateColors: builder.mutation({
        query: ({ payload ,id }: any) => ({
          url: `colors/${id}`,
          method: "PUT",
          body: payload,
        }),
  
        invalidatesTags: ["colors"],
      }),
      postMaterials: builder.mutation({
        query: ({ payload ,id }: any) => ({
          url: `material`,
          method: "POST",
          body: payload,
        }),
  
        invalidatesTags: ["material"],
      }),
      deleteMaterials: builder.mutation({
        query: ({ payload ,id }: any) => ({
          url: `material/${id}`,
          method: "DELETE",
        }),
  
        invalidatesTags: ["material"],
      }),
      updateMaterials: builder.mutation({
        query: ({ payload ,id }: any) => ({
          url: `material/${id}`,
          method: "PUT",
          body: payload,
        }),
  
        invalidatesTags: ["material"],
      }),
    }),
  });
  
  export const {
   useGetAllProductsQuery,
   usePostProductsMutation,
   useDeleteProductsMutation,
   useUpdateProductsMutation,
   useGetAllCategoriessQuery,useGetAllColorsQuery,useGetAllMaterialsQuery,usePostCategoriesMutation,useDeleteCategoriesMutation,useUpdateCategoriesMutation,usePostColorsMutation,useUpdateColorsMutation,useDeleteColorsMutation ,
   useUpdateMaterialsMutation,useDeleteMaterialsMutation,usePostMaterialsMutation
  } = extendedApi;
  