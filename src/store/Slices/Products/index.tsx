import { emptySplitApi } from "../../Services";


export const extendedApi = emptySplitApi.injectEndpoints({
    endpoints: (builder: any) => ({
      getAllProducts: builder.query({
        query: ({page,limit,query}:any) => ({
          url: `/products?productType=SHOES${query}`,
          method: "GET",
        }),
  
        providesTags: ["products"],
      }),
      globalSearch: builder.query({
        query: ({page,limit,query}:any) => ({
          url: `/products${query}`,
          method: "GET",
        }),
  
        providesTags: ["products"],
      }),
      jacketsAllProducts: builder.query({
        query: ({page,limit,query}:any) => ({
          url: `/products?productType=JACKETS${query}`,
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
      getOrders: builder.query({
        query: ({page,limit,query}:any) => ({
          url: `/orders`,
          method: "GET",
        }),
  
        providesTags: ["orders"],
      }),
      postOrders: builder.mutation({
        query: ({ payload ,id }: any) => ({
          url: `orders`,
          method: "POST",
          body: payload,
        }),
  
        invalidatesTags: ["orders"],
      }),
      deleteOrders: builder.mutation({
        query: ({ payload ,id }: any) => ({
          url: `products/${id}`,
          method: "DELETE",
        }),
  
        invalidatesTags: ["orders"],
      }),
      updateOrders: builder.mutation({
        query: ({ payload ,id }: any) => ({
          url: `products/${id}`,
          method: "PUT",
          body: payload,
        }),
  
        invalidatesTags: ["orders"],
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

      //sign-up
      authSignUp: builder.mutation({
        query: ({ payload ,id }: any) => ({
          url: `auth/signup`,
          method: "POST",
          body: payload,
        }),
  
        invalidatesTags: ["categories"],
      }),
    }),
  });
  
  export const {
   useGetAllProductsQuery,
   useGlobalSearchQuery,
   usePostProductsMutation,
   useDeleteProductsMutation,
   useUpdateProductsMutation,
   useJacketsAllProductsQuery,
   useAuthSignUpMutation,
   usePostOrdersMutation,
   useGetOrdersQuery,
   useGetAllCategoriessQuery,useGetAllColorsQuery,useGetAllMaterialsQuery,usePostCategoriesMutation,useDeleteCategoriesMutation,useUpdateCategoriesMutation,usePostColorsMutation,useUpdateColorsMutation,useDeleteColorsMutation ,
   useUpdateMaterialsMutation,useDeleteMaterialsMutation,usePostMaterialsMutation
  } = extendedApi;
  