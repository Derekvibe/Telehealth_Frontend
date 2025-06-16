import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import {
  persistReducer as persistReducerFn,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

// Persist config
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

// Combine all slices
const rootReducer = combineReducers({
  auth: authSlice,
});

// Wrap reducer with persistReducer
const persistedReducer = persistReducerFn(persistConfig, rootReducer);

// Configure store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
