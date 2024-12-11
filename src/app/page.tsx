"use client";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import SearchBar from '../components/SearchBar';
import RecipeCard from '../components/RecipeCard';
import { useState } from 'react';
import Link from 'next/link';


const Home = () => {
  const { recipes} = useSelector((state: RootState) => state.recipes);
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="p-8">
      <div>
        <nav className="text-white py-4 px-6">
        <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold mb-4">Recipe Finder</h1>
          <div className="space-x-4">
            <button
              className={`px-4 py-2 rounded ${
                activeTab === "home" ? "bg-blue-800" : "hover:bg-blue-700"
              }`}
              onClick={() => setActiveTab("home")}
            >
              <Link href="/">Home</Link>
            </button>
            <button
              className={`px-4 py-2 rounded ${
                activeTab === "about" ? "bg-blue-800" : "hover:bg-blue-700"
              }`}
              onClick={() => setActiveTab("about")}
            >
              <Link href="/calander">Meal plan</Link>
            </button>
          </div>
        </div>
      </nav>
      </div>
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
