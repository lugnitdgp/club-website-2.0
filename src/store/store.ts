import { configureStore } from '@reduxjs/toolkit'
import { countApi } from './slices/countSlice'
import { contactApi } from './slices/contactSlice'
import { timelineApi } from './slices/timelineSlice'
export const store = configureStore({
    reducer: {
        [countApi.reducerPath]: countApi.reducer,
        [contactApi.reducerPath]: contactApi.reducer,
        [timelineApi.reducerPath]: timelineApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(countApi.middleware, contactApi.middleware, timelineApi.middleware),
})
