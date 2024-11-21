// redux/features/categories/categorySlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category } from '../../../types/category';
import { fetchCategoriesThunk } from './categoryThunks';

// Export the shape of your state so it can be used elsewhere
export interface CategoryState {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
};

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoriesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategoriesThunk.fulfilled, (state, action: PayloadAction<Category[]>) => {
        state.categories = action.payload;
        state.loading = false;
      })
      .addCase(fetchCategoriesThunk.rejected, (state, action) => {
        state.error = action.payload as string || 'Failed to fetch categories';
        state.loading = false;
      });
  },
});

export default categorySlice.reducer;
