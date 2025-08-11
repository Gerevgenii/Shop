import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user-reducer';
import shopReducer from './shop-reducer';

export const store = configureStore({
	reducer: {
		user: userReducer,
		shop: shopReducer,
	},
	devTools: true,
});
