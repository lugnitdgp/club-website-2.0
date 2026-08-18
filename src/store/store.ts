import { configureStore } from '@reduxjs/toolkit'
import { countApi } from './slices/countSlice'
import { contactApi } from './slices/contactSlice'
import { timelineApi } from './slices/timelineSlice'
import { devArticlesApi } from './slices/devArticlesSlice'
import { eventsApi } from './slices/eventsSlice'
import { membersApi } from './slices/membersSlice'
import { alumniApi } from './slices/alumniSlice'
import { linitApi } from './slices/linitSlice'
import { projectApi } from './slices/projectsSlice'
import { blogApi } from './slices/blogSlice'

export const store = configureStore({
    reducer: {
        [countApi.reducerPath]: countApi.reducer,
        [contactApi.reducerPath]: contactApi.reducer,
        [timelineApi.reducerPath]: timelineApi.reducer,
        [devArticlesApi.reducerPath]: devArticlesApi.reducer,
        [eventsApi.reducerPath]: eventsApi.reducer,
        [membersApi.reducerPath]: membersApi.reducer,
        [alumniApi.reducerPath]: alumniApi.reducer,
        [linitApi.reducerPath]: linitApi.reducer,
        [projectApi.reducerPath]: projectApi.reducer,
        [blogApi.reducerPath]: blogApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            countApi.middleware, 
            contactApi.middleware, 
            timelineApi.middleware, 
            devArticlesApi.middleware, 
            eventsApi.middleware, 
            membersApi.middleware, 
            alumniApi.middleware, 
            linitApi.middleware, 
            projectApi.middleware,
            blogApi.middleware  // ← Add this line!
        ),
})