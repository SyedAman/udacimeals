import React from 'react';

const ShoppingList = ({ shoppingListItems }) => (
	<div className="ingredients-list">
		<h3 className="subheader">Your Shopping List</h3>
		<ul>
			{shoppingListItems.map(listItem => <li key={listItem}>{listItem}</li>)}
		</ul>
	</div>
);

export default ShoppingList;
