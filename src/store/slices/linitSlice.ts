import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const linitApi = createApi({
    reducerPath: 'linitApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
    endpoints: (builder) => ({
        fetchLinit: builder.query({
            query: () => `linit/`
        }),
    }),
});

export const { useFetchLinitQuery } = linitApi;