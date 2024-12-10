"use client";
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '../store/recipeSlice';
import { RootState } from '../store';

const SearchBar = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state: RootState) => state.recipes.searchQuery);

  return (
    <div className="flex items-center gap-4 p-4">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        placeholder="Search recipes..."
        className="border rounded-md p-2 w-full"
      />
    </div>
  );
};

export default SearchBar;
