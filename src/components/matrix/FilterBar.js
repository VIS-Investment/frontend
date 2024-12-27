import React from "react";

const FilterBar = ({ availableFilters, filters, toggleFilter, applyFilters }) => {
  return (
    <div className="flex flex-wrap items-center gap-4 mb-4">
      {availableFilters.map((filter) => (
        <button
          key={filter}
          onClick={() => toggleFilter(filter)}
          className={`px-4 py-2 rounded ${
            filters.includes(filter)
              ? "bg-blue-600 text-white"
              : "bg-gray-200 dark:bg-gray-800 text-black dark:text-white"
          }`}
        >
          {filter}
        </button>
      ))}
      <button
        onClick={applyFilters}
        className="px-4 py-2 bg-green-500 text-white rounded"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default FilterBar;
