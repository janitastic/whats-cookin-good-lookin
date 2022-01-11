import './css/index.scss';
import './images/recipe-book.png';
import './images/baking.png';
import './images/like.png';
import './images/menu-baking.png';
import './images/menu-like.png';
import './images/view-recipes.png';
import './images/appetizer.png';
import './images/breakfast.png';
import './images/lunch.png';
import './images/dinner.png';
import './images/sides.png';
import './images/condiments.png';
import './images/snacks.png';
import './images/add.png';
import './images/pantry.png';
import './images/trash.png';
import './images/checked.png';

import {postIngredient} from './scripts';
import {currentUser} from './scripts';
import {recipeRepo} from './scripts';
import {removeIngredient} from './scripts';
import Pantry from './classes/Pantry';
import ingredientsData from './data/ingredients';
let currentPantry;
let missingIngredients;

              /*********** QUERY SELECTORS ***********/

// Menu Buttons
const allRecipesBtn = document.getElementById('recipesBtn');
const favoritesBtn = document.getElementById('favoritesBtn');
const toCookBtn = document.getElementById('toCookBtn');
const returnBtn = document.getElementById('returnBtn');
const pantryBtn = document.getElementById('pantryBtn');
const returnToCook = document.getElementById('returnToCook');
// Main Sections
let recipeCardSection = document.getElementById('recipeCardSection');
let individualCardView = document.getElementById('individualCardView');
const checkPantryBtn = document.getElementById('checkPantryBtn');

// Search Selectors
let searchButton = document.getElementById('searchButton');
let searchIcon = document.getElementById('searchIcon');
let searchInput = document.getElementById('searchBar');
let dropDownSearch = document.getElementById('dropDownSearch');
let searchByName = document.getElementById('searchByNameLink');
let searchByIngredient = document.getElementById('searchByIngredientLink');

// Favorite Search Selectors
let favSearchButton = document.getElementById('favSearchButton');
let favSearchIcon = document.getElementById('favSearchIcon');
let favSearchInput = document.getElementById('favSearchBar');
let favDropDownSearch = document.getElementById('favDropDownSearch');
let favSearchByName = document.getElementById('favSearchByNameLink');
let favSearchByIngredient = document.getElementById('favSearchByIngredientLink');

// Filter Selectors
let filterByAppetizer = document.getElementById('appetizerButton');
let filterByBreakfast = document.getElementById('breakfastButton');
let filterByLunch = document.getElementById('lunchButton');
let filterByDinner = document.getElementById('dinnerButton');
let filterBySides = document.getElementById('sideButton');
let filterByCondiments = document.getElementById('condimentButton');
let filterBySnacks = document.getElementById('snackButton');
let showAllButton = document.getElementById('showAllButton');

// Favorite Filter Selectors
let favFilterByAppetizer = document.getElementById('favAppetizerButton');
let favFilterByBreakfast = document.getElementById('favBreakfastButton');
let favFilterByLunch = document.getElementById('favLunchButton');
let favFilterByDinner = document.getElementById('favDinnerButton');
let favFilterBySides = document.getElementById('favSideButton');
let favFilterByCondiments = document.getElementById('favCondimentButton');
let favFilterBySnacks = document.getElementById('favSnackButton');
let favShowAllButton = document.getElementById('favShowAllButton');

// Individual Recipe Card Selectors
let favoriteButton = document.getElementById('favoriteButton');
let addToCookButton = document.getElementById('addToCook');
let addToPantry = document.getElementById('addToPantry');
let trashButton = document.getElementById('trashBtn');

              /*********** HELPER FUNCTIONS ***********/
function show(element) {
  element.classList.remove("hidden");
}

function hide(element) {
  element.classList.add("hidden");
}

function showRecipeCardSection() {
  show(recipeCardSection);
  show(filterIcons);
  show(allSearch);
  hide(ingredientsTitle);
  hide(directionsTitle);
  hide(individualCardView);
  hide(favoritesSection);
  hide(toCookSection);
  hide(favoriteFilterIcons);
  hide(favoriteSearch);
  hide(pantryCardView);
  hide(favInstructions);
  hide(cookInstructions);
  hide(cantCookInstructions);
}

function showFavoritesSection() {
  show(favoritesSection);
  show(favoriteFilterIcons);
  show(favoriteSearch);
  hide(ingredientsTitle);
  hide(directionsTitle);
  hide(recipeCardSection);
  hide(individualCardView);
  hide(toCookSection);
  hide(allSearch);
  hide(filterIcons);
  hide(checkPantryBtn);
  hide(pantryCardView);
  hide(cookInstructions);
  hide(cantCookInstructions);
  hide(postSuccessful);
}

