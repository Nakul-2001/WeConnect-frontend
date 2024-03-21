import { configureStore,combineReducers } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import conversationReducer from './conversationSlice';
import socketReducer from './socketSlice'
import storage from 'redux-persist/lib/storage'
import { persistStore,persistReducer} from "redux-persist";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({user:userReducer,conversations:conversationReducer,sockets:socketReducer});
const persistedReducer = persistReducer(persistConfig,rootReducer);

export const Store = configureStore({
  reducer:persistedReducer
});

export let persistor = persistStore(Store);