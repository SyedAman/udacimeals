import React from 'react';

/**
 * Reduces a sentence to 16 characters.
 * @param  {String} stringToTrim - The sentence to reduce to 16 characters.
 * @return {String} - The shrunken sentence.
 */
function trim (stringToTrim) {
  return stringToTrim.length > 16
    ? stringToTrim.slice(0, 16) + '...'
    : stringToTrim
}

const FoodList = ({ food, onSelect }) => {
  if (food.length === 0) return <p>Your search has 0 results.</p>

  return (
    <ul className="food-list">
      {/* List out all the food items. */}
      {food.map(foodItem => (
        <li onClick={() => onSelect(foodItem)} key={foodItem.label}>
          <h3>{trim(foodItem.label)}</h3>
          <img src={foodItem.image} alt={foodItem.label} />
          <div>{Math.floor(foodItem.calories)} Calories</div>
          <div>{foodItem.source}</div>
        </li>
      ))}
    </ul>
  )
}

export default FoodList;
