import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const alumniApi = createApi({
    reducerPath: 'alumniApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
    endpoints: (builder) => ({
        fetchAlumni: builder.query({
            query: () => `alumni/`,
            transformResponse: (response: Array<any>) => {
                const sortedResponse = response.sort((a, b) => b.passout_year - a.passout_year);
                return sortedResponse.reduce((acc, alumni) => {
                    const year = alumni.passout_year;
                    if (!acc[year]) {
                        acc[year] = [];
                    }
                    acc[year].push(alumni);
                    return acc;
                }, {});
            }
        }),
    }),
});

export const { useFetchAlumniQuery } = alumniApi;