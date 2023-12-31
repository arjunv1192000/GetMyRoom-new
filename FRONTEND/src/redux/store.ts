import { configureStore,combineReducers } from '@reduxjs/toolkit';
import { userSlice } from './reducer/userSlice.ts';
import { adminSlice } from './reducer/AdminSlice.ts';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';


const persistConfig = {
    key: 'root',
    storage,
  };
  
  const rootReducer = combineReducers({
    user: userSlice.reducer,
    admin:adminSlice.reducer,

   
  
  
    
  });
  
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  
  const store = configureStore({
    reducer: persistedReducer,
  });
  
  export default store;