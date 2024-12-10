import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RecipeState {
  searchQuery: string;
  recipes: any[];
  loading: boolean;
  error: string | null;
}

const initialState: RecipeState = {
  searchQuery: '',
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

export const { setSearchQuery, setRecipes, setLoading, setError } = recipeSlice.actions;

export default recipeSlice.reducer;
