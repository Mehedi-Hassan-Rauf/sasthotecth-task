import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Meal {
  id: number;
  title: string;
  image: string;
  date: string; 
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
  mealPlan: Meal[]; 
}

const initialState: PlannerState = {
  selectedDate: new Date().toISOString().split('T')[0],
  mealPlan: [],
};

const plannerSlice = createSlice({
  name: 'planner',
  initialState,
  reducers: {
    setSelectedDate(state, action: PayloadAction<string>) {
      state.selectedDate = action.payload;
    },
    addMealToPlan(state, action: PayloadAction<Meal>) {
      const newMeal = action.payload;
      if (!newMeal.date) {
        newMeal.date = state.selectedDate;
      }
      state.mealPlan.push(newMeal);
    },
    removeMealFromPlan(state, action: PayloadAction<{ mealId: number }>) {
      const { mealId } = action.payload;
      state.mealPlan = state.mealPlan.filter(meal => meal.id !== mealId);
    },
    clearMealsForDate(state, action: PayloadAction<string>) {
      const dateToClear = action.payload;
      state.mealPlan = state.mealPlan.filter(meal => meal.date !== dateToClear);
    },
  },
});

export const { setSelectedDate, addMealToPlan, removeMealFromPlan, clearMealsForDate } =
  plannerSlice.actions;

export default plannerSlice.reducer;
