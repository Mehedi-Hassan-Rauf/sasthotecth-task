"use client";
import { useDispatch, useSelector } from 'react-redux';
import { setError, setLoading, setRecipes, setSearchQuery, setSelectedCuisine, setSelectedDiet, setSelectedMaxValue, setSelectedMinValue } from '../store/recipeSlice';
import { RootState } from '../store';
import axios from 'axios';


const cuisines = [
  "none",
  "African",
  "Asian",
  "American",
  "British",
  "Cajun",
  "Caribbean",
  "Chinese",
  "Eastern European",
  "European",
  "French",
  "German",
  "Greek",
  "Indian",
  "Irish",
  "Italian",
  "Japanese",
  "Jewish",
  "Korean",
  "Latin American",
  "Mediterranean",
  "Mexican",
  "Middle Eastern",
  "Nordic",
  "Southern",
  "Spanish",
  "Thai",
  "Vietnamese",
];

const diet = [
  "none",
  "Gluten Free",
  "Ketogenic",
  "Vegetarian",
  "Lacto-Vegetarian",
  "Ovo-Vegetarian",
  "Vegan",
  "Pescetarian",
  "Paleo",
  "Primal",
  "Low FODMAP",
  "Whole30",
]

const SearchBar = () => {
  const dispatch = useDispatch();
  const { searchQuery,selectedCuisine,selectedDiet,selectedMinValue,selectedMaxValue, loading, error } = useSelector((state: RootState) => state.recipes);

  const fetchRecipes = async () => {
    if(searchQuery==="" && selectedCuisine === "none" && selectedMaxValue === 0){
      dispatch(setError("Please select any data"));
      console.log("stop");
      return;
    }
    dispatch(setLoading(true));
    try {
      const params: Record<string, string> = {
        apiKey: process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY || "",
      };

      if (searchQuery !== "") {
        params.query = searchQuery;
      }
      if (selectedCuisine !== "none") {
        params.cuisine = selectedCuisine;
      }
      if (selectedDiet !== "none") {
        params.diet	 = selectedDiet;
      }
      if (selectedMinValue) {
        params.minCalories = String(selectedMinValue);
      }
      if (selectedMaxValue) {
        params.maxCalories	 = String(selectedMaxValue);
      }

      const response = await axios.get(
        "https://api.spoonacular.com/recipes/complexSearch",
        { params }
      );

      dispatch(setRecipes(response.data.results));
    } catch (err: any) {
      dispatch(setError(err.message));
    }
  };

  return (
    <>
      <div className="flex items-center gap-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          placeholder="Search your preferred food item..."
          className="rounded-md p-4 w-full bg-[#313235] outline-none"
        />
      </div>
      <div className='flex flex-row gap-10'>
        <div className='flex flex-col'>
          <label htmlFor="selectField" className="block mb-2 font-bold">
            Cousine type:
          </label>
          <select
            id="selectField"
            value={selectedCuisine}
            onChange={(event)=> dispatch(setSelectedCuisine(event.target.value))}
            className="rounded-md p-2 bg-[#313235] outline-none"
          >
            {
              cuisines.map((val,index)=><option key={index} value={val}>{val}</option>)
            }
          </select>
        </div>
        <div className='flex flex-col'>
            <label htmlFor="selectField" className="block mb-2 font-bold">
              Diet restriction:
            </label>
            <select
              id="selectField"
              value={selectedDiet}
              onChange={(event)=> dispatch(setSelectedDiet(event.target.value))}
              className="rounded-md p-2 bg-[#313235] outline-none"
            >
              {
                diet.map((val,index)=><option key={index} value={val}>{val}</option>)
              }
            </select>
        </div>
        <div className='flex flex-row gap-3'>
          <div>
            <label htmlFor="selectField" className="block mb-2 font-bold">
              Min Calories:
            </label>
            <input
              id="numberInput"
              type="number"
              min={0}
              max={2000}
              value={selectedMinValue || 0}
              onChange={((event)=>{if(Number(event.target.value) < 2001) dispatch(setSelectedMinValue(Number(event.target.value)))})}
              className="py-2 rounded-md text-center bg-[#313235] outline-none w-[100px]"
            />
          </div>
          <div>
            <label htmlFor="selectField" className="block mb-2 font-bold">
              Max Calories:
            </label>
            <input
              id="numberInput"
              type="number"
              min={0}
              max={2000}
              value={selectedMaxValue || 0}
              onChange={((event)=>{if(Number(event.target.value) < 2001) dispatch(setSelectedMaxValue(Number(event.target.value)))})}
              className="py-2 rounded-md text-center bg-[#313235] outline-none w-[100px]"
            />
          </div>
        </div>
      </div>
      <button onClick={fetchRecipes} className="bg-blue-500 text-white py-2 px-4 rounded">
        Search
      </button>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
    </>
  );
};

export default SearchBar;
