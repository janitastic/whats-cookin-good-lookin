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


let recipeCardSection = document.getElementById('recipeCardSection');
const allRecipesBtn = document.getElementById('recipesBtn');
window.addEventListener('load', displayAllRecipes);

function displayAllRecipes() {
  console.log(recipeData[0].name);
  recipeCardSection.innerHTML = '';
  for(let i = 0; i < recipeData.length; i++) {
    recipeCardSection.innerHTML +=
    `<article class="card">
    <div class="card-icons">
    <img class="icon" src="images/like.png">
    <img class="icon" src="images/baking.png">
    </div>
    <h3>${recipeData[i].name}</h3>
    <img class="thumbnail-image" src=${recipeData[i].image}>
    </article>`
  }
};

//import the recipes.js and ingredients.js
// display all the cards in the DOM.
