import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RecipeState {
  searchQuery: string;
  selectedCuisine: string,
  selectedDiet: string,
  selectedMinValue: number,
  selectedMaxValue: number,
  recipes: any[];
  loading: boolean;
  error: string | null;
}

const initialState: RecipeState = {
  searchQuery: '',
  selectedCuisine: 'none',
  selectedDiet: 'none',
  selectedMinValue: 0,
  selectedMaxValue: 0,
  recipes: [],
  loading: false,
  error: null,
};

const recipeSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    setSelectedCuisine(state, action: PayloadAction<string>) {
      state.selectedCuisine = action.payload;
    },
    setSelectedDiet(state, action: PayloadAction<string>) {
      state.selectedDiet = action.payload;
    },
    setSelectedMinValue(state, action: PayloadAction<number>) {
      state.selectedMinValue = action.payload;
    },
    setSelectedMaxValue(state, action: PayloadAction<number>) {
      state.selectedMaxValue = action.payload;
    },
    setRecipes(state, action: PayloadAction<any[]>) {
      state.recipes = action.payload;
      state.loading = false;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { setSearchQuery, setSelectedCuisine, setSelectedDiet, setSelectedMinValue, setSelectedMaxValue, setRecipes, setLoading, setError } = recipeSlice.actions;

export default recipeSlice.reducer;
