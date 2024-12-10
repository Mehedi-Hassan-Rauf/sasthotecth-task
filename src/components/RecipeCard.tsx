interface RecipeCardProps {
  title: string;
  image: string;
  id: number;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ title, image, id }) => (
  <div className="border rounded-md p-4 shadow-md">
    <img src={image} alt={title} className="w-full h-48 object-cover rounded-md" />
    <h2 className="mt-2 text-lg font-bold">{title}</h2>
    <a href={`/recipe/${id}`} className="text-blue-500 hover:underline">
      View Recipe
    </a>
  </div>
);

export default RecipeCard;
