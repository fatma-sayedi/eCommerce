import { combineReducers, configureStore, createReducer } from '@reduxjs/toolkit'
import { useReducer } from 'react';
import {persistReducer} from 'redux-persist'
import {persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './slices/userSlices'
import productReducer from './slices/productSlices'
import categoryReducer from './slices/categorySlices'
import subcategoryReducer from './slices/subCategorySlices'
import Cartreducer from "./slices/CartSlices"
import orderReducer from "./slices/orderSlice"



const rootReducer = combineReducers({
    user:userReducer,
    product:productReducer,
    categories:categoryReducer,
    subcategories:subcategoryReducer,
    cart: Cartreducer,
    order: orderReducer
   

})
const persistConfig ={key:"root",storage,version:1}
const persistedReducer = persistReducer(persistConfig,rootReducer)
export const store = configureStore({reducer:persistedReducer})
export const persistor = persistStore(store)