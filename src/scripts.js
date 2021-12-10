import './styles.css';
// import './css/index.scss';
import './images/recipe-book.png';
import './images/baking.png';
import './images/like.png';
import apiCalls from './apiCalls';

import Recipe from './classes/Recipe';
import Ingredient from './classes/Ingredient';
import RecipeRepository from './classes/RecipeRepository';
import recipeData from './data/recipes';
import ingredientsData from './data/ingredients';

//Query Selectors
let recipeCardSection = document.getElementById('recipeCardSection');
const allRecipesBtn = document.getElementById('recipesBtn');
// const recipeCard = document.getElementById('${recipe.id}');

//Event Listeners
window.addEventListener('load', displayAllRecipes);
recipeCardSection.addEventListener('click', displayFullRecipe);

function displayAllRecipes() {
  recipeCardSection.innerHTML = '';
  recipeData.forEach(recipe => {
    return recipeCardSection.innerHTML +=
    `<article class="card" id="${recipe.id}">
      <div class="card-icons">
      <img class="icon" src="images/like.png">
      <img class="icon" src="images/baking.png">
      </div>
      <h3>${recipe.name}</h3>
      <img class="thumbnail-image" src=${recipe.image}>
    </article>`
  });
}

function displayFullRecipe() {
  recipeCardSection.innerHTML = '';
  let recipeID = Number(event.target.parentNode.id);

  recipeData.forEach(recipe => {
    if (recipe.id === recipeID) {
      console.log(recipe.instructions[0])
      return recipeCardSection.innerHTML +=
      `<article class="full-recipe">
        <h3>${recipe.name}</h3>
        <img class="thumbnail-image" src=${recipe.image}>
          <h4>Ingredients</h4>
            <ul>
              <li>${recipe.ingredients[0].quantity.amount} ${recipe.ingredients[0].quantity.unit} Ingredient</li>
              <li>2 oz Ingredient Name</li>
              <li>2 oz Ingredient Name</li>
            </ul>
          <h4>Directions</h4>
            <ol>
              <li>${recipe.instructions[0].number}) ${recipe.instructions[0].instruction}</li>
              <li>1. sdfjsdlkfjsdljkfs</li>
              <li>1. sdfjsdlkfjsdljkfs</li>
              <li>1. sdfjsdlkfjsdljkfs</li>
            </ol>
          <h4>Total Cost = $27</h4>
      </article>`
    }
  });
}
