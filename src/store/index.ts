import { configureStore } from '@reduxjs/toolkit';
import recipeReducer from './recipeSlice';
import plannerReducer from './plannerSlice';

export const store = configureStore({
  reducer: {
    recipes: recipeReducer,
    planner: plannerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
