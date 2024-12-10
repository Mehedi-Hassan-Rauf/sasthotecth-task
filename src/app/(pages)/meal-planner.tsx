import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { setSelectedDate, addMealToPlan, removeMealFromPlan } from '../../store/plannerSlice';

const MealPlanner = () => {
  const dispatch = useDispatch();
  const { mealPlan, selectedDate } = useSelector((state: RootState) => state.planner);

  const handleAddMeal = () => {
    const dummyMeal = {
      id: Math.random(),
      title: 'Sample Meal',
      image: '/sample.jpg',
      servings: 2,
      nutrition: { calories: 300, protein: 20, carbs: 40, fat: 10 },
    };
    dispatch(addMealToPlan({ date: selectedDate, meal: dummyMeal }));
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Meal Planner</h1>
      <label>
        Select Date:
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => dispatch(setSelectedDate(e.target.value))}
          className="ml-2 p-2 border rounded"
        />
      </label>
      <button onClick={handleAddMeal} className="bg-blue-500 text-white py-2 px-4 rounded mt-4">
        Add Meal
      </button>
      <div className="mt-8">
        <h2 className="text-xl font-bold">Meals for {selectedDate}</h2>
        {mealPlan[selectedDate]?.map((meal) => (
          <div key={meal.id} className="border rounded p-4 my-4 flex items-center justify-between">
            <div>
              <h3 className="font-bold">{meal.title}</h3>
              <p>{meal.nutrition.calories} Calories</p>
            </div>
            <button
              onClick={() => dispatch(removeMealFromPlan({ date: selectedDate, mealId: meal.id }))}
              className="text-red-500 hover:underline"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MealPlanner;
