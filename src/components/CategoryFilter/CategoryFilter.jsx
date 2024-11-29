import React from 'react';
import './CategoryFilter.css';
import '../../reset.css';

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <div className='category-filter'>
      <label htmlFor='category'>Filter by Category: </label>
      <select
        id='category'
        value={selectedCategory}
        onChange={onCategoryChange}
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;
