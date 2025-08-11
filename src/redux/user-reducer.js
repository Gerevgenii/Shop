import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { db } from '../firebase';
import { child, get, push, ref, set, update } from 'firebase/database';

export const fetchUserByEmailAndPassword = createAsyncThunk(
	'user/fetchUserByEmailAndPassword',
	async ({ email, password }, { rejectWithValue }) => {
		try {
			const snapshot = await get(child(ref(db), 'users'));
			if (snapshot.exists()) {
				const users = snapshot.val();
				const foundEntry = Object.entries(users).find(
					([, user]) => user.email === email && user.password === password,
				);
				if (!foundEntry) {
					return rejectWithValue('Пользователь не найден');
				}
				const [id, userData] = foundEntry;
				return { id, ...userData };
			} else {
				return rejectWithValue('Пользователей нет в базе');
			}
		} catch (error) {
			return rejectWithValue(error.message);
		}
	},
);

export const updateItemInUserBin = createAsyncThunk(
	'user/addItemToUserBin',
	async ({ userID, productId, quantity }, { getState, rejectWithValue }) => {
		try {
			const currentBin = getState().user.shopBin || {};

			const updatedBin = {
				...currentBin,
				[productId]: (currentBin[productId] || 0) + Number(quantity),
			};

			await update(ref(db, `users/${userID}`), { shopBin: updatedBin });
			return updatedBin;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	},
);

export const removeItemFromUserBin = createAsyncThunk(
	'user/removeItemFromUserBin',
	async ({ userID, productId }, { getState, rejectWithValue }) => {
		try {
			const currentBin = { ...getState().user.shopBin };
			delete currentBin[productId];
			await update(ref(db, `users/${userID}`), { shopBin: currentBin });
			return currentBin;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	},
);

export const removeUserBin = createAsyncThunk(
	'user/removeUserBin',
	async ({ userID }, { rejectWithValue }) => {
		try {
			console.log('asdf');
			await update(ref(db, `users/${userID}`), { shopBin: {} });
			return {};
		} catch (error) {
			return rejectWithValue(error.message);
		}
	},
);

export const registerUser = createAsyncThunk(
	'user/registerUser',
	async ({ name, email, password }, { rejectWithValue }) => {
		try {
			const usersRef = ref(db, 'users');
			const snapshot = await get(usersRef);

			if (snapshot.exists()) {
				const usersArray = Object.values(snapshot.val());

				const existingUser = usersArray.find((u) => u.email === email);
				if (existingUser) {
					return rejectWithValue('Пользователь с таким email уже существует');
				}
			}

			const newUserRef = push(usersRef);
			const newUser = {
				userID: newUserRef.key,
				name,
				email,
				password,
				shopBin: {},
			};
			await set(newUserRef, newUser);

			return newUser;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	},
);

const initialUser = {
	userID: '',
	name: '',
	email: '',
	password: '',
	shopBin: {},
	error: null,
};

const userSlice = createSlice({
	name: 'user',
	initialState: initialUser,
	reducers: {
		clearUser(state) {
			state.userID = '';
			state.name = '';
			state.email = '';
			state.password = '';
			state.shopBin = {};
		},
		clearError(state) {
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUserByEmailAndPassword.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(fetchUserByEmailAndPassword.fulfilled, (state, action) => {
				state.isLoading = false;
				state.error = null;
				const { id, name, email, password, shopBin } = action.payload;
				state.userID = id;
				state.name = name;
				state.email = email;
				state.password = password;
				state.shopBin = shopBin || {};
			})
			.addCase(fetchUserByEmailAndPassword.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload || 'Ошибка загрузки пользователя';
			});
		builder
			.addCase(updateItemInUserBin.fulfilled, (state, action) => {
				state.shopBin = action.payload;
			})
			.addCase(updateItemInUserBin.rejected, (state, action) => {
				state.error = action.payload || 'Ошибка при добавлении товара в корзину';
			});
		builder
			.addCase(removeItemFromUserBin.fulfilled, (state, action) => {
				state.shopBin = action.payload;
			})
			.addCase(removeItemFromUserBin.rejected, (state, action) => {
				state.error = action.payload || 'Ошибка при удалении товара из корзины';
			});
		builder
			.addCase(removeUserBin.fulfilled, (state, action) => {
				state.shopBin = action.payload;
			})
			.addCase(removeUserBin.rejected, (state, action) => {
				state.error = action.payload || 'Ошибка при удалении товара из корзины';
			});
		builder
			.addCase(registerUser.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(registerUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.error = null;
				state.userID = action.payload.userID;
				state.name = action.payload.name;
				state.email = action.payload.email;
				state.password = action.payload.password;
				state.shopBin = action.payload.shopBin;
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			});
	},
});

export const { clearUser, clearError } = userSlice.actions;
export default userSlice.reducer;
