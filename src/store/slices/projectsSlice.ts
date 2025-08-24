import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const projectApi = createApi({
    reducerPath: 'projectApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
    endpoints: (builder) => ({
        fetchProjects: builder.query({
            query: () => `project/`
        }),
    }),
});

export const { useFetchProjectsQuery } = projectApi;