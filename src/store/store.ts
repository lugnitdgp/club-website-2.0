import { configureStore } from '@reduxjs/toolkit'
import { countApi } from './slices/countSlice'
import { contactApi } from './slices/contactSlice'
import { timelineApi } from './slices/timelineSlice'
import { devArticlesApi } from './slices/devArticlesSlice'
import { eventsApi } from './slices/eventsSlice'
import { membersApi } from './slices/membersSlice'
import { alumniApi } from './slices/alumniSlice'
export const store = configureStore({
    reducer: {
        [countApi.reducerPath]: countApi.reducer,
        [contactApi.reducerPath]: contactApi.reducer,
        [timelineApi.reducerPath]: timelineApi.reducer,
        [devArticlesApi.reducerPath]: devArticlesApi.reducer,
        [eventsApi.reducerPath]: eventsApi.reducer,
        [membersApi.reducerPath]: membersApi.reducer,
        [alumniApi.reducerPath]: alumniApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(countApi.middleware, contactApi.middleware, timelineApi.middleware, devArticlesApi.middleware, eventsApi.middleware, membersApi.middleware, alumniApi.middleware),
})
