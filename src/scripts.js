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

//may not need line 15
let recipeRepo = new RecipeRepository(recipeData);

//Query Selectors
let recipeCardSection = document.getElementById('recipeCardSection');
let recipeImageName = document.getElementById('recipeImageName');
let recipeIngredients = document.getElementById('recipeIngredients');
let ingredientsTitle = document.getElementById('ingredientsTitle');
const allRecipesBtn = document.getElementById('recipesBtn');
// const recipeCard = document.getElementById('${recipe.id}');

//Event Listeners
window.addEventListener('load', displayAllRecipes);
recipeCardSection.addEventListener('click', displayRecipeCard);

const recipeClasses = recipeData.map(recipeData => new Recipe(recipeData))

function displayAllRecipes() {
  hide(ingredientsTitle);
  recipeCardSection.innerHTML = '';
  recipeClasses.forEach(recipe => {
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
  recipeClasses.forEach((recipe, index) => {
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
  show(ingredientsTitle);
  const recipeId = Number(event.target.parentNode.id);
  const foundRecipe = recipeClasses.find(r => r.id === recipeId)
  // console.log(foundRecipe);
  foundRecipe.ingredients.forEach(step => {
      return recipeIngredients.innerHTML +=
      `<article class="full-recipe">
      <ul>
      <li>${step.quantity.amount} ${step.quantity.unit} ${foundRecipe.logIngredients()}</li>
      </ul>
      </article>`
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
