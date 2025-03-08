import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const countApi = createApi({
    reducerPath: 'countApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
    endpoints: (builder) => ({
        fetchCount: builder.query({
            query: () => `get_count/`
        }),
    }),
});

export  const { useFetchCountQuery } = countApi;