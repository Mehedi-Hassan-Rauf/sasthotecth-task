import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addMealToPlan } from '../store/plannerSlice';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface RecipeCardProps {
  id: number;
  title: string;
  image: string;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ id, title, image }) => {
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleAddMeal = () => {
    if (!selectedDate) {
      alert('Please select a date before adding the meal.');
      return;
    }

    const dummyMeal = {
      id,
      title,
      image,
      servings: 2,
      nutrition: {
        calories: Math.floor(Math.random() * 500) + 200,
        protein: Math.floor(Math.random() * 30) + 10,
        carbs: Math.floor(Math.random() * 50) + 20,
        fat: Math.floor(Math.random() * 20) + 5,
      },
    };
    console.log(dummyMeal)

    const formattedDate = selectedDate.toISOString().split('T')[0];
    dispatch(addMealToPlan({ date: formattedDate, mealPlan: dummyMeal }));
    alert(`${title} has been added to the meal plan for ${formattedDate}.`);
    setSelectedDate(null);
  };

  return (
    <div className="border rounded p-4">
      <img src={image} alt={title} className="w-full h-40 object-cover rounded mb-4" />
      <h2 className="text-lg font-bold">{title}</h2>

      <div className="mt-4">
        <label htmlFor="date-picker" className="block text-sm font-medium mb-2">
          Select a Date:
        </label>
        <DatePicker
          id="date-picker"
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="yyyy-MM-dd"
          className="w-full p-2 rounded bg-[#313235] outline-none"
        />
      </div>

      <button
        onClick={handleAddMeal}
        className="bg-green-500 text-white py-2 px-4 rounded mt-4 w-full"
      >
        Add to Meal Plan
      </button>
      <a href={`/recipe/${id}`} className="text-blue-500 hover:underline">
        View Recipe
      </a>
    </div>
  );
};

export default RecipeCard;
