"use client";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setRecipes, setLoading, setError } from '../store/recipeSlice';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import RecipeCard from '../components/RecipeCard';

const Home = () => {
  const { searchQuery, recipes, loading, error } = useSelector((state: RootState) => state.recipes);
  const dispatch = useDispatch();

  const fetchRecipes = async () => {
    dispatch(setLoading(true));
    try {
      const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
        params: {
          apiKey: process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY,
          query: searchQuery,
        },
        headers:{
          Authorization : process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY,
        },
      });
      console.log(response)
      dispatch(setRecipes(response.data.results));
    } catch (err: any) {
      dispatch(setError(err.message));
    }
  };
  console.log(process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY)

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Recipe Finder</h1>
      <SearchBar />
      <button onClick={fetchRecipes} className="bg-blue-500 text-white py-2 px-4 rounded">
        Search
      </button>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        {recipes.map((recipe: any) => (
          <RecipeCard key={recipe.id} title={recipe.title} image={recipe.image} id={recipe.id} />
        ))}
      </div>
    </div>
  );
};

export default Home;
