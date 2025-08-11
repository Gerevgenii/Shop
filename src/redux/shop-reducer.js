import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../firebase';
import { get, ref } from 'firebase/database';

export const fetchItems = createAsyncThunk(
	'shop/fetchItems',
	async (_, { rejectWithValue }) => {
		try {
			const snapshot = await get(ref(db, 'items'));
			if (snapshot.exists()) {
				const itemsObj = snapshot.val();
				const items = Object.entries(itemsObj).map(([id, data]) => ({
					id,
					...data,
				}));
				return items;
			} else {
				return [];
			}
		} catch (error) {
			return rejectWithValue(error.message);
		}
	},
);
const initialShop = {
	items: [],
	hints: [],
	isLoading: false,
	theme: false,
	error: null,
};

const shopSlice = createSlice({
	name: 'shop',
	initialState: initialShop,
	reducers: {
		setLoading(state, action) {
			state.isLoading = action.payload;
		},
		toggleTheme(state) {
			state.theme = !state.theme;
		},
		addToHints(state, action) {
			state.hints.push(action.payload);
		},
		removeFromHints(state) {
			state.hints.shift();
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchItems.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(fetchItems.fulfilled, (state, action) => {
				state.isLoading = false;
				state.items = action.payload;
			})
			.addCase(fetchItems.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload || 'Ошибка загрузки';
			});
	},
});

export const { setItems, setLoading, toggleTheme, addToHints, removeFromHints } =
	shopSlice.actions;
export default shopSlice.reducer;
