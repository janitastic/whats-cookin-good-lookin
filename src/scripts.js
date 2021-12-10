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
let recipeImageName = document.getElementById('recipeImageName');
let recipeIngredients = document.getElementById('recipeIngredients');
const allRecipesBtn = document.getElementById('recipesBtn');
// const recipeCard = document.getElementById('${recipe.id}');

//Event Listeners
window.addEventListener('load', displayAllRecipes);
recipeCardSection.addEventListener('click', displayRecipeCard);

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

function displayRecipeCard() {
  displayNameAndImage();
  displayIngredients();
}

function displayNameAndImage() {
  recipeCardSection.innerHTML = '';
  let recipeID = Number(event.target.parentNode.id);
  recipeData.forEach((recipe, index) => {
    // console.log("<>>>>>>>>>", recipe.ingredients)
    if (recipe.id === recipeID) {
      // console.log("index", index);
     return recipeImageName.innerHTML +=
      `<article class="full-recipe">
      <h3>${recipe.name}</h3>
      <img class="thumbnail-image" src=${recipe.image}>
      </article>`
    }
  });
}

function displayIngredients() {
  let recipeID = Number(event.target.parentNode.id);
  recipeData.forEach((recipe, index) => {
    if (recipe.id === recipeID) {
      console.log(recipe.name);
      return recipeIngredients.innerHTML +=
      `<h4>Ingredients</h4>
      <article class="full-recipe">
        <ul>
          <li>${recipe.ingredients[index].quantity.amount} ${recipe.ingredients[index].quantity.unit} Need to Access Ingredient</li>
        </ul>
      </article>`
    }
  });
}


// function displayFullRecipe() {
//
// //This recipe acc accesses amount and unit
//   //recipe.ingredients[index].quantity.amount
//   //recipe.ingredients[index].quantity.unit
//   //recipe.ingredients[index].id
// // This step element accesses the step of instructions
//   //step.instruction
//     //step.number
//       recipe.instructions.forEach(step => {
//         console.log("instructions", step.instruction);
//         <div>
//         <ul>
//           <li>${recipe.ingredients[index].quantity.amount} ${recipe.ingredients[index].quantity.unit} ${ingredient[index].name}</li>
//         </ul>
//         <h4>Directions</h4>
//         <ol>
//           <li>${step.number}) ${step.instruction}</li>
//         </ol>
//         <h4>Total Cost = $${recipe.logRecipeCost()}</h4>
//         </div>
//         </article>`
//       })
//     }
//   });
// }

function show(element) {
  element.classList.remove("hidden");
}

function hide(element) {
  element.classList.add("hidden");
}
