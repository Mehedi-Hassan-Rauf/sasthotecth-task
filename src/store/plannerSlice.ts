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
  mealPlan: {
    [date: string]: Meal[];
  };
  selectedDate: string;
}

const initialState: PlannerState = {
  mealPlan: {},
  selectedDate: new Date().toISOString().split('T')[0],
};

const plannerSlice = createSlice({
  name: 'planner',
  initialState,
  reducers: {
    setSelectedDate(state, action: PayloadAction<string>) {
      state.selectedDate = action.payload;
    },
    addMealToPlan(
      state,
      action: PayloadAction<{ date: string; meal: Meal }>
    ) {
      const { date, meal } = action.payload;
      if (!state.mealPlan[date]) {
        state.mealPlan[date] = [];
      }
      state.mealPlan[date].push(meal);
    },
    removeMealFromPlan(
      state,
      action: PayloadAction<{ date: string; mealId: number }>
    ) {
      const { date, mealId } = action.payload;
      if (state.mealPlan[date]) {
        state.mealPlan[date] = state.mealPlan[date].filter(
          (meal) => meal.id !== mealId
        );
      }
    },
    clearMealsForDate(state, action: PayloadAction<string>) {
      delete state.mealPlan[action.payload];
    },
  },
});

export const {
  setSelectedDate,
  addMealToPlan,
  removeMealFromPlan,
  clearMealsForDate,
} = plannerSlice.actions;

export default plannerSlice.reducer;
