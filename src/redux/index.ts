import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import solitaireReducer from "./slices/solitaire.slice";

const persistConfig = {
  key: "root",
  version: 2,
  storage: storage,
  whitelist: [],
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    solitaire: solitaireReducer,
  })
);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NEXT_PUBLIC_NODE_ENV === "local",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        ignoredActionPaths: [
          "meta.arg",
          "payload.timestamp",
          "payload.headers",
        ],
      },
    }),
});

export type AppStore = typeof store.dispatch;
export type AppState = ReturnType<typeof persistedReducer>;

export default store;
