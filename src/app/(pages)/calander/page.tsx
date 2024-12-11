"use client";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store';
import {
  setSelectedDate,
  addMealToPlan,
  removeMealFromPlan,
  clearMealsForDate,
} from '../../../store/plannerSlice';
import { useState } from 'react';

const MealPlanner = () => {
  const dispatch = useDispatch();
  const { mealPlan, selectedDate } = useSelector((state: RootState) => state.planner);

  const [viewMode, setViewMode] = useState<'weekly' | 'monthly'>('weekly');

  console.log(mealPlan)
  // Generate date range for current view
  const getDateRange = () => {
    const current = new Date(selectedDate);
    const range = [];
    if (viewMode === 'weekly') {
      current.setDate(current.getDate() - current.getDay()); // Start of the week
      for (let i = 0; i < 7; i++) {
        range.push(new Date(current));
        current.setDate(current.getDate() + 1);
      }
    } else {
      const year = current.getFullYear();
      const month = current.getMonth();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      for (let i = 1; i <= daysInMonth; i++) {
        range.push(new Date(year, month, i));
      }
    }
    return range;
  };

  const dateRange = getDateRange();

  const calculateTotals = (meals: any[]) => {
    return meals.reduce(
      (totals, meal) => {
        totals.calories += meal.nutrition.calories;
        totals.protein += meal.nutrition.protein;
        totals.carbs += meal.nutrition.carbs;
        totals.fat += meal.nutrition.fat;
        return totals;
      },
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
  };

  const handleSharePlan = () => {
    const shareData = {
      title: 'Meal Plan',
      text: `Here is my meal plan for ${selectedDate}.`,
      url: window.location.href,
    };
    if (navigator.share) {
      navigator.share(shareData).catch((err) => console.error('Error sharing:', err));
    } else {
      alert('Sharing is not supported in your browser.');
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Meal Planner</h1>
      <div className="flex items-center gap-4 mb-4">
        <label>
          Select Date:
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => dispatch(setSelectedDate(e.target.value))}
            className="ml-2 p-2 rounded bg-[#313235] outline-none"
          />
        </label>
        <select
          value={viewMode}
          onChange={(e) => setViewMode(e.target.value as 'weekly' | 'monthly')}
          className="p-2 rounded bg-[#313235] outline-none"
        >
          <option value="weekly">Weekly View</option>
          <option value="monthly">Monthly View</option>
        </select>
        <button onClick={handleSharePlan} className="bg-blue-500 text-white py-2 px-4 rounded">
          Share Meal Plan
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {dateRange.map((date) => {
          const dateString = date.toISOString().split('T')[0];
          const meals = mealPlan[dateString] || [];
          const totals = calculateTotals(meals);

          console.log(meals)
          return (
            <div key={dateString} className="border rounded p-4">
              <h2 className="text-lg font-bold">
                {date.toDateString()} ({meals.length} meals)
              </h2>
              {meals.map((meal) => (
                <div key={meal.id} className="border rounded p-2 mt-2">
                  <h3>{meal.title}</h3>
                  <p>{meal.nutrition.calories} Calories</p>
                  <button
                    onClick={() => dispatch(removeMealFromPlan({ date: dateString, mealId: meal.id }))}
                    className="text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ))}
              {meals.length > 0 && (
                <div className="mt-4">
                  <h3 className="font-bold">Daily Totals</h3>
                  <p>Calories: {totals.calories}</p>
                  <p>Protein: {totals.protein}g</p>
                  <p>Carbs: {totals.carbs}g</p>
                  <p>Fat: {totals.fat}g</p>
                </div>
              )}
              <button
                onClick={() => dispatch(clearMealsForDate(dateString))}
                className="bg-red-500 text-white py-1 px-2 mt-2 rounded"
              >
                Clear Meals
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MealPlanner;