function showToCookSection() {
  show(toCookSection);
  show(checkPantryBtn);
  hide(ingredientsTitle);
  hide(directionsTitle);
  hide(recipeCardSection);
  hide(individualCardView);
  hide(favoritesSection);
  hide(filterIcons);
  hide(favoriteFilterIcons);
  hide(favoriteSearch);
  hide(allSearch);
  hide(pantryCardView);
  hide(cantCookInstructions);
  hide(postSuccessful);
}

function showPantryCardSection() {
  hide(toCookSection);
  hide(cookInstructions);
  show(pantryCardView);
  hide(pantryTitle);
  hide(pantryIngredients);
  show(cantCookTitle);
  show(pantryIngredients);
  hide(postSuccessful);
}

function showBigRecipeCard() {
  show(individualCardView);
  hide(recipeCardSection);
  hide(favInstructions);
  hide(pantryCardView);
  hide(postSuccessful);
}

function displayToCookMessage() {
  if (currentUser.toCook.length === 0) {
    show(noRecipes);
    hide(favInstructions);
    hide(cookInstructions);
    hide(postSuccessful);
  } else {
    hide(noRecipes);
    hide(favInstructions);
    hide(postSuccessful);
  }
}

function selectPantryMenu() {
  show(pantryTitle);
  hide(cantCookInstructions);
  hide(cantCookTitle);
  hide(cantCookSection);
  hide(toCookSection);
  hide(cookInstructions);
  hide(postSuccessful);
  displayUserPantry(ingredientsData);
}

function showCantCookCard() {
  show(cantCookInstructions);
  show(cantCookTitle);
  hide(pantryTitle);
  hide(pantryIngredients);
  show(addToCook);
  hide(trashButton);
  hide(postSuccessful);
}

function showPostAlert() {
  show(noRecipes);
  show(postSuccessful);
  hide(oops);
  hide(cookInstructions);
  hide(toCookSection);
}

function displayDeleteFavMessage() {
  if (currentUser.favorites.length === 0) {
    show(noRecipes);
    hide(favInstructions);
    hide(checkPantryBtn);
    hide(pantryCardView);
  } else {
    show(favInstructions);
    hide(noRecipes);
    hide(checkPantryBtn);
    hide(pantryCardView);
  }
}

function resetSearch() {
  searchInput.value = null;
  searchByName.disabled = true;
  searchByIngredient.disabled = true;
}

function toggleDropDown() {
  dropDownSearch.classList.toggle('show');
  searchIcon.classList.toggle('fa-rotate-180');
  favDropDownSearch.classList.toggle('show');
  favSearchIcon.classList.toggle('fa-rotate-180');
}

              /*********** HOME PAGE FUNCTIONS ***********/

function domUpdates(recipeClasses) {
    displayAllRecipes(recipeClasses)
    // getRecipes()
    showRecipeCardSection()
}

function welcomeUser() {
  userMessage.innerHTML =
    `<h2>Lookin' Good ${currentUser.name}!
      <br>Let's Get Cookin'!</h2>`;
}

function displayAllRecipes(recipeCollection) {
   showRecipeCardSection();
   hide(noRecipes);
   recipeCardSection.innerHTML = '';
   recipeCollection.forEach(recipe => {
       return recipeCardSection.innerHTML +=
       `<article class="card" id="${recipe.id}" tabindex="0">
       <h3>${recipe.name}</h3>
       <img class="thumbnail-image" src=${recipe.image} alt="image of ${recipe.name}">
       </article>`;
   });
}

function displayRecipeCard(recipeCollection, ingredientsData) {
  showBigRecipeCard()
  hide(noRecipes);
  displayNameAndImage(recipeCollection);
  displayIngredients(recipeCollection, ingredientsData);
  displayDirections(recipeCollection);
  displayRecipeCost(recipeCollection, ingredientsData);
}

function displayNameAndImage(recipeCollection) {
  recipeImageName.innerHTML = '';
  const recipeId = Number(event.target.parentNode.id);
  recipeCollection.forEach((recipe) => {
    if (recipe.id === recipeId) {
     return recipeImageName.innerHTML +=
      `<article class="full-recipe">
      <h4>${recipe.name}</h4>
      <img class="recipe-image" src=${recipe.image} alt="image of ${recipe.name}">
      </article>`;
    }
  });
}

function displayIngredients(recipeCollection, ingredientsData) {
  show(ingredientsTitle);
  recipeIngredients.innerHTML = '';
  const recipeId = Number(event.target.parentNode.id);
  const foundRecipe = recipeCollection.find(recipe => recipe.id === recipeId);
  foundRecipe.ingredients.forEach((step, index) => {
      return recipeIngredients.innerHTML +=
      `<article class="full-recipe">
        <ul>
          <li class="ingredient-bullet">
          ${step.quantity.amount} ${step.quantity.unit} ${foundRecipe.logIngredients(ingredientsData)[index]}
          </li>
        </ul>
      </article>`;
    });
}

