import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './features/categories/categorySlice'; // Import the category reducer

// Setup store
const store = configureStore({
  reducer: {
    categories: categoryReducer, // The category reducer is set up here
  },
});

// Automatically infer RootState and AppDispatch types using ReturnType
export type RootState = ReturnType<typeof store.getState>;  // This infers the RootState type automatically from the store's getState method
export type AppDispatch = typeof store.dispatch; // Infers the dispatch type from the store

export default store;
