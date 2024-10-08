import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { thunk } from "redux-thunk";
import storage from "redux-persist/lib/storage"
import persistStore from "redux-persist/es/persistStore";
import authSlice from "./authSlice";
import { useDispatch } from "react-redux";

const persistConfig = {
    key: "root",
    storage,
}

const reducers = combineReducers({
    auth: authSlice,
})

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: () => [thunk],
})

export const persistor = persistStore(store)

/**
 * @typedef {ReturnType<typeof store.getState>} RootState
 */
export const RootState = store.getState();

export const useAppDispatch = () => useDispatch();
