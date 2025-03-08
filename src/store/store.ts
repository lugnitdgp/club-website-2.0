import { configureStore } from '@reduxjs/toolkit'
import { countApi } from './slices/countSlice'
import { contactApi } from './slices/contactSlice'
import { timelineApi } from './slices/timelineSlice'
import { devArticlesApi } from './slices/devArticlesSlice'
import { eventsApi } from './slices/eventsSlice'
export const store = configureStore({
    reducer: {
        [countApi.reducerPath]: countApi.reducer,
        [contactApi.reducerPath]: contactApi.reducer,
        [timelineApi.reducerPath]: timelineApi.reducer,
        [devArticlesApi.reducerPath]: devArticlesApi.reducer,
        [eventsApi.reducerPath]: eventsApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(countApi.middleware, contactApi.middleware, timelineApi.middleware, devArticlesApi.middleware, eventsApi.middleware),
})
