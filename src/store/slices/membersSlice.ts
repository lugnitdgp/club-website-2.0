import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const membersApi = createApi({
    reducerPath: 'membersApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
    endpoints: (builder) => ({
        fetchMembers: builder.query({
            query: () => `profiles/`
        }),
    }),
});

export  const { useFetchMembersQuery } = membersApi;