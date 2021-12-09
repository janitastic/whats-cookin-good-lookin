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
  for(var i = 0; i < recipeData.length; i++) {
    if (recipeData[i].id === recipeID) {
      recipeCardSection.innerHTML +=
      `<article class="full-recipe">
        <h3>Recipe Name</h3>
        <img class="thumbnail-image" src="https://spoonacular.com/recipeImages/595736-556x370.jpg">
          <h4>Ingredients</h4>
            <ul>
              <li>2 oz Ingredient Name</li>
              <li>2 oz Ingredient Name</li>
              <li>2 oz Ingredient Name</li>
            </ul>
          <h4>Directions</h4>
            <ol>
              <li>1. sdfjsdlkfjsdljkfs</li>
              <li>1. sdfjsdlkfjsdljkfs</li>
              <li>1. sdfjsdlkfjsdljkfs</li>
              <li>1. sdfjsdlkfjsdljkfs</li>
            </ol>
          <h4>Total Cost = $27</h4>
      </article>`
    }
  }
}
