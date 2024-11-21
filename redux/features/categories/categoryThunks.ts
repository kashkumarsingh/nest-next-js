import { createAsyncThunk } from '@reduxjs/toolkit';
import { Category } from '../../../types/category';
import apiClient from '../../../utils/apiClient'; // Import the Axios instance

// Async thunk to fetch categories using Axios
export const fetchCategoriesThunk = createAsyncThunk<Category[], void, { rejectValue: string }>(
  'categories/fetchCategories', // Name the action type for logging
  async (_, thunkAPI) => {
    try {
      // Use Axios instance to fetch data
      const response = await apiClient.get<{ data: Category[] }>('/categories');
      return response.data.data; // Return the categories from the response
    } catch (error) {
      console.error('Error fetching categories:', error);
      return thunkAPI.rejectWithValue('Failed to fetch categories'); // Return error message
    }
  }
);
