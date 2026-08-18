import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const timelineApi = createApi({
    reducerPath: 'timelineApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
    endpoints: (builder) => ({
        fetchTimeline: builder.query({
            query: () => `timeline/`
        }),
    }),
});

export  const { useFetchTimelineQuery } = timelineApi;