function displayDirections(recipeCollection) {
  show(directionsTitle);
  recipeDirections.innerHTML = '';
  const recipeId = Number(event.target.parentNode.id);
  const foundRecipe = recipeCollection.find(recipe => recipe.id === recipeId);
  foundRecipe.instructions.forEach((step) => {
      return recipeDirections.innerHTML +=
      `<article class="full-recipe">
        <ol>
          <li>
            <span class="step-number">${step.number}.</span> ${step.instruction}
          </li>
        </ol>
      </article>`;
    });
}

function displayRecipeCost(recipeCollection, ingredientsData) {
  recipeCost.innerHTML = '';
  const recipeId = Number(event.target.parentNode.id);
  const foundRecipe = recipeCollection.find(recipe => recipe.id === recipeId);
  return recipeCost.innerHTML +=
    `<article class="full-recipe">
      <h4>Total Cost $${foundRecipe.logRecipeCost(ingredientsData)}</h4>
    </article>`;
}

function searchByIngredients(ingredientsData) {
  recipeCardSection.innerHTML = '';
  let userInput = searchInput.value;
  let filteredRecipes = recipeRepo.filterByIngredients(userInput, ingredientsData);
  filteredRecipes.forEach(recipe => {
    return recipeCardSection.innerHTML +=
    `<article class="card" id="${recipe.id}" tabindex="0">
      <h3>${recipe.name}</h3>
      <img class="thumbnail-image" src=${recipe.image} alt="image of ${recipe.name}">
    </article>`;
  });
  toggleDropDown();
  resetSearch();
  showRecipeCardSection();
}

function searchByRecipeName() {
  recipeCardSection.innerHTML = '';
  let userInput = searchInput.value;
  let filteredRecipes = recipeRepo.filterByName(userInput);
  filteredRecipes.forEach(recipe => {
    return recipeCardSection.innerHTML +=
    `<article class="card" id="${recipe.id}" tabindex="0">
      <h3>${recipe.name}</h3>
      <img class="thumbnail-image" src=${recipe.image} alt="image of ${recipe.name}">
    </article>`;
  });
  toggleDropDown();
  resetSearch();
  showRecipeCardSection();
  hide(noRecipes);
  hide(favInstructions);
}

function filterBySelection(selectedTag) {
  recipeCardSection.innerHTML = '';
  showRecipeCardSection();
  let filteredRecipes = recipeRepo.filterByTag(selectedTag);
  filteredRecipes.forEach(recipe => {
    return recipeCardSection.innerHTML +=
    `<article class="card" id="${recipe.id}" tabindex="0">
      <h3>${recipe.name}</h3>
      <img class="thumbnail-image" src=${recipe.image} alt="image of ${recipe.name}">
    </article>`;
  });
}
          /*********** FAVORITE PAGE FUNCTIONS ***********/

function displayFavorites() {
  favoritesSection.innerHTML = '';
  const favoriteRecipes = currentUser.favorites;
  favoriteRecipes.forEach(recipe => {
    return favoritesSection.innerHTML +=
    `<article class="card" id="${recipe.id}" tabindex="0">
      <h3>${recipe.name}</h3>
      <img class="thumbnail-image" src=${recipe.image} alt="image of ${recipe.name}">
    </article>`;
  });
  showFavoritesSection();
  displayDeleteFavMessage();
}

function filterByFavSelection(selectedTag) {
  favoritesSection.innerHTML = '';
  showFavoritesSection();
  let filteredRecipes = currentUser.filterByTag(selectedTag);
  filteredRecipes.forEach(recipe => {
    return favoritesSection.innerHTML +=
    `<article class="card" id="${recipe.id}" tabindex="0">
      <h3>${recipe.name}</h3>
      <img class="thumbnail-image" src=${recipe.image} alt="image of ${recipe.name}">
    </article>`;
  });
}

function favSearchByRecipeName() {
  favoritesSection.innerHTML = '';
  let userInput = favSearchInput.value;
  let filteredRecipes = currentUser.filterByNameFav(userInput);
  filteredRecipes.forEach(recipe => {
    // console.log("recipe name", recipe.name);
    return favoritesSection.innerHTML +=
    `<article class="card" id="${recipe.id}" tabindex="0">
      <h3>${recipe.name}</h3>
      <img class="thumbnail-image" src=${recipe.image} alt="image of ${recipe.name}">
    </article>`;
  });
  toggleDropDown();
  resetSearch();
  showFavoritesSection();
}

