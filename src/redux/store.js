import { combineReducers, configureStore } from "@reduxjs/toolkit"
import authReducer from "./features/AuthSlice"
import userReducer from "./features/UserSlice"
import universityReducer from "./features/UniversitySlice"

import { persistReducer, persistStore } from "redux-persist"
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    university: universityReducer
})

const persistConfig = {
    key: "root",
    storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer
});

const persist = persistStore(store);

export default store;

export { persist };