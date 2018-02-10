import React from 'react';

const ShoppingList = ({ shoppingCartItems }) => (
	<div className="ingredients-list">
		<h3 className="subheader">Your Shopping List</h3>
		<ul>
			{shoppingCartItems.map(cartItem => <li key={cartItem}>{cartItem}</li>)}
		</ul>
	</div>
);

export default ShoppingList;
