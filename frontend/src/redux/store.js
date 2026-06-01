import { combineReducers, configureStore, createReducer } from '@reduxjs/toolkit'
import { useReducer } from 'react';
import {persistReducer} from 'redux-persist'
import {persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './slices/userSlices'
import productReducer from './slices/productSlices'
import categoryReducer from './slices/categorySlices'

const rootReducer = combineReducers({
    user:userReducer,
    product:productReducer,
    category:categoryReducer

})
const persistConfig ={key:"root",storage,version:1}
const persistedReducer = persistReducer(persistConfig,rootReducer)
export const store = configureStore({reducer:persistedReducer})
export const persistor = persistStore(store)