import React from 'react';

/**
 * Reduces a sentence to 16 characters.
 * @param  {String} stringToTrim - The sentence to reduce to 16 characters.
 * @return {String} - The shrunken sentence.
 */
function trimString(stringToTrim) {
	return stringToTrim.length > 16
		? stringToTrim.slice(0, 16) + '...'
		: stringToTrim;
}

const RecipeList = ({ recipe, onSelect }) => {
	if (recipe.length === 0) return <p>Your search has 0 results.</p>;

	return (
		<ul className="recipe-list">
			{/* List out all the recipe items and their individual details. */}
			{recipe.map(recipeItem => (
				<li onClick={() => onSelect(recipeItem)} key={recipeItem.label}>
					<h3>{trimString(recipeItem.label)}</h3>
					<img src={recipeItem.image} alt={recipeItem.label} />
					<div>{Math.floor(recipeItem.calories)} Calories</div>
					<div>{recipeItem.source}</div>
				</li>
			))}
		</ul>
	);
};

export default RecipeList;
