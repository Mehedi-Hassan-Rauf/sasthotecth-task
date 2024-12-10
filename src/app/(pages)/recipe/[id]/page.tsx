"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Recipe {
  id: number;
  title: string;
  image: string;
  extendedIngredients: { id: number; original: string }[];
  instructions: string;
}

const RecipeDetails = () => {
  const [recipe, setRecipe] = useState<Recipe | null>(null); // Use Recipe type
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const params = useParams();
  const recipeId = params?.id; // Ensure you define `id` in your route structure

  useEffect(() => {
    if (!recipeId) {
      setError("No recipe ID provided.");
      setLoading(false);
      return;
    }

    const getRecipe = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/${recipeId}/information`,
          {
            params: { apiKey: process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY },
          }
        );
        setRecipe(response.data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch recipe data.");
        setRecipe(null);
      } finally {
        setLoading(false);
      }
    };

    getRecipe();
  }, [recipeId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  if (!recipe) {
    return <p>Recipe not found</p>;
  }

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold">{recipe.title}</h1>
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-96 object-cover mt-4 rounded"
      />
      <h2 className="text-2xl font-bold mt-8">Ingredients</h2>
      <ul className="list-disc ml-8 mt-4">
        {recipe.extendedIngredients.map((ingredient) => (
          <li key={ingredient.id}>{ingredient.original}</li>
        ))}
      </ul>
      <h2 className="text-2xl font-bold mt-8">Instructions</h2>
      <p className="mt-4">{recipe.instructions || "No instructions provided."}</p>
    </div>
  );
};

export default RecipeDetails;

