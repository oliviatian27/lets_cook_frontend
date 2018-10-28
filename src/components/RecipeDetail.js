import React from 'react';

const RecipeDetail = (props) => {
  console.log(props.recipe)
  return (
  <div className="RecipeDetailContainer">

  <div className="recipe-name">
    {props.recipe.name}
  </div>

  {props.recipe.image ? <img className="detail-image" src={props.recipe.image} /> : null}

  <div>
    <a href={props.recipe.url}>Recipe instructions</a>
  </div>

  <div>
    Calories: {props.recipe.calories}
  </div>

  <div>
    Cooking Time: {props.recipe.cooking_time} mins
  </div>

  <div>
    Ingredients: {props.recipe.ingredients.join(", ")}
  </div>

  </div>)
};

export default RecipeDetail;