function favSearchByIngredients(ingredientsData) {
  favoritesSection.innerHTML = '';
  let userInput = favSearchInput.value;
  let filteredRecipes = currentUser.filterByIngredients(userInput, ingredientsData);
  filteredRecipes.forEach(recipe => {
    return favoritesSection.innerHTML +=
    `<article class="card" id="${recipe.id}" tabindex="0">
      <h3>${recipe.name}</h3>
      <img class="thumbnail-image" src=${recipe.image} alt="image of ${recipe.name}">
    </article>`;
  });
  toggleDropDown();
  resetSearch();
  showFavoritesSection();
}

          /*********** TO COOK PAGE FUNCTIONS ***********/

function chooseToCookView() {
  if (currentUser.toCook.length >= 1) {
    hide(noRecipes);
    hide(checkPantryBtn);
    show(cookInstructions);
    show(toCookSection);
    show(cantCookInstructions);
    hide(postSuccessful);
    hide(returnToCook);
  } else {
    show(noRecipes);
    show(checkPantryBtn);
    hide(cookInstructions);
    hide(toCookSection);
    hide(cantCookInstructions);
    hide(postSuccessful);
    hide(returnToCook);
  }
}

function displayToCook() {
  chooseToCookView();
  toCookSection.innerHTML = '';
  const toCookRecipes = currentUser.toCook;
  toCookRecipes.forEach(recipe => {
    return toCookSection.innerHTML +=
    `<article class="card" id="${recipe.id}" tabindex="0">
      <h3>${recipe.name}</h3>
      <img class="thumbnail-image" src=${recipe.image} alt="image of ${recipe.name}">
    </article>`;
  });
  showToCookSection();
  displayToCookMessage();
}

function displayUserPantry(ingredientsData) {
  hide(noRecipes);
  show(pantryCardView);
  hide(recipeCardSection);
  show(cantCookSection);
  pantryIngredients.innerHTML = '';
  let myPantryOne = new Pantry(currentUser);
  myPantryOne.pantry.forEach((step, index) => {
      return pantryIngredients.innerHTML +=
      `<article class="full-recipe">
        <ul class="pantry-list">
          <li class="ingredient-bullet">
          ${step.amount} ${myPantryOne.logPantryIngredients(ingredientsData)[index]}
          </li>
        </ul>
      </article>`;
    });
}

function checkForIngredients(recipeCollection, ingredientsData) {
  showPantryCardSection();
  currentPantry = new Pantry(currentUser);
  cantCookSection.innerHTML = '';
  const recipeId = Number(event.target.parentNode.id);
  const selectedRecipe = recipeCollection.find((recipe) => recipe.id === recipeId);
  currentPantry.checkPantry(selectedRecipe);
  if (currentPantry.shoppingList.length < 1) {
    displayRecipeCard(recipeCollection, ingredientsData)
    hide(addToCook);
    show(trashButton);
  } else {
    showCantCookCard();
    currentPantry.shoppingList.forEach((elem, index) => {
      ingNeededTitle.innerHTML = `Ingredients Needed to Cook ${selectedRecipe.name}`
      show(cantCookSection);
      show(cantCookInstructions);
      return cantCookSection.innerHTML +=
      `<article class="full-recipe">
        <ul>
          <li class="ingredient-bullet">
           ${elem.amount} ${selectedRecipe.logIngredients(ingredientsData)[index]}
          </li>
        </ul>
      </article>`;
    });
  }
}

function addMissingIngredients() {
  postIngredient(currentPantry);
  console.log('this should still be empty []', currentPantry.shoppingList)
  showPostAlert();
  show(returnToCook);
}

function removeFromPantry(recipeCollection, ingredientsData) {
  removeIngredient(recipeCollection, ingredientsData);
}

export default  domUpdates;
export {
  allRecipesBtn,
  favoritesBtn,
  toCookBtn,
  returnBtn,
  searchButton,
  favSearchButton,
  searchByName,
  searchByIngredient,
  searchInput,
  favSearchByName,
  favSearchByIngredient,
  favSearchInput,
  addToCookButton,
  favFilterByAppetizer,
  favFilterByBreakfast,
  favFilterByLunch,
  favFilterByDinner,
  favFilterBySides,
  favFilterByCondiments,
  favFilterBySnacks,
  favShowAllButton,
  filterByAppetizer,
  filterByBreakfast,
  filterByLunch,
  filterByDinner,
  filterBySides,
  filterByCondiments,
  filterBySnacks,
  showAllButton,
  favoriteButton,
  displayAllRecipes,
  displayRecipeCard,
  displayFavorites,
  displayToCook,
  filterBySelection,
  toggleDropDown,
  searchByRecipeName,
  searchByIngredients,
  favSearchByRecipeName,
  favSearchByIngredients,
  filterByFavSelection,
  pantryBtn,
  checkPantryBtn,
  displayUserPantry,
  checkForIngredients,
  addToPantry,
  addMissingIngredients,
  selectPantryMenu,
  welcomeUser,
  trashButton,
  removeFromPantry,
  returnToCook
}
export {currentPantry}
