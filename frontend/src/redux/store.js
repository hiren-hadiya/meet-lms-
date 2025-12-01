// // import { configureStore } from '@reduxjs/toolkit';
// // import userSlice from './userSlice';

// // const store = configureStore({
// //   reducer: {
// //     user: userSlice,
// //     // Add other slices here as needed
// //   }
// // });

// // export default store;
// import { configureStore } from '@reduxjs/toolkit'
// import { persistStore, persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage'  // defaults to localStorage for web
// import { combineReducers } from 'redux'
// import userSlice from './userSlice'

// // Combine all reducers
// const rootReducer = combineReducers({
//   user: userSlice,
// })

// // Persist config
// const persistConfig = {
//   key: 'root',
//   storage,
// }

// // Wrap reducer with persistReducer
// const persistedReducer = persistReducer(persistConfig, rootReducer)

// // Create store
// export const store = configureStore({
//   reducer: persistedReducer,
// })

// // Create persistor
// export const persistor = persistStore(store)


import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from 'redux'
import userSlice from './userSlice'
import courseSlice from './courseSlice'
import lectureSlice from './lectureSlice'
import reviewSlice from './reviewSlice'


const rootReducer = combineReducers({
  user: userSlice,
  course:courseSlice,
  lecture:lectureSlice,
  review:reviewSlice
})

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // 👇 Ignore Redux Persist action types
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)
