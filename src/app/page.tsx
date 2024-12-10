"use client";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import SearchBar from '../components/SearchBar';
import RecipeCard from '../components/RecipeCard';


const Home = () => {
  const { recipes} = useSelector((state: RootState) => state.recipes);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Recipe Finder</h1>
      <SearchBar />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        {recipes.map((recipe: any) => (
          <RecipeCard key={recipe.id} title={recipe.title} image={recipe.image} id={recipe.id} />
        ))}
      </div>
    </div>
  );
};

export default Home;
