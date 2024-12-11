import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Meal {
  id: number;
  title: string;
  image: string;
  servings: number;
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

interface PlannerState {
  selectedDate: string;
  mealPlan: { [date: string]: Meal[] };
}

const initialState: PlannerState = {
  selectedDate: new Date().toISOString().split('T')[0], // Default to today
  mealPlan: {},
};

const plannerSlice = createSlice({
  name: 'planner',
  initialState,
  reducers: {
    setSelectedDate(state, action: PayloadAction<string>) {
      state.selectedDate = action.payload;
    },
    addMealToPlan(state, action: PayloadAction<{ date: string; meal: Meal }>) {
      const { date, meal } = action.payload;
      if (!state.mealPlan[date]) {
        state.mealPlan[date] = [];
      }
      state.mealPlan[date].push(meal);
    },
    removeMealFromPlan(state, action: PayloadAction<{ date: string; mealId: number }>) {
      const { date, mealId } = action.payload;
      state.mealPlan[date] = state.mealPlan[date]?.filter((meal) => meal.id !== mealId) || [];
    },
    clearMealsForDate(state, action: PayloadAction<string>) {
      const date = action.payload;
      delete state.mealPlan[date];
    },
  },
});

export const { setSelectedDate, addMealToPlan, removeMealFromPlan, clearMealsForDate } =
  plannerSlice.actions;

export default plannerSlice.reducer;
