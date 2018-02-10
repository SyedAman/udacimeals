import React from 'react';

const ShoppingList = ({ shoppingCart }) => (
	<div className="ingredients-list">
		<h3 className="subheader">Your Shopping List</h3>
		<ul>{shoppingCart.map(cartItem => <li key={cartItem}>{cartItem}</li>)}</ul>
	</div>
);

export default ShoppingList;
