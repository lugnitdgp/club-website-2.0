import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const devArticlesApi = createApi({
    reducerPath: 'devArticlesApi',
    baseQuery: fetchBaseQuery({ baseUrl: "https://dev.to/api/" }),
    endpoints: (builder) => ({
        fetchDevArticles: builder.query({
            query: () => `articles?username=nitdgplug`
        }),
    }),
});

export  const { useFetchDevArticlesQuery } = devArticlesApi;